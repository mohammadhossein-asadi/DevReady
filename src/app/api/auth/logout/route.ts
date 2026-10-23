import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest, hashToken } from "@/lib/server/auth";

export async function POST(request: Request) {
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
