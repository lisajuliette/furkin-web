import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';
import { invite } from '@/content/en';
import { inviteIsShown, petList, previewInvite, type InvitePreview } from '@/lib/invite/preview';

const copyScript = `
document.querySelectorAll('[data-copy]').forEach(function (button) {
  button.addEventListener('click', function () {
    var code = button.getAttribute('data-copy') || '';
    var label = button.querySelector('[data-copy-label]');
    var copied = button.getAttribute('data-copied') || '';
    navigator.clipboard.writeText(code).then(function () {
      if (!label) return;
      var original = label.textContent;
      label.textContent = copied;
      window.setTimeout(function () { label.textContent = original; }, 1600);
    }).catch(function () {});
  });
});
`;

function titleFor(preview: InvitePreview) {
  return invite.title
    .replace('{inviter}', preview.inviter_first_name ?? '')
    .replace('{pets}', petList(preview.pet_names));
}

function bodyFor(preview: InvitePreview) {
  return invite.body.replace('{inviter}', preview.inviter_first_name ?? '');
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const preview = await previewInvite(code);
  const shown = inviteIsShown(preview);
  return {
    title: { absolute: shown ? titleFor(preview) : invite.goneTitle },
    description: shown ? bodyFor(preview) : invite.goneBody,
    robots: { index: false, follow: false },
  };
}

export default async function InvitePage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const preview = await previewInvite(code);
  if (!inviteIsShown(preview)) {
    return (
      <main className="ws-simple__main">
        <div className="ws-panel">
          <span className="ws-tile ws-tile--accent" aria-hidden="true">
            <Icon name="clock" size={28} />
          </span>
          <h1 className="ws-h2 ws-h2--panel">{invite.goneTitle}</h1>
          <p className="ws-p">{invite.goneBody}</p>
          <Link className="fk-btn fk-btn--secondary" href="/">
            {invite.back}
          </Link>
        </div>
      </main>
    );
  }

  const displayCode = code.trim().toUpperCase();
  const apple = process.env.NEXT_PUBLIC_APP_STORE_ID
    ? `https://apps.apple.com/app/id${process.env.NEXT_PUBLIC_APP_STORE_ID}`
    : 'https://apps.apple.com';
  const play =
    process.env.NEXT_PUBLIC_PLAY_STORE_URL ||
    'https://play.google.com/store/apps/details?id=dev.pixelwitch.furkin';

  return (
    <main className="ws-simple__main">
      <div className="ws-panel">
        <p className="ws-label">{invite.label}</p>
        <h1 className="ws-h2 ws-h2--panel">{titleFor(preview)}</h1>
        <div className="ws-petchips">
          {preview.pet_names.map((name) => (
            <span className="fk-chip" key={name}>
              <span className="fk-avatar" aria-hidden="true">
                {name.slice(0, 1)}
              </span>
              <span className="fk-chip__label">{name}</span>
            </span>
          ))}
        </div>
        <p className="ws-p">{bodyFor(preview)}</p>
        <div className="ws-stack" style={{ gap: 18 }}>
          <div className="ws-num">
            <span className="ws-num__n">1</span>
            <div className="ws-stack" style={{ gap: 10, flex: 1 }}>
              <span style={{ fontWeight: 800 }}>{invite.step1}</span>
              <div className="ws-badges">
                <a className="ws-badge" href={apple}>
                  {invite.badgeApp}
                </a>
                <a className="ws-badge" href={play}>
                  {invite.badgePlay}
                </a>
              </div>
            </div>
          </div>
          <div className="ws-num">
            <span className="ws-num__n">2</span>
            <div className="ws-stack" style={{ gap: 10, flex: 1 }}>
              <span style={{ fontWeight: 800 }}>{invite.step2}</span>
              <a className="fk-btn fk-btn--primary" href={`furkin://invite/${encodeURIComponent(displayCode)}`}>
                {invite.open}
              </a>
            </div>
          </div>
          <div className="ws-num">
            <span className="ws-num__n">3</span>
            <div className="ws-stack" style={{ gap: 10, flex: 1 }}>
              <span style={{ fontWeight: 800 }}>{invite.step3}</span>
              <div className="ws-code">
                <span className="ws-code__v" aria-label={`Code ${displayCode.split('').join(' ')}`}>
                  {displayCode}
                </span>
                <button
                  className="fk-btn fk-btn--secondary"
                  type="button"
                  data-copy={displayCode}
                  data-copied={invite.copied}
                  style={{ minHeight: 44, padding: '0 14px' }}
                >
                  <Icon name="share" size={18} />
                  <span data-copy-label>{invite.copy}</span>
                </button>
              </div>
              <span className="ws-small">{invite.codeNote}</span>
            </div>
          </div>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: copyScript }} />
    </main>
  );
}
