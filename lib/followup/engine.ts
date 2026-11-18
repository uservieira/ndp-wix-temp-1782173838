// Quote follow-up: three touches (day 2, 5 and 10) for quotes that are not signed yet.
//
// Source of truth: HubSpot deals in the "Quote Sent" stage of the NDP Jobs pipeline.
// Flag: QUOTE_FOLLOWUP = off (default, also when unset) | test | on.
//   test: the whole thing runs, but a message only leaves when the recipient is the owner's own
//         phone / the office inbox. Everyone else is counted as "would send" and nothing is written.
// It stops on its own when the deal leaves Quote Sent (signed or lost), when the customer uses the
// stop link, replies by text, texts STOP, or when someone ticks "NDP No Auto Follow-up" on the deal.
import { hs, type HsObject } from '@/lib/hubspot';
import { sendSms, toE164, flag, TEST_PHONE, TEST_EMAIL, type Flag } from '@/lib/sms';
import { email as buildEmail, smsBody, firstName, SMS_MARKER, stopPageUrl, stopApiUrl, TOUCH_DAY, type Touch } from './messages';

export const STAGE = 'contractsent'; // "Quote Sent"
export const PIPELINE = 'default'; // "NDP Jobs"
// Deals that entered Quote Sent before this date (Eastern) are never enrolled automatically.
// Older deals are enrolled by hand, one at a time, by setting "NDP Follow-up Start Date" on the deal.
export const ENROLL_FROM = '2026-11-18';
const GRACE_DAYS = 3; // a touch missed by more than this is dropped, not sent late
const MIN_GAP_MS = 20 * 3600 * 1000;

const DEAL_PROPS = ['dealname', 'dealstage', 'pipeline', 'hs_v2_date_entered_contractsent', 'ndp_no_auto_followup', 'ndp_followup_step', 'ndp_followup_last_sent', 'ndp_followup_status', 'ndp_followup_start'];
const CONTACT_PROPS = ['firstname', 'email', 'phone', 'mobilephone', 'company', 'ndp_sms_consent', 'hs_email_optout'];

// ---- Eastern-time helpers
export function etParts(d: Date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hourCycle: 'h23', weekday: 'short' }).formatToParts(d).map((x) => [x.type, x.value]));
  return { date: `${p.year}-${p.month}-${p.day}`, hour: Number(p.hour), weekday: p.weekday as string };
}
function dayDiff(fromDate: string, toDate: string) {
  return Math.round((Date.parse(`${toDate}T00:00:00Z`) - Date.parse(`${fromDate}T00:00:00Z`)) / 86400000);
}
// Customers are only contacted 9 am to 7 pm Eastern, Monday to Saturday.
export function inSendWindow(now: Date) {
  const { hour, weekday } = etParts(now);
  return weekday !== 'Sun' && hour >= 9 && hour < 19;
}

export function isBuildline(...values: Array<string | null | undefined>) {
  return values.some((v) => (v || '').toLowerCase().includes('buildline'));
}

type DealFull = HsObject & { associations?: { contacts?: { results?: Array<{ id: string }> } } };

export type Plan =
  | { action: 'skip'; reason: string }
  | { action: 'finish' }
  | { action: 'send'; touch: Touch; day: number; sms: string | null; email: string | null; first: string; contactId: string };

// Decides what (if anything) is due for one deal, from a fresh read of the deal and its contacts.
export function plan(deal: HsObject, contacts: HsObject[], now: Date): Plan {
  const p = deal.properties;
  if (p.dealstage !== STAGE) return { action: 'skip', reason: 'left_stage' };
  if (p.pipeline && p.pipeline !== PIPELINE) return { action: 'skip', reason: 'other_pipeline' };
  if (String(p.ndp_no_auto_followup).toLowerCase() === 'true') return { action: 'skip', reason: 'excluded_flag' };
  const status = (p.ndp_followup_status || '').toLowerCase();
  if (status.startsWith('stopped') || status.startsWith('finished')) return { action: 'skip', reason: 'stopped' };
  if (isBuildline(p.dealname, ...contacts.flatMap((c) => [c.properties.company, (c.properties.email || '').split('@')[1]]))) return { action: 'skip', reason: 'excluded_buildline' };

  const today = etParts(now).date;
  const manual = (p.ndp_followup_start || '').slice(0, 10);
  const entered = p.hs_v2_date_entered_contractsent ? etParts(new Date(p.hs_v2_date_entered_contractsent)).date : '';
  const start = /^\d{4}-\d{2}-\d{2}$/.test(manual) ? manual : entered && entered >= ENROLL_FROM ? entered : '';
  if (!start) return { action: 'skip', reason: 'not_enrolled' };

  const day = dayDiff(start, today);
  const step = Number(p.ndp_followup_step || 0) || 0;
  if (day > TOUCH_DAY[3] + GRACE_DAYS) return step > 0 || status ? { action: 'finish' } : { action: 'skip', reason: 'too_old' };
  const touch: Touch | 0 = day >= TOUCH_DAY[3] ? 3 : day >= TOUCH_DAY[2] ? 2 : day >= TOUCH_DAY[1] ? 1 : 0;
  if (!touch || step >= touch) return { action: 'skip', reason: 'not_due' };
  if (p.ndp_followup_last_sent && now.getTime() - Date.parse(p.ndp_followup_last_sent) < MIN_GAP_MS) return { action: 'skip', reason: 'not_due' };

  const c = contacts.find((x) => x.properties.email || x.properties.phone || x.properties.mobilephone);
  if (!c) return { action: 'skip', reason: 'no_contact' };
  const phone = toE164(c.properties.mobilephone || undefined) || toE164(c.properties.phone || undefined);
  const consent = (c.properties.ndp_sms_consent || '').toLowerCase() === 'yes';
  const addr = (c.properties.email || '').trim().toLowerCase();
  const optedOut = String(c.properties.hs_email_optout).toLowerCase() === 'true';
  // Text only with consent on file. Email whenever there is an address that has not opted out.
  // Phone-only contact with consent: text only. No consent: email only. Neither: nothing.
  const sms = phone && consent ? phone : null;
  const email = addr && !optedOut ? addr : null;
  if (!sms && !email) return { action: 'skip', reason: 'no_channel' };
  return { action: 'send', touch, day, sms, email, first: firstName(c.properties.firstname), contactId: c.id };
}

async function sendEmail(to: string, m: { subject: string; html: string; text: string }, dealId: string, idem?: string): Promise<string> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return 'resend_not_configured';
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...(idem ? { 'Idempotency-Key': idem } : {}) },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Daniel at New Design Pro <contact@newdesignpro.com>',
        to: [to],
        reply_to: process.env.OFFICE_EMAIL || 'contact@newdesignpro.com',
        subject: m.subject,
        html: m.html,
        text: m.text,
        headers: { 'List-Unsubscribe': `<${stopApiUrl(dealId)}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
      }),
    });
    return res.ok ? 'ok' : `resend_${res.status}`;
  } catch (e) {
    return e instanceof Error ? e.message : 'resend_error';
  }
}

export type RunResult = { ok: boolean; mode: Flag; note?: string; counts: Record<string, number> };

export async function runFollowups(now = new Date()): Promise<RunResult> {
  const mode = flag('QUOTE_FOLLOWUP');
  const counts: Record<string, number> = {};
  const bump = (k: string) => { counts[k] = (counts[k] || 0) + 1; };
  if (mode === 'off') return { ok: true, mode, note: 'flag_off', counts };
  if (!inSendWindow(now)) return { ok: true, mode, note: 'outside_send_window', counts };

  // 1. Candidates: deals in Quote Sent. (Search can lag, so every deal is re-read by ID below.)
  const ids: string[] = [];
  let after: string | undefined;
  for (let page = 0; page < 3; page++) {
    const r = await hs<{ results?: HsObject[]; paging?: { next?: { after?: string } } }>('POST', '/crm/v3/objects/deals/search', {
      filterGroups: [{ filters: [{ propertyName: 'dealstage', operator: 'EQ', value: STAGE }] }],
      properties: ['dealstage'],
      limit: 100,
      ...(after ? { after } : {}),
    });
    if (!r.ok) return { ok: false, mode, note: `hubspot_search_${r.status}`, counts };
    for (const d of r.data?.results || []) ids.push(d.id);
    after = r.data?.paging?.next?.after;
    if (!after) break;
  }

  for (const id of ids) {
    bump('scanned');
    try {
      // 2. Fresh read by ID right before deciding: stage, the no-follow-up box and the stop status.
      const d = await hs<DealFull>('GET', `/crm/v3/objects/deals/${id}?properties=${DEAL_PROPS.join(',')}&associations=contacts`);
      if (!d.ok || !d.data) { bump('error'); continue; }
      const contactIds = Array.from(new Set((d.data.associations?.contacts?.results || []).map((x) => x.id))).slice(0, 10);
      let contacts: HsObject[] = [];
      if (contactIds.length) {
        const c = await hs<{ results?: HsObject[] }>('POST', '/crm/v3/objects/contacts/batch/read', { properties: CONTACT_PROPS, inputs: contactIds.map((cid) => ({ id: cid })) });
        if (!c.ok) { bump('error'); continue; }
        const byId = new Map((c.data?.results || []).map((x) => [x.id, x]));
        contacts = contactIds.map((cid) => byId.get(cid)).filter(Boolean) as HsObject[];
      }
      const pl = plan(d.data, contacts, now);
      if (pl.action === 'skip') { bump(pl.reason); continue; }
      if (pl.action === 'finish') {
        if (mode === 'on') await hs('PATCH', `/crm/v3/objects/deals/${id}`, { properties: { ndp_followup_status: 'finished' } });
        bump('finished');
        continue;
      }

      // 3. Test mode: only the owner's own phone / the office inbox ever receive anything.
      const sms = mode === 'test' && pl.sms !== TEST_PHONE ? null : pl.sms;
      const email = mode === 'test' && pl.email !== TEST_EMAIL ? null : pl.email;
      if (mode === 'test') {
        if (pl.sms && !sms) bump('would_send_sms');
        if (pl.email && !email) bump('would_send_email');
      }
      if (!sms && !email) continue;

      // 4. Claim the touch first, so a retry or an overlapping run can never send it twice.
      const prevStep = d.data.properties.ndp_followup_step || '0';
      const claim = await hs('PATCH', `/crm/v3/objects/deals/${id}`, { properties: { ndp_followup_step: String(pl.touch), ndp_followup_last_sent: now.toISOString(), ndp_followup_status: 'active' } });
      if (!claim.ok) { bump('error'); continue; }

      const smsRes = sms ? await sendSms(sms, smsBody(pl.touch, pl.first), SMS_MARKER[pl.touch]) : 'none';
      const emailRes = email ? await sendEmail(email, buildEmail(pl.touch, pl.first, stopPageUrl(id)), id, `followup-${id}-${pl.touch}`) : 'none';
      if (smsRes === 'ok') bump('sent_sms');
      if (emailRes === 'ok') bump('sent_email');
      const delivered = smsRes === 'ok' || emailRes === 'ok' || smsRes === 'duplicate_skipped';
      if (!delivered) {
        // Nothing went out: release the claim so the next run tries again.
        await hs('PATCH', `/crm/v3/objects/deals/${id}`, { properties: { ndp_followup_step: prevStep, ndp_followup_last_sent: d.data.properties.ndp_followup_last_sent || '' } });
        bump('send_failed');
      } else if (pl.touch === 3) {
        await hs('PATCH', `/crm/v3/objects/deals/${id}`, { properties: { ndp_followup_status: 'finished' } });
      }
      console.log(JSON.stringify({ event: 'quote_followup', deal: id, touch: pl.touch, day: pl.day, sms: smsRes.slice(0, 60), email: emailRes, mode }));
    } catch (e) {
      bump('error');
      console.log(JSON.stringify({ event: 'quote_followup_error', deal: id, error: e instanceof Error ? e.message : 'unknown' }));
    }
  }
  return { ok: true, mode, counts };
}

// Sends one message's wording to the owner's own phone / the office inbox, for sign-off. Never to anyone else.
export async function preview(touch: Touch, channel: 'sms' | 'email' | 'both', now = new Date()): Promise<Record<string, string>> {
  if (flag('QUOTE_FOLLOWUP') === 'off') return { note: 'flag_off' };
  if (!inSendWindow(now)) return { note: 'outside_send_window' };
  const out: Record<string, string> = {};
  if (channel !== 'email') out.sms = await sendSms(TEST_PHONE, smsBody(touch, 'Daniel'));
  if (channel !== 'sms') out.email = await sendEmail(TEST_EMAIL, buildEmail(touch, 'Daniel', stopPageUrl('0')), '0');
  return out;
}

// ---- Stopping
export async function stopDeal(dealId: string, reason: 'stop link' | 'text reply' | 'opted out'): Promise<boolean> {
  const d = await hs<HsObject>('GET', `/crm/v3/objects/deals/${dealId}?properties=dealstage,ndp_followup_status`);
  if (!d.ok || !d.data) return false;
  if ((d.data.properties.ndp_followup_status || '').toLowerCase().startsWith('stopped')) return true;
  const r = await hs('PATCH', `/crm/v3/objects/deals/${dealId}`, { properties: { ndp_followup_status: `stopped: ${reason}` } });
  return r.ok;
}

// Stops the follow-up on every Quote Sent deal tied to these contacts. Returns how many were stopped.
export async function stopDealsForContacts(contactIds: string[], reason: 'text reply' | 'opted out'): Promise<number> {
  let n = 0;
  const seen = new Set<string>();
  for (const cid of contactIds.slice(0, 10)) {
    const a = await hs<{ results?: Array<{ toObjectId: number | string }> }>('GET', `/crm/v4/objects/contacts/${cid}/associations/deals?limit=100`);
    for (const x of a.data?.results || []) {
      const id = String(x.toObjectId);
      if (seen.has(id)) continue;
      seen.add(id);
      const d = await hs<HsObject>('GET', `/crm/v3/objects/deals/${id}?properties=dealstage,ndp_followup_status`);
      if (!d.ok || d.data?.properties.dealstage !== STAGE) continue;
      if ((d.data.properties.ndp_followup_status || '').toLowerCase().startsWith('stopped')) continue;
      const r = await hs('PATCH', `/crm/v3/objects/deals/${id}`, { properties: { ndp_followup_status: `stopped: ${reason}` } });
      if (r.ok) n++;
    }
  }
  return n;
}
