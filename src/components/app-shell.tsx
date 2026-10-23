"use client";

import {
  useCallback,
  useEffect,
  useSyncExternalStore,
} from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HomeView } from "@/components/views/home-view";
import { ResourcesView } from "@/components/views/resources-view";
import { RoadmapView } from "@/components/views/roadmap-view";
import { LibraryView } from "@/components/views/library-view";
import { DailyView } from "@/components/views/daily-view";
import { ResourceDetailView } from "@/components/views/resource-detail-view";
import { getCategory } from "@/lib/data/resources";

export type View = "home" | "resources" | "roadmap" | "library" | "daily" | "resource";

interface HashState {
  view: View;
  category: string;
  /** Decoded resource name — only used by the detail view. */
  name: string;
}

/**
 * The sandbox preview exposes a single route (`/`), so in-app navigation is
 * hash-based (`#/resources/<categoryId>`, `#/resource/<cat>/<name>`,
 * `#/library`). The hash is *external* browser state, so it is read through
 * useSyncExternalStore — this keeps hydration stable (server renders "home")
 * and keeps browser back/forward working.
 */
const SERVER_HASH_STATE: HashState = { view: "home", category: "", name: "" };

function parseHash(): HashState {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [segment, a, b] = hash.split("/");
  if (segment === "resources") {
    const cat = a && getCategory(a) ? a : "";
    return { view: "resources", category: cat, name: "" };
  }
  if (segment === "roadmap") return { view: "roadmap", category: "", name: "" };
  if (segment === "library") return { view: "library", category: "", name: "" };
  if (segment === "daily") return { view: "daily", category: "", name: "" };
  if (segment === "resource") {
    const cat = a && getCategory(a) ? a : "";
    let name = "";
    if (b) {
      try {
        name = decodeURIComponent(b);
      } catch {
        name = b;
      }
    }
    return { view: "resource", category: cat, name };
  }
  return SERVER_HASH_STATE;
}

let hashCache: { hash: string; state: HashState } | null = null;

function subscribeHash(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}

function getHashSnapshot(): HashState {
  const hash = window.location.hash;
  if (!hashCache || hashCache.hash !== hash) {
    hashCache = { hash, state: parseHash() };
  }
  return hashCache.state;
}

function getServerHashSnapshot(): HashState {
  return SERVER_HASH_STATE;
}

export function AppShell() {
  const { view, category, name } = useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    getServerHashSnapshot
  );

  const navigate = useCallback((next: View, nextCategory?: string) => {
    const target =
      next === "home"
        ? "#/home"
        : next === "roadmap"
          ? "#/roadmap"
          : next === "library"
            ? "#/library"
            : next === "daily"
              ? "#/daily"
              : nextCategory
                ? `#/resources/${nextCategory}`
                : "#/resources";

    if (window.location.hash === target) {
      // Same-hash navigation doesn't fire `hashchange` — just scroll up.
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    } else {
      window.location.hash = target;
    }
  }, []);

  const setCategory = useCallback(
    (nextCategory: string) => navigate("resources", nextCategory),
    [navigate]
  );

  // Land at the top whenever the routed content changes (hash SPAs don't get
  // native scroll restoration right, and detail→related hops jump mid-page).
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, category, name]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header view={view} onNavigate={navigate} />

      <main id="main" className="flex-1">
        {view === "home" && <HomeView onNavigate={navigate} />}
        {view === "resources" && (
          <ResourcesView
            activeCategory={category}
            onCategoryChange={setCategory}
          />
        )}
        {view === "roadmap" && <RoadmapView />}
        {view === "library" && <LibraryView onNavigate={navigate} />}
        {view === "daily" && <DailyView />}
        {view === "resource" && (
          <ResourceDetailView categoryId={category} name={name} />
        )}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
