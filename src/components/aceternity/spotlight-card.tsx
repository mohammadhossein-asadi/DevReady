"use client";

import { useCallback, useRef, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style Spotlight Card.
 * Tracks the pointer and renders a soft radial glow beneath the cursor.
 * Implemented with CSS custom properties only — no animation library needed,
 * so it naturally respects `prefers-reduced-motion` (glow is static when idle).
 */
export function SpotlightCard({
  children,
  className,
  as: Tag = "div",
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "li";
} & React.HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement | null>(null);

  // HTMLElement-typed handler is assignable to the div/article/li union
  // (contravariance), which keeps the polymorphic `as` prop type-safe.
  const onMove = useCallback((event: MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
    node.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Tag
      ref={ref as unknown as React.Ref<HTMLDivElement> & React.Ref<HTMLElement> & React.Ref<HTMLLIElement>}
      onMouseMove={onMove}
      className={cn(
        "group/spot relative overflow-hidden rounded-xl border bg-card text-card-foreground",
        "transition-colors duration-300 hover:border-emerald-500/40",
        className
      )}
      {...rest}
    >
      {/* Pointer spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 0%), color-mix(in oklab, var(--primary) 14%, transparent), transparent 70%)",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </Tag>
  );
}
