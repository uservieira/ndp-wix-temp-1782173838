import type { Metadata } from 'next';
import { BUSINESS_PHONE } from '@/lib/site';
import { siteFooterHtml } from '@/lib/chrome';

export const metadata: Metadata = {
  alternates: { canonical: '/privacy' },
  title: 'Privacy Policy',
  description:
    'How New Design Pro collects, uses, and protects the information you share through our website, quote forms, and SMS text messaging program, and how to opt out.',
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
    <p>You can opt out at any time by replying <strong>STOP</strong> to any message. Reply <strong>HELP</strong> for assistance. For direct support, call <a href="tel:${BUSINESS_PHONE.e164}">${BUSINESS_PHONE.short}</a>.</p>
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
