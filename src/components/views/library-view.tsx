"use client";

import { useState } from "react";
import {
  Bookmark,
  Brain,
  CircleDot,
  CircleCheckBig,
  Compass,
  NotebookPen,
  SearchX,
  Trash2,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ResourceCard } from "@/components/resource-card";
import { useLanguage } from "@/lib/language-context";
import { useLibrary } from "@/lib/library-context";
import { masteryOf, useSrs, type Mastery, type SrsCard } from "@/lib/srs-context";
import {
  refOf,
  resourceHref,
  resourceRefs,
  totalResources,
  type ResourceRef,
} from "@/lib/data/resources";
import type { DictKey } from "@/lib/i18n";
import type { View } from "@/components/app-shell";
import { cn } from "@/lib/utils";

type TabValue = "bookmarks" | "doing" | "done" | "notes" | "review";

const MASTERY_LABEL: Record<Mastery, "review.mastery.learning" | "review.mastery.familiar" | "review.mastery.confident" | "review.mastery.mastered"> = {
  learning: "review.mastery.learning",
  familiar: "review.mastery.familiar",
  confident: "review.mastery.confident",
  mastered: "review.mastery.mastered",
};

const EMPTY_STATES: Record<
  TabValue,
  {
    icon: typeof Bookmark;
    titleKey: DictKey;
    descKey: DictKey;
  }
> = {
  bookmarks: { icon: Bookmark, titleKey: "lib.empty.bookmarks.title", descKey: "lib.empty.bookmarks.desc" },
  doing: { icon: CircleDot, titleKey: "lib.empty.doing.title", descKey: "lib.empty.doing.desc" },
  done: { icon: CircleCheckBig, titleKey: "lib.empty.done.title", descKey: "lib.empty.done.desc" },
  notes: { icon: NotebookPen, titleKey: "lib.empty.notes.title", descKey: "lib.empty.notes.desc" },
  review: { icon: Brain, titleKey: "lib.empty.review.title", descKey: "lib.empty.review.desc" },
};

/** Due + mastery meta line under a deck card in the Review tab. */
function ReviewMeta({
  keyOf,
  cardOf,
  today,
}: {
  keyOf: string;
  cardOf: (key: string) => SrsCard | undefined;
  today: string;
}) {
  const { t, isFa } = useLanguage();
  const card = cardOf(keyOf);
  if (!card) return null;
  const mastery = masteryOf(card.interval);
  const isDue = card.due <= today;
  const dueLabel = isDue
    ? t("review.due.today")
    : t("lib.review.meta.due", {
        when: new Intl.DateTimeFormat(isFa ? "fa-IR" : "en-US", {
          dateStyle: "medium",
          timeZone: "UTC",
        }).format(new Date(`${card.due}T12:00:00Z`)),
      });
  return (
    <a
      href="#/review"
      className="rounded-lg border border-dashed bg-muted/30 px-3 py-2 text-xs leading-relaxed text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <span className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
        <Brain className="size-3 text-primary" aria-hidden="true" />
        {t("lib.review.meta.mastery", { level: t(MASTERY_LABEL[mastery]) })}
      </span>
      <span className={cn(isDue && "font-semibold text-amber-600 dark:text-amber-400")}>
        {dueLabel}
      </span>
    </a>
  );
}

/**
 * My Library — bookmarks and study progress, persisted in localStorage.
 * Tabs are controlled so the summary chips can jump between them.
 */
export function LibraryView({ onNavigate }: { onNavigate: (view: View, category?: string) => void }) {
  const { t, num, lang, isFa } = useLanguage();
  const { data, bookmarkCount, doingCount, doneCount, notesCount, hasData, resetAll } = useLibrary();
  const { cards: deckCards, cardOf, today } = useSrs();
  const [tab, setTab] = useState<TabValue>("bookmarks");

  const bookmarkRefs = data.bookmarks
    .map(refOf)
    .filter((r): r is ResourceRef => Boolean(r));
  const doingRefs = resourceRefs.filter((r) => data.status[r.key] === "doing");
  const doneRefs = resourceRefs.filter((r) => data.status[r.key] === "done");
  const noteRefs = Object.entries(data.notes ?? {})
    .sort((a, b) => (b[1]?.updatedAt ?? 0) - (a[1]?.updatedAt ?? 0))
    .map(([key]) => refOf(key))
    .filter((r): r is ResourceRef => Boolean(r));
  // Deck cards arrive due-first from the SRS context; resolve to refs.
  const reviewRefs = deckCards
    .map((card) => refOf(card.key))
    .filter((r): r is ResourceRef => Boolean(r));

  // Ceil so the first completed resource already reads as 1% (round would show 0%).
  const percent = totalResources > 0 ? Math.min(100, Math.ceil((doneCount / totalResources) * 100)) : 0;

  const lists: Record<TabValue, ResourceRef[]> = {
    bookmarks: bookmarkRefs,
    doing: doingRefs,
    done: doneRefs,
    notes: noteRefs,
    review: reviewRefs,
  };

  const chips: { value: TabValue; icon: typeof Bookmark; count: number; labelKey: "lib.tab.bookmarks" | "lib.tab.doing" | "lib.tab.done" | "lib.tab.notes" | "lib.tab.review" }[] = [
    { value: "bookmarks", icon: Bookmark, count: bookmarkCount, labelKey: "lib.tab.bookmarks" },
    { value: "doing", icon: CircleDot, count: doingCount, labelKey: "lib.tab.doing" },
    { value: "done", icon: CircleCheckBig, count: doneCount, labelKey: "lib.tab.done" },
    { value: "notes", icon: NotebookPen, count: notesCount, labelKey: "lib.tab.notes" },
    { value: "review", icon: Brain, count: deckCards.length, labelKey: "lib.tab.review" },
  ];

  return (
    <section aria-labelledby="lib-title" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 id="lib-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t("lib.title")}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("lib.subtitle")}</p>
      </header>

      {/* Progress summary */}
      <div className="mt-8 rounded-xl border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              {t("lib.progress.of", { done: num(doneCount), total: num(totalResources) })}
            </p>
            <p className="mt-1 text-4xl font-extrabold tracking-tight text-primary">
              {num(percent)}%
            </p>
            <Progress
              value={percent}
              aria-label={t("lib.progress.of", { done: num(doneCount), total: num(totalResources) })}
              className="mt-4 h-2 max-w-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 sm:gap-3" role="group" aria-label={t("lib.title")}>
            {chips.map(({ value, icon: Icon, count, labelKey }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                aria-pressed={tab === value}
                className={cn(
                  "flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border p-3 text-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  tab === value
                    ? "border-primary/40 bg-primary/5"
                    : "hover:bg-muted/50"
                )}
              >
                <Icon className="size-4 text-primary" aria-hidden="true" />
                <span className="text-lg font-extrabold leading-none">{num(count)}</span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  {t(labelKey)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lists */}
      <Tabs value={tab} onValueChange={(v) => setTab(v as TabValue)} className="mt-8">
        <TabsList className="h-auto max-w-full flex-wrap justify-start gap-1 bg-muted/50 p-1">
          {chips.map(({ value, labelKey, count }) => (
            <TabsTrigger
              key={value}
              value={value}
              className="min-h-9 flex-none gap-2 px-3"
            >
              {t(labelKey)}
              <Badge
                variant="secondary"
                className="rounded-full px-1.5 text-[11px] font-semibold"
              >
                {num(count)}
              </Badge>
            </TabsTrigger>
          ))}
        </TabsList>

        {(["bookmarks", "doing", "done", "notes", "review"] as TabValue[]).map((value) => {
          const refs = lists[value];
          const empty = EMPTY_STATES[value];
          return (
            <TabsContent key={value} value={value} className="mt-6">
              {refs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {refs.map(({ key, resource, category }) => (
                    <div key={key} className="flex flex-col gap-2">
                      <ResourceCard
                        resource={resource}
                        categoryId={category.id}
                        showCategory
                        as="div"
                        className="flex-1"
                      />
                      {value === "notes" ? (
                        <a
                          href={resourceHref(category.id, resource)}
                          className="rounded-lg border border-dashed bg-muted/30 px-3 py-2 text-xs leading-relaxed text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                        >
                          <span className="mb-1 flex items-center gap-1.5 font-semibold text-foreground">
                            <NotebookPen className="size-3 text-primary" aria-hidden="true" />
                            {t("note.preview")}
                          </span>
                          <span className="line-clamp-3 whitespace-pre-line">
                            {data.notes?.[key]?.text ?? ""}
                          </span>
                          <span className="mt-1 block text-[10px] text-muted-foreground/70">
                            {new Date(data.notes?.[key]?.updatedAt ?? 0).toLocaleDateString(
                              lang === "fa" ? "fa-IR" : "en-US"
                            )}
                          </span>
                        </a>
                      ) : null}
                      {value === "review" ? (
                        <ReviewMeta keyOf={key} cardOf={cardOf} today={today} />
                      ) : null}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed p-10 text-center">
                  <span className="mx-auto grid size-12 place-items-center rounded-xl bg-muted">
                    <empty.icon className="size-6 text-muted-foreground" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-lg font-semibold">{t(empty.titleKey)}</h2>
                  <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {t(empty.descKey)}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-5 min-h-11 gap-2"
                    onClick={() =>
                      value === "review" ? onNavigate("review") : onNavigate("resources")
                    }
                  >
                    <Compass className="size-4" aria-hidden="true" />
                    {value === "review" ? t("lib.review.cta") : t("lib.empty.cta")}
                  </Button>
                </div>
              )}
            </TabsContent>
          );
        })}
      </Tabs>

      {/* Reset */}
      {hasData ? (
        <div className="mt-12 flex justify-center border-t pt-8">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="min-h-11 gap-2 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" aria-hidden="true" />
                {t("lib.reset")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("lib.reset.confirm.title")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("lib.reset.confirm.desc")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("lib.reset.confirm.cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={resetAll}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  {t("lib.reset.confirm.ok")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ) : (
        <div className="mt-12 flex justify-center border-t pt-8 text-center">
          <p className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <SearchX className="size-4" aria-hidden="true" />
            {t("lib.hint")}
          </p>
        </div>
      )}
    </section>
  );
}
