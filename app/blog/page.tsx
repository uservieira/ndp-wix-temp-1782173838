import type { Metadata } from 'next';
import Script from 'next/script';
import { BUSINESS_PHONE } from '@/lib/site';
import { siteFooterHtml } from '@/lib/chrome';

export const metadata: Metadata = {
  alternates: { canonical: '/blog' },
  title: 'Flooring Guides & LVP Tips for Florida Homes',
  description:
    'Honest flooring guides from a Central Florida installer: LVP costs, LVP vs laminate, install timelines, durability, and real per-square-foot pricing for 2026.',
};

const PAGE_HTML = `

<header class="site-header">
  <a class="brand-mark" href="/" aria-label="New Design Pro home">
    <svg class="logo-mark" viewBox="297 191 943 414" width="91" height="40" aria-hidden="true" focusable="false"><path fill="currentColor" d="M317.0 436.0V191.0H393.9L534.9 340.1H499.3V191.0H590.4V436.0H513.5L372.5 286.9H408.1V436.0ZM627.7 436.0V191.0H764.4Q810.7 191.0 846.0 205.9Q881.3 220.8 901.1 248.1Q920.9 275.4 920.9 313.5Q920.9 351.3 901.1 378.8Q881.3 406.2 846.0 421.1Q810.7 436.0 764.4 436.0ZM721.2 371.6H760.4Q780.2 371.6 795.1 365.0Q809.9 358.3 818.3 345.2Q826.6 332.1 826.6 313.5Q826.6 294.6 818.3 281.7Q809.9 268.7 795.1 262.1Q780.2 255.4 760.4 255.4H721.2ZM947.1 436.0V191.0H1080.6Q1119.4 191.0 1147.8 202.2Q1176.1 213.4 1191.5 234.2Q1207.0 255.1 1207.0 283.4Q1207.0 311.8 1191.5 332.4Q1176.1 353.1 1147.8 364.4Q1119.4 375.8 1080.6 375.8H999.0L1040.6 340.4V436.0ZM1040.6 349.6 999.0 312.1H1074.6Q1094.1 312.1 1103.4 304.4Q1112.7 296.7 1112.7 283.4Q1112.7 270.1 1103.4 262.4Q1094.1 254.7 1074.6 254.7H999.0L1040.6 217.2Z"/><path fill="#DA5626" d="M328,461 L763.7,461 L735.7,527 L300,527 ZM772.7,461 L1038,461 L1010,527 L744.7,527 ZM445,538 L679.0,538 L651.0,605 L417,605 ZM688.0,538 L1240,538 L1212,605 L660.0,605 Z"/></svg>
    <span><span class="brand-name">New Design Pro</span><span class="brand-sub">Flooring &amp; Remodeling</span></span>
  </a>
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true" />
  <label class="nav-backdrop" for="nav-toggle" aria-hidden="true"></label>
  <label class="nav-burger" for="nav-toggle" aria-label="Toggle menu">
    <svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
    <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
  </label>
  <nav class="nav-links" aria-label="Primary">
    <a href="/#top">Home</a>
    <a href="/#lvp-pricing">Flooring</a>
    <a href="/tile">Tile</a>
    <a href="/reviews">Reviews</a>
    <a class="nav-refer" href="/refer">Refer &amp; Earn</a>
    <a href="/about">About</a>
    <a href="/#contact">Contact</a>
  </nav>
  <div class="nav-right">
    <a class="cta-phone" href="tel:${BUSINESS_PHONE.e164}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span class="cta-label" data-phone-display="${BUSINESS_PHONE.display}" data-phone-short="${BUSINESS_PHONE.short}">Call ${BUSINESS_PHONE.display}</span>
    </a>
  </div>
</header>

<section class="blog-index-hero">
  <div class="bih-inner">
    <span class="eyebrow">The New Design Pro blog</span>
    <h1>Straight answers on <em>floors</em>.</h1>
    <p>No fluff, no sales pitch. Real costs, real timelines, and honest advice on LVP and flooring for Central Florida homes — written by the guy who does the work.</p>
  </div>
</section>

<section class="post-list">
  <div class="post-list-inner">
    <a class="post-card" href="/blog/does-spc-lvp-look-cheap-honest-installer-answer">
      <div class="pc-thumb" style="background-image:url('/blog-img/lvp-kissimmee-thumb.webp');" aria-hidden="true"></div>
      <div class="pc-body">
        <div class="pc-date">August 18, 2026</div>
        <h2>Does SPC LVP Look Cheap? The Honest Installer Answer</h2>
        <p>When the plastic-floor reputation is deserved, when it isn't, and how to tell the difference in your own light.</p>
        <span class="pc-more">Read the post
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>
    <a class="post-card" href="/blog/will-spc-lvp-dent-scratch-hold-up-central-florida">
      <div class="pc-thumb" style="background-image:url('/blog-img/lvp-kissimmee-thumb.webp');" aria-hidden="true"></div>
      <div class="pc-body">
        <div class="pc-date">August 18, 2026</div>
        <h2>Will SPC LVP Dent, Scratch, or Hold Up? A Central Florida Installer's Honest Take</h2>
        <p>Dogs, kids, heavy furniture, and real-world wear: what holds up on SPC LVP and what doesn't.</p>
        <span class="pc-more">Read the post
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>
    <a class="post-card" href="/blog/spc-lvp-vs-real-hardwood-central-florida">
      <div class="pc-thumb" style="background-image:url('/blog-img/lvp-kissimmee-thumb.webp');" aria-hidden="true"></div>
      <div class="pc-body">
        <div class="pc-date">August 18, 2026</div>
        <h2>"But It's Not Real Wood": Why SPC LVP Wins in Central Florida Homes</h2>
        <p>The honest case for SPC luxury vinyl plank over real hardwood in humid Central Florida homes.</p>
        <span class="pc-more">Read the post
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>
    <a class="post-card" href="/blog/lvp-installation-kissimmee-cost-process">
      <div class="pc-thumb" style="background-image:url('/blog-img/lvp-kissimmee-thumb.webp');"></div>
      <div class="pc-body">
        <div class="pc-date">July 22, 2026</div>
        <h2>LVP Installation in Kissimmee, FL: What It Costs and How the Job Really Goes</h2>
        <p>Real per-square-foot pricing and a day-by-day look at how an LVP job actually goes in Kissimmee.</p>
        <span class="pc-more">Read the post
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>
    <a class="post-card" href="/blog/lvp-vs-laminate-florida-humidity">
      <div class="pc-thumb" style="background-image:url('/blog-img/lvp-vs-laminate-thumb.webp');"></div>
      <div class="pc-body">
        <div class="pc-date">July 22, 2026</div>
        <h2>LVP vs Laminate for Florida Homes: Which Actually Holds Up in Humidity</h2>
        <p>Laminate looks cheaper on day one. Here's which floor actually survives Florida humidity and slab moisture.</p>
        <span class="pc-more">Read the post
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>
    <a class="post-card" href="/blog/vinyl-plank-cost-per-square-foot-central-florida-2026">
      <div class="pc-thumb" style="background-image:url('/blog-img/vinyl-cost-thumb.webp');"></div>
      <div class="pc-body">
        <div class="pc-date">July 22, 2026</div>
        <h2>Vinyl Plank Cost Per Square Foot in Central Florida (2026 Real Numbers)</h2>
        <p>The actual 2026 numbers, by tier, plus what a real house costs at each price point.</p>
        <span class="pc-more">Read the post
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>
    <a class="post-card" href="/blog/lvp-installation-timeline-2-bedroom-job">
      <div class="pc-thumb" style="background-image:url('/blog-img/lvp-timeline-thumb.webp');"></div>
      <div class="pc-body">
        <div class="pc-date">July 22, 2026</div>
        <h2>How Long Does LVP Installation Actually Take? A Real 2-Bedroom Timeline</h2>
        <p>A real two-bedroom job walked through hour by hour, plus what can stretch the timeline.</p>
        <span class="pc-more">Read the post
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      </div>
    </a>
  </div>
</section>

${siteFooterHtml()}

`;

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/blog-index-interactive.js" strategy="afterInteractive" />
    </>
  );
}
