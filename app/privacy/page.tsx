import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — New Design Pro',
  description: 'How New Design Pro collects, uses, and protects information you provide through our website, quote forms, and SMS text messaging program.',
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
    <h1>Privacy Policy</h1>
    <p class="legal-updated">Last updated: July 10, 2026</p>

    <p class="legal-lead">This Privacy Policy explains how <strong>Huios Construction LLC (DBA New Design Pro)</strong> ("we", "us", or "our") collects, uses, and protects information you provide to us through our website (newdesignpro.com), our online quote forms, and our SMS text messaging program.</p>

    <div class="legal-callout">
      <strong>SMS opt-in and disclosure of mobile information.</strong>
      No mobile information collected through our SMS opt-in program will be shared with third parties or affiliates for marketing or promotional purposes. All the SMS opt-in categories on this site fall under this policy. Text messaging originator opt-in data and consent will not be shared with any third parties.
    </div>

    <h2>Information we collect</h2>
    <ul>
      <li><strong>Contact information</strong> you provide on our quote form: name, email address, mobile phone number, service address, and ZIP code.</li>
      <li><strong>Project details</strong> you enter: square footage, flooring tier preference, add-ons, and project timing.</li>
      <li><strong>Analytics data</strong>: standard web analytics (Google Analytics 4 and Meta Pixel) including pages viewed, referring URL, device type, and general geographic location.</li>
    </ul>

    <h2>How we use your information</h2>
    <ul>
      <li>To generate and deliver your requested quote by email and, if you have opted in, by SMS text message.</li>
      <li>To follow up with you about scheduling an in-home measurement and answering project questions.</li>
      <li>To send occasional service-related updates (project scheduling, invoicing) if you become a customer.</li>
      <li>To send promotional messages about New Design Pro offers, discounts, and referral rewards if you have opted in on our quote form.</li>
      <li>To measure and improve the performance of our marketing and website.</li>
    </ul>

    <h2>SMS text messaging program</h2>
    <p>By providing your mobile phone number on our quote form and checking the SMS consent box, you agree to receive automated and non-automated text messages from New Design Pro. Messages include quote follow-ups, appointment confirmations, review requests, and periodic promotional offers. Message frequency is limited to approximately 1–4 messages per active quote conversation, plus occasional promotional messages (typically 1–2 per month). <strong>Message and data rates may apply.</strong></p>
    <p>You can opt out at any time by replying <strong>STOP</strong> to any message. Reply <strong>HELP</strong> for assistance. For direct support, call <a href="tel:+15618093864">561-809-3864</a>.</p>
    <p><strong>Non-sharing statement:</strong> We do not sell, rent, or share mobile phone numbers or SMS opt-in data with third parties, affiliates, marketing partners, or data brokers. Your mobile number and SMS consent stay with New Design Pro and are used solely to communicate with you about your project and our services.</p>

    <h2>How we share information</h2>
    <p>We share information only with service providers that operate our business (email delivery, SMS delivery via Twilio, form processing via Formspree, analytics via Google and Meta). These providers are contractually required to protect your information and use it only for the services they provide to us. We do not sell your information.</p>
    <p>We may disclose information if required by law, subpoena, or court order.</p>

    <h2>Your rights</h2>
    <ul>
      <li>You may request a copy of the information we hold about you.</li>
      <li>You may request that we correct or delete your information.</li>
      <li>You may opt out of SMS at any time by replying STOP.</li>
      <li>You may opt out of email marketing by clicking the unsubscribe link.</li>
    </ul>
    <p>To exercise any of these rights, email <a href="mailto:daniel@newdesignpro.com">daniel@newdesignpro.com</a>.</p>

    <h2>Data retention</h2>
    <p>We keep contact information and quote details for up to 24 months from your last interaction, after which we delete or anonymize it. If you become a customer, we retain records as required by tax and business law (typically 7 years).</p>

    <h2>Security</h2>
    <p>We use reasonable technical and organizational safeguards to protect your information. No online transmission is 100% secure — you provide information at your own risk.</p>

    <h2>Children</h2>
    <p>Our services are not directed to children under 18, and we do not knowingly collect information from children.</p>

    <h2>Changes to this policy</h2>
    <p>We may update this Privacy Policy from time to time. Changes take effect when posted here. Continued use of our services after a change constitutes acceptance.</p>

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
