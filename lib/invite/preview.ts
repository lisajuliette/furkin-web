import { cache } from 'react';
import { headers } from 'next/headers';
import { clientIp, inviteRateLimit } from '@/lib/waitlist/rate-limit';

export type InviteStatus = 'valid' | 'expired' | 'used' | 'revoked' | 'unknown';

export type InvitePreview = {
  status: InviteStatus;
  household_name: string | null;
  inviter_first_name: string | null;
  pet_names: string[];
  role: string | null;
};

function empty(status: InviteStatus): InvitePreview {
  return {
    status,
    household_name: null,
    inviter_first_name: null,
    pet_names: [],
    role: null,
  };
}

function asStatus(value: unknown): InviteStatus {
  if (value === 'valid' || value === 'expired' || value === 'used' || value === 'revoked') return value;
  return 'unknown';
}

async function hostedPreview(code: string): Promise<InvitePreview> {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
  const key = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase is not configured');
  const response = await fetch(`${url}/rest/v1/rpc/public_invite_preview`, {
    method: 'POST',
    headers: {
      apikey: key,
      authorization: `Bearer ${key}`,
      accept: 'application/json',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ p_code: code }),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error(`Invite preview failed (${response.status})`);
  const payload = (await response.json()) as Record<string, unknown> | Array<Record<string, unknown>>;
  const row = Array.isArray(payload) ? payload[0] : payload;
  const status = asStatus(row?.status);
  if (status !== 'valid') return empty(status);
  const pets = Array.isArray(row?.pet_names) ? row.pet_names.filter((name) => typeof name === 'string') : [];
  return {
    status,
    household_name: typeof row?.household_name === 'string' ? row.household_name : null,
    inviter_first_name: typeof row?.inviter_first_name === 'string' ? row.inviter_first_name : null,
    pet_names: pets,
    role: typeof row?.role === 'string' ? row.role : null,
  };
}

export const previewInvite = cache(async (code: string): Promise<InvitePreview> => {
  const headerList = await headers();
  if (inviteRateLimit(clientIp({ headers: headerList })) === 'limited') return empty('unknown');
  const normalized = code.trim().toUpperCase();
  if (!normalized) return empty('unknown');
  return hostedPreview(normalized);
});

export function petList(names: string[]) {
  if (names.length <= 1) return names[0] ?? '';
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  return `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
}

// TODO(question): public_invite_preview returns household_name and role, and the copy has no sentence for either.
export function inviteIsShown(preview: InvitePreview) {
  return preview.status === 'valid' && Boolean(preview.inviter_first_name) && preview.pet_names.length > 0;
}
