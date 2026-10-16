import { NextRequest, NextResponse } from 'next/server';
import { sendOwnerAlert } from '@/lib/leadAlert';

export const runtime = 'nodejs';

// ============================================================
// Callback form — phone capture after email quote
// Updates HubSpot contact with phone + notes, appends to sheet
// ============================================================

type CallbackBody = {
  name: string;
  phone: string;
  time: string;
  reference?: string;
  smsConsent?: boolean;
};

async function updateHubSpotContact(body: CallbackBody): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!apiKey) return { ok: false, error: 'hubspot_not_configured' };

  try {
    // If we can't find the contact, create a bare one
    await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: {
          firstname: body.name.split(' ')[0],
          lastname: body.name.split(' ').slice(1).join(' ') || '',
          phone: body.phone,
          lifecyclestage: 'lead',
          hs_lead_status: 'NEW',
          message: `Callback request${body.reference ? ' for quote ' + body.reference : ''}. Best time: ${body.time}.`,
        },
      }),
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' };
  }
}

async function appendCallbackSheet(body: CallbackBody): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) return { ok: false, error: 'sheet_not_configured' };
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        reference: body.reference || '',
        name: body.name,
        phone: body.phone,
        source: 'callback_form',
        callbackTime: body.time,
        smsConsent: body.smsConsent ? 'yes' : 'no',
      }),
    });
    return { ok: res.ok };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'unknown' };
  }
}

export async function POST(req: NextRequest) {
  let body: CallbackBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }
  if (!body.name || !body.phone) {
    return NextResponse.json({ ok: false, error: 'missing_required_fields' }, { status: 400 });
  }

  const [h, s] = await Promise.allSettled([
    updateHubSpotContact(body),
    appendCallbackSheet(body),
    sendOwnerAlert({
      kind: 'Callback request',
      name: body.name,
      phone: body.phone,
      details: { 'Best time': body.time, Ref: body.reference },
      idem: `callback-${body.reference || body.phone.replace(/\D/g, '')}-${body.time}`,
    }),
  ]);

  console.log(JSON.stringify({
    event: 'callback_form_submit',
    name: body.name,
    phone: body.phone,
    reference: body.reference,
    time: body.time,
    hubspot: h.status === 'fulfilled' ? h.value : { ok: false },
    sheet: s.status === 'fulfilled' ? s.value : { ok: false },
  }));

  return NextResponse.json({ ok: true });
}
