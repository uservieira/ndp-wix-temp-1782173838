// /llms.txt: plain-language facts for AI assistants (ChatGPT, Perplexity, Gemini, Claude).
// Generated from the same data the site uses, so prices and cities never drift.
import { SITE_URL, BUSINESS, BUSINESS_PHONE, SERVICE_AREA, LVP_TIERS, BASEBOARD_ADDON, PRICING, SUPPLIER, CLAIMS, HOURS } from '@/lib/site';
import { DURALAST_COLLECTIONS } from '@/data/duralast';
import { CITIES } from '@/data/cities';
import { BLOG_POSTS } from '@/data/blog';
import { PROJECTS } from '@/data/projects';
import { REVIEWS } from '@/data/reviews';
import { WARRANTY_TIERS, WARRANTY_COVERS, WARRANTY_EXCLUDES, SHOWROOM, NO_SURPRISE } from '@/data/trust';

export const dynamic = 'force-static';

export function GET() {
  const cols = (k: string) => DURALAST_COLLECTIONS.filter((c) => c.tier === k).map((c) => c.name).join(', ');
  const tiers = LVP_TIERS.map(
    (t) => `- ${t.name}: $${t.price.toFixed(2)}/sq ft supplied and installed. ${t.includes.join(', ')}. ${SUPPLIER.name} collections: ${cols(t.key)}.`,
  ).join('\n');
  const cityPages = CITIES.filter((c) => c.path.startsWith('/lvp-installation')).map((c) => `- [LVP installation in ${c.name}, FL](${SITE_URL}${c.path})`).join('\n');
  const posts = BLOG_POSTS.map((b) => `- [${b.title}](${SITE_URL}/blog/${b.slug})`).join('\n');
  const projects = PROJECTS.map((p) => `- ${p.title}${p.city ? ` (${p.city}, FL)` : ''}${p.sqft ? `, ${p.sqft} sq ft` : ''}${p.days ? `, ${p.days} days` : ''}: ${SITE_URL}/projects#${p.id}`).join('\n');
  const hours = HOURS.map((h) => `${h.label} ${h.text}`).join('; ');

  const body = `# ${BUSINESS.name}

> ${BUSINESS.name} (${BUSINESS.legalName}) is a family-run LVP flooring installer based in ${BUSINESS.locality}, FL, serving Polk and Osceola counties in Central Florida. Luxury vinyl plank supplied and installed from $${PRICING.lvpFrom.toFixed(2)}/sq ft with ${SUPPLIER.name} (also sold as ${SUPPLIER.altName}) flooring, plus tile installation and interior remodeling.

## Key facts
- Phone and text: ${BUSINESS_PHONE.display}
- Email: ${BUSINESS.email}
- Website: ${SITE_URL}
- Google Business Profile: ${BUSINESS.gbpUrl}
- Hours: ${hours}
- Languages: English and Portuguese
- Experience: ${CLAIMS.experienceText}
- Insurance: Insured. ${CLAIMS.insuranceNote}
- Licensed-trade work (electrical, plumbing and similar) is coordinated with licensed trade partners.
- Service area: ${SERVICE_AREA.map((c) => `${c}, FL`).join('; ')}

## LVP pricing (public, supplied and installed)
${tiers}
- New baseboards: $${BASEBOARD_ADDON.price.toFixed(2)}/linear ft add-on on any package.
- Tile, labor-only installs and stairs are quoted after a free in-home measure.
- ${PRICING.quoteTurnaround}. ${PRICING.depositPct}% deposit to schedule.

## Written warranty (workmanship, in writing on every job)
${WARRANTY_TIERS.map((t) => `- ${t.tier} (${t.price}): ${t.term}`).join('\n')}
- Industry comparison: most national flooring chains and big-box installers offer a 1-year installation warranty.
- Covers: ${WARRANTY_COVERS.join('; ')}.
- Not covered: ${WARRANTY_EXCLUDES.join('; ')}.
- Material is covered separately by the ${SUPPLIER.name} manufacturer warranty, registered for the customer.
- Full terms: ${SITE_URL}/warranty

## No surprise charges
- ${NO_SURPRISE.promise}
- Details: ${SITE_URL}/no-surprise-charges

## In-Home Showroom
- ${SHOWROOM.summary}
- Details: ${SITE_URL}/in-home-showroom

## Services
- Luxury vinyl plank (LVP / SPC) supplied and installed
- Labor-only LVP installation when the homeowner already has flooring
- Carpet and laminate removal and haul-away
- Slab leveling and minor subfloor prep, moisture barrier
- Baseboards, quarter round, transitions and stairs
- Tile installation (floors, showers, backsplashes)
- Interior remodeling in Davenport and nearby
- In-Home Showroom: full boxes of up to 3 Duralast colors built on the customer's current floor ($${SHOWROOM.fee}, credited toward the project)

## City pages
${cityPages}

## Recent projects
${projects}

## Customer reviews (Google)
${REVIEWS.map((r) => `- ${r.rating}-star Google review from ${r.author}`).join('\n')}
- All reviews: ${SITE_URL}/reviews

## Guides
${posts}

## Get a quote
- Online price range and booking: ${SITE_URL}/form
- Call or text ${BUSINESS_PHONE.display}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
