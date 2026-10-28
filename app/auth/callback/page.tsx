import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Icon } from '@/components/Icon';
import { auth } from '@/content/en';

function isPhone(userAgent: string) {
  return /iPhone|iPad|iPod|Android/i.test(userAgent);
}

function deepLink(params: Record<string, string | string[] | undefined>) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') query.set(key, value);
    else if (Array.isArray(value)) value.forEach((item) => query.append(key, item));
  }
  const search = query.toString();
  return `furkin://auth/callback${search ? `?${search}` : ''}`;
}

const openScript = `
var root = document.querySelector('[data-open]');
if (root) location.href = root.getAttribute('data-open');
`;

export async function generateMetadata(): Promise<Metadata> {
  const phone = isPhone((await headers()).get('user-agent') ?? '');
  return {
    title: { absolute: phone ? auth.mobileTitle : auth.desktopTitle },
    description: phone ? auth.mobileBody : auth.desktopBody,
    robots: { index: false, follow: false },
  };
}

export default async function AuthCallbackPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const phone = isPhone((await headers()).get('user-agent') ?? '');
  const link = deepLink(await searchParams);

  if (!phone) {
    return (
      <main className="ws-simple__main">
        <div className="ws-panel">
          <span className="ws-tile ws-tile--primary" aria-hidden="true">
            <Icon name="link" size={28} />
          </span>
          <h1 className="ws-h2 ws-h2--panel">{auth.desktopTitle}</h1>
          <p className="ws-p">{auth.desktopBody}</p>
          <div className="fk-card fk-card--info">
            <Icon name="info" size={22} />
            <p className="fk-card__sub">{auth.desktopNote}</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="ws-simple__main" data-open={link}>
      <div className="ws-panel" style={{ alignItems: 'center', textAlign: 'center' }}>
        <span className="fk-dots" aria-hidden="true" style={{ color: 'var(--action)' }}>
          <i />
          <i />
          <i />
        </span>
        <h1 className="ws-h2 ws-h2--panel">{auth.mobileTitle}</h1>
        <p className="ws-p">{auth.mobileBody}</p>
        <a className="fk-btn fk-btn--primary" href={link} style={{ alignSelf: 'stretch' }}>
          {auth.mobileButton}
        </a>
        <p className="ws-small">{auth.mobileNoApp}</p>
      </div>
      <script dangerouslySetInnerHTML={{ __html: openScript }} />
    </main>
  );
}
