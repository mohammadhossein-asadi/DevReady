"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { DictKey } from "@/lib/i18n";
import {
  STORE_KEYS,
  STORE_EVENTS,
  readStoreRaw,
  applyMergedStores,
  mergeAll,
  type SyncStores,
  type StoreName,
} from "@/lib/sync-merge";

/** Shape of the local votes store (mirrors votes-context). */
interface LocalVotes {
  votes?: Record<string, { level?: unknown; updatedAt?: number }>;
}

/**
 * Phase 5 — optional account + cloud sync.
 *
 * Everything in DevReady works without an account; this layer only adds an
 * opt-in mirror of the five local stores (library, daily, srs, contribs,
 * votes) to a private cloud snapshot. The client always owns conflicts:
 * the server stores opaque JSON, merging happens locally via sync-merge.
 *
 * - login/register → the server returns a bearer token (30-day session).
 * - syncNow        → pull cloud, merge locally, write back the merged state.
 * - restore        → pull cloud + merge, without pushing (multi-device catch-up).
 * - overwrite      → push local stores as-is (replaces the cloud snapshot).
 * - auto-sync      → debounced push after local changes + pull on load.
 */

export interface AuthData {
  v: 1;
  token: string;
  email: string;
  name?: string;
  createdAt?: string;
  lastSyncAt?: number;
  autoSync: boolean;
}

const STORAGE_KEY = "devready:auth:v1";
const AUTH_EVENT = "devready:auth-change";

const EMPTY: AuthData | null = null;

function parse(raw: string | null): AuthData | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as Partial<AuthData>;
    if (data.v !== 1 || typeof data.token !== "string" || !data.token) return null;
    if (typeof data.email !== "string" || !data.email) return null;
    return {
      v: 1,
      token: data.token,
      email: data.email,
      name: typeof data.name === "string" ? data.name : undefined,
      createdAt: typeof data.createdAt === "string" ? data.createdAt : undefined,
      lastSyncAt: typeof data.lastSyncAt === "number" ? data.lastSyncAt : undefined,
      autoSync: data.autoSync !== false,
    };
  } catch {
    return null;
  }
}

let cache: { raw: string | null; data: AuthData | null } = {
  raw: undefined as never,
  data: EMPTY,
};

function readData(): AuthData | null {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
  if (cache.raw === raw) return cache.data;
  cache = { raw, data: parse(raw) };
  return cache.data;
}

function writeData(next: AuthData | null) {
  cache = { raw: next ? JSON.stringify(next) : null, data: next };
  try {
    if (next) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Storage unavailable — session stays for this tab only.
  }
  window.dispatchEvent(new Event(AUTH_EVENT));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(AUTH_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(AUTH_EVENT, onChange);
  };
}

function getSnapshot(): AuthData | null {
  return readData();
}

function getServerSnapshot(): AuthData | null {
  return null;
}

// ---- API helpers -------------------------------------------------------------

export type AuthErrorKey =
  | "auth.err.invalid_email"
  | "auth.err.weak_password"
  | "auth.err.email_taken"
  | "auth.err.invalid_credentials"
  | "auth.err.name_long"
  | "auth.err.network";

export type AuthResult =
  | { ok: true }
  | { ok: false; error: AuthErrorKey; field?: "email" | "password" | "name" };

type SyncErrorKey = "sync.err.network" | "sync.err.too_large" | "auth.err.expired";

function deviceLabel(): string {
  if (typeof navigator === "undefined") return "device";
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Android/i.test(ua)) return "Android";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/Linux/i.test(ua)) return "Linux";
  return "Web";
}

function collectStores(): SyncStores {
  return {
    library: readStoreRaw("library"),
    daily: readStoreRaw("daily"),
    srs: readStoreRaw("srs"),
    contribs: readStoreRaw("contribs"),
    votes: readStoreRaw("votes"),
  };
}

// ---- context -----------------------------------------------------------------

export type SyncStatus = "idle" | "syncing" | "error";

interface AuthContextValue {
  data: AuthData | null;
  isSignedIn: boolean;
  account: { email: string; name?: string; createdAt?: string } | null;
  /** True while any sync operation is in flight. */
  syncing: boolean;
  /** Present when the last sync attempt failed (i18n key). */
  syncError: SyncErrorKey | null;
  lastSyncAt: number | null;
  autoSync: boolean;
  register: (email: string, password: string, name?: string) => Promise<AuthResult>;
  login: (email: string, password: string) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<AuthResult>;
  setAutoSync: (on: boolean) => void;
  /** Pull → merge → push. The canonical "sync now". */
  syncNow: () => Promise<void>;
  /** Pull cloud + merge locally, without pushing (catch up from other devices). */
  restoreFromCloud: () => Promise<void>;
  /** Push local stores as-is, replacing the cloud snapshot. */
  overwriteCloud: () => Promise<void>;
  /** Mirrors a vote to the server (used by votes-context). Returns success. */
  putVote: (key: string, level: "easy" | "medium" | "hard" | null) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORE_NAMES: StoreName[] = ["library", "daily", "srs", "contribs", "votes"];
const AUTO_PUSH_DEBOUNCE_MS = 4000;

export function AuthProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [syncing, setSyncing] = useState(false);
  const [syncError, setSyncError] = useState<SyncErrorKey | null>(null);
  const syncBusy = useRef(false);
  const pushTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const patch = useCallback((patchData: Partial<AuthData>) => {
    const current = readData();
    if (!current) return;
    writeData({ ...current, ...patchData });
  }, []);

  /** Any 401 means the session died — sign out cleanly. */
  const handle401 = useCallback(() => {
    writeData(null);
    setSyncError("auth.err.expired");
  }, []);

  const authorized = useCallback(
    async (path: string, init: RequestInit = {}): Promise<Response | null> => {
      const current = readData();
      if (!current) return null;
      try {
        const res = await fetch(path, {
          ...init,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${current.token}`,
            ...(init.headers ?? {}),
          },
        });
        if (res.status === 401) handle401();
        return res;
      } catch {
        return null;
      }
    },
    [handle401]
  );

  const pushStores = useCallback(
    async (stores: SyncStores): Promise<boolean> => {
      const res = await authorized("/api/sync", {
        method: "PUT",
        body: JSON.stringify({ payload: stores, device: deviceLabel() }),
      });
      if (!res) {
        setSyncError("sync.err.network");
        return false;
      }
      if (res.status === 413) {
        setSyncError("sync.err.too_large");
        return false;
      }
      if (!res.ok) return false;
      return true;
    },
    [authorized]
  );

  /** Pull cloud → merge with local → apply locally → push merged. */
  const syncNow = useCallback(async () => {
    if (syncBusy.current || !readData()) return;
    syncBusy.current = true;
    setSyncing(true);
    setSyncError(null);
    try {
      const res = await authorized("/api/sync");
      if (res && res.ok) {
        const body = (await res.json()) as {
          payload: SyncStores | null;
        };
        // The payload IS the stores object (see pushStores) — validate shape.
        const payload = body.payload;
        const remote: SyncStores =
          payload && typeof payload === "object" ? payload : {};
        const merged = mergeAll(collectStores(), remote);
        applyMergedStores(merged);
        const pushed = await pushStores(merged);
        if (pushed) patch({ lastSyncAt: Date.now() });
      } else if (!res) {
        setSyncError("sync.err.network");
      }
    } finally {
      syncBusy.current = false;
      setSyncing(false);
    }
  }, [authorized, pushStores, patch]);

  /** Pull cloud + merge locally only (catch-up; never overwrites the cloud). */
  const restoreFromCloud = useCallback(async () => {
    if (syncBusy.current || !readData()) return;
    syncBusy.current = true;
    setSyncing(true);
    setSyncError(null);
    try {
      const res = await authorized("/api/sync");
      if (res && res.ok) {
        const body = (await res.json()) as { payload: SyncStores | null };
        const payload = body.payload;
        if (payload && typeof payload === "object") {
          const merged = mergeAll(collectStores(), payload);
          applyMergedStores(merged);
        }
      } else if (!res) {
        setSyncError("sync.err.network");
      }
    } finally {
      syncBusy.current = false;
      setSyncing(false);
    }
  }, [authorized]);

  /** Push local stores as-is (replaces the cloud snapshot). */
  const overwriteCloud = useCallback(async () => {
    if (syncBusy.current || !readData()) return;
    syncBusy.current = true;
    setSyncing(true);
    setSyncError(null);
    try {
      const pushed = await pushStores(collectStores());
      if (pushed) patch({ lastSyncAt: Date.now() });
    } finally {
      syncBusy.current = false;
      setSyncing(false);
    }
  }, [pushStores, patch]);

  // First sync right after sign-in/register.
  const afterAuth = useCallback(
    (token: string, accountJson: { email: string; name?: string | null; createdAt?: string }) => {
      writeData({
        v: 1,
        token,
        email: accountJson.email,
        name: accountJson.name ?? undefined,
        createdAt: accountJson.createdAt,
        autoSync: readData()?.autoSync ?? true,
      });
    },
    []
  );

  /** Mirrors one vote; returns whether it reached the server. */
  const putVote = useCallback(
    async (key: string, level: "easy" | "medium" | "hard" | null): Promise<boolean> => {
      const res = await authorized("/api/votes", {
        method: "PUT",
        body: JSON.stringify({ key, level }),
      });
      return Boolean(res && res.ok);
    },
    [authorized]
  );

  /** Mirrors every local difficulty vote to the community tally. Used once
   * right after joining (register/sign-in) so pre-account votes count. */
  const mirrorVotes = useCallback(async (): Promise<void> => {
    const raw = readStoreRaw("votes") as LocalVotes | undefined;
    const votes = raw && typeof raw === "object" ? raw.votes : undefined;
    if (!votes) return;
    for (const [key, entry] of Object.entries(votes)) {
      if (entry && (entry.level === "easy" || entry.level === "medium" || entry.level === "hard")) {
        await putVote(key, entry.level);
      }
    }
  }, [putVote]);

  const register = useCallback(
    async (email: string, password: string, name?: string): Promise<AuthResult> => {
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, name: name?.trim() || undefined }),
        });
        const body = (await res.json().catch(() => ({}))) as {
          token?: string;
          account?: { email: string; name?: string | null; createdAt?: string };
          error?: string;
          fields?: Record<string, string>;
        };
        if (!res.ok || !body.token || !body.account) {
          const field = body.fields?.email
            ? "email"
            : body.fields?.password
              ? "password"
              : body.fields?.name
                ? "name"
                : undefined;
          const errorKey: AuthErrorKey =
            body.fields?.email === "email_taken"
              ? "auth.err.email_taken"
              : body.fields?.email === "invalid_email"
                ? "auth.err.invalid_email"
                : body.fields?.password === "weak_password"
                  ? "auth.err.weak_password"
                  : body.fields?.name === "name_too_long"
                    ? "auth.err.name_long"
                    : "auth.err.network";
          return { ok: false, error: errorKey, ...(field ? { field } : {}) };
        }
        afterAuth(body.token, body.account);
        await syncNow();
        void mirrorVotes();
        return { ok: true };
      } catch {
        return { ok: false, error: "auth.err.network" };
      }
    },
    [afterAuth, syncNow, mirrorVotes]
  );

  const login = useCallback(
    async (email: string, password: string): Promise<AuthResult> => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const body = (await res.json().catch(() => ({}))) as {
          token?: string;
          account?: { email: string; name?: string | null; createdAt?: string };
        };
        if (!res.ok || !body.token || !body.account) {
          return { ok: false, error: "auth.err.invalid_credentials" };
        }
        afterAuth(body.token, body.account);
        await syncNow();
        void mirrorVotes();
        return { ok: true };
      } catch {
        return { ok: false, error: "auth.err.network" };
      }
    },
    [afterAuth, syncNow, mirrorVotes]
  );

  const signOut = useCallback(async () => {
    const current = readData();
    writeData(null);
    setSyncError(null);
    if (current) {
      // Best-effort server-side invalidation; local token is dropped anyway.
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { Authorization: `Bearer ${current.token}` },
      }).catch(() => {});
    }
  }, []);

  const deleteAccount = useCallback(async (): Promise<AuthResult> => {
    const res = await authorized("/api/auth/account", { method: "DELETE" });
    if (!res) return { ok: false, error: "auth.err.network" };
    if (!res.ok) return { ok: false, error: "auth.err.invalid_credentials" };
    writeData(null);
    return { ok: true };
  }, [authorized]);

  const setAutoSync = useCallback(
    (on: boolean) => {
      patch({ autoSync: on });
    },
    [patch]
  );

  // Auto-sync: pull on load (once per sign-in session), debounced push on changes.
  const isSignedIn = Boolean(data);
  const autoSync = data?.autoSync ?? false;

  useEffect(() => {
    if (!isSignedIn || !autoSync) return;
    void syncNow();
  }, [isSignedIn, autoSync, syncNow]);

  useEffect(() => {
    if (!isSignedIn || !autoSync) return;
    const schedulePush = () => {
      if (syncBusy.current) return; // syncs write the merged state themselves
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = setTimeout(() => {
        pushTimer.current = null;
        void overwriteCloud();
      }, AUTO_PUSH_DEBOUNCE_MS);
    };
    for (const name of STORE_NAMES) {
      window.addEventListener(STORE_EVENTS[name], schedulePush);
    }
    const onStorage = (e: StorageEvent) => {
      if (e.key && STORE_NAMES.some((n) => STORE_KEYS[n] === e.key)) schedulePush();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      for (const name of STORE_NAMES) {
        window.removeEventListener(STORE_EVENTS[name], schedulePush);
      }
      window.removeEventListener("storage", onStorage);
      if (pushTimer.current) clearTimeout(pushTimer.current);
      pushTimer.current = null;
    };
  }, [isSignedIn, autoSync, overwriteCloud]);

  const value = useMemo<AuthContextValue>(
    () => ({
      data,
      isSignedIn,
      account: data
        ? { email: data.email, name: data.name, createdAt: data.createdAt }
        : null,
      syncing,
      syncError,
      lastSyncAt: data?.lastSyncAt ?? null,
      autoSync,
      register,
      login,
      signOut,
      deleteAccount,
      setAutoSync,
      syncNow,
      restoreFromCloud,
      overwriteCloud,
      putVote,
    }),
    [
      data,
      isSignedIn,
      syncing,
      syncError,
      autoSync,
      register,
      login,
      signOut,
      deleteAccount,
      setAutoSync,
      syncNow,
      restoreFromCloud,
      overwriteCloud,
      putVote,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within <AuthProvider>");
  }
  return ctx;
}
