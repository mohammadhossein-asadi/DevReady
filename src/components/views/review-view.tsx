"use client";

import { useRef, useState } from "react";
import {
  BookOpen,
  Brain,
  CalendarClock,
  ChevronRight,
  Compass,
  Layers,
  Plus,
  Sparkles,
  Target,
  Trash2,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { useLanguage } from "@/lib/language-context";
import { useLibrary } from "@/lib/library-context";
import {
  masteryOf,
  nextIntervalOf,
  useSrs,
  type Grade,
  type Mastery,
  type SrsCard,
} from "@/lib/srs-context";
import { refOf, resourceHref, resourceRefs } from "@/lib/data/resources";
import { ICONS } from "@/components/views/home-view";
import type { DictKey } from "@/lib/i18n";
import type { ResourceRef } from "@/lib/data/resources";
import { cn } from "@/lib/utils";

const GRADES: { grade: Grade; labelKey: DictKey; classes: string }[] = [
  {
    grade: "again",
    labelKey: "review.grade.again",
    classes:
      "border-rose-600/40 text-rose-700 hover:bg-rose-500/10 hover:text-rose-700 dark:border-rose-400/40 dark:text-rose-400 dark:hover:text-rose-300",
  },
  {
    grade: "hard",
    labelKey: "review.grade.hard",
    classes:
      "border-amber-600/40 text-amber-700 hover:bg-amber-500/10 hover:text-amber-700 dark:border-amber-400/40 dark:text-amber-400 dark:hover:text-amber-300",
  },
  {
    grade: "good",
    labelKey: "review.grade.good",
    classes:
      "border-teal-600/40 text-teal-700 hover:bg-teal-500/10 hover:text-teal-700 dark:border-teal-400/40 dark:text-teal-400 dark:hover:text-teal-300",
  },
  {
    grade: "easy",
    labelKey: "review.grade.easy",
    classes:
      "border-emerald-600/40 text-emerald-700 hover:bg-emerald-500/10 hover:text-emerald-700 dark:border-emerald-400/40 dark:text-emerald-400 dark:hover:text-emerald-300",
  },
];

const MASTERY_KEY: Record<Mastery, DictKey> = {
  learning: "review.mastery.learning",
  familiar: "review.mastery.familiar",
  confident: "review.mastery.confident",
  mastered: "review.mastery.mastered",
};

const MASTERY_CLASSES: Record<Mastery, string> = {
  learning: "border-amber-600/30 text-amber-700 dark:border-amber-400/30 dark:text-amber-400",
  familiar: "border-orange-600/30 text-orange-700 dark:border-orange-400/30 dark:text-orange-400",
  confident: "border-teal-600/30 text-teal-700 dark:border-teal-400/30 dark:text-teal-400",
  mastered: "border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400",
};

function MasteryBadge({ interval }: { interval: number }) {
  const { t } = useLanguage();
  const mastery = masteryOf(interval);
  return (
    <Badge variant="outline" className={cn("text-xs", MASTERY_CLASSES[mastery])}>
      {t(MASTERY_KEY[mastery])}
    </Badge>
  );
}

/** Locale-aware medium date (Jalali in FA). */
function formatDay(key: string, isFa: boolean): string {
  try {
    return new Intl.DateTimeFormat(isFa ? "fa-IR" : "en-US", {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date(`${key}T12:00:00Z`));
  } catch {
    return key;
  }
}

/** "Due today" / "Due tomorrow" / "Due {date}" for a card. */
function dueLabel(card: SrsCard, today: string, isFa: boolean, t: (k: DictKey, vars?: Record<string, string | number>) => string, tomorrowKey: string): string {
  if (card.due <= today) return t("review.due.today");
  if (card.due === tomorrowKey) return t("review.due.tomorrow");
  return t("review.due.on", { date: formatDay(card.due, isFa) });
}

export function ReviewView() {
  const { t, num, isFa, lang } = useLanguage();
  const { today, cards, dueCards, dueCount, totalCount, masteredCount, retention, cardOf, addToDeck, removeFromDeck, gradeCard, isInDeck } = useSrs();
  const { noteOf, data: libData } = useLibrary();

  const [queue, setQueue] = useState<string[] | null>(null);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [noteOpenFor, setNoteOpenFor] = useState<string | null>(null);
  const requeuedRef = useRef<Set<string>>(new Set());

  const startSession = () => {
    if (dueCount === 0) return;
    requeuedRef.current = new Set();
    setSessionTotal(dueCount);
    setReviewedCount(0);
    setNoteOpenFor(null);
    setQueue(dueCards.map((card) => card.key));
  };

  const gradeNow = (grade: Grade) => {
    if (!queue || queue.length === 0) return;
    const key = queue[0]!;
    gradeCard(key, grade);
    const rest = queue.slice(1);
    // Relearn within the session: an "again" card re-appears once at the back.
    if (grade === "again" && !requeuedRef.current.has(key)) {
      requeuedRef.current.add(key);
      rest.push(key);
    }
    setReviewedCount((v) => v + 1);
    setQueue(rest);
    setNoteOpenFor(null);
  };

  const endSession = () => setQueue(null);

  const nextKey = queue && queue.length > 0 ? queue[0]! : null;
  const nextCard = nextKey ? cardOf(nextKey) : undefined;
  const nextRef = nextKey ? refOf(nextKey) : undefined;
  const NextCategoryIcon = nextRef ? ICONS[nextRef.category.icon] : null;

  const tomorrowKey = today
    ? new Date(new Date(`${today}T12:00:00Z`).getTime() + 86_400_000).toISOString().slice(0, 10)
    : "";

  const stats = [
    { icon: CalendarClock, value: num(dueCount), label: t("review.stat.due") },
    { icon: Layers, value: num(totalCount), label: t("review.stat.cards") },
    { icon: Trophy, value: num(masteredCount), label: t("review.stat.mastered") },
    {
      icon: Target,
      value: retention === null ? "—" : `${num(retention)}%`,
      label: t("review.stat.retention"),
    },
  ];

  // Quick-add candidates: bookmarked or studied resources not yet in the deck.
  const candidates: ResourceRef[] = resourceRefs
    .filter(({ key }) => !isInDeck(key))
    .filter(
      ({ key }) =>
        libData.bookmarks.includes(key) ||
        libData.status[key] === "doing" ||
        libData.status[key] === "done"
    );

  const gradePreview = (card: SrsCard, grade: Grade): string =>
    grade === "again"
      ? t("review.grade.today")
      : t("review.grade.days", { n: num(nextIntervalOf(card, grade)) });

  return (
    <section aria-labelledby="review-title" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1
          id="review-title"
          className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          <Brain className="size-7 text-primary" aria-hidden="true" />
          {t("review.title")}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("review.subtitle")}</p>
      </header>

      {/* Stats */}
      <dl className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {stats.map(({ icon: Icon, value, label }) => (
          <div
            key={label}
            className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border bg-card p-3 text-center"
          >
            <Icon className="size-4 text-primary" aria-hidden="true" />
            <dd className="text-lg font-extrabold leading-none">{value}</dd>
            <dt className="text-[11px] font-medium text-muted-foreground">{label}</dt>
          </div>
        ))}
      </dl>

      {/* Session area */}
      <SpotlightCard className="mt-8">
        <div className="p-5 sm:p-6">
          {queue === null ? (
            dueCount > 0 ? (
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold">
                    <CalendarClock className="size-4 text-primary" aria-hidden="true" />
                    {t("home.review.due", { n: num(dueCount) })}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("review.grade.legend")}
                  </p>
                </div>
                <Button onClick={startSession} className="min-h-11 shrink-0 gap-2">
                  <Brain className="size-4" aria-hidden="true" />
                  {t("review.start")}
                </Button>
              </div>
            ) : totalCount > 0 ? (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
                {t("review.session.done.title")}
                {cards[0] ? (
                  <span className="text-xs">
                    {t("review.due.on", { date: formatDay(cards[0].due, isFa) })}
                  </span>
                ) : null}
              </p>
            ) : (
              <p className="flex items-center gap-2 text-sm text-muted-foreground">
                <Sparkles className="size-4 text-primary" aria-hidden="true" />
                {t("review.deck.empty.title")}
              </p>
            )
          ) : queue.length === 0 ? (
            <div className="py-2 text-center">
              <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-emerald-500/10">
                <Sparkles className="size-6 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{t("review.session.done.title")}</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t("review.session.done.desc", { n: num(reviewedCount) })}
              </p>
              <Button variant="outline" onClick={endSession} className="mt-5 min-h-11">
                {t("review.end")}
              </Button>
            </div>
          ) : nextCard && nextRef ? (
            <div>
              {/* Session progress */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-primary">
                  {t("review.session.remaining", { n: num(queue.length) })}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={endSession}
                  className="min-h-8 text-muted-foreground"
                >
                  {t("review.end")}
                </Button>
              </div>
              <Progress
                value={sessionTotal > 0 ? ((sessionTotal - queue.length) / sessionTotal) * 100 : 0}
                aria-label={t("review.session.remaining", { n: num(queue.length) })}
                className="mt-2 h-1.5"
              />

              {/* Card front */}
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="gap-1.5 bg-background px-2.5 py-1 text-xs">
                    {NextCategoryIcon ? (
                      <NextCategoryIcon className="size-3.5" aria-hidden="true" />
                    ) : null}
                    {nextRef.category.name[lang]}
                  </Badge>
                  <MasteryBadge interval={nextCard.interval} />
                </div>

                <h2 className="mt-4 text-xl font-extrabold leading-snug tracking-tight sm:text-2xl">
                  {nextRef.resource.name}
                </h2>
                {nextRef.resource.note ? (
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {nextRef.resource.note}
                  </p>
                ) : null}

                {/* Personal note peek (Phase 3 integration) */}
                {noteOf(nextRef.key) ? (
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="min-h-9 gap-2"
                      aria-expanded={noteOpenFor === nextKey}
                      onClick={() =>
                        setNoteOpenFor((v) => (v === nextKey ? null : nextKey))
                      }
                    >
                      <BookOpen className="size-4 text-primary" aria-hidden="true" />
                      {noteOpenFor === nextKey ? t("review.hide.note") : t("review.peek.note")}
                    </Button>
                    {noteOpenFor === nextKey ? (
                      <p className="mt-3 whitespace-pre-line rounded-lg border border-dashed bg-muted/30 p-3 text-sm leading-relaxed">
                        {noteOf(nextRef.key)}
                      </p>
                    ) : null}
                  </div>
                ) : null}

                {/* Links */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                  {nextRef.resource.url ? (
                    <a
                      href={nextRef.resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 items-center gap-1.5 font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {t("res.open")}
                      <ChevronRight
                        className="size-4 -rotate-45 rtl:rotate-[225deg]"
                        aria-hidden="true"
                      />
                    </a>
                  ) : null}
                  <a
                    href={resourceHref(nextRef.category.id, nextRef.resource)}
                    className="inline-flex min-h-9 items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {t("a11y.details")}
                    <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
                  </a>
                </div>
              </div>

              {/* Grading */}
              <div className="mt-6 border-t pt-5" role="group" aria-label={t("review.grade.legend")}>
                <p className="text-sm font-semibold">{t("review.grade.legend")}</p>
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                  {GRADES.map(({ grade, labelKey, classes }) => (
                    <Button
                      key={grade}
                      type="button"
                      variant="outline"
                      onClick={() => gradeNow(grade)}
                      className={cn(
                        "min-h-14 flex-col items-center justify-center gap-0.5 px-2",
                        classes
                      )}
                    >
                      <span className="text-sm font-semibold">{t(labelKey)}</span>
                      <span className="text-[11px] font-medium opacity-80">
                        {gradePreview(nextCard, grade)}
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </SpotlightCard>

      {/* Deck management */}
      <div className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-extrabold tracking-tight">{t("review.deck.title")}</h2>
          <p className="text-sm text-muted-foreground">
            {t("contrib.mine.count", { n: num(totalCount) })}
          </p>
        </div>

        {cards.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed p-10 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-muted">
              <Brain className="size-6 text-muted-foreground" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{t("review.deck.empty.title")}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("review.deck.empty.desc")}
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline" className="min-h-11 gap-2">
                <a href="#/resources">
                  <Compass className="size-4" aria-hidden="true" />
                  {t("lib.empty.cta")}
                </a>
              </Button>
              <Button asChild variant="ghost" className="min-h-11 gap-2 text-muted-foreground">
                <a href="#/contribute">
                  <Plus className="size-4" aria-hidden="true" />
                  {t("res.suggest")}
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <ul className="mt-5 space-y-3">
            {cards.map((card) => {
              const ref = refOf(card.key);
              if (!ref) return null;
              const due = dueLabel(card, today, isFa, t, tomorrowKey);
              const isDue = card.due <= today;
              return (
                <li
                  key={card.key}
                  className="flex flex-wrap items-center gap-3 rounded-xl border bg-card p-4"
                >
                  <div className="min-w-0 flex-1 basis-52">
                    <a
                      href={resourceHref(ref.category.id, ref.resource)}
                      className="block truncate font-semibold transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {ref.resource.name}
                    </a>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Compass className="size-3" aria-hidden="true" />
                        {ref.category.name[lang]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className={cn(isDue && "font-semibold text-amber-600 dark:text-amber-400")}>
                        {due}
                      </span>
                    </p>
                  </div>
                  <MasteryBadge interval={card.interval} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromDeck(card.key)}
                    aria-label={t("review.remove")}
                    title={t("review.remove")}
                    className="size-9 shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Quick add from library */}
      <div className="mt-12">
        <h2 className="text-xl font-extrabold tracking-tight">{t("review.add.title")}</h2>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {t("review.add.hint")}
        </p>
        {candidates.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {candidates.slice(0, 10).map(({ key, resource, category }) => (
              <li key={key}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addToDeck(key)}
                  className="min-h-9 max-w-72 shrink whitespace-normal gap-1.5 rounded-full py-1.5 leading-snug"
                  title={resource.name}
                >
                  <Plus className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="truncate">{resource.name}</span>
                  <span className="shrink-0 text-[10px] font-medium text-muted-foreground">
                    {category.name[lang]}
                  </span>
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 rounded-xl border border-dashed p-6 text-center text-sm leading-relaxed text-muted-foreground">
            {t("review.add.none")}
          </p>
        )}
      </div>
    </section>
  );
}
