"use client";

import { ThemeProvider } from "next-themes";
import { DirectionProvider } from "@radix-ui/react-direction";
import { LanguageProvider, useLanguage } from "@/lib/language-context";

/**
 * Radix primitives (Tooltip, Menu, Dialog…) read direction from context
 * rather than sniffing `document.dir` — this keeps RTL switching fully
 * React-controlled and hydration-stable.
 */
function RadixDirection({ children }: { children: React.ReactNode }) {
  const { dir } = useLanguage();
  return <DirectionProvider dir={dir}>{children}</DirectionProvider>;
}

/**
 * Client providers mounted from the root layout:
 * - next-themes → dark / light / system with class strategy
 * - LanguageProvider → EN/FA dictionaries + document dir/lang switching
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <RadixDirection>{children}</RadixDirection>
      </LanguageProvider>
    </ThemeProvider>
  );
}
