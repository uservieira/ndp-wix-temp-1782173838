import type { Metadata } from 'next';
import Script from 'next/script';
import JsonLd from '@/components/JsonLd';
import { getPost } from '@/data/blog';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { articlePageHtml } from '@/lib/articlePage';

const SLUG = 'how-to-choose-flooring-installer-central-florida';
export const metadata: Metadata = {
  alternates: { canonical: `/blog/${SLUG}` },
  title: 'How to Choose a Flooring Installer in Central Florida (and Avoid the Common Nightmares)',
  description: 'The 8 things homeowners in Davenport, Kissimmee and Polk County fear most about flooring contractors, and exactly how to check for each one before you hire.',
};

const PAGE_HTML = articlePageHtml({
  kicker: 'Hiring an installer <span class="dot"></span> October 29, 2026',
  h1: 'How to choose a flooring installer in Central Florida <em>without the nightmares</em>',
  image: '/blog-img/lvp-kissimmee-hero.webp',
  back: true,
  body: `<p>Ask anyone who's redone their floors and you'll hear a story. The contractor who vanished after the deposit. The "small" leveling fee that wasn't small. The floor that started gapping by summer. Most homeowners are less worried about price than about hiring the wrong person.</p>
<p>Here are the 8 fears I hear most from homeowners in Davenport, Kissimmee, Haines City and around Polk and Osceola, and how to check for each one before you hire.</p>

<h2>1. "He'll disappear."</h2>
<p><strong>Check:</strong> How long have they been in business? Do they have a real website, a Google Business Profile and reviews from real neighbors? Same name and phone number everywhere?</p>

<h2>2. "The price will change on install day."</h2>
<p><strong>Check:</strong> Did they measure in person? Is the quote itemized with removal, prep and trim? Ask what happens if they find something under the old floor.</p>

<h2>3. "The floor will fail in a year."</h2>
<p><strong>Check:</strong> Ask how they check flatness and moisture before installing. Prep is what makes a floor last. If they don't mention it, that's your answer.</p>

<h2>4. "Nobody will tell me anything."</h2>
<p><strong>Check:</strong> Who's your contact during the job? Will you get updates? How fast did they answer your first message?</p>

<h2>5. "My house will be a disaster."</h2>
<p><strong>Check:</strong> Ask what cleanup looks like at the end of each day and at the end of the job.</p>

<h2>6. "Strangers in my home."</h2>
<p><strong>Check:</strong> Will the owner be on site? Is it the same crew every day?</p>

<h2>7. "What if someone gets hurt?"</h2>
<p><strong>Check:</strong> Ask for a certificate of insurance. A real business sends it without hesitating.</p>

<h2>8. "I'm getting ripped off on materials."</h2>
<p><strong>Check:</strong> The quote should name the brand, collection, thickness and wear layer. Ask to see the box.</p>

<blockquote class="note">The right installer answers all eight before you even ask.</blockquote>

<h2>How New Design Pro answers them</h2>
<ul>
<li><strong>Staying power:</strong> 10+ years as a family business, with installers who each bring 10+ years on the tools.</li>
<li><strong>Locked price:</strong> your price is set at the free in-home measure. <a href="/no-surprise-charges">No surprise charges.</a></li>
<li><strong>Prep first:</strong> we look at your floor at the measure and put the prep on the quote. Premium adds a documented flatness check, slab moisture reading and written job file.</li>
<li><strong>Written warranty:</strong> 1 year, 3 years or lifetime limited, depending on the package. <a href="/warranty">See the terms.</a></li>
<li><strong>Insured:</strong> certificate of insurance available on request.</li>
<li><strong>Real material:</strong> Duralast (Durato) SPC only, named on every quote.</li>
<li><strong>See it first:</strong> our <a href="/in-home-showroom">In-Home Showroom</a> builds full boxes of up to 3 colors on your current floor.</li>
<li><strong>Public pricing:</strong> $4.99, $5.99 and $7.99 per square foot, supplied and installed.</li>
<li><strong>English and Portuguese.</strong></li>
</ul>
<p>Before you sign with anyone, read <a href="/blog/how-to-compare-flooring-quotes-central-florida">the 5 questions to ask every flooring contractor</a>.</p>`,
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
