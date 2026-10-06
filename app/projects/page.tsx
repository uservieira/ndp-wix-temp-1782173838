import type { Metadata } from 'next';
import Script from 'next/script';
import { PROJECTS } from '@/data/projects';
import { cityHeaderHtml, siteFooterHtml } from '@/lib/chrome';

export const metadata: Metadata = {
  title: 'Recent Flooring Projects in Central Florida',
  description:
    'Real LVP and tile projects completed by New Design Pro across Polk and Osceola counties, with the city, scope, square footage, and days on site for each job.',
  alternates: { canonical: '/projects' },
  // Keep out of the index until real projects are published (honest empty state).
  robots: PROJECTS.length ? { index: true, follow: true } : { index: false, follow: true },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function cardsHtml(): string {
  return PROJECTS.map(
    (p) => `<article class="post-card project-card">
      ${p.photos[0] ? `<img class="pc-photo" src="${esc(p.photos[0].src)}" alt="${esc(p.photos[0].alt)}" loading="lazy" />` : ''}
      <div class="pc-body">
        <div class="pc-date">${esc(p.city)}, FL</div>
        <h2>${esc(p.scope)}</h2>
        <p>${p.sqft.toLocaleString('en-US')} sq ft · ${p.days} ${p.days === 1 ? 'day' : 'days'} on site</p>
      </div>
    </article>`,
  ).join('\n');
}

const EMPTY_HTML = `<div class="projects-empty">
      <h2>Project write-ups are on the way</h2>
      <p>We only post real jobs, with real photos and the homeowner's permission, so this page stays empty until the first write-ups are ready. In the meantime, read what customers say in our <a href="/reviews">Google reviews</a>, or <a href="/form">get a price range for your own floor</a>.</p>
    </div>`;

const PAGE_HTML = `
${cityHeaderHtml()}

<main>
<section class="blog-index-hero">
  <div class="bih-inner">
    <span class="eyebrow">Projects</span>
    <h1>Recent <em>projects</em>.</h1>
    <p>Real LVP and tile jobs from around Polk and Osceola counties: the city, the scope, the square footage, and how many days we were on site.</p>
  </div>
</section>

<section class="post-list">
  <div class="post-list-inner">
    ${PROJECTS.length ? cardsHtml() : EMPTY_HTML}
  </div>
</section>
</main>

${siteFooterHtml()}
`;

export default function ProjectsPage() {
  return (
    <>
      {/* TODO-DANIEL: add real jobs to data/projects.ts (city, scope, sq ft, days, 2–3 photos). The page switches to indexable and joins the sitemap automatically once PROJECTS is non-empty. */}
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/lvp-installation-kissimmee-interactive.js" strategy="afterInteractive" />
    </>
  );
}
