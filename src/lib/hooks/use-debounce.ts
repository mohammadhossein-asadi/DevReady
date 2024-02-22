"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Debounced value hook — delays updating the returned value until
 * `delayMs` of inactivity have passed.
 */
export function useDebounce<T>(value: T, delayMs: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
}

/**
 * Debounced callback hook — returns a stable function that only fires
 * after `delayMs` of inactivity. Useful for search inputs, resize handlers, etc.
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delayMs: number
): T {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const debouncedFn = useCallback(
    ((...args: unknown[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delayMs);
    }) as T,
    [delayMs]
  );

  // Cleanup on unmount
  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  return debouncedFn;
}

/**
 * Hook for debounced search with loading state.
 * Returns { debouncedQuery, isSearching, setQuery }
 */
export function useDebouncedSearch(initialQuery = "", delayMs = 300) {
  const [query, setQuery] = useState(initialQuery);
  const [isSearching, setIsSearching] = useState(false);
  const debouncedQuery = useDebounce(query, delayMs);

  useEffect(() => {
    const timer = setTimeout(() => setIsSearching(false), delayMs);
    setIsSearching(true);
    return () => clearTimeout(timer);
  }, [query, delayMs]);

  return { debouncedQuery, isSearching, setQuery };
}