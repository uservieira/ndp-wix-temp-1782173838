import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { CITIES } from '@/data/cities';
import { BLOG_POSTS } from '@/data/blog';
import { PROJECTS } from '@/data/projects';


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
    // /projects joins the sitemap once it has real projects (noindex while empty).
    ...(PROJECTS.length ? [{ path: '/projects', priority: 0.7, changeFrequency: 'weekly' as const }] : []),
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
    ...CITIES.map((c) => ({ path: c.path, priority: 0.85, changeFrequency: 'monthly' as const })),
    ...BLOG_POSTS.map((b) => ({ path: `/blog/${b.slug}`, priority: 0.7, changeFrequency: 'monthly' as const })),
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
