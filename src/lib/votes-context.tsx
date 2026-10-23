"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useAuth } from "@/lib/auth-context";

/**
 * Phase 5 — difficulty voting.
 *
 * Local-first: every visitor can rate a resource easy/medium/hard; the vote
 * lives in localStorage (`devready:votes:v1`) and syncs with the other stores
 * when an account is connected. Community aggregates come from the public
 * `/api/votes` endpoint — only signed-in votes are mirrored there, which keeps
 * anonymous spam out without gating the core experience.
 */

export type VoteLevel = "easy" | "medium" | "hard";

export interface VoteEntry {
  level: VoteLevel;
  updatedAt: number;
}

export interface VoteAggregate {
  easy: number;
  medium: number;
  hard: number;
  total: number;
}

interface VotesData {
  v: 1;
  votes: Record<string, VoteEntry>;
}

const STORAGE_KEY = "devready:votes:v1";
const VOTES_EVENT = "devready:votes-change";

const EMPTY: VotesData = { v: 1, votes: {} };

/** A consensus is shown once a resource has this many community votes. */
export const CONSENSUS_MIN_TOTAL = 3;

function parse(raw: string | null): VotesData {
  if (!raw) return EMPTY;
  try {
    const data = JSON.parse(raw) as Partial<VotesData>;
    if (data.v !== 1 || typeof data.votes !== "object" || data.votes === null) {
      return EMPTY;
    }
    const votes: Record<string, VoteEntry> = {};
    for (const [key, entry] of Object.entries(data.votes)) {
      if (
        entry &&
        typeof entry === "object" &&
        ((entry as VoteEntry).level === "easy" ||
          (entry as VoteEntry).level === "medium" ||
          (entry as VoteEntry).level === "hard") &&
        typeof (entry as VoteEntry).updatedAt === "number"
      ) {
        votes[key] = entry as VoteEntry;
      }
    }
    return { v: 1, votes };
  } catch {
    return EMPTY;
  }
}

let cache: { raw: string | null; data: VotesData } = {
  raw: undefined as never,
  data: EMPTY,
};

function readData(): VotesData {
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return EMPTY;
  }
  if (cache.raw === raw) return cache.data;
  cache = { raw, data: parse(raw) };
  return cache.data;
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(VOTES_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(VOTES_EVENT, onChange);
  };
}

function getSnapshot(): VotesData {
  return readData();
}

function getServerSnapshot(): VotesData {
  return EMPTY;
}

function writeData(next: VotesData) {
  cache = { raw: JSON.stringify(next), data: next };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable — in-session state keeps working.
  }
  window.dispatchEvent(new Event(VOTES_EVENT));
}

export interface VotesContextValue {
  data: VotesData;
  /** The signed-in user's vote for a key (only local votes, incl. anonymous). */
  voteOf: (key: string) => VoteLevel | null;
  /** Cast, change or clear (level null) a vote. Mirrors to the cloud when signed in. */
  setVote: (key: string, level: VoteLevel | null) => void;
  /** Community aggregates by resource key (server data). */
  aggregateOf: (key: string) => VoteAggregate | null;
  /** Plurality level once total ≥ CONSENSUS_MIN_TOTAL, else null. */
  consensusOf: (key: string) => { level: VoteLevel; total: number } | null;
  totalVotesCast: number;
  /** True while the aggregates are being (re)fetched. */
  loading: boolean;
  refreshAggregates: () => Promise<void>;
}

const VotesContext = createContext<VotesContextValue | null>(null);

export function VotesProvider({ children }: { children: ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { isSignedIn, putVote } = useAuth();
  const [aggregates, setAggregates] = useState<Record<string, VoteAggregate>>({});
  const [loading, setLoading] = useState(false);

  const refreshAggregates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/votes");
      if (res.ok) {
        const body = (await res.json()) as { aggregates: Record<string, VoteAggregate> };
        setAggregates(body.aggregates ?? {});
      }
    } catch {
      // Offline — keep the last known aggregates.
    } finally {
      setLoading(false);
    }
  }, []);

  // Load aggregates on mount and whenever auth state flips (a signed-in vote
  // changes the community numbers). Also refetch when the tab regains
  // visibility so multi-device votes show up without a manual reload.
  useEffect(() => {
    void refreshAggregates();
  }, [refreshAggregates, isSignedIn]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") void refreshAggregates();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => document.removeEventListener("visibilitychange", onVisible);
  }, [refreshAggregates]);

  const setVote = useCallback(
    (key: string, level: VoteLevel | null) => {
      const current = readData();
      const votes = { ...current.votes };
      if (level) {
        votes[key] = { level, updatedAt: Date.now() };
      } else {
        delete votes[key];
      }
      writeData({ v: 1, votes });

      // Mirror to the community tally when there is an account to vouch for it.
      if (isSignedIn) {
        void putVote(key, level).then((ok) => {
          if (ok) void refreshAggregates();
        });
      }
    },
    [isSignedIn, putVote, refreshAggregates]
  );

  const value = useMemo<VotesContextValue>(() => {
    const aggregateOf = (key: string): VoteAggregate | null => aggregates[key] ?? null;
    const consensusOf = (key: string) => {
      const agg = aggregates[key];
      if (!agg || agg.total < CONSENSUS_MIN_TOTAL) return null;
      const max = Math.max(agg.easy, agg.medium, agg.hard);
      if (max <= 0) return null;
      const winners: VoteLevel[] = [];
      if (agg.easy === max) winners.push("easy");
      if (agg.medium === max) winners.push("medium");
      if (agg.hard === max) winners.push("hard");
      if (winners.length !== 1) return null; // tied — no honest consensus
      return { level: winners[0], total: agg.total };
    };
    return {
      data,
      voteOf: (key) => data.votes[key]?.level ?? null,
      setVote,
      aggregateOf,
      consensusOf,
      totalVotesCast: Object.keys(data.votes).length,
      loading,
      refreshAggregates,
    };
  }, [data, setVote, aggregates, loading, refreshAggregates]);

  return <VotesContext.Provider value={value}>{children}</VotesContext.Provider>;
}

export function useVotes(): VotesContextValue {
  const ctx = useContext(VotesContext);
  if (!ctx) {
    throw new Error("useVotes must be used within <VotesProvider>");
  }
  return ctx;
}
