// Homepage "option 6" (Oct 2026): Bright showroom hero + Duralast plank picker,
// logo C type (Archivo condensed) and the yard-sign palette.
import { BUSINESS_PHONE, SUPPLIER } from '@/lib/site';
import { DURALAST_COLLECTIONS } from '@/data/duralast';
import { REVIEWS } from '@/data/reviews';
import { CITY_LINKS } from '@/data/cities';
import { HOME_FAQS } from '@/data/faqs';
import { formHrefFor, priceText, tierByKey } from '@/lib/pricingHtml';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const TOTAL_COLORS = DURALAST_COLLECTIONS.reduce((n, c) => n + c.colors.length, 0);

export function v6HeroHtml(): string {
  return `
<section class="v6-hero" id="top">
  <h1>Floors you'll <em>love</em> walking on.</h1>
  <div class="v6-lede">
    <p>${SUPPLIER.name} luxury vinyl, supplied and installed across Central Florida. One honest price per square foot, set right on the page.</p>
    <div class="v6-ctas"><a class="v6-btn" href="/form">Get my free measure</a><a class="v6-btn line" href="#lvp-colors">Browse ${TOTAL_COLORS} colors</a></div>
  </div>
  <div class="v6-img">
    <picture>
      <source type="image/webp" srcset="/assets/duralast/azul-tortuga/white-haven-room-md.webp 800w, /assets/duralast/azul-tortuga/white-haven-room-lg.webp 1400w" sizes="100vw" />
      <img src="/assets/duralast/azul-tortuga/white-haven-room-md.jpg" width="800" height="534" alt="White Haven ${SUPPLIER.name} Azul Tortuga luxury vinyl plank in a bright living room" fetchpriority="high" />
    </picture>
    <span class="v6-cap">Room preview: Azul Tortuga, White Haven</span>
  </div>
</section>
<div class="v6-facts">
  <div><strong>${priceText('entry')}</strong>Installed price from, per sq ft</div>
  <div><strong>10+ yrs</strong>Family-run</div>
  <div><strong>Insured</strong>COI on request</div>
  <div><strong>24 hrs</strong>Written quote</div>
</div>`;
}

type Row = { label: string; entry: string; standard: string; premium: string };
const ROWS: Row[] = [
  { label: 'Plank', entry: 'Panzu, 4.7mm', standard: 'Azul Tortuga, 5mm', premium: 'V-EVO Max or XL, 6mm core' },
  { label: 'Wear layer', entry: '12 mil', standard: '20 mil', premium: '20 mil' },
  { label: 'Quarter round', entry: 'yes', standard: 'yes', premium: 'yes' },
  { label: 'Carpet removal and haul-away', entry: 'no', standard: 'yes', premium: 'yes' },
  { label: 'Minor subfloor prep', entry: 'no', standard: 'yes', premium: 'yes' },
  { label: 'Flatness and moisture check, documented', entry: 'no', standard: 'no', premium: 'yes' },
  { label: 'Written walkthroughs and warranty file', entry: 'no', standard: 'no', premium: 'yes' },
];
const KEYS = ['entry', 'standard', 'premium'] as const;
const cell = (v: string) => (v === 'yes' ? 'Included' : v === 'no' ? '<span class="v6-no">Not included</span>' : v);

export function v6PackagesHtml(): string {
  const head = KEYS.map(
    (k) => `<th scope="col" class="${k === 'standard' ? 'v6-std' : ''}">${k === 'standard' ? '<span class="v6-pick">Most homes pick this</span>' : ''}<span class="v6-tn">${tierByKey(k).name}</span><span class="v6-tp">${priceText(k)}</span><span class="v6-tu">per sq ft</span></th>`,
  ).join('');
  const body = ROWS.map(
    (r) => `<tr><th scope="row">${r.label}</th>${KEYS.map((k) => `<td class="${k === 'standard' ? 'v6-std' : ''}">${cell(r[k])}</td>`).join('')}</tr>`,
  ).join('');
  const btns = KEYS.map(
    (k) => `<td class="${k === 'standard' ? 'v6-std' : ''}"><a class="v6-btn ${k === 'standard' ? '' : 'line'}" href="/form?tier=${k}" data-tier="${k}">Choose ${tierByKey(k).name}</a></td>`,
  ).join('');
  const stack = KEYS.map((k) => {
    const items = ROWS.slice(2)
      .map((r) => `<li class="${r[k] === 'no' ? 'no' : ''}">${r.label}</li>`)
      .join('');
    const pl = `${ROWS[0][k]} plank, ${ROWS[1][k]} wear layer`;
    return `<article class="v6-pk ${k === 'standard' ? 'pop' : ''}">${k === 'standard' ? '<span class="v6-pick">Most homes pick this</span>' : ''}<h3>${tierByKey(k).name}</h3><div class="v6-tp">${priceText(k)}</div><span class="v6-tu">per sq ft, installed</span><p class="v6-pl">${pl}</p><ul>${items}</ul><a class="v6-btn ${k === 'standard' ? '' : 'line'}" href="/form?tier=${k}" data-tier="${k}">Choose ${tierByKey(k).name}</a></article>`;
  }).join('');
  return `
<section class="v6-sec" id="lvp-pricing">
  <div class="v6-wrap">
    <h2>Three packages. <em>Nothing hidden.</em></h2>
    <p class="v6-intro">Every package includes the plank, the install and the cleanup. We confirm your final price at the free measure.</p>
    <div class="v6-sheet"><table><thead><tr><th scope="col" class="v6-rowh">What's included</th>${head}</tr></thead><tbody>${body}<tr class="v6-btnrow"><th></th>${btns}</tr></tbody></table></div>
    <div class="v6-stack">${stack}</div>
    <p class="v6-fine">New baseboards add $3.50 per linear foot on any package. Stairs, tile and labor-only jobs are quoted at your free measure. <a href="/tile">See tile</a></p>
  </div>
</section>`;
}

export function v6ColorsHtml(): string {
  const data = DURALAST_COLLECTIONS.map((c) => ({
    slug: c.slug,
    name: c.name,
    tierName: tierByKey(c.tier).name,
    price: priceText(c.tier),
    wear: c.wear,
    thickness: c.thickness,
    plank: c.plank,
    colors: c.colors.map((x) => ({ n: x.name, s: x.slug, k: x.sku, href: formHrefFor(c, x) })),
  }));
  const cats =
    `<button type="button" aria-pressed="true" data-f="all">All colors<small>${TOTAL_COLORS}</small></button>` +
    data.map((c) => `<button type="button" aria-pressed="false" data-f="${c.slug}">${esc(c.name)}<small>${c.tierName} ${c.price}</small></button>`).join('');
  const groups = data
    .map(
      (c) =>
        `<div class="v6-grp" data-g="${c.slug}"><h3>${esc(c.name)}<span>${c.tierName}, ${c.price} per sq ft, ${c.colors.length} colors</span></h3><div class="v6-planks">${c.colors
          .map(
            (x) =>
              `<button type="button" class="v6-plank" aria-pressed="false" data-g="${c.slug}" data-s="${x.s}"><img src="/assets/duralast/${c.slug}/${x.s}-swatch.webp" alt="" loading="lazy" width="400" height="100" /><span>${esc(x.n)}</span></button>`,
          )
          .join('')}</div></div>`,
    )
    .join('');
  const start = data.find((c) => c.slug === 'v-evo-xl') || data[0];
  const sc = start.colors.find((x) => x.s === 'caramel') || start.colors[0];
  return `
<section class="v6-sec" id="lvp-colors">
  <div class="v6-wrap">
    <h2>See every color <em>in a real room.</em></h2>
    <p class="v6-intro">All ${TOTAL_COLORS} ${SUPPLIER.name} colors we install. Pick a collection, then tap any color to see it in a room, with its specs.</p>
    <div class="v6-cats" role="group" aria-label="Collections">${cats}</div>
    <div class="v6-floor">
      <div class="v6-list">${groups}</div>
      <div class="v6-preview" id="v6-preview" aria-live="polite">
        <img id="v6-pv" src="/assets/duralast/${start.slug}/${sc.s}-room-md.webp" alt="${esc(sc.n)} ${esc(start.name)} plank in a room" width="800" height="534" />
        <h3 id="v6-pn">${esc(sc.n)}</h3>
        <p id="v6-pc">${SUPPLIER.name} ${esc(start.name)}</p>
        <dl class="v6-spec">
          <dt>Package</dt><dd id="v6-sp-pk">${start.tierName}, ${start.price} per sq ft installed</dd>
          <dt>Wear layer</dt><dd id="v6-sp-w">${esc(start.wear)}</dd>
          <dt>Thickness</dt><dd id="v6-sp-t">${esc(start.thickness)}</dd>
          <dt>Plank size</dt><dd id="v6-sp-p">${esc(start.plank)}</dd>
          <dt>Build</dt><dd>SPC rigid core, waterproof, click-lock, attached pad</dd>
          <dt>SKU</dt><dd id="v6-sp-k">${sc.k}</dd>
        </dl>
        <a class="v6-btn" id="v6-pq" href="${sc.href}">Quote ${esc(sc.n)}</a>
      </div>
    </div>
  </div>
  <script type="application/json" id="v6-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>
</section>`;
}

export function v6StepsHtml(): string {
  return `
<section class="v6-sec v6-steps-sec" id="how-it-works">
  <div class="v6-wrap">
    <h2>How your floor <em>gets done.</em></h2>
    <p class="v6-intro">Three steps, start to finish.</p>
    <ol class="v6-steps">
      <li><span class="v6-n">1</span><h3>Free measure</h3><p>We measure every room, check the subfloor and bring real plank samples.</p></li>
      <li><span class="v6-n">2</span><h3>Written quote in 24 hours</h3><p>One price per square foot, in writing. 50% deposit books your date.</p></li>
      <li><span class="v6-n">3</span><h3>Install and cleanup</h3><p>Most homes take two to three days. We haul the debris and walk the job with you.</p></li>
    </ol>
  </div>
</section>`;
}

export function v6ReviewsHtml(): string {
  const q = REVIEWS.slice(0, 2)
    .map(
      (r) =>
        `<blockquote><p>“${esc(r.text)}”</p><cite><span class="v6-stars" aria-label="${r.rating} stars">${'★'.repeat(r.rating)}</span><b>${esc(r.author)}</b>, Google review</cite></blockquote>`,
    )
    .join('');
  return `
<section class="v6-sec v6-quotes-sec" id="reviews">
  <div class="v6-wrap">
    <div class="v6-quotes">${q}</div>
    <a class="v6-link" href="/reviews">Read all reviews</a>
  </div>
</section>`;
}

export function v6AreasHtml(): string {
  return `
<section class="v6-sec" id="service-areas">
  <div class="v6-wrap">
    <h2>Where we install</h2>
    <p class="v6-intro">Based in Davenport, working across Polk and Osceola counties. Tap your city for local pricing and ZIP codes.</p>
    <ul class="v6-areas">${CITY_LINKS.filter((c, i, a) => a.findIndex((x) => x.name === c.name) === i).map((c) => `<li><a href="${c.path}">${esc(c.name)}</a></li>`).join('')}</ul>
  </div>
</section>`;
}

export function v6FinalHtml(): string {
  return `
<section class="v6-final">
  <div class="v6-wrap">
    <div><h2>Ready for floors you'll <em>love?</em></h2><p>Free in-home measure. Written quote in 24 hours.</p></div>
    <div class="v6-ctas"><a class="v6-btn light" href="/form">Get my price</a><a class="v6-btn line light" href="tel:${BUSINESS_PHONE.e164}">Call ${BUSINESS_PHONE.display}</a></div>
  </div>
</section>`;
}


export function v6FaqHtml(): string {
  const items = HOME_FAQS.map(
    (f, i) => `<details class="v6-faq-item"${i === 0 ? ' open' : ''}${f.lang ? ` lang="${f.lang}"` : ''}><summary><h3>${esc(f.q)}</h3><span class="v6-faq-ic" aria-hidden="true"></span></summary><p>${esc(f.a)}</p></details>`,
  ).join('');
  return `
<section class="v6-sec v6-faq-sec" id="faq">
  <div class="v6-wrap">
    <h2>Straight <em>answers.</em></h2>
    <p class="v6-intro">What homeowners ask us most, with real prices.</p>
    <div class="v6-faq">${items}</div>
  </div>
</section>`;
}
