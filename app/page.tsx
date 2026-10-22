import type { Metadata } from 'next';
import Script from 'next/script';
import { BUSINESS_PHONE } from '@/lib/site';
import { siteFooterHtml } from '@/lib/chrome';
import JsonLd from '@/components/JsonLd';
import { faqPageSchema } from '@/lib/schema';
import { HOME_FAQS } from '@/data/faqs';
import { PROJECTS } from '@/data/projects';
import { projectCatalogHtml } from '@/lib/projectHtml';
import { v6AreasHtml, v6ColorsHtml, v6FaqHtml, v6FinalHtml, v6HeroHtml, v6PackagesHtml, v6ReviewsHtml, v6StepsHtml } from '@/lib/homeV6';

export const metadata: Metadata = {
  description:
    'LVP supplied & installed from $4.99/sqft in Davenport, Kissimmee and nearby Polk & Osceola towns. Tile quoted after a free measure. Written quote in 24 hours.',
  title: { absolute: 'LVP Flooring Installation, Davenport & Kissimmee FL | New Design Pro' },
  alternates: { canonical: '/' },
};

const HOMEPAGE_HTML = `



<!-- ================================================================
     HEADER / NAV
     ================================================================ -->
<header class="site-header">
  <a class="brand-mark" href="#top" aria-label="New Design Pro home">
    <svg class="logo-mark" viewBox="297 191 943 414" width="91" height="40" aria-hidden="true" focusable="false"><path fill="currentColor" d="M317.0 436.0V191.0H393.9L534.9 340.1H499.3V191.0H590.4V436.0H513.5L372.5 286.9H408.1V436.0ZM627.7 436.0V191.0H764.4Q810.7 191.0 846.0 205.9Q881.3 220.8 901.1 248.1Q920.9 275.4 920.9 313.5Q920.9 351.3 901.1 378.8Q881.3 406.2 846.0 421.1Q810.7 436.0 764.4 436.0ZM721.2 371.6H760.4Q780.2 371.6 795.1 365.0Q809.9 358.3 818.3 345.2Q826.6 332.1 826.6 313.5Q826.6 294.6 818.3 281.7Q809.9 268.7 795.1 262.1Q780.2 255.4 760.4 255.4H721.2ZM947.1 436.0V191.0H1080.6Q1119.4 191.0 1147.8 202.2Q1176.1 213.4 1191.5 234.2Q1207.0 255.1 1207.0 283.4Q1207.0 311.8 1191.5 332.4Q1176.1 353.1 1147.8 364.4Q1119.4 375.8 1080.6 375.8H999.0L1040.6 340.4V436.0ZM1040.6 349.6 999.0 312.1H1074.6Q1094.1 312.1 1103.4 304.4Q1112.7 296.7 1112.7 283.4Q1112.7 270.1 1103.4 262.4Q1094.1 254.7 1074.6 254.7H999.0L1040.6 217.2Z"/><path fill="#DA5626" d="M328,461 L763.7,461 L735.7,527 L300,527 ZM772.7,461 L1038,461 L1010,527 L744.7,527 ZM445,538 L679.0,538 L651.0,605 L417,605 ZM688.0,538 L1240,538 L1212,605 L660.0,605 Z"/></svg>
    <span>
      <span class="brand-name">New Design Pro</span>
      <span class="brand-sub">Flooring &amp; Remodeling</span>
    </span>
  </a>

  <!-- CSS-only mobile menu toggle (no JS — safe inside Wix embed) -->
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true" />
  <label class="nav-backdrop" for="nav-toggle" aria-hidden="true"></label>
  <label class="nav-burger" for="nav-toggle"><span class="sr-only">Toggle menu</span>
    <svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
    <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
  </label>
  <nav class="nav-links" aria-label="Primary">
    <a href="#top">Home</a>
    <div class="nav-dd" data-nav-dd>
      <button type="button" class="nav-dd-trigger" aria-haspopup="true" aria-expanded="false">
        Flooring
        <svg class="caret" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="5,8 10,13 15,8"/></svg>
      </button>
      <div class="nav-dd-menu" role="menu">
        <a href="#lvp-pricing" data-open-lvp="1" role="menuitem">Luxury Vinyl Plank</a>
        <a href="/tile" role="menuitem">Tile</a>
      </div>
    </div>
    <a href="/reviews">Reviews</a>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a class="nav-refer" href="/form">Get a quote</a>
    <a href="#footer">Contact</a>
  </nav>

  <div class="nav-right">
    <a class="cta-phone" href="tel:${BUSINESS_PHONE.e164}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span class="cta-label" data-phone-display="${BUSINESS_PHONE.display}" data-phone-short="${BUSINESS_PHONE.short}">Call ${BUSINESS_PHONE.display}</span>
    </a>
  </div>
</header>

${v6HeroHtml()}
${v6PackagesHtml()}
${v6ColorsHtml()}

<!-- ================================================================
     PROJECT CATALOG: one card per real job (data/projects.ts)
     ================================================================ -->
<section id="project-catalog">
  <div class="section-inner">
    <div class="section-head" style="text-align:center; margin-bottom:clamp(28px,5vw,44px);">
      <span class="eyebrow">Real jobs, real photos</span>
      <h2 class="section-title" style="margin-left:auto;margin-right:auto;">What we've <em>done lately</em>.</h2>
      <p class="section-lede" style="margin-left:auto;margin-right:auto;">Floors, showers, summer kitchens and more around Central Florida. Tap a job to see how we built it, step by step.</p>
    </div>
    <div class="tile-gallery-grid">
      ${projectCatalogHtml(PROJECTS)}
    </div>
    <div class="lvp-color-cta">
      <a class="btn btn-primary" href="/projects">See all projects</a>
    </div>
  </div>
</section>
${v6StepsHtml()}
${v6ReviewsHtml()}
${v6AreasHtml()}


<!-- ================================================================
     TILE GALLERY — added Aug 11, 2026
     ================================================================ -->
<section id="tile-gallery">
  <div class="section-inner">
    <div class="section-head" style="text-align:center; margin-bottom:clamp(28px,5vw,44px);">
      <span class="eyebrow">Tile installs — recent Central Florida jobs</span>
      <h2 class="section-title" style="margin-left:auto;margin-right:auto;">Tile that <em>lasts twenty years</em>.</h2>
      <p class="section-lede" style="margin-left:auto;margin-right:auto;">Kitchens, showers, floors, backsplashes. Waterproofed the right way, cut clean, and grouted straight. Six of our recent tile installs.</p>
    </div>

    <div class="tile-gallery-grid">
      <figure class="tile-card">
        <picture>
          <source type="image/webp" srcset="/assets/gallery/tile-1-kitchen-porcelain-md.webp 800w, /assets/gallery/tile-1-kitchen-porcelain-lg.webp 1600w" sizes="(min-width:900px) 33vw, 100vw" />
          <img src="/assets/gallery/tile-1-kitchen-porcelain-md.jpg" srcset="/assets/gallery/tile-1-kitchen-porcelain-md.jpg 800w, /assets/gallery/tile-1-kitchen-porcelain-lg.jpg 1600w" sizes="(min-width:900px) 33vw, 100vw" alt="Large-format light gray porcelain floor tile in a modern kitchen" loading="lazy" />
        </picture>
        <figcaption>
          <div class="tc-title">Kitchen — Large-format porcelain</div>
          <div class="tc-meta">24 &times; 48 in &middot; light gray &middot; rectified edge</div>
        </figcaption>
      </figure>

      <figure class="tile-card">
        <picture>
          <source type="image/webp" srcset="/assets/gallery/tile-2-shower-marble-look-md.webp 800w, /assets/gallery/tile-2-shower-marble-look-lg.webp 1600w" sizes="(min-width:900px) 33vw, 100vw" />
          <img src="/assets/gallery/tile-2-shower-marble-look-md.jpg" srcset="/assets/gallery/tile-2-shower-marble-look-md.jpg 800w, /assets/gallery/tile-2-shower-marble-look-lg.jpg 1600w" sizes="(min-width:900px) 33vw, 100vw" alt="Marble-look porcelain shower with black fixtures and teak bench" loading="lazy" />
        </picture>
        <figcaption>
          <div class="tc-title">Shower — Marble-look porcelain</div>
          <div class="tc-meta">Waterproofed with Schluter &middot; frameless glass</div>
        </figcaption>
      </figure>

      <figure class="tile-card">
        <picture>
          <source type="image/webp" srcset="/assets/gallery/tile-3-herringbone-wood-look-md.webp 800w, /assets/gallery/tile-3-herringbone-wood-look-lg.webp 1600w" sizes="(min-width:900px) 33vw, 100vw" />
          <img src="/assets/gallery/tile-3-herringbone-wood-look-md.jpg" srcset="/assets/gallery/tile-3-herringbone-wood-look-md.jpg 800w, /assets/gallery/tile-3-herringbone-wood-look-lg.jpg 1600w" sizes="(min-width:900px) 33vw, 100vw" alt="Herringbone wood-look porcelain floor tile in a modern entryway" loading="lazy" />
        </picture>
        <figcaption>
          <div class="tc-title">Entryway — Herringbone wood-look</div>
          <div class="tc-meta">Porcelain plank &middot; tight grout lines</div>
        </figcaption>
      </figure>

      <figure class="tile-card">
        <picture>
          <source type="image/webp" srcset="/assets/gallery/tile-4-backsplash-subway-md.webp 800w, /assets/gallery/tile-4-backsplash-subway-lg.webp 1600w" sizes="(min-width:900px) 33vw, 100vw" />
          <img src="/assets/gallery/tile-4-backsplash-subway-md.jpg" srcset="/assets/gallery/tile-4-backsplash-subway-md.jpg 800w, /assets/gallery/tile-4-backsplash-subway-lg.jpg 1600w" sizes="(min-width:900px) 33vw, 100vw" alt="Vertical stacked white subway tile kitchen backsplash" loading="lazy" />
        </picture>
        <figcaption>
          <div class="tc-title">Backsplash — Stacked subway</div>
          <div class="tc-meta">3 &times; 12 in glossy &middot; vertical layout</div>
        </figcaption>
      </figure>

      <figure class="tile-card">
        <picture>
          <source type="image/webp" srcset="/assets/gallery/tile-5-hex-mosaic-bathroom-md.webp 800w, /assets/gallery/tile-5-hex-mosaic-bathroom-lg.webp 1600w" sizes="(min-width:900px) 33vw, 100vw" />
          <img src="/assets/gallery/tile-5-hex-mosaic-bathroom-md.jpg" srcset="/assets/gallery/tile-5-hex-mosaic-bathroom-md.jpg 800w, /assets/gallery/tile-5-hex-mosaic-bathroom-lg.jpg 1600w" sizes="(min-width:900px) 33vw, 100vw" alt="Warm gray hexagon mosaic floor tile in a spa-like bathroom" loading="lazy" />
        </picture>
        <figcaption>
          <div class="tc-title">Bathroom floor — Hex mosaic</div>
          <div class="tc-meta">Warm gray penny-hex &middot; matte finish</div>
        </figcaption>
      </figure>

      <figure class="tile-card">
        <picture>
          <source type="image/webp" srcset="/assets/gallery/tile-6-living-large-format-md.webp 800w, /assets/gallery/tile-6-living-large-format-lg.webp 1600w" sizes="(min-width:900px) 33vw, 100vw" />
          <img src="/assets/gallery/tile-6-living-large-format-md.jpg" srcset="/assets/gallery/tile-6-living-large-format-md.jpg 800w, /assets/gallery/tile-6-living-large-format-lg.jpg 1600w" sizes="(min-width:900px) 33vw, 100vw" alt="Sand-toned large-format porcelain floor tile in an open Florida living room" loading="lazy" />
        </picture>
        <figcaption>
          <div class="tc-title">Living room — Sand porcelain</div>
          <div class="tc-meta">24 &times; 48 in &middot; open-plan indoor/outdoor</div>
        </figcaption>
      </figure>
    </div>

    <div class="lvp-color-cta">
      <a class="btn btn-primary" href="/form">
        Get a free in-home measure
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
      <p class="lvp-color-note">Every tile job includes waterproofing where it belongs — Schluter or equivalent on showers, proper prep on floors. Nothing gets skipped.</p>
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
        Refer a friend
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

${v6FaqHtml()}

${v6FinalHtml()}

<!-- ================================================================
     CONTACT
     ================================================================ -->
<section id="contact">
  <div class="section-inner">
    <div class="contact-layout">
      <div class="contact-info">
        <span class="eyebrow">Free measure, no hard sell</span>
        <h2 class="section-title">Ready to <em>book a walkthrough?</em></h2>
        <p class="section-lede">Text is fastest. We'll come by, measure the space, and send a written quote within 24 hours. Free — no obligation.</p>

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

        <div class="form-success">Got it — we'll text you within the hour to schedule the free measure.</div>
        <div class="form-error">Something went wrong. Please text ${BUSINESS_PHONE.display} instead.</div>
        <div class="form-validation-error" role="alert" style="display:none;color:#b03a2e;background:#fdecea;padding:10px 12px;border-radius:6px;margin:8px 0;font-size:14px;"></div>

        <!-- honeypot: real users don't see or fill this -->
        <div aria-hidden="true" style="position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;">
          <label for="company_website">Website (leave blank)</label>
          <input type="text" id="company_website" name="company_website" tabindex="-1" autocomplete="off" />
        </div>

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


export default function HomePage() {
  return (
    <>
      <JsonLd data={faqPageSchema(HOME_FAQS, '/')} />
      <div className="home-v6" dangerouslySetInnerHTML={{ __html: HOMEPAGE_HTML }} />
      <Script src="/homepage-interactive.js" strategy="afterInteractive" />
      <Script src="/v6-picker.js" strategy="afterInteractive" />
    </>
  );
}
