import { createHash, randomBytes } from 'node:crypto';
import { z } from 'zod';
import { sendConfirmation } from '@/lib/waitlist/email';
import { clientIp, rateLimit } from '@/lib/waitlist/rate-limit';
import { waitlistStore } from '@/lib/waitlist/store';

const emailSchema = z.string().trim().pipe(z.email());

export type WaitlistResponse =
  | { status: 'sent' }
  | { status: 'invalid' }
  | { status: 'limited' };

function tokenPair() {
  const token = randomBytes(32).toString('base64url');
  const hash = createHash('sha256').update(token).digest('hex');
  return { token, hash };
}

function confirmUrl(request: Request, token: string) {
  const requestOrigin = new URL(request.url).origin;
  const local = requestOrigin.includes('localhost') || requestOrigin.includes('127.0.0.1');
  const base = local ? requestOrigin : (process.env.NEXT_PUBLIC_SITE_URL || requestOrigin);
  return `${base}/waitlist/confirm?token=${encodeURIComponent(token)}`;
}

export async function submitWaitlist(request: Request, form: FormData): Promise<WaitlistResponse> {
  if (rateLimit(clientIp(request)) === 'limited') return { status: 'limited' };

  const company = String(form.get('company') ?? '').trim();
  if (company) return { status: 'sent' };

  const parsed = emailSchema.safeParse(form.get('email'));
  if (!parsed.success) return { status: 'invalid' };
  const email = parsed.data;

  const sourceRaw = String(form.get('source') ?? '').trim();
  const source = sourceRaw ? sourceRaw.slice(0, 200) : null;
  const { token, hash } = tokenPair();
  const claim = await waitlistStore().claim({ email, confirm_token_hash: hash, source });
  if (claim === 'skip') return { status: 'sent' };

  await sendConfirmation(email, confirmUrl(request, token));
  return { status: 'sent' };
}

export async function confirmWaitlistToken(token: string) {
  const hash = createHash('sha256').update(token).digest('hex');
  return waitlistStore().confirmByHash(hash);
}
