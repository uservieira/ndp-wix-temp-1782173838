// Image sitemap: real project photos and blog images, so Google Images and AI visual search can find them.
import { SITE_URL } from '@/lib/site';
import { PROJECTS } from '@/data/projects';
import { BLOG_POSTS } from '@/data/blog';

export const dynamic = 'force-static';

const x = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
  const imgTag = (loc: string, caption: string) =>
    `<image:image><image:loc>${x(loc)}</image:loc><image:caption>${x(caption)}</image:caption></image:image>`;
  const projectImgs = PROJECTS.flatMap((p) => [
    ...(p.pairs ?? []).flatMap((pr) => [pr.before, pr.after]),
    ...(p.gallery ?? []),
  ]).map((ph) => imgTag(`${SITE_URL}${ph.src}-lg.webp`, ph.alt));
  const urls = [
    `<url><loc>${SITE_URL}/projects</loc>${projectImgs.join('')}</url>`,
    ...BLOG_POSTS.filter((b) => b.image).map(
      (b) => `<url><loc>${SITE_URL}/blog/${b.slug}</loc>${imgTag(`${SITE_URL}${b.image}`, b.title)}</url>`,
    ),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
