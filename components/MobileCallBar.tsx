'use client';

// Sticky click-to-call bar for phones. Hides itself whenever a form, the quote CTA,
// or the footer is on screen, so it never covers them. Pushes `ndp_call_click`.
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { BUSINESS_PHONE } from '@/lib/site';

const EXCLUDED = ['/form', '/callback', '/quote-thank-you', '/review'];
const AVOID = 'footer.site-footer, #contact, form, .post-cta, .form-page';

export default function MobileCallBar() {
  const pathname = usePathname() || '/';
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
    if (typeof IntersectionObserver === 'undefined') return;
    const onScreen = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? onScreen.add(e.target) : onScreen.delete(e.target)));
      setHidden(onScreen.size > 0);
    });
    // Page HTML is injected, so wait a tick for it to exist.
    const t = window.setTimeout(() => document.querySelectorAll(AVOID).forEach((el) => io.observe(el)), 50);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  if (EXCLUDED.includes(pathname)) return null;

  const onTap = () => {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event: 'ndp_call_click', phone_number: BUSINESS_PHONE.e164, click_location: 'mobile_call_bar', page_path: pathname });
  };

  return (
    <div className={`mobile-callbar${hidden ? ' is-hidden' : ''}`} aria-hidden={hidden ? 'true' : undefined}>
      <a className="btn btn-primary mobile-callbar-btn" href={`tel:${BUSINESS_PHONE.e164}`} onClick={onTap} tabIndex={hidden ? -1 : undefined} data-call-bar="1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width="18" height="18">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span>Call {BUSINESS_PHONE.display}</span>
      </a>
    </div>
  );
}
