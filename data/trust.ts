// Owner-approved trust facts (2026-10-29): written warranty tiers, in-home showroom,
// and the no-surprise-charges promise. Every page, llms.txt and schema reads from here.
import type { Faq } from '@/data/cities';

export const WARRANTY_TIERS = [
  { tier: 'Entry', price: '$4.99/sq ft', term: '1-year workmanship warranty', short: '1 year' },
  { tier: 'Standard', price: '$5.99/sq ft', term: '3-year workmanship warranty', short: '3 years' },
  { tier: 'Premium', price: '$7.99/sq ft', term: 'Lifetime limited workmanship warranty (original owner)', short: 'Lifetime limited' },
  { tier: 'Labor-only', price: 'Your material, quoted in-home', term: '1-year workmanship warranty on installation labor only', short: '1 year (labor)' },
] as const;

export const WARRANTY_COVERS = [
  'Planks separating, lifting, peaking or clicking loose because of how they were installed',
  'Gaps between planks wider than 3mm caused by installation',
  'Transitions, quarter round and baseboards we installed coming loose',
  'Expansion-gap mistakes that cause the floor to pinch or buckle',
];

export const WARRANTY_EXCLUDES = [
  'Subfloor or slab movement, settling or cracking after installation',
  'Moisture coming up through the slab, plumbing leaks, flooding or other water events',
  'Heavy fixtures, cabinets or islands installed on top of the floating floor after we leave',
  'Pet damage, scratches, dents, misuse or cleaning with products the manufacturer prohibits',
  'Damage from storms, fire or other insurable events',
  'Repairs or changes made by anyone other than New Design Pro',
  'Normal wear (covered by the manufacturer, not by us)',
];

export const WARRANTY_TERMS = [
  'Starts on the day installation is complete and takes effect once the job is paid in full.',
  'Covers the original owner who hired us, for the home where the floor was installed.',
  'The Premium lifetime limited warranty lasts as long as that original owner owns the home.',
  'We repair or replace the affected area. Coverage is our labor and the installation fix, not the whole floor.',
  'Material defects are covered separately by the Duralast (Durato) manufacturer warranty. We register it for you.',
  'Report an issue by phone, text or email with a photo. We come out, look at it, and tell you in writing what we will do.',
];

export const SHOWROOM = {
  fee: 99,
  name: 'In-Home Showroom',
  summary:
    'We bring Duralast samples to your home and build out a full box of up to 3 colors you choose, laid right on top of your current floor, so you see the real plank in your own light before you decide. $99, credited in full toward your project when you book.',
  steps: [
    'Pick up to 3 colors from the Duralast showroom on our website (or tell us your style and we will suggest some).',
    'We confirm which colors are in stock as samples. Sample availability varies by collection.',
    'We come to your home and click together a full box of each color, laid loose on top of your existing floor. Nothing is glued or nailed.',
    'You see each floor in your morning and evening light, next to your walls, cabinets and furniture.',
    'The $99 is credited in full toward your flooring project if you book with us.',
  ],
};

export const NO_SURPRISE = {
  promise:
    'Your price is set at the free in-home measure. Disposal, haul-away and standard subfloor prep identified at the measure are included. If we uncover hidden damage under your old floor, we stop, show you photos, and nothing extra happens without your written OK.',
  noLater: [
    'Dump or disposal fees for removal that was on your quote',
    'Haul-away charges for old flooring we scoped at the measure',
    'Subfloor prep or leveling fees for prep we identified at the measure',
    'Any other "we found something" charge for work that was already in scope',
  ],
  canChange: [
    'You add rooms, upgrades or optional extras after the quote (you approve them in writing first).',
    'We find hidden damage that could not be seen at the measure, like rotted subfloor or mold under old flooring. We stop, show you photos, and wait for your written OK.',
  ],
};

export const WARRANTY_FAQS: Faq[] = [
  { q: 'Does New Design Pro offer a written warranty?', a: 'Yes. Every job gets a written workmanship warranty: 1 year on Entry ($4.99/sq ft), 3 years on Standard ($5.99/sq ft), and a lifetime limited workmanship warranty for the original owner on Premium ($7.99/sq ft). Labor-only installs get 1 year on installation labor. The Duralast manufacturer warranty on the material is separate.' },
  { q: 'What does the workmanship warranty cover?', a: 'Installation problems: planks separating or lifting, gaps over 3mm, loose transitions, quarter round or baseboards we installed, and expansion-gap mistakes. We repair or replace the affected area.' },
  { q: 'What is not covered?', a: 'Slab or subfloor movement, moisture or water events, heavy fixtures installed on the floor after we leave, pet damage and misuse, storms and other insurable events, and repairs by anyone else. Normal wear is covered by the manufacturer.' },
  { q: 'How does that compare to other flooring companies?', a: 'Most national chains and big-box installers offer a 1-year installation warranty. Our Standard tier doubles that to 3 years, and Premium is lifetime limited for the original owner.' },
  { q: 'How do I file a warranty claim?', a: 'Call, text or email us a photo of the issue. We come out, inspect it, and tell you in writing what we will fix.' },
];

export const SHOWROOM_FAQS: Faq[] = [
  { q: 'What is the In-Home Showroom?', a: SHOWROOM.summary },
  { q: 'How much does the In-Home Showroom cost?', a: '$99. The full $99 is credited toward your flooring project when you book with New Design Pro.' },
  { q: 'Will it damage my current floor?', a: 'No. The planks click together and are laid loose on top of your existing floor. Nothing is glued or nailed, and we take it all with us.' },
  { q: 'Can I see every color?', a: 'You choose up to 3 colors per visit. Sample availability varies by collection, so we confirm what is in stock when you book.' },
  { q: 'Is the in-home measure still free?', a: 'Yes. The in-home measure and written quote are always free. The showroom is an optional upgrade for people who want to see full-size floors in their own home.' },
];

export const NO_SURPRISE_FAQS: Faq[] = [
  { q: 'Will my flooring price change on install day?', a: 'Not for work that was in scope. Your price is set at the free in-home measure, and disposal, haul-away and standard subfloor prep identified at the measure are included.' },
  { q: 'Do you charge dump fees or disposal fees later?', a: 'No. If removal is on your quote, disposal and haul-away are already in the price.' },
  { q: 'What if you find damage under my old floor?', a: 'We stop, show you photos, and explain the fix and the cost. Nothing extra happens without your written OK.' },
  { q: 'What can change the price?', a: 'Only two things: you add rooms or optional extras, or we uncover hidden damage that could not be seen at the measure. Both require your written approval first.' },
];
