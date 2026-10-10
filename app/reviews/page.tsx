import type { Metadata } from 'next';
import Script from 'next/script';
import { REVIEWS } from '@/data/reviews';
import { cityHeaderHtml, reviewCardHtml, siteFooterHtml } from '@/lib/chrome';
import { BUSINESS, CLAIMS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Google Reviews from Central Florida Homeowners',
  description:
    'Read real Google reviews from Central Florida homeowners who hired New Design Pro for LVP flooring and tile work, then leave your own review after your job.',
  alternates: { canonical: '/reviews' },
};

const ARROW =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const PAGE_HTML = `
${cityHeaderHtml()}

<main>
<section class="blog-index-hero">
  <div class="bih-inner">
    <span class="eyebrow">Reviews</span>
    <h1>What our customers <em>say</em>.</h1>
    <p>Real Google reviews from Central Florida homeowners, copied word for word. We ask every customer to leave one after the job, good or bad.</p>
  </div>
</section>

<section id="reviews" class="review-strip reviews-page" aria-label="Google reviews">
  <div class="section-inner">
    <div class="review-grid">
      ${REVIEWS.map((r) => reviewCardHtml(r, true)).join('\n      ')}
    </div>
    <div class="review-cta">
      <a class="btn btn-primary" href="/review" data-ga-event="review_cta_click">Leave a review</a>
      <a class="btn btn-ghost" href="${BUSINESS.gbpUrl}" target="_blank" rel="noopener">See all reviews on Google</a>
    </div>
  </div>
</section>

<section class="reviews-why">
  <div class="section-inner">
    <span class="eyebrow">Why homeowners choose us</span>
    <h2 class="section-title">Family-run, insured, and <em>upfront</em>.</h2>
    <ul class="reviews-why-list">
      <li><strong>${CLAIMS.experienceShort}.</strong> ${CLAIMS.experienceText}</li>
      <li><strong>Insured crew.</strong> Every job carries general liability coverage. ${CLAIMS.insuranceNote}</li>
      <li><strong>Written scope and price up front.</strong> You approve materials, labor, and timeline before anything starts, with a written quote in 24 hours.</li>
      <li><strong>Photo record of every job.</strong> Before, during, and after photos are shared so you can see the work.</li>
    </ul>
  </div>
</section>
</main>

<section class="post-cta">
  <div class="pc-inner">
    <h2>Have a project in <em>mind</em>?</h2>
    <a class="btn btn-white" href="/form">
      Request a free quote
      ${ARROW}
    </a>
  </div>
</section>

${siteFooterHtml()}
`;

export default function ReviewsPage() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
      <Script src="/lvp-installation-kissimmee-interactive.js" strategy="afterInteractive" />
    </>
  );
}
