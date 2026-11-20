// Small HubSpot helpers shared by the lead routes, the quote follow-up and the inbound text route.
// Everything here is best effort: a HubSpot hiccup must never break lead capture.

const API = 'https://api.hubapi.com';

export type HsObject = { id: string; properties: Record<string, string | null> };

export async function hs<T = unknown>(method: string, path: string, body?: unknown): Promise<{ ok: boolean; status: number; data: T | null }> {
  const key = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!key) return { ok: false, status: 0, data: null };
  try {
    const res = await fetch(API + path, {
      method,
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    let data: T | null = null;
    try { data = (await res.json()) as T; } catch { /* empty body */ }
    return { ok: res.ok, status: res.status, data };
  } catch {
    return { ok: false, status: 0, data: null };
  }
}

export function last10(phone?: string | null): string {
  const d = (phone || '').replace(/\D/g, '');
  return d.length >= 10 ? d.slice(-10) : '';
}

const CONTACT_PROPS = ['firstname', 'lastname', 'email', 'phone', 'mobilephone', 'company', 'ndp_sms_consent', 'ndp_sms_consent_source', 'hs_email_optout'];

// Contacts whose phone or mobile ends in these 10 digits.
export async function contactsByPhone(phone?: string | null): Promise<HsObject[]> {
  return (await searchByPhone(phone)) || [];
}

// Same search, but null when HubSpot could not be asked (so a caller can tell "nobody" from "don't know").
async function searchByPhone(phone?: string | null): Promise<HsObject[] | null> {
  const d = last10(phone);
  if (!d) return [];
  const r = await hs<{ results?: HsObject[] }>('POST', '/crm/v3/objects/contacts/search', {
    // HubSpot's digits-only copies come first: a plain search on `phone` misses numbers saved with
    // punctuation, like "(318) 578-1262", which is how most form leads are stored.
    filterGroups: [
      { filters: [{ propertyName: 'hs_searchable_calculated_phone_number', operator: 'CONTAINS_TOKEN', value: `*${d}` }] },
      { filters: [{ propertyName: 'hs_searchable_calculated_mobile_number', operator: 'CONTAINS_TOKEN', value: `*${d}` }] },
      { filters: [{ propertyName: 'phone', operator: 'CONTAINS_TOKEN', value: `*${d}` }] },
      { filters: [{ propertyName: 'mobilephone', operator: 'CONTAINS_TOKEN', value: `*${d}` }] },
    ],
    properties: CONTACT_PROPS,
    limit: 10,
  });
  if (!r.ok) return null;
  return (r.data?.results || []).filter((c) => last10(c.properties.phone) === d || last10(c.properties.mobilephone) === d);
}

// Reads by email with no search-index delay (works the moment a contact exists).
export async function contactByEmail(email: string): Promise<HsObject | null> {
  const r = await hs<HsObject>('GET', `/crm/v3/objects/contacts/${encodeURIComponent(email.trim().toLowerCase())}?idProperty=email&properties=${CONTACT_PROPS.join(',')}`);
  return r.ok && r.data?.id ? r.data : null;
}

// ---- Opt-outs. A person is opted out when HubSpot shows either of these on any of their contact records:
//   1. "Unsubscribed from all email" (hs_email_optout), or
//   2. a note on the record that says OPTED OUT (how the office records a STOP reply to an email).
// The automatic messages (instant text, missed-call text, quote follow-ups) skip them on every channel.
// 'unknown' means HubSpot could not be read; callers treat that as "do not send".
export type OptOut = 'yes' | 'no' | 'unknown';
const OPT_OUT_NOTE = /opted[\s-]*out/i;

export function unsubscribed(c: HsObject): boolean {
  return String(c.properties.hs_email_optout).toLowerCase() === 'true';
}

// Looks for an OPTED OUT note on these contact records.
export async function optOutNote(contactIds: string[]): Promise<OptOut> {
  for (const cid of contactIds.slice(0, 10)) {
    const a = await hs<{ results?: Array<{ toObjectId: number | string }> }>('GET', `/crm/v4/objects/contacts/${cid}/associations/notes?limit=500`);
    if (!a.ok) return 'unknown';
    const noteIds = (a.data?.results || []).map((x) => String(x.toObjectId));
    for (let i = 0; i < noteIds.length; i += 100) {
      const n = await hs<{ results?: HsObject[] }>('POST', '/crm/v3/objects/notes/batch/read', { properties: ['hs_note_body'], inputs: noteIds.slice(i, i + 100).map((id) => ({ id })) });
      if (!n.ok) return 'unknown';
      if ((n.data?.results || []).some((x) => OPT_OUT_NOTE.test((x.properties.hs_note_body || '').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ')))) return 'yes';
    }
  }
  return 'no';
}

// Checks a person by phone and/or email before an automatic text. `stopText` also counts a STOP reply by text.
export async function isOptedOut(a: { phone?: string | null; email?: string | null; stopText?: boolean }): Promise<OptOut> {
  return Promise.race([checkOptOut(a), new Promise<OptOut>((r) => setTimeout(() => r('unknown'), 6000))]);
}

async function checkOptOut(a: { phone?: string | null; email?: string | null; stopText?: boolean }): Promise<OptOut> {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) return 'unknown';
    const found = new Map<string, HsObject>();
    const byPhone = await searchByPhone(a.phone);
    if (byPhone === null) return 'unknown';
    for (const c of byPhone) found.set(c.id, c);
    const addr = (a.email || '').trim().toLowerCase();
    if (addr) {
      const r = await hs<HsObject>('GET', `/crm/v3/objects/contacts/${encodeURIComponent(addr)}?idProperty=email&properties=${CONTACT_PROPS.join(',')}`);
      if (r.ok && r.data?.id) found.set(r.data.id, r.data);
      else if (r.status !== 404) return 'unknown';
    }
    const list = Array.from(found.values());
    if (!list.length) return 'no'; // brand-new person, nothing on file
    if (list.some(unsubscribed)) return 'yes';
    if (a.stopText && list.some((c) => c.properties.ndp_sms_consent === 'no' && c.properties.ndp_sms_consent_source === 'text_stop')) return 'yes';
    return optOutNote(list.map((c) => c.id));
  } catch {
    return 'unknown';
  }
}

export type ConsentSource = 'quote_form' | 'callback_form' | 'home_form' | 'text_stop' | 'text_start';

// Records the SMS consent answer on the HubSpot contact (ndp_sms_consent yes/no, when, and which form).
// - "yes" is always written.
// - "no" from an unticked form box is written only when nothing is on file, so it never erases an earlier yes.
// - "no" from a STOP text always wins.
// Writes to the contact we were handed plus any other contact with the same phone (the callback form
// creates a second, phone-only contact for someone who already has a quote contact).
export async function saveSmsConsent(a: { contactId?: string; phone?: string; consent: boolean; source: ConsentSource }): Promise<string> {
  // Capped at 5 seconds so a slow HubSpot can never hold up the form's reply to the visitor.
  return Promise.race([saveConsent(a), new Promise<string>((r) => setTimeout(() => r('consent_timeout'), 5000))]);
}

async function saveConsent(a: { contactId?: string; phone?: string; consent: boolean; source: ConsentSource }): Promise<string> {
  try {
    if (!process.env.HUBSPOT_ACCESS_TOKEN) return 'hubspot_not_configured';
    const ids = new Map<string, string | null>(); // id -> current value (null = unknown / empty)
    for (const c of await contactsByPhone(a.phone)) ids.set(c.id, c.properties.ndp_sms_consent || null);
    if (a.contactId && !ids.has(a.contactId)) {
      const r = await hs<HsObject>('GET', `/crm/v3/objects/contacts/${a.contactId}?properties=ndp_sms_consent`);
      ids.set(a.contactId, r.data?.properties?.ndp_sms_consent || null);
    }
    if (!ids.size) return 'no_contact';
    const force = a.consent || a.source === 'text_stop';
    const now = new Date().toISOString();
    let saved = 0;
    for (const [id, current] of Array.from(ids.entries())) {
      if (!force && current) continue;
      const r = await hs('PATCH', `/crm/v3/objects/contacts/${id}`, {
        properties: { ndp_sms_consent: a.consent ? 'yes' : 'no', ndp_sms_consent_at: now, ndp_sms_consent_source: a.source },
      });
      if (r.ok) saved++;
    }
    return `saved_${saved}`;
  } catch (e) {
    return e instanceof Error ? e.message : 'consent_error';
  }
}

// A hidden form field ("honeypot") catches bots, but phone autofill sometimes fills it for real people.
// 'human'  : empty, or it only repeats something the person typed in a real field (autofill).
// 'filtered': looks like a bot. The caller still emails the owner so nothing disappears silently.
export function honeypot(value: string | undefined, typed: Array<string | undefined>): 'human' | 'filtered' {
  const v = (value || '').trim().toLowerCase();
  if (!v) return 'human';
  const vd = v.replace(/\D/g, '');
  for (const t of typed) {
    const s = (t || '').trim().toLowerCase();
    if (!s) continue;
    if (s === v || (v.length >= 3 && s.includes(v)) || (s.length >= 3 && v.includes(s))) return 'human';
    const sd = s.replace(/\D/g, '');
    if (vd.length >= 7 && sd.length >= 7 && (sd.endsWith(vd) || vd.endsWith(sd))) return 'human';
  }
  return 'filtered';
}
