import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Email capture for the LVP10 pop-up. Upserts a HubSpot contact and emails the code.
// Both steps are best-effort: the visitor always gets the code on screen.

const PROMO_CODE = 'LVP10';
const PROMO_EXPIRES = '2026-12-31T23:59:59-05:00';

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);

async function upsertHubSpot(email: string, source: string) {
  const apiKey = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!apiKey) return { ok: false, error: 'hubspot_not_configured' };
  const headers = { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' };
  const properties = { email, lifecyclestage: 'lead', hs_lead_status: 'NEW', ndp_scope: 'promo-popup', ndp_promo_used: PROMO_CODE, message: `Requested ${PROMO_CODE} via pop-up on ${source}` };
  const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', { method: 'POST', headers, body: JSON.stringify({ properties }) });
  if (res.ok) return { ok: true };
  if (res.status === 409) {
    const s = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
      method: 'POST', headers,
      body: JSON.stringify({ filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: email }] }], limit: 1 }),
    });
    const id = s.ok ? (await s.json()).results?.[0]?.id : undefined;
    if (id) {
      await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${id}`, { method: 'PATCH', headers, body: JSON.stringify({ properties: { ndp_promo_used: PROMO_CODE } }) });
      return { ok: true };
    }
  }
  return { ok: false, error: `hubspot_${res.status}` };
}

async function sendCodeEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: 'resend_not_configured' };
  const from = process.env.RESEND_FROM || 'New Design Pro <quote@newdesignpro.com>';
  const html = `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto;color:#1B1814">
  <h1 style="font-size:26px;margin:0 0 12px">Your 10% off code is here.</h1>
  <p style="font-size:16px;line-height:1.6">Use <strong style="font-size:20px;color:#E8602C;letter-spacing:1px">${PROMO_CODE}</strong> on our quote form for 10% off any supplied LVP package.</p>
  <p style="font-size:14px;color:#6E665B">Good through Dec 31, 2026. One code per home.</p>
  <p><a href="https://www.newdesignpro.com/form" style="display:inline-block;background:#E8602C;color:#fff;padding:14px 22px;border-radius:999px;text-decoration:none;font-weight:bold">Get my price</a></p>
  <p style="font-size:14px;color:#6E665B">Prefer to talk? Call or text (561) 809-3864.<br>New Design Pro · Davenport, FL</p></div>`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [email], subject: `Your code: ${PROMO_CODE} for 10% off new floors`, html }),
  });
  return { ok: res.ok, error: res.ok ? undefined : `resend_${res.status}` };
}

export async function POST(req: NextRequest) {
  if (new Date() > new Date(PROMO_EXPIRES)) return NextResponse.json({ ok: false, error: 'expired' }, { status: 410 });
  let body: { email?: string; company_website?: string; source?: string } = {};
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 }); }
  if (body.company_website) return NextResponse.json({ ok: true, code: PROMO_CODE }); // honeypot
  const email = (body.email || '').trim().toLowerCase();
  if (!isEmail(email)) return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  const source = (body.source || '/').slice(0, 200);
  const [hs, mail] = await Promise.allSettled([upsertHubSpot(email, source), sendCodeEmail(email)]);
  return NextResponse.json({
    ok: true,
    code: PROMO_CODE,
    hubspot: hs.status === 'fulfilled' ? hs.value : { ok: false },
    email: mail.status === 'fulfilled' ? mail.value : { ok: false },
  });
}
