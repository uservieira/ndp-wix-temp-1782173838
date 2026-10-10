import type { Metadata } from 'next';
import Script from 'next/script';
import { BUSINESS_PHONE, CLAIMS, SUPPLIER } from '@/lib/site';
import { serviceAreasHtml, reviewStripHtml, siteFooterHtml } from '@/lib/chrome';
import { duralastSectionHtml, lvpTiersHtml, PRICING_LEDE, pricingFineHtml, priceText, tierByKey, tileTiersHtml } from '@/lib/pricingHtml';
import { DURALAST_COLLECTIONS } from '@/data/duralast';

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

<!-- ================================================================
     HERO — Bold contractor, refined (Oct 2026)
     ================================================================ -->
<section class="hv2-hero" id="top">
  <div class="hv2-hl">
    <div class="hv2-kick">${SUPPLIER.name} LVP · Central Florida</div>
    <h1>New floors.<em>Real prices.</em>No games.</h1>
    <p class="hv2-lede">Supplied and installed by a family-run crew. The price you see is the price per square foot.</p>
    <div class="hv2-ladder" aria-label="LVP package prices per square foot">
      <a href="#lvp-pricing"><small>${tierByKey('entry').name}</small><b>${priceText('entry')}</b></a>
      <a href="#lvp-pricing" class="pop"><small>${tierByKey('standard').name}</small><b>${priceText('standard')}</b></a>
      <a href="#lvp-pricing"><small>${tierByKey('premium').name}</small><b>${priceText('premium')}</b></a>
    </div>
    <div class="hv2-ladnote">Per sq ft, supplied and installed.</div>
    <div class="hv2-ctas">
      <a class="hv2-btn" href="/form">Get my price</a>
      <a class="hv2-btn ghost" href="tel:${BUSINESS_PHONE.e164}">Call now</a>
    </div>
  </div>
  <div class="hv2-photo">
    <picture>
      <source type="image/webp" srcset="/assets/duralast/v-evo-xl/caramel-room-md.webp?v=2 800w, /assets/duralast/v-evo-xl/caramel-room-lg.webp?v=2 1400w" sizes="(min-width: 900px) 60vw, 100vw" />
      <img src="/assets/duralast/v-evo-xl/caramel-room-md.jpg?v=2" width="800" height="534" alt="Caramel ${SUPPLIER.name} V-EVO XL luxury vinyl plank in a bright living room" fetchpriority="high" />
    </picture>
    <span class="hv2-tag">V-EVO XL · Caramel · Room preview</span>
  </div>
</section>

<div class="hv2-proof">
  <div><b>10+ yrs</b>Family-run</div>
  <div><b>Insured</b>COI on request</div>
  <div><b>${DURALAST_COLLECTIONS.reduce((n, c) => n + c.colors.length, 0)}</b>${SUPPLIER.name} colors</div>
  <div><b>24 hr</b>Written quote</div>
</div>

<!-- ================================================================
     REVIEWS (moved up, right under the hero)
     ================================================================ -->
${reviewStripHtml({ eyebrow: 'Google reviews', title: 'Words from <em>real jobs.</em>' })}

<!-- ================================================================
     HOW IT WORKS
     ================================================================ -->
<section class="hv2-steps" id="how-it-works">
  <div class="section-inner">
    <span class="eyebrow">How it works</span>
    <h2 class="section-title">Three steps to <em>new floors.</em></h2>
    <ol class="hv2-steps-grid">
      <li><span class="hv2-step-n">01</span><h3>Free in-home measure</h3><p>We come out, measure every room, check the subfloor and bring real plank samples.</p></li>
      <li><span class="hv2-step-n">02</span><h3>Written quote in 24 hours</h3><p>One price per square foot, in writing. 50% deposit to book, balance at completion.</p></li>
      <li><span class="hv2-step-n">03</span><h3>Install and cleanup</h3><p>Most homes are done in two to three days. We haul away the debris and walk the job with you.</p></li>
    </ol>
  </div>
</section>

<!-- WHAT WE INSTALL section moved BELOW LVP pricing (see #services-tabs) -->

<!-- ================================================================
     LVP PRICING — Trump Card
     ================================================================ -->
<section id="lvp-pricing">
  <div class="section-inner">
    <span class="eyebrow">Flooring pricing · transparent, no games</span>
    <h2 class="section-title">Pick your <em>package.</em></h2>
    <p class="section-lede">${PRICING_LEDE}</p>

    <!-- Flooring type toggle: LVP inline (default), Tile switches to inline preview + links to full /tile page -->
    <div class="floor-toggle" role="tablist" aria-label="Choose flooring type">
      <button class="floor-tab is-active" role="tab" aria-selected="true" data-target="tiers-lvp">Luxury Vinyl Plank</button>
      <button class="floor-tab" role="tab" aria-selected="false" data-target="tiers-tile">Tile</button>
    </div>

    ${lvpTiersHtml({ href: (k) => `/form?tier=${k}` })}

    ${tileTiersHtml({
      hidden: true,
      floorHref: '/form?tier=tile-floor',
      wallHref: '/form?tier=tile-wall',
      laborHref: '#contact',
      footerLinkHtml: `<a class="tile-cta-link" href="/#lvp-pricing" data-open-tile="1" style="font-size: 15px;">
          See the full tile page — scope, gallery, process
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </a>`,
    })}

    ${pricingFineHtml()}
  </div>
</section>

${duralastSectionHtml()}

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
     WHAT WE INSTALL (6 tabs, below LVP pricing per Daniel's spec)
     ================================================================ -->
<section id="services-tabs">
  <div class="section-inner">
    <div class="section-head" style="text-align:center; margin-bottom:clamp(32px,6vw,52px);">
      <span class="eyebrow">Clean, modern spaces — without the showroom markup</span>
      <h2 class="section-title" style="margin-left:auto;margin-right:auto;">What we install.</h2>
      <p class="section-lede" style="margin-left:auto;margin-right:auto;">Tap any service to see the details.</p>
    </div>

    <div class="svc-tabs" role="tablist" aria-label="What we install">
      <button class="svc-tab is-active" role="tab" data-target="svc-lvp" aria-selected="true">Luxury Vinyl Plank</button>
      <button class="svc-tab" role="tab" data-target="svc-tile" aria-selected="false">Tile</button>
      <button class="svc-tab" role="tab" data-target="svc-bath" aria-selected="false">Bathroom Remodel</button>
      <button class="svc-tab" role="tab" data-target="svc-kitchen" aria-selected="false">Kitchen Remodel</button>
      <button class="svc-tab" role="tab" data-target="svc-carp" aria-selected="false">Carpentry</button>
      <button class="svc-tab" role="tab" data-target="svc-paint" aria-selected="false">Interior Paint</button>
    </div>

    <div class="svc-panels">
      <article class="svc-panel is-active" id="svc-lvp" role="tabpanel">
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/lvp-livingroom-md-v19.jpg');"></div>
        <div class="svc-body">
          <h3>Luxury Vinyl Plank</h3>
          <p class="svc-price">Supplied &amp; installed from $4.99/sqft &middot; Labor-only quoted in-home</p>
          <p class="svc-desc">Waterproof, pet-friendly, kid-proof floors. 12-mil, 20-mil, and premium 6mm core options. See the full LVP pricing table above.</p>
          <a class="btn btn-outline" href="#lvp-pricing">See LVP pricing</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-tile" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/tile-carrara-md.jpg');"></div>
        <div class="svc-body">
          <h3>Tile</h3>
          <p class="svc-price">Floor tile, showers &amp; backsplashes quoted after a free in-home measure</p>
          <p class="svc-desc">Porcelain, ceramic, large-format, mosaics, herringbone, chevron. Waterproofed showers with Schluter or equivalent. See the full tile page for scope, gallery, and process.</p>
          <a class="btn btn-outline" href="/#lvp-pricing" data-open-tile="1">See the tile page</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-bath" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/bathroom-new-md.webp');"></div>
        <div class="svc-body">
          <h3>Bathroom Remodel</h3>
          <p class="svc-price">Quoted after in-home walkthrough</p>
          <p class="svc-desc">Tile shower walls, waterproofing, floor tile or LVP, trim, and paint for a full cosmetic refresh. Plumbing, electrical, or structural work is coordinated with licensed trade partners.</p>
          <a class="btn btn-outline" href="/form">Book a free measure</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-kitchen" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/kitchen-new-md.webp');"></div>
        <div class="svc-body">
          <h3>Kitchen Remodel</h3>
          <p class="svc-price">Quoted after in-home walkthrough</p>
          <p class="svc-desc">Backsplash, floor tile or LVP, painted cabinet refresh, and finish carpentry that transforms the space. Plumbing, electrical, or structural work is coordinated with licensed trade partners.</p>
          <a class="btn btn-outline" href="/form">Book a free measure</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-carp" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/carpentry-slatwall-md.jpg');"></div>
        <div class="svc-body">
          <h3>Carpentry</h3>
          <p class="svc-price">Quoted per project</p>
          <p class="svc-desc">Baseboards, casing, crown moulding, door trim, built-ins, and interior door installs. Clean lines, tight miters, caulked and paint-ready.</p>
          <a class="btn btn-outline" href="/form">Book a free measure</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-paint" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/paint-roller-md.jpg');"></div>
        <div class="svc-body">
          <h3>Interior Paint</h3>
          <p class="svc-price">Quoted per room or per project</p>
          <p class="svc-desc">Interior walls, ceilings, trim, and doors. Prep, patch, prime, and finish. Clean cut-lines at ceilings and trim.</p>
          <a class="btn btn-outline" href="/form">Book a free measure</a>
        </div>
      </article>
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
        Refer a friend
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
    </div>
  </div>
</section>

${serviceAreasHtml('section')}

<!-- ================================================================
     CLOSING CTA BAND
     ================================================================ -->
<section class="hv2-final">
  <div class="section-inner">
    <h2>Ready for <em>new floors?</em></h2>
    <p>Free in-home measure. Written quote in 24 hours.</p>
    <div class="hv2-ctas">
      <a class="hv2-btn light" href="tel:${BUSINESS_PHONE.e164}">Call ${BUSINESS_PHONE.display}</a>
      <a class="hv2-btn dark" href="/form">Get my price</a>
    </div>
  </div>
</section>

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
      <div className="home-v2" dangerouslySetInnerHTML={{ __html: HOMEPAGE_HTML }} />
      <Script src="/homepage-interactive.js" strategy="afterInteractive" />
    </>
  );
}
