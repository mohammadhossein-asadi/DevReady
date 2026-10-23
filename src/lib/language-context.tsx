"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { dict, type DictKey, type Lang } from "@/lib/i18n";

interface LanguageContextValue {
  lang: Lang;
  dir: "ltr" | "rtl";
  isFa: boolean;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Translate a key, optionally replacing {placeholders}. */
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
  /**
   * Digit localization is handled visually by the Vazir FD typeface in the fa
   * locale (ASCII digits map to Persian glyphs), so values pass through
   * unchanged — the DOM keeps ASCII digits for copy-paste, in-page search and
   * screen readers.
   */
  num: (value: number | string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "devready:lang";
const LANG_EVENT = "devready:lang-change";

/**
 * The active language lives in localStorage — an external store — so it is
 * read via useSyncExternalStore (server snapshot = "en" keeps SSR stable).
 */
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(LANG_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(LANG_EVENT, onChange);
  };
}

function getSnapshot(): Lang {
  return window.localStorage.getItem(STORAGE_KEY) === "fa" ? "fa" : "en";
}

function getServerSnapshot(): Lang {
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Keep <html lang/dir> in sync with the active language (DOM side effect).
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === "fa" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode) — language still applies
      // for this session via the event below.
    }
    window.dispatchEvent(new Event(LANG_EVENT));
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const isFa = lang === "fa";
    return {
      lang,
      dir: isFa ? "rtl" : "ltr",
      isFa,
      setLang,
      toggle: () => setLang(isFa ? "en" : "fa"),
      t: (key, vars) => {
        let text: string =
          (dict[lang] as Record<string, string>)[key] ??
          (dict.en as Record<string, string>)[key] ??
          key;
        if (vars) {
          for (const [name, replacement] of Object.entries(vars)) {
            text = text.replaceAll(`{${name}}`, String(replacement));
          }
        }
        return text;
      },
      num: (v) => String(v),
    };
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within <LanguageProvider>");
  }
  return ctx;
}
