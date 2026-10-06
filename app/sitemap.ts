import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const BLOG_SLUGS = [
  'lvp-installation-kissimmee-cost-process',
  'lvp-installation-timeline-2-bedroom-job',
  'lvp-vs-laminate-florida-humidity',
  'vinyl-plank-cost-per-square-foot-central-florida-2026',
  'will-spc-lvp-dent-scratch-hold-up-central-florida',
  'does-spc-lvp-look-cheap-honest-installer-answer',
  'spc-lvp-vs-real-hardwood-central-florida',
];

const CITY_PATHS = [
  '/lvp-installation-kissimmee',
  '/lvp-installation-haines-city',
  '/lvp-installation-winter-haven',
  '/remodeling-davenport',
];

type Entry = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly' };

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: Entry[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tile', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/reviews', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/refer', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/form', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
    ...CITY_PATHS.map((path) => ({ path, priority: 0.85, changeFrequency: 'monthly' as const })),
    ...BLOG_SLUGS.map((slug) => ({ path: `/blog/${slug}`, priority: 0.7, changeFrequency: 'monthly' as const })),
    { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  ];
  return pages.map((p) => ({
    url: p.path === '/' ? SITE_URL : `${SITE_URL}${p.path}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
