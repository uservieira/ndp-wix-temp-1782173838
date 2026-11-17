import type { Metadata } from 'next';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/JsonLd';
import { articleSchema, breadcrumbSchema } from '@/lib/schema';
import { articlePageHtml } from '@/lib/articlePage';
import { BUSINESS } from '@/lib/site';
import { bodyHtml, displayDate, esc, heroImage, holoAsBlogPosts, holoPost, holoPosts, shareImage } from '@/lib/holo/posts';

// Posts published from Holo (data/holo-posts/<slug>.json, written by /api/holo-webhook).
// Built as static pages. Hand-written posts in app/blog/<slug>/page.tsx take priority:
// Next.js matches their folders first, and the webhook refuses their slugs.
export const dynamicParams = false;

export function generateStaticParams() {
  return holoPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = holoPost(params.slug);
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || undefined;
  const path = `/blog/${post.slug}`;
  const image = post.featuredImage
    ? { url: post.featuredImage.src, width: post.featuredImage.width, height: post.featuredImage.height, alt: post.title }
    : { url: shareImage(post) };
  return {
    alternates: { canonical: path },
    // Skip the "| New Design Pro" suffix when the SEO title already names the business.
    title: title.toLowerCase().includes(BUSINESS.name.toLowerCase()) ? { absolute: title } : title,
    description,
    openGraph: {
      type: 'article',
      locale: 'en_US',
      siteName: BUSINESS.name,
      url: path,
      title,
      description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [BUSINESS.owner],
      images: [image],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = holoPost(params.slug);
  if (!post) notFound();
  const schemaPost = holoAsBlogPosts().find((b) => b.slug === post.slug)!;
  const html = articlePageHtml({
    kicker: `Flooring guide <span class="dot"></span> ${displayDate(post.publishedAt)}`,
    h1: esc(post.title),
    image: heroImage(post).replace(/&/g, '&amp;'),
    back: true,
    body: `<div class="holo-body">${bodyHtml(post)}</div>`,
  });
  return (
    <>
      <JsonLd data={articleSchema(schemaPost)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: `/blog/${post.slug}` }])} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/blog-index-interactive.js" strategy="afterInteractive" />
    </>
  );
}
