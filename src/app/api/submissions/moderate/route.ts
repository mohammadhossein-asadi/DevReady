import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest } from "@/lib/server/auth";

export async function POST(request: Request) {
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