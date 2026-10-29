import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { faqSectionHtml } from '@/lib/chrome';
import { articlePageHtml, list } from '@/lib/articlePage';
import { WARRANTY_TIERS, WARRANTY_COVERS, WARRANTY_EXCLUDES, WARRANTY_TERMS, WARRANTY_FAQS } from '@/data/trust';

const PATH = '/warranty';
export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: 'Written Flooring Warranty: 1 Year to Lifetime Limited',
  description: 'New Design Pro puts its flooring workmanship warranty in writing: 1 year on Entry, 3 years on Standard, lifetime limited on Premium. What it covers, what it does not, and how to file a claim.',
};

const body = `
<p>Most flooring warranties are a sentence in small print. Ours is in writing, it comes with every job, and it tells you exactly what we fix and what we don't. If something we installed fails because of how we installed it, we come back and make it right.</p>

<h2>Warranty by package</h2>
<table class="trust-table">
  <thead><tr><th>Package</th><th>Price</th><th>Workmanship warranty</th></tr></thead>
  <tbody>${WARRANTY_TIERS.map((t) => `<tr><td><strong>${t.tier}</strong></td><td>${t.price}</td><td>${t.term}</td></tr>`).join('')}</tbody>
</table>
<p>For comparison, most national flooring chains and big-box installers offer a 1-year installation warranty. Our Standard package triples that, and Premium is a lifetime limited warranty for as long as you own the home.</p>
<p>On top of our workmanship warranty, your Duralast (Durato) flooring carries its own manufacturer warranty on the material. We register it for you.</p>

<h2>What we cover</h2>
${list(WARRANTY_COVERS)}

<h2>What we don't cover</h2>
${list(WARRANTY_EXCLUDES)}
<p>These aren't loopholes. A floating floor sits on your slab, so if the slab moves or water comes up through it, no installer on earth can promise that. That's why we look at your floor at the measure before we quote, and why Premium jobs get a documented flatness check, a slab moisture reading and a written job file.</p>

<h2>The fine print, in plain English</h2>
${list(WARRANTY_TERMS)}

<h2>Why we can stand behind it</h2>
<p>10+ years as a family business, with installers who each bring 10+ years on the tools. We price every job so the business is still here years from now to answer the phone. A warranty is only worth something if the company is still around to honor it. Insured. Certificate of insurance available on request.</p>
<p>Want to know what else is in the price? Read our <a href="/no-surprise-charges">no surprise charges promise</a>, or see how we <a href="/blog/flooring-installation-warranty-what-it-covers">compare warranties across the industry</a>.</p>
`;

const PAGE_HTML = articlePageHtml({
  kicker: 'Written Warranty',
  h1: 'Our written warranty: <em>what we fix</em>, and for how long.',
  image: '/blog-img/lvp-kissimmee-hero.webp',
  body,
  cta: 'Get your quote with the <em>warranty in writing</em>.',
  extra: faqSectionHtml('warranty-faq', 'Warranty questions', 'Straight answers on <em>coverage</em>.', WARRANTY_FAQS),
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageSchema(WARRANTY_FAQS, PATH)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Written Warranty', path: PATH }])} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/blog-lvp-vs-laminate-florida-humidity-interactive.js" strategy="afterInteractive" />
    </>
  );
}
