import type { Metadata } from 'next';
import Link from 'next/link';
import { NotFoundArt } from '@/components/NotFoundArt';
import { notFound as notFoundCopy } from '@/content/en';

export const metadata: Metadata = {
  title: { absolute: 'Page not found' },
  description: notFoundCopy.body,
};

export default function NotFound() {
  return (
    <main className="ws-simple__main">
      <div className="ws-panel" style={{ alignItems: 'center', textAlign: 'center' }}>
        <NotFoundArt />
        <h1 className="ws-h2">{notFoundCopy.title}</h1>
        <p className="ws-p">{notFoundCopy.body}</p>
        <Link className="fk-btn fk-btn--primary" href="/">
          {notFoundCopy.button}
        </Link>
      </div>
    </main>
  );
}
