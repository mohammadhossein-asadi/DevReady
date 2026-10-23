"use client";

import { useState } from "react";
import {
  Bookmark,
  CircleDot,
  CircleCheckBig,
  Compass,
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
import {
  refOf,
  resourceRefs,
  totalResources,
  type ResourceRef,
} from "@/lib/data/resources";
import type { View } from "@/components/app-shell";
import { cn } from "@/lib/utils";

type TabValue = "bookmarks" | "doing" | "done";

const EMPTY_STATES: Record<
  TabValue,
  { icon: typeof Bookmark; titleKey: "lib.empty.bookmarks.title" | "lib.empty.doing.title" | "lib.empty.done.title"; descKey: "lib.empty.bookmarks.desc" | "lib.empty.doing.desc" | "lib.empty.done.desc" }
> = {
  bookmarks: { icon: Bookmark, titleKey: "lib.empty.bookmarks.title", descKey: "lib.empty.bookmarks.desc" },
  doing: { icon: CircleDot, titleKey: "lib.empty.doing.title", descKey: "lib.empty.doing.desc" },
  done: { icon: CircleCheckBig, titleKey: "lib.empty.done.title", descKey: "lib.empty.done.desc" },
};

/**
 * My Library — bookmarks and study progress, persisted in localStorage.
 * Tabs are controlled so the summary chips can jump between them.
 */
export function LibraryView({ onNavigate }: { onNavigate: (view: View, category?: string) => void }) {
  const { t, num } = useLanguage();
  const { data, bookmarkCount, doingCount, doneCount, hasData, resetAll } = useLibrary();
  const [tab, setTab] = useState<TabValue>("bookmarks");

  const bookmarkRefs = data.bookmarks
    .map(refOf)
    .filter((r): r is ResourceRef => Boolean(r));
  const doingRefs = resourceRefs.filter((r) => data.status[r.key] === "doing");
  const doneRefs = resourceRefs.filter((r) => data.status[r.key] === "done");

  // Ceil so the first completed resource already reads as 1% (round would show 0%).
  const percent = totalResources > 0 ? Math.min(100, Math.ceil((doneCount / totalResources) * 100)) : 0;

  const lists: Record<TabValue, ResourceRef[]> = {
    bookmarks: bookmarkRefs,
    doing: doingRefs,
    done: doneRefs,
  };

  const chips: { value: TabValue; icon: typeof Bookmark; count: number; labelKey: "lib.tab.bookmarks" | "lib.tab.doing" | "lib.tab.done" }[] = [
    { value: "bookmarks", icon: Bookmark, count: bookmarkCount, labelKey: "lib.tab.bookmarks" },
    { value: "doing", icon: CircleDot, count: doingCount, labelKey: "lib.tab.doing" },
    { value: "done", icon: CircleCheckBig, count: doneCount, labelKey: "lib.tab.done" },
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

          <div className="grid grid-cols-3 gap-2 sm:gap-3" role="group" aria-label={t("lib.title")}>
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

        {(["bookmarks", "doing", "done"] as TabValue[]).map((value) => {
          const refs = lists[value];
          const empty = EMPTY_STATES[value];
          return (
            <TabsContent key={value} value={value} className="mt-6">
              {refs.length > 0 ? (
                <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {refs.map(({ key, resource, category }) => (
                    <ResourceCard
                      key={key}
                      resource={resource}
                      categoryId={category.id}
                      showCategory
                    />
                  ))}
                </ul>
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
                    onClick={() => onNavigate("resources")}
                  >
                    <Compass className="size-4" aria-hidden="true" />
                    {t("lib.empty.cta")}
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
