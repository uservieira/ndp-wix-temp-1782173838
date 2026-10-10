// Duralast (also branded Durato) LVP collections installed by New Design Pro.
// Every color name, SKU, and spec below was verified against the manufacturer's
// official product pages and 2026 spec sheets (see `source` / `specSheet`).
// Swatch images are the manufacturer's official images. Room images are the manufacturer's
// official scenes; 16 whose floor did not match the swatch were re-rendered with the exact
// swatch as the floor (sources in ndp-local-seo-audit/rerender/).
// Never add a color or spec here that isn't on an official Duralast/Durato page.

import type { LvpTierKey } from '@/lib/site';

export type DuralastColor = { name: string; sku: string; slug: string; chip: string };

export type DuralastCollection = {
  slug: string;
  name: string;
  tier: LvpTierKey;
  wear: string;
  thickness: string;
  plank: string;
  blurb: string;
  source: string;
  specSheet: string;
  colors: DuralastColor[];
};

export const DURALAST_COLLECTIONS: DuralastCollection[] = [
  {
    slug: 'panzu',
    name: "Panzu",
    tier: "entry",
    wear: "12 mil, Quantum X finish",
    thickness: "4.7 mm overall (3.5 mm rigid core + 1.2 mm attached pad)",
    plank: "7″ × 48″",
    blurb: "Value-engineered SPC plank. Stylish yet budget-friendly, made for homes where value is the top priority.",
    source: 'https://duratousa.com/product/panzu/',
    specSheet: 'https://duratousa.com/wp-content/uploads/2024/07/FINAL_Panzu_SpecSheet_2026_ENGLISH.pdf',
    colors: [
      { name: "Amsterdam", sku: 'PANZU-04', slug: 'amsterdam', chip: '#453425' },
      { name: "Berlin", sku: 'PANZU-01', slug: 'berlin', chip: '#423b32' },
      { name: "Cancun", sku: 'PANZU-02', slug: 'cancun', chip: '#9e8969' },
      { name: "Copa", sku: 'PANZU-03', slug: 'copa', chip: '#706b64' },
      { name: "Dublin", sku: 'PANZU-06', slug: 'dublin', chip: '#464034' },
      { name: "Kyoto", sku: 'PANZU-15', slug: 'kyoto', chip: '#b9aa94' },
      { name: "Madrid", sku: 'PANZU-17', slug: 'madrid', chip: '#ad9f7e' },
      { name: "Oslo", sku: 'PANZU-16', slug: 'oslo', chip: '#d1c7bd' },
      { name: "Sicily", sku: 'PANZU-14', slug: 'sicily', chip: '#7a5b3e' },
      { name: "Sydney", sku: 'PANZU-08', slug: 'sydney', chip: '#605d55' },
      { name: "Tulum", sku: 'PANZU-07', slug: 'tulum', chip: '#6b614f' },
      { name: "Venice", sku: 'PANZU-05', slug: 'venice', chip: '#4b4a46' },
    ],
  },
  {
    slug: 'azul-tortuga',
    name: "Azul Tortuga",
    tier: "standard",
    wear: "20 mil, Quantum X finish",
    thickness: "5 mm overall (4 mm rigid core + 1 mm attached pad)",
    plank: "7.2″ × 48″",
    blurb: "A 20-mil Quantum X wear layer designed for maximum resilience without cutting corners on style. The plank most families pick.",
    source: 'https://duratousa.com/product/azul-tortuga/',
    specSheet: 'https://duratousa.com/wp-content/uploads/2024/07/FINAL_AzulTortuga_SpecSheet_2026_ENGLISH.pdf',
    colors: [
      { name: "Amelia", sku: 'AT-19', slug: 'amelia', chip: '#4d3727' },
      { name: "Antigua", sku: 'AT-05', slug: 'antigua', chip: '#aca696' },
      { name: "Biscayne", sku: 'AT-14', slug: 'biscayne', chip: '#977f5a' },
      { name: "Blue Sands", sku: 'AT-21', slug: 'blue-sands', chip: '#b3ab9b' },
      { name: "Brighton", sku: 'AT-16', slug: 'brighton', chip: '#302518' },
      { name: "Cannes", sku: 'AT-13', slug: 'cannes', chip: '#ac9b7e' },
      { name: "Captiva", sku: 'AT-27', slug: 'captiva', chip: '#b5a58f' },
      { name: "Galway", sku: 'AT-15', slug: 'galway', chip: '#a89a87' },
      { name: "Islamorada", sku: 'AT-18', slug: 'islamorada', chip: '#a78455' },
      { name: "Loredo", sku: 'AT-22', slug: 'loredo', chip: '#9c8a69' },
      { name: "Mancora", sku: 'AT-25', slug: 'mancora', chip: '#cfbe9b' },
      { name: "Mile High", sku: 'AT-02', slug: 'mile-high', chip: '#9a9389' },
      { name: "Myrtle Beach", sku: 'AT-17', slug: 'myrtle-beach', chip: '#a48d6f' },
      { name: "Oakwood", sku: 'AT-12', slug: 'oakwood', chip: '#998f7e' },
      { name: "Palomino", sku: 'AT-26', slug: 'palomino', chip: '#69502a' },
      { name: "Rehoboth", sku: 'AT-04', slug: 'rehoboth', chip: '#b7925f' },
      { name: "Santorini", sku: 'AT-24', slug: 'santorini', chip: '#131313' },
      { name: "Venice Beach", sku: 'AT-03', slug: 'venice-beach', chip: '#a39b96' },
      { name: "White Haven", sku: 'AT-20', slug: 'white-haven', chip: '#d5d3cb' },
      { name: "Wildwood Crest", sku: 'AT-07', slug: 'wildwood-crest', chip: '#756f65' },
    ],
  },
  {
    slug: 'v-evo-max',
    name: "V-EVO Max",
    tier: "premium",
    wear: "20 mil, Quantum X finish",
    thickness: "7 mm overall (6 mm rigid core + 1 mm attached pad)",
    plank: "7″ × 48″",
    blurb: "A thicker 6 mm rigid core under a 20-mil wear layer, with what Durato calls industry-leading scratch and dent protection.",
    source: 'https://duratousa.com/product/vevo-max/',
    specSheet: 'https://duratousa.com/wp-content/uploads/2024/07/FINAL_VevoMax_SpecSheet_2026_ENGLISH.pdf',
    colors: [
      { name: "Baymont", sku: 'VMD-03', slug: 'baymont', chip: '#98907a' },
      { name: "Blenheim", sku: 'VMD-05', slug: 'blenheim', chip: '#824e29' },
      { name: "Buckingham", sku: 'VMD-06', slug: 'buckingham', chip: '#3c2f24' },
      { name: "Cayan", sku: 'VMD-12', slug: 'cayan', chip: '#cbad94' },
      { name: "Dresden", sku: 'VMD-07', slug: 'dresden', chip: '#86633b' },
      { name: "Florence", sku: 'VMD-01', slug: 'florence', chip: '#837d73' },
      { name: "Gherkin", sku: 'VMD-09', slug: 'gherkin', chip: '#baa280' },
      { name: "Petronas", sku: 'VMD-11', slug: 'petronas', chip: '#8b7d72' },
      { name: "Savoye", sku: 'VMD-10', slug: 'savoye', chip: '#ae9772' },
      { name: "Sistine", sku: 'VMD-08', slug: 'sistine', chip: '#996d3e' },
      { name: "Wentworth", sku: 'VMD-04', slug: 'wentworth', chip: '#503e28' },
      { name: "Woolworth", sku: 'VMD-02', slug: 'woolworth', chip: '#594b3a' },
    ],
  },
  {
    slug: 'v-evo-xl',
    name: "V-EVO XL",
    tier: "premium",
    wear: "20 mil, Quantum X finish",
    thickness: "7 mm overall (6 mm rigid core + 1 mm attached pad)",
    plank: "8.97″ × 70.86″",
    blurb: "Extra-long, ultra-wide planks on the same 6 mm rigid core and 20-mil wear layer. Made for big open rooms.",
    source: 'https://duratousa.com/product/v-evo-xl/',
    specSheet: 'https://duratousa.com/wp-content/uploads/2024/07/FINAL_VevoXL_SpecSheet_2026_ENGLISH.pdf',
    colors: [
      { name: "Biscotti", sku: 'XL-01', slug: 'biscotti', chip: '#b7925f' },
      { name: "BonBon", sku: 'XL-08', slug: 'bonbon', chip: '#665e58' },
      { name: "Caramel", sku: 'XL-09', slug: 'caramel', chip: '#c9aa7f' },
      { name: "Maple", sku: 'XL-05', slug: 'maple', chip: '#8c6c4f' },
      { name: "Mocha", sku: 'XL-10', slug: 'mocha', chip: '#40301e' },
      { name: "Oat", sku: 'XL-02', slug: 'oat', chip: '#b59b74' },
      { name: "Oyster", sku: 'XL-04', slug: 'oyster', chip: '#978d82' },
      { name: "Porcini", sku: 'XL-06', slug: 'porcini', chip: '#cfb58d' },
      { name: "Sea Salt", sku: 'XL-03', slug: 'sea-salt', chip: '#c5bdae' },
      { name: "Truffle", sku: 'XL-07', slug: 'truffle', chip: '#53422a' },
    ],
  },
];

export const DEFAULT_COLLECTION = 'azul-tortuga';
export const DEFAULT_COLOR = 'white-haven';

export const duralastImg = (collection: string, color: string, kind: 'swatch' | 'room-md' | 'room-lg', ext: 'webp' | 'jpg') =>
  `/assets/duralast/${collection}/${color}-${kind}.${ext}?v=2`;
