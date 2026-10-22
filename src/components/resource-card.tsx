"use client";

import { ArrowUpRight, Languages } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { useLanguage } from "@/lib/language-context";
import { domainOf, type Resource } from "@/lib/data/resources";
import { cn } from "@/lib/utils";

export function ResourceCard({
  resource,
  className,
}: {
  resource: Resource;
  className?: string;
}) {
  const { t, lang } = useLanguage();
  const domain = domainOf(resource.url);
  const link = resource.url;

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary">
          {resource.name}
        </h3>
        <ArrowUpRight
          className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary rtl:-rotate-90 rtl:group-hover:-translate-x-0.5 rtl:group-hover:translate-y-0.5"
          aria-hidden="true"
        />
      </div>

      {resource.note ? (
        <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {resource.note}
        </p>
      ) : null}

      <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
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
      <SpotlightCard as="li" className={cn(classes, "list-none")}>
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
    <SpotlightCard as="li" className={classes}>
      {body}
    </SpotlightCard>
  );
}
