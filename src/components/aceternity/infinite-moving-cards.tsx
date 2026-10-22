"use client";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style Infinite Moving Cards — a seamless marquee of chips.
 * Duplicated track + CSS keyframes (`animate-marquee` in globals.css).
 * Pauses on hover; static under `prefers-reduced-motion`.
 */
export function InfiniteMovingCards({
  items,
  className,
}: {
  items: string[];
  className?: string;
}) {
  const track = [...items, ...items];
  return (
    <div
      className={cn(
        "group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <ul className="flex w-max animate-marquee gap-3 py-1 group-hover:[animation-play-state:paused]">
        {track.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= items.length ? "true" : undefined}
            className="whitespace-nowrap rounded-full border bg-card/80 px-4 py-2 text-sm text-muted-foreground shadow-sm"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
