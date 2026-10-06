// One template for every city landing page. Content lives in data/cities.ts.
import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { getCity, type City, type Section } from '@/data/cities';
import { getPost } from '@/data/blog';
import { cityHeaderHtml, reviewStripHtml, siteFooterHtml } from '@/lib/chrome';
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '@/lib/schema';
import { BUSINESS, BUSINESS_PHONE, CLAIMS, PRICING } from '@/lib/site';

export const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function cityMetadata(slug: string): Metadata {
  const c = getCity(slug);
  return {
    title: c.title,
    description: c.description,
    alternates: { canonical: c.path },
    openGraph: { title: `${c.title} | ${BUSINESS.name}`, description: c.description, url: c.path },
  };
}

const ARROW =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function sectionHtml(s: Section): string {
  const paras = s.paras.map((p) => `<p>${esc(p)}</p>`).join('\n');
  const list = s.list ? `<ul>${s.list.map((li) => `<li>${esc(li)}</li>`).join('')}</ul>` : '';
  return `<h2>${esc(s.h2)}</h2>\n${paras}\n${list}`;
}

function pricingHtml(c: City): string {
  if (c.kind === 'remodeling') {
    return `<h2>${esc(c.pricingH2)}</h2>
<div class="pull-price">
  <div class="pp-item"><span class="pp-num">$4.99</span><span class="pp-label">/sqft — LVP supplied &amp; installed</span></div>
  <div class="pp-item"><span class="pp-num">$7.99</span><span class="pp-label">/sqft — floor tile supplied &amp; installed</span></div>
  <div class="pp-item"><span class="pp-num">Quoted</span><span class="pp-label">Trim, shower tile &amp; paint (in-home walkthrough)</span></div>
</div>
<p>Floors and floor tile are priced per square foot, supplied and installed. Shower walls, trim, and paint depend on the scope, so they're quoted after a free walkthrough. Every quote is written, itemized, and in your inbox within 24 hours. A 50% deposit holds your start date, and the balance is due when the work is done.</p>`;
  }
  return `<h2>${esc(c.pricingH2)}</h2>
<div class="pull-price">
  <div class="pp-item"><span class="pp-num">Quoted</span><span class="pp-label">Labor-only — you supply the LVP (in-home quote)</span></div>
  <div class="pp-item"><span class="pp-num">$4.99</span><span class="pp-label">/sqft — 12mil supplied &amp; installed</span></div>
  <div class="pp-item"><span class="pp-num">$5.99</span><span class="pp-label">/sqft — 20mil supplied &amp; installed</span></div>
  <div class="pp-item"><span class="pp-num">$6.99</span><span class="pp-label">/sqft — premium supplied &amp; installed</span></div>
</div>
<p>Pricing is per square foot, all in. Labor covers the tear-out, the subfloor prep, the underlayment, the baseboards and transitions, and the cleanup. No trip charges. No surprise line items. Stairs run $90 a step if you have them.</p>`;
}

function processHtml(c: City): string {
  if (c.kind === 'remodeling') {
    return `<h2>${esc(c.processH2)}</h2>
<h3>Free walkthrough</h3>
<p>We walk the rooms with you, measure, and talk through what you want changed. You get a written quote within 24 hours.</p>
<h3>Sequence the work</h3>
<p>Floors and tile go first, then trim, then paint. If other trades are involved, their work is scheduled before ours so nothing gets torn up twice.</p>
<h3>Daily cleanup and a final walkthrough</h3>
<p>We clean up at the end of each day and walk the finished rooms with you before the final payment.</p>`;
  }
  return `<h2>${esc(c.processH2)}</h2>
<h3>Free in-home measure</h3>
<p>I come out to your ${esc(c.name)} home and measure the space. It's free, it takes about twenty minutes, and you get a written quote within 24 hours.</p>
<h3>50% deposit holds the calendar</h3>
<p>Once you say go, a 50% deposit locks your start date. The remaining 50% is due after the job's done and you're happy. I don't ask for the full amount up front.</p>
<h3>Tear-out and prep</h3>
<p>We move your furniture, pull up the old flooring, and haul it away. Then we deal with the subfloor: grinding high spots, filling low ones, and putting down the right underlayment.</p>
<h3>Install and finish</h3>
<p>Planks click in fast when the prep is right. Baseboards and transitions go in at the end, and the site gets cleaned before we leave.</p>`;
}

export function cityPageHtml(c: City): string {
  const n1 = getCity(c.neighbors[0]);
  const n2 = getCity(c.neighbors[1]);
  const post = getPost(c.blogSlug);
  const zips = [...c.zips, ...(c.poBoxZips || []).map((z) => `${z} (PO box)`)];
  const faqs = c.faqs
    .map(
      (f) =>
        `<h3${f.lang ? ` lang="${f.lang}"` : ''}>${esc(f.q)}</h3>\n<p>${esc(f.a)}</p>`,
    )
    .join('\n');

  return `
${cityHeaderHtml()}

<article class="city-page" data-city="${c.slug}">
  <div class="blog-hero">
    <div class="bh-bg" style="background-image:url('${c.heroImage}');" aria-hidden="true"></div>
    <div class="bh-fade" aria-hidden="true"></div>
    <div class="bh-inner">
      <div class="kicker">${esc(c.kicker)}</div>
      <h1>${esc(c.h1)}</h1>
      <div class="byline">${esc(c.byline)}</div>
    </div>
  </div>

  <div class="article">
    <div class="article-inner">
${c.intro.map((p) => `<p>${esc(p)}</p>`).join('\n')}

${c.sections.map(sectionHtml).join('\n\n')}

${c.str ? sectionHtml(c.str) : ''}

${pricingHtml(c)}

${processHtml(c)}

<h2>${esc(c.name)} ZIP codes we serve</h2>
<p>${esc(c.zipNote)}</p>
<ul class="city-zips">${zips.map((z) => `<li>${z}</li>`).join('')}</ul>

<h2>Who shows up, and how you're covered</h2>
<p>The short version: ${esc(CLAIMS.experienceText)} New Design Pro operates under ${esc(BUSINESS.legalName)} and carries general liability insurance on every job. ${esc(CLAIMS.insuranceNote)}</p>

<h2>${esc(c.name)} ${c.kind === 'remodeling' ? 'remodeling' : 'flooring'} questions, answered</h2>
${faqs}

<h2>Nearby, and worth reading</h2>
<ul class="city-related">
  <li><a href="${n1.path}">${esc(n1.anchor)}</a></li>
  <li><a href="${n2.path}">${esc(n2.anchor)}</a></li>
  <li><a href="/tile">Tile installation from $7.99/sqft</a></li>
  <li><a href="/blog/${post.slug}">${esc(post.title)}</a></li>
</ul>

<h2>Get a real number for your ${esc(c.name)} home</h2>
<p>Every home is a little different, so the honest answer to "what will mine cost" is: let me see it. The measure is free, and you'll have a written quote within 24 hours.</p>
<p><a href="/form"><strong>Send me the details of your space</strong></a> or call <a href="tel:${BUSINESS_PHONE.e164}">${BUSINESS_PHONE.display}</a> and I'll get you a real number, fast.</p>

    </div>
  </div>

  ${reviewStripHtml({ eyebrow: `Google reviews · ${esc(c.name)} and nearby` })}

  <section class="post-cta">
    <div class="pc-inner">
      <h2>Ready to get a <em>real number</em> for your job?</h2>
      <a class="btn btn-white" href="/form">
        Get a free quote
        ${ARROW}
      </a>
    </div>
  </section>
</article>

${siteFooterHtml()}
`;
}

export default function CityPage({ slug }: { slug: string }) {
  const c = getCity(slug);
  const isRemodel = c.kind === 'remodeling';
  return (
    <>
      <JsonLd
        data={serviceSchema({
          path: c.path,
          name: isRemodel ? `Flooring & interior remodeling in ${c.name}, FL` : `LVP installation in ${c.name}, FL`,
          serviceType: isRemodel ? 'Flooring and interior finish remodeling' : 'Luxury vinyl plank (LVP) flooring installation',
          areaServed: [{ name: c.name, county: c.county }],
          priceFrom: PRICING.lvpFrom,
          priceDescription: isRemodel
            ? 'LVP supplied and installed from $4.99/sqft; floor tile from $7.99/sqft'
            : 'LVP supplied and installed from $4.99/sqft',
        })}
      />
      <JsonLd data={faqPageSchema(c.faqs, c.path)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: c.title.split(' — ')[0], path: c.path }])} />
      {/* TODO-DANIEL: featured job slot. Add one real job for this city to data/projects.ts (city, scope, sq ft, days, 2–3 real photos, customer OK to feature), set featuredJobId in data/cities.ts, and render it here. Never invent one. */}
      <div dangerouslySetInnerHTML={{ __html: cityPageHtml(c) }} />
      <Script src="/lvp-installation-kissimmee-interactive.js" strategy="afterInteractive" />
    </>
  );
}
