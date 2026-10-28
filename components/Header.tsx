import Link from 'next/link';
import { nav } from '@/content/en';
import { launchState } from '@/lib/launch';
import { Logo } from '@/components/Logo';

export function Header() {
  const live = launchState() === 'live';

  return (
    <header className="ws-header">
      <div className="ws-wrap ws-header__in">
        <Logo />
        <nav className="ws-nav" aria-label="Main">
          <Link href="/#how">{nav.how}</Link>
          <Link href="/#features">{nav.features}</Link>
          {/* Support arrives in a later milestone. Prefetching it 404s. */}
          <Link href="/support" prefetch={false}>
            {nav.support}
          </Link>
        </nav>
        <Link className="fk-btn fk-btn--primary" href="/#get">
          {live ? nav.ctaLive : nav.ctaWaitlist}
        </Link>
      </div>
    </header>
  );
}
