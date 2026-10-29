import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema, BUSINESS_ID } from '@/lib/schema';
import { faqSectionHtml } from '@/lib/chrome';
import { articlePageHtml } from '@/lib/articlePage';
import { SITE_URL, SERVICE_AREA } from '@/lib/site';
import { SHOWROOM, SHOWROOM_FAQS } from '@/data/trust';

const PATH = '/in-home-showroom';
export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: 'In-Home Flooring Showroom: See Full Floors in Your Light',
  description: 'See up to 3 Duralast LVP colors built out as full boxes on top of your current floor, in your own lighting. $99, credited in full toward your project. Polk and Osceola counties.',
};

const body = `
<p>A 4-inch sample in a store tells you almost nothing. Florida light changes everything: a gray that looks perfect under showroom bulbs can turn blue at 5pm next to your sliding door. So we bring the showroom to you.</p>

<h2>How it works</h2>
<ol>${SHOWROOM.steps.map((s) => `<li>${s}</li>`).join('')}</ol>

<div class="pull-price">
  <div class="pp-item"><span class="pp-num">$${SHOWROOM.fee}</span><span class="pp-label">In-Home Showroom visit</span></div>
  <div class="pp-item"><span class="pp-num">100%</span><span class="pp-label">credited toward your project when you book</span></div>
</div>

<h2>Why a full box, not a sample</h2>
<p>One plank shows you a color. A full box clicked together shows you the floor: how the pattern repeats, how the bevels catch light, how it sits next to your baseboards and cabinets. It's the closest thing to seeing the finished room before a single plank goes down.</p>

<h2>Who it's for</h2>
<ul>
  <li>You've narrowed it down to a few colors and can't decide.</li>
  <li>You're doing a big area or the whole house and want to be sure.</li>
  <li>You want to see it with your furniture, walls and cabinets, in morning and evening light.</li>
</ul>
<p>Prefer to browse first? See all colors in the <a href="/#lvp-pricing">Duralast showroom on our site</a>. The in-home measure and written quote are always free, and your price is locked at the measure. See our <a href="/no-surprise-charges">no surprise charges promise</a> and <a href="/warranty">written warranty</a>.</p>
`;

const PAGE_HTML = articlePageHtml({
  kicker: 'In-Home Showroom',
  h1: 'See your new floor <em>in your own home</em> before you decide.',
  image: '/blog-img/lvp-vs-laminate-hero.webp',
  body,
  cta: 'Book your <em>In-Home Showroom</em> or free measure.',
  extra: faqSectionHtml('showroom-faq', 'Showroom questions', 'How the <em>in-home showroom</em> works.', SHOWROOM_FAQS),
});

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${SITE_URL}${PATH}#service`,
  name: SHOWROOM.name,
  serviceType: 'In-home flooring showroom and sample consultation',
  url: `${SITE_URL}${PATH}`,
  description: SHOWROOM.summary,
  provider: { '@id': BUSINESS_ID },
  areaServed: SERVICE_AREA.map((name) => ({ '@type': 'City', name: `${name}, FL` })),
  offers: { '@type': 'Offer', price: SHOWROOM.fee, priceCurrency: 'USD', description: 'Credited in full toward your flooring project when you book.' },
};

export default function Page() {
  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqPageSchema(SHOWROOM_FAQS, PATH)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'In-Home Showroom', path: PATH }])} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/blog-lvp-vs-laminate-florida-humidity-interactive.js" strategy="afterInteractive" />
    </>
  );
}
