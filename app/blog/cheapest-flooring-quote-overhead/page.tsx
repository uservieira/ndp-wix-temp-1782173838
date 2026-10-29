import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { getPost } from '@/data/blog';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { articlePageHtml } from '@/lib/articlePage';

const SLUG = 'cheapest-flooring-quote-overhead';
export const metadata: Metadata = {
  alternates: { canonical: `/blog/${SLUG}` },
  title: 'Why the Cheapest Flooring Quote Can Cost You More (Overhead, Explained)',
  description: "What overhead is, why a flooring contractor who doesn't price it won't be around in six months, and what that means for your floor, your warranty and you.",
};

const PAGE_HTML = articlePageHtml({
  kicker: 'Behind the price <span class="dot"></span> October 29, 2026',
  h1: 'Why the cheapest flooring quote <em>can cost you more</em>',
  image: '/blog-img/lvp-kissimmee-hero.webp',
  back: true,
  body: `<p>I get it. Everyone wants to save money, and flooring isn't cheap. So when one contractor comes in way under the others, it's tempting. Before you sign, I want to explain something most homeowners never think about: overhead.</p>

<h2>What you see vs. what a business actually pays</h2>
<p>Think of a quote like an iceberg. Above the water you see labor and material. That's what most people compare. But a real flooring business pays for a lot more, every single month:</p>
<ul>
<li>Liability insurance</li>
<li>The truck, gas and tolls to get to your house</li>
<li>Saws, blades and tools that wear out</li>
<li>Dump and disposal fees</li>
<li>Phone, scheduling and software</li>
<li>Taxes</li>
<li>Paying installers on time, every time</li>
<li>Money set aside for when something goes wrong and we have to come back</li>
</ul>
<p>That's overhead. It's not profit, and it's not padding. It's what it costs to run a real business that will still exist next year.</p>

<blockquote class="note">If a contractor prices only labor and material, he's not cheaper. He's just not counting.</blockquote>

<h2>Where will he be in six months?</h2>
<p>Here's what nobody thinks about on signing day. Six months from now, a plank lifts by the fridge. A transition strip pops loose. You want the same floor in the bedroom and need the exact color. You're selling the house and need the paperwork.</p>
<p>Who picks up the phone?</p>
<p>The contractor who didn't price his overhead isn't losing money on just your job. He's losing it on every job. That catches up fast. Either he closes up, changes his business name, or stops answering calls he can't afford to fix.</p>

<h2>What you're really paying for</h2>
<p>A floor lasts years. You want the person who installed it to last too. When you pay a fair price, you're not just paying for planks. You're paying for:</p>
<ul>
<li>Someone who comes back if something goes wrong</li>
<li>A written warranty from a business that will still exist to honor it</li>
<li>Insurance that protects you if someone gets hurt in your home</li>
<li>The time to do the prep right, which is what makes a floor last</li>
</ul>

<h2>How we price</h2>
<p>We're 10+ years as a family business, with installers who each bring 10+ years on the tools. We price so we're still here to answer the phone years from now. Our packages are public: $4.99, $5.99 and $7.99 per square foot, supplied and installed, with a <a href="/warranty">written warranty from 1 year to lifetime limited</a>. Insured, with a certificate of insurance available on request. And the price at the measure is the price. See our <a href="/no-surprise-charges">no surprise charges promise</a>.</p>
<p>Comparing quotes right now? Read <a href="/blog/how-to-compare-flooring-quotes-central-florida">the 5 questions to ask before you sign</a>.</p>`,
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
