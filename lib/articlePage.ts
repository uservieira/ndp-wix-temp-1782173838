// Shared HTML shell for article-style pages (trust pages + blog posts).
import { cityHeaderHtml, siteFooterHtml } from '@/lib/chrome';

export function articlePageHtml(o: { kicker: string; h1: string; image: string; body: string; cta?: string; back?: boolean; extra?: string }): string {
  return `
${cityHeaderHtml()}
<article>
  <div class="blog-hero">
    <div class="bh-bg" style="background-image:url('${o.image}');"></div>
    <div class="bh-fade"></div>
    <div class="bh-inner">
      <div class="kicker">${o.kicker}</div>
      <h1>${o.h1}</h1>
      <div class="byline">By Daniel Vieira · New Design Pro · Davenport, FL</div>
    </div>
  </div>
  ${o.back ? `<div class="article-back"><a href="/blog"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg> All posts</a></div>` : ''}
  <div class="article"><div class="article-inner">
${o.body}
  </div></div>
  ${o.extra ?? ''}
  <section class="post-cta"><div class="pc-inner">
    <h2>${o.cta ?? 'Ready to get a <em>real number</em> for your job?'}</h2>
    <a class="btn btn-white" href="/#contact">Get a free measure
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
    </a>
  </div></section>
</article>
${siteFooterHtml()}
`;
}

export const list = (items: readonly string[]) => `<ul>${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;
