import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { getPost } from '@/data/blog';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { articlePageHtml } from '@/lib/articlePage';

const SLUG = 'how-to-compare-flooring-quotes-central-florida';
export const metadata: Metadata = {
  alternates: { canonical: `/blog/${SLUG}` },
  title: 'How to Compare Flooring Quotes: 5 Questions Before You Sign',
  description: 'Got three flooring quotes and one is way lower? A Central Florida installer explains what cheap quotes leave out and the 5 questions to ask before you sign.',
};

const PAGE_HTML = articlePageHtml({
  kicker: 'Comparing quotes <span class="dot"></span> October 29, 2026',
  h1: 'Three flooring quotes, one floor: <em>how to tell which one is real</em>',
  image: '/blog-img/vinyl-cost-hero.webp',
  back: true,
  body: `<p>Here's a situation I see every month. A homeowner gets three quotes for the same 1,000 square feet of LVP. Two are close. One is thousands lower. They call me and ask: "Is the cheap one a scam, or are you two just expensive?"</p>
<p>Usually it's neither. The cheap quote is just shorter. It leaves things out, and those things show up later, on install day, when your furniture is already in the garage.</p>

<h2>What cheap quotes usually leave out</h2>
<ul>
<li><strong>Removing the old floor.</strong> Tearing out carpet or tile and hauling it away is real labor and real dump fees.</li>
<li><strong>Subfloor prep and leveling.</strong> This is the big one. Most Florida slabs need some leveling for a click floor to stay tight. If it's not on the quote, it becomes a "we found something" charge.</li>
<li><strong>Baseboards, quarter round and transitions.</strong> The floor isn't finished without them.</li>
<li><strong>Insurance.</strong> If someone gets hurt in your home, you want to know the contractor is covered.</li>
<li><strong>A warranty in writing.</strong> "We stand behind our work" isn't a warranty.</li>
</ul>

<blockquote class="note">The cheapest quote isn't always cheaper. Sometimes it's just shorter.</blockquote>

<h2>The 5 questions to ask every contractor</h2>
<ol>
<li><strong>Is removal and haul-away of my old floor included?</strong></li>
<li><strong>If my subfloor needs leveling, what does it cost, and is it on this quote?</strong></li>
<li><strong>Are baseboards, quarter round and transitions in this price?</strong></li>
<li><strong>Can I see your certificate of insurance?</strong></li>
<li><strong>If something goes wrong in a year, who do I call, and is that in writing?</strong></li>
</ol>
<p>If a contractor can't answer all five clearly, you don't have a quote. You have a guess.</p>

<h2>Compare line by line, not bottom line</h2>
<p>Put the quotes side by side and check each one for the same items: square footage, plank (brand, thickness, wear layer), removal, prep, trim, and warranty. Once you add back what the cheap one left out, the gap usually shrinks or disappears.</p>
<p>Also check the square footage. If one contractor measured 900 and another 1,050, someone is guessing. A real quote comes from a real in-home measure.</p>

<h2>How we quote</h2>
<p>We measure every room in person, check how flat your floor is, and write down the prep your home needs. Then it goes on an itemized written quote. Disposal, haul-away and standard subfloor prep identified at the measure are included, and the price doesn't change on install day. That's our <a href="/no-surprise-charges">no surprise charges promise</a>. Every job also comes with a <a href="/warranty">written workmanship warranty</a>.</p>
<p>Want to see the real numbers first? Our LVP packages are $4.99, $5.99 and $7.99 per square foot, supplied and installed. See them on the <a href="/#lvp-pricing">homepage</a>.</p>`,
});

export default function Page() {
  const post = getPost(SLUG);
  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${SLUG}` }])} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/blog-lvp-vs-laminate-florida-humidity-interactive.js" strategy="afterInteractive" />
    </>
  );
}
