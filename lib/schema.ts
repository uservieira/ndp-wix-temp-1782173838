// JSON-LD helpers. Render with <JsonLd data={...} /> (components/JsonLd.tsx).
import type { Faq } from '@/data/cities';

export function faqPageSchema(faqs: Faq[], url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
