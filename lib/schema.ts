// JSON-LD helpers. Render with <JsonLd data={...} /> (components/JsonLd.tsx), which
// server-renders a <script type="application/ld+json"> into the initial HTML.
// No AggregateRating/Review markup: Google treats first-party review markup on a
// LocalBusiness as self-serving, and data/reviews.ts only holds a handful of reviews.
import type { Faq } from '@/data/cities';
import type { BlogPost } from '@/data/blog';
import { BUSINESS, BUSINESS_PHONE, HOURS, LVP_TIERS, SERVICE_AREA, SITE_URL } from '@/lib/site';

export const BUSINESS_ID = `${SITE_URL}/#business`;
const abs = (path: string) => (path.startsWith('http') ? path : `${SITE_URL}${path === '/' ? '' : path}`);

export function businessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': BUSINESS_ID,
    name: BUSINESS.name,
    legalName: BUSINESS.legalName,
    url: SITE_URL,
    telephone: BUSINESS_PHONE.e164,
    email: BUSINESS.email,
    image: `${SITE_URL}/assets/lvp-livingroom-md-v19.jpg`,
    logo: `${SITE_URL}/assets/logo-ndp-lockup.png`,
    priceRange: '$$',
    // Service-area business: locality only, never a street address.
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS.locality,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    areaServed: SERVICE_AREA.map((name) => ({ '@type': 'City', name: `${name}, FL` })),
    openingHoursSpecification: HOURS.filter((h) => h.days.length).map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    knowsLanguage: [...BUSINESS.languages],
    hasMap: BUSINESS.gbpUrl,
    sameAs: [BUSINESS.gbpUrl],
  };
}

export function serviceSchema(opts: {
  path: string;
  name: string;
  serviceType: string;
  areaServed: { name: string; county?: string }[];
  // LVP pages: one Offer per owner-locked tier (from LVP_TIERS).
  lvpTiers?: boolean;
  // Quoted-only services (tile): no public price, description only.
  quotedDescription?: string;
}) {
  const url = abs(opts.path);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    url,
    provider: { '@id': BUSINESS_ID },
    areaServed: opts.areaServed.map((a) => ({
      '@type': 'City',
      name: `${a.name}, FL`,
      ...(a.county ? { containedInPlace: { '@type': 'AdministrativeArea', name: `${a.county}, FL` } } : {}),
    })),
    ...(opts.lvpTiers
      ? {
          offers: LVP_TIERS.map((t) => ({
            '@type': 'Offer',
            name: `${t.name} LVP, supplied and installed`,
            description: `${t.name} tier: ${t.includes.join(', ')}.`,
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'UnitPriceSpecification',
              price: t.price,
              priceCurrency: 'USD',
              unitCode: 'FTK',
              unitText: 'per square foot',
            },
          })),
        }
      : {}),
    ...(opts.quotedDescription
      ? {
          description: opts.quotedDescription,
          // Quoted-only: an Offer with no public price.
          offers: { '@type': 'Offer', description: opts.quotedDescription },
        }
      : {}),
  };
}

export function faqPageSchema(faqs: Faq[], path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${abs(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function articleSchema(post: BlogPost) {
  const url = abs(`/blog/${post.slug}`);
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    url,
    mainEntityOfPage: url,
    datePublished: post.datePublished,
    image: [abs(post.image)],
    author: { '@type': 'Person', name: BUSINESS.owner, url: abs('/about') },
    publisher: { '@id': BUSINESS_ID },
  };
}
