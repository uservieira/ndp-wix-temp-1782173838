// Allowlist sanitizer for article HTML that arrives from Holo.
// Used twice: when the webhook stores a post, and again when the page renders it,
// so a hand-edited file in data/holo-posts can't inject markup either.
import sanitizeHtml from 'sanitize-html';

export type ImgAttrs = { src: string; alt: string; width?: number; height?: number };
// Gets the image as written in the article. Return the attributes to keep, or null to drop the image.
export type ImgResolver = (img: ImgAttrs) => ImgAttrs | null;

const ALLOWED_TAGS = [
  'p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li', 'a', 'strong', 'b', 'em', 'i', 'u', 's',
  'blockquote', 'figure', 'figcaption', 'img', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
  'caption', 'br', 'hr', 'code', 'pre', 'sup', 'sub',
];

// Heading ids get a prefix so article markup can never shadow an id the site's own scripts use.
const anchorId = (raw: string) => {
  // Sanitizing runs again at render time, so an id that already has the prefix keeps a single one.
  const id = raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').replace(/^(?:h-)+/, '').slice(0, 80);
  return id ? `h-${id}` : '';
};

const DROP = '__holo_drop__';

export function sanitizeHoloHtml(html: string, img: ImgResolver): string {
  const heading = (tagName: string, attribs: Record<string, string>) => {
    const id = attribs.id ? anchorId(attribs.id) : '';
    const out: Record<string, string> = {};
    if (id) out.id = id;
    return { tagName, attribs: out };
  };
  const clean = sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: {
      a: ['href', 'title'],
      img: ['src', 'alt', 'width', 'height'],
      th: ['colspan', 'rowspan', 'scope'],
      td: ['colspan', 'rowspan'],
      ol: ['start'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
    },
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['https'] },
    allowProtocolRelative: false,
    // Drop these tags together with everything inside them.
    nonTextTags: ['style', 'script', 'textarea', 'option', 'noscript', 'iframe', 'object', 'embed', 'svg', 'math', 'template', 'title', 'head', 'form', 'button', 'select'],
    transformTags: {
      h2: heading,
      h3: heading,
      h4: heading,
      a: (tagName, attribs) => {
        const href = (attribs.href ?? '').trim();
        const out: Record<string, string> = {};
        if (href.startsWith('#')) {
          const id = anchorId(href.slice(1));
          if (id) out.href = `#${id}`;
        } else if (/^(?:https?:\/\/|mailto:|tel:|\/(?!\/))/i.test(href)) {
          out.href = href;
        }
        // No usable target (javascript:, data:, empty): the bare <a> is unwrapped after sanitizing.
        if (out.href && attribs.title) out.title = attribs.title;
        return { tagName, attribs: out };
      },
      img: (tagName, attribs) => {
        const px = (v?: string) => (v && /^\d{1,5}$/.test(v) ? Number(v) : undefined);
        const kept = attribs.src
          ? img({ src: attribs.src, alt: attribs.alt ?? '', width: px(attribs.width), height: px(attribs.height) })
          : null;
        if (!kept) return { tagName, attribs: { src: DROP } };
        const out: Record<string, string> = { src: kept.src, alt: kept.alt ?? '' };
        if (kept.width && kept.height) {
          out.width = String(kept.width);
          out.height = String(kept.height);
        }
        return { tagName, attribs: out };
      },
    },
    exclusiveFilter: (frame) => frame.tag === 'img' && (!frame.attribs.src || frame.attribs.src === DROP),
  });
  // Links left without a target keep their words and lose the tag.
  return clean.replace(/<a>([\s\S]*?)<\/a>/g, '$1');
}

// Plain text of sanitized HTML, for "is there any article here" checks.
export function textOf(html: string): string {
  return sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, ' ').trim();
}

// The page shell prints the title as its own h1. Drop a leading h1 that repeats it and
// demote any other h1 so the page keeps a single h1.
export function normalizeHeadings(html: string, title: string): string {
  const norm = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&[a-z#0-9]+;/gi, ' ').replace(/[^a-z0-9]+/gi, ' ').trim().toLowerCase();
  let out = html.trim();
  const first = out.match(/^<h1>([\s\S]*?)<\/h1>/);
  if (first && norm(first[1]) === norm(title)) out = out.slice(first[0].length).trim();
  return out.replace(/<h1>/g, '<h2>').replace(/<\/h1>/g, '</h2>');
}
