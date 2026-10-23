"use client";

import { useState, type FormEvent } from "react";
import {
  AlertTriangle,
  Bookmark,
  Brain,
  CalendarDays,
  CloudDownload,
  CloudUpload,
  FilePen,
  Flame,
  Loader2,
  LogOut,
  RefreshCw,
  ShieldCheck,
  ThumbsUp,
  Trash2,
  UserRound,
  Vote,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { useAuth, type AuthErrorKey } from "@/lib/auth-context";
import { useLibrary } from "@/lib/library-context";
import { useSrs } from "@/lib/srs-context";
import { useContrib } from "@/lib/contrib-context";
import { useVotes } from "@/lib/votes-context";
import type { DictKey } from "@/lib/i18n";

/**
 * Phase 5 — account & sync view (`#/account`).
 * Signed out: sign-in / registration + an honest explainer of what syncs.
 * Signed in: profile, sync controls (merge / restore / overwrite), a summary
 * of the data on this device, and a danger zone (sign out / delete account).
 */

const FIELD_ERROR_KEYS: Record<string, DictKey> = {
  invalid_email: "auth.err.invalid_email",
  weak_password: "auth.err.weak_password",
  email_taken: "auth.err.email_taken",
  name_too_long: "auth.err.name_long",
};

function formatDate(ts: number | string | undefined, lang: "en" | "fa", withTime?: boolean) {
  if (!ts) return "";
  const date = typeof ts === "number" ? new Date(ts) : new Date(ts);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(lang === "fa" ? "fa-IR" : "en-US", {
    dateStyle: "medium",
    ...(withTime ? { timeStyle: "short" } : {}),
  }).format(date);
}

export function AccountView() {
  const { t, lang } = useLanguage();
  const {
    account,
    isSignedIn,
    syncing,
    syncError,
    lastSyncAt,
    autoSync,
    register,
    login,
    signOut,
    deleteAccount,
    setAutoSync,
    syncNow,
    restoreFromCloud,
    overwriteCloud,
  } = useAuth();
  const { bookmarkCount, doingCount, doneCount, notesCount } = useLibrary();
  const { totalCount } = useSrs();
  const { count } = useContrib();
  const { totalVotesCast } = useVotes();

  // ---- form state (signed-out) ---------------------------------------------
  const [mode, setMode] = useState<"signin" | "register">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, DictKey>>({});
  const [formError, setFormError] = useState<AuthErrorKey | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError(null);
    setFieldErrors({});

    // Client-side pre-validation mirrors the server rules.
    const errors: Record<string, DictKey> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) {
      errors.email = "auth.err.invalid_email";
    }
    if (password.length < 8) errors.password = "auth.err.weak_password";
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    const result =
      mode === "signin"
        ? await login(email, password)
        : await register(email, password, name);
    setSubmitting(false);
    if (!result.ok) {
      setFormError(result.error);
      if (result.field) {
        setFieldErrors({ [result.field]: result.error as DictKey });
      }
    }
  };

  const dateFmt = (ts: number | string | undefined, withTime?: boolean) =>
    formatDate(ts, lang, withTime);

  // ---- signed out -----------------------------------------------------------
  if (!isSignedIn || !account) {
    return (
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
        <header className="max-w-2xl">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            {t("acct.title")}
          </h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {t("acct.subtitle")}
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_20rem]">
          <div className="rounded-xl border bg-card p-5 sm:p-6">
            <Tabs
              value={mode}
              onValueChange={(value) => {
                setMode(value as "signin" | "register");
                setFormError(null);
                setFieldErrors({});
              }}
            >
              <TabsList className="w-full sm:w-fit">
                <TabsTrigger value="signin" className="min-h-9 flex-1 sm:flex-none sm:px-6">
                  {t("acct.tab.signIn")}
                </TabsTrigger>
                <TabsTrigger value="register" className="min-h-9 flex-1 sm:flex-none sm:px-6">
                  {t("acct.tab.register")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="mt-5">
                <form onSubmit={submit} className="grid gap-4" noValidate>
                  <CredentialFields
                    email={email}
                    password={password}
                    fieldErrors={fieldErrors}
                    onEmail={setEmail}
                    onPassword={setPassword}
                    emailLabel={t("acct.email")}
                    passwordLabel={t("acct.password")}
                    passwordAutoComplete="current-password"
                    t={t}
                  />
                  {formError ? <ErrorBanner error={formError} /> : null}
                  <Button type="submit" disabled={submitting} className="min-h-11 gap-2">
                    {submitting ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <LogOut className="size-4 rtl:-scale-x-100" aria-hidden="true" />
                    )}
                    {t("acct.signIn.cta")}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register" className="mt-5">
                <form onSubmit={submit} className="grid gap-4" noValidate>
                  <div className="grid gap-1.5">
                    <Label htmlFor="acct-name">{t("acct.name")}</Label>
                    <Input
                      id="acct-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="nickname"
                      maxLength={80}
                      className="min-h-11"
                    />
                  </div>
                  <CredentialFields
                    email={email}
                    password={password}
                    fieldErrors={fieldErrors}
                    onEmail={setEmail}
                    onPassword={setPassword}
                    emailLabel={t("acct.email")}
                    passwordLabel={t("acct.password")}
                    passwordAutoComplete="new-password"
                    t={t}
                  />
                  {formError ? <ErrorBanner error={formError} /> : null}
                  <Button type="submit" disabled={submitting} className="min-h-11 gap-2">
                    {submitting ? (
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <UserRound className="size-4" aria-hidden="true" />
                    )}
                    {t("acct.register.cta")}
                  </Button>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {t("acct.register.terms")}
                  </p>
                </form>
              </TabsContent>
            </Tabs>
          </div>

          <aside className="flex flex-col gap-4">
            <div className="rounded-xl border bg-card p-5">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <CloudUpload className="size-4 text-primary" aria-hidden="true" />
                {t("acct.what.title")}
              </h2>
              <ul className="mt-3 grid gap-2 text-sm text-muted-foreground">
                {(
                  [
                    ["acct.what.bookmarks", Bookmark],
                    ["acct.what.progress", Flame],
                    ["acct.what.notes", FilePen],
                    ["acct.what.review", Brain],
                    ["acct.what.votes", Vote],
                    ["acct.what.contribs", ThumbsUp],
                  ] as const
                ).map(([key, Icon]) => (
                  <li key={key} className="flex items-center gap-2">
                    <Icon className="size-3.5 shrink-0 text-primary/70" aria-hidden="true" />
                    {t(key)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-emerald-600/25 bg-emerald-500/5 p-5 dark:border-emerald-400/25">
              <h2 className="flex items-center gap-2 text-sm font-bold">
                <ShieldCheck
                  className="size-4 text-emerald-700 dark:text-emerald-400"
                  aria-hidden="true"
                />
                {t("acct.privacy.title")}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">
                {t("acct.privacy.body")}
              </p>
            </div>
          </aside>
        </div>
      </section>
    );
  }

  // ---- signed in --------------------------------------------------------------
  const initial = (account.name || account.email).trim().charAt(0).toUpperCase();

  return (
    <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
        {t("acct.title")}
      </h1>

      {/* Profile */}
      <div className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border bg-card p-5">
        <span
          className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-lg font-extrabold text-primary-foreground"
          aria-hidden="true"
        >
          {initial}
        </span>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold leading-tight">
            {account.name || t("acct.profile.fallbackName")}
          </p>
          <p className="truncate text-sm text-muted-foreground">{account.email}</p>
        </div>
        {account.createdAt ? (
          <Badge variant="secondary" className="ms-auto gap-1.5 py-1 text-xs">
            <CalendarDays className="size-3.5" aria-hidden="true" />
            {t("acct.memberSince", { date: dateFmt(account.createdAt) })}
          </Badge>
        ) : null}
      </div>

      {/* Sync */}
      <div className="mt-6 rounded-xl border bg-card p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-base font-bold">
            <RefreshCw
              className={cnSpin(syncing)}
              aria-hidden="true"
            />
            {t("acct.sync.title")}
          </h2>
          <div className="flex items-center gap-2">
            <Switch
              id="autosync"
              checked={autoSync}
              onCheckedChange={setAutoSync}
              aria-label={t("acct.sync.auto")}
            />
            <Label htmlFor="autosync" className="cursor-pointer text-sm">
              {t("acct.sync.auto")}
            </Label>
          </div>
        </div>

        <p className="mt-2 text-sm text-muted-foreground">
          {lastSyncAt
            ? t("acct.sync.last", { when: dateFmt(lastSyncAt, true) })
            : t("acct.sync.never")}
        </p>
        {syncError ? (
          <p
            role="alert"
            className="mt-3 flex items-center gap-2 rounded-lg border border-amber-600/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-800 dark:border-amber-400/30 dark:text-amber-300"
          >
            <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
            {t(syncError as DictKey)}
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={() => void syncNow()} disabled={syncing} className="min-h-11 gap-2">
            <RefreshCw className={cnSpin(syncing)} aria-hidden="true" />
            {t("acct.sync.now")}
          </Button>
          <Button
            variant="outline"
            onClick={() => void restoreFromCloud()}
            disabled={syncing}
            className="min-h-11 gap-2"
          >
            <CloudDownload className="size-4" aria-hidden="true" />
            {t("acct.sync.restore")}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                disabled={syncing}
                className="min-h-11 gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <CloudUpload className="size-4" aria-hidden="true" />
                {t("acct.sync.overwrite")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("acct.sync.overwriteTitle")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("acct.sync.overwriteDesc")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("acct.cancel")}</AlertDialogCancel>
                <AlertDialogAction onClick={() => void overwriteCloud()}>
                  {t("acct.sync.overwrite")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <p className="mt-4 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
          {t("acct.sync.mergeNote")}
        </p>
      </div>

      {/* Data on this device */}
      <div className="mt-6 rounded-xl border bg-card p-5 sm:p-6">
        <h2 className="text-base font-bold">{t("acct.data.title")}</h2>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {(
            [
              [bookmarkCount, "acct.data.bookmarks", Bookmark],
              [doingCount + doneCount, "acct.data.progress", Flame],
              [notesCount, "acct.data.notes", FilePen],
              [totalCount, "acct.data.review", Brain],
              [totalVotesCast, "acct.data.votes", Vote],
              [count, "acct.data.contribs", ThumbsUp],
            ] as const
          ).map(([value, key, Icon]) => (
            <div
              key={key}
              className="flex flex-col items-center gap-1 rounded-lg border bg-background/60 p-3 text-center"
            >
              <Icon className="size-4 text-primary/70" aria-hidden="true" />
              <span className="text-lg font-extrabold leading-none">{value}</span>
              <span className="text-[11px] leading-tight text-muted-foreground">
                {t(key)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="mt-6 rounded-xl border border-destructive/30 p-5 sm:p-6">
        <h2 className="text-base font-bold text-destructive">{t("acct.danger.title")}</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => void signOut()} className="min-h-11 gap-2">
            <LogOut className="size-4 rtl:-scale-x-100" aria-hidden="true" />
            {t("acct.signOut")}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="min-h-11 gap-2 border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="size-4" aria-hidden="true" />
                {t("acct.delete")}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>{t("acct.delete.title")}</AlertDialogTitle>
                <AlertDialogDescription>
                  {t("acct.delete.desc")}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("acct.cancel")}</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => void deleteAccount()}
                  className="bg-destructive text-white hover:bg-destructive/90"
                >
                  {t("acct.delete")}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t("acct.danger.note")}</p>
      </div>
    </section>
  );
}

// ---- small shared pieces ------------------------------------------------------

function cnSpin(spinning: boolean) {
  return `size-4 ${spinning ? "animate-spin" : ""} text-primary`;
}

function CredentialFields({
  email,
  password,
  fieldErrors,
  onEmail,
  onPassword,
  emailLabel,
  passwordLabel,
  passwordAutoComplete,
  t,
}: {
  email: string;
  password: string;
  fieldErrors: Record<string, DictKey>;
  onEmail: (value: string) => void;
  onPassword: (value: string) => void;
  emailLabel: string;
  passwordLabel: string;
  passwordAutoComplete: "current-password" | "new-password";
  t: (key: DictKey) => string;
}) {
  return (
    <>
      <div className="grid gap-1.5">
        <Label htmlFor="acct-email">{emailLabel}</Label>
        <Input
          id="acct-email"
          type="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          autoComplete="email"
          dir="ltr"
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "acct-email-err" : undefined}
          className="min-h-11"
        />
        {fieldErrors.email ? (
          <p id="acct-email-err" className="text-xs font-medium text-destructive">
            {t(fieldErrors.email)}
          </p>
        ) : null}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="acct-password">{passwordLabel}</Label>
        <Input
          id="acct-password"
          type="password"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          autoComplete={passwordAutoComplete}
          dir="ltr"
          aria-invalid={Boolean(fieldErrors.password)}
          aria-describedby={fieldErrors.password ? "acct-password-err" : undefined}
          className="min-h-11"
        />
        {fieldErrors.password ? (
          <p id="acct-password-err" className="text-xs font-medium text-destructive">
            {t(fieldErrors.password)}
          </p>
        ) : null}
      </div>
    </>
  );
}

function ErrorBanner({ error }: { error: AuthErrorKey }) {
  const { t } = useLanguage();
  return (
    <p
      role="alert"
      className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive"
    >
      <AlertTriangle className="size-4 shrink-0" aria-hidden="true" />
      {t(error)}
    </p>
  );
}
