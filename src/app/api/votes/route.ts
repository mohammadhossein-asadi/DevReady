import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest } from "@/lib/server/auth";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

const LEVELS = new Set(["easy", "medium", "hard"]);
const MAX_KEY_CHARS = 512;

/** Aggregate shape: { [resourceKey]: { easy, medium, hard, total } }. */
async function aggregateFor(keys?: string[]) {
  const where = keys && keys.length > 0 ? { key: { in: keys } } : undefined;
  const votes = await db.vote.groupBy({
    by: ["key", "level"],
    where,
    _count: { _all: true },
  });
  const aggregates: Record<string, { easy: number; medium: number; hard: number; total: number }> = {};
  for (const row of votes) {
    const entry = (aggregates[row.key] ??= { easy: 0, medium: 0, hard: 0, total: 0 });
    if (LEVELS.has(row.level)) {
      entry[row.level as "easy" | "medium" | "hard"] = row._count._all;
      entry.total += row._count._all;
    }
  }
  return aggregates;
}

/** GET /api/votes — public community aggregates (optionally filtered). */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const keysParam = url.searchParams.get("keys");
    const keys = keysParam
      ? keysParam.split("|").map((k) => k.trim()).filter(Boolean).slice(0, 500)
      : undefined;
    return NextResponse.json({ aggregates: await aggregateFor(keys) });
  } catch (err) {
    console.error("[votes GET]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

/** PUT /api/votes — cast, change or clear (level: null) the signed-in user's
 * vote for one resource key. Returns the fresh aggregate for that key. */
export async function PUT(request: Request) {
  const rl = rateLimit(clientKey(request, "votes:put"), 60, 60_000);
  if (!rl.ok) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  const account = await accountFromRequest(request);
  if (!account) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_vote" }, { status: 400 });
  }
  const { key, level } = (body ?? {}) as { key?: unknown; level?: unknown };
  if (typeof key !== "string" || !key.trim() || key.length > MAX_KEY_CHARS) {
    return NextResponse.json({ error: "invalid_vote" }, { status: 400 });
  }

  try {
    if (level === null) {
      await db.vote.deleteMany({
        where: { accountId: account.id, key: key.trim() },
      });
    } else if (typeof level === "string" && LEVELS.has(level)) {
      await db.vote.upsert({
        where: { accountId_key: { accountId: account.id, key: key.trim() } },
        update: { level },
        create: { accountId: account.id, key: key.trim(), level },
      });
    } else {
      return NextResponse.json({ error: "invalid_vote" }, { status: 400 });
    }
    const aggregates = await aggregateFor([key.trim()]);
    return NextResponse.json({ ok: true, aggregate: aggregates[key.trim()] ?? null });
  } catch (err) {
    console.error("[votes PUT]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
