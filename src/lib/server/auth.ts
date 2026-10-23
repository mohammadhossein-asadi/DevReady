import { promisify } from "util";
import {
  scrypt as scryptCb,
  randomBytes,
  createHash,
  timingSafeEqual,
} from "crypto";
import { db } from "@/lib/db";

/**
 * Server-side auth helpers for DevReady's optional accounts.
 * - Passwords: scrypt with a per-user random salt, stored as `salt:hash` hex —
 *   no plaintext, no reversible encoding.
 * - Sessions: 256-bit random bearer tokens; only their SHA-256 hash is
 *   persisted, so a database leak never leaks usable credentials.
 */

const scrypt = promisify(scryptCb) as (
  password: string,
  salt: string,
  keylen: number
) => Promise<Buffer>;

const KEYLEN = 64;
export const SESSION_DAYS = 30;

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = await scrypt(password, salt, KEYLEN);
  return `${salt}:${derived.toString("hex")}`;
}

export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = await scrypt(password, salt, KEYLEN);
  const expected = Buffer.from(hash, "hex");
  if (expected.length !== derived.length) return false;
  return timingSafeEqual(derived, expected);
}

export function newToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export type SafeAccount = {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
};

export function toSafeAccount(account: {
  id: string;
  email: string;
  name: string | null;
  createdAt: Date;
}): SafeAccount {
  return {
    id: account.id,
    email: account.email,
    name: account.name,
    createdAt: account.createdAt.toISOString(),
  };
}

/** Resolve the Bearer token to a live account, or null. */
export async function accountFromRequest(
  request: Request
): Promise<{ id: string; email: string; name: string | null } | null> {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  if (!match) return null;

  const tokenHash = hashToken(match[1].trim());
  const session = await db.session.findUnique({
    where: { tokenHash },
    include: { account: true },
  });
  if (!session) return null;
  if (session.expiresAt.getTime() < Date.now()) {
    // Expired — clean up lazily.
    await db.session.delete({ where: { id: session.id } }).catch(() => {});
    return null;
  }
  return {
    id: session.account.id,
    email: session.account.email,
    name: session.account.name,
  };
}

/** Lightweight session GC — cheap on SQLite, keeps the table tidy. */
export async function pruneExpiredSessions(): Promise<void> {
  await db.session
    .deleteMany({ where: { expiresAt: { lt: new Date() } } })
    .catch(() => {});
}

// ---- shared input validation ------------------------------------------------

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type FieldErrors = Record<string, string>;

export function validateCredentials(
  email: unknown,
  password: unknown,
  name?: unknown
): { email: string; password: string; name?: string } | { errors: FieldErrors } {
  const errors: FieldErrors = {};
  const cleanEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const cleanName = typeof name === "string" ? name.trim() : "";
  const cleanPassword = typeof password === "string" ? password : "";

  if (!cleanEmail || !EMAIL_RE.test(cleanEmail) || cleanEmail.length > 254) {
    errors.email = "invalid_email";
  }
  if (cleanPassword.length < 8 || cleanPassword.length > 200) {
    errors.password = "weak_password";
  }
  if (cleanName.length > 80) {
    errors.name = "name_too_long";
  }
  if (Object.keys(errors).length > 0) return { errors };
  return {
    email: cleanEmail,
    password: cleanPassword,
    ...(cleanName ? { name: cleanName } : {}),
  };
}
