"use client";

import { ThemeProvider } from "next-themes";
import { DirectionProvider } from "@radix-ui/react-direction";
import { LanguageProvider, useLanguage } from "@/lib/language-context";
import { LibraryProvider } from "@/lib/library-context";
import { DailyProvider } from "@/lib/daily-context";
import { SrsProvider } from "@/lib/srs-context";
import { ContribProvider } from "@/lib/contrib-context";
import { AuthProvider } from "@/lib/auth-context";
import { VotesProvider } from "@/lib/votes-context";

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
        <LibraryProvider>
          <DailyProvider>
            <SrsProvider>
              <ContribProvider>
                <AuthProvider>
                  <VotesProvider>
                    <RadixDirection>{children}</RadixDirection>
                  </VotesProvider>
                </AuthProvider>
              </ContribProvider>
            </SrsProvider>
          </DailyProvider>
        </LibraryProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
