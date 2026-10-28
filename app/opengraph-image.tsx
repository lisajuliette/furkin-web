import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { hero, site } from '@/content/en';

export const alt = `${hero.title} ${site.ogLead}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

function glacier(tokens: string, name: string) {
  const light = tokens.slice(0, tokens.indexOf('[data-theme="dark"]'));
  const value = light.match(new RegExp(`${name}:(#[0-9A-Fa-f]{6})`))?.[1];
  if (!value) throw new Error(`Missing ${name}`);
  return value;
}

export default async function Image() {
  const [tokens, shot] = await Promise.all([
    readFile(join(process.cwd(), 'styles/tokens.css'), 'utf8'),
    readFile(join(process.cwd(), 'public/screens/PGlacierLightToday.png')),
  ]);
  const background = glacier(tokens, '--glacier-background');
  const ink = glacier(tokens, '--glacier-ink');
  const primary = glacier(tokens, '--glacier-primary');
  const muted = glacier(tokens, '--glacier-muted');
  const onFill = glacier(tokens, '--glacier-on-fill');

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        background,
        padding: '0 72px',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: 620, gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              width: 56,
              height: 56,
              borderRadius: 16,
              background: primary,
              color: onFill,
              border: `2.5px solid ${ink}`,
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 800,
              transform: 'rotate(-4deg)',
            }}
          >
            F
          </div>
          <div style={{ display: 'flex', fontSize: 40, fontWeight: 800, color: ink }}>{site.name}</div>
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: -1,
            color: ink,
          }}
        >
          {hero.title}
        </div>
        <div style={{ display: 'flex', fontSize: 26, lineHeight: 1.35, color: muted, maxWidth: 560 }}>{site.ogLead}</div>
      </div>
      <div style={{ display: 'flex', position: 'relative', flex: 1, height: '100%' }}>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            width: 420,
            height: 420,
            left: 20,
            top: 110,
            borderRadius: 210,
            background: primary,
            border: `2.5px solid ${ink}`,
          }}
        />
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            width: 280,
            left: 90,
            top: 64,
            padding: 10,
            borderRadius: 40,
            background: ink,
            border: `2.5px solid ${ink}`,
            transform: 'rotate(-4deg)',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`data:image/png;base64,${shot.toString('base64')}`}
            alt=""
            width={260}
            height={500}
            style={{ borderRadius: 30, objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>
    </div>,
    { ...size },
  );
}
