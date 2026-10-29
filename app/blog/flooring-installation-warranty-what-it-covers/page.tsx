import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { getPost } from '@/data/blog';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { articlePageHtml } from '@/lib/articlePage';

const SLUG = 'flooring-installation-warranty-what-it-covers';
export const metadata: Metadata = {
  alternates: { canonical: `/blog/${SLUG}` },
  title: "Flooring Installation Warranty: What It Covers and What's Normal",
  description: "Manufacturer vs. workmanship warranty, why 1 year is the industry norm, what is and isn't covered, and how New Design Pro's 1-year, 3-year and lifetime limited tiers compare.",
};

const PAGE_HTML = articlePageHtml({
  kicker: 'Warranties <span class="dot"></span> October 29, 2026',
  h1: "Flooring installation warranties: <em>what's normal</em> and what to ask for",
  image: '/blog-img/lvp-timeline-hero.webp',
  back: true,
  body: `<p>"Does it come with a warranty?" is one of the first questions I get. The honest answer is that there are two warranties on every floor, and most people only hear about one.</p>

<h2>Two warranties, two different things</h2>
<ul>
<li><strong>Manufacturer warranty:</strong> covers the material itself. If the plank is defective or the wear layer fails, that's the manufacturer.</li>
<li><strong>Workmanship (installation) warranty:</strong> covers how it was installed. Gaps, lifting, loose transitions, buckling from a missing expansion gap. That's the installer.</li>
</ul>
<p>Here's the catch: most floor failures in the first years come from installation and prep, not the plank. And a manufacturer can deny a claim if the floor wasn't installed to their guidelines. So the installer's warranty, and the installer's work, matter a lot.</p>

<h2>What's normal in the industry</h2>
<p>Most national flooring chains and big-box store installers offer a 1-year installation warranty. Some offer longer terms with a lot of conditions. One year is the baseline. Anything less, or anything that isn't in writing, is a red flag.</p>

<h2>What a workmanship warranty should cover</h2>
<ul>
<li>Planks separating, lifting or peaking because of installation</li>
<li>Visible gaps between planks</li>
<li>Transitions, quarter round and baseboards coming loose</li>
<li>Buckling from expansion-gap mistakes</li>
</ul>

<h2>What no installer can honestly cover</h2>
<p>A floating floor sits on your slab. If the slab moves, cracks, or moisture or water comes up through it, that isn't an installation defect. Same for flooding, plumbing leaks, pet damage, or heavy cabinets installed on top of the floor later. A good warranty says this plainly instead of hiding it.</p>

<h2>Our warranty tiers</h2>
<table class="trust-table">
<thead><tr><th>Package</th><th>Workmanship warranty</th></tr></thead>
<tbody>
<tr><td><strong>Entry</strong> ($4.99/sq ft)</td><td>1 year</td></tr>
<tr><td><strong>Standard</strong> ($5.99/sq ft)</td><td>3 years</td></tr>
<tr><td><strong>Premium</strong> ($7.99/sq ft)</td><td>Lifetime limited, original owner</td></tr>
<tr><td><strong>Labor-only</strong> (your material)</td><td>1 year on installation labor</td></tr>
</tbody></table>
<p>Every job also keeps the Duralast manufacturer warranty on the material, and we register it for you. Premium jobs include a documented flatness check, slab moisture reading and a written job file, which is what lets us stand behind them for the long haul.</p>
<p>Read the full terms on our <a href="/warranty">written warranty page</a>.</p>

<h2>3 questions to ask about any warranty</h2>
<ol>
<li>Is it in writing, and can I see it before I sign?</li>
<li>Who do I call, and what happens after I report a problem?</li>
<li>Will this company still be in business to honor it? (Here's <a href="/blog/cheapest-flooring-quote-overhead">why that matters more than the term</a>.)</li>
</ol>`,
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
