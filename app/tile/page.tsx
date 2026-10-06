import type { Metadata } from 'next';
import Script from 'next/script';
import { BUSINESS_PHONE, CLAIMS } from '@/lib/site';
import { faqSectionHtml, reviewStripHtml, siteFooterHtml } from '@/lib/chrome';
import JsonLd from '@/components/JsonLd';
import { TILE_FAQS } from '@/data/faqs';
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '@/lib/schema';
import { PRICING, SERVICE_AREA } from '@/lib/site';

export const metadata: Metadata = {
  alternates: { canonical: '/tile' },
  title: 'Tile Installation in Central Florida — From $7.99/sqft',
  description:
    'Floor tile, showers, and backsplashes supplied and installed from $7.99/sqft across Polk and Osceola counties. Insured crew, 50% deposit, quote in 24 hours.',
};

const tileFaqHtml = () => faqSectionHtml('tile-faq', 'Tile questions', 'Tile installation, <em>answered</em>.', TILE_FAQS);

const PAGE_HTML = `



<!-- ================================================================
     HEADER / NAV
     ================================================================ -->
<header class="site-header">
  <a class="brand-mark" href="/" aria-label="New Design Pro home">
    <img class="logo-mark" src="/assets/logo-ndp-N-only.png" alt="New Design Pro logo" width="48" height="52" />
    <span>
      <span class="brand-name">New Design Pro</span>
      <span class="brand-sub">LVP · Tile · Remodeling</span>
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
        <p class="lede">Floor tile supplied &amp; installed from <strong>$7.99/sqft</strong>. Showers, backsplashes, and large-format quoted after in-home walkthrough.</p>
        <div class="hero-cta-row">
          <a class="btn btn-primary" href="#tile-pricing">
            See tile pricing
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a class="btn btn-ghost" href="#contact">Get a free measure</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="num">$7.99<small>/sqft</small></span>
            <span class="label">Floor tile<br/>supplied &amp; installed</span>
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
             srcset="/assets/tile-carrara-md.jpg 800w, assets/tile-kitchen-lg.jpg 1600w"
             sizes="(min-width: 900px) 45vw, 100vw"
             alt="Recently installed porcelain floor tile in a Central Florida kitchen remodel"
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
    <span class="trust-bar-item">Materials Included Pricing</span>
    <span class="trust-bar-item">Flexible Payment Plans</span>
    <span class="trust-bar-item pt">Falamos Português</span>
    <span class="trust-bar-item">Fully Insured</span>
  </div>
</div>

<!-- ================================================================
     ROUND-PHOTO SERVICE ICONS
     ================================================================ -->
<section id="flooring">
  <div class="section-inner">
    <div class="section-head" style="text-align:center; margin-bottom:clamp(40px,7vw,64px);">
      <span class="eyebrow">Clean, modern floors — without the showroom markup</span>
      <h2 class="section-title" style="margin-left:auto;margin-right:auto;">What we install.</h2>
    </div>

    <div class="round-services">
      <div class="round-service">
        <div class="photo" style="background-image:url('https://newdesignpro.pplx.app/assets/lvp-livingroom-md-v18.jpg');"></div>
        <h3>Vinyl / LVP</h3>
        <p>Waterproof, scratch-resistant plank supplied &amp; installed from $4.99/sqft.</p>
      </div>
      <div class="round-service">
        <div class="photo" style="background-image:url('/assets/tile-bath-md.jpg');"></div>
        <h3>Tile</h3>
        <p>Floor tile, shower walls, backsplash — porcelain, ceramic, large format.</p>
      </div>
      <div class="round-service">
        <div class="photo" style="background-image:url('https://newdesignpro.pplx.app/assets/carpentry-new-md.webp');"></div>
        <h3>Carpentry &amp; Trim</h3>
        <p>Baseboards, casing, crown, doors, built-ins. Finish carpentry that looks intentional.</p>
      </div>
      <div class="round-service">
        <div class="photo" style="background-image:url('https://newdesignpro.pplx.app/assets/bathroom-new-md.webp');"></div>
        <h3>Bathroom Redesign</h3>
        <p>Tile, vanity swap, fixture upgrades and full cosmetic refresh.</p>
      </div>
      <div class="round-service">
        <div class="photo" style="background-image:url('https://newdesignpro.pplx.app/assets/kitchen-new-md.webp');"></div>
        <h3>Kitchen Redesign</h3>
        <p>Backsplash, flooring, cabinet refresh and finish work that transforms the space.</p>
      </div>
    </div>


  </div>
</section>

<!-- ================================================================
     LVP PRICING — Trump Card
     ================================================================ -->
<section id="tile-pricing">
  <div class="section-inner">
    <span class="eyebrow">Flooring pricing · transparent, no games</span>
    <h2 class="section-title">Pick your floor, <em>see the price</em>.</h2>
    <p class="section-lede">Every job priced per square foot. Next-day start available. Stairs $90/step. Free in-home measure.</p>

    <!-- Flooring type toggle: LVP inline (default), Tile switches to inline preview + links to full /tile page -->
    <div class="floor-toggle" role="tablist" aria-label="Choose flooring type">
      <button class="floor-tab" role="tab" aria-selected="false" data-target="tiers-lvp" onclick="window.location.href='/#lvp-pricing'">Luxury Vinyl Plank</button>
      <button class="floor-tab is-active" role="tab" aria-selected="true" data-target="tiers-tile">Tile</button>
    </div>

    <!-- LVP tiers (ascending: $4.99 → $5.99 → $6.99 → Labor Only) -->
    <div class="price-tiers is-hidden" id="tiers-lvp" role="tabpanel" aria-hidden="true">
      <div class="tier">
        <div class="tier-name">Entry Supplied</div>
        <div class="tier-price"><span class="amount">$4.99</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">Budget-friendly 12-mil LVP + install. Quarter-round trim only.</p>
        <ul>
          <li>Entry-level 12-mil LVP with 5mm SPC core</li>
          <li>Standard install over existing subfloor</li>
          <li>Quarter-round trim at wall base</li>
          <li>Cleanup &amp; haul-away</li>
        </ul>
        <a class="btn btn-tier" href="/#contact" data-tier="entry">Book entry</a>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier featured">
        <div class="tier-badge">Most Popular</div>
        <div class="tier-name">Standard Supplied</div>
        <div class="tier-price"><span class="amount">$5.99</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">20-mil distributor-select LVP with 5mm SPC core. Includes carpet demo + baseboard replacement.</p>
        <ul>
          <li>20-mil distributor-select LVP with 5mm SPC core</li>
          <li>Existing carpet demo &amp; haul-away</li>
          <li>Minor subfloor prep</li>
          <li>New baseboards installed</li>
          <li>Full cleanup</li>
        </ul>
        <a class="btn btn-tier" href="/#contact" data-tier="standard">Get a free measure</a>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier">
        <div class="tier-name">Premium Supplied</div>
        <div class="tier-price"><span class="amount">$6.99</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">20-mil surface + 6mm SPC core. Full manufacturer-spec install with documented flatness + moisture readings and written walkthroughs — the paper trail that keeps the 15-year warranty valid.</p>
        <ul>
          <li>Everything in the $5.99 tier</li>
          <li>Upgraded 6mm SPC core (quieter underfoot, better dent resistance)</li>
          <li>Documented flatness check (3/16&quot; over 10ft, per manufacturer spec)</li>
          <li>Documented moisture reading before install</li>
          <li>Written pre-install &amp; final walkthroughs</li>
          <li>Warranty-protection job file kept on record</li>
        </ul>
        <a class="btn btn-tier" href="/#contact" data-tier="premium">Book premium</a>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier">
        <div class="tier-name">Labor Only</div>
        <div class="tier-price"><span class="amount">Quoted</span><span class="unit">in-home</span></div>
        <p class="tier-desc">You supply the LVP. We install it. Labor pricing given after we walk the space.</p>
        <ul>
          <li>Professional installation</li>
          <li>Quarter-round or baseboard reset (per scope)</li>
          <li>Minor subfloor prep</li>
          <li>Cleanup &amp; haul-away</li>
        </ul>
        <a class="btn btn-tier" href="/#contact" data-tier="labor">Book labor-only</a>
        <p class="tier-note">Final labor rate confirmed after in-home measurement.</p>
      </div>
    </div>

    <!-- Tile tiers -->
    <div class="price-tiers" id="tiers-tile" role="tabpanel">
      <div class="tier featured">
        <div class="tier-badge">Starting</div>
        <div class="tier-name">Floor Tile Installed</div>
        <div class="tier-price"><span class="amount">$7.99</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">Installed price for tile supplied through New Design Pro via Rios Floor.</p>
        <ul>
          <li>Tile supplied via our Rios Floor catalog</li>
          <li>Thinset + grout</li>
          <li>Backer board on wood subfloor</li>
          <li>Straight or brick-pattern layout</li>
          <li>Cleanup &amp; haul-away</li>
        </ul>
        <a class="btn btn-tier" href="#contact" data-tier="tile-floor">Get a free measure</a>
        <div class="tier-scope">
          Rate covers installation of tile from our Rios Floor catalog.
          Customer-supplied tile is quoted separately.
          If the subfloor needs floating (self-leveling), that work is priced based on subfloor condition after inspection.
        </div>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier">
        <div class="tier-name">Shower / Backsplash</div>
        <div class="tier-price"><span class="amount">Quoted</span><span class="unit">in-home</span></div>
        <p class="tier-desc">Shower walls, backsplashes, large-format, mosaics — priced after we see the space.</p>
        <ul>
          <li>Waterproofing (Schluter or equivalent)</li>
          <li>Large-format &amp; mosaic layouts</li>
          <li>Herringbone, chevron, custom patterns</li>
          <li>Niches, benches, curbs</li>
        </ul>
        <a class="btn btn-tier" href="#contact" data-tier="tile-wall">Book a walkthrough</a>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier">
        <div class="tier-name">Labor Only</div>
        <div class="tier-price"><span class="amount">Quoted</span><span class="unit">in-home</span></div>
        <p class="tier-desc">You supply the tile, thinset, and grout. We install.</p>
        <ul>
          <li>Professional installation</li>
          <li>Layout planning</li>
          <li>Backer board (if needed)</li>
          <li>Cleanup</li>
        </ul>
        <a class="btn btn-tier" href="#contact" data-tier="tile-labor">Book labor-only</a>
        <p class="tier-note">Final labor rate confirmed after in-home measurement.</p>
      </div>

      <div class="tier" style="grid-column: 1 / -1; text-align: center; background: transparent; border-color: rgba(255,255,255,0.06);">
        <a class="tile-cta-link" href="/#lvp-pricing" style="font-size: 15px;">
          Looking for LVP? See our luxury vinyl plank pricing
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>
      </div>
    </div>

    <div class="pricing-fine">
      <div><strong>Stairs</strong>$90 per step (includes riser + tread)</div>
      <div><strong>Next-day start</strong>Available on most jobs</div>
      <div><strong>Deposit</strong>50% down · balance at completion</div>
      <div><strong>Free measure</strong>On-site quote within 24 hours in Central FL</div>
    </div>
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
            <option value="lvp-supplied">LVP install — you supply materials ($4.99–$6.99)</option>
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
          priceFrom: PRICING.tileFrom,
          priceDescription: 'Floor tile supplied and installed from $7.99/sqft',
        })}
      />
      <JsonLd data={faqPageSchema(TILE_FAQS, '/tile')} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Tile installation', path: '/tile' }])} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      
    </>
  );
}
