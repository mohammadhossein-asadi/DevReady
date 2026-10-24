import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import {
  hashPassword,
  newToken,
  hashToken,
  toSafeAccount,
  validateCredentials,
  pruneExpiredSessions,
  SESSION_DAYS,
} from "@/lib/server/auth";
import { rateLimit, clientKey } from "@/lib/server/rate-limit";

export async function POST(request: Request) {
  const rl = rateLimit(clientKey(request, "auth:register"), 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": String(Math.ceil((rl.resetAt - Date.now()) / 1000)) } });
  }
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  const { email, password, name } = (body ?? {}) as {
    email?: unknown;
    password?: unknown;
    name?: unknown;
  };

  const checked = validateCredentials(email, password, name);
  if ("errors" in checked) {
    return NextResponse.json(
      { error: "invalid_fields", fields: checked.errors },
      { status: 400 }
    );
  }

  try {
    const existing = await db.account.findUnique({ where: { email: checked.email } });
    if (existing) {
      return NextResponse.json(
        { error: "invalid_fields", fields: { email: "email_taken" } },
        { status: 409 }
      );
    }

    const account = await db.account.create({
      data: {
        email: checked.email,
        name: checked.name ?? null,
        passwordHash: await hashPassword(checked.password),
      },
    });

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
    console.error("[auth/register]", err);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
