import type { Faq } from '@/data/cities';

// Visible on /tile and mirrored in its FAQPage JSON-LD.
export const TILE_FAQS: Faq[] = [
  {
    q: 'How much does tile installation cost?',
    a: `Every tile job is quoted after a free in-home measure, because the slab, the layout, and the tile itself change the work. Floors, showers, backsplashes, and patterns like herringbone are all priced that way. You can supply your own tile, or we source it for your specific job. You get a written quote within 24 hours of the measure, and a 50% deposit holds your date.`,
  },
  {
    q: 'Can you tile over my existing tile?',
    a: `Usually we don't recommend it. Tiling over tile adds height at doors and transitions and hides problems in the old installation. In most cases the old tile comes up, the slab is cleaned and flattened, and the new tile goes down on a sound base.`,
  },
  {
    q: 'Do you waterproof showers before tiling?',
    a: `Yes. Shower walls and floors get a waterproofing membrane before tile goes up, because tile and grout aren't waterproof on their own. Plumbing, electrical, or structural work is coordinated with licensed trade partners.`,
  },
  {
    q: 'Is large-format tile a good choice on a Florida slab?',
    a: `It can be, if the slab is flat. Large tiles show any dip as lippage at the edges, so the floor is checked and leveled first, and we use the right trowel and mortar for full coverage under every tile.`,
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
    a: `We're based in Davenport, FL and install floors across Polk and Osceola counties: Davenport, Kissimmee, Haines City, Winter Haven, Lakeland, Clermont, ChampionsGate, Celebration and Poinciana.`,
  },
  {
    q: 'How long does an LVP installation take?',
    a: `Most homes take two to three days. A recent 709 sq ft living room in Lakeland took two days, including tearing out the old laminate, a moisture barrier, new LVP, transitions and quarter round.`,
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
    a: `For most Central Florida homes, yes. SPC vinyl plank is waterproof and handles humidity better than laminate, and it goes right over a leveled concrete slab with a moisture barrier underneath.`,
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
