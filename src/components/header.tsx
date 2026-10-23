"use client";

import {
  Bookmark,
  Brain,
  CircleUserRound,
  Flame,
  House,
  LibraryBig,
  Map,
  Menu,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLanguage } from "@/lib/language-context";
import { useLibrary } from "@/lib/library-context";
import { useDaily } from "@/lib/daily-context";
import { useSrs } from "@/lib/srs-context";
import { useAuth } from "@/lib/auth-context";
import type { DictKey } from "@/lib/i18n";
import type { View } from "@/components/app-shell";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { key: View; icon: typeof House; labelKey: DictKey }[] = [
  { key: "home", icon: House, labelKey: "nav.home" },
  { key: "resources", icon: LibraryBig, labelKey: "nav.resources" },
  { key: "roadmap", icon: Map, labelKey: "nav.roadmap" },
  { key: "daily", icon: Flame, labelKey: "nav.daily" },
  { key: "review", icon: Brain, labelKey: "nav.review" },
  { key: "library", icon: Bookmark, labelKey: "nav.library" },
];

interface HeaderProps {
  view: View;
  onNavigate: (view: View) => void;
}

export function Header({ view, onNavigate }: HeaderProps) {
  const { t } = useLanguage();
  const { bookmarkCount } = useLibrary();
  const { currentStreak } = useDaily();
  const { dueCount } = useSrs();
  const { isSignedIn } = useAuth();

  const go = (next: View) => () => onNavigate(next);

  const countBadge = (show: boolean) =>
    show ? (
      <span className="ms-0.5 inline-grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-[11px] font-bold leading-5 text-primary-foreground">
        {bookmarkCount}
      </span>
    ) : null;

  const streakBadge = (show: boolean) =>
    show ? (
      <span
        title={t("daily.streak.current")}
        className="ms-0.5 inline-flex items-center gap-0.5 rounded-full bg-orange-500/15 px-1.5 text-[11px] font-bold leading-5 text-orange-600 dark:text-orange-400"
      >
        <Flame className="size-3" aria-hidden="true" />
        {currentStreak}
      </span>
    ) : null;

  const dueBadge = (show: boolean) =>
    show ? (
      <span
        title={t("review.stat.due")}
        className="ms-0.5 inline-grid min-w-5 place-items-center rounded-full bg-emerald-500/15 px-1.5 text-[11px] font-bold leading-5 text-emerald-600 dark:text-emerald-400"
      >
        {dueCount}
      </span>
    ) : null;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
      >
        {t("a11y.skip")}
      </a>

      <div className="mx-auto flex h-16 max-w-6xl items-center gap-2 px-3 sm:gap-3 sm:px-6">
        {/* Brand */}
        <button
          type="button"
          onClick={go("home")}
          className="flex min-h-11 items-center gap-2.5 rounded-lg px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm sm:size-9">
            <Zap className="size-5" aria-hidden="true" />
          </span>
          <span className="flex flex-col items-start leading-none">
            <span className="text-base font-extrabold tracking-tight sm:text-lg">DevReady</span>
            <span className="mt-0.5 hidden text-[11px] font-medium text-muted-foreground sm:block">
              {t("brand.tagline")}
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <nav
          aria-label={t("a11y.nav")}
          className="ms-auto hidden items-center gap-1 lg:flex"
        >
          {NAV_ITEMS.map(({ key, icon: Icon, labelKey }) => {
            const active = view === key;
            return (
              <Button
                key={key}
                variant="ghost"
                onClick={go(key)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "min-h-11 gap-2 px-3",
                  active
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4" aria-hidden="true" />
                {t(labelKey)}
                {key === "library" ? countBadge(bookmarkCount > 0) : null}
                {key === "daily" ? streakBadge(currentStreak > 0) : null}
                {key === "review" ? dueBadge(dueCount > 0) : null}
              </Button>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 md:ms-3 ms-auto md:ms-auto">
          <div className="ms-auto flex items-center gap-2">
            {/* Account */}
            <Button
              variant="ghost"
              size="icon"
              onClick={go("account")}
              aria-label={t("nav.account")}
              aria-current={view === "account" ? "page" : undefined}
              className={cn(
                "relative size-9 sm:size-10",
                view === "account"
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <CircleUserRound className="size-5" aria-hidden="true" />
              {isSignedIn ? (
                <span
                  title={t("acct.signedInDot")}
                  className="absolute end-1.5 top-1.5 size-2 rounded-full border-2 border-background bg-emerald-500"
                />
              ) : null}
            </Button>
            <LanguageSwitcher />
            <ThemeToggle />
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 sm:size-10 lg:hidden"
                  aria-label={t("a11y.menu")}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" aria-describedby={undefined} className="lg:hidden">
                <SheetHeader>
                  <SheetTitle className="text-start">DevReady</SheetTitle>
                </SheetHeader>
                <nav
                  aria-label={t("a11y.nav")}
                  className="mt-2 grid gap-1 px-2 pb-4"
                >
                  {NAV_ITEMS.map(({ key, icon: Icon, labelKey }) => (
                    <SheetTrigger asChild key={key}>
                      <Button
                        variant="ghost"
                        onClick={go(key)}
                        aria-current={view === key ? "page" : undefined}
                        className={cn(
                          "min-h-11 justify-start gap-3",
                          view === key
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        <Icon className="size-4" aria-hidden="true" />
                        {t(labelKey)}
                        {key === "library" ? countBadge(bookmarkCount > 0) : null}
                        {key === "daily" ? streakBadge(currentStreak > 0) : null}
                        {key === "review" ? dueBadge(dueCount > 0) : null}
                      </Button>
                    </SheetTrigger>
                  ))}
                </nav>
                <nav aria-label={t("nav.account")} className="border-t px-2 pb-4 pt-2">
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={go("account")}
                      aria-current={view === "account" ? "page" : undefined}
                      className={cn(
                        "min-h-11 w-full justify-start gap-3",
                        view === "account"
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground"
                      )}
                    >
                      <CircleUserRound className="size-4" aria-hidden="true" />
                      {t("nav.account")}
                      {isSignedIn ? (
                        <span className="ms-auto size-2 rounded-full bg-emerald-500" aria-hidden="true" />
                      ) : null}
                    </Button>
                  </SheetTrigger>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
