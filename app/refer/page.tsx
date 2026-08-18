import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Refer a Friend, Earn up to $500 — New Design Pro',
  description: 'Refer a friend to New Design Pro and earn $50–$100 cash per closed job, plus a $500 bonus for 3 closed jobs in 90 days. Paid by cash, Zelle, or Cash App.',
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
    <div class="nav-dd" data-nav-dd>
      <button type="button" class="nav-dd-trigger" aria-haspopup="true" aria-expanded="false">
        Flooring
        <svg class="caret" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="5,8 10,13 15,8"/></svg>
      </button>
      <div class="nav-dd-menu" role="menu">
        <a href="/#lvp-pricing" role="menuitem">Luxury Vinyl Plank</a>
        <a href="/#lvp-pricing" data-open-tile="1" role="menuitem">Tile</a>
      </div>
    </div>
    <a class="nav-refer" href="/refer-earn">Refer &amp; Earn</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a href="#footer">Contact</a>
  </nav>
  <div class="nav-right">
    <a class="cta-phone" href="tel:+15618093864">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span class="cta-label">Call (561) 809-3864</span>
    </a>
  </div>
</header>

<!-- HERO -->
<section class="page-hero" id="refer-hero">
  <div class="ph-bg" style="background-image:url('/assets/lvp-livingroom-lg.webp');"></div>
  <div class="ph-fade"></div>
  <div class="ph-inner">
    <span class="eyebrow">Referral program</span>
    <h1>Refer a friend, earn up to <em>$500</em></h1>
    <p class="ph-sub">We pay you cash when your friend, neighbor, family member, or realtor books a job with New Design Pro.</p>
  </div>
</section>

<!-- PAYOUT STRUCTURE -->
<section class="payout-section">
  <div class="section-inner">
    <span class="eyebrow">How the payout works</span>
    <h2 class="section-title">Real cash for <em>every closed job</em>.</h2>
    <p class="section-lede">You get paid based on the size of the job your referral books — plus a bonus when you send us three that close.</p>

    <div class="payout-grid">
      <div class="payout-card">
        <div class="amount">$50</div>
        <h3>Small job referral</h3>
        <p>$50 cash when your referral closes a job under $2,000 in value.</p>
      </div>
      <div class="payout-card">
        <div class="amount">$100</div>
        <h3>Mid / large job referral</h3>
        <p>$100 cash when your referral closes a job worth $2,000 or more.</p>
      </div>
      <div class="payout-card bonus">
        <div class="amount">$500</div>
        <h3>3-in-90 bonus</h3>
        <p>Refer 3 jobs that close within a rolling 90-day window and we send you a $500 bonus on top.</p>
      </div>
    </div>

    <div class="payout-meta">
      <div class="m">
        <strong>Payout method — your choice</strong>
        <span>Cash, Zelle, or Cash App. Tell us how you want it and we'll send it.</span>
      </div>
      <div class="m">
        <strong>Timing</strong>
        <span>Paid within 7 days of the referred job being completed and paid in full.</span>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="steps-section">
  <div class="section-inner">
    <span class="eyebrow">Three steps, no hoops</span>
    <h2 class="section-title">How it works.</h2>
    <div class="steps-grid">
      <div class="step">
        <div class="num">1</div>
        <h3>Send them our way</h3>
        <p>Text <a href="tel:+15618093864">561-809-3864</a> with their name, or fill out the form below. That's it — we take it from there.</p>
      </div>
      <div class="step">
        <div class="num">2</div>
        <h3>We do the job</h3>
        <p>They book with us, we complete the work, and they pay in full. We keep you posted along the way.</p>
      </div>
      <div class="step">
        <div class="num">3</div>
        <h3>You get paid</h3>
        <p>$50 or $100 cash — by cash, Zelle, or Cash App — sent within 7 days of the job being completed and paid.</p>
      </div>
    </div>
  </div>
</section>

<!-- FORM -->
<section class="refer-form-section" id="refer-form">
  <div class="section-inner">
    <div class="refer-form-wrap">
      <div>
        <span class="eyebrow">Send us a referral</span>
        <h2 class="section-title">Who should we <em>call?</em></h2>
        <p class="section-lede">Give us your info so we know where to send your payout, and the details of the person you're referring. We'll reach out to them and keep you in the loop.</p>
        <p class="prefer-text">Prefer to text? Send their name to <a href="tel:+15618093864">561-809-3864</a> and we'll handle the rest.</p>
      </div>

      <form class="refer" id="refer-form-el" novalidate>
        <div class="form-success">Got it — thanks for the referral. We'll reach out to them and let you know when the job closes so we can send your payout.</div>
        <div class="form-error">Something went wrong. Please text your referral to 561-809-3864 instead.</div>

        <div class="field-row">
          <div class="field">
            <label for="your_name">Your name</label>
            <input type="text" id="your_name" name="your_name" required autocomplete="name" placeholder="Your full name" />
          </div>
          <div class="field">
            <label for="your_phone">Your phone / payout handle</label>
            <input type="text" id="your_phone" name="your_phone" required placeholder="Phone, Zelle, or Cash App" />
          </div>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="ref_name">Referred person's name</label>
            <input type="text" id="ref_name" name="ref_name" required placeholder="Their name" />
          </div>
          <div class="field">
            <label for="ref_contact">Their phone or email</label>
            <input type="text" id="ref_contact" name="ref_contact" required placeholder="Phone or email" />
          </div>
        </div>

        <div class="field">
          <label for="ref_notes">Notes about the job</label>
          <textarea id="ref_notes" name="ref_notes" placeholder="What do they need done? Any timeline or details that help."></textarea>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit referral
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
        <p class="form-fine">By submitting you agree to be contacted about this referral. We only use this info to complete the job and send your payout.</p>
      </form>
    </div>
  </div>
</section>

<!-- FINE PRINT -->
<section class="fineprint">
  <div class="section-inner fp-box">
    <h3>Program terms</h3>
    <ul>
      <li>Payout is issued only after the referred job is booked, completed, and paid in full.</li>
      <li>One payout per unique referred customer.</li>
      <li>The referred customer must be brand new to New Design Pro — not already in our system or an existing/prior customer.</li>
      <li>$50 cash for a closed job under $2,000 in value; $100 cash for a closed job of $2,000 or more.</li>
      <li>The $500 bonus is paid when you refer 3 jobs that close within a rolling 90-day window. The window is rolling and resets after each $500 bonus is paid.</li>
      <li>Payouts sent by cash, Zelle, or Cash App within 7 days of the referred job being completed and paid.</li>
      <li>Program terms may change. Current terms as of 2026.</li>
    </ul>
  </div>
</section>

<!-- FOOTER -->
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
        <li><a href="#footer">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul class="footer-contact-list">
        <li><a href="tel:+15618093864">(561) 809-3864</a></li>
        <li><a href="mailto:contact@newdesignpro.com">contact@newdesignpro.com</a></li>
        <li><span>Davenport, FL — Serving Central Florida</span></li>
      </ul>
      <div class="footer-social">
        <a href="https://www.instagram.com/newdesignpro" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        <a href="https://www.facebook.com/newdesignpro" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
        <a href="https://www.youtube.com/@newdesignpro" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg></a>
        <a href="https://www.tiktok.com/@newdesignpro" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 2h-3v13.5a2.5 2.5 0 1 1-2.5-2.5c.17 0 .34.02.5.05V10a5.5 5.5 0 1 0 5 5.47V8.6a6.5 6.5 0 0 0 3 .9V6.4a3.5 3.5 0 0 1-3-3.4z"/></svg></a>
      </div>
    </div>
  </div>
  <div class="footer-legal">
    © <span id="year"></span> New Design Pro · Huios Construction LLC · Central Florida · Fully insured · <a href="tel:+15618093864">(561) 809-3864</a>
    · <a href="/privacy" target="_blank" rel="noopener">Privacy</a>
    · <a href="/terms" target="_blank" rel="noopener">Terms</a>
  </div>
</footer>


`;

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/refer-interactive.js" strategy="afterInteractive" />
    </>
  );
}
