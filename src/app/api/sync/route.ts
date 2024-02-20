import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest } from "@/lib/server/auth";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

const MAX_PAYLOAD_CHARS = 2_000_000; // ~2 MB of JSON — far above real usage.

/** Conflict strategy: "server-wins" | "client-wins" | "merge" */
type ConflictStrategy = "server-wins" | "client-wins" | "merge";

interface SyncSnapshot {
  library?: Record<string, { status: "doing" | "done"; updatedAt: number }>;
  srs?: Record<string, { due: string; interval: number; ease: number; reps: number; lapses: number; addedAt: string; lastReviewedAt?: string; lastGrade?: "again" | "hard" | "good" | "easy" }>;
  daily?: { currentStreak: number; longestStreak: number; lastCompletedAt: number | null };
  version: number;
}

function deepMerge<T extends Record<string, unknown>>(server: T, client: T, strategy: ConflictStrategy = "merge"): T {
  if (strategy === "server-wins") return server;
  if (strategy === "client-wins") return client;

  // Merge strategy: for each key, keep the more recent update
  const result: T = { ...server };
  for (const [key, clientValue] of Object.entries(client)) {
    const serverValue = server[key];
    if (!serverValue) {
      result[key] = clientValue;
      continue;
    }
    // Both have values - compare timestamps
    const serverTime = (serverValue as Record<string, unknown>).updatedAt as number | undefined;
    const clientTime = (clientValue as Record<string, unknown>).updatedAt as number | undefined;
    if (serverTime && clientTime) {
      result[key] = clientTime > serverTime ? clientValue : serverValue;
    } else if (clientTime) {
      result[key] = clientValue;
    }
  }
  return result;
}

/** GET /api/sync — the account's cloud snapshot (null when never synced). */
export async function GET(request: Request) {
  const account = await accountFromRequest(request);
  if (!account) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const snapshot = await db.snapshot.findUnique({
    where: { accountId: account.id },
  });
  return NextResponse.json({
    payload: snapshot ? JSON.parse(snapshot.payload) : null,
    device: snapshot?.device ?? null,
    updatedAt: snapshot ? snapshot.updatedAt.getTime() : null,
  });
}

/** PUT /api/sync — store this device's payload as the cloud snapshot with conflict resolution. */
export async function PUT(request: Request) {
  const rl = rateLimit(clientKey(request, "sync:put"), 30, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const account = await accountFromRequest(request);
  if (!account) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }
  const { payload, device, strategy = "merge" } = (body ?? {}) as {
    payload?: unknown;
    device?: unknown;
    strategy?: ConflictStrategy;
  };
  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const clientPayload = payload as SyncSnapshot;

  // Get existing server snapshot
  const existingSnapshot = await db.snapshot.findUnique({
    where: { accountId: account.id },
  });

  let mergedPayload = clientPayload;

  if (existingSnapshot) {
    try {
      const serverPayload = JSON.parse(existingSnapshot.payload) as SyncSnapshot;
      // Merge library
      if (clientPayload.library || serverPayload.library) {
        mergedPayload = {
          ...mergedPayload,
          library: deepMerge(serverPayload.library ?? {}, clientPayload.library ?? {}, strategy),
        };
      }
      // Merge SRS
      if (clientPayload.srs || serverPayload.srs) {
        mergedPayload = {
          ...mergedPayload,
          srs: deepMerge(serverPayload.srs ?? {}, clientPayload.srs ?? {}, strategy),
        };
      }
      // Merge daily - keep max streaks
      if (clientPayload.daily || serverPayload.daily) {
        const sd = serverPayload.daily ?? { currentStreak: 0, longestStreak: 0, lastCompletedAt: null };
        const cd = clientPayload.daily ?? { currentStreak: 0, longestStreak: 0, lastCompletedAt: null };
        mergedPayload = {
          ...mergedPayload,
          daily: {
            currentStreak: Math.max(sd.currentStreak, cd.currentStreak),
            longestStreak: Math.max(sd.longestStreak, cd.longestStreak),
            lastCompletedAt: Math.max(sd.lastCompletedAt ?? 0, cd.lastCompletedAt ?? 0) || null,
          },
        };
      }
      // Version bump
      mergedPayload.version = (serverPayload.version ?? 0) + 1;
    } catch {
      // If merge fails, fall back to client-wins
      mergedPayload = { ...clientPayload, version: (clientPayload.version ?? 0) + 1 };
    }
  } else {
    mergedPayload = { ...clientPayload, version: 1 };
  }

  const serialized = JSON.stringify(mergedPayload);
  if (serialized.length > MAX_PAYLOAD_CHARS) {
    return NextResponse.json({ error: "payload_too_large" }, { status: 413 });
  }

  const deviceLabel =
    typeof device === "string" && device.trim() ? device.trim().slice(0, 80) : null;

  const data = { payload: serialized, device: deviceLabel };
  const snapshot = await db.snapshot.upsert({
    where: { accountId: account.id },
    update: data,
    create: { accountId: account.id, ...data },
  });
  return NextResponse.json({ updatedAt: snapshot.updatedAt.getTime(), version: mergedPayload.version });
}

/** DELETE /api/sync — clear the cloud snapshot (account stays). */
export async function DELETE(request: Request) {
  const account = await accountFromRequest(request);
  if (!account) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  await db.snapshot.deleteMany({ where: { accountId: account.id } });
  return NextResponse.json({ ok: true });
}
