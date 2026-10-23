"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/**
 * Contribution system (Phase 4): user-suggested resources, persisted in
 * localStorage (`devready:contribs:v1`) and exposed through
 * useSyncExternalStore — the same hydration-safe pattern as the other stores.
 *
 * Submissions stay in the browser until the user exports them (JSON download
 * or Markdown copy) from the contribute view; there is intentionally no
 * backend, matching the rest of the app's no-account architecture.
 */

export type ContribLang = "en" | "fa" | "both";
export type ContribKind = "article" | "video" | "course" | "tool" | "interactive" | "questions";
export type ContribLevel = "beginner" | "intermediate" | "advanced";

export interface Contribution {
  id: string;
  title: string;
  url: string;
  categoryId: string;
  language: ContribLang;
  kind: ContribKind;
  level?: ContribLevel;
  /** Why the resource is useful (min length enforced in the form). */
  desc: string;
  author?: string;
  createdAt: number;
  updatedAt?: number;
  /** Honest local state — awaiting export/maintainer review. */
  status: "queued";
}

export interface ContributionDraft {
  title: string;
  url: string;
  categoryId: string;
  language: ContribLang;
  kind: ContribKind;
  level?: ContribLevel;
  desc: string;
  author?: string;
}

interface ContribData {
  v: 1;
  submissions: Contribution[];
}

const STORAGE_KEY = "devready:contribs:v1";
const CONTRIB_EVENT = "devready:contrib-change";

const EMPTY: ContribData = { v: 1, submissions: [] };

const KINDS: ContribKind[] = ["article", "video", "course", "tool", "interactive", "questions"];
const LANGS: ContribLang[] = ["en", "fa", "both"];
const LEVELS: ContribLevel[] = ["beginner", "intermediate", "advanced"];

function makeId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }
}

function parse(raw: string | null): ContribData {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw) as Partial<ContribData>;
    if (data.v !== 1 || !Array.isArray(data.submissions)) return EMPTY;
    const submissions: Contribution[] = [];
    for (const rawItem of data.submissions) {
      if (!rawItem || typeof rawItem !== "object") continue;
      const item = rawItem as Partial<Contribution>;
      if (
        typeof item.id !== "string" || !item.id ||
        typeof item.title !== "string" || !item.title.trim() ||
        typeof item.url !== "string" || !item.url.trim() ||
        typeof item.categoryId !== "string" ||
        typeof item.desc !== "string" ||
        typeof item.createdAt !== "number" ||
        !LANGS.includes(item.language as ContribLang) ||
        !KINDS.includes(item.kind as ContribKind)
      ) {
        continue;
      }
      submissions.push({
        id: item.id,
        title: item.title,
        url: item.url,
        categoryId: item.categoryId,
        language: item.language as ContribLang,
        kind: item.kind as ContribKind,
        level: LEVELS.includes(item.level as ContribLevel) ? (item.level as ContribLevel) : undefined,
        desc: item.desc,
        author: typeof item.author === "string" && item.author.trim() ? item.author : undefined,
        createdAt: item.createdAt,
        updatedAt: typeof item.updatedAt === "number" ? item.updatedAt : undefined,
        status: "queued",
      });
    }
    return { v: 1, submissions };
  } catch {
    return EMPTY;
  }
}

/** Parsed-value cache so getSnapshot returns a stable identity per raw value. */
let cache: { raw: string | null; data: ContribData } = { raw: undefined as never, data: EMPTY };

function readData(): ContribData {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (cache.raw === raw) return cache.data;
  cache = { raw, data: parse(raw) };
  return cache.data;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(CONTRIB_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(CONTRIB_EVENT, onChange);
  };
}

function getServerSnapshot(): ContribData {
  return EMPTY;
}

function writeData(next: ContribData) {
  cache = { raw: JSON.stringify(next), data: next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode) — keep the in-session state working.
  }
  window.dispatchEvent(new Event(CONTRIB_EVENT));
}

export interface ContribContextValue {
  data: ContribData;
  /** Newest first. */
  submissions: Contribution[];
  count: number;
  add: (draft: ContributionDraft) => Contribution;
  update: (id: string, patch: Partial<ContributionDraft>) => void;
  remove: (id: string) => void;
}

const ContribContext = createContext<ContribContextValue | null>(null);

export function ContribProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, readData, getServerSnapshot);

  const add = useCallback((draft: ContributionDraft): Contribution => {
    const current = readData();
    const item: Contribution = {
      ...draft,
      title: draft.title.trim(),
      url: draft.url.trim(),
      author: draft.author?.trim() ? draft.author.trim() : undefined,
      id: makeId(),
      createdAt: Date.now(),
      status: "queued",
    };
    writeData({ v: 1, submissions: [item, ...current.submissions] });
    return item;
  }, []);

  const update = useCallback((id: string, patch: Partial<ContributionDraft>) => {
    const current = readData();
    const submissions = current.submissions.map((item) =>
      item.id === id
        ? {
            ...item,
            ...patch,
            title: (patch.title ?? item.title).trim(),
            url: (patch.url ?? item.url).trim(),
            author: patch.author !== undefined
              ? patch.author.trim() ? patch.author.trim() : undefined
              : item.author,
            updatedAt: Date.now(),
          }
        : item
    );
    writeData({ v: 1, submissions });
  }, []);

  const remove = useCallback((id: string) => {
    const current = readData();
    writeData({
      v: 1,
      submissions: current.submissions.filter((item) => item.id !== id),
    });
  }, []);

  const value = useMemo<ContribContextValue>(() => {
    return {
      data,
      submissions: [...data.submissions].sort((a, b) => b.createdAt - a.createdAt),
      count: data.submissions.length,
      add,
      update,
      remove,
    };
  }, [data, add, update, remove]);

  return <ContribContext.Provider value={value}>{children}</ContribContext.Provider>;
}

export function useContrib(): ContribContextValue {
  const ctx = useContext(ContribContext);
  if (!ctx) {
    throw new Error("useContrib must be used within <ContribProvider>");
  }
  return ctx;
}

/**
 * Canonical form of a URL for duplicate checks — lowercased host + path,
 * protocol/www/trailing-slash/hash stripped, query kept.
 */
export function normalizeUrl(url: string): string {
  try {
    const u = new URL(url.trim());
    const host = u.hostname.replace(/^www\./, "").toLowerCase();
    const path = u.pathname.replace(/\/+$/, "");
    return `${host}${path}${u.search}`;
  } catch {
    return url.trim().toLowerCase();
  }
}
