import type { Metadata } from 'next';
import { BUSINESS_PHONE } from '@/lib/site';
import { siteFooterHtml } from '@/lib/chrome';

export const metadata: Metadata = {
  alternates: { canonical: '/terms' },
  title: 'Terms of Service',
  description:
    'Terms of Service for New Design Pro flooring and remodeling: quote requests, the SMS text program, deposits and payments, and Florida governing law. Read first.',
  robots: { index: false, follow: true },
};

const PAGE_HTML = `

<header class="site-header">
  <a class="brand-mark" href="/" aria-label="New Design Pro home">
    <svg class="logo-mark" viewBox="297 191 943 414" width="91" height="40" aria-hidden="true" focusable="false"><path fill="currentColor" d="M317.0 436.0V191.0H393.9L534.9 340.1H499.3V191.0H590.4V436.0H513.5L372.5 286.9H408.1V436.0ZM627.7 436.0V191.0H764.4Q810.7 191.0 846.0 205.9Q881.3 220.8 901.1 248.1Q920.9 275.4 920.9 313.5Q920.9 351.3 901.1 378.8Q881.3 406.2 846.0 421.1Q810.7 436.0 764.4 436.0ZM721.2 371.6H760.4Q780.2 371.6 795.1 365.0Q809.9 358.3 818.3 345.2Q826.6 332.1 826.6 313.5Q826.6 294.6 818.3 281.7Q809.9 268.7 795.1 262.1Q780.2 255.4 760.4 255.4H721.2ZM947.1 436.0V191.0H1080.6Q1119.4 191.0 1147.8 202.2Q1176.1 213.4 1191.5 234.2Q1207.0 255.1 1207.0 283.4Q1207.0 311.8 1191.5 332.4Q1176.1 353.1 1147.8 364.4Q1119.4 375.8 1080.6 375.8H999.0L1040.6 340.4V436.0ZM1040.6 349.6 999.0 312.1H1074.6Q1094.1 312.1 1103.4 304.4Q1112.7 296.7 1112.7 283.4Q1112.7 270.1 1103.4 262.4Q1094.1 254.7 1074.6 254.7H999.0L1040.6 217.2Z"/><path fill="#DA5626" d="M328,461 L763.7,461 L735.7,527 L300,527 ZM772.7,461 L1038,461 L1010,527 L744.7,527 ZM445,538 L679.0,538 L651.0,605 L417,605 ZM688.0,538 L1240,538 L1212,605 L660.0,605 Z"/></svg>
    <span><span class="brand-name">New Design Pro</span><span class="brand-sub">Flooring &amp; Remodeling</span></span>
  </a>
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true" />
  <label class="nav-backdrop" for="nav-toggle" aria-hidden="true"></label>
  <label class="nav-burger" for="nav-toggle" aria-label="Toggle menu">
    <svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
    <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
  </label>
  <nav class="nav-links" aria-label="Primary">
    <a href="/">Home</a>
    <a href="/#lvp-pricing">Flooring</a>
    <a href="/tile">Tile</a>
    <a class="nav-refer" href="/refer">Refer &amp; Earn</a>
    <a href="/reviews">Reviews</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a href="#footer">Contact</a>
  </nav>
  <div class="nav-right">
    <a class="cta-phone" href="tel:${BUSINESS_PHONE.e164}">${BUSINESS_PHONE.display}</a>
  </div>
</header>

<main class="legal-page">
  <div class="legal-inner">
    <p class="legal-eyebrow">Legal · New Design Pro</p>
    <h1>Terms of Service</h1>
    <p class="legal-updated">Last updated: July 10, 2026</p>

    <p class="legal-lead">These Terms of Service ("Terms") govern your use of the New Design Pro website (newdesignpro.com), our quote request forms, our SMS text messaging program, and any related services (collectively, the "Services") provided by <strong>Huios Construction LLC (DBA New Design Pro)</strong> ("we", "us", "our").</p>

    <h2>Acceptance</h2>
    <p>By using the Services or submitting a quote request, you agree to these Terms. If you do not agree, do not use the Services.</p>

    <h2>Quote requests</h2>
    <p>A quote generated through our online form is a good-faith estimate based on the information you provide. It is <strong>not a binding contract</strong>. Final pricing is confirmed after a free in-home measurement and a written agreement signed by both parties.</p>

    <h2>SMS text messaging program</h2>
    <p>By checking the SMS consent box on our quote form and providing your mobile phone number, you consent to receive text messages from New Design Pro. This includes:</p>
    <ul>
      <li>Confirmation that your quote has been delivered</li>
      <li>Follow-up to schedule a free in-home measurement</li>
      <li>Appointment reminders and arrival notifications on install day</li>
      <li>Review requests after job completion</li>
      <li>Occasional promotional messages about New Design Pro offers, seasonal discounts, and referral rewards</li>
      <li>Answers to questions about your project</li>
    </ul>
    <p><strong>Message frequency:</strong> approximately 1–4 messages per active quote conversation, plus occasional promotional messages (typically 1–2 per month).</p>
    <p><strong>Message and data rates may apply</strong> depending on your mobile carrier plan.</p>
    <p><strong>To opt out:</strong> Reply <strong>STOP</strong> to any message and you will not receive further texts.</p>
    <p><strong>For help:</strong> Reply <strong>HELP</strong> or call <a href="tel:${BUSINESS_PHONE.e164}">${BUSINESS_PHONE.short}</a>.</p>
    <p>Supported US carriers include AT&amp;T, Verizon, T-Mobile, and most regional carriers. Carriers are not liable for delayed or undelivered messages.</p>

    <h2>Services and installations</h2>
    <p>New Design Pro is a residential remodeling and flooring installation business. All work is subject to a separate written services agreement, which will detail scope, price, deposit, timeline, warranties, and cancellation terms. We are insured; we are not a licensed general contractor. We perform work permitted for insured non-GC contractors in Florida.</p>

    <h2>Payments</h2>
    <p>A 50% deposit is typically required to schedule an installation, with the balance due upon completion. Third-party financing (e.g. Wisetack) may be available through independent providers; New Design Pro is not the lender and does not underwrite, approve, or guarantee any financing.</p>

    <h2>Intellectual property</h2>
    <p>All content on newdesignpro.com — including photographs, text, logos, and video — is owned by Huios Construction LLC or its licensors. You may not copy, reproduce, or redistribute content without written permission.</p>

    <h2>Disclaimers</h2>
    <p>The Services are provided "as is" without warranty of any kind, express or implied, including but not limited to fitness for a particular purpose. Quotes are estimates and subject to on-site confirmation. Photographs of completed work represent past projects and are not guarantees of future results.</p>

    <h2>Limitation of liability</h2>
    <p>To the maximum extent permitted by law, our aggregate liability arising out of the Services shall not exceed the amounts you have paid to us in the 12 months preceding the event giving rise to the claim.</p>

    <h2>Governing law</h2>
    <p>These Terms are governed by the laws of the State of Florida, without regard to conflict of law principles. Any dispute shall be brought in the state or federal courts located in Polk County, Florida.</p>

    <h2>Changes to these Terms</h2>
    <p>We may update these Terms from time to time. Changes take effect when posted. Continued use of the Services after a change constitutes acceptance.</p>

    <h2>Contact</h2>
    <div class="legal-contact-card">
      <p><strong>Huios Construction LLC (DBA New Design Pro)</strong></p>
      <p>Central Florida</p>
      <p>Phone: <a href="tel:${BUSINESS_PHONE.e164}">${BUSINESS_PHONE.short}</a></p>
      <p>Email: <a href="mailto:daniel@newdesignpro.com">daniel@newdesignpro.com</a></p>
    </div>

    <p class="legal-footer-note">Huios Construction LLC (DBA New Design Pro) · 221 Aylesbury Ln, Davenport, FL 33837 · <a href="https://newdesignpro.com">newdesignpro.com</a></p>
  </div>
</main>

${siteFooterHtml()}

`;

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />;
}
