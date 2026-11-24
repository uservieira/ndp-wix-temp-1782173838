// Junk filter for the website forms: bots, out-of-area entries and sales pitches.
//
// A filtered entry is written to the filtered-entry log and nothing else happens: no owner email,
// no text, no HubSpot. Once a week a count-only summary goes to the office inbox (see
// app/api/leads/filter-digest). Real leads never pass through any of this.
//
// The log lives in Supabase (db/site_filtered_entries.sql) and needs three env values:
//   SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, LEAD_FILTER_LOG_TOKEN
// Until all three are set the filter stays as it was before: only the hidden-field check runs and
// each catch is emailed to the owner. If a log write ever fails, that entry is emailed the old way
// too, so an entry can never disappear without a record somewhere.
import { honeypot } from './hubspot';

export type FilterReason = 'hidden_field' | 'zip_outside_fl' | 'sales_pitch';

export const REASON_LABEL: Record<FilterReason, string> = {
  hidden_field: 'Hidden anti-bot field filled',
  zip_outside_fl: 'ZIP outside Florida',
  sales_pitch: 'Sales pitch in the notes',
};

// Florida ZIP codes start with 32, 33 or 34. A blank or incomplete ZIP is not a reason to filter.
export function zipOutsideFlorida(zip?: string): boolean {
  const d = (zip || '').replace(/\D/g, '');
  if (d.length !== 5 && d.length !== 9) return false;
  return !/^3[234]/.test(d);
}

// Funding, loan, SEO and marketing pitches. Keep in step with ndpJunkEntry() in public/homepage-interactive.js.
const PITCH: RegExp[] = [
  /backing of contractors/i,
  /\bfunding\b/i,
  /\bcapital\b/i,
  /\bseo\b/i,
  /\brank(?:ing)? your (?:web)?site\b/i,
  /\bsynergy\b/i,
  /\b(?:business|merchant|contractor|sba|equipment) loans?\b/i,
  /\bline of credit\b/i,
  /\bcash advance\b/i,
  /\b(?:digital|online|internet) marketing\b/i,
  /\bmarketing (?:agency|services?|company|campaigns?)\b/i,
  /\blead generation\b/i,
  /\bbacklinks?\b/i,
  /\b(?:first page|top) of google\b/i,
];
export function looksLikePitch(notes?: string): boolean {
  const n = (notes || '').trim();
  return n.length > 0 && PITCH.some((re) => re.test(n));
}

// Every reason that applies, strongest first. Empty = a real lead.
// The hidden field only counts when its value is not just a repeat of something typed in a real
// field (phone autofill does that to real people; see honeypot() in lib/hubspot.ts).
export function filterReasons(a: { hidden?: string; typed: Array<string | undefined>; zip?: string; notes?: string }): FilterReason[] {
  const out: FilterReason[] = [];
  if (honeypot(a.hidden, a.typed) === 'filtered') out.push('hidden_field');
  if (zipOutsideFlorida(a.zip)) out.push('zip_outside_fl');
  if (looksLikePitch(a.notes)) out.push('sales_pitch');
  return out;
}

// ---- Log store
function store() {
  const url = (process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '');
  const key = (process.env.SUPABASE_PUBLISHABLE_KEY || '').trim();
  const token = (process.env.LEAD_FILTER_LOG_TOKEN || '').trim();
  return /^https:\/\//.test(url) && key && token ? { url, key, token } : null;
}
export const filterLogReady = () => store() !== null;

async function rpc<T>(fn: string, args: Record<string, unknown>): Promise<{ ok: boolean; data: T | null }> {
  const s = store();
  if (!s) return { ok: false, data: null };
  try {
    const res = await fetch(`${s.url}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { apikey: s.key, Authorization: `Bearer ${s.key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_token: s.token, ...args }),
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { ok: false, data: null };
    return { ok: true, data: (await res.json()) as T };
  } catch {
    return { ok: false, data: null };
  }
}

const cut = (v: unknown, n: number) => (typeof v === 'string' && v ? v.slice(0, n) : undefined);

// Writes one filtered entry to the log. True only when the log confirms it was saved.
export async function logFiltered(form: string, reasons: FilterReason[], fields: Record<string, unknown>): Promise<boolean> {
  if (!reasons.length) return false;
  const entry: Record<string, unknown> = { reasons };
  for (const [k, v] of Object.entries(fields)) {
    const c = cut(v, k === 'notes' ? 2000 : 200);
    if (c) entry[k] = c;
  }
  const r = await rpc<boolean>('site_log_filtered_entry', { p_form: form, p_reason: reasons[0], p_entry: entry });
  return r.ok && r.data === true;
}

export type Digest = { claimed: boolean; already_ran?: boolean; total: number; by_reason: Partial<Record<FilterReason, number>>; since: string };

// Counts since the last summary. With claim=true it also reserves this week's summary, so only one can go out per week.
export async function filteredDigest(claim: boolean): Promise<Digest | null> {
  const r = await rpc<Digest | null>('site_filtered_digest', { p_claim: claim });
  return r.ok && r.data && typeof r.data.total === 'number' ? r.data : null;
}

// Gives this week's reservation back when the summary email could not be sent.
export async function releaseDigest(): Promise<boolean> {
  const r = await rpc<boolean>('site_release_filtered_digest', {});
  return r.ok && r.data === true;
}
