// Single source of truth for business facts used in copy, links, and schema.
// To switch to the new 863 number, edit BUSINESS_PHONE below — every rendered
// phone, tel:/sms: link, and schema `telephone` reads from it.

export const SITE_URL = 'https://www.newdesignpro.com';

export const BUSINESS_PHONE = {
  display: '(561) 809-3864',
  short: '561-809-3864',
  e164: '+15618093864',
} as const;

export const BUSINESS = {
  name: 'New Design Pro',
  legalName: 'Huios Construction LLC',
  owner: 'Daniel Vieira',
  email: 'contact@newdesignpro.com',
  locality: 'Davenport',
  region: 'FL',
  postalCode: '33837',
  country: 'US',
  baseLine: 'Based in Davenport, FL — serving Polk & Osceola',
  gbpUrl: 'https://maps.google.com/maps?cid=4112163857791290688',
  reviewUrl: `${SITE_URL}/review`,
  languages: ['en', 'pt'],
} as const;

export const HOURS = [
  { label: 'Mon–Fri', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '18:30', text: '7:30am–6:30pm' },
  { label: 'Sat', days: ['Saturday'], opens: '07:30', closes: '17:00', text: '7:30am–5:00pm' },
  { label: 'Sun', days: [] as string[], opens: '', closes: '', text: 'Closed' },
] as const;

export const SERVICE_AREA = [
  'Davenport',
  'Kissimmee',
  'Haines City',
  'Winter Haven',
  'Lakeland',
  'Clermont',
  'ChampionsGate',
  'Celebration',
  'Poinciana',
] as const;

// Owner-locked LVP all-in packages (supplied + installed, per sqft).
// Every $4.99 / $5.99 / $6.99 claim on the site, in the QuoteForm calculator,
// and in Service schema priceSpecification must match this list.
export const LVP_TIERS = [
  {
    key: 'entry',
    name: 'Entry',
    price: 4.99,
    badge: '',
    wear: '12-mil',
    build: '4.7mm Panzu LVP',
    includes: ['12-mil wear layer', '4.7mm Panzu LVP', 'Standard install', 'Quarter round'],
  },
  {
    key: 'standard',
    name: 'Standard',
    price: 5.99,
    badge: 'Most Popular',
    wear: '20-mil',
    build: '5mm LVP',
    includes: ['20-mil wear layer', '5mm LVP', 'Baseboard replacement', 'Carpet demo & haul-away', 'Minor subfloor prep'],
  },
  {
    key: 'premium',
    name: 'Premium',
    price: 6.99,
    badge: '',
    wear: '20-mil',
    build: '6mm-core LVP',
    includes: [
      '20-mil wear layer',
      '6mm-core LVP',
      'Everything in Standard',
      'Documented flatness check',
      'Slab moisture reading',
      'Written walkthroughs',
      'Warranty job file',
    ],
  },
] as const;

export type LvpTierKey = (typeof LVP_TIERS)[number]['key'];

// Tile, labor-only, and stairs are never priced publicly. They are quoted in person.
export const PRICING = {
  lvpFrom: 4.99,
  depositPct: 50,
  quoteTurnaround: 'Written quote in 24 hours',
  tileQuoted: 'Quoted after a free in-home measure',
  laborQuoted: 'Quoted in-home',
  stairsQuoted: 'Quoted at your free in-home measure',
  formQuotedNote: "We'll quote this after a free measure",
} as const;

// Current flooring supplier. Duralast is also branded Durato.
export const SUPPLIER = {
  name: 'Duralast',
  altName: 'Durato',
} as const;

// Owner-confirmed claims. Route all insurance / experience wording through here.
export const CLAIMS = {
  insured: true,
  insuranceNote: 'Certificate of insurance available on request.',
  experienceText: '10+ years as a family business, with installers who each bring 10+ years on the tools.',
  experienceShort: '10+ Years, Family-Run',
} as const;
