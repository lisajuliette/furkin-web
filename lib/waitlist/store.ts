export type WaitlistRow = {
  email: string;
  confirm_token_hash: string;
  confirmed_at: string | null;
  source: string | null;
  created_at: string;
};

export type ConfirmResult = 'confirmed' | 'already' | 'unknown';

type NewRow = {
  email: string;
  confirm_token_hash: string;
  source: string | null;
};

export type WaitlistStore = {
  findByEmail(email: string): Promise<WaitlistRow | null>;
  insert(row: NewRow): Promise<void>;
  replaceToken(email: string, confirmTokenHash: string, source?: string | null): Promise<boolean>;
  confirmByHash(confirmTokenHash: string): Promise<ConfirmResult>;
  claim(row: NewRow): Promise<'send' | 'skip'>;
};

class WaitlistRequestError extends Error {
  constructor(readonly status: number) {
    super(`Waitlist request failed (${status})`);
  }
}

function supabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: url.replace(/\/$/, ''), key };
}

async function supabaseFetch(pathname: string, init: RequestInit = {}) {
  const config = supabaseConfig();
  if (!config) throw new Error('Supabase service role is not configured');
  const headers = new Headers(init.headers);
  headers.set('apikey', config.key);
  headers.set('authorization', `Bearer ${config.key}`);
  headers.set('accept', 'application/json');
  headers.set('accept-profile', 'public');
  headers.set('content-profile', 'public');
  if (init.body) headers.set('content-type', 'application/json');
  headers.set('prefer', 'return=representation');
  const response = await fetch(`${config.url}/rest/v1/${pathname}`, { ...init, headers });
  if (!response.ok) throw new WaitlistRequestError(response.status);
  if (response.status === 204) return [] as WaitlistRow[];
  return (await response.json()) as WaitlistRow[];
}

function supabaseStore(): WaitlistStore {
  return {
    async findByEmail(email) {
      const rows = await supabaseFetch(`waitlist?email=eq.${encodeURIComponent(email)}&select=*`);
      return rows[0] ?? null;
    },
    async insert(row) {
      await supabaseFetch('waitlist', {
        method: 'POST',
        body: JSON.stringify({
          email: row.email,
          confirm_token_hash: row.confirm_token_hash,
          source: row.source,
        }),
      });
    },
    async replaceToken(email, confirmTokenHash, source) {
      const patch: { confirm_token_hash: string; source?: string } = { confirm_token_hash: confirmTokenHash };
      if (source) patch.source = source;
      const updated = await supabaseFetch(
        `waitlist?email=eq.${encodeURIComponent(email)}&confirmed_at=is.null`,
        { method: 'PATCH', body: JSON.stringify(patch) },
      );
      return updated.length > 0;
    },
    async confirmByHash(confirmTokenHash) {
      const updated = await supabaseFetch(
        `waitlist?confirm_token_hash=eq.${encodeURIComponent(confirmTokenHash)}&confirmed_at=is.null`,
        { method: 'PATCH', body: JSON.stringify({ confirmed_at: new Date().toISOString() }) },
      );
      if (updated.length > 0) return 'confirmed';
      const existing = await supabaseFetch(
        `waitlist?confirm_token_hash=eq.${encodeURIComponent(confirmTokenHash)}&select=confirmed_at`,
      );
      return existing[0]?.confirmed_at ? 'already' : 'unknown';
    },
    async claim(row) {
      const existing = await this.findByEmail(row.email);
      if (existing?.confirmed_at) return 'skip';
      if (existing) {
        const replaced = await this.replaceToken(row.email, row.confirm_token_hash, row.source);
        return replaced ? 'send' : 'skip';
      }
      try {
        await this.insert(row);
        return 'send';
      } catch (error) {
        if (!(error instanceof WaitlistRequestError) || error.status !== 409) throw error;
        const again = await this.findByEmail(row.email);
        if (again?.confirmed_at) return 'skip';
        if (!again) throw error;
        const replaced = await this.replaceToken(row.email, row.confirm_token_hash, row.source);
        return replaced ? 'send' : 'skip';
      }
    },
  };
}

export function waitlistStore(): WaitlistStore {
  return supabaseStore();
}
