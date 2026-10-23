"use client";

import { Info, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { BookmarkButton } from "@/components/bookmark-button";
import { useLanguage } from "@/lib/language-context";
import { useLibrary } from "@/lib/library-context";
import { useVotes, type VoteLevel } from "@/lib/votes-context";
import {
  domainOf,
  getCategory,
  resourceHref,
  resourceKeyOf,
  type Resource,
} from "@/lib/data/resources";
import type { DictKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** Community difficulty consensus → badge colors. */
const CONSENSUS_STYLES: Record<VoteLevel, string> = {
  easy: "border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400",
  medium: "border-amber-600/30 text-amber-700 dark:border-amber-400/30 dark:text-amber-400",
  hard: "border-rose-600/30 text-rose-700 dark:border-rose-400/30 dark:text-rose-400",
};

interface ResourceCardProps {
  resource: Resource;
  /** Category the resource belongs to — scopes its storage key + detail route. */
  categoryId: string;
  /** Show the category name chip (used by the library view). */
  showCategory?: boolean;
  /** Root element. "li" (default) for <ul> grids; "div" when the caller
   * already wraps the card in its own list item (library view). */
  as?: "li" | "div";
  className?: string;
}

export function ResourceCard({
  resource,
  categoryId,
  showCategory = false,
  as = "li",
  className,
}: ResourceCardProps) {
  const { t, lang } = useLanguage();
  const { statusOf } = useLibrary();
  const { consensusOf } = useVotes();
  const key = resourceKeyOf(categoryId, resource);
  const detailHref = resourceHref(categoryId, resource);
  const domain = domainOf(resource.url);
  const link = resource.url;
  const category = getCategory(categoryId);
  const status = statusOf(key);
  const consensus = consensusOf(key);
  const detailsLabel = t("a11y.details");

  const body = (
    <>
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          {resource.name}
        </h3>
        <div className="flex shrink-0 items-center gap-0.5">
          <BookmarkButton id={key} className="relative z-30" />
          <a
            href={detailHref}
            aria-label={`${resource.name} — ${detailsLabel}`}
            title={detailsLabel}
            className="relative z-30 grid size-8 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <Info
              className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:transition-none"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>

      {resource.note ? (
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {resource.note}
        </p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
        {showCategory && category ? (
          <Badge variant="secondary" className="max-w-36 truncate text-[11px]">
            {category.name[lang]}
          </Badge>
        ) : null}
        {resource.group ? (
          <Badge variant="secondary" className="text-[11px]">
            {resource.group[lang]}
          </Badge>
        ) : null}
        {resource.fa ? (
          <Badge
            variant="outline"
            className="gap-1 border-emerald-600/30 text-[11px] text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400"
          >
            <Languages className="size-3" aria-hidden="true" />
            {t("res.badge.fa")}
          </Badge>
        ) : null}
        {consensus ? (
          <Badge
            variant="outline"
            className={cn("text-[11px]", CONSENSUS_STYLES[consensus.level])}
            title={t("votes.consensusTitle", {
              level: t(`votes.level.${consensus.level}` as DictKey),
              n: consensus.total,
            })}
          >
            {t(`votes.level.${consensus.level}` as DictKey)} · {consensus.total}
          </Badge>
        ) : null}
        {status === "done" ? (
          <span
            className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 dark:text-emerald-400"
            title={t("detail.status.done")}
          >
            <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
            <span className="sr-only">{t("detail.status.done")}</span>
          </span>
        ) : null}
        {status === "doing" ? (
          <span
            className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 dark:text-amber-400"
            title={t("detail.status.doing")}
          >
            <span className="size-1.5 animate-pulse rounded-full bg-amber-500 motion-reduce:animate-none" aria-hidden="true" />
            <span className="sr-only">{t("detail.status.doing")}</span>
          </span>
        ) : null}
        {domain ? (
          <span className="ms-auto truncate font-mono text-[11px] text-muted-foreground/80">
            {domain}
          </span>
        ) : null}
      </div>
    </>
  );

  const classes = cn(
    "group flex h-full min-h-32 flex-col p-4 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    className
  );

  if (link) {
    return (
      <SpotlightCard as={as} className={cn(classes, as === "li" && "list-none")}>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${resource.name} — ${t("res.open")} ${t("a11y.external")}`}
          className="absolute inset-0 z-20 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        />
        {body}
      </SpotlightCard>
    );
  }

  return (
    <SpotlightCard as={as} className={classes}>
      {body}
    </SpotlightCard>
  );
}
