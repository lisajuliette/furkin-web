'use client';

import { useLayoutEffect, useSyncExternalStore } from 'react';
import { site } from '@/content/en';
import { readTheme, storeTheme, type Theme } from '@/lib/theme';

function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

function themeSnapshot(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, themeSnapshot, () => 'light' as const);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = readTheme();
  }, []);

  function choose(next: Theme) {
    document.documentElement.dataset.theme = next;
    storeTheme(next);
  }

  return (
    <div className="ws-theme" role="group" aria-label={site.footer.themeGroup}>
      <button
        type="button"
        data-choice="light"
        aria-label={site.footer.themeLight}
        aria-pressed={theme === 'light'}
        onClick={() => choose('light')}
      >
        <SunIcon />
      </button>
      <button
        type="button"
        data-choice="dark"
        aria-label={site.footer.themeDark}
        aria-pressed={theme === 'dark'}
        onClick={() => choose('dark')}
      >
        <MoonIcon />
      </button>
    </div>
  );
}

function SunIcon() {
  return (
    <svg
      className="fk-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="fk-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  );
}
