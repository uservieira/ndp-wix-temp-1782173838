import type { Metadata } from 'next';
import Script from 'next/script';
import { BUSINESS_PHONE, CLAIMS } from '@/lib/site';
import { siteFooterHtml } from '@/lib/chrome';

export const metadata: Metadata = {
  alternates: { canonical: '/about' },
  title: 'About Daniel Vieira & the Family-Run Crew',
  description:
    'Meet Daniel Vieira and the family-run New Design Pro crew in Davenport, FL. LVP and tile installed with honest pricing, insured work, and Portuguese spoken.',
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
        <a href="/tile" role="menuitem">Tile</a>
      </div>
    </div>
    <a class="nav-refer" href="/refer">Refer &amp; Earn</a>
    <a href="/reviews">Reviews</a>
    <a href="/blog">Blog</a>
    <a href="/about" aria-current="page">About</a>
    <a href="#footer">Contact</a>
  </nav>
  <div class="nav-right">
    <a class="cta-phone" href="tel:${BUSINESS_PHONE.e164}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span class="cta-label" data-phone-display="${BUSINESS_PHONE.display}" data-phone-short="${BUSINESS_PHONE.short}">Call ${BUSINESS_PHONE.display}</span>
    </a>
  </div>
</header>

<!-- HERO -->
<section class="page-hero">
  <div class="ph-bg" style="background-image:url('/assets/carpentry-new-lg.webp');"></div>
  <div class="ph-fade"></div>
  <div class="ph-inner">
    <span class="eyebrow">About us</span>
    <h1>About <em>New Design Pro</em></h1>
    <p class="ph-sub">A Central Florida flooring and renovation crew that shows up, does clean work, and gives you a straight number.</p>
  </div>
</section>

<!-- STORY -->
<section class="about-story">
  <div class="section-inner">
    <div class="story-grid">
      <div class="story-copy">
        <span class="eyebrow">Our story</span>
        <h2 class="section-title" style="margin-bottom:22px;">${CLAIMS.experienceShort}.</h2>
        <p>New Design Pro installs flooring and handles interior finish work for homeowners across Central Florida: ${CLAIMS.experienceText} We're based in Davenport, FL, right in the Disney corridor, and we work throughout Kissimmee, Haines City, Winter Haven, Lakeland, Clermont, ChampionsGate, Celebration, and Poinciana.</p>
        <p>The company is owned and operated by Daniel Vieira. When you call, you're talking to the person who's going to be responsible for your job — not a call center. Our team is bilingual, so we're just as comfortable working with you in English or Portuguese.</p>
        <p>We stay focused on what we're genuinely good at: luxury vinyl plank, tile, hardwood, finish carpentry, painting, and cosmetic bathroom and kitchen refreshes. Plumbing, electrical, or structural work is coordinated with licensed trade partners. Clean, modern spaces, without the showroom markup.</p>
        <div class="areas">
          <span>Davenport</span><span>Kissimmee</span><span>Haines City</span><span>Winter Haven</span>
          <span>Lakeland</span><span>Clermont</span><span>ChampionsGate</span><span>Celebration</span><span>Poinciana</span>
        </div>
      </div>
      <div class="story-img">
        <img src="/assets/carpentry-new-lg.webp" alt="Finish carpentry and trim work by New Design Pro in a Central Florida home" loading="lazy" />
      </div>
    </div>
  </div>
</section>

<!-- VALUES -->
<section class="values-section">
  <div class="section-inner">
    <span class="eyebrow">What we stand on</span>
    <h2 class="section-title">How we work.</h2>
    <div class="values-grid">
      <div class="value-card">
        <div class="vicon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
        <h3>Insured</h3>
        <p>We carry general liability insurance, so your home is covered on every job. ${CLAIMS.insuranceNote}</p>
      </div>
      <div class="value-card">
        <div class="vicon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
        <h3>Honest pricing</h3>
        <p>Straight numbers, no showroom markup. Supplied &amp; installed LVP tiers start at $4.99/sqft. Labor-only jobs quoted in-home. You know the price before we start.</p>
      </div>
      <div class="value-card">
        <div class="vicon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 12l2 2 4-4"/></svg></div>
        <h3>Materials-included tiers</h3>
        <p>Don't want to shop for flooring? Our supplied tiers bundle the material and the install into one clear per-sqft price.</p>
      </div>
      <div class="value-card">
        <div class="vicon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6l1 14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-14"/></svg></div>
        <h3>Clean job sites</h3>
        <p>We protect your space, clean up at the end of each day, and haul away the mess. You get your home back looking better than we found it.</p>
      </div>
      <div class="value-card">
        <div class="vicon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg></div>
        <h3>50% / 50% payment</h3>
        <p>Half down to lock your spot, half when the job's done. No big upfront money grabs — you pay the balance when you're happy.</p>
      </div>
      <div class="value-card">
        <div class="vicon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <h3>Bilingual team</h3>
        <p>English and Portuguese. Falamos Português — you'll always be understood.</p>
      </div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="about-cta">
  <div class="section-inner">
    <h2>Ready for a <em>real number?</em></h2>
    <p>We'll come measure the space and send you a written quote — free, no obligation, no hard sell.</p>
    <a class="btn btn-primary" href="/#contact">
      Get a free measure
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>
  </div>
</section>

<!-- FOOTER -->
${siteFooterHtml()}


`;

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/about-interactive.js" strategy="afterInteractive" />
    </>
  );
}
