import type { Metadata } from 'next';
import Script from 'next/script';
import { PROJECTS } from '@/data/projects';
import { cityHeaderHtml, siteFooterHtml } from '@/lib/chrome';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';
import { BUSINESS_ID, breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Recent Flooring Projects in Central Florida',
  description:
    'Real LVP and tile projects completed by New Design Pro across Polk and Osceola counties, with the city, scope, square footage, and days on site for each job.',
  alternates: { canonical: '/projects' },
  // Keep out of the index until real projects are published (honest empty state).
  robots: PROJECTS.length ? { index: true, follow: true } : { index: false, follow: true },
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const pic = (ph: { src: string; alt: string }, label: string) => `<figure class="ba-fig"><picture><source type="image/webp" srcset="${ph.src}-md.webp 800w, ${ph.src}-lg.webp 1600w" sizes="(min-width: 900px) 40vw, 50vw" /><img src="${ph.src}-md.jpg" alt="${esc(ph.alt)}" loading="lazy" /></picture>${label ? `<figcaption>${label}</figcaption>` : ''}</figure>`;

function cardsHtml(): string {
  return PROJECTS.map(
    (p) => `<article class="project-case" id="${p.id}">
      <div class="pcase-head">
        <div class="pc-date">${p.city ? `${esc(p.city)}, FL · ` : 'Central Florida · '}${esc(p.completed)}</div>
        <h2>${esc(p.title)}</h2>
        ${p.sqft || p.product ? `<p class="pcase-meta">${p.sqft ? `${p.sqft.toLocaleString('en-US')} sq ft` : ''}${p.days ? ` · ${p.days} ${p.days === 1 ? 'day' : 'days'} on site` : ''}${p.product ? ` · Duralast ${esc(p.product.collection)}, ${esc(p.product.color)}` : ''}</p>` : ''}
      </div>
      ${p.pairs ? `<div class="pcase-pairs">${p.pairs.map((pr) => `<div class="ba-pair">${pic(pr.before, 'Before')}${pic(pr.after, 'After')}</div>`).join('')}</div>` : ''}
      ${p.gallery ? `<div class="pcase-gallery">${p.gallery.map((g) => pic(g, '')).join('')}</div>` : ''}
      <div class="pcase-body">
        <h3>What we did</h3>
        <ul>${p.scope.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        ${p.product ? `<a class="btn btn-primary" href="${p.product.href}">Get a quote for ${esc(p.product.color)}</a>` : '<a class="btn btn-primary" href="/form">Get my price</a>'}
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
    <p>Real LVP and tile jobs from around Polk and Osceola counties, with before and after photos, the scope and the square footage.</p>
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

function projectsSchema() {
  const img = (src: string, alt: string, city?: string) => ({
    '@type': 'ImageObject',
    contentUrl: `${SITE_URL}${src}-lg.webp`,
    thumbnailUrl: `${SITE_URL}${src}-md.jpg`,
    caption: alt,
    creator: { '@type': 'Organization', '@id': BUSINESS_ID, name: 'New Design Pro', url: SITE_URL },
    copyrightHolder: { '@type': 'Organization', '@id': BUSINESS_ID, name: 'New Design Pro' },
    creditText: 'New Design Pro',
    copyrightNotice: `© ${new Date().getFullYear()} New Design Pro`,
    license: `${SITE_URL}/terms`,
    acquireLicensePage: `${SITE_URL}/terms`,
    ...(city ? { contentLocation: { '@type': 'Place', name: `${city}, FL` } } : {}),
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/projects#page`,
    url: `${SITE_URL}/projects`,
    name: 'Recent flooring projects by New Design Pro',
    about: { '@id': BUSINESS_ID },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'CreativeWork',
          '@id': `${SITE_URL}/projects#${p.id}`,
          name: p.title,
          description: p.scope.join('. ') + '.',
          creator: { '@id': BUSINESS_ID },
          ...(p.city ? { locationCreated: { '@type': 'Place', name: `${p.city}, FL` } } : {}),
          image: [
            ...(p.pairs ?? []).flatMap((pr) => [img(pr.before.src, pr.before.alt, p.city), img(pr.after.src, pr.after.alt, p.city)]),
            ...(p.gallery ?? []).map((g) => img(g.src, g.alt, p.city)),
          ],
        },
      })),
    },
  };
}

export default function ProjectsPage() {
  return (
    <>
      {/* TODO-DANIEL: add real jobs to data/projects.ts (city, scope, sq ft, days, 2–3 photos). The page switches to indexable and joins the sitemap automatically once PROJECTS is non-empty. */}
      {PROJECTS.length ? <JsonLd data={projectsSchema()} /> : null}
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Projects', path: '/projects' }])} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/lvp-installation-kissimmee-interactive.js" strategy="afterInteractive" />
    </>
  );
}
