"use client";

import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLanguage } from "@/lib/language-context";

/**
 * Segmented EN / فارسی switcher.
 * Each option is a ≥44px touch target with aria-pressed state.
 */
export function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <TooltipProvider delayDuration={200}>
      <div
        role="group"
        aria-label={t("a11y.langToggle")}
        className="flex items-center rounded-lg border bg-muted/40 p-0.5"
      >
        <Globe aria-hidden="true" className="mx-1.5 size-4 text-muted-foreground" />
        {(["en", "fa"] as const).map((code) => {
          const active = lang === code;
          return (
            <Tooltip key={code}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLang(code)}
                  aria-pressed={active}
                  className={
                    active
                      ? "h-9 min-w-11 rounded-md bg-background px-2 font-semibold shadow-sm"
                      : "h-9 min-w-11 rounded-md px-2 text-muted-foreground hover:text-foreground"
                  }
                >
                  {code === "en" ? "EN" : "فا"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{t("lang.label")}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
