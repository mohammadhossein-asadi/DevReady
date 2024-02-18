import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest } from "@/lib/server/auth";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const rl = rateLimit(clientKey(request, "submissions:moderate"), 30, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } });
  }
  const account = await accountFromRequest(request);
  if (!account || (account as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  const { id, status } = (body ?? {}) as { id?: string; status?: string };
  if (!id || !status || !["queued", "approved", "rejected"].includes(status)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }
  const row = await db.submission.update({ where: { id }, data: { status } });
  return NextResponse.json({ submission: row });
}