"use client";

import { useEffect, useState } from "react";
import { X, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/lib/language-context";
import { cn } from "@/lib/utils";

interface Shortcut {
  keys: string[];
  description: string;
}

const SHORTCUTS: Shortcut[] = [
  { keys: ["g", "h"], description: "nav.shortcuts.goHome" },
  { keys: ["g", "r"], description: "nav.shortcuts.goResources" },
  { keys: ["g", "m"], description: "nav.shortcuts.goRoadmap" },
  { keys: ["g", "d"], description: "nav.shortcuts.goDaily" },
  { keys: ["g", "v"], description: "nav.shortcuts.goReview" },
  { keys: ["g", "l"], description: "nav.shortcuts.goLibrary" },
  { keys: ["g", "a"], description: "nav.shortcuts.goAccount" },
  { keys: ["?"], description: "nav.shortcuts.showHelp" },
  { keys: ["/", "k"], description: "nav.shortcuts.focusSearch" },
  { keys: ["Escape"], description: "nav.shortcuts.closeModal" },
];

export function ShortcutsDialog() {
  const { t, isFa } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("devready:shortcuts", handler);
    return () => window.removeEventListener("devready:shortcuts", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "?" && e.shiftKey) || (e.key === "/" && e.ctrlKey)) {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const formatKeys = (keys: string[]): string => {
    if (keys.length === 1) return keys[0].toUpperCase();
    return keys.map((k) => k.toUpperCase()).join(" + ");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key className="size-5" aria-hidden="true" />
            {t("nav.shortcuts.title")}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-3">
          {SHORTCUTS.map(({ keys, description }) => (
            <div
              key={keys.join("+")}
              className="flex items-center justify-between gap-4 p-3 rounded-lg bg-muted/50"
            >
              <span className="text-sm text-foreground">{t(description)}</span>
              <kbd className={cn("flex items-center gap-1.5 whitespace-nowrap shrink-0 rounded bg-card px-2 py-1 text-[11px] font-mono text-muted-foreground border", isFa && "rtl:flex-row-reverse")}>
                {keys.map((k, i) => (
                  <span key={i} className="flex items-center gap-1">
                    {i > 0 && <span className="text-[10px] text-muted-foreground/60">+</span>}
                    {k}
                  </span>
                ))}
              </kbd>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button
            variant="default"
            onClick={() => setOpen(false)}
            className="min-h-10"
            autoFocus
          >
            {t("nav.shortcuts.close")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}