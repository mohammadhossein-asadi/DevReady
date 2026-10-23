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
 * Client-side library state: bookmarks + study progress.
 * Everything lives in localStorage (no backend, no account) and is exposed
 * through useSyncExternalStore — the same hydration-safe pattern as the
 * language store (server snapshot = empty state).
 */

export type StudyStatus = "todo" | "doing" | "done";

interface NoteEntry {
  text: string;
  updatedAt: number;
}

interface LibraryData {
  v: 1;
  /** Saved resource keys in insertion order. */
  bookmarks: string[];
  /** Only non-default statuses are stored; an absent key means "todo". */
  status: Record<string, Exclude<StudyStatus, "todo">>;
  /** Per-resource personal notes (Phase 3). Absent = no note yet. */
  notes?: Record<string, NoteEntry>;
}

const STORAGE_KEY = "devready:library:v1";
const LIB_EVENT = "devready:library-change";

const EMPTY: LibraryData = { v: 1, bookmarks: [], status: {}, notes: {} };

function parse(raw: string | null): LibraryData {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw) as Partial<LibraryData>;
    if (data.v !== 1 || !Array.isArray(data.bookmarks) || typeof data.status !== "object" || data.status === null) {
      return EMPTY;
    }
    // notes is optional — pre-Phase-3 payloads migrate transparently.
    const notes: Record<string, NoteEntry> = {};
    if (typeof data.notes === "object" && data.notes !== null) {
      for (const [key, entry] of Object.entries(data.notes)) {
        if (
          entry &&
          typeof entry === "object" &&
          typeof (entry as NoteEntry).text === "string" &&
          typeof (entry as NoteEntry).updatedAt === "number"
        ) {
          notes[key] = { text: (entry as NoteEntry).text, updatedAt: (entry as NoteEntry).updatedAt };
        }
      }
    }
    return {
      v: 1,
      bookmarks: data.bookmarks.filter((k): k is string => typeof k === "string"),
      status: Object.fromEntries(
        Object.entries(data.status).filter(
          (entry): entry is [string, "doing" | "done"] =>
            entry[1] === "doing" || entry[1] === "done"
        )
      ),
      notes,
    };
  } catch {
    return EMPTY;
  }
}

/** Parsed-value cache so getSnapshot returns a stable identity per raw value. */
let cache: { raw: string | null; data: LibraryData } = { raw: undefined as never, data: EMPTY };

function readData(): LibraryData {
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
  window.addEventListener(LIB_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LIB_EVENT, onChange);
  };
}

function getSnapshot(): LibraryData {
  return readData();
}

function getServerSnapshot(): LibraryData {
  return EMPTY;
}

function writeData(next: LibraryData) {
  cache = { raw: JSON.stringify(next), data: next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode) — keep the in-session state working.
  }
  window.dispatchEvent(new Event(LIB_EVENT));
}

interface LibraryContextValue {
  /** Raw library data (bookmarks in order + status map + notes). */
  data: LibraryData;
  isBookmarked: (id: string) => boolean;
  toggleBookmark: (id: string) => void;
  statusOf: (id: string) => StudyStatus;
  setStatus: (id: string, status: StudyStatus) => void;
  /** Note text for a resource key ("" when none). */
  noteOf: (id: string) => string;
  /** Create/update a note; empty text deletes it. */
  setNote: (id: string, text: string) => void;
  bookmarkCount: number;
  doingCount: number;
  doneCount: number;
  notesCount: number;
  /** True when at least one bookmark, status or note exists. */
  hasData: boolean;
  resetAll: () => void;
}

const LibraryContext = createContext<LibraryContextValue | null>(null);

export function LibraryProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleBookmark = useCallback((id: string) => {
    const current = readData();
    const bookmarks = current.bookmarks.includes(id)
      ? current.bookmarks.filter((k) => k !== id)
      : [...current.bookmarks, id];
    writeData({ ...current, bookmarks });
  }, []);

  const setStatus = useCallback((id: string, status: StudyStatus) => {
    const current = readData();
    const nextStatus = { ...current.status };
    if (status === "todo") {
      delete nextStatus[id];
    } else {
      nextStatus[id] = status;
    }
    writeData({ ...current, status: nextStatus });
  }, []);

  const setNote = useCallback((id: string, text: string) => {
    const current = readData();
    const nextNotes = { ...current.notes };
    const trimmed = text.trim();
    if (trimmed) {
      nextNotes[id] = { text: trimmed, updatedAt: Date.now() };
    } else {
      delete nextNotes[id];
    }
    writeData({ ...current, notes: nextNotes });
  }, []);

  const resetAll = useCallback(() => {
    writeData(EMPTY);
  }, []);

  const value = useMemo<LibraryContextValue>(() => {
    const doingCount = Object.values(data.status).filter((s) => s === "doing").length;
    const doneCount = Object.values(data.status).filter((s) => s === "done").length;
    const notes = data.notes ?? {};
    const notesCount = Object.keys(notes).length;
    return {
      data,
      isBookmarked: (id) => data.bookmarks.includes(id),
      toggleBookmark,
      statusOf: (id) => data.status[id] ?? "todo",
      setStatus,
      noteOf: (id) => notes[id]?.text ?? "",
      setNote,
      bookmarkCount: data.bookmarks.length,
      doingCount,
      doneCount,
      notesCount,
      hasData: data.bookmarks.length > 0 || doingCount + doneCount + notesCount > 0,
      resetAll,
    };
  }, [data, toggleBookmark, setStatus, setNote, resetAll]);

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary(): LibraryContextValue {
  const ctx = useContext(LibraryContext);
  if (!ctx) {
    throw new Error("useLibrary must be used within <LibraryProvider>");
  }
  return ctx;
}
