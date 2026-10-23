"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight, Plus, Search, SlidersHorizontal, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResourceCard } from "@/components/resource-card";
import { categories } from "@/lib/data/resources";
import type { Resource } from "@/lib/data/types";
import { useLanguage } from "@/lib/language-context";
import type { Hue } from "@/lib/data/types";
import { cn } from "@/lib/utils";

/** Static Tailwind classes per hue (kept literal so Tailwind can see them). */
const HUE_CHIP: Record<Hue, string> = {
  emerald: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  teal: "bg-teal-500/10 text-teal-700 dark:text-teal-400",
  amber: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  violet: "bg-violet-500/10 text-violet-700 dark:text-violet-400",
  rose: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
  orange: "bg-orange-500/10 text-orange-700 dark:text-orange-400",
  lime: "bg-lime-500/10 text-lime-700 dark:text-lime-400",
  pink: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
  cyan: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400",
  sky: "bg-sky-500/10 text-sky-700 dark:text-sky-400",
  indigo: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-400",
  red: "bg-red-500/10 text-red-700 dark:text-red-400",
  fuchsia: "bg-fuchsia-500/10 text-fuchsia-700 dark:text-fuchsia-400",
};

export { HUE_CHIP };

interface ResourcesViewProps {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

interface DecoratedResource {
  key: string;
  categoryId: string;
  resource: Resource;
}

export function ResourcesView({
  activeCategory,
  onCategoryChange,
}: ResourcesViewProps) {
  const { t, num, isFa } = useLanguage();
  const [query, setQuery] = useState("");
  const [faOnly, setFaOnly] = useState(false);

  const active = categories.find((c) => c.id === activeCategory);

  /** Decorated results carry a category-scoped key so cross-category
   * duplicates (e.g. SQLBolt in Databases AND Question Banks) stay unique. */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const decorate = (
      resource: Resource,
      catId: string
    ): DecoratedResource => ({
      key: `${catId}·${resource.name}·${resource.url ?? "nolink"}`,
      categoryId: catId,
      resource,
    });

    let list: DecoratedResource[] = active
      ? active.resources.map((r) => decorate(r, active.id))
      : categories.flatMap((c) => c.resources.map((r) => decorate(r, c.id)));

    if (faOnly) list = list.filter((item) => item.resource.fa);

    if (q) {
      list = list.filter(({ resource }) => {
        const haystack = [
          resource.name,
          resource.note ?? "",
          resource.group?.en ?? "",
          resource.group?.fa ?? "",
        ]
          .join(" ")
          .toLowerCase();
        if (haystack.includes(q)) return true;
        // Also match against the category this resource belongs to.
        if (!active) {
          for (const cat of categories) {
            if (
              cat.resources.includes(resource) &&
              (cat.name.en.toLowerCase().includes(q) ||
                cat.name.fa.includes(query.trim()))
            ) {
              return true;
            }
          }
        }
        return false;
      });
    }

    // Group consecutive items by group label inside the "question banks"
    // category for easier scanning.
    if (active?.id === "question-banks") {
      list = [...list].sort((a, b) => {
        const ga = a.resource.group?.en ?? "";
        const gb = b.resource.group?.en ?? "";
        return ga.localeCompare(gb);
      });
    }
    return list;
  }, [query, faOnly, active]);

  const hasFilters = Boolean(query) || faOnly || Boolean(active);

  return (
    <section aria-labelledby="res-title" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 id="res-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t("res.title")}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("res.subtitle")}</p>
        <a
          href="#/contribute"
          className="mt-3 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Plus className="size-4" aria-hidden="true" />
          {t("res.suggest")}
          <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </a>
      </header>

      {/* Controls */}
      <div className="mt-8 space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("res.search")}
              aria-label={t("a11y.search")}
              className="h-11 bg-card ps-9"
            />
          </div>
          <Button
            type="button"
            variant={faOnly ? "default" : "outline"}
            onClick={() => setFaOnly((v) => !v)}
            aria-pressed={faOnly}
            className="h-11 shrink-0 gap-2"
          >
            {faOnly ? <Check className="size-4" aria-hidden="true" /> : null}
            {t("res.persian")}
          </Button>
        </div>

        {/* Category chips */}
        <div
          role="group"
          aria-label={t("res.all")}
          className="flex flex-wrap gap-2"
        >
          <Button
            variant={!active ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange("")}
            aria-pressed={!active}
            className="min-h-9 whitespace-normal shrink rounded-full py-1.5 leading-snug"
          >
            {t("res.all")}
          </Button>
          {categories.map((cat) => {
            const isActive = cat.id === active?.id;
            return (
              <Button
                key={cat.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(isActive ? "" : cat.id)}
                aria-pressed={isActive}
                className="min-h-9 whitespace-normal shrink rounded-full py-1.5 leading-snug text-start"
              >
                {cat.name[isFa ? "fa" : "en"]}
                <span
                  className={cn(
                    "ms-1.5 rounded-full px-1.5 text-[11px] font-semibold",
                    isActive
                      ? "bg-primary-foreground/20"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {num(cat.resources.length)}
                </span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Result meta */}
      <div
        aria-live="polite"
        className="mt-6 flex items-center justify-between gap-3"
      >
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="size-4" aria-hidden="true" />
          {t("res.count", { n: num(results.length) })}
        </p>
        {hasFilters ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setFaOnly(false);
              onCategoryChange("");
            }}
            className="h-9 gap-1.5"
          >
            <X className="size-4" aria-hidden="true" />
            {t("res.clear")}
          </Button>
        ) : null}
      </div>

      {/* Practice note */}
      {active?.practiceNote ? (
        <aside className="mt-4 rounded-xl border border-emerald-600/25 bg-emerald-500/5 p-4 text-sm leading-relaxed text-foreground dark:border-emerald-400/25">
          <span className="font-semibold text-emerald-700 dark:text-emerald-400">
            {t("res.practice.title")}:{" "}
          </span>
          {active.practiceNote[isFa ? "fa" : "en"]}
        </aside>
      ) : null}

      {/* Results */}
      {results.length > 0 ? (
        <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map(({ key, resource, categoryId }) => (
            <ResourceCard
              key={key}
              resource={resource}
              categoryId={categoryId}
            />
          ))}
        </ul>
      ) : (
        <div className="mt-6 rounded-xl border border-dashed p-10 text-center">
          <Badge variant="outline" className="mb-3">
            {t("res.count", { n: 0 })}
          </Badge>
          <h2 className="text-lg font-semibold">{t("res.empty.title")}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            {t("res.empty.desc")}
          </p>
          <a
            href="#/contribute"
            className="mt-4 inline-flex min-h-9 items-center gap-1.5 rounded-lg px-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Plus className="size-4" aria-hidden="true" />
            {t("res.suggest")}
            <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </a>
        </div>
      )}
    </section>
  );
}
