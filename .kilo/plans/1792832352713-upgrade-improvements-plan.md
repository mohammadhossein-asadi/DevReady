# DevReady Phase 8+ Upgrade & Improvements Plan

## Goal
Harden, scale, and complete DevReady: realtime community signals, contribution moderation, PWA offline, quality/tests, and observability.

## Current State
- Phases 1–7 shipped; 32 categories / 636 resources; accounts, sync, SRS, votes, contributions (local+export), daily, notes.
- Partial: in-memory rate limiter, security headers, error boundary, PWA manifest+SW, submissions API, SSE stream endpoint.
- Gaps: no DB migration for Submission, no moderation UI, no realtime client, no offline caching strategy, no tests/CI.

## Scope (ordered)
1. DB & API hardening
   - Run `prisma db push` for Submission model; add `ModerationLog`.
   - Add rate limiting to `/api/sync`, `/api/votes`, `/api/submissions`.
   - Add input sanitization + URL validation server-side.
   - Add pagination/filter to submissions GET.
2. Community queue UI
   - New view `#/community` listing submissions with status filters.
   - Submit form reuses contribute view; writes to API when signed in, falls back to local.
   - Moderation actions (approve/reject) gated by admin flag on Account.
3. Realtime signals
   - Client subscribes to `/api/votes/stream` (SSE) with auto-reconnect; refetch aggregates on event.
   - Replace 25s ping with vote-change broadcast (in-memory pub/sub per process).
4. PWA offline
   - Precache app shell + catalog JSON; runtime cache for fonts/images.
   - Offline fallback page; background sync for queued submissions/votes.
5. Quality & DX
   - Add Vitest + Playwright; unit tests for sync-merge, SRS scheduler, rate limiter.
   - E2E smoke for auth, vote, contribute, daily.
   - GitHub Actions CI (lint, typecheck, test, build).
6. Observability
   - Structured logging, error reporting hook, health endpoint `/api/health`.

## Data Flow
- Submissions: client POST → API persists → SSE broadcast → community list refetch.
- Votes: client PUT → API upsert → broadcast aggregate → clients update.
- Offline: SW caches; queued mutations replay on reconnect.

## Failure Modes
- SSE disconnect → client reconnect with backoff; fall back to polling (30s).
- DB unavailable → API returns 503; client keeps local state.
- Rate limit exceeded → 429 with Retry-After.

## Migration
- `prisma db push` (additive only); existing data untouched.
- Feature flags via env: `COMMUNITY_ENABLED`, `REALTIME_ENABLED`.

## Validation
- lint + tsc clean; unit tests pass; E2E smoke green; Lighthouse PWA score ≥ 90.

## Open Questions
- Admin role storage: add `role` column to Account vs separate Admin table? (Recommend: `role String @default("user")`.)
- Realtime transport: SSE vs WebSocket? (Recommend: SSE for simplicity; upgrade to WS only if bidirectional needed.)