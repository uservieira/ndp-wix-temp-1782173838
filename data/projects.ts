// Real completed jobs only (Daniel supplies details + photos, customer OK to feature).
// Never put the homeowner's name or street address here.
export type ProjectPhoto = { src: string; alt: string }; // src without size suffix, e.g. /assets/projects/x/after-living
export type Project = {
  id: string;
  city?: string; // must match a city in data/cities.ts
  title: string;
  scope: string[]; // what was done, in plain words
  product?: { collection: string; color: string; tier: 'entry' | 'standard' | 'premium'; href: string };
  sqft?: number;
  days?: number; // days on site, only when confirmed
  completed: string; // e.g. "October 2026"
  pairs?: { before: ProjectPhoto; after: ProjectPhoto }[];
  gallery?: ProjectPhoto[]; // after-only photos
  process?: ProjectPhoto[]; // step-by-step job photos, in order
  kind?: string; // short label for the homepage catalog, e.g. "LVP flooring"
  cover?: ProjectPhoto; // homepage catalog cover (defaults to first after/gallery photo)
  credit?: { name: string; href: string; label: string }; // only with Daniel's explicit OK
};

const P = '/assets/projects/lakeland-white-haven';

export const PROJECTS: Project[] = [
  {
    id: 'davenport-bedroom-lvp',
    city: 'Davenport',
    kind: 'LVP flooring',
    title: 'Bedroom LVP, light oak',
    scope: [
      'LVP installed through the whole bedroom',
      'Long, straight runs with clean cuts at the doors and closet',
      'Cleanup and final walkthrough',
    ],
    completed: '2026',
    credit: { name: 'Cristiane', href: 'https://search.google.com/local/reviews?placeid=ChIJ04pkC9peBq8RQI3Z0T1XETk', label: "Read Cristiane's 5-star Google review" },
    gallery: [
      { src: '/assets/projects/davenport-bedroom-lvp/after-bedroom', alt: 'Davenport bedroom with new light oak LVP' },
      { src: '/assets/projects/davenport-bedroom-lvp/after-bedside', alt: 'Light oak LVP running from the bedroom door to the window' },
    ],
  },
  {
    id: 'viera-shower-conversion',
    city: 'Viera',
    kind: 'Tub-to-shower conversion',
    title: 'Old tub out, walk-in shower in',
    scope: [
      'Old tub and surround removed',
      'Drain and plumbing work coordinated with licensed trade partners',
      'New shower base set and walls tiled in white',
      'Corner shelf and black-frame sliding glass door',
    ],
    completed: '2026',
    credit: { name: 'Armando', href: 'https://search.google.com/local/reviews?placeid=ChIJ04pkC9peBq8RQI3Z0T1XETk', label: "Read Armando's 5-star Google review" },
    cover: { src: '/assets/projects/viera-shower-conversion/after-shower', alt: 'Finished walk-in shower with white tile and black-frame glass door' },
    pairs: [
      {
        before: { src: '/assets/projects/viera-shower-conversion/before-tub', alt: 'Bathroom before, with the old tub and shower curtain' },
        after: { src: '/assets/projects/viera-shower-conversion/after-shower', alt: 'Same bathroom after, with a walk-in tiled shower and glass door' },
      },
    ],
    process: [
      { src: '/assets/projects/viera-shower-conversion/step-demo', alt: 'Step 1: tub removed, walls opened and drain exposed' },
      { src: '/assets/projects/viera-shower-conversion/step-tile-start', alt: 'Step 2: wall tile going up with leveling clips' },
      { src: '/assets/projects/viera-shower-conversion/step-base-set', alt: 'Step 3: shower base set while the walls are tiled' },
      { src: '/assets/projects/viera-shower-conversion/step-tile-done', alt: 'Step 4: tile finished with the corner shelf in place' },
    ],
  },
  {
    id: 'kissimmee-summer-kitchen',
    city: 'Kissimmee',
    kind: 'Summer kitchen',
    title: 'Outdoor summer kitchen, built from the frame up',
    scope: [
      'Framed the kitchen and the wood-plank ceiling with recessed lights',
      'Green tile backsplash, countertops and slat-front cabinets',
      'Stainless grill and range hood set in place',
      'Gas, plumbing and electrical coordinated with licensed trade partners',
    ],
    completed: '2026',
    gallery: [
      { src: '/assets/projects/kissimmee-summer-kitchen/after-kitchen', alt: 'Finished outdoor summer kitchen with green tile backsplash, grill and wood ceiling' },
    ],
    process: [
      { src: '/assets/projects/kissimmee-summer-kitchen/step-framing', alt: 'Step 1: framing the summer kitchen and ceiling' },
      { src: '/assets/projects/kissimmee-summer-kitchen/step-cabinets', alt: 'Step 2: bringing in cement board for the walls' },
      { src: '/assets/projects/kissimmee-summer-kitchen/step-grill', alt: 'Step 3: setting the grill with the homeowner' },
    ],
  },
  {
    id: 'lakeland-white-haven-living-room',
    city: 'Lakeland',
    kind: 'LVP flooring',
    title: 'Dark laminate out, White Haven LVP in',
    scope: [
      'Duralast Azul Tortuga White Haven LVP, 20 mil wear layer, 5mm',
      'Cleanup and final walkthrough',
      // Do NOT list removal, moisture barrier, transitions or trim here: those were confidential customer extras.
    ],
    product: { collection: 'Azul Tortuga', color: 'White Haven', tier: 'standard', href: '/form?tier=standard&collection=Azul%20Tortuga&color=White%20Haven' },
    sqft: 709,
    days: 2,
    completed: 'October 2026',
    pairs: [
      {
        before: { src: `${P}/before-loft`, alt: 'Living room from the loft before, with dark laminate flooring' },
        after: { src: `${P}/after-loft`, alt: 'Same living room from the loft after, with light gray White Haven LVP' },
      },
      {
        before: { src: `${P}/before-living`, alt: 'Living room at floor level before, with dark laminate' },
        after: { src: `${P}/after-living`, alt: 'Living room at floor level after, with White Haven LVP running to the kitchen' },
      },
    ],
  },
  {
    id: 'kissimmee-accent-wall',
    city: 'Kissimmee',
    kind: 'Accent wall',
    title: 'Arched PVC slat accent wall',
    scope: [
      'Arched feature wall with PVC slats behind the TV',
      'Clean, paint-ready finish around the arch',
    ],
    completed: '2026',
    gallery: [
      { src: '/assets/projects/kissimmee-accent-wall/after-accent-wall', alt: 'Arched PVC slat accent wall with a mounted TV and LED-lit console' },
    ],
  },
  {
    id: 'new-construction-lvp',
    kind: 'LVP flooring',
    title: 'New construction LVP installs',
    scope: [
      'LVP installed in new homes before move-in',
      'Long, straight runs through bedrooms, halls and open living areas',
      'Clean cuts at doors, closets and transitions, ready for baseboard',
    ],
    completed: '2026',
    gallery: [
      { src: '/assets/projects/new-construction/nc-open-plan', alt: 'New construction open living area with LVP installed throughout' },
      { src: '/assets/projects/new-construction/nc-bedroom', alt: 'New construction bedroom with light oak LVP' },
      { src: '/assets/projects/new-construction/nc-corner-room', alt: 'New construction corner bedroom with LVP and large window' },
    ],
  },
  {
    id: 'homeowner-lvp-refresh',
    kind: 'LVP flooring',
    title: 'Small homeowner LVP jobs',
    scope: [
      'Hallways, bathroom entries and single rooms in lived-in homes',
      'We work around your furniture and daily routine',
      'Matched transitions where the new floor meets existing flooring',
    ],
    completed: '2026',
    gallery: [
      { src: '/assets/projects/homeowner/ho-closet', alt: 'Walk-in closet with new LVP running through' },
      { src: '/assets/projects/homeowner/ho-hallway', alt: 'Homeowner hallway with new LVP' },
      { src: '/assets/projects/homeowner/ho-bath-entry', alt: 'Bathroom entry and hall with new LVP' },
      { src: '/assets/projects/homeowner/ho-bonus-room', alt: 'Homeowner bonus room with new LVP' },
    ],
  },
];
