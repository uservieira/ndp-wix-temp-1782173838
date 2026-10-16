import { NextRequest, NextResponse } from 'next/server';
import { leadSourceFrom, type Attribution } from '@/lib/leadSource';
import { sendOwnerAlert } from '@/lib/leadAlert';

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
        body: JSON.stringify({ properties: { firstname, lastname: rest.join(' '), phone, zip: b.zip || '', lifecyclestage: 'lead', hs_lead_status: 'NEW', ndp_lead_source: source, message } }),
      });
      if (!c.ok) return { ok: false, error: `hubspot_contact_${c.status}:${(await c.text()).slice(0, 160)}` };
      contactId = (await c.json()).id;
    }
    const d = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
      method: 'POST', headers: H,
      body: JSON.stringify({
        properties: { dealname: `${(b.name || 'Website lead').trim()} — ${b.scope || 'Flooring'} (website)`, pipeline: 'default', dealstage: 'appointmentscheduled', ndp_lead_source: source },
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
  if (b.company_website) return NextResponse.json({ ok: true }); // honeypot
  if (!b.name || !b.phone) return NextResponse.json({ ok: false, error: 'missing_required_fields' }, { status: 400 });
  const source = leadSourceFrom(b.attribution);
  const idem = `home-${(b.phone || '').replace(/\D/g, '')}-${new Date().toISOString().slice(0, 16)}`;
  const [hs, alert] = await Promise.allSettled([
    hubspot(b, source),
    sendOwnerAlert({ kind: 'Website quote', name: b.name, phone: b.phone, source, details: { Scope: b.scope, 'Sq ft': b.sqft, ZIP: b.zip, Notes: b.notes, Page: b.page }, idem }),
  ]);
  const results = { hubspot: hs.status === 'fulfilled' ? hs.value : { ok: false }, alert: alert.status === 'fulfilled' ? alert.value : { email: 'rejected', sms: 'rejected' } };
  console.log(JSON.stringify({ event: 'home_lead_submit', name: b.name, source, results }));
  return NextResponse.json({ ok: true, results });
}
