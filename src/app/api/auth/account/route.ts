import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest } from "@/lib/server/auth";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

/** DELETE /api/auth/account — permanently remove the account and all its
 * cloud data (sessions, snapshot and votes cascade). Local browser data is
 * untouched; the client is responsible for communicating that. */
export async function DELETE(request: Request) {
  const rl = rateLimit(clientKey(request, "auth:account"), 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } });
  }
  const account = await accountFromRequest(request);
  if (!account) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    await db.account.delete({ where: { id: account.id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/account]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
