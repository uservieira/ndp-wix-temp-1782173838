// Shared HTML-string chrome for the string-rendered pages (header nav pieces,
// global footer, service-area links). React wrappers live in components/.
import { CITY_LINKS } from '@/data/cities';
import { BUSINESS, BUSINESS_PHONE, CLAIMS, HOURS } from '@/lib/site';

export function serviceAreasHtml(variant: 'section' | 'footer' = 'section'): string {
  const items = CITY_LINKS.map(
    (c) => `<li><a href="${c.path}">${c.anchor}</a></li>`,
  ).join('');
  if (variant === 'footer') {
    return `<div class="footer-areas"><h4>Service areas</h4><ul class="footer-areas-list">${items}</ul></div>`;
  }
  return `<section id="service-areas" class="service-areas" aria-labelledby="service-areas-title">
  <div class="section-inner">
    <span class="eyebrow">Service areas</span>
    <h2 class="section-title" id="service-areas-title">Local LVP and tile crews, <em>close to home</em>.</h2>
    <p class="sa-lead">We're based in Davenport and work across Polk and Osceola counties. Pick your city for local pricing, ZIP codes, and the questions homeowners there ask us most. Need tile? See <a href="/tile">tile installation</a>, or read our <a href="/reviews">Google reviews</a>.</p>
    <ul class="sa-grid">${CITY_LINKS.map((c) => `<li><a class="sa-link" href="${c.path}"><span class="sa-name">${c.anchor}</span><span class="sa-county">${c.name}, FL · ${c.county}</span></a></li>`).join('')}</ul>
  </div>
</section>`;
}

export function hoursHtml(): string {
  return HOURS.map((h) => `<li><span>${h.label}</span><span>${h.text}</span></li>`).join('');
}

const SOCIAL_HTML = `<div class="footer-social">
        <a href="https://www.instagram.com/newdesign.pro" target="_blank" rel="noopener" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </a>
        <a href="https://www.facebook.com/newdesign.pro" target="_blank" rel="noopener" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="https://www.youtube.com/@newdesignpro" target="_blank" rel="noopener" aria-label="YouTube">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
        </a>
      </div>`;

// Global footer used by every string-rendered page (and React pages via <SiteFooter />).
export function siteFooterHtml(): string {
  const year = new Date().getFullYear();
  return `<footer class="site-footer" id="footer">
  <div class="footer-grid">
    <div class="footer-col">
      <div class="footer-brand-name">${BUSINESS.name}</div>
      <p>LVP &middot; Tile &middot; Remodeling. ${BUSINESS.baseLine}.</p>
      <span class="footer-lang-chip" lang="pt">Falamos Português</span>
    </div>

    <div class="footer-col">
      <h4>Menu</h4>
      <ul class="footer-menu">
        <li><a href="/">Home</a></li>
        <li><a href="/#lvp-pricing">LVP flooring</a></li>
        <li><a href="/tile">Tile</a></li>
        <li><a href="/reviews">Reviews</a></li>
        <li><a href="/refer">Refer &amp; Earn</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/blog">Blog</a></li>
        <li><a href="/form">Get a quote</a></li>
      </ul>
    </div>

    <div class="footer-col footer-nap">
      <h4>Contact</h4>
      <ul class="footer-contact-list">
        <li><strong class="footer-nap-name">${BUSINESS.name}</strong></li>
        <li><a href="tel:${BUSINESS_PHONE.e164}">${BUSINESS_PHONE.display}</a></li>
        <li><a href="mailto:${BUSINESS.email}">${BUSINESS.email}</a></li>
        <li><span>${BUSINESS.baseLine}</span></li>
      </ul>
      ${SOCIAL_HTML}
      <h4 class="footer-hours-title">Hours</h4>
      <ul class="footer-hours">${hoursHtml()}</ul>
    </div>
  </div>

  ${serviceAreasHtml('footer')}

  <div class="footer-legal">
    © <span id="year">${year}</span> ${BUSINESS.name} · ${BUSINESS.legalName} · ${CLAIMS.insured ? `Fully insured · ${CLAIMS.insuranceNote}` : ''} · <a href="tel:${BUSINESS_PHONE.e164}">${BUSINESS_PHONE.display}</a>
    · <a href="/privacy">Privacy</a>
    · <a href="/terms">Terms</a>
  </div>
</footer>`;
}
