import type { Metadata } from 'next';
import { Icon } from '@/components/Icon';
import { site, support } from '@/content/en';

export const metadata: Metadata = {
  title: `${support.title} · ${site.name}`,
  description: support.lead,
};

export default function SupportPage() {
  const [before, after] = support.lead.split(site.email);

  return (
    <main>
      <div className="ws-wrap ws-page">
        <div className="ws-sechead">
          <p className="ws-label">{support.label}</p>
          <h1 className="ws-h2">{support.title}</h1>
          <p className="ws-lead">
            {before}
            <a href={`mailto:${site.email}`}>{site.email}</a>
            {after}
          </p>
        </div>
        <div className="ws-faq">
          {support.faq.map((item) => (
            <details key={item.q}>
              <summary>
                <span>{item.q}</span>
                <Icon name="chevron-down" size={22} />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <div className="ws-card ws-help">
          <span className="ws-tile ws-tile--accent">
            <Icon name="bell" size={28} />
          </span>
          <div className="ws-stack" style={{ gap: 4 }}>
            <h2 className="ws-h3">{support.stuckTitle}</h2>
            <p className="ws-p">{support.stuckBody}</p>
          </div>
          <a className="fk-btn fk-btn--primary" href={`mailto:${site.email}`}>
            {support.stuckButton}
          </a>
        </div>
      </div>
    </main>
  );
}
