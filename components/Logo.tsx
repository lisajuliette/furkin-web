import Link from 'next/link';
import { site } from '@/content/en';

export function Logo() {
  return (
    <Link className="ws-logo" href="/">
      <span className="ws-logo__mark" aria-hidden="true">
        F
      </span>
      <span className="ws-logo__word">{site.name}</span>
    </Link>
  );
}
