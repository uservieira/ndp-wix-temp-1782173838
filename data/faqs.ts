import type { Faq } from '@/data/cities';

// Visible on /tile and mirrored in its FAQPage JSON-LD.
export const TILE_FAQS: Faq[] = [
  {
    q: 'Why don\'t you list a price per square foot for tile?',
    a: `Because two tile jobs of the same size can be very different work. The slab condition, tile size, layout pattern, demo and waterproofing all change the labor. We measure in your home for free and send a written quote within 24 hours that lists each part of the job, so you can compare it line by line with any other bid.`,
  },
  {
    q: 'Porcelain or ceramic: which should I choose?',
    a: `For floors, showers and outdoor areas we usually recommend porcelain. It is denser and absorbs very little water (0.5% or less under the ANSI A137.1 standard), so it holds up better to wet areas and heavy traffic. Ceramic is a good, lower-cost choice for walls and backsplashes.`,
  },
  {
    q: 'How do you keep large tiles from having uneven edges?',
    a: `Uneven edges (lippage) usually come from a slab that isn't flat. Industry standards call for a much flatter floor under tiles with any side 15 inches or longer, so we check the slab with a straightedge and level low spots before setting. We use a tile leveling system, and with long plank-style tile we keep the offset to a third of the tile length or less to avoid edges sticking up.`,
  },
  {
    q: 'What causes tile to crack or pop up, and how do you prevent it?',
    a: `Most failures come from three things: poor mortar coverage, slab cracks moving under the tile, or no room for the floor to expand. We back-butter large tiles and check coverage as we set, use a crack-isolation membrane over slab cracks, and leave movement joints at walls and in large or sunny rooms, following the TCNA Handbook. In Florida heat, sunny rooms and lanais need extra joints.`,
  },
  {
    q: 'How do you waterproof a shower?',
    a: `Tile and grout are not waterproof on their own. Before any tile goes up, the shower walls, floor and niches get a waterproofing membrane system installed per the manufacturer's instructions, with sealed corners, seams and pipe openings. Your quote names the system we'll use. Plumbing, electrical or structural work is coordinated with licensed trade partners.`,
  },
  {
    q: 'Which grout should I use, and does it need sealing?',
    a: `Standard cement grout is affordable but stains and needs sealing. Upgraded grouts (urethane or epoxy) resist stains much better and are worth it in kitchens, showers and light colors. The grout joint width is set by the tile itself; rectified tile allows thinner joints. Your quote states the grout type and whether sealing is included.`,
  },
  {
    q: 'Can you tile over my existing tile?',
    a: `Usually we don't recommend it. It raises the floor at doors and transitions and can hide loose or cracked tile underneath. In most cases the old tile comes up, the slab is cleaned and flattened, and the new tile goes down on a sound base. If the old tile is fully bonded and the height works, we'll tell you at the measure.`,
  },
  {
    q: 'How much extra tile should I buy?',
    a: `It depends on the layout: about 10% extra for a straight lay, and more for diagonal, herringbone or large-format tile with more cuts. Buy it all at once from the same lot so color and size match, and keep a box after the job for future repairs. If you're supplying the tile, we'll give you the exact quantity after measuring.`,
  },
  {
    q: 'How long does a tile job take, and when can we use it?',
    a: `Tile takes longer than LVP because mortar, membranes and grout each need to cure. Most floors need a day or two before normal foot traffic after grouting, and a shower needs its full cure time before the first use, which can be several days. Your quote includes a day-by-day schedule so you know when each room is back in use.`,
  },
  {
    q: 'What happens where tile meets carpet, wood or a door?',
    a: `We plan transitions at the measure. Tile with mortar sits higher than most floors, so we choose the right transition strip or metal profile, and check that doors swing clear. Doors that rub may need to be trimmed, and we note that in the quote.`,
  },
  {
    q: 'Vocês falam português? (Do you speak Portuguese?)',
    a: `Sim, falamos português. Yes, we speak Portuguese, so you can talk through tile choices and the quote in either language.`,
    lang: 'pt',
  },
];

// Homepage Q&A: written as direct answers that AI assistants and Google can quote.
// Visible on / and mirrored in its FAQPage JSON-LD. Keep prices in sync with lib/site.ts.
export const HOME_FAQS: Faq[] = [
  {
    q: 'How much does LVP installation cost in Central Florida?',
    a: `New Design Pro installs luxury vinyl plank supplied and installed for $4.99 per sq ft (Entry, 12-mil wear layer), $5.99 per sq ft (Standard, 20-mil) or $7.99 per sq ft (Premium, 20-mil with a 6mm core). For example, 1,000 sq ft on the Standard package is about $5,990. New baseboards are $3.50 per linear foot. Tile, stairs and labor-only installs are quoted after a free in-home measure.`,
  },
  {
    q: 'What areas does New Design Pro serve?',
    a: `We're based in Davenport, FL and install floors about 30 miles around Lake Buena Vista: Orlando, Kissimmee, Davenport, Clermont, Haines City, Winter Haven, Lakeland, ChampionsGate, Celebration and Poinciana. For the right job we'll go farther past Davenport or north of Orlando.`,
  },
  {
    q: 'How long does an LVP installation take?',
    a: `Most homes take two to three days. A recent 709 sq ft living room in Lakeland took two days from start to cleanup.`,
  },
  {
    q: 'Do you remove the old flooring?',
    a: `Yes. Carpet removal and haul-away is included in the Standard and Premium packages. Laminate or tile removal is added to your written quote after we measure.`,
  },
  {
    q: 'What flooring brand do you install?',
    a: `We install Duralast (also sold as Durato) SPC vinyl plank: the Panzu collection on the Entry package, Azul Tortuga on Standard, and V-EVO Max and V-EVO XL on Premium. You can preview every color on our homepage before you book.`,
  },
  {
    q: 'Is LVP a good choice for Florida homes?',
    a: `For most Central Florida homes, yes. SPC vinyl plank is waterproof and handles humidity better than laminate, and it installs right over a leveled concrete slab.`,
  },
  {
    q: 'Are you insured?',
    a: `Yes, New Design Pro is insured, and a certificate of insurance is available on request. Any licensed-trade work is coordinated with licensed trade partners.`,
  },
  {
    q: 'How do I get a quote?',
    a: `Call or text (561) 809-3864, or get a price range online at newdesignpro.com/form. We do a free in-home measure, send a written quote within 24 hours, and a 50% deposit books your install date.`,
  },
  {
    q: 'Vocês falam português? (Do you speak Portuguese?)',
    a: `Sim, falamos português. Yes, we speak Portuguese, so you can go over colors and the quote in either language.`,
    lang: 'pt',
  },
];
