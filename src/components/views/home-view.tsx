"use client";

import {
  ArrowRight,
  BookOpenCheck,
  Bookmark,
  CircleCheckBig,
  CircleDot,
  Compass,
  LibraryBig,
  Search,
  Target,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { TextGenerate } from "@/components/aceternity/text-generate";
import { MovingBorderButton } from "@/components/aceternity/moving-border";
import { InfiniteMovingCards } from "@/components/aceternity/infinite-moving-cards";
import { SpotlightCard } from "@/components/aceternity/spotlight-card";
import { HUE_CHIP } from "@/components/views/resources-view";
import { useLanguage } from "@/lib/language-context";
import { useLibrary } from "@/lib/library-context";
import {
  categories,
  totalResources,
  type CategoryIcon,
} from "@/lib/data/resources";
import type { View } from "@/components/app-shell";
import { cn } from "@/lib/utils";

import {
  Atom,
  Binary,
  BookOpen,
  Braces,
  Container,
  Database,
  FlaskConical,
  Gauge,
  Globe,
  Map,
  MessagesSquare,
  MonitorSmartphone,
  Network,
  Server,
  ShieldCheck,
} from "lucide-react";

/** Category icon registry — shared with the resource detail view. */
export const ICONS: Record<CategoryIcon, LucideIcon> = {
  target: Target,
  globe: Globe,
  braces: Braces,
  atom: Atom,
  monitor: MonitorSmartphone,
  server: Server,
  database: Database,
  binary: Binary,
  network: Network,
  shield: ShieldCheck,
  flask: FlaskConical,
  gauge: Gauge,
  container: Container,
  messages: MessagesSquare,
  map: Map,
  book: BookOpen,
};

const FEATURED = [
  "Front End Interview Handbook",
  "GreatFrontEnd",
  "Tech Interview Handbook",
  "MDN Web Docs",
  "JavaScript.info",
  "NeetCode",
  "LeetCode",
  "System Design Primer",
  "React — Official Docs",
  "roadmap.sh",
  "freeCodeCamp",
  "OWASP Top 10",
];

const STEPS: {
  icon: LucideIcon;
  titleKey: "home.how.step1.title" | "home.how.step2.title" | "home.how.step3.title";
  descKey: "home.how.step1.desc" | "home.how.step2.desc" | "home.how.step3.desc";
}[] = [
  { icon: Search, titleKey: "home.how.step1.title", descKey: "home.how.step1.desc" },
  { icon: Compass, titleKey: "home.how.step2.title", descKey: "home.how.step2.desc" },
  { icon: BookOpenCheck, titleKey: "home.how.step3.title", descKey: "home.how.step3.desc" },
];

/** Personal progress strip — Phase 2 feature discovery + jump-off point. */
function ProgressWidget({ onNavigate }: { onNavigate: (view: View, category?: string) => void }) {
  const { t, num } = useLanguage();
  const { bookmarkCount, doingCount, doneCount, hasData } = useLibrary();
  const percent = totalResources > 0 ? Math.min(100, Math.ceil((doneCount / totalResources) * 100)) : 0;

  const metrics = [
    { icon: Bookmark, value: bookmarkCount, label: t("lib.tab.bookmarks") },
    { icon: CircleDot, value: doingCount, label: t("lib.tab.doing") },
    { icon: CircleCheckBig, value: doneCount, label: t("lib.tab.done") },
  ];

  return (
    <section aria-labelledby="progress-title" className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <div className="rounded-2xl border bg-card p-5 sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 flex-1">
            <h2 id="progress-title" className="flex items-center gap-2 text-lg font-bold tracking-tight">
              <CircleCheckBig className="size-5 text-primary" aria-hidden="true" />
              {t("home.progress.title")}
            </h2>
            {hasData ? (
              <>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("lib.progress.of", { done: num(doneCount), total: num(totalResources) })}
                </p>
                <Progress
                  value={percent}
                  aria-label={t("lib.progress.of", { done: num(doneCount), total: num(totalResources) })}
                  className="mt-3 h-2 max-w-md"
                />
              </>
            ) : (
              <p className="mt-1 max-w-md text-sm leading-relaxed text-muted-foreground">
                {t("home.progress.empty")}
              </p>
            )}
          </div>

          <dl className="grid grid-cols-3 gap-2 sm:gap-3">
            {metrics.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex min-h-16 flex-col items-center justify-center gap-1 rounded-xl border bg-background p-3 text-center"
              >
                <Icon className="size-4 text-primary" aria-hidden="true" />
                <dd className="text-lg font-extrabold leading-none">{num(value)}</dd>
                <dt className="text-[11px] font-medium text-muted-foreground">{label}</dt>
              </div>
            ))}
          </dl>

          <Button
            variant="outline"
            className="min-h-11 shrink-0 gap-2"
            onClick={() => onNavigate("library")}
          >
            <Bookmark className="size-4" aria-hidden="true" />
            {hasData ? t("home.progress.cta") : t("lib.title")}
          </Button>
        </div>
      </div>
    </section>
  );
}

export function HomeView({ onNavigate }: { onNavigate: (view: View, category?: string) => void }) {
  const { t, num, isFa } = useLanguage();

  const stats = [
    { value: `${num(totalResources)}+`, label: t("stats.resources") },
    { value: num(categories.length), label: t("stats.categories") },
    { value: num(2), label: t("stats.languages") },
    { value: num(9), label: t("stats.stages") },
  ];

  const headline = `${t("hero.title1")} ${t("hero.title2")} ${t("hero.title3")}`;

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden border-b">
        <BackgroundBeams />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <Badge
            variant="outline"
            className="gap-1.5 border-emerald-600/30 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t("hero.badge")}
          </Badge>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            <TextGenerate text={headline} />
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {t("hero.subtitle", { count: num(totalResources) })}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <MovingBorderButton onClick={() => onNavigate("resources")}>
              <LibraryBig className="size-4" aria-hidden="true" />
              {t("hero.cta1")}
            </MovingBorderButton>
            <Button
              variant="outline"
              size="lg"
              onClick={() => onNavigate("roadmap")}
              className="min-h-11 gap-2 bg-background/60 backdrop-blur"
            >
              <Compass className="size-4" aria-hidden="true" />
              {t("hero.cta2")}
            </Button>
          </div>

          {/* Stats */}
          <dl className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border bg-card/70 p-4 backdrop-blur"
              >
                <dt className="order-2 mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                  {stat.label}
                </dt>
                <dd className="order-1 text-2xl font-extrabold tracking-tight text-primary sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ============ Your progress (Phase 2) ============ */}
      <ProgressWidget onNavigate={onNavigate} />

      {/* ============ Featured marquee ============ */}
      <section aria-labelledby="featured-title" className="border-b bg-muted/20 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="featured-title" className="text-lg font-bold tracking-tight">
              {t("home.featured.title")}
            </h2>
            <p className="text-sm text-muted-foreground">
              {t("home.featured.subtitle")}
            </p>
          </div>
          <InfiniteMovingCards items={FEATURED} className="mt-5" />
        </div>
      </section>

      {/* ============ Category grid ============ */}
      <section aria-labelledby="cats-title" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <h2 id="cats-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
          {t("home.categories.title")}
        </h2>
        <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
          {t("home.categories.subtitle")}
        </p>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((cat) => {
            const Icon = ICONS[cat.icon];
            return (
              <li key={cat.id}>
                <SpotlightCard className="h-full">
                  <button
                    type="button"
                    onClick={() => onNavigate("resources", cat.id)}
                    className="flex h-full w-full flex-col p-5 text-start focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={cn(
                          "grid size-10 place-items-center rounded-lg",
                          HUE_CHIP[cat.hue]
                        )}
                      >
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <span className="text-xs font-semibold text-muted-foreground">
                        {num(cat.resources.length)}
                      </span>
                    </div>
                    <h3 className="mt-4 text-sm font-bold leading-snug">
                      {cat.name[isFa ? "fa" : "en"]}
                    </h3>
                    <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
                      {cat.desc[isFa ? "fa" : "en"]}
                    </p>
                  </button>
                </SpotlightCard>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ============ How to use ============ */}
      <section aria-labelledby="how-title" className="border-y bg-muted/20">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 id="how-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t("home.how.title")}
          </h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.titleKey} className="relative rounded-xl border bg-card p-6">
                <span className="absolute -top-3 start-5 rounded-full bg-primary px-2.5 py-0.5 text-xs font-bold text-primary-foreground">
                  {num(i + 1)}
                </span>
                <step.icon className="size-6 text-primary" aria-hidden="true" />
                <h3 className="mt-3 font-bold">{t(step.titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(step.descKey)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border bg-card p-8 text-center sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
          />
          <h2 className="relative text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t("home.cta.title")}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
            {t("home.cta.subtitle")}
          </p>
          <div className="relative mt-6 flex justify-center">
            <Button size="lg" onClick={() => onNavigate("resources")} className="min-h-11 gap-2">
              {t("home.cta.button")}
              <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
