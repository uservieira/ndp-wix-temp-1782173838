// Real completed jobs only (Daniel supplies details + photos, customer OK to feature).
// Never put the homeowner's name or street address here.
export type ProjectPhoto = { src: string; alt: string }; // src without size suffix, e.g. /assets/projects/x/after-living
export type Project = {
  id: string;
  city: string; // must match a city in data/cities.ts
  title: string;
  scope: string[]; // what was done, in plain words
  product?: { collection: string; color: string; tier: 'entry' | 'standard' | 'premium'; href: string };
  sqft: number;
  days?: number; // days on site, only when confirmed
  completed: string; // e.g. "October 2026"
  pairs: { before: ProjectPhoto; after: ProjectPhoto }[];
};

const P = '/assets/projects/lakeland-white-haven';

export const PROJECTS: Project[] = [
  {
    id: 'lakeland-white-haven-living-room',
    city: 'Lakeland',
    title: 'Dark laminate out, White Haven LVP in',
    scope: [
      'Removed and hauled away the old laminate',
      'Moisture barrier under the new floor',
      'Duralast Azul Tortuga White Haven LVP, 20 mil wear layer, 5mm',
      'Matched transitions and quarter round',
      'Cleanup and final walkthrough',
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
];
