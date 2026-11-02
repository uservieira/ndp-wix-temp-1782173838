// Area-wide LVP landing page for Google Search ads. Same structure as the city pages
// (which hold ad visitors far better than the homepage), but for the whole service area.
import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { esc } from '@/components/CityPage';
import { getCity } from '@/data/cities';
import { HOME_FAQS } from '@/data/faqs';
import { PROJECTS } from '@/data/projects';
import { cityHeaderHtml, reviewStripHtml, siteFooterHtml } from '@/lib/chrome';
import { breadcrumbSchema, faqPageSchema, serviceSchema } from '@/lib/schema';
import { BUSINESS, BUSINESS_PHONE, CLAIMS, BASEBOARD_ADDON } from '@/lib/site';
import { priceText } from '@/lib/pricingHtml';
import { projectCaseHtml } from '@/lib/projectHtml';

const PATH = '/lvp';
const TITLE = 'LVP Flooring Installation in Central Florida — From $4.99/sqft';
const DESC =
  'Duralast SPC luxury vinyl plank, supplied and installed from $4.99/sqft across Orlando, Kissimmee, Davenport, Clermont and nearby. Free measure, written quote in 24 hours.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} | ${BUSINESS.name}`, description: DESC, url: PATH },
};

const FAQS = HOME_FAQS.filter((f) => !/portugu/i.test(f.q));
const CITY_LINKS = ['davenport', 'kissimmee', 'clermont', 'haines-city', 'winter-haven', 'lakeland'].map(getCity);
const ARROW =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

function html(): string {
  const job = PROJECTS.find((p) => p.id === 'clermont-antigua-bedrooms');
  const faqs = FAQS.map((f) => `<h3>${esc(f.q)}</h3>\n<p>${esc(f.a)}</p>`).join('\n');
  return `
${cityHeaderHtml()}

<article class="city-page" data-city="central-florida">
  <div class="blog-hero">
    <div class="bh-bg" style="background-image:url('/assets/projects/clermont-antigua-bedrooms/after-bedroom-lg.webp');" aria-hidden="true"></div>
    <div class="bh-fade" aria-hidden="true"></div>
    <div class="bh-inner">
      <div class="kicker">Central Florida · Orlando to Lakeland</div>
      <h1>LVP flooring, supplied and installed from ${priceText('entry')}/sqft</h1>
      <div class="byline">Free in-home measure. Written quote within 24 hours. ${esc(CLAIMS.experienceShort)}.</div>
      <div class="lvp-hero-ctas" style="display:flex;flex-wrap:wrap;gap:12px;margin-top:22px;">
        <a class="btn btn-primary" href="/form">Get a free quote ${ARROW}</a>
        <a class="btn btn-white" href="tel:${BUSINESS_PHONE.e164}">Call ${BUSINESS_PHONE.display}</a>
      </div>
    </div>
  </div>

  <div class="article">
    <div class="article-inner">
<p>New Design Pro installs Duralast (Durato) SPC luxury vinyl plank in homes across Central Florida. That's the only plank we install: a rigid, waterproof core (per Durato) that handles Florida humidity, kids and pets. No laminate, no guesswork about what's going on your floor.</p>
<p>You get one price per square foot that covers the material and the install, a free measure at your home, and a written, itemized quote within 24 hours. Here's what that looks like, what it costs, and how a job runs.</p>

${job ? `<section class="city-featured-job">\n<h2>A recent job, before the furniture went back in</h2>\n${projectCaseHtml(job, 'h3')}\n<p><a href="/projects">See more real projects</a></p>\n</section>` : ''}

<h2>What LVP costs, all in</h2>
<div class="pull-price">
  <div class="pp-item"><span class="pp-num">${priceText('entry')}</span><span class="pp-label">/sqft — Entry: 12-mil, 4.7mm Panzu LVP, supplied &amp; installed</span></div>
  <div class="pp-item"><span class="pp-num">${priceText('standard')}</span><span class="pp-label">/sqft — Standard (most popular): 20-mil, 5mm LVP</span></div>
  <div class="pp-item"><span class="pp-num">${priceText('premium')}</span><span class="pp-label">/sqft — Premium: 20-mil, 6mm-core LVP</span></div>
  <div class="pp-item"><span class="pp-num">Quoted</span><span class="pp-label">Labor-only — you supply the LVP (in-home quote)</span></div>
</div>
<p>Pricing is per square foot, all in, and each tier spells out what's included. Every package includes quarter round. Standard adds carpet demo and haul-away and minor subfloor prep. Premium adds a documented flatness check, a slab moisture reading, written walkthroughs, and a warranty job file. New baseboards are a flat $${BASEBOARD_ADDON.price.toFixed(2)} per linear foot add-on on any package. No trip charges. No surprise line items. Stairs and labor-only work are quoted at the free in-home measure.</p>
<p><a href="/form"><strong>See your number in the quote form</strong></a></p>

<h2>How an install runs, step by step</h2>
<h3>Free in-home measure</h3>
<p>I come out to your home and measure the space. It's free, it takes about twenty minutes, and you get a written quote within 24 hours.</p>
<h3>50% deposit holds the calendar</h3>
<p>Once you say go, a 50% deposit locks your start date. The remaining 50% is due after the job's done and you're happy. I don't ask for the full amount up front.</p>
<h3>Tear-out and prep</h3>
<p>We move your furniture, pull up the old flooring, and haul it away. Then we deal with the subfloor: grinding high spots, filling low ones, and putting down the right underlayment. That prep is what keeps a floating floor quiet and flat for years.</p>
<h3>Install and finish</h3>
<p>Planks click in fast when the prep is right. Baseboards and transitions go in at the end, and the site gets cleaned before we leave.</p>

<h2>Where we install</h2>
<p>We cover about 30 miles around Lake Buena Vista: Orlando, Kissimmee, Davenport, Clermont, Haines City, Winter Haven, Lakeland and the towns in between. If your job is a little farther out, ask. We travel when the job calls for it.</p>
<ul class="city-related">
${CITY_LINKS.map((c) => `  <li><a href="${c.path}">${esc(c.anchor)}</a></li>`).join('\n')}
</ul>

<h2>Who shows up, and how you're covered</h2>
<p>${esc(CLAIMS.experienceText)} New Design Pro operates under ${esc(BUSINESS.legalName)} and carries general liability insurance on every job. ${esc(CLAIMS.insuranceNote)} Workmanship is covered by a written warranty: <a href="/warranty">see the warranty terms</a>.</p>

<h2>LVP questions, answered</h2>
${faqs}

<h2>Get a real number for your home</h2>
<p>Every home is a little different, so the honest answer to "what will mine cost" is: let me see it. The measure is free, and you'll have a written quote within 24 hours.</p>
<p><a href="/form"><strong>Send me the details of your space</strong></a> or call <a href="tel:${BUSINESS_PHONE.e164}">${BUSINESS_PHONE.display}</a> and I'll get you a real number, fast.</p>

    </div>
  </div>

  ${reviewStripHtml({ eyebrow: 'Google reviews · Central Florida' })}

  <section class="post-cta">
    <div class="pc-inner">
      <h2>Ready to get a <em>real number</em> for your floors?</h2>
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

export default function Page() {
  return (
    <>
      <JsonLd
        data={serviceSchema({
          path: PATH,
          name: 'LVP installation in Central Florida',
          serviceType: 'Luxury vinyl plank (LVP) flooring installation',
          areaServed: CITY_LINKS.map((c) => ({ name: c.name, county: c.county })).concat([{ name: 'Orlando', county: 'Orange County' }]),
          lvpTiers: true,
        })}
      />
      <JsonLd data={faqPageSchema(FAQS, PATH)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'LVP Installation', path: PATH }])} />
      <div dangerouslySetInnerHTML={{ __html: html() }} />
      <Script src="/lvp-installation-kissimmee-interactive.js" strategy="afterInteractive" />
    </>
  );
}
