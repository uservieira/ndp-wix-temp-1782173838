import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { breadcrumbSchema, faqPageSchema } from '@/lib/schema';
import { faqSectionHtml } from '@/lib/chrome';
import { articlePageHtml, list } from '@/lib/articlePage';
import { NO_SURPRISE, NO_SURPRISE_FAQS } from '@/data/trust';

const PATH = '/no-surprise-charges';
export const metadata: Metadata = {
  alternates: { canonical: PATH },
  title: 'No Surprise Charges: Your Flooring Price Is Set at the Measure',
  description: 'No dump fees, prep fees or install-day surprises. New Design Pro sets your flooring price at the free in-home measure, and nothing extra happens without your written OK.',
};

const body = `
<blockquote class="note">${NO_SURPRISE.promise}</blockquote>

<p>The most common complaint homeowners have about flooring contractors isn't the price on the quote. It's the price on install day. "Your subfloor needs leveling, that's extra." "Disposal wasn't included." You're stuck with your furniture in the garage and no real choice but to pay. We don't work that way.</p>

<h2>What will never show up later</h2>
${list(NO_SURPRISE.noLater)}

<h2>The only two things that can change the price</h2>
${list(NO_SURPRISE.canChange)}
<p>Both need your written approval before we do anything. Every change is a written change order you sign, with the reason and the price on it.</p>

<h2>How we make that possible</h2>
<p>It comes down to the measure. We don't quote from a photo or a guess. We come out, measure every room, check how flat the floor is, look at transitions and doorways, and write down what prep your home needs. Then it all goes on the written quote, itemized, usually within 24 hours. If it's on the quote, it's in the price.</p>
<p>That's also why the cheapest quote you get isn't always cheaper. Read <a href="/blog/how-to-compare-flooring-quotes-central-florida">how to compare flooring quotes</a> before you sign anything, and see what our <a href="/warranty">written warranty</a> covers.</p>
`;

const PAGE_HTML = articlePageHtml({
  kicker: 'No Surprise Charges',
  h1: 'The price at the measure is <em>the price</em>.',
  image: '/blog-img/vinyl-cost-hero.webp',
  body,
  cta: 'Get a <em>locked price</em> at your free measure.',
  extra: faqSectionHtml('pricing-faq', 'Pricing questions', 'No <em>install-day</em> surprises.', NO_SURPRISE_FAQS),
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqPageSchema(NO_SURPRISE_FAQS, PATH)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'No Surprise Charges', path: PATH }])} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/blog-lvp-vs-laminate-florida-humidity-interactive.js" strategy="afterInteractive" />
    </>
  );
}
