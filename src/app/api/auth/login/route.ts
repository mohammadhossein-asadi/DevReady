import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  verifyPassword,
  newToken,
  hashToken,
  toSafeAccount,
  pruneExpiredSessions,
  SESSION_DAYS,
} from "@/lib/server/auth";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const rl = rateLimit(clientKey(request, "auth:login"), 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 400 });
  }
  const { email, password } = (body ?? {}) as {
    email?: unknown;
    password?: unknown;
  };
  if (typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "invalid_credentials" }, { status: 400 });
  }

  try {
    const account = await db.account.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    // Same generic response for unknown email and wrong password.
    if (!account || !(await verifyPassword(password, account.passwordHash))) {
      return NextResponse.json({ error: "invalid_credentials" }, { status: 401 });
    }

    const token = newToken();
    await db.session.create({
      data: {
        tokenHash: hashToken(token),
        accountId: account.id,
        expiresAt: new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000),
      },
    });
    pruneExpiredSessions();

    return NextResponse.json({ token, account: toSafeAccount(account) });
  } catch (err) {
    console.error("[auth/login]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
