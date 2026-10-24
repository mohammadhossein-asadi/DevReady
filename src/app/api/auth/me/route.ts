import { NextResponse } from "next/server";
import { accountFromRequest } from "@/lib/server/auth";

export async function GET(request: Request) {
  const account = await accountFromRequest(request);
  if (!account) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return NextResponse.json({
    account: { id: account.id, email: account.email, name: account.name },
  });
}
