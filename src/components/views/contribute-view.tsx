"use client";

import { useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCopy,
  Download,
  HandHeart,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLanguage } from "@/lib/language-context";
import {
  normalizeUrl,
  useContrib,
  type ContribKind,
  type ContribLang,
  type ContribLevel,
  type Contribution,
} from "@/lib/contrib-context";
import { categories, getCategory } from "@/lib/data/resources";
import { dateKey } from "@/lib/data/challenges";
import type { DictKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const KINDS: ContribKind[] = ["article", "video", "course", "tool", "interactive", "questions"];
const LEVELS: ContribLevel[] = ["beginner", "intermediate", "advanced"];
const LANG_OPTIONS: { value: ContribLang; labelKey: DictKey }[] = [
  { value: "en", labelKey: "contrib.lang.en" },
  { value: "fa", labelKey: "contrib.lang.fa" },
  { value: "both", labelKey: "contrib.lang.both" },
];

const MIN_DESC = 20;

function isValidUrl(raw: string): boolean {
  try {
    const u = new URL(raw.trim());
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

/** Shared pill row for language / level selection. */
function PillRow<T extends string>({
  label,
  options,
  value,
  onChange,
  allowClear = false,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T | "";
  onChange: (next: T | "") => void;
  allowClear?: boolean;
}) {
  return (
    <div
      role="group"
      aria-label={label}
      className="flex flex-wrap gap-2"
    >
      {options.map(({ value: option, label: optionLabel }) => {
        const active = value === option;
        return (
          <Button
            key={option}
            type="button"
            variant={active ? "default" : "outline"}
            size="sm"
            aria-pressed={active}
            onClick={() => onChange(active && allowClear ? "" : option)}
            className="min-h-9 rounded-full px-3"
          >
            {optionLabel}
          </Button>
        );
      })}
    </div>
  );
}

export function ContributeView() {
  const { t, num, lang, isFa } = useLanguage();
  const { submissions, count, add, update, remove } = useContrib();

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [language, setLanguage] = useState<ContribLang | "">(isFa ? "fa" : "en");
  const [kind, setKind] = useState<ContribKind>("article");
  const [level, setLevel] = useState<ContribLevel | "">("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<"new" | "edit" | null>(null);
  const [copied, setCopied] = useState(false);
  const copiedTimer = useRef<number | null>(null);
  const formTopRef = useRef<HTMLDivElement>(null);

  const resetForm = () => {
    setTitle("");
    setUrl("");
    setCategoryId("");
    setLanguage(isFa ? "fa" : "en");
    setKind("article");
    setLevel("");
    setDesc("");
    setAuthor("");
    setEditingId(null);
    setErrors([]);
  };

  // Live duplicate check — warning only, never blocking.
  const normalizedUrl = url.trim() && isValidUrl(url) ? normalizeUrl(url) : "";
  const catalogDup = normalizedUrl
    ? categories.find((c) =>
        c.resources.some(
          (r) => r.url && normalizeUrl(r.url) === normalizedUrl
        )
      )
    : undefined;
  const mineDup = normalizedUrl
    ? submissions.find(
        (s) => normalizeUrl(s.url) === normalizedUrl && s.id !== editingId
      )
    : undefined;

  const startEdit = (item: Contribution) => {
    setEditingId(item.id);
    setTitle(item.title);
    setUrl(item.url);
    setCategoryId(item.categoryId);
    setLanguage(item.language);
    setKind(item.kind);
    setLevel(item.level ?? "");
    setDesc(item.desc);
    setAuthor(item.author ?? "");
    setErrors([]);
    setSuccess(null);
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const onSubmit = () => {
    const nextErrors: string[] = [];
    if (!title.trim()) nextErrors.push("title");
    if (!isValidUrl(url)) nextErrors.push("url");
    if (!categoryId) nextErrors.push("category");
    if (desc.trim().length < MIN_DESC) nextErrors.push("desc");
    setErrors(nextErrors);
    if (nextErrors.length > 0) {
      setSuccess(null);
      return;
    }
    const draft = {
      title: title.trim(),
      url: url.trim(),
      categoryId,
      language: (language || "en") as ContribLang,
      kind,
      level: level === "" ? undefined : level,
      desc: desc.trim(),
      author: author.trim() ? author.trim() : undefined,
    };
    if (editingId) {
      update(editingId, draft);
      setSuccess("edit");
    } else {
      add(draft);
      setSuccess("new");
    }
    resetForm();
  };

  const exportJson = () => {
    if (submissions.length === 0) return;
    const payload = {
      source: "DevReady — bilingual web development interview prep",
      type: "resource-suggestions",
      exportedAt: new Date().toISOString(),
      count: submissions.length,
      suggestions: submissions.map((s) => ({
        title: s.title,
        url: s.url,
        category: getCategory(s.categoryId)?.name.en ?? s.categoryId,
        language: s.language,
        type: s.kind,
        level: s.level ?? null,
        description: s.desc,
        suggestedBy: s.author ?? null,
        submittedAt: new Date(s.createdAt).toISOString(),
      })),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = objectUrl;
    a.download = `devready-resource-suggestions-${dateKey()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(objectUrl);
  };

  const copyMarkdown = () => {
    if (submissions.length === 0) return;
    const md = submissions
      .map((s) => {
        const lines: (string | false)[] = [
          `## ${s.title}`,
          "",
          `- URL: ${s.url}`,
          `- Category: ${getCategory(s.categoryId)?.name.en ?? s.categoryId}`,
          `- Language: ${s.language}`,
          `- Type: ${s.kind}`,
          s.level ? `- Level: ${s.level}` : false,
          s.author ? `- Suggested by: ${s.author}` : false,
          `- Submitted: ${new Date(s.createdAt).toISOString().slice(0, 10)}`,
          "",
          s.desc,
        ];
        return lines.filter(Boolean).join("\n");
      })
      .join("\n\n---\n\n");
    navigator.clipboard
      .writeText(md)
      .then(() => {
        setCopied(true);
        if (copiedTimer.current !== null) window.clearTimeout(copiedTimer.current);
        copiedTimer.current = window.setTimeout(() => setCopied(false), 2500);
      })
      .catch(() => {
        // Clipboard unavailable (permissions / insecure context) — no-op.
      });
  };

  const errorBanner = errors.length > 0 ? (
    <div
      role="alert"
      className="flex items-start gap-2 rounded-lg border border-amber-600/30 bg-amber-500/5 p-3 text-sm text-amber-700 dark:border-amber-400/30 dark:text-amber-400"
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{t("contrib.err.title")}</p>
        <ul className="mt-1 list-inside list-disc space-y-0.5">
          {errors.includes("title") ? <li>{t("contrib.err.titleField")}</li> : null}
          {errors.includes("url") ? <li>{t("contrib.err.url")}</li> : null}
          {errors.includes("category") ? <li>{t("contrib.err.category")}</li> : null}
          {errors.includes("desc") ? <li>{t("contrib.err.desc")}</li> : null}
        </ul>
      </div>
    </div>
  ) : null;

  return (
    <section aria-labelledby="contrib-title" className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <header className="max-w-2xl">
        <h1
          id="contrib-title"
          className="flex items-center gap-2.5 text-3xl font-extrabold tracking-tight sm:text-4xl"
        >
          <HandHeart className="size-7 text-primary" aria-hidden="true" />
          {t("contrib.title")}
        </h1>
        <p className="mt-3 leading-relaxed text-muted-foreground">{t("contrib.subtitle")}</p>
      </header>

      {/* Success banner */}
      <div aria-live="polite">
        {success ? (
          <p className="mt-6 flex items-start gap-2 rounded-lg border border-emerald-600/25 bg-emerald-500/5 p-3 text-sm text-emerald-700 dark:border-emerald-400/25 dark:text-emerald-400">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {success === "new" ? t("contrib.success.new") : t("contrib.success.edit")}
          </p>
        ) : null}
      </div>

      {/* Form */}
      <div ref={formTopRef} className="mt-8 scroll-mt-20 rounded-xl border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold tracking-tight">{t("contrib.form.title")}</h2>
          {editingId ? (
            <Badge variant="secondary" className="text-xs">
              {t("contrib.editing")}
            </Badge>
          ) : null}
        </div>

        <div className="mt-4">{errorBanner}</div>

        <form
          className="mt-2 grid gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="contrib-title-input">{t("contrib.field.title")}</Label>
              <Input
                id="contrib-title-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t("contrib.field.titlePh")}
                aria-invalid={errors.includes("title") || undefined}
                className="h-11 bg-background"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contrib-url-input">{t("contrib.field.url")}</Label>
              <Input
                id="contrib-url-input"
                type="url"
                inputMode="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t("contrib.field.urlPh")}
                aria-invalid={errors.includes("url") || undefined}
                className="h-11 bg-background font-mono text-sm"
                dir="ltr"
              />
            </div>
          </div>

          {/* Duplicate warnings */}
          {catalogDup ? (
            <p
              role="status"
              className="flex items-start gap-2 rounded-lg border border-amber-600/30 bg-amber-500/5 p-3 text-sm text-amber-700 dark:border-amber-400/30 dark:text-amber-400"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t("contrib.dup.catalog", { category: catalogDup.name[lang] })}
            </p>
          ) : null}
          {mineDup ? (
            <p
              role="status"
              className="flex items-start gap-2 rounded-lg border border-amber-600/30 bg-amber-500/5 p-3 text-sm text-amber-700 dark:border-amber-400/30 dark:text-amber-400"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {t("contrib.dup.mine")}
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="contrib-category-select">{t("contrib.field.category")}</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger
                  id="contrib-category-select"
                  aria-label={t("contrib.field.category")}
                  aria-invalid={errors.includes("category") || undefined}
                  className="h-11 w-full bg-background"
                >
                  <SelectValue placeholder={t("contrib.field.categoryPh")} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name[lang]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contrib-kind-select">{t("contrib.field.kind")}</Label>
              <Select value={kind} onValueChange={(v) => setKind(v as ContribKind)}>
                <SelectTrigger
                  id="contrib-kind-select"
                  aria-label={t("contrib.field.kind")}
                  className="h-11 w-full bg-background"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {KINDS.map((k) => (
                    <SelectItem key={k} value={k}>
                      {t(`contrib.kind.${k}` as const)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label>{t("contrib.field.lang")}</Label>
              <PillRow<ContribLang>
                label={t("contrib.field.lang")}
                options={LANG_OPTIONS.map(({ value, labelKey }) => ({
                  value,
                  label: t(labelKey),
                }))}
                value={language}
                onChange={(next) => setLanguage(next === "" ? "en" : next)}
              />
            </div>
            <div className="grid gap-2">
              <Label>{t("contrib.field.level")}</Label>
              <PillRow<ContribLevel>
                label={t("contrib.field.level")}
                options={LEVELS.map((value) => ({
                  value,
                  label: t(`contrib.level.${value}` as const),
                }))}
                value={level}
                onChange={setLevel}
                allowClear
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contrib-desc-input">{t("contrib.field.desc")}</Label>
            <Textarea
              id="contrib-desc-input"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder={t("contrib.field.descPh")}
              rows={4}
              aria-invalid={errors.includes("desc") || undefined}
              className="bg-background"
            />
            <p className="text-xs text-muted-foreground">
              {num(desc.trim().length)} / {num(MIN_DESC)}+
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="contrib-author-input">{t("contrib.field.author")}</Label>
            <Input
              id="contrib-author-input"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={t("contrib.field.authorPh")}
              className="h-11 bg-background"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" className="min-h-11 gap-2">
              <HandHeart className="size-4" aria-hidden="true" />
              {editingId ? t("contrib.saveEdit") : t("contrib.submit")}
            </Button>
            {editingId ? (
              <Button
                type="button"
                variant="ghost"
                onClick={resetForm}
                className="min-h-11 text-muted-foreground"
              >
                {t("contrib.cancelEdit")}
              </Button>
            ) : null}
          </div>
        </form>

        <p className="mt-5 flex items-center gap-1.5 border-t pt-4 text-xs text-muted-foreground">
          <CheckCircle2 className="size-3.5 text-primary" aria-hidden="true" />
          {t("contrib.privacy")}
        </p>
      </div>

      {/* Export bar */}
      {count > 0 ? (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border bg-muted/30 p-4">
          <Button variant="outline" onClick={exportJson} className="min-h-11 gap-2">
            <Download className="size-4" aria-hidden="true" />
            {t("contrib.export.json")}
          </Button>
          <Button variant="outline" onClick={copyMarkdown} className="min-h-11 gap-2">
            <ClipboardCopy className="size-4" aria-hidden="true" />
            {copied ? t("contrib.export.copied") : t("contrib.export.markdown")}
          </Button>
        </div>
      ) : null}

      {/* My suggestions */}
      <div className="mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-xl font-extrabold tracking-tight">{t("contrib.mine.title")}</h2>
          <p className="text-sm text-muted-foreground">{t("contrib.mine.count", { n: num(count) })}</p>
        </div>

        {submissions.length === 0 ? (
          <div className="mt-5 rounded-xl border border-dashed p-10 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-xl bg-muted">
              <HandHeart className="size-6 text-muted-foreground" aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-lg font-semibold">{t("contrib.mine.empty.title")}</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("contrib.mine.empty.desc")}
            </p>
          </div>
        ) : (
          <ul className="mt-5 space-y-4">
            {submissions.map((item) => {
              const category = getCategory(item.categoryId);
              return (
                <li key={item.id} className="rounded-xl border bg-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="font-bold leading-snug">{item.title}</h3>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        dir="ltr"
                        className="mt-1 inline-block max-w-full truncate font-mono text-xs text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                      >
                        {item.url}
                      </a>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(item)}
                        className="min-h-9 gap-1.5 text-muted-foreground"
                      >
                        <Pencil className="size-3.5" aria-hidden="true" />
                        {t("contrib.edit")}
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t("contrib.delete")}
                            title={t("contrib.delete")}
                            className="size-9 text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>{t("contrib.delete.confirm.title")}</AlertDialogTitle>
                            <AlertDialogDescription>
                              {t("contrib.delete.confirm.desc")}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>{t("contrib.delete.confirm.cancel")}</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                remove(item.id);
                                if (editingId === item.id) resetForm();
                              }}
                              className="bg-destructive text-white hover:bg-destructive/90"
                            >
                              {t("contrib.delete.confirm.ok")}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="gap-1 bg-background text-xs">
                      <HandHeart className="size-3" aria-hidden="true" />
                      {t("contrib.status.queued")}
                    </Badge>
                    {category ? (
                      <Badge variant="secondary" className="text-xs">
                        {category.name[lang]}
                      </Badge>
                    ) : null}
                    <Badge variant="outline" className="bg-background text-xs">
                      {t(`contrib.kind.${item.kind}` as const)}
                    </Badge>
                    <Badge variant="outline" className="bg-background text-xs">
                      {t(`contrib.lang.${item.language}` as const)}
                    </Badge>
                    {item.level ? (
                      <Badge
                        variant="outline"
                        className="bg-background text-xs text-emerald-700 dark:text-emerald-400"
                      >
                        {t(`contrib.level.${item.level}` as const)}
                      </Badge>
                    ) : null}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  <p className="mt-3 text-xs text-muted-foreground/80">
                    {t("contrib.created", {
                      date: new Date(item.createdAt).toLocaleDateString(
                        isFa ? "fa-IR" : "en-US"
                      ),
                    })}
                    {item.author ? ` · ${item.author}` : ""}
                  </p>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
