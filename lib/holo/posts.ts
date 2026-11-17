// Build-time reader for posts published from Holo (data/holo-posts/<slug>.json).
// Files are written only by /api/holo-webhook. Pages that use this are statically generated.
import fs from 'node:fs';
import path from 'node:path';
import { BLOG_POSTS, type BlogPost } from '@/data/blog';
import { sanitizeHoloHtml, normalizeHeadings } from '@/lib/holo/sanitize';

export type HoloImage = { src: string; width: number; height: number; alt?: string };

export type HoloPost = {
  source: 'holo';
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  metaTitle: string;
  metaDescription: string;
  contentHtml: string;
  featuredImage: HoloImage | null;
  publishedAt: string;
  updatedAt: string;
  lastSentAt: string;
  deliveryIds: string[];
};

export const HOLO_POSTS_DIR = 'data/holo-posts';
export const HOLO_IMAGE_DIR = 'public/blog/holo';
export const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Site-relative path of a stored Holo image: /blog/holo/<slug>/<16 hex>.<ext>
export const HOLO_IMAGE_RE = /^\/blog\/holo\/[a-z0-9-]+\/[a-f0-9]{16}\.(?:png|jpg|gif|webp|avif)$/;

// Slugs a Holo post may never take: hand-written posts and the image folder.
const RESERVED = new Set(['holo', 'feed', 'rss', 'page']);
export const isTakenSlug = (slug: string) => RESERVED.has(slug) || BLOG_POSTS.some((b) => b.slug === slug);

const FALLBACK_HERO = '/blog-img/lvp-kissimmee-hero.webp';
const FALLBACK_THUMB = '/blog-img/lvp-kissimmee-thumb.webp';

let cache: HoloPost[] | null = null;

export function holoPosts(): HoloPost[] {
  if (cache) return cache;
  const dir = path.join(process.cwd(), HOLO_POSTS_DIR);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith('.json')) : [];
  const posts: HoloPost[] = [];
  for (const file of files) {
    const slug = file.slice(0, -5);
    try {
      const p = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8')) as HoloPost;
      const valid =
        p && p.source === 'holo' && p.slug === slug && SLUG_RE.test(slug) && !isTakenSlug(slug) &&
        typeof p.title === 'string' && p.title.trim() !== '' && typeof p.contentHtml === 'string' &&
        !Number.isNaN(Date.parse(p.publishedAt));
      if (!valid) {
        console.warn(`[holo] skipped ${file}: not a valid Holo post`);
        continue;
      }
      posts.push(p);
    } catch {
      console.warn(`[holo] skipped ${file}: unreadable`);
    }
  }
  posts.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  cache = posts;
  return posts;
}

export const holoPost = (slug: string) => holoPosts().find((p) => p.slug === slug);

// Next.js image optimizer URL for a file under /public.
const opt = (src: string, w: number, q = 75) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=${q}`;
const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

export const heroImage = (p: HoloPost) => (p.featuredImage ? opt(p.featuredImage.src, 1200, 70) : FALLBACK_HERO);
export const thumbImage = (p: HoloPost) => (p.featuredImage ? opt(p.featuredImage.src, 828, 70) : FALLBACK_THUMB);
// Un-optimized, site-relative image for Open Graph, schema and the image sitemap.
export const shareImage = (p: HoloPost) => p.featuredImage?.src ?? FALLBACK_HERO;

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));

export const displayDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'long', day: 'numeric', year: 'numeric' });
export const isoDay = (iso: string) => new Date(iso).toLocaleDateString('en-CA', { timeZone: 'America/New_York' });

// Article body ready for the page: sanitized again, only our own stored images kept,
// images served through the optimizer at the article column's sizes, tables scrollable on phones.
export function bodyHtml(p: HoloPost): string {
  const prefix = `/blog/holo/${p.slug}/`;
  const clean = sanitizeHoloHtml(p.contentHtml, (img) =>
    HOLO_IMAGE_RE.test(img.src) && img.src.startsWith(prefix) ? img : null,
  );
  return normalizeHeadings(clean, p.title)
    .replace(/<img\b[^>]*>/g, (tag) => {
      const src = tag.match(/\ssrc="([^"]+)"/)?.[1] ?? '';
      const alt = tag.match(/\salt="([^"]*)"/)?.[1] ?? '';
      const w = tag.match(/\swidth="(\d+)"/)?.[1];
      const h = tag.match(/\sheight="(\d+)"/)?.[1];
      const srcset = [640, 828, 1080, 1920].map((x) => `${attr(opt(src, x))} ${x}w`).join(', ');
      return `<img src="${attr(opt(src, 1080))}" srcset="${srcset}" sizes="(max-width: 760px) 100vw, 720px" alt="${alt}"${w && h ? ` width="${w}" height="${h}"` : ''} loading="lazy" decoding="async" />`;
    })
    .replace(/<table>/g, '<div class="table-scroll"><table>')
    .replace(/<\/table>/g, '</table></div>');
}

// Shape used by the sitemap, image sitemap, llms.txt and Article schema.
export function holoAsBlogPosts(): (BlogPost & { dateModified: string; description: string })[] {
  return holoPosts().map((p) => ({
    slug: p.slug,
    title: p.title,
    datePublished: isoDay(p.publishedAt),
    dateModified: isoDay(p.updatedAt || p.publishedAt),
    description: p.metaDescription || p.excerpt,
    image: shareImage(p),
  }));
}
