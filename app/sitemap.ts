import type { MetadataRoute } from 'next';

const BASE = 'https://newdesignpro.com';
const BLOG_SLUGS = [
  'lvp-installation-kissimmee-cost-process',
  'lvp-installation-timeline-2-bedroom-job',
  'lvp-vs-laminate-florida-humidity',
  'vinyl-plank-cost-per-square-foot-central-florida-2026',
  'will-spc-lvp-dent-scratch-hold-up-central-florida',
  'does-spc-lvp-look-cheap-honest-installer-answer',
  'spc-lvp-vs-real-hardwood-central-florida',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = [
    { url: BASE, priority: 1.0, changeFrequency: 'weekly' as const },
    { url: `${BASE}/about`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${BASE}/tile`, priority: 0.8, changeFrequency: 'monthly' as const },
    { url: `${BASE}/refer`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${BASE}/lvp-installation-kissimmee`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/remodeling-davenport`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/lvp-installation-haines-city`, priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/lvp-installation-winter-haven`, priority: 0.85, changeFrequency: 'monthly' as const },
  ];
  const blogPages = BLOG_SLUGS.map((slug) => ({
    url: `${BASE}/blog/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
    lastModified: now,
  }));
  return [...staticPages.map((p) => ({ ...p, lastModified: now })), ...blogPages];
}
