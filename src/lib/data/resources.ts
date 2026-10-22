import type { Category } from "./types";
import { categoriesPart1 } from "./categories-1";
import { categoriesPart2 } from "./categories-2";

export * from "./types";

/** The complete DevReady catalog — all 16 categories. */
export const categories: Category[] = [...categoriesPart1, ...categoriesPart2];

export const totalResources: number = categories.reduce(
  (sum, c) => sum + c.resources.length,
  0
);

export const totalPersian: number = categories.reduce(
  (sum, c) => sum + c.resources.filter((r) => r.fa).length,
  0
);

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

/** Best-effort domain label for a resource URL. */
export function domainOf(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    if (u.hostname === "github.com" && u.pathname.startsWith("/search")) {
      return "github.com/search";
    }
    return u.hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}
