"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { useLibrary } from "@/lib/library-context";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  /** Storage key of the resource (resourceKeyOf). */
  id: string;
  /** Labeled variant for detail/action bars; default is icon-only. */
  labeled?: boolean;
  /** Extra classes — e.g. `relative z-30` to sit above a card's link overlay. */
  className?: string;
}

/**
 * Toggle a resource's bookmark. Icon-only variant is sized for dense card
 * layouts; labeled variant is for detail pages. Both keep ≥40px touch
 * targets and announce state via aria-pressed.
 */
export function BookmarkButton({ id, labeled = false, className }: BookmarkButtonProps) {
  const { t } = useLanguage();
  const { isBookmarked, toggleBookmark } = useLibrary();
  const active = isBookmarked(id);

  const label = active ? t("detail.bookmark.remove") : t("detail.bookmark.add");

  if (labeled) {
    return (
      <Button
        type="button"
        variant={active ? "default" : "outline"}
        onClick={() => toggleBookmark(id)}
        aria-pressed={active}
        className="min-h-11 gap-2"
      >
        {active ? (
          <BookmarkCheck className="size-4" aria-hidden="true" />
        ) : (
          <Bookmark className="size-4" aria-hidden="true" />
        )}
        {label}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => toggleBookmark(id)}
      aria-pressed={active}
      aria-label={label}
      title={label}
      className={cn(
        "size-8 rounded-lg text-muted-foreground transition-transform hover:bg-muted hover:text-foreground active:scale-90 motion-reduce:transition-none",
        active && "text-primary hover:text-primary",
        className
      )}
    >
      {active ? (
        <Bookmark className="size-4 fill-current" aria-hidden="true" />
      ) : (
        <Bookmark className="size-4" aria-hidden="true" />
      )}
    </Button>
  );
}
