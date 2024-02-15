/**
 * Pure SRS scheduling functions (no React, no hooks).
 * Extracted from srs-context.tsx for testability.
 */

export type Grade = "again" | "hard" | "good" | "easy";

export interface SrsCard {
  key: string;
  ease: number;
  interval: number;
  due: string;
  reps: number;
  lapses: number;
  addedAt: string;
  lastReviewedAt?: string;
  lastGrade?: Grade;
}

export const EASE_DEFAULT = 2.5;
export const EASE_MIN = 1.3;
export const EASE_MAX = 3;
export const INTERVAL_MAX = 365;

function clampEaseInternal(ease: number): number {
  return Math.min(EASE_MAX, Math.max(EASE_MIN, Math.round(ease * 100) / 100));
}

function clampIntervalInternal(days: number): number {
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
      return card.reps === 0 ? 1 : clampIntervalInternal(card.interval * 1.2);
    case "good":
      return card.reps === 0 ? 1 : clampIntervalInternal(card.interval * card.ease);
    case "easy":
      return card.reps === 0 ? 3 : clampIntervalInternal(card.interval * card.ease * 1.3);
  }
}

/** Exported for testing. */
export { clampEaseInternal as clampEase, clampIntervalInternal as clampInterval };