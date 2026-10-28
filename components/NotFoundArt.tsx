export function NotFoundArt() {
  return (
    <svg width="220" height="150" viewBox="0 0 220 150" aria-hidden="true" style={{ color: 'var(--ink)' }}>
      <circle cx="110" cy="80" r="64" fill="var(--primary)" stroke="currentColor" strokeWidth="2.5" />
      <g transform="translate(84 72) rotate(-25) scale(1.9)" stroke="currentColor" fill="var(--surface)" strokeWidth="1.3">
        <circle cx="-10" cy="-10" r="5" />
        <circle cx="0" cy="-15" r="5" />
        <circle cx="10" cy="-10" r="5" />
        <path d="M-9 4c0-7 4-11 9-11s9 4 9 11c0 5-4 7-9 7s-9-2-9-7z" />
      </g>
      <g transform="translate(138 104) rotate(10) scale(1.5)" stroke="currentColor" fill="var(--done)" strokeWidth="1.6">
        <circle cx="-10" cy="-10" r="5" />
        <circle cx="0" cy="-15" r="5" />
        <circle cx="10" cy="-10" r="5" />
        <path d="M-9 4c0-7 4-11 9-11s9 4 9 11c0 5-4 7-9 7s-9-2-9-7z" />
      </g>
      <g transform="translate(188 40) rotate(35) scale(1.2)" stroke="currentColor" fill="var(--accent)" strokeWidth="2">
        <circle cx="-10" cy="-10" r="5" />
        <circle cx="0" cy="-15" r="5" />
        <circle cx="10" cy="-10" r="5" />
        <path d="M-9 4c0-7 4-11 9-11s9 4 9 11c0 5-4 7-9 7s-9-2-9-7z" />
      </g>
    </svg>
  );
}
