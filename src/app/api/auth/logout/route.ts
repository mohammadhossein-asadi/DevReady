import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest, hashToken } from "@/lib/server/auth";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const rl = rateLimit(clientKey(request, "auth:logout"), 20, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } });
  }
  const account = await accountFromRequest(request);
  if (!account) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const header = request.headers.get("authorization") ?? "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  try {
    await db.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  } catch (err) {
    console.error("[auth/logout]", err);
  }
  return NextResponse.json({ ok: true });
}
