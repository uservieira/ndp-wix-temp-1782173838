import type { Metadata } from 'next';
import Script from 'next/script';
import { PROJECTS } from '@/data/projects';
import { projectCaseHtml } from '@/lib/projectHtml';
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

function cardsHtml(): string {
  return PROJECTS.map((p) => projectCaseHtml(p)).join('\n');
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
    <p>Real flooring, shower and outdoor kitchen jobs from around Central Florida, with before, process and after photos.</p>
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
            ...(p.process ?? []).map((g) => img(g.src, g.alt, p.city)),
            ...(p.before ?? []).map((g) => img(g.src, g.alt, p.city)),
            ...(p.processGroups ?? []).flatMap((grp) => grp.photos.map((g) => img(g.src, g.alt, p.city))),
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
