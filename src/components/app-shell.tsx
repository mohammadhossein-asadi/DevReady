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
import { ReviewView } from "@/components/views/review-view";
import { ContributeView } from "@/components/views/contribute-view";
import CommunityView from "@/components/views/community-view";
import { AccountView } from "@/components/views/account-view";
import { ResourceDetailView } from "@/components/views/resource-detail-view";
import { useLanguage } from "@/lib/language-context";
import { ErrorBoundary } from "@/components/error-boundary";
import { ShortcutsDialog } from "@/components/shortcuts-dialog";

export type View =
  | "home"
  | "resources"
  | "roadmap"
  | "library"
  | "daily"
  | "review"
  | "contribute"
  | "community"
  | "account"
  | "resource";

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
  if (segment === "review") return { view: "review", category: "", name: "" };
  if (segment === "contribute") return { view: "contribute", category: "", name: "" };
if (segment === "community") return { view: "community", category: "", name: "" };
  if (segment === "account") return { view: "account", category: "", name: "" };
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
  const { t } = useLanguage();
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
              : next === "review"
                ? "#/review"
                : next === "contribute"
                  ? "#/contribute"
                  : next === "account"
                    ? "#/account"
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
        <ErrorBoundary
          fallbackTitle={t("error.title")}
          fallbackMessage={t("error.message")}
          fallbackDetails={t("error.details")}
          fallbackRetry={t("error.retry")}
          fallbackGoHome={t("error.goHome")}
        >
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
          {view === "review" && <ReviewView />}
          {view === "contribute" && <ContributeView />}
          {view === "community" && <CommunityView />}
          {view === "account" && <AccountView />}
          {view === "resource" && (
            <ResourceDetailView categoryId={category} name={name} />
          )}
        </ErrorBoundary>
      </main>

      <Footer onNavigate={navigate} />
      <ShortcutsDialog />
    </div>
  );
}
