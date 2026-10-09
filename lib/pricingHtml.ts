// Shared HTML-string blocks for pricing and the Duralast collection section.
// The homepage and /tile render the same tier copy from here so the owner-locked
// LVP packages ($4.99 / $5.99 / $6.99) can never drift between pages.
import { LVP_TIERS, PRICING, SUPPLIER, type LvpTierKey } from '@/lib/site';
import {
  DEFAULT_COLLECTION,
  DEFAULT_COLOR,
  DURALAST_COLLECTIONS,
  duralastImg,
  type DuralastCollection,
  type DuralastColor,
} from '@/data/duralast';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const tierByKey = (key: LvpTierKey) => LVP_TIERS.find((t) => t.key === key)!;
export const priceText = (key: LvpTierKey) => `$${tierByKey(key).price.toFixed(2)}`;

const collectionsFor = (key: LvpTierKey) =>
  DURALAST_COLLECTIONS.filter((c) => c.tier === key).map((c) => `${SUPPLIER.name} ${c.name}`);

const joinOr = (items: string[]) => (items.length > 1 ? `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}` : items[0] || '');

// ---------------------------------------------------------------- LVP tiers
export function lvpTiersHtml(opts: {
  hidden?: boolean;
  href: (key: LvpTierKey | 'labor') => string;
}): string {
  const { hidden = false, href } = opts;
  const entry = tierByKey('entry');
  const standard = tierByKey('standard');
  const premium = tierByKey('premium');
  return `<!-- LVP tiers (ascending: ${priceText('entry')} → ${priceText('standard')} → ${priceText('premium')} → Labor Only) -->
    <div class="price-tiers${hidden ? ' is-hidden' : ''}" id="tiers-lvp" role="tabpanel"${hidden ? ' aria-hidden="true"' : ''}>
      <div class="tier">
        <div class="tier-name">${entry.name} Supplied</div>
        <div class="tier-price"><span class="amount">${priceText('entry')}</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">Budget-friendly ${entry.wear} LVP, standard install + quarter round. ${joinOr(collectionsFor('entry'))} colors.</p>
        <ul>
          <li>12-mil wear layer LVP</li>
          <li>5mm LVP plank</li>
          <li>Standard install</li>
          <li>Quarter round added at wall base</li>
        </ul>
        <a class="btn btn-tier" href="${href('entry')}" data-tier="entry">Book entry</a>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier featured">
        <div class="tier-badge">${standard.badge}</div>
        <div class="tier-name">${standard.name} Supplied</div>
        <div class="tier-price"><span class="amount">${priceText('standard')}</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">${joinOr(collectionsFor('standard'))} LVP with a ${standard.wear} wear layer.</p>
        <ul>
          <li>20-mil wear layer LVP</li>
          <li>5mm LVP plank</li>
          <li>Baseboard replacement included</li>
          <li>Carpet demo &amp; haul-away included</li>
          <li>Minor subfloor prep</li>
        </ul>
        <a class="btn btn-tier" href="${href('standard')}" data-tier="standard">Get a free measure</a>
        <p class="tier-note">Final price confirmed after in-home measurement.</p>
      </div>

      <div class="tier">
        <div class="tier-name">${premium.name} Supplied</div>
        <div class="tier-price"><span class="amount">${priceText('premium')}</span><span class="unit">/sqft</span></div>
        <p class="tier-desc">Same 20-mil surface, thicker 6mm core, documented warranty-safe install. ${joinOr(collectionsFor('premium'))} colors.</p>
        <ul>
          <li>20-mil wear layer LVP</li>
          <li><strong>6mm-core LVP</strong> (thicker, quieter, more rigid)</li>
          <li>Everything in the ${standard.name} tier</li>
          <li>Documented flatness check, per manufacturer spec</li>
          <li>Documented moisture reading on concrete slabs</li>
          <li>Written pre-install walkthrough &amp; final walkthrough</li>
          <li>Warranty job file kept on record</li>
        </ul>
        <a class="btn btn-tier" href="${href('premium')}" data-tier="premium">Book premium</a>
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
        <a class="btn btn-tier" href="${href('labor')}" data-tier="labor">Book labor-only</a>
        <p class="tier-note">Labor is quoted in person after the free in-home measure.</p>
      </div>
    </div>`;
}

// ---------------------------------------------------------------- Tile tiers
export function tileTiersHtml(opts: {
  hidden?: boolean;
  floorHref: string;
  wallHref: string;
  laborHref: string;
  footerLinkHtml: string;
}): string {
  const { hidden = false } = opts;
  return `<!-- Tile tiers: every tile scope is quoted after a free in-home measure -->
    <div class="price-tiers${hidden ? ' is-hidden' : ''}" id="tiers-tile" role="tabpanel"${hidden ? ' aria-hidden="true"' : ''}>
      <div class="tier featured">
        <div class="tier-badge">Free measure</div>
        <div class="tier-name">Floor Tile Installed</div>
        <div class="tier-price"><span class="amount">Quoted</span><span class="unit">after a free measure</span></div>
        <p class="tier-desc">Floor tile is ${PRICING.tileQuoted.toLowerCase()}. Every slab, layout, and tile is different, so we measure before we price.</p>
        <ul>
          <li>Tile customer-supplied or sourced per job</li>
          <li>Thinset + grout</li>
          <li>Backer board on wood subfloor</li>
          <li>Straight or brick-pattern layout</li>
          <li>Cleanup &amp; haul-away</li>
        </ul>
        <a class="btn btn-tier" href="${opts.floorHref}" data-tier="tile-floor">Get a free measure</a>
        <div class="tier-scope">
          Tile material is either supplied by you or sourced for your specific job.
          Your written quote covers the exact scope we measure.
          If the subfloor needs floating (self-leveling), that work is priced based on subfloor condition after inspection.
        </div>
        <p class="tier-note">Written quote within 24 hours of the measure.</p>
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
        <a class="btn btn-tier" href="${opts.wallHref}" data-tier="tile-wall">Book a walkthrough</a>
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
        <a class="btn btn-tier" href="${opts.laborHref}" data-tier="tile-labor">Book labor-only</a>
        <p class="tier-note">Labor is quoted in person after the free in-home measure.</p>
      </div>

      <div class="tier" style="grid-column: 1 / -1; text-align: center; background: transparent; border-color: rgba(255,255,255,0.06);">
        ${opts.footerLinkHtml}
      </div>
    </div>`;
}

export function pricingFineHtml(): string {
  return `<div class="pricing-fine">
      <div><strong>Stairs</strong>${PRICING.stairsQuoted}</div>
      <div><strong>Next-day start</strong>Available on most jobs</div>
      <div><strong>Deposit</strong>50% down · balance at completion</div>
      <div><strong>Free measure</strong>On-site quote within 24 hours in Central FL</div>
    </div>`;
}

export const PRICING_LEDE =
  'LVP is priced per square foot, all in. Tile, stairs, and labor-only are quoted after a free in-home measure. Next-day start available.';

// ---------------------------------------------------------------- Duralast collection section
export const formHrefFor = (c: DuralastCollection, color: DuralastColor) =>
  `/form?tier=${c.tier}&collection=${encodeURIComponent(c.name)}&color=${encodeURIComponent(color.name)}`;

const tierLabel = (c: DuralastCollection) => `${tierByKey(c.tier).name} · ${priceText(c.tier)}/sqft`;

function cardHtml(c: DuralastCollection, color: DuralastColor, active: boolean, selected: boolean): string {
  return `<button class="lvp-coll-card" type="button" role="tab" aria-selected="${selected ? 'true' : 'false'}"${active ? '' : ' hidden'}
        data-collection="${c.slug}" data-collection-name="${esc(c.name)}" data-tier="${c.tier}" data-color="${color.slug}" data-name="${esc(color.name)}" data-sku="${color.sku}"
        aria-label="Select ${esc(color.name)} from ${SUPPLIER.name} ${esc(c.name)}">
        <div class="lvp-coll-card-media" style="background:${color.chip}">
          <picture>
            <source type="image/webp" srcset="${duralastImg(c.slug, color.slug, 'swatch', 'webp')}" />
            <img src="${duralastImg(c.slug, color.slug, 'swatch', 'jpg')}" width="400" height="400" alt="${esc(color.name)} ${SUPPLIER.name} ${esc(c.name)} LVP plank swatch" loading="lazy" />
          </picture>
        </div>
        <div class="lvp-coll-card-meta">
          <div class="lvp-coll-card-name">${esc(color.name)}</div>
          <div class="lvp-coll-card-tone">${esc(c.name)} · ${priceText(c.tier)}</div>
        </div>
      </button>`;
}

export function duralastSectionHtml(): string {
  const activeColl = DURALAST_COLLECTIONS.find((c) => c.slug === DEFAULT_COLLECTION)!;
  const activeColor = activeColl.colors.find((c) => c.slug === DEFAULT_COLOR) || activeColl.colors[0];

  const tabs = DURALAST_COLLECTIONS.map(
    (c) => `<button class="lvp-coll-tab${c.slug === activeColl.slug ? ' is-active' : ''}" type="button" role="tab" aria-selected="${c.slug === activeColl.slug ? 'true' : 'false'}" data-collection="${c.slug}" data-count="${c.colors.length}"
        data-name="${esc(c.name)}" data-tier="${c.tier}" data-tier-label="${esc(tierLabel(c))}" data-blurb="${esc(c.blurb)}" data-wear="${esc(c.wear)}" data-thickness="${esc(c.thickness)}" data-plank="${esc(c.plank)}">
        <span class="lvp-coll-tab-name">${esc(c.name)}</span>
        <span class="lvp-coll-tab-tier">${esc(tierLabel(c))}</span>
      </button>`,
  ).join('\n      ');

  const cards = DURALAST_COLLECTIONS.flatMap((c) =>
    c.colors.map((color) => cardHtml(c, color, c.slug === activeColl.slug, c.slug === activeColl.slug && color.slug === activeColor.slug)),
  ).join('\n      ');

  return `<!-- ================================================================
     DURALAST LVP COLLECTIONS — Oct 2026
     Colors, SKUs, and specs verified against the manufacturer's official pages (data/duralast.ts).
     ================================================================ -->
<section id="lvp-colors" class="lvp-coll-section">
  <div class="section-inner">
    <div class="section-head" style="text-align:center; margin-bottom:clamp(28px,5vw,44px);">
      <div class="lvp-coll-lockup" aria-label="New Design Pro × ${SUPPLIER.name}">
        <img src="/assets/logo-ndp-mark-transparent.png" alt="New Design Pro" class="lvp-coll-lockup-ndp" />
        <span class="lvp-coll-lockup-x" aria-hidden="true">×</span>
        <span class="lvp-coll-lockup-brand">${SUPPLIER.name}</span>
      </div>
      <h2 class="section-title" style="margin-left:auto;margin-right:auto;">Pick your color from the <em>${SUPPLIER.name} collections</em>.</h2>
      <p class="section-lede" style="margin-left:auto;margin-right:auto;">We install ${SUPPLIER.name} (${SUPPLIER.altName}) SPC rigid-core plank: waterproof, click-lock, with an attached pad. Each collection matches one of our all-in price tiers. Tap any color to see it in a room.</p>
    </div>

    <div class="lvp-coll-tabs" role="tablist" aria-label="${SUPPLIER.name} collections">
      ${tabs}
    </div>

    <div class="lvp-coll-toolbar">
      <div class="lvp-coll-toolbar-lead">
        <div class="lvp-coll-toolbar-title" id="lvp-coll-title">${esc(activeColl.name)} · ${esc(tierLabel(activeColl))}</div>
        <div class="lvp-coll-toolbar-sub" id="lvp-coll-sub">${activeColl.colors.length} colors · Scroll — or tap the arrows</div>
      </div>
      <div class="lvp-coll-controls">
        <button class="lvp-coll-arrow" type="button" data-dir="-1" aria-label="Previous colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="lvp-coll-arrow" type="button" data-dir="1" aria-label="Next colors">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </div>

    <div class="lvp-coll-rail" id="lvp-coll-rail" role="tablist" aria-label="${SUPPLIER.name} LVP colors">
      ${cards}
    </div>

    <!-- Detail panel — updates when a color is tapped -->
    <div class="lvp-coll-detail" id="lvp-coll-detail" aria-live="polite">
      <div class="lvp-coll-detail-media">
        <picture>
          <source type="image/webp" srcset="${duralastImg(activeColl.slug, activeColor.slug, 'room-md', 'webp')} 800w, ${duralastImg(activeColl.slug, activeColor.slug, 'room-lg', 'webp')} 1400w" sizes="(min-width:900px) 60vw, 100vw" />
          <img id="lvp-coll-detail-img" src="${duralastImg(activeColl.slug, activeColor.slug, 'room-md', 'jpg')}" width="800" height="534" sizes="(min-width:900px) 60vw, 100vw" alt="${esc(activeColor.name)} ${SUPPLIER.name} ${esc(activeColl.name)} LVP in a furnished room" />
        </picture>
      </div>
      <div class="lvp-coll-detail-body">
        <div class="lvp-coll-detail-eyebrow" id="lvp-coll-detail-eyebrow">${SUPPLIER.name} · ${esc(activeColl.name)}</div>
        <h3 class="lvp-coll-detail-name" id="lvp-coll-detail-name">${esc(activeColor.name)}</h3>
        <p class="lvp-coll-detail-desc" id="lvp-coll-detail-desc">${esc(activeColl.blurb)}</p>
        <dl class="lvp-coll-detail-specs">
          <div><dt>Price tier</dt><dd id="lvp-coll-detail-tier">${esc(tierLabel(activeColl))} installed</dd></div>
          <div><dt>Wear layer</dt><dd id="lvp-coll-detail-wear">${esc(activeColl.wear)}</dd></div>
          <div><dt>Thickness</dt><dd id="lvp-coll-detail-thickness">${esc(activeColl.thickness)}</dd></div>
          <div><dt>Plank size</dt><dd id="lvp-coll-detail-plank">${esc(activeColl.plank)}</dd></div>
          <div><dt>Core</dt><dd>SPC rigid core, waterproof</dd></div>
          <div><dt>SKU</dt><dd id="lvp-coll-detail-sku">${activeColor.sku}</dd></div>
        </dl>
        <div class="lvp-coll-detail-cta">
          <a class="btn btn-primary" id="lvp-coll-detail-cta-link" href="${formHrefFor(activeColl, activeColor)}" data-name="${esc(activeColor.name)}" data-collection-name="${esc(activeColl.name)}">
            Get a quote for <span id="lvp-coll-detail-cta-name">${esc(activeColor.name)}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <p class="lvp-coll-detail-note"><strong>See samples at your free measure.</strong> We bring physical samples to your home so you can see them next to your walls, cabinets, and light before you decide. Screen colors vary.</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
}
