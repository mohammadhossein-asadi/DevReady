"use client";

import { Skeleton } from "@/components/ui/skeleton";

/** Loading skeleton matching the ResourceCard layout. */
export function ResourceCardSkeleton() {
  return (
    <li className="list-none">
      <div className="group flex h-full min-h-32 flex-col p-4">
        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
        <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </li>
  );
}

/** Grid of 8 skeleton cards. */
export function ResourcesViewSkeleton() {
  return (
    <ul
      className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      aria-busy="true"
      aria-label="Loading resources"
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <ResourceCardSkeleton key={i} />
      ))}
    </ul>
  );
}