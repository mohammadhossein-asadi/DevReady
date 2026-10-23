"use client";

import {
  ChevronRight,
  Compass,
  House,
  LibraryBig,
  LibraryBig as LibraryIcon,
  SearchX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResourceCard } from "@/components/resource-card";
import { BookmarkButton } from "@/components/bookmark-button";
import { ReviewDeckButton } from "@/components/review-deck-button";
import { StatusPicker } from "@/components/status-picker";
import { DifficultyVote } from "@/components/difficulty-vote";
import { NoteEditor } from "@/components/note-editor";
import { ICONS } from "@/components/views/home-view";
import { useLanguage } from "@/lib/language-context";
import {
  domainOf,
  resolveResource,
} from "@/lib/data/resources";

/**
 * Deep-linkable resource detail page (`#/resource/<catId>/<encodedName>`).
 * Renders RTL-safe via logical properties (ps/pe, start/end) and `rtl:` flips;
 * sibling links stay plain hash anchors so back/forward and sharing work.
 */
export function ResourceDetailView({
  categoryId,
  name,
}: {
  categoryId: string;
  name: string;
}) {
  const { t, lang, isFa } = useLanguage();
  const ref = resolveResource(categoryId, name);

  if (!ref) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-muted">
          <SearchX className="size-7 text-muted-foreground" aria-hidden="true" />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight">
          {t("detail.notfound.title")}
        </h1>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted-foreground">
          {t("detail.notfound.desc")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild className="min-h-11 gap-2">
            <a href="#/resources">
              <LibraryBig className="size-4" aria-hidden="true" />
              {t("nav.resources")}
            </a>
          </Button>
          <Button asChild variant="outline" className="min-h-11 gap-2">
            <a href="#/home">
              <House className="size-4" aria-hidden="true" />
              {t("nav.home")}
            </a>
          </Button>
        </div>
      </section>
    );
  }

  const { category, resource, key } = ref;
  const domain = domainOf(resource.url);
  const CategoryIcon = ICONS[category.icon];
  const related = category.resources
    .filter((r) => r !== resource)
    .sort((a, b) => Number(Boolean(b.url)) - Number(Boolean(a.url)))
    .slice(0, 4);

  return (
    <section className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Breadcrumb */}
      <nav aria-label={t("a11y.breadcrumb")}>
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li className="flex items-center gap-1">
            <a
              href="#/home"
              className="inline-flex min-h-8 items-center gap-1 rounded-md px-1 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <House className="size-3.5" aria-hidden="true" />
              {t("nav.home")}
            </a>
            <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
          </li>
          <li className="flex items-center gap-1">
            <a
              href="#/resources"
              className="inline-flex min-h-8 items-center rounded-md px-1 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {t("nav.resources")}
            </a>
            <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
          </li>
          <li className="flex items-center gap-1">
            <a
              href={`#/resources/${category.id}`}
              className="inline-flex min-h-8 items-center rounded-md px-1 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {category.name[lang]}
            </a>
            <ChevronRight className="size-3.5 rtl:rotate-180" aria-hidden="true" />
          </li>
          <li>
            <span aria-current="page" className="px-1 font-medium text-foreground">
              {resource.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mt-6">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tight sm:text-4xl">
          {resource.name}
        </h1>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="gap-1.5 bg-background px-2.5 py-1 text-xs"
          >
            <CategoryIcon className="size-3.5" aria-hidden="true" />
            {category.name[lang]}
          </Badge>
          {resource.group ? (
            <Badge variant="secondary" className="text-xs">
              {t("res.group.label")}: {resource.group[lang]}
            </Badge>
          ) : null}
          {resource.fa ? (
            <Badge
              variant="outline"
              className="gap-1 border-emerald-600/30 text-xs text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400"
            >
              {t("res.badge.fa")}
            </Badge>
          ) : null}
          {domain ? (
            <span className="font-mono text-xs text-muted-foreground/80">
              {domain}
            </span>
          ) : null}
        </div>

        {resource.note ? (
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            {resource.note}
          </p>
        ) : null}
      </header>

      {/* Action bar */}
      <div className="mt-8 rounded-xl border bg-card p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-3">
          {resource.url ? (
            <Button asChild className="min-h-11 gap-2">
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("res.open")}
                <ChevronRight
                  className="size-4 -rotate-45 rtl:rotate-[225deg]"
                  aria-hidden="true"
                />
              </a>
            </Button>
          ) : null}
          <BookmarkButton id={key} labeled />
        </div>

        <div className="mt-5 border-t pt-5">
          <p className="text-sm font-semibold">{t("detail.status.label")}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {t("detail.status.hint")}
          </p>
          <div className="mt-3">
            <StatusPicker id={key} />
          </div>
        </div>

        <div className="mt-5 border-t pt-5">
          <DifficultyVote id={key} />
        </div>

        <div className="mt-5 border-t pt-5">
          <div className="max-w-md">
            <ReviewDeckButton id={key} />
          </div>
        </div>

        <div className="mt-5 border-t pt-5">
          <NoteEditor id={key} />
        </div>
      </div>

      {/* About the category */}
      <aside className="mt-8 rounded-xl border border-emerald-600/25 bg-emerald-500/5 p-5 dark:border-emerald-400/25">
        <h2 className="flex items-center gap-2 font-bold">
          <Compass className="size-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
          {t("detail.about")}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground/90">
          {category.desc[lang]}
        </p>
        {category.practiceNote ? (
          <p className="mt-3 text-sm leading-relaxed">
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {t("res.practice.title")}:{" "}
            </span>
            {category.practiceNote[isFa ? "fa" : "en"]}
          </p>
        ) : null}
      </aside>

      {/* Related resources */}
      {related.length > 0 ? (
        <div className="mt-10">
          <h2 className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <LibraryIcon className="size-5 text-primary" aria-hidden="true" />
            {t("detail.related", { category: category.name[lang] })}
          </h2>
          <ul className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ResourceCard key={r.name} resource={r} categoryId={category.id} />
            ))}
            <li className="hidden sm:block">
              <a
                href={`#/resources/${category.id}`}
                className="group flex h-full min-h-32 flex-col items-start justify-center gap-2 rounded-xl border border-dashed p-4 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {t("detail.viewAll", { category: category.name[lang] })}
                <ChevronRight className="size-4 rtl:rotate-180" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      ) : null}
    </section>
  );
}
