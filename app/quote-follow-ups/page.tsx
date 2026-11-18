import type { Metadata } from 'next';
import { BUSINESS_PHONE } from '@/lib/site';
import { stopSigOk } from '@/lib/followup/messages';

export const metadata: Metadata = {
  title: 'Quote Follow-ups',
  description: 'Stop the follow-up messages about your New Design Pro quote.',
  robots: { index: false, follow: false },
};
export const dynamic = 'force-dynamic';

// Landing page for the "stop follow-ups" link in quote follow-up emails.
// Opening the page changes nothing (mail scanners open links); the button does.
export default async function QuoteFollowUpsPage({ searchParams }: { searchParams: Promise<{ d?: string; s?: string; done?: string }> }) {
  const q = await searchParams;
  const done = q.done === '1';
  const valid = !done && q.done !== '0' && stopSigOk(q.d || '', q.s || '');
  const contact = (
    <>
      <a href={`tel:${BUSINESS_PHONE.e164}`}>{BUSINESS_PHONE.display}</a>
    </>
  );

  return (
    <main className="thank-you-page followup-stop">
      <div className="thank-you-inner">
        {done ? (
          <>
            <div className="thank-you-check" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l3 3 5-6" />
              </svg>
            </div>
            <h1>Done. No more follow&#8209;ups.</h1>
            <p className="thank-you-sub">You won&apos;t get any more check-ins about this quote. If a question comes up later, call or text Daniel at {contact}.</p>
          </>
        ) : valid ? (
          <>
            <h1>Stop follow&#8209;ups about your quote?</h1>
            <p className="thank-you-sub">One tap and the check-ins about this quote stop. You can still reach Daniel anytime at {contact}.</p>
            <form method="POST" action={`/api/followup/stop?d=${encodeURIComponent(q.d || '')}&s=${encodeURIComponent(q.s || '')}`}>
              <input type="hidden" name="confirm" value="1" />
              <button type="submit" className="thank-you-cta followup-stop-btn">Stop follow&#8209;ups</button>
            </form>
          </>
        ) : (
          <>
            <h1>This link didn&apos;t work.</h1>
            <p className="thank-you-sub">Reply to the email, or call or text {contact}, and we&apos;ll stop the follow&#8209;ups for you.</p>
          </>
        )}
        <div className="thank-you-contact">
          <p><a href="/" className="thank-you-back">← Back to home</a></p>
        </div>
      </div>
    </main>
  );
}
