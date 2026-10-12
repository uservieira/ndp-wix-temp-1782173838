// Real completed jobs only (Daniel supplies details + photos, customer OK to feature).
// TODO-DANIEL: add real projects here. Each needs city, scope, square footage, days on site,
// and 2–3 real photos saved under /public/assets/projects/. Leave empty until then.
export type Project = {
  id: string;
  city: string; // must match a city in data/cities.ts
  scope: string; // e.g. "LVP through living areas and 3 bedrooms"
  sqft: number;
  days: number;
  completed: string; // ISO date
  photos: { src: string; alt: string }[];
};

export const PROJECTS: Project[] = [];
