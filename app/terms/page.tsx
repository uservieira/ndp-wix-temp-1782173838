import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — New Design Pro',
  description: 'Terms of Service for New Design Pro flooring and remodeling — quote requests, SMS program, payments, and Florida governing law.',
  robots: { index: true, follow: true },
};

const PAGE_HTML = `

<header class="site-header">
  <a class="brand-mark" href="/" aria-label="New Design Pro home">
    <img class="logo-mark" src="/assets/logo-ndp-N-only.png" alt="New Design Pro logo" width="48" height="52" />
    <span><span class="brand-name">New Design Pro</span><span class="brand-sub">LVP · Tile · Remodeling</span></span>
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
    <a class="nav-refer" href="/refer-earn">Refer &amp; Earn</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a href="#footer">Contact</a>
  </nav>
  <div class="nav-right">
    <a class="cta-phone" href="tel:+15618093864">(561) 809-3864</a>
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
    <p><strong>For help:</strong> Reply <strong>HELP</strong> or call <a href="tel:+15618093864">561-809-3864</a>.</p>
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
      <p>Phone: <a href="tel:+15618093864">561-809-3864</a></p>
      <p>Email: <a href="mailto:daniel@newdesignpro.com">daniel@newdesignpro.com</a></p>
    </div>

    <p class="legal-footer-note">Huios Construction LLC (DBA New Design Pro) · 221 Aylesbury Ln, Davenport, FL 33837 · <a href="https://newdesignpro.com">newdesignpro.com</a></p>
  </div>
</main>

<footer class="site-footer" id="footer">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-brand-name">New Design Pro</div>
      <p>LVP · Tile · Remodeling. Davenport, Orlando, and Central Florida.</p>
      <span class="footer-lang-chip">Falamos Português · Hablamos Español</span>
    </div>
    <div class="footer-col">
      <h4>Menu</h4>
      <ul class="footer-menu">
        <li><a href="/#top">Home</a></li>
        <li><a href="/#flooring">Flooring</a></li>
        <li><a href="/#services">Services</a></li>
        <li><a href="/#reviews">Reviews</a></li>
        <li><a href="/refer-earn">Refer &amp; Earn</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul class="footer-contact-list">
        <li><a href="tel:+15618093864">(561) 809-3864</a></li>
        <li><a href="mailto:contact@newdesignpro.com">contact@newdesignpro.com</a></li>
        <li><span>Davenport, FL — Serving Central Florida</span></li>
      </ul>
    </div>
  </div>
  <div class="footer-legal">
    © 2026 New Design Pro · Huios Construction LLC · Central Florida · Fully insured · <a href="tel:+15618093864">(561) 809-3864</a>
    · <a href="/privacy">Privacy</a>
    · <a href="/terms">Terms</a>
  </div>
</footer>

`;

export default function Page() {
  return <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />;
}
