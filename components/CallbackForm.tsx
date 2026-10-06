'use client';

import { useState } from 'react';
import { BUSINESS_PHONE } from '@/lib/site';

type Props = { reference: string };

export default function CallbackForm({ reference }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [time, setTime] = useState<'now' | 'today-pm' | 'tomorrow-am' | 'tomorrow-pm' | ''>('');
  const [smsConsent, setSmsConsent] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = name.trim().length >= 2 && phone.replace(/\D/g, '').length >= 10 && time && smsConsent;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, time, reference, smsConsent }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Something went wrong.');
      setSubmitted(true);

      // Fire dataLayer for GTM
      if (typeof window !== 'undefined') {
        const w = window as unknown as { dataLayer?: unknown[]; fbq?: (...args: unknown[]) => void };
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: 'callback_requested', reference, time });
        if (w.fbq) w.fbq('track', 'Contact', { content_name: 'callback_form' });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="callback-success">
        <div className="callback-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2>Done. Daniel will call you shortly.</h2>
        <p>If it&apos;s outside business hours (8am – 8pm ET), he&apos;ll reach out first thing in the morning.</p>
        <p style={{ marginTop: 20 }}><a href="/" className="callback-back">← Back to home</a></p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="callback-form">
      <div className="callback-field">
        <label htmlFor="cb-name">Your name</label>
        <input
          id="cb-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="callback-field">
        <label htmlFor="cb-phone">Phone number</label>
        <input
          id="cb-phone"
          type="tel"
          autoComplete="tel"
          placeholder="(407) 555-1234"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div className="callback-field">
        <label>When&apos;s a good time?</label>
        <div className="callback-time-grid">
          {[
            { v: 'now', l: 'Right now' },
            { v: 'today-pm', l: 'Today, afternoon' },
            { v: 'tomorrow-am', l: 'Tomorrow morning' },
            { v: 'tomorrow-pm', l: 'Tomorrow afternoon' },
          ].map((opt) => (
            <button
              key={opt.v}
              type="button"
              className={`callback-time ${time === opt.v ? 'is-active' : ''}`}
              onClick={() => setTime(opt.v as typeof time)}
            >
              {opt.l}
            </button>
          ))}
        </div>
      </div>

      <div className="callback-consent">
        <label>
          <input
            type="checkbox"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
          />
          <span>
            I agree to receive texts and calls from New Design Pro about my quote and appointment. Msg &amp; data rates may apply. Reply STOP to opt out. See <a href="/privacy" target="_blank">Privacy</a> &amp; <a href="/terms" target="_blank">Terms</a>.
          </span>
        </label>
      </div>

      {error && <div className="callback-error">{error}</div>}

      <button type="submit" className="callback-submit" disabled={!canSubmit || submitting}>
        {submitting ? 'Sending…' : 'Have Daniel call me'}
      </button>

      <p className="callback-fine">
        Or text him directly: <a href={`sms:${BUSINESS_PHONE.e164}`}>{BUSINESS_PHONE.display}</a>
      </p>
    </form>
  );
}
