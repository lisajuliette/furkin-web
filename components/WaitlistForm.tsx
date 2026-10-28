'use client';

import { useState, type FormEvent } from 'react';
import { waitlist } from '@/content/en';
import { Icon } from '@/components/Icon';

type Phase = 'form' | 'sending' | 'sent' | 'limited';

function emailLooksComplete(value: string) {
  const at = value.indexOf('@');
  if (at < 1) return false;
  const domain = value.slice(at + 1);
  const dot = domain.indexOf('.');
  return dot > 0 && dot < domain.length - 1 && !/\s/.test(value);
}

function sourceFromPage() {
  try {
    return new URLSearchParams(window.location.search).get('utm_source') ?? '';
  } catch {
    return '';
  }
}

export function WaitlistForm({ id }: { id: string }) {
  const [phase, setPhase] = useState<Phase>('form');
  const [invalid, setInvalid] = useState(false);
  const [email, setEmail] = useState('');
  const errorId = `${id}-error`;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === 'sending') return;
    const data = new FormData(event.currentTarget);
    const company = String(data.get('company') ?? '').trim();
    const nextEmail = String(data.get('email') ?? '').trim();
    if (!company && !emailLooksComplete(nextEmail)) {
      setInvalid(true);
      setEmail(nextEmail);
      return;
    }
    setInvalid(false);
    setEmail(nextEmail);
    setPhase('sending');
    data.set('source', sourceFromPage());
    try {
      const response = await fetch('/api/waitlist', { method: 'POST', body: data });
      const body = (await response.json()) as { status?: string };
      if (body.status === 'limited') setPhase('limited');
      else if (body.status === 'invalid') {
        setInvalid(true);
        setPhase('form');
      } else if (body.status === 'sent') setPhase('sent');
      else setPhase('form');
    } catch {
      setPhase('form');
    }
  }

  if (phase === 'sent') {
    return (
      <div className="ws-sent" role="status">
        <span className="ws-sticker__ic ws-sent__ic">
          <Icon name="check" size={20} />
        </span>
        <span className="ws-stack">
          <span className="ws-sent__t">{waitlist.sentTitle}</span>
          <span className="ws-sent__s">{waitlist.sentBody.replace('{email}', email)}</span>
        </span>
      </div>
    );
  }

  if (phase === 'limited') {
    return (
      <div className="ws-sent ws-sent--limit" role="alert">
        <span className="ws-sticker__ic">
          <Icon name="clock" size={20} />
        </span>
        <span className="ws-stack">
          <span className="ws-sent__t">{waitlist.rateTitle}</span>
          <span className="ws-sent__s">{waitlist.rateBody}</span>
        </span>
      </div>
    );
  }

  return (
    <form className="ws-form" action="/api/waitlist" method="post" noValidate onSubmit={onSubmit}>
      <div className="ws-form__row">
        <label className="ws-honey">
          {waitlist.honeypot} <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
        <label htmlFor={id} className="ws-honey">
          {waitlist.emailLabel}
        </label>
        <input
          className={invalid ? 'ws-input is-error' : 'ws-input'}
          id={id}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder={waitlist.placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? errorId : undefined}
          defaultValue={email}
        />
        <button
          className="fk-btn fk-btn--primary"
          type="submit"
          aria-busy={phase === 'sending'}
          aria-label={phase === 'sending' ? waitlist.sending : undefined}
        >
          {phase === 'sending' ? (
            <span className="fk-dots">
              <i />
              <i />
              <i />
            </span>
          ) : (
            waitlist.button
          )}
        </button>
      </div>
      {invalid ? (
        <span className="ws-hint ws-hint--error" id={errorId} role="alert">
          <Icon name="warning" size={16} />
          {waitlist.invalid}
        </span>
      ) : (
        <span className="ws-hint">{waitlist.smallPrint}</span>
      )}
    </form>
  );
}
