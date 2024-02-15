import { describe, it, expect } from "vitest";
import {
  nextIntervalOf,
  clampEase,
  clampInterval,
  masteryOf,
  EASE_MIN,
  EASE_MAX,
  INTERVAL_MAX,
  EASE_DEFAULT,
} from "./srs-scheduler";

describe("SRS scheduler pure functions", () => {
  describe("clampEase", () => {
    it("clamps to EASE_MIN (1.3)", () => {
      expect(clampEase(1.0)).toBe(EASE_MIN);
      expect(clampEase(0.5)).toBe(EASE_MIN);
    });

    it("clamps to EASE_MAX (3.0)", () => {
      expect(clampEase(3.5)).toBe(EASE_MAX);
      expect(clampEase(10)).toBe(EASE_MAX);
    });

    it("passes through values in range", () => {
      expect(clampEase(2.5)).toBe(2.5);
      expect(clampEase(2.0)).toBe(2.0);
      expect(clampEase(2.7)).toBe(2.7);
    });

    it("rounds to 2 decimal places", () => {
      expect(clampEase(2.555)).toBe(2.56);
      expect(clampEase(2.554)).toBe(2.55);
    });
  });

  describe("clampInterval", () => {
    it("clamps to minimum 1 day", () => {
      expect(clampInterval(0)).toBe(1);
      expect(clampInterval(-5)).toBe(1);
      expect(clampInterval(0.5)).toBe(1);
    });

    it("clamps to maximum 365 days", () => {
      expect(clampInterval(366)).toBe(INTERVAL_MAX);
      expect(clampInterval(1000)).toBe(INTERVAL_MAX);
    });

    it("passes through values in range", () => {
      expect(clampInterval(1)).toBe(1);
      expect(clampInterval(7)).toBe(7);
      expect(clampInterval(30)).toBe(30);
      expect(clampInterval(365)).toBe(365);
    });

    it("rounds to nearest integer", () => {
      expect(clampInterval(1.4)).toBe(1);
      expect(clampInterval(1.5)).toBe(2);
      expect(clampInterval(7.6)).toBe(8);
    });
  });

  describe("masteryOf", () => {
    it("returns 'learning' for interval 0", () => {
      expect(masteryOf(0)).toBe("learning");
    });

    it("returns 'learning' for negative intervals", () => {
      expect(masteryOf(-1)).toBe("learning");
    });

    it("returns 'familiar' for intervals 1-6 days", () => {
      expect(masteryOf(1)).toBe("familiar");
      expect(masteryOf(3)).toBe("familiar");
      expect(masteryOf(6)).toBe("familiar");
    });

    it("returns 'confident' for intervals 7-20 days", () => {
      expect(masteryOf(7)).toBe("confident");
      expect(masteryOf(14)).toBe("confident");
      expect(masteryOf(20)).toBe("confident");
    });

    it("returns 'mastered' for intervals >= 21 days", () => {
      expect(masteryOf(21)).toBe("mastered");
      expect(masteryOf(30)).toBe("mastered");
      expect(masteryOf(365)).toBe("mastered");
    });
  });

  describe("nextIntervalOf", () => {
    const baseCard = {
      key: "test",
      ease: EASE_DEFAULT,
      interval: 7,
      due: "2024-01-01",
      reps: 3,
      lapses: 0,
      addedAt: "2024-01-01",
    };

    it("returns 0 for 'again' grade", () => {
      expect(nextIntervalOf(baseCard, "again")).toBe(0);
    });

    it("returns 1 for 'hard' on new card (reps=0)", () => {
      const newCard = { ...baseCard, reps: 0 };
      expect(nextIntervalOf(newCard, "hard")).toBe(1);
    });

    it("multiplies interval by 1.2 for 'hard' on reviewed card", () => {
      expect(nextIntervalOf(baseCard, "hard")).toBe(clampInterval(7 * 1.2));
    });

    it("returns 1 for 'good' on new card (reps=0)", () => {
      const newCard = { ...baseCard, reps: 0 };
      expect(nextIntervalOf(newCard, "good")).toBe(1);
    });

    it("multiplies interval by ease for 'good' on reviewed card", () => {
      expect(nextIntervalOf(baseCard, "good")).toBe(clampInterval(7 * EASE_DEFAULT));
    });

    it("returns 3 for 'easy' on new card (reps=0)", () => {
      const newCard = { ...baseCard, reps: 0 };
      expect(nextIntervalOf(newCard, "easy")).toBe(3);
    });

    it("multiplies interval by ease * 1.3 for 'easy' on reviewed card", () => {
      expect(nextIntervalOf(baseCard, "easy")).toBe(clampInterval(7 * EASE_DEFAULT * 1.3));
    });

    it("respects EASE_MIN floor", () => {
      const lowEaseCard = { ...baseCard, ease: EASE_MIN };
      expect(nextIntervalOf(lowEaseCard, "good")).toBe(clampInterval(7 * EASE_MIN));
    });

    it("respects EASE_MAX ceiling", () => {
      const highEaseCard = { ...baseCard, ease: EASE_MAX };
      expect(nextIntervalOf(highEaseCard, "easy")).toBe(clampInterval(7 * EASE_MAX * 1.3));
    });

    it("respects INTERVAL_MAX ceiling", () => {
      const longIntervalCard = { ...baseCard, interval: 300 };
      expect(nextIntervalOf(longIntervalCard, "easy")).toBe(INTERVAL_MAX);
    });

    it("handles zero interval (learning) correctly for hard/good/easy", () => {
      const learningCard = { ...baseCard, interval: 0, reps: 0 };
      expect(nextIntervalOf(learningCard, "hard")).toBe(1);
      expect(nextIntervalOf(learningCard, "good")).toBe(1);
      expect(nextIntervalOf(learningCard, "easy")).toBe(3);
    });
  });

  describe("constants", () => {
    it("has expected constant values", () => {
      expect(EASE_DEFAULT).toBe(2.5);
      expect(EASE_MIN).toBe(1.3);
      expect(EASE_MAX).toBe(3);
      expect(INTERVAL_MAX).toBe(365);
    });
  });
});