"use client";

import { Heart, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/lib/language-context";
import type { View } from "@/components/app-shell";

export function Footer({ onNavigate }: { onNavigate: (view: View) => void }) {
  const { t } = useLanguage();
  const year = 2026;

  const links: { key: View; label: string }[] = [
    { key: "home", label: t("nav.home") },
    { key: "resources", label: t("nav.resources") },
    { key: "roadmap", label: t("nav.roadmap") },
    { key: "daily", label: t("nav.daily") },
    { key: "library", label: t("nav.library") },
  ];

  return (
    <footer className="mt-auto border-t bg-muted/30 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
                <Zap className="size-4" aria-hidden="true" />
              </span>
              <span className="text-base font-extrabold tracking-tight">
                DevReady
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footer.desc")}
            </p>
          </div>

          <nav aria-label={t("footer.explore")}>
            <h2 className="text-sm font-semibold">{t("footer.explore")}</h2>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.key}>
                  <button
                    type="button"
                    onClick={() => onNavigate(link.key)}
                    className="min-h-8 text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold">{t("footer.stack")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("footer.stackValue")}
            </p>
            <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Heart className="size-3.5 text-primary" aria-hidden="true" />
              {t("stats.free")}
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-start justify-between gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} DevReady · {t("footer.license")}</p>
          <p className="font-medium">{t("footer.luck")}</p>
        </div>
      </div>
    </footer>
  );
}
