"use client";

import {
  useCallback,
  useSyncExternalStore,
} from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { HomeView } from "@/components/views/home-view";
import { ResourcesView } from "@/components/views/resources-view";
import { RoadmapView } from "@/components/views/roadmap-view";
import { getCategory } from "@/lib/data/resources";

export type View = "home" | "resources" | "roadmap";

interface HashState {
  view: View;
  category: string;
}

/**
 * The sandbox preview exposes a single route (`/`), so in-app navigation is
 * hash-based (`#/resources/<categoryId>`). The hash is *external* browser
 * state, so it is read through useSyncExternalStore — this keeps hydration
 * stable (server renders "home") and keeps browser back/forward working.
 */
const SERVER_HASH_STATE: HashState = { view: "home", category: "" };

function parseHash(): HashState {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const [segment, category] = hash.split("/");
  if (segment === "resources") {
    const cat = category && getCategory(category) ? category : "";
    return { view: "resources", category: cat };
  }
  if (segment === "roadmap") return { view: "roadmap", category: "" };
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
  const { view, category } = useSyncExternalStore(
    subscribeHash,
    getHashSnapshot,
    getServerHashSnapshot
  );

  const navigate = useCallback((next: View, nextCategory?: string) => {
    const target =
      next === "home"
        ? "#/home"
        : next === "resources"
          ? nextCategory
            ? `#/resources/${nextCategory}`
            : "#/resources"
          : "#/roadmap";

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
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
}
