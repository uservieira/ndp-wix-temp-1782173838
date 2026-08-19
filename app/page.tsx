import Script from 'next/script';

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
        <a href="#lvp-pricing" data-open-tile="1" role="menuitem">Tile</a>
      </div>
    </div>
    <a href="/blog">Blog</a>
    <a href="/about">About</a>
    <a class="nav-refer" href="#contact">Get a quote</a>
    <a href="#footer">Contact</a>
  </nav>

  <div class="nav-right">
    <a class="cta-phone" href="tel:+15618093864">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span class="cta-label">Call (561) 809-3864</span>
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
        <span class="hero-eyebrow">Central Florida · Insured</span>
        <h1>Luxury vinyl plank, <em>installed right</em>.</h1>
        <p class="lede">Supplied &amp; installed from <strong>$4.99/sqft</strong>. Next-day start available. 50% deposit. Free in-home measure.</p>
        <div class="hero-cta-row">
          <a class="btn btn-primary" href="#lvp-pricing">
            See LVP pricing
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <a class="btn btn-ghost" href="#contact">Get a free measure</a>
        </div>
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="num">$4.99<small>/sqft</small></span>
            <span class="label">Starting price</span>
          </div>
          <div class="hero-stat">
            <span class="num">Next-day<small>start</small></span>
            <span class="label">Most jobs</span>
          </div>
          <div class="hero-stat">
            <span class="num">50<small>%</small></span>
            <span class="label">Deposit</span>
          </div>
        </div>
      </div>
      <div class="hero-image-wrap">
        <img src="/assets/lvp-livingroom-md-v19.jpg"
             srcset="/assets/lvp-livingroom-md-v19.jpg 1200w, assets/lvp-livingroom-lg-v19.jpg 2400w"
             sizes="(min-width: 900px) 45vw, 100vw"
             alt="Warm natural oak LVP flooring in a bright Central Florida living room"
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
    <span class="trust-bar-item">10+ Years Experience</span>
    <span class="trust-bar-item">Materials Included Pricing</span>
    <span class="trust-bar-item">Flexible Payment Plans</span>
    <span class="trust-bar-item pt">Falamos Português</span>
    <span class="trust-bar-item es">Hablamos Español</span>
  </div>
</div>

<!-- WHAT WE INSTALL section moved BELOW LVP pricing (see #services-tabs) -->

<!-- ================================================================
     LVP PRICING — Trump Card
     ================================================================ -->
<section id="lvp-pricing">
  <div class="section-inner">
    <span class="eyebrow">Flooring pricing · transparent, no games</span>
    <h2 class="section-title">Pick your floor, <em>see the price</em>.</h2>
    <p class="section-lede">Every job priced per square foot. Next-day start available. Stairs $90/step. Free in-home measure.</p>

    <!-- Flooring type toggle: LVP inline (default), Tile switches to inline preview + links to full /tile page -->
    <div class="floor-toggle" role="tablist" aria-label="Choose flooring type">
      <button class="floor-tab is-active" role="tab" aria-selected="true" data-target="tiers-lvp">Luxury Vinyl Plank</button>
      <button class="floor-tab" role="tab" aria-selected="false" data-target="tiers-tile">Tile</button>
    </div>

    <!-- LVP tiers (ascending: $4.99 → $5.99 → $6.99 → Labor Only) -->
    <div class="price-tiers" id="tiers-lvp" role="tabpanel">
      <div class="tier">
        <div class="tier-name">Entry Supplied</div>
        <div class="tier-price"><span class="amount">$4.99</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">Budget-friendly 12-mil LVP + full install.</p>
        <ul>
          <li>12-mil wear layer LVP</li>
          <li>5mm plank core</li>
          <li>Standard install</li>
          <li>Quarter round added at wall base</li>
        </ul>
        <a class="btn btn-tier" href="#contact" data-tier="entry">Book entry</a>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier featured">
        <div class="tier-badge">Most Popular</div>
        <div class="tier-name">Standard Supplied</div>
        <div class="tier-price"><span class="amount">$5.99</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">Distributor-select LVP with 20-mil wear layer.</p>
        <ul>
          <li>20-mil wear layer LVP</li>
          <li>5mm plank core</li>
          <li>Baseboard replacement included</li>
          <li>Carpet demo &amp; haul-away included</li>
          <li>Minor subfloor prep</li>
        </ul>
        <a class="btn btn-tier" href="#contact" data-tier="standard">Get a free measure</a>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier">
        <div class="tier-name">Premium Supplied</div>
        <div class="tier-price"><span class="amount">$6.99</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">Same 20-mil surface, thicker 6mm core, documented warranty-safe install.</p>
        <ul>
          <li>20-mil wear layer LVP</li>
          <li><strong>6mm plank core</strong> (thicker, quieter, more rigid)</li>
          <li>Everything in the $5.99 tier</li>
          <li>Documented flatness check (3/16&quot; over 10 ft, per manufacturer spec)</li>
          <li>Documented moisture reading on concrete slabs</li>
          <li>Written pre-install walkthrough &amp; final walkthrough</li>
          <li>Job file kept on record to protect your manufacturer warranty</li>
        </ul>
        <a class="btn btn-tier" href="#contact" data-tier="premium">Book premium</a>
        <p class="tier-note">Final price confirmed after in-home measurement. No underlayment under click-lock LVP — most manufacturers void warranty when it's added.</p>
      </div>

      <div class="tier">
        <div class="tier-name">Labor Only</div>
        <div class="tier-price"><span class="amount">Quoted</span><span class="unit">in-home</span></div>
        <p class="tier-desc">You supply the LVP. We install it. Labor pricing given after we walk the space.</p>
        <ul>
          <li>Professional installation</li>
          <li>Baseboards &amp; transitions</li>
          <li>Subfloor prep &amp; cleanup</li>
        </ul>
        <a class="btn btn-tier" href="#contact" data-tier="labor">Book labor-only</a>
        <p class="tier-note">Final labor rate confirmed after in-home measurement.</p>
      </div>
    </div>

    <!-- Tile tiers -->
    <div class="price-tiers is-hidden" id="tiers-tile" role="tabpanel" aria-hidden="true">
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
        <a class="tile-cta-link" href="/#lvp-pricing" data-open-tile="1" style="font-size: 15px;">
          See the full tile page — scope, gallery, process
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
     RIOS FLOOR LVP CAROUSEL — added Aug 12, 2026
     Replaces the 6-color mock grid with the full 16-SKU Rios catalog.
     ================================================================ -->
<section id="lvp-colors" class="rios-section">
  <div class="section-inner">
    <div class="section-head" style="text-align:center; margin-bottom:clamp(24px,4vw,40px);">
      <div class="rios-lockup" aria-label="NDP × Rios Floor">
        <img src="/assets/logo-ndp-mark-transparent.png" alt="New Design Pro" class="rios-lockup-ndp" />
        <span class="rios-lockup-x" aria-hidden="true">×</span>
        <span class="rios-lockup-rios">Rios Floor</span>
      </div>
      <span class="eyebrow">Our LVP supplier — wholesale-direct from Orlando</span>
      <h2 class="section-title" style="margin-left:auto;margin-right:auto;">All sixteen colors from the <em>2026 Rios collection</em>.</h2>
      <p class="section-lede" style="margin-left:auto;margin-right:auto;">Every plank we install is hand-picked from Rios Floor. SPC rigid core, 12 or 20 mil wear layer, 100% waterproof, click-lock install. Tap any color to see it in a real room.</p>
    </div>

    <div class="rios-toolbar">
      <div class="rios-toolbar-lead">
        <div class="rios-toolbar-title">The 2026 collection</div>
        <div class="rios-toolbar-sub">Scroll — or tap the arrows</div>
      </div>
      <div class="rios-controls">
        <button class="rios-arrow" type="button" data-dir="-1" aria-label="Previous colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>
        </button>
        <button class="rios-arrow" type="button" data-dir="1" aria-label="Next colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </button>
      </div>
    </div>

    <div class="rios-rail" id="rios-rail" role="tablist" aria-label="Rios Floor LVP colors">
      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="117" data-name="Warm Natural Oak" data-tone="warm" data-desc="Honey-toned classic oak — pairs with warm cabinets and cream walls." data-dims="7" × 48" / 9" × 60"" data-wear="12 or 20 mil" data-thickness="5 mm / 6 mm" data-slug="warm-natural-oak" aria-label="Select Warm Natural Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/117-thumb.webp 400w, /assets/rios/117-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/117-thumb.jpg" srcset="/assets/rios/117-thumb.jpg 400w, /assets/rios/117-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Warm Natural Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Warm Natural Oak</div>
          <div class="rios-card-tone">Warm</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="113" data-name="Light Walnut Oak" data-tone="warm" data-desc="Soft caramel with subtle graining — timeless and forgiving." data-dims="7" × 48"" data-wear="12 or 20 mil" data-thickness="5 mm" data-slug="light-walnut-oak" aria-label="Select Light Walnut Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/113-thumb.webp 400w, /assets/rios/113-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/113-thumb.jpg" srcset="/assets/rios/113-thumb.jpg 400w, /assets/rios/113-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Light Walnut Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Light Walnut Oak</div>
          <div class="rios-card-tone">Warm</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="109" data-name="Soft Natural Oak" data-tone="warm" data-desc="Neutral tan oak — reads clean under white kitchens." data-dims="7" × 48" / 9" × 60"" data-wear="12 or 20 mil" data-thickness="5 mm / 6 mm" data-slug="soft-natural-oak" aria-label="Select Soft Natural Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/109-thumb.webp 400w, /assets/rios/109-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/109-thumb.jpg" srcset="/assets/rios/109-thumb.jpg 400w, /assets/rios/109-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Soft Natural Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Soft Natural Oak</div>
          <div class="rios-card-tone">Warm</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="105" data-name="Warm Golden Oak" data-tone="warm" data-desc="Rich golden warmth, subtle knots — feels like real oak underfoot." data-dims="7" × 48" / 9" × 60"" data-wear="12 or 20 mil" data-thickness="5 mm / 6 mm" data-slug="warm-golden-oak" aria-label="Select Warm Golden Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/105-thumb.webp 400w, /assets/rios/105-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/105-thumb.jpg" srcset="/assets/rios/105-thumb.jpg 400w, /assets/rios/105-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Warm Golden Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Warm Golden Oak</div>
          <div class="rios-card-tone">Warm</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="101" data-name="Light Natural Oak" data-tone="warm" data-desc="Bright, airy blonde — opens up small Florida rooms." data-dims="7" × 48" / 9" × 60"" data-wear="12 or 20 mil" data-thickness="5 mm / 6 mm" data-slug="light-natural-oak" aria-label="Select Light Natural Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/101-thumb.webp 400w, /assets/rios/101-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/101-thumb.jpg" srcset="/assets/rios/101-thumb.jpg 400w, /assets/rios/101-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Light Natural Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Light Natural Oak</div>
          <div class="rios-card-tone">Warm</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="85" data-name="Rustik Honey Oak" data-tone="warm" data-desc="Rustic character, warm honey base — hides scratches from kids and dogs." data-dims="7" × 48"" data-wear="12 or 20 mil" data-thickness="5 mm" data-slug="rustik-honey-oak" aria-label="Select Rustik Honey Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/85-thumb.webp 400w, /assets/rios/85-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/85-thumb.jpg" srcset="/assets/rios/85-thumb.jpg 400w, /assets/rios/85-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Rustik Honey Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Rustik Honey Oak</div>
          <div class="rios-card-tone">Warm</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="81" data-name="Amber Oak" data-tone="warm" data-desc="Deep amber warmth — dramatic against light walls." data-dims="7" × 48"" data-wear="12 or 20 mil" data-thickness="5 mm" data-slug="amber-oak" aria-label="Select Amber Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/81-thumb.webp 400w, /assets/rios/81-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/81-thumb.jpg" srcset="/assets/rios/81-thumb.jpg 400w, /assets/rios/81-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Amber Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Amber Oak</div>
          <div class="rios-card-tone">Warm</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="61" data-name="Honey Oak" data-tone="warm" data-desc="Golden honey, medium warmth — our most-installed plank." data-dims="7" × 48" / 9" × 60"" data-wear="12 or 20 mil" data-thickness="5 mm / 6 mm" data-slug="honey-oak" aria-label="Select Honey Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/61-thumb.webp 400w, /assets/rios/61-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/61-thumb.jpg" srcset="/assets/rios/61-thumb.jpg 400w, /assets/rios/61-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Honey Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Honey Oak</div>
          <div class="rios-card-tone">Warm</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="77" data-name="Rustik Oak" data-tone="neutral" data-desc="Rustic textured oak in a mid-brown — casual and coastal." data-dims="7" × 48"" data-wear="12 or 20 mil" data-thickness="5 mm" data-slug="rustik-oak" aria-label="Select Rustik Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/77-thumb.webp 400w, /assets/rios/77-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/77-thumb.jpg" srcset="/assets/rios/77-thumb.jpg 400w, /assets/rios/77-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Rustik Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Rustik Oak</div>
          <div class="rios-card-tone">Neutral</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="89" data-name="Natural Maple Oak" data-tone="neutral" data-desc="Clean maple tones — modern, understated." data-dims="7" × 48"" data-wear="20 mil" data-thickness="5 mm" data-slug="natural-maple-oak" aria-label="Select Natural Maple Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/89-thumb.webp 400w, /assets/rios/89-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/89-thumb.jpg" srcset="/assets/rios/89-thumb.jpg 400w, /assets/rios/89-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Natural Maple Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Natural Maple Oak</div>
          <div class="rios-card-tone">Neutral</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="57" data-name="Natural Walnut Oak" data-tone="dark" data-desc="Rich walnut brown — sophisticated, works with darker cabinets." data-dims="7" × 48" / 9" × 60"" data-wear="12 or 20 mil" data-thickness="5 mm / 6 mm" data-slug="natural-walnut-oak" aria-label="Select Natural Walnut Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/57-thumb.webp 400w, /assets/rios/57-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/57-thumb.jpg" srcset="/assets/rios/57-thumb.jpg 400w, /assets/rios/57-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Natural Walnut Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Natural Walnut Oak</div>
          <div class="rios-card-tone">Dark</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="65" data-name="Silver Oak" data-tone="cool" data-desc="Cool silver-gray with soft graining — modern and calm." data-dims="7" × 48"" data-wear="12 mil" data-thickness="5 mm" data-slug="silver-oak" aria-label="Select Silver Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/65-thumb.webp 400w, /assets/rios/65-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/65-thumb.jpg" srcset="/assets/rios/65-thumb.jpg 400w, /assets/rios/65-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Silver Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Silver Oak</div>
          <div class="rios-card-tone">Cool</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="73" data-name="Light Gray Oak" data-tone="cool" data-desc="Soft dove gray — pairs with white trim and coastal palettes." data-dims="7" × 48"" data-wear="12 mil" data-thickness="5 mm" data-slug="light-gray-oak" aria-label="Select Light Gray Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/73-thumb.webp 400w, /assets/rios/73-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/73-thumb.jpg" srcset="/assets/rios/73-thumb.jpg 400w, /assets/rios/73-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Light Gray Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Light Gray Oak</div>
          <div class="rios-card-tone">Cool</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="69" data-name="Urban Gray Oak" data-tone="cool" data-desc="Deeper urban gray — contemporary with warm undertones." data-dims="7" × 48" / 9" × 60"" data-wear="12 or 20 mil" data-thickness="5 mm / 6 mm" data-slug="urban-gray-oak" aria-label="Select Urban Gray Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/69-thumb.webp 400w, /assets/rios/69-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/69-thumb.jpg" srcset="/assets/rios/69-thumb.jpg 400w, /assets/rios/69-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Urban Gray Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Urban Gray Oak</div>
          <div class="rios-card-tone">Cool</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="97" data-name="Ash Gray Oak" data-tone="cool" data-desc="Weathered ash — driftwood look, cool and bright." data-dims="7" × 48"" data-wear="20 mil" data-thickness="5 mm" data-slug="ash-gray-oak" aria-label="Select Ash Gray Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/97-thumb.webp 400w, /assets/rios/97-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/97-thumb.jpg" srcset="/assets/rios/97-thumb.jpg 400w, /assets/rios/97-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Ash Gray Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Ash Gray Oak</div>
          <div class="rios-card-tone">Cool</div>
        </div>
      </button>

      <button class="rios-card" type="button" role="tab" aria-selected="false" data-sku="93" data-name="Platinum Gray Oak" data-tone="cool" data-desc="Cool platinum with soft graining — the go-to for coastal builds." data-dims="7" × 48"" data-wear="20 mil" data-thickness="5 mm" data-slug="platinum-gray-oak" aria-label="Select Platinum Gray Oak">
        <div class="rios-card-media">
          <picture>
            <source type="image/webp" srcset="/assets/rios/93-thumb.webp 400w, /assets/rios/93-med.webp 800w" sizes="(min-width:900px) 260px, 60vw" />
            <img src="/assets/rios/93-thumb.jpg" srcset="/assets/rios/93-thumb.jpg 400w, /assets/rios/93-med.jpg 800w" sizes="(min-width:900px) 260px, 60vw" alt="Platinum Gray Oak Rios Floor LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="rios-card-meta">
          <div class="rios-card-name">Platinum Gray Oak</div>
          <div class="rios-card-tone">Cool</div>
        </div>
      </button>
    </div>

    <!-- Detail panel — updates when a card is tapped -->
    <div class="rios-detail" id="rios-detail" aria-live="polite">
      <div class="rios-detail-media">
        <picture>
          <source type="image/webp" srcset="/assets/rios/hero/lvp_117-md.webp 800w, /assets/rios/hero/lvp_117-lg.webp 1400w" sizes="(min-width:900px) 60vw, 100vw" />
          <img id="rios-detail-img" src="/assets/rios/hero/lvp_117-md.jpg" srcset="/assets/rios/hero/lvp_117-md.jpg 800w, /assets/rios/hero/lvp_117-lg.jpg 1400w" sizes="(min-width:900px) 60vw, 100vw" alt="Warm Natural Oak in a real Florida home" />
        </picture>
      </div>
      <div class="rios-detail-body">
        <div class="rios-detail-eyebrow">Rios Floor · 2026</div>
        <h3 class="rios-detail-name" id="rios-detail-name">Warm Natural Oak</h3>
        <p class="rios-detail-desc" id="rios-detail-desc">Honey-toned classic oak — pairs with warm cabinets and cream walls.</p>
        <dl class="rios-detail-specs">
          <div><dt>Dimensions</dt><dd id="rios-detail-dims">7" × 48" / 9" × 60"</dd></div>
          <div><dt>Wear layer</dt><dd id="rios-detail-wear">12 or 20 mil</dd></div>
          <div><dt>Thickness</dt><dd id="rios-detail-thickness">5 mm / 6 mm</dd></div>
          <div><dt>Core</dt><dd>SPC rigid, 100% waterproof</dd></div>
          <div><dt>Install</dt><dd>Click-lock, IXPE underlay attached</dd></div>
          <div><dt>Warranty</dt><dd>Lifetime install (NDP) + Rios manufacturer</dd></div>
        </dl>
        <div class="rios-detail-cta">
          <a class="btn btn-primary" id="rios-detail-cta-link" href="#contact" data-name="Warm Natural Oak">
            Get a quote for <span id="rios-detail-cta-name">Warm Natural Oak</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <p class="rios-detail-note">We bring physical samples of every color to your home — see them next to your walls, cabinets, and light before you decide.</p>
        </div>
      </div>
    </div>
  </div>
</section>

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
      <a class="btn btn-primary" href="#contact">
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
          <p class="svc-price">Floor tile from $7.99/sqft installed &middot; Shower &amp; backsplash quoted in-home</p>
          <p class="svc-desc">Porcelain, ceramic, large-format, mosaics, herringbone, chevron. Waterproofed showers with Schluter or equivalent. See the full tile page for scope, gallery, and process.</p>
          <a class="btn btn-outline" href="/#lvp-pricing" data-open-tile="1">See the tile page</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-bath" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/bathroom-new-md.webp');"></div>
        <div class="svc-body">
          <h3>Bathroom Remodel</h3>
          <p class="svc-price">Quoted after in-home walkthrough</p>
          <p class="svc-desc">Tile shower, vanity swap, fixture upgrades, waterproofing, floor tile or LVP, plumbing rough-in coordination, and full cosmetic refresh.</p>
          <a class="btn btn-outline" href="#contact">Book a free measure</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-kitchen" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/kitchen-new-md.webp');"></div>
        <div class="svc-body">
          <h3>Kitchen Remodel</h3>
          <p class="svc-price">Quoted after in-home walkthrough</p>
          <p class="svc-desc">Backsplash, floor tile or LVP, cabinet refresh, countertop coordination, and finish carpentry that transforms the space.</p>
          <a class="btn btn-outline" href="#contact">Book a free measure</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-carp" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/carpentry-slatwall-md.jpg');"></div>
        <div class="svc-body">
          <h3>Carpentry</h3>
          <p class="svc-price">Quoted per project</p>
          <p class="svc-desc">Baseboards, casing, crown moulding, door trim, built-ins, and interior door installs. Clean lines, tight miters, caulked and paint-ready.</p>
          <a class="btn btn-outline" href="#contact">Book a free measure</a>
        </div>
      </article>

      <article class="svc-panel" id="svc-paint" role="tabpanel" hidden>
        <div class="svc-photo" style="background-image:url('https://ndp-embed.pplx.app/assets/paint-roller-md.jpg');"></div>
        <div class="svc-body">
          <h3>Interior Paint</h3>
          <p class="svc-price">Quoted per room or per project</p>
          <p class="svc-desc">Interior walls, ceilings, trim, and doors. Prep, patch, prime, and finish. Clean cut-lines at ceilings and trim.</p>
          <a class="btn btn-outline" href="#contact">Book a free measure</a>
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
        <p>With 10+ years of experience, we specialize in flooring installation, tile, carpentry, painting, and interior renovations for homes across the Disney corridor and Central Florida.</p>
        <p>Our skilled team delivers clean, modern spaces with attention to detail — on time, on budget, and without the showroom markup.</p>
      </div>
    </div>
  </div>
</section>

<!-- ================================================================
     REVIEWS
     ================================================================ -->
<section id="reviews">
  <div class="section-inner">
    <span class="eyebrow">What Central Florida customers say</span>
    <h2 class="section-title">Words from <em>real jobs</em>.</h2>

    <div class="review-grid">
      <div class="review-card">
        <div class="stars-inline">★★★★★</div>
        <blockquote>"Daniel and his crew installed LVP throughout our whole downstairs. Clean, quick, and priced fair. The floors look better than the model home."</blockquote>
        <div class="author"><div class="avatar">J</div><div><strong>Jessica B.</strong><br/>Davenport, FL · LVP install</div></div>
      </div>
      <div class="review-card">
        <div class="stars-inline">★★★★★</div>
        <blockquote>"Got three quotes for our kitchen. New Design Pro was upfront on price, showed up when they said, and finished a day early. Would hire again."</blockquote>
        <div class="author"><div class="avatar">M</div><div><strong>Marcus T.</strong><br/>Kissimmee, FL · Kitchen remodel</div></div>
      </div>
      <div class="review-card">
        <div class="stars-inline">★★★★★</div>
        <blockquote>"They quoted a fair labor-only rate for our supplied LVP and stuck to it. No upsells, no drama, subfloor prep included. Highly recommend."</blockquote>
        <div class="author"><div class="avatar">C</div><div><strong>Christine M.</strong><br/>Winter Haven, FL · LVP labor only</div></div>
      </div>
    </div>

    <div class="review-cta">
      <a class="btn btn-ghost" href="https://search.google.com/local/writereview?placeid=ChIJ04pkC9peBq8RQI3Z0T1XETk" target="_blank" rel="noopener" data-ga-event="review_cta_click">
        Leave us a review
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15 8.5 22 9.3 17 14 18.2 21 12 17.8 5.8 21 7 14 2 9.3 9 8.5 12 2" fill="currentColor" stroke="none"/></svg>
      </a>
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
      <a class="btn btn-white" href="/refer-earn">
        Refer a friend
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </a>
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
            <dd><a href="tel:+15618093864"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>(561) 809-3864</a></dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd><a href="mailto:contact@newdesignpro.com">contact@newdesignpro.com</a></dd>
          </div>
          <div>
            <dt>Service area</dt>
            <dd>Central Florida — Davenport, Kissimmee, Winter Haven, Orlando &amp; surrounding</dd>
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
        <div class="form-error">Something went wrong. Please text (561) 809-3864 instead.</div>
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
<footer class="site-footer" id="footer">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-brand-name">New Design Pro</div>
      <p>LVP &middot; Tile &middot; Remodeling. Davenport, Orlando, and Central Florida.</p>
      <span class="footer-lang-chip">Falamos Português · Hablamos Español</span>
    </div>

    <div class="footer-col">
      <h4>Menu</h4>
      <ul class="footer-menu">
        <li><a href="#top">Home</a></li>
        <li><a href="#lvp-pricing">Flooring</a></li>

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
        <a href="https://www.instagram.com/newdesign.pro" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="https://www.facebook.com/newdesign.pro" target="_blank" rel="noopener" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://www.youtube.com/@newdesignpro" target="_blank" rel="noopener" aria-label="YouTube">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg>
        </a>
      </div>
    </div>
  </div>

  <div class="footer-legal">
    © <span id="year"></span> New Design Pro · Huios Construction LLC · Central Florida · Fully insured · <a href="tel:+15618093864">(561) 809-3864</a>
    · <a href="/privacy" target="_blank" rel="noopener">Privacy</a>
    · <a href="/terms" target="_blank" rel="noopener">Terms</a>
  </div>
</footer>

<!-- ================================================================
     JS (for standalone index.html; Wix embed runs its own copy via build)
     ================================================================ -->


`;

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://newdesignpro.com/#business",
  "name": "New Design Pro",
  "image": "https://newdesignpro.com/assets/lvp-livingroom-md-v19.jpg",
  "url": "https://newdesignpro.com",
  "telephone": "+1-561-809-3864",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Citrus Ridge",
    "addressRegion": "FL",
    "addressCountry": "US"
  },
  "areaServed": [
    {"@type": "City", "name": "Kissimmee"},
    {"@type": "City", "name": "Orlando"},
    {"@type": "City", "name": "Davenport"},
    {"@type": "City", "name": "Winter Haven"},
    {"@type": "City", "name": "Haines City"}
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "28.2919",
    "longitude": "-81.4076"
  },
  "sameAs": [
    "https://www.facebook.com/newdesignpro",
    "https://www.instagram.com/newdesignpro"
  ]
};

export default function HomePage() {
  return (
    <>
      <Script id="ld-local-business" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(localBusinessJsonLd)}
      </Script>
      <div dangerouslySetInnerHTML={{ __html: HOMEPAGE_HTML }} />
      <Script src="/homepage-interactive.js" strategy="afterInteractive" />
    </>
  );
}
