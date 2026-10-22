"use client";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style Moving Border — a button wrapped in a slowly rotating
 * conic-gradient border. Pure CSS (@property + keyframes defined in
 * globals.css); the border is static when `prefers-reduced-motion` is set.
 */
export function MovingBorderButton({
  children,
  onClick,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="moving-border group relative inline-flex min-h-11 cursor-pointer rounded-xl p-px text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span aria-hidden="true" className="moving-border__glow" />
      <span
        className={cn(
          "relative z-10 inline-flex h-full w-full items-center justify-center gap-2 rounded-[11px] bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors group-hover:bg-primary/90",
          className
        )}
      >
        {children}
      </span>
    </button>
  );
}
