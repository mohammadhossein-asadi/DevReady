import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { accountFromRequest } from "@/lib/server/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const category = url.searchParams.get("category");
  const take = Math.min(Number(url.searchParams.get("take") ?? 50), 100);
  const skip = Number(url.searchParams.get("skip") ?? 0);
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (category) where.categoryId = category;
  const rows = await db.submission.findMany({ where, orderBy: { createdAt: "desc" }, take, skip });
  return NextResponse.json({ submissions: rows });
}

export async function POST(request: Request) {
  let body: unknown;
  try { body = await request.json(); } catch {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  const b = (body ?? {}) as Record<string, unknown>;
  const title = typeof b.title === "string" ? b.title.trim() : "";
  const url = typeof b.url === "string" ? b.url.trim() : "";
  const categoryId = typeof b.categoryId === "string" ? b.categoryId : "";
  const language = typeof b.language === "string" ? b.language : "en";
  const kind = typeof b.kind === "string" ? b.kind : "article";
  const desc = typeof b.desc === "string" ? b.desc.trim() : "";
  const author = typeof b.author === "string" ? b.author.trim() : null;
  const level = typeof b.level === "string" ? b.level : null;
  if (!title || !url || !categoryId || desc.length < 20) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }
  let accountId: string | null = null;
  try { const a = await accountFromRequest(request); accountId = a?.id ?? null; } catch { accountId = null; }
  const row = await db.submission.create({ data: { accountId, title, url, categoryId, language, kind, level, desc, author } });
  return NextResponse.json({ submission: row });
}