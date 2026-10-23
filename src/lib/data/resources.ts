import type { Category, Resource } from "./types";
import { categoriesPart1 } from "./categories-1";
import { categoriesPart2 } from "./categories-2";
import { categoriesPart3 } from "./categories-3";
import { categoriesPart4 } from "./categories-4";

export * from "./types";

/** The complete DevReady catalog — all 32 categories. */
export const categories: Category[] = [
  ...categoriesPart1,
  ...categoriesPart2,
  ...categoriesPart3,
  ...categoriesPart4,
];

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

/**
 * Stable storage key for a resource within its category. Mirrors the
 * category-scoped React keys used by the resources view, so cross-category
 * duplicates (e.g. SQLBolt in Databases AND Question Banks) stay unique.
 */
export function resourceKeyOf(catId: string, resource: Resource): string {
  return `${catId}·${resource.name}·${resource.url ?? "nolink"}`;
}

export interface ResourceRef {
  category: Category;
  resource: Resource;
  /** Storage key (see resourceKeyOf). */
  key: string;
}

/** Decorated catalog — every resource with its category and storage key. */
export const resourceRefs: ResourceRef[] = categories.flatMap((c) =>
  c.resources.map((r) => ({ category: c, resource: r, key: resourceKeyOf(c.id, r) }))
);

const refByKey = new Map(resourceRefs.map((ref) => [ref.key, ref]));

/** Look a resource up by its storage key (used by the library view). */
export function refOf(key: string): ResourceRef | undefined {
  return refByKey.get(key);
}

/** Resolve a resource detail route (`#/resource/<catId>/<encodedName>`). */
export function resolveResource(catId: string, name: string): ResourceRef | undefined {
  const category = getCategory(catId);
  if (!category) return undefined;
  const resource = category.resources.find((r) => r.name === name);
  if (!resource) return undefined;
  return { category, resource, key: resourceKeyOf(catId, resource) };
}

/** Deep-linkable hash URL for a resource's detail page. */
export function resourceHref(catId: string, resource: Resource): string {
  return `#/resource/${catId}/${encodeURIComponent(resource.name)}`;
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
