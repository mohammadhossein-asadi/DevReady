"use client";

import { useEffect, useState } from "react";
import { Check, NotebookPen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/lib/language-context";
import { useLibrary } from "@/lib/library-context";
import { cn } from "@/lib/utils";

/**
 * Per-resource personal note (Phase 3). Debounced auto-save into the library
 * localStorage store; a visible "saved" state confirms the write. Empty text
 * deletes the note. Bilingual, RTL-safe, keyboard-accessible.
 */
export function NoteEditor({ id }: { id: string }) {
  const { t, num } = useLanguage();
  const { noteOf, setNote } = useLibrary();
  const saved = noteOf(id);

  // Local draft + dirty flag as state (ref-free, render-safe). React's
  // "adjust state during render" pattern re-seeds the draft whenever the
  // stored note changes externally (e.g. reset-all in another tab, or the
  // debounced write trimming the text) — but never while the user edits.
  const [draft, setDraft] = useState(saved);
  const [prevSaved, setPrevSaved] = useState(saved);
  const [dirty, setDirty] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  if (saved !== prevSaved) {
    setPrevSaved(saved);
    if (!dirty) setDraft(saved);
  }

  useEffect(() => {
    if (!dirty) return;
    const timer = window.setTimeout(() => {
      setNote(id, draft);
      setDirty(false);
      setJustSaved(true);
      window.setTimeout(() => setJustSaved(false), 2000);
    }, 700);
    return () => window.clearTimeout(timer);
  }, [draft, dirty, id, setNote]);

  const saveNow = () => {
    setNote(id, draft);
    setDirty(false);
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2000);
  };

  const clear = () => {
    setDraft("");
    setDirty(false);
    setNote(id, "");
    setJustSaved(false);
  };

  const count = draft.trim().length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-semibold">
          <NotebookPen className="size-4 text-primary" aria-hidden="true" />
          {t("note.label")}
        </p>
        {justSaved && count > 0 ? (
          <span
            role="status"
            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700 dark:text-emerald-400"
          >
            <Check className="size-3.5" aria-hidden="true" />
            {t("note.saved")}
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{t("note.hint")}</p>

      <Textarea
        value={draft}
        onChange={(e) => {
          setDirty(true);
          setJustSaved(false);
          setDraft(e.target.value);
        }}
        onBlur={() => {
          if (dirty) saveNow();
        }}
        placeholder={t("note.placeholder")}
        aria-label={t("note.label")}
        rows={4}
        maxLength={4000}
        className={cn("mt-3 resize-y bg-background")}
      />

      <div className="mt-2 flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground" aria-live="polite">
          {num(count)} / 4000
        </p>
        <div className="flex items-center gap-2">
          {count > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={clear}
              className="min-h-8 gap-1.5 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              {t("note.delete")}
            </Button>
          ) : null}
          <Button
            variant="secondary"
            size="sm"
            onClick={saveNow}
            disabled={!dirty}
            className="min-h-8 gap-1.5"
          >
            <Check className="size-3.5" aria-hidden="true" />
            {t("note.save")}
          </Button>
        </div>
      </div>
    </div>
  );
}
