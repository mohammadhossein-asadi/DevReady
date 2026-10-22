"use client";

import { House, LibraryBig, Map, Menu, Zap } from "lucide-react";
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
import type { View } from "@/components/app-shell";
import { cn } from "@/lib/utils";

const NAV_ITEMS: { key: View; icon: typeof House; labelKey: "nav.home" | "nav.resources" | "nav.roadmap" }[] = [
  { key: "home", icon: House, labelKey: "nav.home" },
  { key: "resources", icon: LibraryBig, labelKey: "nav.resources" },
  { key: "roadmap", icon: Map, labelKey: "nav.roadmap" },
];

interface HeaderProps {
  view: View;
  onNavigate: (view: View) => void;
}

export function Header({ view, onNavigate }: HeaderProps) {
  const { t } = useLanguage();

  const go = (next: View) => () => onNavigate(next);

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
          className="ms-auto hidden items-center gap-1 md:flex"
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
              </Button>
            );
          })}
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2 md:ms-3 ms-auto md:ms-auto">
          <div className="ms-auto flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9 sm:size-10 md:hidden"
                  aria-label={t("a11y.menu")}
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" aria-describedby={undefined} className="md:hidden">
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
                      </Button>
                    </SheetTrigger>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
