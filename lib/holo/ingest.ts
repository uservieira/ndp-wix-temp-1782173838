// Turns a verified Holo webhook payload into a stored post: sanitized HTML, images copied
// into the repo, one commit on main. The main-branch deploy then builds the page.
import { createHash } from 'node:crypto';
import { imageInfo } from '@/lib/holo/imageSize';
import { sanitizeHoloHtml, normalizeHeadings, textOf } from '@/lib/holo/sanitize';
import { commitFiles, readFile, type FileWrite } from '@/lib/holo/github';
import { HOLO_IMAGE_DIR, HOLO_POSTS_DIR, SLUG_RE, isTakenSlug, type HoloPost } from '@/lib/holo/posts';

export class IngestError extends Error {
  // 5xx statuses make Holo retry; 4xx statuses are final and show in Holo's delivery history.
  constructor(public status: number, message: string) {
    super(message);
  }
}

const MAX_IMAGES = 30;
const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const MAX_TOTAL_IMAGE_BYTES = 30 * 1024 * 1024;
const KEEP_DELIVERIES = 25;

type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  contentHtml: string;
  metaTitle: string;
  metaDescription: string;
  featuredImage: string | null;
  images: { url: string; alt: string }[];
  publishedAt: string;
};

export type Delivery = { event: string; deliveryId: string; sentAt: string; article: Article };

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, max) : '');
const isoDate = (v: unknown) => (typeof v === 'string' && !Number.isNaN(Date.parse(v)) ? new Date(v).toISOString() : '');

// Checks the payload shape. Throws IngestError(422) on anything we can't publish safely.
export function parseDelivery(payload: any, headerDeliveryId: string | null): Delivery {
  if (payload?.version !== 1) throw new IngestError(422, 'Unsupported payload version');
  const deliveryId = str(payload.deliveryId, 80) || str(headerDeliveryId, 80);
  if (!/^[0-9a-zA-Z-]{8,80}$/.test(deliveryId)) throw new IngestError(422, 'Missing deliveryId');
  const a = payload.article;
  if (!a || typeof a !== 'object') throw new IngestError(422, 'Missing article');
  const slug = str(a.slug, 200).toLowerCase();
  if (!SLUG_RE.test(slug) || slug.length > 100) throw new IngestError(422, 'Article slug is not URL-safe');
  const title = str(a.title, 300);
  if (!title) throw new IngestError(422, 'Article title is empty');
  if (typeof a.contentHtml !== 'string' || !a.contentHtml.trim()) throw new IngestError(422, 'Article content is empty');
  const publishedAt = isoDate(a.publishedAt) || isoDate(payload.sentAt);
  if (!publishedAt) throw new IngestError(422, 'Article publishedAt is missing');
  return {
    event: String(payload.event),
    deliveryId,
    sentAt: isoDate(payload.sentAt) || new Date().toISOString(),
    article: {
      id: str(a.id, 80),
      slug,
      title,
      excerpt: str(a.excerpt, 600),
      contentHtml: a.contentHtml,
      metaTitle: str(a.metaTitle, 200),
      metaDescription: str(a.metaDescription, 400),
      featuredImage: typeof a.featuredImage === 'string' && a.featuredImage.trim() ? a.featuredImage.trim() : null,
      images: Array.isArray(a.images)
        ? a.images.filter((i: any) => i && typeof i.url === 'string').map((i: any) => ({ url: i.url.trim(), alt: str(i.alt, 300) }))
        : [],
      publishedAt,
    },
  };
}

// Only public https hosts. Image URLs come from a signed payload; this stops a bad URL
// from pointing the function at an address that is not a normal public web host.
function assertPublicHttps(raw: string): URL {
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    throw new IngestError(422, 'Image URL is not valid');
  }
  const host = u.hostname.toLowerCase();
  const bad =
    u.protocol !== 'https:' || u.username !== '' || u.password !== '' || (u.port !== '' && u.port !== '443') ||
    host === 'localhost' || !host.includes('.') || host.includes(':') || /^[0-9.]+$/.test(host) ||
    /\.(local|internal|localhost|lan|home|corp)$/.test(host);
  if (bad) throw new IngestError(422, 'Image URL is not allowed');
  return u;
}

async function download(raw: string): Promise<Buffer> {
  let url = assertPublicHttps(raw);
  for (let hop = 0; hop < 4; hop++) {
    let res: Response;
    try {
      res = await fetch(url, { redirect: 'manual', cache: 'no-store', signal: AbortSignal.timeout(8_000), headers: { 'User-Agent': 'ndp-holo-webhook' } });
    } catch {
      throw new IngestError(502, 'Could not download an article image');
    }
    if (res.status >= 300 && res.status < 400) {
      const loc = res.headers.get('location');
      if (!loc) break;
      url = assertPublicHttps(new URL(loc, url).toString());
      continue;
    }
    if (!res.ok) throw new IngestError(502, `Could not download an article image (${res.status})`);
    if (Number(res.headers.get('content-length') ?? 0) > MAX_IMAGE_BYTES) throw new IngestError(422, 'An article image is larger than 8 MB');
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length > MAX_IMAGE_BYTES) throw new IngestError(422, 'An article image is larger than 8 MB');
    return buf;
  }
  throw new IngestError(502, 'Could not download an article image');
}

type Stored = { src: string; width: number; height: number; path: string; content: Buffer };

export type IngestResult = { slug: string; status: 'published' | 'updated' | 'duplicate' | 'stale' | 'unchanged'; commit?: string };

export async function ingest(d: Delivery): Promise<IngestResult> {
  const a = d.article;
  const slug = a.slug;
  if (isTakenSlug(slug)) throw new IngestError(409, `The slug "${slug}" belongs to an existing page on the site. Change the slug in Holo.`);

  const jsonPath = `${HOLO_POSTS_DIR}/${slug}.json`;
  let prev: HoloPost | null = null;
  const prevText = await readFile(jsonPath);
  if (prevText) {
    try {
      prev = JSON.parse(prevText) as HoloPost;
    } catch {
      prev = null;
    }
  }
  if (prev?.deliveryIds?.includes(d.deliveryId)) return { slug, status: 'duplicate' };
  // A late retry of an older delivery must not overwrite a newer version.
  if (prev?.lastSentAt && Date.parse(d.sentAt) < Date.parse(prev.lastSentAt)) return { slug, status: 'stale' };

  // Pass 1: clean the HTML and list the images it really uses.
  const wanted = new Map<string, string>(); // url -> alt
  const altByUrl = new Map(a.images.map((i) => [i.url, i.alt]));
  const firstPass = sanitizeHoloHtml(a.contentHtml, (img) => {
    // Inline images that are not https (http, data:, relative) are dropped from the article.
    if (!/^https:\/\//i.test(img.src)) return null;
    wanted.set(img.src, img.alt || altByUrl.get(img.src) || '');
    return img;
  });
  if (textOf(firstPass).length < 40) throw new IngestError(422, 'Article content is empty after cleaning');
  if (a.featuredImage && !wanted.has(a.featuredImage)) wanted.set(a.featuredImage, '');
  if (wanted.size > MAX_IMAGES) throw new IngestError(422, `Article has more than ${MAX_IMAGES} images`);

  // Copy every image into the repo under a content-hash name.
  const stored = new Map<string, Stored>();
  let total = 0;
  await Promise.all(
    [...wanted.keys()].map(async (url) => {
      const buf = await download(url);
      const info = imageInfo(buf);
      if (!info) throw new IngestError(422, 'An article image is not a PNG, JPG, WebP, GIF or AVIF file');
      total += buf.length;
      const name = `${createHash('sha256').update(buf).digest('hex').slice(0, 16)}.${info.ext}`;
      stored.set(url, { src: `/blog/holo/${slug}/${name}`, width: info.width, height: info.height, path: `${HOLO_IMAGE_DIR}/${slug}/${name}`, content: buf });
    }),
  );
  if (total > MAX_TOTAL_IMAGE_BYTES) throw new IngestError(422, 'Article images add up to more than 30 MB');

  // Pass 2: point every image at its stored copy.
  const contentHtml = normalizeHeadings(
    sanitizeHoloHtml(a.contentHtml, (img) => {
      const s = stored.get(img.src);
      return s ? { src: s.src, alt: img.alt || altByUrl.get(img.src) || '', width: s.width, height: s.height } : null;
    }),
    a.title,
  );

  const featured = a.featuredImage ? stored.get(a.featuredImage) : undefined;
  const isUpdate = !!prev;
  const post: HoloPost = {
    source: 'holo',
    id: a.id,
    slug,
    title: a.title,
    excerpt: a.excerpt,
    metaTitle: a.metaTitle,
    metaDescription: a.metaDescription,
    contentHtml,
    featuredImage: featured ? { src: featured.src, width: featured.width, height: featured.height } : null,
    // The first publish date stays on the post; updates only move updatedAt.
    publishedAt: prev?.publishedAt && !Number.isNaN(Date.parse(prev.publishedAt)) ? prev.publishedAt : a.publishedAt,
    updatedAt: isUpdate ? d.sentAt : a.publishedAt,
    lastSentAt: d.sentAt,
    deliveryIds: [...(prev?.deliveryIds ?? []), d.deliveryId].slice(-KEEP_DELIVERIES),
  };

  if (prev) {
    const same = (['id', 'title', 'excerpt', 'metaTitle', 'metaDescription', 'contentHtml'] as const).every((k) => prev![k] === post[k]) &&
      JSON.stringify(prev.featuredImage ?? null) === JSON.stringify(post.featuredImage);
    if (same) return { slug, status: 'unchanged' };
  }

  const images: FileWrite[] = [...new Map([...stored.values()].map((s) => [s.path, { path: s.path, content: s.content }])).values()];
  const safeTitle = a.title.replace(/\s+/g, ' ').slice(0, 80);
  const commit = await commitFiles({
    message: `Holo: ${isUpdate ? 'update' : 'publish'} "${safeTitle}" (/blog/${slug})\n\nDelivery ${d.deliveryId}, sent ${d.sentAt}. Written by /api/holo-webhook.`,
    files: [{ path: jsonPath, content: Buffer.from(`${JSON.stringify(post, null, 2)}\n`, 'utf8') }, ...images],
    pruneDir: `${HOLO_IMAGE_DIR}/${slug}`,
    keep: images.map((i) => i.path),
  });
  return { slug, status: isUpdate ? 'updated' : 'published', commit };
}
