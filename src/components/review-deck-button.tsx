"use client";

import { CalendarClock, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { useSrs } from "@/lib/srs-context";
import { cn } from "@/lib/utils";

interface ReviewDeckButtonProps {
  /** Storage key of the resource (resourceKeyOf). */
  id: string;
  /** Extra classes. */
  className?: string;
}

/** Locale-aware medium date for a YYYY-MM-DD key (Jalali in FA). */
function formatDue(key: string, isFa: boolean): string {
  try {
    return new Intl.DateTimeFormat(isFa ? "fa-IR" : "en-US", {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(`${key}T12:00:00Z`));
  } catch {
    return key;
  }
}

/**
 * Toggle a resource's membership in the spaced-repetition deck (detail pages).
 * When the card is in the deck, the next due date is shown.
 */
export function ReviewDeckButton({ id, className }: ReviewDeckButtonProps) {
  const { t, isFa } = useLanguage();
  const { isInDeck, addToDeck, removeFromDeck, cardOf } = useSrs();
  const active = isInDeck(id);
  const card = cardOf(id);

  const label = active ? t("detail.review.inDeck") : t("detail.review.add");

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Button
        type="button"
        variant={active ? "default" : "outline"}
        onClick={() => (active ? removeFromDeck(id) : addToDeck(id))}
        aria-pressed={active}
        className="min-h-11 gap-2"
      >
        {active ? (
          <CalendarCheck className="size-4" aria-hidden="true" />
        ) : (
          <CalendarClock className="size-4" aria-hidden="true" />
        )}
        {label}
      </Button>
      {active && card ? (
        <>
          <p className="text-xs font-medium text-primary">
            {t("detail.review.due", { date: formatDue(card.due, isFa) })}
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {t("detail.review.hint")}
          </p>
        </>
      ) : null}
    </div>
  );
}
