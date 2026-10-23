"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  bestStreakOf,
  challengeForDate,
  currentStreakOf,
  dateKey,
} from "@/lib/data/challenges";

/**
 * Daily challenge progress: the set of completed local-date keys, persisted
 * in localStorage and exposed through useSyncExternalStore (server snapshot
 * = empty) — the same hydration-safe pattern as the language/library stores.
 * Streaks are derived from the date set, never stored, so clock edits and
 * imports stay consistent.
 */

interface DailyData {
  v: 1;
  /** Completed local dates (YYYY-MM-DD). */
  completedDates: string[];
}

const STORAGE_KEY = "devready:daily:v1";
const DAILY_EVENT = "devready:daily-change";

const EMPTY: DailyData = { v: 1, completedDates: [] };

function parse(raw: string | null): DailyData {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw) as Partial<DailyData>;
    if (data.v !== 1 || !Array.isArray(data.completedDates)) return EMPTY;
    return {
      v: 1,
      completedDates: data.completedDates.filter(
        (k): k is string => typeof k === "string" && /^\d{4}-\d{2}-\d{2}$/.test(k)
      ),
    };
  } catch {
    return EMPTY;
  }
}

/** Parsed-value cache so getSnapshot returns a stable identity per raw value. */
let cache: { raw: string | null; data: DailyData } = {
  raw: undefined as never,
  data: EMPTY,
};

function readData(): DailyData {
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
  window.addEventListener(DAILY_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(DAILY_EVENT, onChange);
  };
}

function getSnapshot(): DailyData {
  return readData();
}

function getServerSnapshot(): DailyData {
  return EMPTY;
}

function writeData(next: DailyData) {
  cache = { raw: JSON.stringify(next), data: next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode) — keep the in-session state working.
  }
  window.dispatchEvent(new Event(DAILY_EVENT));
}

export interface DailyContextValue {
  data: DailyData;
  /** Local date key for "today" (recomputed per render; cheap). */
  today: string;
  /** Today's deterministic challenge. */
  todayChallenge: ReturnType<typeof challengeForDate>;
  isTodayDone: boolean;
  /** Mark today's challenge complete (idempotent). */
  completeToday: () => void;
  currentStreak: number;
  bestStreak: number;
  totalCompleted: number;
  isDone: (key: string) => boolean;
}

const DailyContext = createContext<DailyContextValue | null>(null);

/**
 * "Today" is external browser state (the user's clock), so it is read through
 * useSyncExternalStore: the server snapshot is "" (renders a neutral state),
 * and the client switches to the real local date right after hydration —
 * this keeps SSR stable even across timezones (server UTC vs user local).
 */
const subscribeToday = (onChange: () => void) => () => {};
const getToday = () => dateKey();
const getServerToday = () => "";

export function DailyProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const today = useSyncExternalStore(subscribeToday, getToday, getServerToday);

  const completeToday = useCallback(() => {
    const current = readData();
    const key = dateKey();
    if (current.completedDates.includes(key)) return;
    writeData({
      v: 1,
      completedDates: [...current.completedDates, key],
    });
  }, []);

  const value = useMemo<DailyContextValue>(() => {
    return {
      data,
      today,
      todayChallenge: challengeForDate(today || "1970-01-01"),
      isTodayDone: today !== "" && data.completedDates.includes(today),
      completeToday,
      currentStreak: today ? currentStreakOf(data.completedDates, today) : 0,
      bestStreak: bestStreakOf(data.completedDates),
      totalCompleted: data.completedDates.length,
      isDone: (key: string) => data.completedDates.includes(key),
    };
  }, [data, today, completeToday]);
  return <DailyContext.Provider value={value}>{children}</DailyContext.Provider>;
}

export function useDaily(): DailyContextValue {
  const ctx = useContext(DailyContext);
  if (!ctx) {
    throw new Error("useDaily must be used within <DailyProvider>");
  }
  return ctx;
}
