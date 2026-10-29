// Blog post registry: used by the sitemap, city-page "related post" links, and Article schema.
// Dates are the publish dates already shown on each post's byline.
export type BlogPost = {
  slug: string;
  title: string;
  datePublished: string; // ISO date
  image: string; // site-relative path of the post hero image
};

export const BLOG_POSTS: BlogPost[] = [
  { slug: 'lvp-installation-kissimmee-cost-process', title: 'LVP Installation in Kissimmee, FL: What It Costs and How the Job Really Goes', datePublished: '2026-07-22', image: '/blog-img/lvp-kissimmee-hero.webp' },
  { slug: 'lvp-installation-timeline-2-bedroom-job', title: 'How Long Does LVP Installation Actually Take? A Real 2-Bedroom Timeline', datePublished: '2026-07-22', image: '/blog-img/lvp-timeline-hero.webp' },
  { slug: 'lvp-vs-laminate-florida-humidity', title: 'LVP vs Laminate for Florida Homes: Which Actually Holds Up in Humidity', datePublished: '2026-07-22', image: '/blog-img/lvp-vs-laminate-hero.webp' },
  { slug: 'vinyl-plank-cost-per-square-foot-central-florida-2026', title: 'Vinyl Plank Cost Per Square Foot in Central Florida (2026 Real Numbers)', datePublished: '2026-07-22', image: '/blog-img/vinyl-cost-hero.webp' },
  { slug: 'will-spc-lvp-dent-scratch-hold-up-central-florida', title: "Will SPC LVP Dent, Scratch, or Hold Up? A Central Florida Installer's Honest Take", datePublished: '2026-08-18', image: '/blog-img/lvp-kissimmee-hero.webp' },
  { slug: 'does-spc-lvp-look-cheap-honest-installer-answer', title: 'Does SPC LVP Look Cheap? The Honest Installer Answer', datePublished: '2026-08-18', image: '/blog-img/lvp-kissimmee-hero.webp' },
  { slug: 'spc-lvp-vs-real-hardwood-central-florida', title: "\"But It's Not Real Wood\": Why SPC LVP Wins in Central Florida Homes", datePublished: '2026-08-18', image: '/blog-img/lvp-kissimmee-hero.webp' },
  { slug: 'how-to-compare-flooring-quotes-central-florida', title: 'How to Compare Flooring Quotes: 5 Questions Before You Sign', datePublished: '2026-10-29', image: '/blog-img/vinyl-cost-hero.webp' },
  { slug: 'cheapest-flooring-quote-overhead', title: 'Why the Cheapest Flooring Quote Can Cost You More (Overhead, Explained)', datePublished: '2026-10-29', image: '/blog-img/lvp-kissimmee-hero.webp' },
  { slug: 'flooring-installation-warranty-what-it-covers', title: "Flooring Installation Warranty: What It Covers and What's Normal", datePublished: '2026-10-29', image: '/blog-img/lvp-timeline-hero.webp' },
  { slug: 'how-to-choose-flooring-installer-central-florida', title: 'How to Choose a Flooring Installer in Central Florida (and Avoid the Common Nightmares)', datePublished: '2026-10-29', image: '/blog-img/lvp-kissimmee-hero.webp' },
];

export function getPost(slug: string): BlogPost {
  const p = BLOG_POSTS.find((b) => b.slug === slug);
  if (!p) throw new Error(`Unknown blog slug: ${slug}`);
  return p;
}
