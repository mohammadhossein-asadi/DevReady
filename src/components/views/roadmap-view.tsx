"use client";

import {
  CheckCircle2,
  Circle,
  ExternalLink,
  Link2,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timeline } from "@/components/aceternity/timeline";
import {
  productPhases,
  rolePaths,
  studyStages,
  weeklyRhythm,
} from "@/lib/data/roadmap";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

export function RoadmapView() {
  const { t, num, isFa } = useLanguage();
  const loc = (v: { en: string; fa: string }) => (isFa ? v.fa : v.en);

  return (
    <section aria-labelledby="road-title" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1 id="road-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {t("road.title")}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("road.subtitle")}</p>
      </header>

      <Tabs defaultValue="study" className="mt-8">
        <TabsList className="h-11 w-full max-w-full justify-start gap-1 overflow-x-auto rounded-xl bg-muted/50 p-1 sm:w-auto">
          <TabsTrigger value="study" className="min-h-9 flex-none gap-1.5 rounded-lg px-3">
            <Sparkles className="size-4" aria-hidden="true" />
            {t("road.tab.study")}
          </TabsTrigger>
          <TabsTrigger value="roles" className="min-h-9 flex-none rounded-lg px-3">
            {t("road.tab.roles")}
          </TabsTrigger>
          <TabsTrigger value="weekly" className="min-h-9 flex-none rounded-lg px-3">
            {t("road.tab.weekly")}
          </TabsTrigger>
          <TabsTrigger value="product" className="min-h-9 flex-none rounded-lg px-3">
            {t("road.tab.product")}
          </TabsTrigger>
        </TabsList>

        {/* ============ Study path — Aceternity timeline ============ */}
        <TabsContent value="study" className="mt-8">
          <Timeline
            items={studyStages.map((stage) => ({
              num: stage.num,
              title: `${t("road.stage", { n: num(stage.num) })} — ${loc(stage.title)}`,
              duration: loc(stage.duration),
              content: (
                <>
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t("road.goals")}
                  </h4>
                  <ul className="mt-2 space-y-1.5">
                    {stage.goals.map((goal) => (
                      <li key={goal.en} className="flex items-start gap-2 text-sm leading-relaxed">
                        <CheckCircle2
                          className="mt-0.5 size-4 shrink-0 text-primary"
                          aria-hidden="true"
                        />
                        <span>{loc(goal)}</span>
                      </li>
                    ))}
                  </ul>

                  <h4 className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {t("road.study.resources")}
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {stage.resources.map((res) => (
                      <span
                        key={res}
                        className="inline-flex max-w-full items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        <Link2 className="size-3 shrink-0" aria-hidden="true" />
                        <span className="truncate">{res}</span>
                      </span>
                    ))}
                  </div>
                </>
              ),
            }))}
          />
        </TabsContent>

        {/* ============ Role paths ============ */}
        <TabsContent value="roles" className="mt-8">
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {t("road.roles.intro")}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {rolePaths.map((role) => (
              <article
                key={role.role.en}
                className="rounded-xl border bg-card p-5 transition-colors hover:border-primary/40"
              >
                <h2 className="font-bold">{loc(role.role)}</h2>
                <p className="mt-2 flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                  <ExternalLink className="mt-0.5 size-4 shrink-0 text-primary rtl:rotate-180" aria-hidden="true" />
                  {loc(role.path)}
                </p>
              </article>
            ))}
          </div>
        </TabsContent>

        {/* ============ Weekly rhythm ============ */}
        <TabsContent value="weekly" className="mt-8">
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {t("road.weekly.intro")}
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40">
                  <TableHead className="w-1/4">{t("road.weekly.day")}</TableHead>
                  <TableHead>{t("road.weekly.focus")}</TableHead>
                  <TableHead className="w-1/4">{t("road.weekly.time")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklyRhythm.map((row) => (
                  <TableRow key={row.day.en}>
                    <TableCell className="font-semibold">{loc(row.day)}</TableCell>
                    <TableCell>{loc(row.focus)}</TableCell>
                    <TableCell className="text-muted-foreground">{loc(row.time)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">{t("road.weekly.note")}</p>
        </TabsContent>

        {/* ============ Product roadmap ============ */}
        <TabsContent value="product" className="mt-8">
          <p className="max-w-2xl leading-relaxed text-muted-foreground">
            {t("road.product.intro")}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {productPhases.map((phase) => (
              <article
                key={phase.num}
                className={cn(
                  "relative rounded-xl border bg-card p-5",
                  phase.current
                    ? "border-primary/50 ring-1 ring-primary/30"
                    : phase.done
                      ? "border-emerald-600/25 bg-emerald-500/[0.04] dark:border-emerald-400/25"
                      : ""
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <h2 className="font-bold">
                    {t("road.phases", { n: num(phase.num) })} — {loc(phase.title)}
                  </h2>
                  {phase.current ? (
                    <Badge className="shrink-0">{t("road.product.current")}</Badge>
                  ) : phase.done ? (
                    <Badge
                      variant="outline"
                      className="shrink-0 gap-1 border-emerald-600/30 text-emerald-700 dark:border-emerald-400/30 dark:text-emerald-400"
                    >
                      <CheckCircle2 className="size-3" aria-hidden="true" />
                      {t("road.product.done")}
                    </Badge>
                  ) : (
                    <Circle className="size-3.5 shrink-0 text-muted-foreground/40" aria-hidden="true" />
                  )}
                </div>
                <ul className="mt-3 space-y-1.5">
                  {phase.items.map((item) => (
                    <li
                      key={item.en}
                      className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground"
                    >
                      <CheckCircle2
                        className={cn(
                          "mt-0.5 size-4 shrink-0",
                          phase.current
                            ? "text-primary"
                            : phase.done
                              ? "text-emerald-600/70 dark:text-emerald-400/70"
                              : "text-muted-foreground/50"
                        )}
                        aria-hidden="true"
                      />
                      <span>{loc(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
