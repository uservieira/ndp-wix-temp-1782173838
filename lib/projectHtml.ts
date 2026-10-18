import type { Project } from '@/data/projects';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const pic = (ph: { src: string; alt: string }, label: string) => `<figure class="ba-fig"><picture><source type="image/webp" srcset="${ph.src}-md.webp 800w, ${ph.src}-lg.webp 1600w" sizes="(min-width: 900px) 40vw, 50vw" /><img src="${ph.src}-md.jpg" alt="${esc(ph.alt)}" loading="lazy" /></picture>${label ? `<figcaption>${label}</figcaption>` : ''}</figure>`;

export function projectCaseHtml(p: Project, headingTag: 'h2' | 'h3' = 'h2'): string {
  const sub = headingTag === 'h2' ? 'h3' : 'h4';
  return `<article class="project-case" id="${p.id}">
      <div class="pcase-head">
        <div class="pc-date">${p.city ? `${esc(p.city)}, FL · ` : 'Central Florida · '}${esc(p.completed)}</div>
        <${headingTag}>${esc(p.title)}</${headingTag}>
        ${p.sqft || p.product ? `<p class="pcase-meta">${p.sqft ? `${p.sqft.toLocaleString('en-US')} sq ft` : ''}${p.days ? ` · ${p.days} ${p.days === 1 ? 'day' : 'days'} on site` : ''}${p.product ? ` · Duralast ${esc(p.product.collection)}, ${esc(p.product.color)}` : ''}</p>` : ''}
      </div>
      ${p.pairs ? `<div class="pcase-pairs">${p.pairs.map((pr) => `<div class="ba-pair">${pic(pr.before, 'Before')}${pic(pr.after, 'After')}</div>`).join('')}</div>` : ''}
      ${p.gallery ? `<div class="pcase-gallery">${p.gallery.map((g) => pic(g, '')).join('')}</div>` : ''}
      <div class="pcase-body">
        <${sub}>What we did</${sub}>
        <ul>${p.scope.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        ${p.product ? `<a class="btn btn-primary" href="${p.product.href}">Get a quote for ${esc(p.product.color)}</a>` : '<a class="btn btn-primary" href="/form">Get my price</a>'}
      </div>
    </article>`;
}
