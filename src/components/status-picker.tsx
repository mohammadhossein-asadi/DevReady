"use client";

import { Circle, CircleDot, CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/language-context";
import { useLibrary, type StudyStatus } from "@/lib/library-context";
import { cn } from "@/lib/utils";

const OPTIONS: { value: StudyStatus; icon: typeof Circle; key: "detail.status.todo" | "detail.status.doing" | "detail.status.done" }[] = [
  { value: "todo", icon: Circle, key: "detail.status.todo" },
  { value: "doing", icon: CircleDot, key: "detail.status.doing" },
  { value: "done", icon: CircleCheckBig, key: "detail.status.done" },
];

/**
 * Three-state study status control (Not started / In progress / Done).
 * The whole group is one labelled radiogroup; each option is a toggle-style
 * button with aria-checked semantics.
 */
export function StatusPicker({ id }: { id: string }) {
  const { t } = useLanguage();
  const { statusOf, setStatus } = useLibrary();
  const current = statusOf(id);

  return (
    <div
      role="radiogroup"
      aria-label={t("detail.status.label")}
      className="inline-flex items-center gap-1 rounded-full border bg-background p-1"
    >
      {OPTIONS.map(({ value, icon: Icon, key }) => {
        const selected = current === value;
        return (
          <Button
            key={value}
            type="button"
            variant="ghost"
            role="radio"
            aria-checked={selected}
            onClick={() => setStatus(id, value)}
            className={cn(
              "min-h-9 gap-1.5 rounded-full px-3 text-xs font-medium sm:text-sm",
              selected
                ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon
              className="size-4"
              aria-hidden="true"
            />
            {t(key)}
          </Button>
        );
      })}
    </div>
  );
}
