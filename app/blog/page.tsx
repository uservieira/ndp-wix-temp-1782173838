import type { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Flooring Guides & LVP Tips | New Design Pro Blog',
  description: 'Honest flooring guides from a Central Florida installer: LVP costs, LVP vs laminate, install timelines, and real per-square-foot pricing for 2026.',
};

const PAGE_HTML = `

<header class="site-header">
  <a class="brand-mark" href="/" aria-label="New Design Pro home">
    <svg width="34" height="34" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="36" height="36" rx="8" fill="#17140F"/>
      <path d="M11 30V10M11 10L22 30M22 10V30" stroke="#E85D2F" stroke-width="2.4" stroke-linecap="square" stroke-linejoin="miter"/>
      <path d="M25 26.5L29 26.5" stroke="#F7F3EE" stroke-width="2.4" stroke-linecap="square"/>
    </svg>
    <span><span class="brand-name">New Design Pro</span><span class="brand-sub">LVP · Flooring · Remodeling</span></span>
  </a>
  <input type="checkbox" id="nav-toggle" class="nav-toggle" aria-hidden="true" />
  <label class="nav-backdrop" for="nav-toggle" aria-hidden="true"></label>
  <label class="nav-burger" for="nav-toggle" aria-label="Toggle menu">
    <svg class="icon-open" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
    <svg class="icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
  </label>
  <nav class="nav-links" aria-label="Primary">
    <a href="/#top">Home</a>
    <a href="/#flooring">Flooring</a>
    <a href="/#services">Services</a>
    <a href="/#reviews">Reviews</a>
    <a class="nav-refer" href="/refer-earn">Refer &amp; Earn</a>
    <a href="/about">About</a>
    <a href="/#contact">Contact</a>
  </nav>
  <div class="nav-right">
    <a class="cta-phone" href="tel:+15618093864">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      <span class="cta-label">Call (561) 809-3864</span>
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

<footer class="site-footer">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-brand-name">New Design Pro</div>
      <p>Clean, modern floors and interior renovations. Davenport, Orlando, and Central Florida.</p>
      <span class="footer-lang-chip">Falamos Português · Hablamos Español</span>
    </div>
    <div class="footer-col">
      <h4>Menu</h4>
      <ul class="footer-menu">
        <li><a href="/#top">Home</a></li>
        <li><a href="/#flooring">Flooring</a></li>
        <li><a href="/#services">Services</a></li>
        <li><a href="/#reviews">Reviews</a></li>
        <li><a href="/refer-earn">Refer &amp; Earn</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/#contact">Contact</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h4>Contact</h4>
      <ul class="footer-contact-list">
        <li><a href="tel:+15618093864">(561) 809-3864</a></li>
        <li><a href="mailto:contact@newdesignpro.com">contact@newdesignpro.com</a></li>
        <li><span>Davenport, FL — Serving Central Florida</span></li>
      </ul>
      <div class="footer-social">
        <a href="https://www.instagram.com/newdesignpro" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
        <a href="https://www.facebook.com/newdesignpro" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
        <a href="https://www.youtube.com/@newdesignpro" target="_blank" rel="noopener" aria-label="YouTube"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none"/></svg></a>
        <a href="https://www.tiktok.com/@newdesignpro" target="_blank" rel="noopener" aria-label="TikTok"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 2h-3v13.5a2.5 2.5 0 1 1-2.5-2.5c.17 0 .34.02.5.05V10a5.5 5.5 0 1 0 5 5.47V8.6a6.5 6.5 0 0 0 3 .9V6.4a3.5 3.5 0 0 1-3-3.4z"/></svg></a>
      </div>
    </div>
  </div>
  <div class="footer-legal">
    © <span id="year"></span> New Design Pro · Huios Construction LLC · Central Florida · Fully insured · <a href="tel:+15618093864">(561) 809-3864</a>
    · <a href="/privacy" target="_blank" rel="noopener">Privacy</a>
    · <a href="/terms" target="_blank" rel="noopener">Terms</a>
  </div>
</footer>

`;

export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/blog-index-interactive.js" strategy="afterInteractive" />
    </>
  );
}
