import type { SrsCard } from "@/lib/srs-context";

/**
 * Phase 5 sync-merge engine — pure functions, zero IO.
 *
 * The five localStorage stores are merged client-side with per-key
 * conflict resolution instead of whole-snapshot last-write-wins:
 * - library.bookmarks → union (server order first, local-only appended)
 * - library.status    → both kept; conflicts resolve to the further state
 *                       ("done" beats "doing")
 * - library.notes     → per-key last-write-wins by updatedAt
 * - daily             → union of completed dates
 * - srs.cards         → per-card LWW by lastReviewedAt (fallback addedAt)
 * - srs.log           → per-day max of both counters
 * - contribs          → union by id; conflicts to the newer updatedAt
 * - votes             → per-key LWW by updatedAt
 *
 * Every merge validates the remote shape defensively: a malformed or
 * partially-corrupt cloud payload can never clobber good local data.
 */

export type StoreName = "library" | "daily" | "srs" | "contribs" | "votes";

export const STORE_KEYS: Record<StoreName, string> = {
  library: "devready:library:v1",
  daily: "devready:daily:v1",
  srs: "devready:srs:v1",
  contribs: "devready:contribs:v1",
  votes: "devready:votes:v1",
};

export const STORE_EVENTS: Record<StoreName, string> = {
  library: "devready:library-change",
  daily: "devready:daily-change",
  srs: "devready:srs-change",
  contribs: "devready:contrib-change",
  votes: "devready:votes-change",
};

/** The cloud snapshot payload — one raw JSON value per store. */
export interface SyncStores {
  library?: unknown;
  daily?: unknown;
  srs?: unknown;
  contribs?: unknown;
  votes?: unknown;
}

/** The cloud snapshot payload — one raw JSON value per store.
 * (The server also returns sibling metadata `updatedAt` / `device`.) */
export type SnapshotEnvelope = SyncStores;

// ---- IO helpers (thin; contexts keep their own caches in sync via events) --

export function readStoreRaw(store: StoreName): unknown {
  try {
    const raw = window.localStorage.getItem(STORE_KEYS[store]);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

export function writeStoreRaw(store: StoreName, value: unknown): void {
  try {
    window.localStorage.setItem(STORE_KEYS[store], JSON.stringify(value ?? null));
  } catch {
    // Storage unavailable — merge result still applies for this session.
  }
  window.dispatchEvent(new Event(STORE_EVENTS[store]));
}

// ---- tiny shape validators -------------------------------------------------

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj =>
  typeof v === "object" && v !== null && !Array.isArray(v);
const isDateKey = (v: unknown): v is string =>
  typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
const isLevel = (v: unknown): v is "easy" | "medium" | "hard" =>
  v === "easy" || v === "medium" || v === "hard";

// ---- library ----------------------------------------------------------------

interface MergedNote {
  text: string;
  updatedAt: number;
}

export function mergeLibrary(local: unknown, remote: unknown): unknown {
  const L = isObj(local) ? local : {};
  const R = isObj(remote) ? remote : {};

  // Bookmarks: union, server order first, then local-only in local order.
  const lBook = Array.isArray(L.bookmarks) ? L.bookmarks.filter(isString) : [];
  const rBook = Array.isArray(R.bookmarks) ? R.bookmarks.filter(isString) : [];
  const bookmarks = [...new Set([...rBook, ...lBook])];

  // Status: keep both; "done" beats "doing" on conflict.
  const lStatus = isObj(L.status) ? L.status : {};
  const rStatus = isObj(R.status) ? R.status : {};
  const status: Obj = { ...rStatus };
  for (const [key, value] of Object.entries(lStatus)) {
    if (value !== "doing" && value !== "done") continue;
    const remoteValue = status[key];
    if (remoteValue === "done") continue;
    if (remoteValue === "doing" && value === "doing") continue;
    status[key] = value;
  }

  // Notes: per-key LWW by updatedAt (two passes so both sides are compared).
  const lNotes = isObj(L.notes) ? L.notes : {};
  const rNotes = isObj(R.notes) ? R.notes : {};
  const notes: Record<string, MergedNote> = {};
  const absorbNote = (key: string, entry: unknown) => {
    if (!isObj(entry) || typeof entry.text !== "string") return;
    const updatedAt = typeof entry.updatedAt === "number" ? entry.updatedAt : 0;
    const prev = notes[key];
    if (!prev || prev.updatedAt <= updatedAt) {
      notes[key] = { text: entry.text, updatedAt };
    }
  };
  for (const [key, entry] of Object.entries(rNotes)) absorbNote(key, entry);
  for (const [key, entry] of Object.entries(lNotes)) absorbNote(key, entry);

  return { v: 1, bookmarks, status, notes };
}

function isString(v: unknown): v is string {
  return typeof v === "string";
}

// ---- daily ------------------------------------------------------------------

export function mergeDaily(local: unknown, remote: unknown): unknown {
  const l = isObj(local) && Array.isArray(local.completedDates)
    ? local.completedDates.filter(isDateKey)
    : [];
  const r = isObj(remote) && Array.isArray(remote.completedDates)
    ? remote.completedDates.filter(isDateKey)
    : [];
  return { v: 1, completedDates: [...new Set([...l, ...r])].sort() };
}

// ---- spaced repetition ------------------------------------------------------

function cardTimestamp(card: { lastReviewedAt?: unknown }): string {
  return typeof card.lastReviewedAt === "string" ? card.lastReviewedAt : "";
}

export function mergeSrs(local: unknown, remote: unknown): unknown {
  const L = isObj(local) ? local : {};
  const R = isObj(remote) ? remote : {};
  const lCards = isObj(L.cards) ? L.cards : {};
  const rCards = isObj(R.cards) ? R.cards : {};

  const cards: Record<string, SrsCard> = {};
  const absorbCard = (key: string, raw: unknown) => {
    if (!isObj(raw) || !isDateKey(raw.due) || !isDateKey(raw.addedAt)) return;
    if (typeof raw.ease !== "number" || typeof raw.interval !== "number") return;
    // Newest review wins per card.
    const prev = cards[key];
    if (prev && cardTimestamp(prev) >= cardTimestamp(raw)) return;
    cards[key] = raw as unknown as SrsCard;
  };
  for (const [key, raw] of Object.entries(rCards)) absorbCard(key, raw);
  for (const [key, raw] of Object.entries(lCards)) absorbCard(key, raw);

  const lLog = isObj(L.log) ? L.log : {};
  const rLog = isObj(R.log) ? R.log : {};
  const log: Record<string, { reviews: number; again: number }> = {};
  for (const [day, entry] of Object.entries({ ...rLog, ...lLog })) {
    if (!isDateKey(day) || !isObj(entry)) continue;
    const reviews = typeof entry.reviews === "number" ? entry.reviews : 0;
    const again = typeof entry.again === "number" ? entry.again : 0;
    const prev = log[day];
    log[day] = {
      reviews: Math.max(prev?.reviews ?? 0, reviews),
      again: Math.max(prev?.again ?? 0, again),
    };
  }

  return { v: 1, cards, log };
}

// ---- contributions ----------------------------------------------------------

export function mergeContribs(local: unknown, remote: unknown): unknown {
  const l = isObj(local) && Array.isArray(local.submissions) ? local.submissions : [];
  const r = isObj(remote) && Array.isArray(remote.submissions) ? remote.submissions : [];
  const byId = new Map<string, Obj>();
  const stamp = (item: Obj): number =>
    typeof item.updatedAt === "number"
      ? item.updatedAt
      : typeof item.createdAt === "number"
        ? item.createdAt
        : 0;

  for (const item of [...r, ...l]) {
    if (!isObj(item) || typeof item.id !== "string") continue;
    const prev = byId.get(item.id);
    if (!prev || stamp(prev) <= stamp(item)) byId.set(item.id, item);
  }
  // Oldest first — mirrors insertion order of a single device's history.
  const submissions = [...byId.values()].sort((a, b) => stamp(a) - stamp(b));
  return { v: 1, submissions };
}

// ---- votes ------------------------------------------------------------------

export function mergeVotes(local: unknown, remote: unknown): unknown {
  const L = isObj(local) ? local : {};
  const R = isObj(remote) ? remote : {};
  const lVotes = isObj(L.votes) ? L.votes : {};
  const rVotes = isObj(R.votes) ? R.votes : {};
  const votes: Record<string, { level: "easy" | "medium" | "hard"; updatedAt: number }> = {};
  const absorbVote = (key: string, entry: unknown) => {
    if (!isObj(entry) || !isLevel(entry.level)) return;
    const updatedAt = typeof entry.updatedAt === "number" ? entry.updatedAt : 0;
    const prev = votes[key];
    if (prev && prev.updatedAt >= updatedAt) return;
    votes[key] = { level: entry.level, updatedAt };
  };
  for (const [key, entry] of Object.entries(rVotes)) absorbVote(key, entry);
  for (const [key, entry] of Object.entries(lVotes)) absorbVote(key, entry);
  return { v: 1, votes };
}

const MERGERS: Record<StoreName, (local: unknown, remote: unknown) => unknown> = {
  library: mergeLibrary,
  daily: mergeDaily,
  srs: mergeSrs,
  contribs: mergeContribs,
  votes: mergeVotes,
};

/** Merge every store; returns the payload to write locally AND to the cloud. */
export function mergeAll(local: SyncStores, remote: SyncStores): SyncStores {
  const out: SyncStores = {};
  for (const name of Object.keys(MERGERS) as StoreName[]) {
    out[name] = MERGERS[name](local[name], remote[name]);
  }
  return out;
}

/** Apply a merged result to localStorage + notify the owning contexts. */
export function applyMergedStores(stores: SyncStores): void {
  for (const name of Object.keys(STORE_KEYS) as StoreName[]) {
    writeStoreRaw(name, stores[name]);
  }
}
