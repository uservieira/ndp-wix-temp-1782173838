import { NextRequest, NextResponse } from 'next/server';
import { leadSourceFrom, googleClickProps, type Attribution } from '@/lib/leadSource';
import { sendOwnerAlert } from '@/lib/leadAlert';
import { leadAutoText } from '@/lib/sms';
import { saveSmsConsent } from '@/lib/hubspot';
import { filterReasons, filterLogReady, logFiltered, REASON_LABEL } from '@/lib/leadFilter';

export const runtime = 'nodejs';

// Homepage / tile page quick quote form (name + phone, no email).
// Previously went only to Formspree. Now: HubSpot contact + New Lead deal (with NDP Lead Source) + owner alert.
type Body = {
  name?: string; phone?: string; scope?: string; sqft?: string; zip?: string; notes?: string;
  smsConsent?: boolean; page?: string; company_website?: string; attribution?: Attribution | null;
};

async function hubspot(b: Body, source: string) {
  const key = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!key) return { ok: false, error: 'hubspot_not_configured' };
  const H = { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
  const [firstname, ...rest] = (b.name || '').trim().split(' ');
  const phone = (b.phone || '').trim();
  const message = [`Website quick quote (${b.page || 'homepage'})`, `Scope: ${b.scope || 'n/a'}`, `Sq ft: ${b.sqft || 'n/a'}`, b.zip ? `ZIP: ${b.zip}` : '', b.notes ? `Notes: ${b.notes}` : '', `SMS consent: ${b.smsConsent ? 'yes' : 'no'}`].filter(Boolean).join('\n');
  try {
    let contactId: string | undefined;
    const digits = phone.replace(/\D/g, '');
    if (digits.length >= 10) {
      const s = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST', headers: H,
        body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: 'phone', operator: 'CONTAINS_TOKEN', value: `*${digits.slice(-10)}` }] }], limit: 1 }),
      });
      if (s.ok) contactId = (await s.json()).results?.[0]?.id;
    }
    if (contactId) {
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, { method: 'PATCH', headers: H, body: JSON.stringify({ properties: { hs_lead_status: 'NEW', message } }) });
    } else {
      const c = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
        method: 'POST', headers: H,
        body: JSON.stringify({ properties: { firstname, lastname: rest.join(' '), phone, zip: b.zip || '', lifecyclestage: 'lead', hs_lead_status: 'NEW', ndp_lead_source: source, ...googleClickProps(b.attribution), message } }),
      });
      if (!c.ok) return { ok: false, error: `hubspot_contact_${c.status}:${(await c.text()).slice(0, 160)}` };
      contactId = (await c.json()).id;
    }
    const d = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST', headers: H,
      body: JSON.stringify({
        properties: { dealname: `${(b.name || 'Website lead').trim()} — ${b.scope || 'Flooring'} (website)`, pipeline: 'default', dealstage: 'appointmentscheduled', ndp_lead_source: source, ...googleClickProps(b.attribution) },
        associations: [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }] }],
      }),
    });
    return { ok: d.ok, contactId, dealId: d.ok ? (await d.json()).id : undefined };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'hubspot_unknown' };
  }
}

export async function POST(req: NextRequest) {
  let b: Body = {};
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 }); }
  if (!b.name || !b.phone) return b.company_website ? NextResponse.json({ ok: true }) : NextResponse.json({ ok: false, error: 'missing_required_fields' }, { status: 400 });
  // Junk filter (lib/leadFilter.ts): hidden anti-bot field filled, ZIP outside Florida, or a sales pitch in the notes.
  // A caught entry is written to the filtered-entry log and nothing else happens. Until that log is set up,
  // only the hidden-field check runs and each catch is emailed to the owner, exactly as before.
  const logReady = filterLogReady();
  const reasons = filterReasons({ hidden: b.company_website, typed: [b.name, b.phone, b.zip], zip: logReady ? b.zip : undefined, notes: logReady ? b.notes : undefined });
  if (reasons.length) {
    const logged = logReady && (await logFiltered('home_form', reasons, { name: b.name, phone: b.phone, scope: b.scope, sqft: b.sqft, zip: b.zip, notes: b.notes, page: b.page, hidden: b.company_website }));
    // Not logged (log not set up, or the write failed): email it, so nothing disappears without a record.
    const alert = logged ? null : await sendOwnerAlert({ kind: 'Filtered form entry (possible bot)', name: b.name, phone: b.phone, details: { Scope: b.scope, 'Sq ft': b.sqft, ZIP: b.zip, Notes: b.notes, Page: b.page, 'Hidden field': b.company_website?.slice(0, 80), 'Filter reason': logReady ? reasons.map((r) => REASON_LABEL[r]).join(', ') : undefined, Note: 'The spam filter caught this one, so it was not added to HubSpot. If it looks like a real person, call them.' }, idem: `home-filtered-${(b.phone || '').replace(/\D/g, '')}`, emailOnly: true });
    console.log(JSON.stringify({ event: 'home_lead_filtered', reasons, logged, alert }));
    return NextResponse.json({ ok: true });
  }
  const source = leadSourceFrom(b.attribution);
  const idem = `home-${(b.phone || '').replace(/\D/g, '')}-${new Date().toISOString().slice(0, 16)}`;
  const [hs, auto, alert] = await Promise.allSettled([
    hubspot(b, source),
    leadAutoText(b.name, b.phone, !!b.smsConsent),
    sendOwnerAlert({ kind: 'Website quote', name: b.name, phone: b.phone, source, details: { Scope: b.scope, 'Sq ft': b.sqft, ZIP: b.zip, Notes: b.notes, Page: b.page }, idem }),
  ]);
  const results = { hubspot: hs.status === 'fulfilled' ? hs.value : { ok: false }, alert: alert.status === 'fulfilled' ? alert.value : { email: 'rejected', sms: 'rejected' }, autoText: auto.status === 'fulfilled' ? auto.value : 'rejected' };
  // Keep the SMS consent answer on the HubSpot contact (yes/no, when, which form). Best effort, never blocks the lead.
  const consentSaved = await saveSmsConsent({ contactId: (results.hubspot as { contactId?: string }).contactId, phone: b.phone, consent: !!b.smsConsent, source: 'home_form' });
  console.log(JSON.stringify({ event: 'home_lead_submit', name: b.name, source, results, consentSaved }));
  return NextResponse.json({ ok: true, results });
}
