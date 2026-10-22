import type { Metadata } from 'next';
import Script from 'next/script';
import { BUSINESS_PHONE, CLAIMS } from '@/lib/site';
import { faqSectionHtml, reviewStripHtml, siteFooterHtml } from '@/lib/chrome';
import { lvpTiersHtml, PRICING_LEDE, pricingFineHtml, tileTiersHtml } from '@/lib/pricingHtml';
import JsonLd from '@/components/JsonLd';
import { TILE_FAQS } from '@/data/faqs';
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '@/lib/schema';
import { PRICING, SERVICE_AREA } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/tile' },
  title: 'Tile Installation in Central Florida — Free In-Home Measure',
  description:
    'Floor tile, showers, and backsplashes installed across Polk and Osceola counties, quoted after a free in-home measure. Insured crew, written quote in 24 hours.',
};

const tileFaqHtml = () => faqSectionHtml('tile-faq', 'Tile questions', 'Tile installation, <em>answered</em>.', TILE_FAQS);

const PAGE_HTML = `



<!-- ================================================================
     HEADER / NAV
     ================================================================ -->
<header class="site-header">
  <a class="brand-mark" href="/" aria-label="New Design Pro home">
    <svg class="logo-mark" viewBox="297 191 943 414" width="91" height="40" aria-hidden="true" focusable="false"><path fill="currentColor" d="M317.0 436.0V191.0H393.9L534.9 340.1H499.3V191.0H590.4V436.0H513.5L372.5 286.9H408.1V436.0ZM627.7 436.0V191.0H764.4Q810.7 191.0 846.0 205.9Q881.3 220.8 901.1 248.1Q920.9 275.4 920.9 313.5Q920.9 351.3 901.1 378.8Q881.3 406.2 846.0 421.1Q810.7 436.0 764.4 436.0ZM721.2 371.6H760.4Q780.2 371.6 795.1 365.0Q809.9 358.3 818.3 345.2Q826.6 332.1 826.6 313.5Q826.6 294.6 818.3 281.7Q809.9 268.7 795.1 262.1Q780.2 255.4 760.4 255.4H721.2ZM947.1 436.0V191.0H1080.6Q1119.4 191.0 1147.8 202.2Q1176.1 213.4 1191.5 234.2Q1207.0 255.1 1207.0 283.4Q1207.0 311.8 1191.5 332.4Q1176.1 353.1 1147.8 364.4Q1119.4 375.8 1080.6 375.8H999.0L1040.6 340.4V436.0ZM1040.6 349.6 999.0 312.1H1074.6Q1094.1 312.1 1103.4 304.4Q1112.7 296.7 1112.7 283.4Q1112.7 270.1 1103.4 262.4Q1094.1 254.7 1074.6 254.7H999.0L1040.6 217.2Z"/><path fill="#DA5626" d="M328,461 L763.7,461 L735.7,527 L300,527 ZM772.7,461 L1038,461 L1010,527 L744.7,527 ZM445,538 L679.0,538 L651.0,605 L417,605 ZM688.0,538 L1240,538 L1212,605 L660.0,605 Z"/></svg>
    <span>
      <span class="brand-name">New Design Pro</span>
      <span class="brand-sub">Flooring &amp; Remodeling</span>
    </span>
  </a>

  <!-- CSS-only mobile menu toggle (no JS — safe inside Wix embed) -->
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
        <a href="/tile" role="menuitem" aria-current="page">Tile</a>
      </div>
    </div>
    <a class="nav-refer" href="/refer">Refer &amp; Earn</a>
    <a href="/reviews">Reviews</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a href="#footer">Contact</a>
  </nav>

  <div class="nav-right">
    <a class="cta-phone" href="tel:${BUSINESS_PHONE.e164}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span class="cta-label" data-phone-display="${BUSINESS_PHONE.display}" data-phone-short="${BUSINESS_PHONE.short}">Call ${BUSINESS_PHONE.display}</span>
    </a>
  </div>
</header>

<!-- ================================================================
     HERO
     ================================================================ -->
<section class="hero" id="top">
  <div class="hero-inner">
    <div class="hero-grid">
      <div>
        <span class="hero-eyebrow">Central Florida · Insured · Tile Specialists</span>
        <h1>Tile &amp; stone, <em>installed right</em>.</h1>
        <p class="lede">Floor tile, showers, backsplashes, and large-format — <strong>quoted after a free in-home measure</strong>. Use your own tile or have it sourced for your job.</p>
        <div class="hero-cta-row">
          <a class="btn btn-primary" href="#tile-pricing">
            See tile pricing
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a class="btn btn-ghost" href="#contact">Get a free measure</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="num">Free<small>measure</small></span>
            <span class="label">Tile quoted<br/>in your home</span>
          </div>
          <div class="hero-stat">
            <span class="num">Next-day<small>start</small></span>
            <span class="label">Available<br/>on most jobs</span>
          </div>
          <div class="hero-stat">
            <span class="num">50<small>%</small></span>
            <span class="label">Deposit,<br/>balance at completion</span>
          </div>
        </div>
      </div>
      <div class="hero-image-wrap">
        <img src="/assets/tile-carrara-md.jpg"
             sizes="(min-width: 900px) 45vw, 100vw"
             alt="Porcelain floor tile"
             fetchpriority="high" />
      </div>
    </div>
  </div>
</section>

<!-- ================================================================
     BLACK TRUST BAR STRIP
     ================================================================ -->
<div class="trust-bar">
  <div class="trust-bar-inner">
    <span class="trust-bar-item">${CLAIMS.experienceShort}</span>
    <span class="trust-bar-item">Free In-Home Measure</span>
    <span class="trust-bar-item">Flexible Payment Plans</span>
    <span class="trust-bar-item pt">Falamos Português</span>
    <span class="trust-bar-item">Fully Insured</span>
  </div>
</div>


<!-- ================================================================
     LVP PRICING — Trump Card
     ================================================================ -->
<section id="tile-pricing">
  <div class="section-inner">
    <span class="eyebrow">Flooring pricing · transparent, no games</span>
    <h2 class="section-title">Pick your floor, <em>see the price</em>.</h2>
    <p class="section-lede">${PRICING_LEDE}</p>

    <!-- Flooring type toggle: LVP inline (default), Tile switches to inline preview + links to full /tile page -->
    <div class="floor-toggle" role="tablist" aria-label="Choose flooring type">
      <button class="floor-tab" role="tab" aria-selected="false" data-target="tiers-lvp" onclick="window.location.href='/#lvp-pricing'">Luxury Vinyl Plank</button>
      <button class="floor-tab is-active" role="tab" aria-selected="true" data-target="tiers-tile">Tile</button>
    </div>

    ${lvpTiersHtml({ hidden: true, href: () => '/#contact' })}

    ${tileTiersHtml({
      floorHref: '#contact',
      wallHref: '#contact',
      laborHref: '#contact',
      footerLinkHtml: `<a class="tile-cta-link" href="/#lvp-pricing" style="font-size: 15px;">
          Looking for LVP? See our luxury vinyl plank pricing
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>`,
    })}

    ${pricingFineHtml()}
  </div>
</section>


<!-- ================================================================
     MISSION BLOCK
     ================================================================ -->
<section id="mission">
  <div class="section-inner">
    <div class="mission-grid">
      <div>
        <h2>At New Design Pro, we transform spaces with <span class="hl">quality and commitment.</span></h2>
      </div>
      <div class="mission-body">
        <p>${CLAIMS.experienceText} We specialize in flooring installation, tile, finish carpentry, painting, and interior finish work for homes across the Disney corridor and Central Florida.</p>
        <p>Our skilled team delivers clean, modern spaces with attention to detail — on time, on budget, and without the showroom markup.</p>
      </div>
    </div>
  </div>
</section>

<!-- ================================================================
     REVIEWS
     ================================================================ -->
${reviewStripHtml({ eyebrow: 'What Central Florida customers say' })}

<!-- ================================================================
     CLIENT LOGOS STRIP
     ================================================================ -->
<section id="clients">
  <div class="section-inner">
    <span class="eyebrow">Trusted across Central Florida</span>
    <h2 class="section-title">Some of the places we've worked.</h2>
    <div class="client-grid client-chips" style="margin-top:8px;">
      <span class="client-chip">Orlando City Soccer School</span>
      <span class="client-chip">Kings Point</span>
      <span class="client-chip">GFC Orlando</span>
      <span class="client-chip">Ripley Beach Sports</span>
      <span class="client-chip">Central Family Dentistry</span>
      <span class="client-chip">Forever Young Fitness</span>
      <span class="client-chip">Entire Bar &amp; Restaurante</span>
    </div>
  </div>
</section>

<!-- ================================================================
     REFER & EARN CALLOUT
     ================================================================ -->
<section id="refer-callout">
  <div class="section-inner">
    <div class="refer-card">
      <div class="refer-text">
        <h2>Refer a friend, earn up to <em>$500</em></h2>
        <p>$50&ndash;$100 cash per closed referral. Refer 3 closed jobs in 90 days and we send you a $500 bonus.</p>
      </div>
      <a class="btn btn-white" href="/refer">
        See how it works
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

${tileFaqHtml()}

<!-- ================================================================
     CONTACT
     ================================================================ -->
<section id="contact">
  <div class="section-inner">
    <div class="contact-layout">
      <div class="contact-info">
        <span class="eyebrow">Free measure, no hard sell</span>
        <h2 class="section-title">Ready to <em>book a walkthrough?</em></h2>
        <p class="section-lede">Text is fastest. We'll come by, measure the space, and send a written quote within the hour. Free — no obligation.</p>

        <dl>
          <div>
            <dt>Text or call</dt>
            <dd><a href="tel:${BUSINESS_PHONE.e164}"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>${BUSINESS_PHONE.display}</a></dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a href="mailto:contact@newdesignpro.com">contact@newdesignpro.com</a></dd>
          </div>
          <div>
            <dt>Service area</dt>
            <dd>Polk &amp; Osceola — Davenport, Kissimmee, Haines City, Winter Haven, Lakeland, Clermont &amp; nearby</dd>
          </div>
          <div>
            <dt>Payment methods</dt>
            <dd>
              <div class="payment-badges">
                <span>Credit card</span>
                <span>Debit card</span>
                <span>Zelle</span>
                <span>ACH</span>
                <span>Check</span>
              </div>
            </dd>
          </div>
        </dl>
      </div>

      <form class="quote" id="quote-form" novalidate>
        <h3>Request a free quote</h3>
        <p class="form-sub">Reply within the hour, Mon–Sat.</p>

        <div class="form-success">Got it — we'll text you within the hour to schedule the free measure. <br><br>While you wait, <a href="/" style="color:#FF864F; text-decoration:underline;">see our other services at newdesignpro.com</a>.</div>
        <div class="form-error">Something went wrong. Please text ${BUSINESS_PHONE.display} instead.</div>

        <div class="field-row">
          <div class="field">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required autocomplete="name" placeholder="Full name" />
          </div>
          <div class="field">
            <label for="phone">Phone</label>
            <input type="tel" id="phone" name="phone" required autocomplete="tel" placeholder="(407) 555-1234" />
          </div>
        </div>

        <div class="field">
          <label for="scope">What do you need?</label>
          <select id="scope" name="scope" required>
            <option value="">Choose one…</option>
            <option value="lvp-labor">LVP install — I supply materials (labor-only quote)</option>
            <option value="lvp-supplied">LVP install — we supply materials ($4.99–$7.99/sqft)</option>
            <option value="tile-hardwood">Tile or hardwood</option>
            <option value="kitchen">Kitchen remodel</option>
            <option value="bathroom">Bathroom remodel</option>
            <option value="other">Something else</option>
          </select>
        </div>

        <div class="field-row">
          <div class="field">
            <label for="sqft">Approx sqft</label>
            <input type="text" id="sqft" name="sqft" placeholder="e.g. 800" inputmode="numeric" />
          </div>
          <div class="field">
            <label for="zip">ZIP code</label>
            <input type="text" id="zip" name="zip" placeholder="34747" inputmode="numeric" autocomplete="postal-code" />
          </div>
        </div>

        <div class="field">
          <label for="notes">Anything we should know</label>
          <textarea id="notes" name="notes" placeholder="Stairs, subfloor concerns, timeline, etc."></textarea>
        </div>

        <div class="field consent-field">
          <label class="consent-label">
            <input type="checkbox" id="sms_consent" name="sms_consent" value="yes" />
            <span>I agree to receive text messages from New Design Pro about my quote. Message and data rates may apply. Message frequency ~1&ndash;4 per active quote. Reply STOP to opt out, HELP for help. See <a href="/privacy" target="_blank" rel="noopener">Privacy Policy</a> and <a href="/terms" target="_blank" rel="noopener">Terms of Service</a>.</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary">
          Send request
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>

        <p class="form-fine">By submitting you agree to be contacted about your project by phone or email. SMS is optional and requires the checkbox above. No spam. No sharing your info.</p>
      </form>
    </div>
  </div>
</section>

<!-- ================================================================
     FOOTER (3-column)
     ================================================================ -->
${siteFooterHtml()}

<!-- ================================================================
     JS (for standalone index.html; Wix embed runs its own copy via build)
     ================================================================ -->


`;

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          path: '/tile',
          name: 'Tile installation in Central Florida',
          serviceType: 'Tile installation',
          areaServed: SERVICE_AREA.map((name) => ({ name })),
          quotedDescription: `Tile installation ${PRICING.tileQuoted.toLowerCase()}. Tile material customer-supplied or sourced per job.`,
        })}
      />
      <JsonLd data={faqPageSchema(TILE_FAQS, '/tile')} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Tile installation', path: '/tile' }])} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/homepage-interactive.js" strategy="afterInteractive" />
    </>
  );
}
