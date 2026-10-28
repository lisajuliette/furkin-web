'use client';

import { useState, type ReactNode } from 'react';
import { toy } from '@/content/en';

const profiles = ['glacier', 'lavender', 'tangerine', 'matcha', 'nordic'] as const;
type Profile = (typeof profiles)[number];
const swatches = ['primary', 'done', 'accent', 'action'] as const;

export function ColourToy({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<Profile>('glacier');
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <>
      <div className="ws-toy__phone">
        <div className="ws-toy__screen">
          <div className="ws-toy__scale" inert data-theme={mode} data-profile={profile}>
            {children}
          </div>
        </div>
      </div>
      <div className="ws-stack" style={{ gap: 24 }}>
        <p className="ws-label">{toy.label}</p>
        <h2 className="ws-h2">{toy.title}</h2>
        <p className="ws-lead">{toy.lead}</p>
        <div className="ws-dots" role="group" aria-label={toy.profileGroup}>
          {profiles.map((name) => (
            <button
              key={name}
              className="ws-dot"
              type="button"
              aria-pressed={profile === name}
              onClick={() => setProfile(name)}
            >
              <span className="ws-dot__sw" aria-hidden="true">
                {swatches.map((swatch) => (
                  <span key={swatch} style={{ background: `var(--${name}-${swatch})` }} />
                ))}
              </span>
              {toy.profiles[name]}
            </button>
          ))}
        </div>
        <div className="ws-modes" role="group" aria-label={toy.modeGroup}>
          <button type="button" aria-pressed={mode === 'light'} onClick={() => setMode('light')}>
            <SunIcon />
            {toy.light}
          </button>
          <button type="button" aria-pressed={mode === 'dark'} onClick={() => setMode('dark')}>
            <MoonIcon />
            {toy.dark}
          </button>
        </div>
      </div>
    </>
  );
}

function SunIcon() {
  return (
    <svg className="fk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="fk-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" />
    </svg>
  );
}
