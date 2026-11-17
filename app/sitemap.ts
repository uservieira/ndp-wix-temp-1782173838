import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { CITIES } from '@/data/cities';
import { BLOG_POSTS } from '@/data/blog';
import { PROJECTS } from '@/data/projects';
import { holoAsBlogPosts } from '@/lib/holo/posts';


type Entry = { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' | 'yearly'; lastModified?: string };

// Real last-content-change date for non-blog pages. Bump when page content changes
// (a build-time date on every URL teaches Google to ignore lastmod).
const SITE_UPDATED = '2026-10-29'; // footer trust links + warranty/showroom/no-surprise pages

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Entry[] = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/lvp', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/tile', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/reviews', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/refer', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/form', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/warranty', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/no-surprise-charges', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/in-home-showroom', priority: 0.8, changeFrequency: 'monthly' },
    // /projects joins the sitemap once it has real projects (noindex while empty).
    ...(PROJECTS.length ? [{ path: '/projects', priority: 0.7, changeFrequency: 'weekly' as const }] : []),
    { path: '/blog', priority: 0.9, changeFrequency: 'weekly' },
    ...CITIES.map((c) => ({ path: c.path, priority: 0.85, changeFrequency: 'monthly' as const })),
    ...BLOG_POSTS.map((b) => ({ path: `/blog/${b.slug}`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: b.datePublished })),
    // Posts published from Holo (data/holo-posts), with their real last-update date.
    ...holoAsBlogPosts().map((b) => ({ path: `/blog/${b.slug}`, priority: 0.7, changeFrequency: 'monthly' as const, lastModified: b.dateModified })),
  ];
  return pages.map((p) => ({
    url: p.path === '/' ? SITE_URL : `${SITE_URL}${p.path}`,
    lastModified: new Date(p.lastModified ?? SITE_UPDATED),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
