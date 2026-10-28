import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { ThemeToggle } from '@/components/ThemeToggle';
import { site } from '@/content/en';

export function Footer() {
  const year = new Date().getFullYear();
  const [before, after] = site.footer.copyright.replace('{year}', String(year)).split('Pixel Witch');

  return (
    <footer className="ws-footer">
      <div className="ws-wrap ws-footer__in">
        <div className="ws-stack" style={{ gap: 14 }}>
          <Logo />
          <p className="ws-small">{site.tagline}</p>
        </div>
        <div className="ws-stack" style={{ gap: 16 }}>
          <nav className="ws-footer__links" aria-label="Footer">
            <Link href="/privacy">{site.footer.privacy}</Link>
            <Link href="/terms">{site.footer.terms}</Link>
            <Link href="/support">{site.footer.support}</Link>
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </nav>
          <p className="ws-small">
            {before}
            <a href="https://pixelwitch.dev">Pixel Witch</a>
            {after}
          </p>
        </div>
        <ThemeToggle />
      </div>
    </footer>
  );
}
