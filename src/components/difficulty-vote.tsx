"use client";

import { Check, CircleHelp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { useVotes, type VoteLevel } from "@/lib/votes-context";
import type { DictKey } from "@/lib/i18n";

/**
 * Phase 5 — difficulty vote widget (resource detail action bar).
 * One-click rating (easy / medium / hard) that works for everyone locally;
 * signed-in votes are mirrored into the community aggregates. Clicking the
 * active level again clears the vote.
 */

const LEVELS: { level: VoteLevel; key: DictKey; dot: string; active: string }[] = [
  {
    level: "easy",
    key: "votes.level.easy",
    dot: "bg-emerald-500",
    active:
      "border-emerald-600 bg-emerald-600 text-white hover:bg-emerald-600/90 dark:border-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-500/90",
  },
  {
    level: "medium",
    key: "votes.level.medium",
    dot: "bg-amber-500",
    active:
      "border-amber-600 bg-amber-600 text-white hover:bg-amber-600/90 dark:border-amber-500 dark:bg-amber-500 dark:hover:bg-amber-500/90",
  },
  {
    level: "hard",
    key: "votes.level.hard",
    dot: "bg-rose-500",
    active:
      "border-rose-600 bg-rose-600 text-white hover:bg-rose-600/90 dark:border-rose-500 dark:bg-rose-500 dark:hover:bg-rose-500/90",
  },
];

export function DifficultyVote({ id }: { id: string }) {
  const { t } = useLanguage();
  const { voteOf, setVote, aggregateOf, consensusOf } = useVotes();

  const mine = voteOf(id);
  const aggregate = aggregateOf(id);
  const consensus = consensusOf(id);
  const total = aggregate?.total ?? 0;

  const segments = LEVELS.map(({ level, dot }) => {
    const count = aggregate?.[level] ?? 0;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;
    return { level, count, pct, dot };
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-semibold">{t("votes.title")}</p>
        {mine ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
            <Check className="size-3.5" aria-hidden="true" />
            {t("votes.yours")}: {t(`votes.level.${mine}` as DictKey)}
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{t("votes.hint")}</p>

      <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label={t("votes.title")}>
        {LEVELS.map(({ level, key, active }) => {
          const count = aggregate?.[level] ?? 0;
          const selected = mine === level;
          return (
            <button
              key={level}
              type="button"
              aria-pressed={selected}
              onClick={() => setVote(id, selected ? null : level)}
              title={selected ? t("votes.clear") : undefined}
              className={cn(
                "flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-lg border px-2 py-2 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring active:scale-[0.97] motion-reduce:active:scale-100",
                selected
                  ? active
                  : "border-border bg-background text-foreground hover:border-foreground/25 hover:bg-muted/60"
              )}
            >
              <span>{t(key)}</span>
              {total > 0 ? (
                <span
                  className={cn(
                    "text-[11px] font-medium",
                    selected ? "text-white/85" : "text-muted-foreground"
                  )}
                >
                  {count}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Community distribution */}
      <div className="mt-3">
        {total > 0 ? (
          <>
            <div
              className="flex h-1.5 w-full overflow-hidden rounded-full bg-muted"
              role="img"
              aria-label={t("votes.total", { n: total })}
            >
              {segments.map(({ level, pct, dot }) => (
                <div
                  key={level}
                  className={cn("h-full", dot)}
                  style={{ width: `${pct}%` }}
                />
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {consensus
                ? t("votes.consensus", {
                    level: t(`votes.level.${consensus.level}` as DictKey),
                  })
                : t("votes.total", { n: total })}
            </p>
          </>
        ) : (
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CircleHelp className="size-3.5 shrink-0" aria-hidden="true" />
            {t("votes.none")}
          </p>
        )}
      </div>

      <p className="mt-2 text-xs text-muted-foreground/90">
        {mine ? t("votes.sharedNote") : t("votes.localNote")}{" "}
        <a
          href="#/account"
          className="font-medium text-primary underline-offset-2 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {t("votes.signIn")}
        </a>
      </p>
    </div>
  );
}
