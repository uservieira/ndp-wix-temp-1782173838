import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'nodejs';

// Server-side Meta Conversions API (CAPI) forwarder.
// Fires a "Lead" event to Meta so iOS-17+/ad-blocked users are still tracked.
// Dormant until META_PIXEL_ID + META_CAPI_ACCESS_TOKEN env vars are set on Vercel.

type LeadPayload = {
  name?: string;
  phone?: string;
  email?: string;
  scope?: string;
  sqft?: string;
  zip?: string;
  fbp?: string; // Facebook browser cookie
  fbc?: string; // Facebook click ID cookie
  event_source_url?: string;
};

function sha256(s: string) {
  return crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');
}

function normalizePhone(p?: string) {
  if (!p) return undefined;
  const digits = p.replace(/\D/g, '');
  return digits.length ? digits : undefined;
}

export async function POST(req: NextRequest) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE; // optional, for Events Manager Test Events

  // If not configured yet, ack silently (no-op) so the front-end never breaks.
  if (!pixelId || !accessToken) {
    return NextResponse.json({ ok: true, mode: 'no-op' }, { status: 200 });
  }

  let body: LeadPayload = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    undefined;
  const userAgent = req.headers.get('user-agent') || undefined;

  const phone = normalizePhone(body.phone);
  const email = body.email?.trim().toLowerCase();
  const firstName = body.name?.trim().split(' ')[0]?.toLowerCase();
  const lastName = body.name?.trim().split(' ').slice(1).join(' ').toLowerCase() || undefined;
  const zip = body.zip?.trim();

  const user_data: Record<string, string | string[]> = {};
  if (email) user_data.em = sha256(email);
  if (phone) user_data.ph = sha256(phone);
  if (firstName) user_data.fn = sha256(firstName);
  if (lastName) user_data.ln = sha256(lastName);
  if (zip) user_data.zp = sha256(zip);
  if (ip) user_data.client_ip_address = ip;
  if (userAgent) user_data.client_user_agent = userAgent;
  if (body.fbp) user_data.fbp = body.fbp;
  if (body.fbc) user_data.fbc = body.fbc;

  const eventId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        action_source: 'website',
        event_source_url: body.event_source_url || 'https://www.newdesignpro.com/',
        event_id: eventId, // for dedup with the browser Pixel event
        user_data,
        custom_data: {
          currency: 'USD',
          value: 300,
          content_name: 'quote_form',
          content_category: body.scope || '',
          sqft: body.sqft || '',
        },
      },
    ],
  };
  if (testCode) payload.test_event_code = testCode;

  const url = `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`;

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json({ ok: res.ok, event_id: eventId, meta: data }, { status: res.ok ? 200 : 502 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
