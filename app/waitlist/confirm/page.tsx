import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { waitlist } from '@/content/en';
import { confirmWaitlistToken } from '@/lib/waitlist/submit';

const signUpAgain = 'Sign up again';

function tokenFrom(params: { token?: string | string[] }) {
  return typeof params.token === 'string' ? params.token : '';
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}): Promise<Metadata> {
  const token = tokenFrom(await searchParams);
  const result = token ? await confirmWaitlistToken(token) : 'unknown';
  const confirmed = result === 'confirmed' || result === 'already';
  const expiredTitle = waitlist.confirmExpired.split(signUpAgain)[0].trim();
  return {
    title: { absolute: confirmed ? waitlist.confirmTitle : expiredTitle },
    description: confirmed ? waitlist.confirmBody : waitlist.confirmExpired,
    robots: { index: false, follow: false },
  };
}

export default async function ConfirmPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string | string[] }>;
}) {
  const token = tokenFrom(await searchParams);
  const result = token ? await confirmWaitlistToken(token) : 'unknown';
  const confirmed = result === 'confirmed' || result === 'already';
  const [before, after] = waitlist.confirmExpired.split(signUpAgain);

  return (
    <main className="ws-simple__main">
      <div className="ws-panel" style={{ alignItems: 'center', textAlign: 'center' }}>
        {confirmed ? (
          <>
            <span className="ws-tile ws-confirm__mark" aria-hidden="true">
              <Icon name="check" size={36} />
            </span>
            <h1 className="ws-h2">{waitlist.confirmTitle}</h1>
            <p className="ws-p">{waitlist.confirmBody}</p>
          </>
        ) : (
          <h1 className="ws-h2">{before.trim()}</h1>
        )}
        <Link className="fk-btn fk-btn--secondary" href="/">
          {waitlist.confirmBack}
        </Link>
        <p className="ws-small">
          {confirmed ? before : null}
          <Link href="/#get">{signUpAgain}</Link>
          {after}
        </p>
      </div>
    </main>
  );
}
