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
  before?: ProjectPhoto[]; // before-only photos
  processGroups?: { title: string; photos: ProjectPhoto[] }[]; // several step sequences in one job
  swipes?: { label: string; after: ProjectPhoto; before: ProjectPhoto }[]; // after first, swipe to see before
  video?: { src: string; poster: string; caption: string }; // short muted looping clip
  kind?: string; // short label for the homepage catalog, e.g. "LVP flooring"
  cover?: ProjectPhoto; // homepage catalog cover (defaults to first after/gallery photo)
  credit?: { name: string; href: string; label: string }; // only with Daniel's explicit OK
};

const P = '/assets/projects/lakeland-white-haven';

export const PROJECTS: Project[] = [
  {
    id: 'clermont-antigua-bedrooms',
    city: 'Clermont',
    kind: 'LVP flooring',
    title: 'Upstairs bedrooms in Antigua LVP',
    scope: [
      'Duralast Azul Tortuga Antigua LVP through the bedrooms, closets and hallway',
      'Quarter round along the baseboards',
      'Cleanup and final walkthrough',
    ],
    product: { collection: 'Azul Tortuga', color: 'Antigua', tier: 'standard', href: '/form?tier=standard&collection=Azul%20Tortuga&color=Antigua' },
    completed: 'October 2026',
    gallery: [
      { src: '/assets/projects/clermont-antigua-bedrooms/after-bedroom', alt: 'Clermont bedroom with Antigua LVP running from the door to the window' },
      { src: '/assets/projects/clermont-antigua-bedrooms/after-kids-room', alt: 'Kids bedroom with light gray Antigua LVP in natural window light' },
      { src: '/assets/projects/clermont-antigua-bedrooms/after-bunk-room', alt: 'Close view of Antigua LVP grain and plank seams beside a bunk bed' },
      { src: '/assets/projects/clermont-antigua-bedrooms/after-guest-room', alt: 'Guest bedroom with Antigua LVP running under the bed to the far wall' },
      { src: '/assets/projects/clermont-antigua-bedrooms/after-guest-room-2', alt: 'Guest bedroom from the doorway, Antigua LVP wall to wall' },
    ],
  },
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
    id: 'walk-in-shower-remodel',
    city: 'Winter Park',
    kind: 'Bathroom remodel',
    title: 'Primary bathroom reworked: frameless walk-in shower and a new layout',
    scope: [
      'Garden tub and its tile surround removed',
      'Shower retiled, with frameless glass and gold fixtures',
      'Toilet closet wall and door demolished to make room for a double-sink vanity',
      'Two old vanities by the entrance replaced with storage cabinetry',
      'New mirrors, relocated lighting and wood-look flooring',
      'Plumbing and electrical moved, coordinated with licensed trade partners',
    ],
    completed: '2026',
    cover: { src: '/assets/projects/walk-in-shower-remodel/after-shower', alt: 'Finished walk-in shower with frameless glass and gold fixtures' },
    swipes: [
      {
        label: 'Shower',
        after: { src: '/assets/projects/walk-in-shower-remodel/after-shower', alt: 'Walk-in shower after, with frameless glass and gold fixtures' },
        before: { src: '/assets/projects/walk-in-shower-remodel/before-shower', alt: 'Same shower before: framed glass and beige tile' },
      },
      {
        label: 'Bathroom',
        after: { src: '/assets/projects/walk-in-shower-remodel/after-cabinetry', alt: 'Bathroom after: new wood cabinetry with upper and under-cabinet lighting' },
        before: { src: '/assets/projects/walk-in-shower-remodel/before-bathroom', alt: 'Same bathroom before: dark vanity and granite top' },
      },
      {
        label: 'Tub to vanity',
        after: { src: '/assets/projects/walk-in-shower-remodel/after-double-vanity', alt: 'Double-sink vanity where the garden tub used to be' },
        before: { src: '/assets/projects/walk-in-shower-remodel/before-tub', alt: 'Same corner before: the garden tub and its tile surround' },
      },
    ],
    video: { src: '/assets/projects/walk-in-shower-remodel/after-walkthrough.mp4', poster: '/assets/projects/walk-in-shower-remodel/after-walkthrough-poster.jpg', caption: 'After walkthrough, sped up' },
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
    kind: 'Whole-home remodel',
    title: 'Summer kitchen, accent walls, kitchen and bath in one Kissimmee home',
    scope: [
      'Outdoor summer kitchen built from the frame up, with countertop, sink, grill and lighting',
      'Three PVC slat accent walls, including an arched wall with LED backlighting',
      'New kitchen cabinets, stone countertops, a waterfall island and backsplash',
      'Two tubs converted to walk-in showers and a freestanding tub layout',
      'New tile flooring, baseboards and 18 interior doors painted',
      'Gas, plumbing and electrical coordinated with licensed trade partners',
    ],
    completed: '2026',
    cover: { src: '/assets/projects/kissimmee-summer-kitchen/final-summer-kitchen', alt: 'Finished outdoor summer kitchen with green tile backsplash, grill and PVC slat panels' },
    gallery: [
      { src: '/assets/projects/kissimmee-summer-kitchen/final-summer-kitchen', alt: 'Finished outdoor summer kitchen with green tile backsplash, grill and PVC slat panels' },
      { src: '/assets/projects/kissimmee-summer-kitchen/final-arch-wall', alt: 'Arched PVC slat accent wall with warm LED backlighting' },
      { src: '/assets/projects/kissimmee-summer-kitchen/final-kitchen', alt: 'Kitchen with a PVC slat island and pendant lights' },
      { src: '/assets/projects/kissimmee-summer-kitchen/final-bathroom', alt: 'Bathroom with checkerboard vinyl floor and freestanding tub' },
      { src: '/assets/projects/kissimmee-summer-kitchen/final-slat-wall', alt: 'Living room with a full PVC slat feature wall' },
      { src: '/assets/projects/kissimmee-summer-kitchen/after-kitchen', alt: 'Summer kitchen at night with the recessed lights on' },
    ],
    before: [
      { src: '/assets/projects/kissimmee-summer-kitchen/before-kitchen', alt: 'Kitchen before: white cabinets and laminate counters' },
      { src: '/assets/projects/kissimmee-summer-kitchen/before-living', alt: 'Living room before, with the old tile floor' },
      { src: '/assets/projects/kissimmee-summer-kitchen/before-dining', alt: 'Dining area before: yellow walls and old tile' },
      { src: '/assets/projects/kissimmee-summer-kitchen/before-bath-vanity', alt: 'Master bathroom vanity before' },
      { src: '/assets/projects/kissimmee-summer-kitchen/before-tub', alt: 'Master bathroom tub before' },
      { src: '/assets/projects/kissimmee-summer-kitchen/before-shower', alt: 'Master bathroom shower before' },
      { src: '/assets/projects/kissimmee-summer-kitchen/before-lanai', alt: 'Lanai corner before the summer kitchen' },
      { src: '/assets/projects/kissimmee-summer-kitchen/before-kitchen-stove-wall-wide', alt: 'Kitchen fridge and stove wall before' },
      { src: '/assets/projects/kissimmee-summer-kitchen/before-kitchen-sink-wide', alt: 'Kitchen sink and peninsula before' },
    ],
    processGroups: [
      {
        title: 'Inside the house',
        photos: [
        { src: '/assets/projects/kissimmee-summer-kitchen/h01-demo-floors', alt: 'Old tile floors torn out' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h02-demo-kitchen', alt: 'Old kitchen removed' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h03-bath-gutted', alt: 'Bathroom opened to the studs' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h04-vanity-out', alt: 'Old vanity out, floor prepped' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h05-shower-board', alt: 'Cement board up in the shower' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h06-plumbing', alt: 'Plumbing trenched in the floor, coordinated with licensed trade partners' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h07-tile-floors', alt: 'Wood-look tile floors going down' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h08-checkerboard', alt: 'Checkerboard vinyl bathroom floor' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h09-shower-tile', alt: 'Shower walls tiled' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h10-cabinets', alt: 'New kitchen cabinets going in' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h11-island', alt: 'Waterfall island set' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h12-arch-wall', alt: 'Arched PVC slat wall with LED backlighting' },
        { src: '/assets/projects/kissimmee-summer-kitchen/h13-backsplash', alt: 'Kitchen backsplash finished' },
        ],
      },
      {
        title: 'Summer kitchen',
        photos: [
        { src: '/assets/projects/kissimmee-summer-kitchen/step-framing', alt: 'Framing the summer kitchen' },
        { src: '/assets/projects/kissimmee-summer-kitchen/s02-framing-osb', alt: 'Walls sheathed and framed' },
        { src: '/assets/projects/kissimmee-summer-kitchen/s03-ceiling-frame', alt: 'Steel base framing' },
        { src: '/assets/projects/kissimmee-summer-kitchen/s04-house-wrap', alt: 'House wrap on the framing' },
        { src: '/assets/projects/kissimmee-summer-kitchen/s05-cement-board', alt: 'Cement board goes up before the PVC slat panels' },
        { src: '/assets/projects/kissimmee-summer-kitchen/s06-counters-slats', alt: 'Countertops set and PVC slats going on' },
        { src: '/assets/projects/kissimmee-summer-kitchen/step-grill', alt: 'Setting the grill with the homeowner' },
        ],
      },
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
  {
    id: 'alafaya-black-stair-rails',
    city: 'Alafaya',
    kind: 'Stair rails',
    title: 'New stair rails, painted black',
    scope: [
      'New newel posts, handrails and balusters on the stairs and landing',
      'Balcony rail run across the upstairs opening',
      'Posts and rails painted black',
      'Cleanup and final walkthrough',
    ],
    completed: '2026',
    cover: { src: '/assets/projects/alafaya-black-stair-rails/after-stairs', alt: 'Black stair rails and balusters on carpeted stairs' },
    gallery: [
      { src: '/assets/projects/alafaya-black-stair-rails/after-stairs', alt: 'Black stair rails and balusters on carpeted stairs' },
      { src: '/assets/projects/alafaya-black-stair-rails/after-up-stairs', alt: 'Looking up the stairs at the new black rail' },
      { src: '/assets/projects/alafaya-black-stair-rails/after-landing', alt: 'Black newel post and rail at the landing' },
      { src: '/assets/projects/alafaya-black-stair-rails/after-balcony', alt: 'Black balcony rail across the upstairs opening' },
    ],
    before: [
      { src: '/assets/projects/alafaya-black-stair-rails/before-stairs', alt: 'Stairs before the new rails' },
    ],
    processGroups: [
      {
        title: 'New rails',
        photos: [
        { src: '/assets/projects/alafaya-black-stair-rails/step-bottom-post', alt: 'Bottom newel post and handrail set' },
        { src: '/assets/projects/alafaya-black-stair-rails/step-rail-run', alt: 'Rail run up to the landing' },
        { src: '/assets/projects/alafaya-black-stair-rails/step-landing', alt: 'Landing posts and balcony rail framed' },
        ],
      },
    ],
    video: { src: '/assets/projects/alafaya-black-stair-rails/after-walkthrough.mp4', poster: '/assets/projects/alafaya-black-stair-rails/after-walkthrough-poster.jpg', caption: 'Finished rails, sped up' },
  },
  {
    id: 'orlando-lvp-stairs-rails',
    city: 'Orlando',
    kind: 'Stairs & rails',
    title: 'LVP stairs with new rails',
    scope: [
      'LVP installed on every tread and riser',
      'New wood handrail with black balusters',
      'Wall-mounted handrail on the second run',
      'Cleanup and final walkthrough',
    ],
    completed: '2026',
    cover: { src: '/assets/projects/orlando-lvp-stairs-rails/after-stairs', alt: 'LVP stairs with a new wood rail and black balusters' },
    gallery: [
      { src: '/assets/projects/orlando-lvp-stairs-rails/after-stairs', alt: 'LVP stairs with a new wood rail and black balusters' },
      { src: '/assets/projects/orlando-lvp-stairs-rails/after-stairs-side', alt: 'Side view of the LVP stairs and new rail' },
      { src: '/assets/projects/orlando-lvp-stairs-rails/after-top-post', alt: 'Wood newel post and black balusters at the top of the stairs' },
      { src: '/assets/projects/orlando-lvp-stairs-rails/after-handrail', alt: 'Wall-mounted wood handrail over the LVP stairs' },
    ],
  },
];
