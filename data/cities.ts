// City landing pages: one data entry per page, rendered by components/CityPage.tsx.
// Copy rules: verifiable general facts only. Never name neighborhoods/communities
// worked, never invent jobs or reviews. Real jobs go in data/projects.ts.

export type Faq = { q: string; a: string; lang?: 'pt' };
export type Section = { h2: string; paras: string[]; list?: string[] };

export type City = {
  slug: string;
  path: string;
  name: string;
  county: string;
  kind: 'lvp' | 'remodeling';
  anchor: string; // descriptive anchor text used by <ServiceAreas />
  title: string; // rendered as "%s | New Design Pro"
  description: string; // 140–160 chars
  kicker: string;
  h1: string;
  byline: string;
  heroImage: string;
  zips: string[];
  poBoxZips?: string[];
  zipNote: string;
  intro: string[];
  sections: Section[]; // local housing notes, slab/humidity, local questions
  str?: Section; // short-term-rental owner section
  pricingH2: string;
  processH2: string;
  faqs: Faq[];
  neighbors: [string, string]; // slugs of 2 neighboring city pages
  blogSlug: string;
  // TODO-DANIEL: add one real job per city (see data/projects.ts) — never invent one.
  featuredJobId: string | null;
};

export const CITIES: City[] = [
  // ---------------------------------------------------------------- DAVENPORT (LVP)
  {
    slug: 'davenport',
    path: '/lvp-installation-davenport',
    name: 'Davenport',
    county: 'Polk County',
    kind: 'lvp',
    anchor: 'LVP installation in Davenport',
    title: 'LVP Installation in Davenport, FL — From $4.99/sqft',
    description:
      'LVP installation in Davenport, FL from a crew based right here: $4.99/sqft supplied and installed, builder-slab leveling, and a written quote in 24 hours.',
    kicker: 'Davenport, FL · Polk County · Our home base',
    h1: 'LVP flooring in Davenport, from the crew that lives here',
    byline: 'Based in Davenport 33837. Supplied & installed from $4.99/sqft. 50% deposit, written quote in 24 hours.',
    heroImage: '/assets/lvp-livingroom-lg.webp',
    zips: ['33837', '33896', '33897'],
    poBoxZips: ['33836'],
    zipNote: `Davenport mailing addresses use 33837, 33896, and 33897, and 33836 is the PO box ZIP. Some of those addresses sit right at the Osceola County line, which is why you'll see Davenport addresses with a Kissimmee-area feel. If your mail says Davenport, you're in our backyard.`,
    intro: [
      `Davenport is where New Design Pro is based, so these are our neighbors' floors. It has also been one of the fastest-growing towns in Florida over the last few years, and that growth shows in the housing: most homes here are fairly new, in subdivisions off US-27 and toward the I-4 interchange, with a large share of vacation homes on the Osceola County side.`,
      `Newer houses don't mean easy floors, though. Below is what I check in a Davenport home before I put a number on paper, what it costs, and the questions people around here ask me most.`,
    ],
    sections: [
      {
        h2: 'Builder slabs in newer Davenport homes',
        paras: [
          `A typical Davenport project starts with builder-grade carpet in the bedrooms and tile or sheet vinyl in the wet areas. The carpet comes up in an hour. The slab underneath is where the real work is. Production slabs often have trowel ridges, humps at control joints, and dips where the pour changed, and a floating plank will telegraph every one of them if they're left alone.`,
          `Most of the SPC lines I install want the subfloor flat within about 3/16 of an inch over 10 feet. I put a long straightedge across the main rooms at the free measure, mark the high and low spots, and price the grinding or self-leveler into the written quote. That's the step that decides whether your floor clicks and flexes in a year or stays quiet.`,
        ],
      },
      {
        h2: 'Owners who live out of state',
        paras: [
          `A lot of Davenport homes belong to people who don't live here full time. If that's you, the job can still run smoothly without you standing in the living room.`,
        ],
        list: [
          `The measure can happen with your property manager on site or over a video call, and the written quote comes by email within 24 hours.`,
          `The 50% deposit holds your date. The balance is due when the work is done and you've seen it, in person or in photos.`,
          `We send photos as the job moves: after demo, after leveling, and when the last transition is in.`,
          `Keep a box of leftover planks in the closet. If a plank is ever damaged, a repair becomes a swap instead of a hunt for a discontinued color.`,
        ],
      },
      {
        h2: 'Why being local matters after the install',
        paras: [
          `Most flooring problems show up in the first season, not the first day: a transition that needs adjusting after the AC has been running, a baseboard that needs a touch of caulk, a door that needs to be trimmed after the new floor raised it slightly. Because we're based in Davenport, coming back for those is a short drive, not a scheduling negotiation.`,
          `It also means I know what local summers do to a closed-up house. If your home sits empty part of the year, keep the AC running at a reasonable setting. SPC plank is stable, but the wood baseboards, door casings, and cabinets around it are not, and humidity is hard on all of them.`,
        ],
      },
    ],
    pricingH2: 'What LVP costs in Davenport',
    processH2: 'How a Davenport install runs, step by step',
    faqs: [
      {
        q: 'Are you actually based in Davenport?',
        a: `Yes. New Design Pro is based in Davenport, FL 33837. We're a service-area business, so we come to you. There's no showroom, which is part of why our pricing doesn't carry showroom markup.`,
      },
      {
        q: 'Can you work on my vacation home while I live out of state?',
        a: `Yes. We can do the measure with your property manager or over a video call, email the written quote, and send photos at each stage. The 50% deposit holds the date and the balance is due when the work is done.`,
      },
      {
        q: 'Should I do the whole house or just the main living areas?',
        a: `If budget allows, one continuous floor through the living areas, hallways, and bedrooms looks cleaner and avoids extra transitions. If you need to phase it, start with the main living space and keep the leftover boxes so the second phase matches.`,
      },
      {
        q: 'How soon can you start?',
        a: `You get a written quote within 24 hours of the measure. The start date depends on the calendar and material availability, and the quote lists the real date rather than a promise we can't keep.`,
      },
      {
        q: 'Vocês atendem em português? (Do you speak Portuguese?)',
        a: `Sim. Falamos português, então você pode tirar dúvidas sobre o orçamento e o cronograma no seu idioma. Yes, we speak Portuguese, so the quote and the schedule can be talked through in Portuguese.`,
        lang: 'pt',
      },
    ],
    neighbors: ['haines-city', 'kissimmee'],
    blogSlug: 'lvp-installation-timeline-2-bedroom-job',
    featuredJobId: null,
  },

  // ---------------------------------------------------------------- KISSIMMEE
  {
    slug: 'kissimmee',
    path: '/lvp-installation-kissimmee',
    name: 'Kissimmee',
    county: 'Osceola County',
    kind: 'lvp',
    anchor: 'LVP installation in Kissimmee',
    title: 'LVP Installation in Kissimmee, FL — From $4.99/sqft',
    description:
      'LVP installation in Kissimmee, FL from $4.99/sqft supplied and installed. Moisture-checked slabs, rental-friendly scheduling, and a written quote in 24 hours.',
    kicker: 'Kissimmee, FL · Osceola County',
    h1: 'Luxury vinyl plank flooring in Kissimmee, installed right',
    byline: 'A short drive from our Davenport base. Supplied & installed from $4.99/sqft. Written quote in 24 hours, 50% deposit.',
    heroImage: '/blog-img/lvp-kissimmee-hero.webp',
    zips: ['34741', '34743', '34744', '34746', '34747', '34758', '34759'],
    poBoxZips: ['34742', '34745'],
    zipNote: `Kissimmee mailing addresses cover a lot of ground: 34741, 34743, 34744, 34746, 34747, 34758, and 34759, plus PO box ZIPs 34742 and 34745. A few of those reach toward the Polk County line. If any of them is on your mail, you're in our service area.`,
    intro: [
      `Kissimmee is the Osceola County seat, and it's about as varied as a housing market gets: older block homes near downtown, newer subdivisions on the edges of town, and a big stock of vacation rentals along the US-192 corridor toward the theme parks. Floors in all of them live the same Florida life, on a concrete slab, in humid air, with sand and pool water coming in through the sliders.`,
      `That's why most of what I install here is rigid-core SPC luxury vinyl plank. We're based next door in Davenport, so Kissimmee is home turf. Here's what I look at before quoting a Kissimmee floor, what it costs, and what people ask me most.`,
    ],
    sections: [
      {
        h2: "What's under the carpet in a Kissimmee home",
        paras: [
          `In older Kissimmee houses, the carpet or tile you see is rarely the first floor that slab has worn. It's common to find ceramic tile set over an older floor, sheet vinyl glued straight to the concrete, or terrazzo hiding under carpet in mid-century homes. Each one changes the prep. Glued-down vinyl and its adhesive have to come up clean. Tile leaves thinset ridges that have to be ground flat. Sound terrazzo is usually flat and solid enough to float a plank over once it's cleaned and checked, which can save you real money on demo.`,
          `Newer homes are simpler, but not automatically flat. Builder slabs often have humps at control joints and dips where rooms meet. I check flatness with a straightedge at the measure, before I quote, not after the planks are already clicking.`,
        ],
      },
      {
        h2: 'Slab moisture and humidity in Osceola County',
        paras: [
          `SPC plank itself is waterproof, but what's underneath still matters. Moisture moving up through a slab can get trapped under the floor, and a closed-up house in August can hold enough humidity to swell wood baseboards and door casings. When a slab reads high, I use a moisture-barrier underlayment instead of hoping for the best. If a slab is clearly wet from a plumbing leak or bad drainage outside, I'll tell you to fix that first, because no floor fixes a water problem.`,
          `For rentals and second homes, I also ask how the AC is set when nobody's there. Planks and trim do best when the house stays climate controlled. Shutting the system off for weeks at a time is hard on any floor in this climate.`,
        ],
      },
    ],
    str: {
      h2: 'For short-term rental owners: fast turnover, minimal downtime',
      paras: [
        `A lot of Kissimmee calls come from owners and managers of vacation rentals. Your concern is different from a homeowner's: every day the unit is blocked is a day of lost bookings. Here's how I plan those jobs.`,
      ],
      list: [
        `We schedule the install in a gap between bookings and lock the date with the 50% deposit, so you can block the calendar with confidence.`,
        `Prep and install for a typical rental floor take about two to three days once the old flooring is out. The written quote gives you the real number for your square footage.`,
        `For rentals I usually recommend the 20-mil wear layer. Rolling luggage, sandy flip-flops, and pool traffic are hard on a floor, and the thicker wear layer holds up better between deep cleans.`,
        `If your property manager or HOA has rules on work hours, parking, or dumpsters, send them over and we'll plan around them.`,
        `We clean up at the end so your cleaner can turn the unit instead of hauling debris.`,
      ],
    },
    pricingH2: 'What you pay in Kissimmee',
    processH2: 'How the Kissimmee job actually goes',
    faqs: [
      {
        q: 'Can you install LVP over my existing tile?',
        a: `Sometimes. If the tile is well bonded, flat, and the grout lines aren't deep, SPC can float over it, which saves demo cost and dust. If tiles are hollow or cracked, or the added height causes trouble at doors, it has to come up. I check with a tap test and a straightedge and tell you which way I'd go and why.`,
      },
      {
        q: 'How long will my rental be offline?',
        a: `Plan on about two to three days for a typical install once demo is done, plus extra time if the slab needs significant leveling. The written quote lists the schedule so you can block the calendar around it.`,
      },
      {
        q: 'Is SPC LVP okay near a pool or lanai door?',
        a: `Yes, it's one of the best places for it, because the surface won't swell from wet feet. I seal the perimeter at sliders and set transitions so water isn't pushed underneath, and I recommend a mat at the door so sand doesn't grind the wear layer.`,
      },
      {
        q: 'Do I need to move my furniture?',
        a: `No. We move standard furniture out of the way and put it back. Pianos, safes, and very heavy pieces we'll talk through at the measure.`,
      },
      {
        q: 'Vocês falam português? (Do you speak Portuguese?)',
        a: `Sim, falamos português. Pode ligar ou mandar mensagem em português. Yes, we speak Portuguese, so you can call or text in whichever language is easier.`,
        lang: 'pt',
      },
    ],
    neighbors: ['davenport', 'clermont'],
    blogSlug: 'lvp-installation-kissimmee-cost-process',
    featuredJobId: null,
  },

  // ---------------------------------------------------------------- HAINES CITY
  {
    slug: 'haines-city',
    path: '/lvp-installation-haines-city',
    name: 'Haines City',
    county: 'Polk County',
    kind: 'lvp',
    anchor: 'LVP installation in Haines City',
    title: 'LVP Installation in Haines City, FL — From $4.99/sqft',
    description:
      'LVP installation in Haines City, FL: replace builder carpet with waterproof SPC plank from $4.99/sqft installed. Slab leveling included, quote in 24 hours.',
    kicker: 'Haines City, FL · Polk County',
    h1: 'Luxury vinyl plank flooring in Haines City',
    byline: 'Waterproof SPC plank, from $4.99/sqft supplied and installed. Insured crew, 50% deposit, written quote in 24 hours.',
    heroImage: '/assets/lvp-hallway-lg.webp',
    zips: ['33844'],
    poBoxZips: ['33845'],
    zipNote: `Haines City has one standard ZIP code, 33844, and a PO box ZIP, 33845. Some nearby addresses outside city limits also carry a Haines City or Davenport mailing address. Either way, you're a short drive from our base.`,
    intro: [
      `Haines City has grown fast. Census estimates have ranked it among the fastest-growing cities in the country in recent years, and you can see it in the new subdivisions along the US-27 corridor. That growth shapes the flooring work here: a lot of Haines City calls are about replacing builder-grade carpet in homes that are only a few years old, alongside older block homes closer to the historic downtown.`,
      `We're based next door in Davenport. Here's what I look at before quoting a floor in 33844, and what homeowners here usually want to know.`,
    ],
    sections: [
      {
        h2: 'Replacing builder-grade flooring in newer Haines City homes',
        paras: [
          `Builder carpet and the thin pad under it come up fast. What takes time is the slab. New-construction slabs often have ridges, trowel marks, and dips where rooms meet, and those show through a floating floor if they're ignored. Most SPC lines want the subfloor flat within about 3/16 of an inch over 10 feet, so I put a straightedge on it at the measure and price any grinding or leveling into the written quote.`,
          `If your home has tile in the wet areas and carpet in the bedrooms, a common plan is running one continuous plank through the living areas and bedrooms and leaving the bathroom tile alone. That cuts demo cost and gives you a clean, uninterrupted look. I'll show you exactly where the transitions land before you commit.`,
        ],
      },
      {
        h2: 'Young slabs and moisture: why I still test',
        paras: [
          `A newer house doesn't guarantee a dry slab. Concrete keeps giving off moisture long after it's poured. A common rule of thumb is roughly a month of drying per inch of thickness in good conditions, and Florida humidity slows that down. If your home is very new, or the slab reads damp, I put a moisture-barrier underlayment under the plank. It's a small line item that protects the whole floor.`,
          `Also pull out your builder warranty paperwork before we start. Some builder warranties cover the slab and the original floor coverings for a period of time, and it's worth knowing what changes if you replace them.`,
        ],
      },
      {
        h2: 'Choosing a wear layer for guests, pets, and part-time living',
        paras: [
          `Owners who rent their homes, or only spend part of the year here, ask about durability more than anything. For homes that see a lot of guests or dogs, I usually recommend the 20-mil wear layer over the 12-mil. The price difference is a dollar a square foot, and the difference in how it looks after a few years of heavy use is noticeable. For a single owner with no pets, the 12-mil is a solid floor and the honest recommendation.`,
          `If you're planning to age in place, tell me. A floating SPC floor with low-profile transitions means fewer edges to catch a foot between rooms, and a matte finish hides scuffs better than a glossy one.`,
        ],
      },
    ],
    pricingH2: 'LVP pricing for Haines City homes',
    processH2: 'From measure to finished floor in Haines City',
    faqs: [
      {
        q: 'Can you match the plank the builder used elsewhere in my house?',
        a: `Sometimes we can get close, but builder lines get discontinued. I'll bring samples to the measure. If an exact match isn't possible, a clean break at a doorway usually looks better than a near-match side by side.`,
      },
      {
        q: 'Do I need HOA approval to change my floors?',
        a: `Interior flooring usually doesn't need HOA approval, but many associations have rules on contractor hours, parking, and dumpsters. Check your HOA documents or send them to me and we'll follow them.`,
      },
      {
        q: 'Will LVP make my house sound louder than carpet?',
        a: `Floating floors can sound a bit hollower than carpet. A quality attached pad or underlayment, plus rugs in big open rooms, takes care of most of it. If noise matters to you, say so at the measure and I'll show you options.`,
      },
      {
        q: 'What does it cost to replace carpet with LVP in a 3-bedroom home?',
        a: `It depends on square footage, the tier you pick, and how much leveling the slab needs. At $4.99 per square foot supplied and installed for 12-mil, 1,200 square feet comes to about $5,988 before stairs or extra leveling. You get a written quote within 24 hours of the measure.`,
      },
    ],
    neighbors: ['davenport', 'winter-haven'],
    blogSlug: 'will-spc-lvp-dent-scratch-hold-up-central-florida',
    featuredJobId: null,
  },

  // ---------------------------------------------------------------- WINTER HAVEN
  {
    slug: 'winter-haven',
    path: '/lvp-installation-winter-haven',
    name: 'Winter Haven',
    county: 'Polk County',
    kind: 'lvp',
    anchor: 'LVP installation in Winter Haven',
    title: 'LVP Installation in Winter Haven, FL — From $4.99/sqft',
    description:
      'LVP installation in Winter Haven, FL from $4.99/sqft installed. Honest prep for older slabs and lake homes, moisture testing, and a written quote in 24 hours.',
    kicker: 'Winter Haven, FL · Polk County',
    h1: 'Luxury vinyl plank flooring in Winter Haven',
    byline: 'SPC plank for older homes and lake houses alike. From $4.99/sqft supplied and installed. Written quote in 24 hours.',
    heroImage: '/assets/lvp-kitchen-lg.webp',
    zips: ['33880', '33881', '33884'],
    poBoxZips: ['33882', '33883', '33885', '33888'],
    zipNote: `Winter Haven's standard ZIP codes are 33880, 33881, and 33884, with PO box and unique ZIPs 33882, 33883, 33885, and 33888. All of them are within our regular service area, a short drive from our base in Davenport.`,
    intro: [
      `Winter Haven calls itself the Chain of Lakes City, with around 50 lakes in or along its limits. It was incorporated in 1911 and grew up as a citrus town, so the housing stock spans a long stretch: older homes near downtown and on the lakes, mid-century block houses, and newer subdivisions farther out. That mix means no two Winter Haven floors start from the same place.`,
      `Here's what I watch for in Winter Haven homes before quoting, what it costs, and the questions that come up most.`,
    ],
    sections: [
      {
        h2: 'Older Winter Haven homes: what the prep really looks like',
        paras: [
          `In mid-century homes it's common to pull up carpet and find terrazzo, old resilient floor tile, or layers of sheet vinyl. Terrazzo is a good base if it's sound. Old 9-by-9 tile and black adhesive are a different story: those materials can contain asbestos, and they shouldn't be ground or broken up until they've been tested. If I see them, I'll stop and recommend testing before anything is disturbed. It's not the fun answer, but it's the right one.`,
          `Older slabs also tend to have more settlement cracks and uneven spots. Hairline cracks are normal and a plank floats right over them. Cracks where one side sits higher than the other need to be ground and patched first so the plank doesn't rock.`,
        ],
      },
      {
        h2: 'Lake homes, wet feet, and moisture',
        paras: [
          `Homes near the water deal with the same humidity as everyone else in Polk County, plus wet feet and boat-day traffic. SPC plank handles splashes and humidity without swelling, which is the main reason I recommend it over laminate here. Laminate has a wood-fiber core and doesn't forgive standing water.`,
          `What I watch on these jobs is the slab and the doors. I test slab moisture before quoting and use a moisture-barrier underlayment where the readings call for it. At sliders and lake-side doors, I seal the perimeter and set transitions so water can't get pushed under the floor.`,
        ],
      },
      {
        h2: 'Picking a floor that suits an older house',
        paras: [
          `If your home has original details you love, a warmer wood-look plank in a low-sheen finish usually suits it better than cool gray. I bring samples to the measure so you can see them against your own walls and light, not a showroom's.`,
          `Trim matters as much as the plank in older homes. Baseboards and quarter round get replaced or reset, and door casings get undercut so the new floor slides underneath instead of being caulked against them. That's what makes a floor look like it was always there.`,
        ],
      },
    ],
    pricingH2: 'Winter Haven LVP pricing, all in',
    processH2: 'What to expect on a Winter Haven job',
    faqs: [
      {
        q: 'My house has old floor tile under the carpet. Can LVP go over it?',
        a: `If it's solid and flat, often yes, and floating a plank over sound old tile avoids disturbing it at all. If it's loose or has to come up, and it's the old 9-by-9 style or sits on black adhesive, get it tested for asbestos first. I'll point you to that step before quoting demo.`,
      },
      {
        q: 'Do you install LVP that I bought myself?',
        a: `Yes. Labor-only is quoted at the in-home measure, because it depends on the product and the prep your floor needs. I'll check that your plank is suited to a slab and Florida humidity before we start.`,
      },
      {
        q: 'Do the planks need to acclimate before install?',
        a: `Follow the manufacturer's instructions. Many SPC lines need little acclimation compared with wood, but the house should be at normal living temperature with the AC running. We store boxes flat inside the home, never in a hot garage.`,
      },
      {
        q: 'How long does a Winter Haven install take?',
        a: `Most homes take two to three days once the old floor is out. Older homes that need more leveling or crack repair can take longer, and the written quote spells that out.`,
      },
    ],
    neighbors: ['haines-city', 'lakeland'],
    blogSlug: 'lvp-vs-laminate-florida-humidity',
    featuredJobId: null,
  },

  // ---------------------------------------------------------------- LAKELAND
  {
    slug: 'lakeland',
    path: '/lvp-installation-lakeland',
    name: 'Lakeland',
    county: 'Polk County',
    kind: 'lvp',
    anchor: 'LVP installation in Lakeland',
    title: 'LVP Installation in Lakeland, FL — From $4.99/sqft',
    description:
      'LVP installation in Lakeland, FL from $4.99/sqft supplied and installed. Prep for slab and raised wood floors in older homes, plus a written quote in 24 hours.',
    kicker: 'Lakeland, FL · Polk County',
    h1: 'Luxury vinyl plank flooring in Lakeland',
    byline: 'Older homes, newer builds, slab or raised wood floor. From $4.99/sqft supplied and installed. Written quote in 24 hours.',
    heroImage: '/assets/lvp-livingroom-lg-v18.webp',
    zips: ['33801', '33803', '33805', '33809', '33810', '33811', '33812', '33813', '33815'],
    poBoxZips: ['33802', '33804', '33806', '33807'],
    zipNote: `Lakeland spans nine standard ZIP codes: 33801, 33803, 33805, 33809, 33810, 33811, 33812, 33813, and 33815, plus PO box ZIPs. It's on the west side of our service area, and we come to you for the free measure.`,
    intro: [
      `Lakeland is the largest city in Polk County and one of the oldest in the area. It was incorporated in 1885, a few years after the railroad reached it, and that history shows up in its houses. Near downtown and around its many lakes you'll find homes from the early and middle 1900s, and farther out, the newer subdivisions that came with growth along I-4 between Tampa and Orlando.`,
      `Older and newer Lakeland homes need very different prep. Here's how I approach both, what it costs, and the questions Lakeland owners ask most.`,
    ],
    sections: [
      {
        h2: 'Raised wood floors, old slabs, and what older Lakeland homes hide',
        paras: [
          `Most Central Florida houses sit on a concrete slab, but some of Lakeland's older homes sit on raised wood floors over a crawlspace. LVP can go over a wood subfloor, but the prep is different. I check for soft spots, loose boards, and bounce between joists, then add plywood or underlayment as needed so the plank has a flat, stiff base. If there's original hardwood under the carpet, we should talk before covering it, because sometimes refinishing is the better call.`,
          `On slab homes from the same era, expect what I find across older Florida houses: terrazzo, old tile, and glued-down coverings. Old resilient tile and black adhesive should be tested for asbestos before they're disturbed.`,
        ],
      },
      {
        h2: 'Crawlspace humidity and keeping the floor stable',
        paras: [
          `On a raised floor, moisture comes from below through the crawlspace instead of through concrete. Good ventilation and a ground vapor barrier in the crawlspace go a long way. If yours stays damp, that's worth fixing before new flooring goes in. SPC plank won't swell, but a damp crawlspace can still affect the wood subfloor it sits on.`,
          `On slab homes, I test moisture at the measure and use a moisture-barrier underlayment when the readings call for it. Either way, you'll know what I found and what I'm doing about it before you sign anything.`,
        ],
      },
      {
        h2: 'Restore the hardwood or go with LVP?',
        paras: [
          `Plenty of Lakeland owners with older homes ask whether to restore hardwood or switch to LVP. If you have sound original hardwood and you love it, refinishing can be the right move, and I'll tell you so. If the hardwood is gone, damaged, or you want something water-resistant in the kitchen and baths, SPC LVP gives you the wood look without the worry about spills and humidity.`,
          `In newer Lakeland subdivisions the question is simpler: builder carpet out, slab leveled, one continuous plank in. The same flatness rule applies there as anywhere, about 3/16 of an inch over 10 feet for most SPC lines.`,
        ],
      },
    ],
    pricingH2: 'What LVP runs in Lakeland',
    processH2: 'How a Lakeland flooring job comes together',
    faqs: [
      {
        q: 'Can you install LVP over a raised wood floor?',
        a: `Yes, once it's flat and stiff. I check for soft spots and bounce, screw down loose boards, and add plywood or underlayment where needed. A damp crawlspace should be addressed first so the subfloor stays stable.`,
      },
      {
        q: 'Should I cover my original hardwood with LVP?',
        a: `If it's in good shape, get a refinishing quote first. If it's damaged beyond refinishing, or you want a waterproof surface, LVP can float over it once it's flat and secure.`,
      },
      {
        q: 'Do you travel to Lakeland for smaller jobs?',
        a: `Yes. Lakeland is within our service area, and there are no trip charges. Small jobs get the same free measure and written quote within 24 hours as big ones.`,
      },
      {
        q: 'Which plank looks best in an older home?',
        a: `Usually a warmer, lower-sheen wood look with natural variation between boards. I bring samples so you can judge them in your own light, next to your trim and cabinets.`,
      },
      {
        q: 'Do you speak Portuguese?',
        a: `Yes. Falamos Português. Daniel and the crew can walk you through the quote in English or Portuguese.`,
      },
    ],
    neighbors: ['winter-haven', 'haines-city'],
    blogSlug: 'spc-lvp-vs-real-hardwood-central-florida',
    featuredJobId: null,
  },

  // ---------------------------------------------------------------- CLERMONT
  {
    slug: 'clermont',
    path: '/lvp-installation-clermont',
    name: 'Clermont',
    county: 'Lake County',
    kind: 'lvp',
    anchor: 'LVP installation in Clermont',
    title: 'LVP Installation in Clermont, FL — From $4.99/sqft',
    description:
      'LVP installation in Clermont, FL from $4.99/sqft supplied and installed. Stairs, two-story homes, and open floor plans done right. Written quote in 24 hours.',
    kicker: 'Clermont, FL · Lake County',
    h1: 'Luxury vinyl plank flooring in Clermont',
    byline: 'Two-story homes, stairs, and big open rooms. From $4.99/sqft supplied and installed. No trip charges.',
    heroImage: '/assets/lvp-livingroom-lg.webp',
    zips: ['34711', '34714', '34715'],
    poBoxZips: ['34712', '34713'],
    zipNote: `Clermont's standard ZIP codes are 34711, 34714, and 34715, with PO box ZIPs 34712 and 34713. Clermont is on the north side of our service area, a straight run up US-27 from our base in Davenport.`,
    intro: [
      `Clermont sits in south Lake County, and it's known for something rare in Florida: hills. The rolling terrain and chain of lakes have drawn steady growth, and much of the housing south of town toward US-27 is newer subdivision construction, with older homes closer to downtown and the water.`,
      `Clermont floors come with their own set of questions, mostly about stairs, upstairs subfloors, and big open rooms. Here's how I handle them, what it costs, and what people ask before they book.`,
    ],
    sections: [
      {
        h2: 'Two-story homes, stairs, and open floor plans',
        paras: [
          `A lot of newer Clermont homes are two-story with open downstairs layouts. That changes two things in a flooring quote. First, stairs: each tread and riser is cut, fitted, and finished with a stair nose, so stairs are priced per step at $90 a step. Second, long uninterrupted runs: SPC is stable, but large open spaces still need the expansion gaps and transitions the manufacturer calls for. I'll show you where those land before we start, so there are no surprises in the middle of your great room.`,
          `Upstairs, the subfloor is usually plywood or OSB over wood framing instead of concrete. That means checking for squeaks and loose panels and screwing them down before the plank goes in, since a floating floor won't silence a squeak underneath it.`,
        ],
      },
      {
        h2: 'Sloped lots and signs of slab moisture',
        paras: [
          `Homes on sloped lots can have drainage that sends water toward one side of the house. If you've seen white powder on the slab when the old floor came up, or the carpet tack strip is rusted along one wall, those are signs of moisture coming through the concrete. I test before quoting and use a moisture-barrier underlayment when needed. If water is getting in from outside, fix the grading or gutters first, because no flooring fixes a drainage problem.`,
        ],
      },
      {
        h2: 'Busy households: 12-mil or 20-mil?',
        paras: [
          `With kids, dogs, and a lot of foot traffic through an open kitchen and family room, the 20-mil wear layer earns its extra dollar per square foot. For quieter homes, or upstairs bedrooms that see socks more than shoes, the 12-mil is plenty. Some owners split it: 20-mil downstairs, 12-mil upstairs, in matching colors from the same line. It's an honest way to put the money where the wear actually happens.`,
          `Whichever you pick, the habits that protect it are the same: felt pads under chair and table legs, a mat at every exterior door to catch grit before it grinds the wear layer, and a damp mop with a cleaner the manufacturer approves instead of a steam mop. Over the life of the floor, those three things matter more than the difference between two good planks.`,
        ],
      },
    ],
    pricingH2: 'Clermont LVP pricing, including stairs',
    processH2: 'How we run a Clermont install',
    faqs: [
      {
        q: 'Do you charge extra to drive to Clermont?',
        a: `No. There are no trip charges, and Clermont is within our service area. The free measure and the written quote within 24 hours are the same as anywhere else we work.`,
      },
      {
        q: 'Can you do my stairs in LVP too?',
        a: `Yes. Stairs are $90 a step. Each tread and riser is cut and fitted, and finished with a matching stair nose so the edge is safe and clean.`,
      },
      {
        q: 'Can LVP go upstairs over a wood subfloor?',
        a: `Yes. SPC floats over a flat, secure plywood or OSB subfloor. I check for squeaks and loose panels first and screw them down before installing.`,
      },
      {
        q: 'Is it better to do upstairs and downstairs at the same time?',
        a: `It's usually more efficient: one setup, one material order, and matching planks throughout. The per-square-foot price is the same, but you avoid a second round of disruption and a color-match risk later.`,
      },
      {
        q: 'Vocês falam português?',
        a: `Sim, falamos português. Yes, we speak Portuguese, so you can call or text in either language.`,
        lang: 'pt',
      },
    ],
    neighbors: ['davenport', 'kissimmee'],
    blogSlug: 'vinyl-plank-cost-per-square-foot-central-florida-2026',
    featuredJobId: null,
  },

  // ---------------------------------------------------------------- REMODELING DAVENPORT
  {
    slug: 'remodeling-davenport',
    path: '/remodeling-davenport',
    name: 'Davenport',
    county: 'Polk County',
    kind: 'remodeling',
    anchor: 'Flooring & interior remodeling in Davenport',
    title: 'Flooring & Interior Remodeling in Davenport, FL',
    description:
      'Flooring and interior remodeling in Davenport, FL: LVP, tile, trim, and paint finish work from a local crew. Insured, 50% deposit, written quote in 24 hours.',
    kicker: 'Davenport, FL · Polk County · Interior remodeling',
    h1: 'Flooring and interior remodeling in Davenport',
    byline: 'Floors, tile, trim, and paint, from the crew based in Davenport. LVP from $4.99/sqft, tile from $7.99/sqft. Written quote in 24 hours.',
    heroImage: '/assets/bathroom-new-lg.webp',
    zips: ['33837', '33896', '33897'],
    poBoxZips: ['33836'],
    zipNote: `We take remodeling work across Davenport's 33837, 33896, and 33897 ZIP codes (33836 is the PO box ZIP), and nearby in Polk and Osceola counties.`,
    intro: [
      `Most of the remodels we do in Davenport are finish-work remodels: the floors, the tile, the trim, and the paint that make a house feel new without moving walls. That's the work my crew does with our own hands, and it's where most of the visual change in a room comes from.`,
      `Here's what that covers, how it's priced, and how we handle the parts of a remodel that need other trades.`,
    ],
    sections: [
      {
        h2: 'What a finish-work remodel covers',
        paras: [
          `A typical Davenport refresh starts with the floor, because it touches every room. From there it usually grows into tile in a bathroom or kitchen, new baseboards and casing, and fresh paint, so everything lines up at the end. Doing them as one project means one schedule, one crew, and trim that's installed after the floor instead of patched around it.`,
        ],
        list: [
          `LVP flooring, supplied and installed from $4.99/sqft.`,
          `Floor tile, shower walls, and backsplashes, supplied and installed from $7.99/sqft for floor tile.`,
          `Baseboards, quarter round, door casing, and other trim, installed, caulked, and paint-ready.`,
          `Interior painting: walls, ceilings, trim, and doors.`,
        ],
      },
      {
        h2: 'Bathroom and kitchen tile, done in the right order',
        paras: [
          `In bathrooms, the tile is only as good as what's behind it. Shower walls get a proper waterproofing membrane before the first tile goes up, and floors get checked for flatness so large-format tile doesn't lip at the edges. In kitchens, a backsplash is one of the fastest ways to change the room, and it goes in after the counters are set so the bottom row sits tight.`,
          `If you're also replacing the floor, we plan the sequence so the floor runs under where it should and transitions cleanly at the bathroom door.`,
        ],
      },
      {
        h2: 'Plumbing, electrical, and structural work',
        paras: [
          `Some remodels need more than finish work: a moved drain, a new circuit, or a wall that comes out. We don't do that work ourselves. Plumbing, electrical, or structural work is coordinated with licensed trade partners, and we schedule our tile, floor, trim, and paint around it so the project still runs as one job from your side.`,
        ],
      },
      {
        h2: 'Trim and paint: the part people notice last but feel first',
        paras: [
          `New floors often sit a little higher than the old ones, which leaves gaps at the baseboards and doors that rub. We replace or reset baseboards, undercut door casings so the floor slides underneath, trim doors that drag, and caulk and paint so the edges disappear. It's the difference between a new floor and a finished room.`,
          `Paint comes last, after the dust is gone. We prep, patch nail holes and dings, and cut clean lines at the ceiling and trim.`,
        ],
      },
    ],
    pricingH2: 'How a Davenport remodel is priced',
    processH2: 'How we run a Davenport remodel',
    faqs: [
      {
        q: 'Can you handle my whole bathroom remodel?',
        a: `We handle the tile, waterproofing, flooring, trim, and paint. If the bathroom needs plumbing, electrical, or structural changes, that work is coordinated with licensed trade partners and scheduled around our part of the job.`,
      },
      {
        q: 'Do you do painting on its own, without new floors?',
        a: `Yes. Interior painting is quoted per project after a walkthrough. Many owners pair it with trim work so the baseboards and doors look new too.`,
      },
      {
        q: 'How is a remodel quoted?',
        a: `After a free in-home walkthrough. LVP starts at $4.99/sqft and floor tile at $7.99/sqft supplied and installed. Trim and paint are quoted by scope. You get a written quote within 24 hours, and a 50% deposit holds the date.`,
      },
      {
        q: 'Can we live in the house during the work?',
        a: `Usually, yes. We work room by room where possible and clean up at the end of each day. Bathroom tile jobs need that bathroom out of service for several days, so plan around a second bathroom if you have one.`,
      },
      {
        q: 'Falam português?',
        a: `Sim. Falamos Português. Yes, we speak Portuguese, from the walkthrough to the final cleanup.`,
        lang: 'pt',
      },
    ],
    neighbors: ['davenport', 'haines-city'],
    blogSlug: 'does-spc-lvp-look-cheap-honest-installer-answer',
    featuredJobId: null,
  },
];

export function getCity(slug: string): City {
  const c = CITIES.find((x) => x.slug === slug);
  if (!c) throw new Error(`Unknown city slug: ${slug}`);
  return c;
}

export type CityLink = Pick<City, 'slug' | 'path' | 'name' | 'county' | 'anchor'>;
export const CITY_LINKS: CityLink[] = CITIES.map(({ slug, path, name, county, anchor }) => ({ slug, path, name, county, anchor }));
