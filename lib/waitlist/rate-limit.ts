const windowMs = 60 * 60 * 1000;
const limit = 5;
const hits = new Map<string, number[]>();

// TODO(question): the docs say 5 signups per IP per hour and do not name a shared store.
// This counter lives in the server process.
export function rateLimit(ip: string): 'ok' | 'limited' {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((at) => now - at < windowMs);
  if (recent.length >= limit) {
    hits.set(ip, recent);
    return 'limited';
  }
  recent.push(now);
  hits.set(ip, recent);
  return 'ok';
}

export function clientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const first = forwarded?.split(',')[0]?.trim();
  if (first) return first;
  return request.headers.get('x-real-ip')?.trim() || 'unknown';
}
