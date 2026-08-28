import type { Metadata } from 'next';
import ThankYouTracking from '@/components/ThankYouTracking';

export const metadata: Metadata = {
  title: 'Quote sent — New Design Pro',
  description: 'Your quote is on its way. We\'ll be in touch to schedule your free in-home measure.',
  robots: { index: false, follow: true },
};

export default function QuoteThankYouPage({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  return <ThankYouWrapper searchParams={searchParams} />;
}

async function ThankYouWrapper({ searchParams }: { searchParams: Promise<{ ref?: string }> }) {
  const params = await searchParams;
  const ref = params.ref || '';

  return (
    <main className="thank-you-page">
      <ThankYouTracking reference={ref} />
      <div className="thank-you-inner">
        <div className="thank-you-check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 12l3 3 5-6" />
          </svg>
        </div>

        <h1>Your quote is on its way.</h1>
        <p className="thank-you-sub">Check your inbox in the next minute. Your price range, next steps, and the free measure link are all inside.</p>

        {ref && <div className="thank-you-ref">Reference: <strong>{ref}</strong></div>}

        <div className="thank-you-panel">
          <h2>What happens next</h2>
          <ol>
            <li><strong>Daniel will text or call</strong> to schedule your free in-home measure (usually same-day or next-day).</li>
            <li><strong>We measure</strong> and confirm final pricing on-site.</li>
            <li><strong>50% deposit</strong> to lock the install date, usually within 5–7 days.</li>
            <li><strong>Job done, balance due at completion.</strong> No games.</li>
          </ol>
        </div>

        <div className="thank-you-cta-block">
          <p>Want it faster? Skip the wait and drop your phone here — Daniel will call within the hour.</p>
          <a href={ref ? `/callback?ref=${encodeURIComponent(ref)}` : '/callback'} className="thank-you-cta">
            Book the measure now
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </div>

        <div className="thank-you-contact">
          <p>Or text Daniel directly: <a href="sms:+15618093864">(561) 809-3864</a></p>
          <p><a href="/" className="thank-you-back">← Back to home</a></p>
        </div>
      </div>
    </main>
  );
}
