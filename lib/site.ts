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

export const PRICING = {
  lvpFrom: 4.99,
  tileFrom: 7.99,
  depositPct: 50,
  quoteTurnaround: 'Written quote in 24 hours',
} as const;

// Owner-confirmed claims. Route all insurance / experience wording through here.
export const CLAIMS = {
  insured: true,
  insuranceNote: 'Certificate of insurance available on request.',
  experienceText: '10+ years as a family business, with installers who each bring 10+ years on the tools.',
  experienceShort: '10+ Years, Family-Run',
} as const;
