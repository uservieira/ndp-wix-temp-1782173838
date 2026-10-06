// City landing pages. Task 4 expands this into the full data-driven template.
export type CityLink = {
  slug: string;
  path: string;
  name: string;
  county: string;
  anchor: string;
};

export const CITY_LINKS: CityLink[] = [
  { slug: 'kissimmee', path: '/lvp-installation-kissimmee', name: 'Kissimmee', county: 'Osceola County', anchor: 'LVP installation in Kissimmee' },
  { slug: 'haines-city', path: '/lvp-installation-haines-city', name: 'Haines City', county: 'Polk County', anchor: 'LVP installation in Haines City' },
  { slug: 'winter-haven', path: '/lvp-installation-winter-haven', name: 'Winter Haven', county: 'Polk County', anchor: 'LVP installation in Winter Haven' },
  { slug: 'remodeling-davenport', path: '/remodeling-davenport', name: 'Davenport', county: 'Polk County', anchor: 'Flooring & interior remodeling in Davenport' },
];
