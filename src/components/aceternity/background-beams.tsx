"use client";

import { cn } from "@/lib/utils";

/**
 * Aceternity-style Background Beams — decorative animated light beams
 * drifting across the hero. Pure CSS animation; disabled when the user
 * prefers reduced motion (see globals.css).
 */
export function BackgroundBeams({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden select-none",
        className
      )}
    >
      {/* Faint grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,black,transparent)]" />

      {/* Beams */}
      <div className="beams absolute inset-0">
        <span className="beam beam-1" />
        <span className="beam beam-2" />
        <span className="beam beam-3" />
      </div>

      {/* Ambient glow */}
      <div className="absolute -top-24 start-1/2 h-[28rem] w-[52rem] max-w-none -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl rtl:translate-x-1/2" />
    </div>
  );
}
