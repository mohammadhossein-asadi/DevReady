"use client";

import { useMemo, useState } from "react";
import {
  BookOpenCheck,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Flame,
  Lightbulb,
  MessagesSquare,
  ScrollText,
  Sparkles,
  Target,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { useLanguage } from "@/lib/language-context";
import { useDaily } from "@/lib/daily-context";
import {
  CHALLENGE_TOPIC_LABELS,
  challenges,
  type Challenge,
  type ChallengeTopic,
  type ChallengeType,
} from "@/lib/data/challenges";
import { cn } from "@/lib/utils";

/** Locale-aware long date (Gregorian in EN, Jalali in FA). */
function formatDay(key: string, isFa: boolean): string {
  try {
    const date = new Date(`${key}T12:00:00Z`);
    // Guard against invalid dates (e.g. "0000-00-00" or malformed keys).
    if (Number.isNaN(date.getTime()) || date.getFullYear() < 1970) {
      return key;
    }
    return new Intl.DateTimeFormat(isFa ? "fa-IR" : "en-US", {
      dateStyle: "full",
      timeZone: "UTC",
    }).format(date);
  } catch {
    return key;
  }
}

const TYPE_ICON: Record<ChallengeType, typeof Target> = {
  theory: BrainCircuit,
  coding: Wrench,
  system: ScrollText,
  behavioral: MessagesSquare,
};

const DIFFICULTY_KEY: Record<1 | 2 | 3, "daily.difficulty.1" | "daily.difficulty.2" | "daily.difficulty.3"> = {
  1: "daily.difficulty.1",
  2: "daily.difficulty.2",
  3: "daily.difficulty.3",
};

/** Single challenge body — used by today's hero card and archive cards. */
function ChallengeBody({
  challenge,
  defaultOpen = false,
}: {
  challenge: Challenge;
  defaultOpen?: boolean;
}) {
  const { t, lang, num } = useLanguage();
  const [hintLevel, setHintLevel] = useState(0);
  const [showAnswer, setShowAnswer] = useState(defaultOpen);
  const TypeIcon = TYPE_ICON[challenge.type];

  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="gap-1.5 bg-background px-2.5 py-1 text-xs">
          <TypeIcon className="size-3.5" aria-hidden="true" />
          {t(`daily.type.${challenge.type}` as const)}
        </Badge>
        <Badge variant="secondary" className="px-2.5 py-1 text-xs">
          {CHALLENGE_TOPIC_LABELS[challenge.topic][lang]}
        </Badge>
        <Badge
          variant="outline"
          className={cn(
            "px-2.5 py-1 text-xs",
            challenge.difficulty === 1 &&
              "border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400",
            challenge.difficulty === 2 &&
              "border-amber-600/30 text-amber-700 dark:border-amber-400/30 dark:text-amber-400",
            challenge.difficulty === 3 &&
              "border-rose-600/30 text-rose-700 dark:border-rose-400/30 dark:text-rose-400"
          )}
        >
          {t(DIFFICULTY_KEY[challenge.difficulty])}
        </Badge>
      </div>

      <p className="mt-4 text-base font-semibold leading-relaxed sm:text-lg">
        {challenge.question[lang]}
      </p>

      {/* Progressive hints */}
      {challenge.hints.length > 0 && hintLevel < challenge.hints.length ? (
        <div className="mt-4">
          <Button
            variant="outline"
            size="sm"
            className="min-h-9 gap-2"
            onClick={() => setHintLevel((v) => v + 1)}
          >
            <Lightbulb className="size-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
            {t("daily.showHint", {
              n: num(hintLevel + 1),
              total: num(challenge.hints.length),
            })}
          </Button>
          {hintLevel > 0 ? (
            <ul className="mt-3 space-y-2">
              {challenge.hints.slice(0, hintLevel).map((hint, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 rounded-lg border border-amber-600/20 bg-amber-500/5 p-3 text-sm leading-relaxed dark:border-amber-400/20"
                >
                  <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                  <span>{hint[lang]}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {/* Answer */}
      <div className="mt-4">
        {!showAnswer ? (
          <Button
            variant="outline"
            size="sm"
            className="min-h-9 gap-2"
            onClick={() => setShowAnswer(true)}
            aria-expanded={false}
          >
            <BookOpenCheck className="size-4 text-primary" aria-hidden="true" />
            {t("daily.showAnswer")}
          </Button>
        ) : (
          <div>
            <Button
              variant="ghost"
              size="sm"
              className="min-h-8 gap-1.5 text-muted-foreground"
              onClick={() => setShowAnswer(false)}
              aria-expanded
            >
              <ChevronDown className="size-4 rotate-180" aria-hidden="true" />
              {t("daily.hideAnswer")}
            </Button>
            <h4 className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t("daily.answer")}
            </h4>
            <ul className="mt-2 space-y-2">
              {challenge.answer.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-sm leading-relaxed">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{point[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Continue studying */}
      {challenge.categoryId ? (
        <a
          href={`#/resources/${challenge.categoryId}`}
          className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          {t("daily.study")}
          <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </a>
      ) : null}
    </>
  );
}

export function DailyView() {
  const { t, num, lang, isFa } = useLanguage();
  const { today, todayChallenge, isTodayDone, completeToday, currentStreak, bestStreak, totalCompleted } = useDaily();
  const [topic, setTopic] = useState<ChallengeTopic | "all">("all");

  const topics = useMemo<ChallengeTopic[]>(() => {
    const seen = new Set<ChallengeTopic>();
    for (const c of challenges) seen.add(c.topic);
    return [...seen];
  }, []);

  const archive = useMemo(
    () => (topic === "all" ? challenges : challenges.filter((c) => c.topic === topic)),
    [topic]
  );

  const streakStats = [
    { icon: Flame, value: currentStreak, label: t("daily.streak.current") },
    { icon: Target, value: bestStreak, label: t("daily.streak.best") },
    { icon: CheckCircle2, value: totalCompleted, label: t("daily.streak.total") },
  ];

  return (
    <section aria-labelledby="daily-title" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 id="daily-title" className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight sm:text-4xl">
          <Flame className="size-7 text-orange-500" aria-hidden="true" />
          {t("daily.title")}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("daily.subtitle")}</p>
      </header>

      {/* Streak stats */}
      <dl className="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
        {streakStats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border bg-card p-3 text-center"
          >
            <Icon className="size-4 text-orange-500" aria-hidden="true" />
            <dd className="text-lg font-extrabold leading-none">{num(value)}</dd>
            <dt className="text-[11px] font-medium text-muted-foreground">{label}</dt>
          </div>
        ))}
      </dl>

      {/* Today's challenge */}
      <SpotlightCard className="mt-8">
        <div className="p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-primary">{t("daily.today")}</p>
            {today ? (
              <p className="text-xs text-muted-foreground">{formatDay(today, isFa)}</p>
            ) : null}
          </div>

          <div className="mt-4">
            <ChallengeBody challenge={todayChallenge} />
          </div>

          <div className="mt-6 border-t pt-4">
            {isTodayDone ? (
              <p className="inline-flex items-center gap-2 rounded-xl border border-emerald-600/25 bg-emerald-500/5 px-4 py-2.5 text-sm font-medium text-emerald-700 dark:border-emerald-400/25 dark:text-emerald-400">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                {t("daily.doneToday")}
              </p>
            ) : (
              <Button onClick={completeToday} className="min-h-11 gap-2">
                <CheckCircle2 className="size-4" aria-hidden="true" />
                {t("daily.markDone")}
              </Button>
            )}
          </div>
        </div>
      </SpotlightCard>

      {/* Archive */}
      <div className="mt-12">
        <h2 className="text-xl font-extrabold tracking-tight">{t("daily.browse.title")}</h2>
        <p className="mt-2 max-w-xl leading-relaxed text-muted-foreground">
          {t("daily.browse.subtitle")}
        </p>

        <div role="group" aria-label={t("daily.topic.all")} className="mt-5 flex flex-wrap gap-2">
          <Button
            variant={topic === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setTopic("all")}
            aria-pressed={topic === "all"}
            className="min-h-9 shrink whitespace-normal rounded-full py-1.5 leading-snug"
          >
            {t("daily.topic.all")}
            <span
              className={cn(
                "ms-1.5 rounded-full px-1.5 text-[11px] font-semibold",
                topic === "all" ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
              )}
            >
              {num(challenges.length)}
            </span>
          </Button>
          {topics.map((topicKey) => {
            const isActive = topic === topicKey;
            const count = challenges.filter((c) => c.topic === topicKey).length;
            return (
              <Button
                key={topicKey}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setTopic(isActive ? "all" : topicKey)}
                aria-pressed={isActive}
                className="min-h-9 shrink whitespace-normal rounded-full py-1.5 leading-snug"
              >
                {CHALLENGE_TOPIC_LABELS[topicKey][lang]}
                <span
                  className={cn(
                    "ms-1.5 rounded-full px-1.5 text-[11px] font-semibold",
                    isActive ? "bg-primary-foreground/20" : "bg-muted text-muted-foreground"
                  )}
                >
                  {num(count)}
                </span>
              </Button>
            );
          })}
        </div>

        <ul className="mt-6 space-y-4">
          {archive.map((challenge) => (
            <SpotlightCard key={challenge.id} as="li" className="list-none">
              <div className="p-5">
                <ChallengeBody challenge={challenge} />
              </div>
            </SpotlightCard>
          ))}
        </ul>
      </div>
    </section>
  );
}
