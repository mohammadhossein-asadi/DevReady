// Simple in-memory fixed-window rate limiter keyed by (bucket, key).
// Suitable for single-instance / demo scale; swap for Redis in prod.
type Bucket = { count: number; resetAt: number };
const store = new Map<string, Bucket>();

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const b = store.get(key);
  if (!b || now >= b.resetAt) {
    const nb: Bucket = { count: 1, resetAt: now + windowMs };
    store.set(key, nb);
    return { ok: true, remaining: limit - 1, resetAt: nb.resetAt };
  }
  if (b.count >= limit) {
    return { ok: false, remaining: 0, resetAt: b.resetAt };
  }
  b.count += 1;
  return { ok: true, remaining: limit - b.count, resetAt: b.resetAt };
}

export function clientKey(req: Request, prefix: string): string {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  return `${prefix}:${ip}`;
}