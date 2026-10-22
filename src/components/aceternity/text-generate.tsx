"use client";

import { cn } from "@/lib/utils";
import { Fragment } from "react";

/**
 * Aceternity-style Text Generate Effect — words reveal with a staggered
 * fade/slide on mount. Runs once; static under `prefers-reduced-motion`.
 */
export function TextGenerate({
  text,
  className,
  delayStep = 40,
}: {
  text: string;
  className?: string;
  delayStep?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden="true"
            className="word-reveal inline-block"
            style={{ animationDelay: `${i * delayStep}ms` }}
          >
            {word}
          </span>{" "}
        </Fragment>
      ))}
    </span>
  );
}
