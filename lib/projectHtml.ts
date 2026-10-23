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
      ${p.swipes ? `<div class="pcase-swipes">${p.swipes.map((w) => `<figure class="pcase-swipe"><div class="tc-swipe" tabindex="0" aria-label="Swipe to see the ${esc(w.label.toLowerCase())} before">${pic(w.after, `${esc(w.label)}: after`)}${pic(w.before, `${esc(w.label)}: before`)}</div><figcaption>Swipe to see it before &rarr;</figcaption></figure>`).join('')}</div>` : ''}
      ${p.video ? `<figure class="pcase-video"><video src="${p.video.src}" poster="${p.video.poster}" autoplay muted loop playsinline preload="metadata"></video><figcaption>${esc(p.video.caption)}</figcaption></figure>` : ''}
      ${p.pairs ? `<div class="pcase-pairs">${p.pairs.map((pr) => `<div class="ba-pair">${pic(pr.before, 'Before')}${pic(pr.after, 'After')}</div>`).join('')}</div>` : ''}
      ${p.gallery ? `<div class="pcase-gallery${p.gallery.length > 3 ? ' is-many' : ''}">${p.gallery.map((g) => pic(g, '')).join('')}</div>` : ''}
      ${p.before ? `<div class="pcase-process"><${sub}>Before</${sub}><div class="pcase-gallery">${p.before.map((g) => pic(g, esc(g.alt.replace(/ before.*$/i, '').replace(/^Lanai corner$/, 'Lanai')) + ': before')).join('')}</div></div>` : ''}
      ${(p.processGroups ?? []).map((grp) => `<div class="pcase-process"><${sub}>How we built it: ${esc(grp.title)}</${sub}><div class="pcase-gallery">${grp.photos.map((g, i) => pic(g, `${i + 1}. ${esc(g.alt)}`)).join('')}</div></div>`).join('')}
      ${p.process ? `<div class="pcase-process"><${sub}>How we built it</${sub}><div class="pcase-gallery">${p.process.map((g, i) => pic(g, `Step ${i + 1}`)).join('')}</div></div>` : ''}
      <div class="pcase-body">
        <${sub}>What we did</${sub}>
        <ul>${p.scope.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        ${p.credit ? `<p class="pcase-credit">${esc(p.credit.name)}'s job. <a href="${p.credit.href}" target="_blank" rel="noopener">${esc(p.credit.label)}</a></p>` : ''}
        ${p.product ? `<a class="btn btn-primary" href="${p.product.href}">Get a quote for ${esc(p.product.color)}</a>` : '<a class="btn btn-primary" href="/form">Get my price</a>'}
      </div>
    </article>`;
}

const coverOf = (p: Project) => p.cover ?? p.gallery?.[0] ?? p.pairs?.[0]?.after;

// Homepage catalog: one card per job, linking to its write-up on /projects.
export function projectCatalogHtml(list: Project[]): string {
  return list
    .map((p) => {
      const c = coverOf(p);
      if (!c) return '';
      return `<a class="tile-card proj-card" href="/projects#${p.id}"><figure>
        <picture>
          <source type="image/webp" srcset="${c.src}-md.webp 800w, ${c.src}-lg.webp 1600w" sizes="(min-width:1000px) 33vw, (min-width:640px) 50vw, 100vw" />
          <img src="${c.src}-md.jpg" alt="${esc(c.alt)}" loading="lazy" decoding="async" width="600" height="800" />
        </picture>
        <figcaption>
          <div class="tc-meta tc-kind">${esc(p.kind ?? 'Project')} &middot; ${p.city ? `${esc(p.city)}, FL` : 'Central Florida'}</div>
          <div class="tc-title">${esc(p.title)}</div>
          <div class="tc-meta">${p.process ? `${p.process.length + 1} steps &middot; ` : p.processGroups ? `${p.processGroups.reduce((n, g) => n + g.photos.length, 0)} steps &middot; ` : ''}See the job &rarr;</div>
        </figcaption>
      </figure></a>`;
    })
    .join('\n');
}
