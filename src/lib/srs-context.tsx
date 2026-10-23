"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dateKey, shiftKey } from "@/lib/data/challenges";
import { refOf } from "@/lib/data/resources";

/**
 * Spaced repetition (Phase 4): an SM-2-lite scheduler over the resource
 * catalog. Cards live in localStorage (`devready:srs:v1`) keyed by the same
 * resource keys as the library (`<catId>·<name>·<url>`), and are exposed
 * through useSyncExternalStore — the same hydration-safe pattern as the
 * language/library/daily stores (server snapshot = empty).
 *
 * Scheduling rules (daily granularity):
 * - again → interval 0, due today (relearn), reps reset, ease −0.20
 * - hard  → interval ×1.2 (min 1 day), ease −0.15
 * - good  → reps 0 ? 1 day : interval × ease
 * - easy  → reps 0 ? 3 days : interval × ease × 1.3, ease +0.15
 * - ease clamped to [1.3, 3.0]; interval clamped to [1, 365] days.
 */

export type Grade = "again" | "hard" | "good" | "easy";

export interface SrsCard {
  /** Resource storage key (resourceKeyOf) — catalog resolves name/category. */
  key: string;
  /** Ease factor, clamped to [EASE_MIN, EASE_MAX]. */
  ease: number;
  /** Current interval in days; 0 = learning (due today). */
  interval: number;
  /** Local date key (YYYY-MM-DD) when the card is next due. */
  due: string;
  /** Consecutive successful reviews since the last lapse. */
  reps: number;
  /** Total times the card was graded "again". */
  lapses: number;
  addedAt: string;
  lastReviewedAt?: string;
  lastGrade?: Grade;
}

interface DayLog {
  reviews: number;
  again: number;
}

interface SrsData {
  v: 1;
  cards: Record<string, SrsCard>;
  /** reviews-per-day log for the retention stat. */
  log: Record<string, DayLog>;
}

export const EASE_DEFAULT = 2.5;
export const EASE_MIN = 1.3;
export const EASE_MAX = 3;
export const INTERVAL_MAX = 365;

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const STORAGE_KEY = "devready:srs:v1";
const SRS_EVENT = "devready:srs-change";

const EMPTY: SrsData = { v: 1, cards: {}, log: {} };

function clampEase(ease: number): number {
  return Math.min(EASE_MAX, Math.max(EASE_MIN, Math.round(ease * 100) / 100));
}

function clampInterval(days: number): number {
  return Math.min(INTERVAL_MAX, Math.max(1, Math.round(days)));
}

export type Mastery = "learning" | "familiar" | "confident" | "mastered";

/** Display band for a card's current interval. */
export function masteryOf(interval: number): Mastery {
  if (interval < 1) return "learning";
  if (interval < 7) return "familiar";
  if (interval < 21) return "confident";
  return "mastered";
}

/** Interval (days) a grade would produce — 0 means "due today". Pure. */
export function nextIntervalOf(card: SrsCard, grade: Grade): number {
  switch (grade) {
    case "again":
      return 0;
    case "hard":
      return card.reps === 0 ? 1 : clampInterval(card.interval * 1.2);
    case "good":
      return card.reps === 0 ? 1 : clampInterval(card.interval * card.ease);
    case "easy":
      return card.reps === 0 ? 3 : clampInterval(card.interval * card.ease * 1.3);
  }
}

/** Pure SM-2-lite transition. */
export function scheduleCard(card: SrsCard, grade: Grade, today: string): SrsCard {
  const interval = nextIntervalOf(card, grade);
  const ease =
    grade === "again"
      ? clampEase(card.ease - 0.2)
      : grade === "hard"
        ? clampEase(card.ease - 0.15)
        : grade === "easy"
          ? clampEase(card.ease + 0.15)
          : card.ease;
  return {
    ...card,
    ease,
    interval,
    reps: grade === "again" ? 0 : card.reps + 1,
    lapses: card.lapses + (grade === "again" ? 1 : 0),
    due: grade === "again" ? today : shiftKey(today, interval),
    lastReviewedAt: today,
    lastGrade: grade,
  };
}

function parseCard(key: string, raw: unknown): SrsCard | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const c = raw as Partial<SrsCard>;
  if (
    typeof c.ease !== "number" || Number.isNaN(c.ease) ||
    typeof c.interval !== "number" || c.interval < 0 ||
    typeof c.due !== "string" || !DATE_RE.test(c.due) ||
    typeof c.reps !== "number" || c.reps < 0 ||
    typeof c.lapses !== "number" || c.lapses < 0 ||
    typeof c.addedAt !== "string" || !DATE_RE.test(c.addedAt)
  ) {
    return undefined;
  }
  return {
    key,
    ease: clampEase(c.ease),
    interval: Math.max(0, c.interval),
    due: c.due,
    reps: Math.floor(c.reps),
    lapses: Math.floor(c.lapses),
    addedAt: c.addedAt,
    lastReviewedAt: typeof c.lastReviewedAt === "string" ? c.lastReviewedAt : undefined,
    lastGrade: c.lastGrade === "again" || c.lastGrade === "hard" || c.lastGrade === "good" || c.lastGrade === "easy" ? c.lastGrade : undefined,
  };
}

function parse(raw: string | null): SrsData {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw) as Partial<SrsData>;
    if (data.v !== 1 || typeof data.cards !== "object" || data.cards === null) {
      return EMPTY;
    }
    const cards: Record<string, SrsCard> = {};
    for (const [key, rawCard] of Object.entries(data.cards)) {
      const card = parseCard(key, rawCard);
      if (card) cards[key] = card;
    }
    const log: Record<string, DayLog> = {};
    if (typeof data.log === "object" && data.log !== null) {
      for (const [day, entry] of Object.entries(data.log)) {
        if (entry && typeof entry === "object" && typeof (entry as DayLog).reviews === "number") {
          log[day] = { reviews: (entry as DayLog).reviews, again: (entry as DayLog).again ?? 0 };
        }
      }
    }
    return { v: 1, cards, log };
  } catch {
    return EMPTY;
  }
}

/** Parsed-value cache so getSnapshot returns a stable identity per raw value. */
let cache: { raw: string | null; data: SrsData } = { raw: undefined as never, data: EMPTY };

function readData(): SrsData {
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
  window.addEventListener(SRS_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(SRS_EVENT, onChange);
  };
}

function getServerSnapshot(): SrsData {
  return EMPTY;
}

function writeData(next: SrsData) {
  cache = { raw: JSON.stringify(next), data: next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable (private mode) — keep the in-session state working.
  }
  window.dispatchEvent(new Event(SRS_EVENT));
}

export interface SrsContextValue {
  data: SrsData;
  /** Hydration-safe local "today" ("" before hydration). */
  today: string;
  /** Resolved cards (ghost keys dropped), due first, then by interval desc. */
  cards: SrsCard[];
  /** Cards with due <= today. */
  dueCards: SrsCard[];
  dueCount: number;
  totalCount: number;
  masteredCount: number;
  /** Reviews completed today. */
  reviewedToday: number;
  /** All-time share of non-"again" grades, 0–100; null before first review. */
  retention: number | null;
  isInDeck: (key: string) => boolean;
  cardOf: (key: string) => SrsCard | undefined;
  addToDeck: (key: string) => void;
  removeFromDeck: (key: string) => void;
  gradeCard: (key: string, grade: Grade) => void;
}

const SrsContext = createContext<SrsContextValue | null>(null);

/**
 * "Today" is external browser state, read through useSyncExternalStore
 * (server snapshot "") — the same timezone-safe pattern as the daily store.
 */
const subscribeToday = (onChange: () => void) => () => {};
const getToday = () => dateKey();
const getServerToday = () => "";

function sortByDue(a: SrsCard, b: SrsCard): number {
  if (a.due !== b.due) return a.due < b.due ? -1 : 1;
  return b.interval - a.interval;
}

export function SrsProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, readData, getServerSnapshot);
  const today = useSyncExternalStore(subscribeToday, getToday, getServerToday);

  const addToDeck = useCallback((key: string) => {
    const current = readData();
    if (current.cards[key]) return;
    const card: SrsCard = {
      key,
      ease: EASE_DEFAULT,
      interval: 0,
      due: dateKey(),
      reps: 0,
      lapses: 0,
      addedAt: dateKey(),
    };
    writeData({ ...current, cards: { ...current.cards, [key]: card } });
  }, []);

  const removeFromDeck = useCallback((key: string) => {
    const current = readData();
    if (!current.cards[key]) return;
    const cards = { ...current.cards };
    delete cards[key];
    writeData({ ...current, cards });
  }, []);

  const gradeCard = useCallback((key: string, grade: Grade) => {
    const current = readData();
    const card = current.cards[key];
    if (!card) return;
    const day = dateKey();
    const dayLog = current.log[day] ?? { reviews: 0, again: 0 };
    writeData({
      v: 1,
      cards: { ...current.cards, [key]: scheduleCard(card, grade, day) },
      log: {
        ...current.log,
        [day]: {
          reviews: dayLog.reviews + 1,
          again: dayLog.again + (grade === "again" ? 1 : 0),
        },
      },
    });
  }, []);

  const value = useMemo<SrsContextValue>(() => {
    const all = Object.values(data.cards)
      .filter((card) => Boolean(refOf(card.key)))
      .sort(sortByDue);
    const due = today ? all.filter((card) => card.due <= today) : [];
    let reviews = 0;
    let again = 0;
    for (const entry of Object.values(data.log)) {
      reviews += entry.reviews;
      again += entry.again;
    }
    return {
      data,
      today,
      cards: all,
      dueCards: due,
      dueCount: due.length,
      totalCount: all.length,
      masteredCount: all.filter((card) => masteryOf(card.interval) === "mastered").length,
      reviewedToday: today ? data.log[today]?.reviews ?? 0 : 0,
      retention: reviews > 0 ? Math.round(((reviews - again) / reviews) * 100) : null,
      isInDeck: (key) => Boolean(data.cards[key]),
      cardOf: (key) => data.cards[key],
      addToDeck,
      removeFromDeck,
      gradeCard,
    };
  }, [data, today, addToDeck, removeFromDeck, gradeCard]);

  return <SrsContext.Provider value={value}>{children}</SrsContext.Provider>;
}

export function useSrs(): SrsContextValue {
  const ctx = useContext(SrsContext);
  if (!ctx) {
    throw new Error("useSrs must be used within <SrsProvider>");
  }
  return ctx;
}
