import type { Metadata } from 'next';
import QuoteForm from '@/components/QuoteForm';
import { BUSINESS, BUSINESS_PHONE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Get a Quote in 60 Seconds — New Design Pro',
  description:
    'Answer 6 quick questions and get an instant flooring or remodel price range emailed to you in 60 seconds. LVP $4.99/sqft. Insured. Central Florida.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/form' },
};

export default function FormPage() {
  return (
    <main className="form-page">
      <div className="form-page-inner">
        <header className="form-page-header">
          <a href="/" className="form-back" aria-label="Back to homepage">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            <span>Home</span>
          </a>
          <div className="form-page-brand">
            <span className="form-brand-name">New Design Pro</span>
            <span className="form-brand-sub">Central Florida flooring &amp; remodel</span>
          </div>
        </header>

        <div className="form-hero">
          <h1 className="form-hero-title">
            Get a price range in <span className="form-hero-highlight">60 seconds</span>.
          </h1>
          <p className="form-hero-sub">
            Answer 6 quick questions. We&apos;ll email you a price range instantly, and follow up if you want to book the free in-home measure.
          </p>
          <div className="form-promo-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8M12 8v8" />
            </svg>
            <span>
              Use code <strong>LVP10</strong> for 10% off — expires Dec 31, 2026
            </span>
          </div>
        </div>

        <QuoteForm />

        <footer className="form-page-footer">
          <p>
            Prefer to talk to a human? Text <strong>{BUSINESS_PHONE.display}</strong> or email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
          </p>
          <p className="form-fine-print">
            Your info is never sold or shared. See our <a href="/privacy">Privacy Policy</a> and <a href="/terms">Terms of Service</a>.
          </p>
        </footer>
      </div>
    </main>
  );
}
