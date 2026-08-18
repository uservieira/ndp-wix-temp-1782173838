import type { MetadataRoute } from 'next';

const BASE = 'https://newdesignpro.com';
const BLOG_SLUGS = [
  'lvp-installation-kissimmee-cost-process',
  'lvp-installation-timeline-2-bedroom-job',
  'lvp-vs-laminate-florida-humidity',
  'vinyl-plank-cost-per-square-foot-central-florida-2026',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/tile`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/refer`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: 'weekly' as const },
  ];
  const blogPages = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }));
  return [...staticPages.map((p) => ({ ...p, lastModified: now })), ...blogPages];
}
