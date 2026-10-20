'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const KEY = 'ndp_promo_popup_v1';
const EXPIRES = new Date('2026-12-31T23:59:59-05:00');
const SKIP_PATHS = ['/form', '/review', '/refer'];

export default function PromoPopup() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [email, setEmail] = useState('');
  const [hp, setHp] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  useEffect(() => {
    if (new Date() > EXPIRES) return;
    if (SKIP_PATHS.some((p) => pathname.startsWith(p))) return;
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'claimed') return;
      if (v && Date.now() - Number(v) < 7 * 864e5) { setDeclined(true); return; }
    } catch {}
    let shown = false;
    const show = () => {
      if (shown) return;
      shown = true;
      setOpen(true);
      try { (window as any).dataLayer?.push({ event: 'promo_popup_view', promo: 'LVP10' }); } catch {}
    };
    const t = window.setTimeout(show, window.matchMedia('(max-width: 768px)').matches ? 6000 : 2500);
    const onScroll = () => {
      const h = document.documentElement;
      if (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight) > 0.4) show();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, [pathname]);


  function close() {
    setOpen(false);
    let claimed = false;
    try { claimed = localStorage.getItem(KEY) === 'claimed'; if (!claimed) localStorage.setItem(KEY, String(Date.now())); } catch {}
    if (!claimed) setDeclined(true);
    try { (window as any).dataLayer?.push({ event: 'promo_popup_decline', promo: 'LVP10' }); } catch {}
  }

  function reopen() {
    setDeclined(false);
    setState('idle');
    setOpen(true);
    try { (window as any).dataLayer?.push({ event: 'promo_popup_reopen', promo: 'LVP10' }); } catch {}
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setState('error'); return; }
    setState('sending');
    try {
      const r = await fetch('/api/promo', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, company_website: hp, source: pathname, attribution: (() => { try { return JSON.parse(localStorage.getItem('ndp_src') || 'null'); } catch { return null; } })() }) }).catch(() => null);
      if (!r?.ok) throw new Error('failed');
      setState('done');
      try { localStorage.setItem(KEY, 'claimed'); } catch {}
      try {
        (window as any).dataLayer?.push({ event: 'promo_popup_signup', promo: 'LVP10' });
        (window as any).fbq?.('track', 'Lead', { content_name: 'promo_popup_LVP10' });
      } catch {}
    } catch { setState('error'); }
  }

  if (!open) {
    if (!declined || new Date() > EXPIRES || SKIP_PATHS.some((p) => pathname.startsWith(p))) return null;
    return (
      <button type="button" className="promo-tab" onClick={reopen} aria-label="Changed your mind? Get 10% off">
        <span className="promo-tab-k">10% off</span> Changed your mind?
      </button>
    );
  }
  return (
    <div className="promo-pop" role="dialog" aria-modal="true" aria-labelledby="promo-pop-title">
      <div className="promo-pop-card">
        <div className="promo-pop-photo" aria-hidden="true" />
        <div className="promo-pop-body">
          <span className="promo-pop-act">Act now · Ends Dec 31</span>
          {state !== 'done' ? (
            <>
              <h2 id="promo-pop-title">Get <span>10% off</span> your new floors.</h2>
              <p>Enter your email and we&apos;ll send your code. Good on any supplied LVP package.</p>
              <form onSubmit={submit} noValidate>
                <input type="text" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} className="promo-pop-hp" aria-hidden="true" />
                <label htmlFor="promo-email" className="sr-only">Email address</label>
                <input id="promo-email" type="email" inputMode="email" autoComplete="email" placeholder="you@email.com" value={email} onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }} required />
                <button type="submit" disabled={state === 'sending'}>{state === 'sending' ? 'Sending…' : 'Send my code'}</button>
              </form>
              {state === 'error' && <p className="promo-pop-err">Please enter a valid email address.</p>}
              <p className="promo-pop-fine">We&apos;ll only email you about this offer and your quote. Unsubscribe anytime.</p>
              <button type="button" className="promo-pop-no" onClick={close}>No thanks, I&apos;ll pay full price</button>
            </>
          ) : (
            <>
              <h2 id="promo-pop-title">You&apos;re in. Here&apos;s your code:</h2>
              <div className="promo-pop-code">LVP10</div>
              <p>Screenshot it or write it down. Enter it on the quote form for 10% off any supplied LVP package, through Dec 31, 2026.</p>
              <a className="promo-pop-cta" href="/form" onClick={() => setOpen(false)}>Get my price</a>
              <button type="button" className="promo-pop-no" onClick={() => setOpen(false)}>Close</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
