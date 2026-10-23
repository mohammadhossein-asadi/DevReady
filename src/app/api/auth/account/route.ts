import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest } from "@/lib/server/auth";

/** DELETE /api/auth/account — permanently remove the account and all its
 * cloud data (sessions, snapshot and votes cascade). Local browser data is
 * untouched; the client is responsible for communicating that. */
export async function DELETE(request: Request) {
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
