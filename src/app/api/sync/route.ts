import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest } from "@/lib/server/auth";

const MAX_PAYLOAD_CHARS = 2_000_000; // ~2 MB of JSON — far above real usage.

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

/** PUT /api/sync — store this device's payload as the cloud snapshot. */
export async function PUT(request: Request) {
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
  const { payload, device } = (body ?? {}) as {
    payload?: unknown;
    device?: unknown;
  };
  if (typeof payload !== "object" || payload === null) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }
  const serialized = JSON.stringify(payload);
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
  return NextResponse.json({ updatedAt: snapshot.updatedAt.getTime() });
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
