"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * Aceternity-style Timeline — a vertical timeline whose stage titles stick in
 * their own column while the stage content scrolls past (desktop), over a
 * gradient spine with glowing stage nodes.
 *
 * CSS-only animation + one IntersectionObserver per entry for the
 * reveal-on-scroll; `prefers-reduced-motion` collapses all motion (entries
 * render fully visible). RTL-safe: the spine and node live on the
 * *inline-start* side via logical properties, and the title/content grid
 * columns follow the document direction automatically.
 */

interface TimelineItem {
  num: number;
  title: string;
  duration: string;
  content: ReactNode;
}

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLLIElement | null>(null);
  // If IntersectionObserver is unavailable (ancient browsers / odd embeds),
  // entries render visible immediately instead of staying hidden.
  const [inView, setInView] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -6% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function TimelineEntry({ item }: { item: TimelineItem }) {
  const { ref, inView } = useInView();

  return (
    <li
      ref={ref}
      className={cn(
        // ps-12 clears the mobile node (size-10); md:ps-14 clears the md node
        // (size-12) so the title/content grid never sits under the node.
        "relative ps-12 md:grid md:grid-cols-[13rem_minmax(0,1fr)] md:gap-7 md:ps-14",
        // Reveal-on-scroll (collapses for reduced motion below).
        "transition-[opacity,translate,transform] duration-700 ease-out motion-reduce:transition-none motion-reduce:translate-y-0 motion-reduce:transform-none",
        inView
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 motion-reduce:opacity-100"
      )}
    >
      {/* Spine node — anchored to the gradient line */}
      <span
        aria-hidden="true"
        className="absolute start-0 top-0.5 z-10 grid size-10 place-items-center rounded-full border border-primary/30 bg-card text-sm font-extrabold text-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_10%,transparent)] md:start-[-1px] md:size-12"
      >
        {item.num}
      </span>

      {/* Title column — sticky while the stage content scrolls (md+) */}
      <div className="md:sticky md:top-24 md:self-start md:py-1">
        <h3 className="text-base font-extrabold tracking-tight md:text-lg">
          {item.title}
        </h3>
        <p className="mt-1.5 inline-flex rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
          {item.duration}
        </p>
      </div>

      {/* Content column */}
      <div className="mt-3 rounded-xl border bg-card p-5 shadow-sm transition-colors hover:border-primary/30 md:mt-0">
        {item.content}
      </div>
    </li>
  );
}

export function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      {/* Gradient spine (inline-start; mirrors automatically in RTL) */}
      <div
        aria-hidden="true"
        className="absolute bottom-2 start-[19px] top-2 md:start-[23px]"
      >
        <div className="h-full w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent motion-reduce:bg-primary/20" />
      </div>

      <ol className="relative space-y-10">
        {items.map((item) => (
          <TimelineEntry key={item.num} item={item} />
        ))}
      </ol>
    </div>
  );
}
