import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ============================================================
// Facebook Lead Ads -> instant alert to Daniel (email + text)
// Called every ~90s by .github/workflows/fb-lead-alerts.yml.
// Reads new Instant Form leads from the Graph API, then:
//   1. Emails the lead to LEAD_ALERT_EMAIL
//   2. Texts it via Verizon email-to-text (LEAD_ALERT_SMS_EMAIL)
//   3. Creates the contact in HubSpot
// Resend Idempotency-Key per lead stops duplicate alerts across polls.
// Response never contains lead details (the poller's logs are public).
// ============================================================

const GRAPH = 'https://graph.facebook.com/v25.0';

type Field = { name: string; values: string[] };
type Lead = {
  id: string;
  created_time: string;
  field_data?: Field[];
  ad_name?: string;
  form_id?: string;
  is_organic?: boolean;
};

const LABELS: Record<string, string> = {
  full_name: 'Name',
  phone_number: 'Phone',
  email: 'Email',
  sqft: 'Sq ft',
  timeline: 'Timeline',
  zip: 'ZIP',
};

function fields(lead: Lead) {
  const out: Record<string, string> = {};
  for (const f of lead.field_data || []) out[f.name] = (f.values || []).join(', ');
  return out;
}

function etTime(iso: string) {
  try {
    return new Date(iso.replace(/\+0000$/, 'Z')).toLocaleString('en-US', {
      timeZone: 'America/New_York',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}

async function resend(key: string, idem: string, payload: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, error: 'resend_not_configured' };
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Idempotency-Key': `${key}-${idem}`,
    },
    body: JSON.stringify(payload),
  });
  const body = await res.text();
  let id: string | undefined;
  try {
    id = JSON.parse(body).id;
  } catch {}
  return res.ok ? { ok: true, id } : { ok: false, error: `resend_${res.status}:${body.slice(0, 120)}` };
}

async function alertLead(lead: Lead) {
  const f = fields(lead);
  const name = f.full_name || 'Facebook lead';
  const phone = f.phone_number || '';
  const digits = phone.replace(/\D/g, '');
  const when = etTime(lead.created_time);
  const from = process.env.RESEND_FROM || 'New Design Pro Leads <contact@newdesignpro.com>';
  const to = (process.env.LEAD_ALERT_EMAIL || 'newdesignproo@gmail.com').split(',').map((s) => s.trim());
  const sms = (process.env.LEAD_ALERT_SMS_EMAIL || '5618093864@vtext.com').split(',').map((s) => s.trim()).filter(Boolean);

  const rows = Object.entries(f)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6B6357;">${esc(LABELS[k] || k)}</td><td style="padding:6px 0;font-weight:600;">${esc(v)}</td></tr>`)
    .join('');
  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#17140F;max-width:520px;">
  <div style="font-size:13px;color:#E85D2F;font-weight:700;text-transform:uppercase;letter-spacing:1px;">New Facebook lead · ${esc(when)}</div>
  <div style="font-size:22px;font-weight:800;margin:6px 0 12px;">${esc(name)}</div>
  ${digits ? `<a href="tel:+${digits.length === 10 ? '1' + digits : digits}" style="display:inline-block;background:#E85D2F;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700;">Call ${esc(phone)} now</a>` : ''}
  <table style="margin-top:16px;font-size:15px;border-collapse:collapse;">${rows}</table>
  <div style="margin-top:14px;font-size:12px;color:#9A9285;">Ad: ${esc(lead.ad_name || (lead.is_organic ? 'organic' : 'n/a'))} · Lead ID ${esc(lead.id)}</div>
</div>`;
  const text = [`New Facebook lead (${when})`, ...Object.entries(f).map(([k, v]) => `${LABELS[k] || k}: ${v}`), `Ad: ${lead.ad_name || 'n/a'}`].join('\n');

  const email = await resend('fblead-email', lead.id, {
    from,
    to,
    subject: `New Facebook lead: ${name}${phone ? ' · ' + phone : ''}`,
    html,
    text,
  });

  // Short text for the phone (Verizon email-to-text, keep under 160 chars)
  const smsBody = [`FB LEAD: ${name}`, phone, f.sqft, f.timeline].filter(Boolean).join(' | ').slice(0, 155);
  const text1 = sms.length
    ? await resend('fblead-sms', lead.id, { from, to: sms, subject: 'NDP lead', text: smsBody })
    : { ok: true };

  // HubSpot contact (best effort; duplicates return 409 and are ignored)
  let hub = 'skipped';
  const hsKey = process.env.HUBSPOT_ACCESS_TOKEN;
  if (hsKey && (f.email || phone)) {
    const [firstname, ...rest] = name.trim().split(' ');
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${hsKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: {
          email: f.email || undefined,
          firstname,
          lastname: rest.join(' '),
          phone,
          lifecyclestage: 'lead',
          hs_lead_status: 'NEW',
          ndp_lead_source: 'meta_lead_ad',
          message: `Facebook lead ad (${lead.ad_name || 'n/a'})\n${text}`,
        },
      }),
    });
    hub = res.ok ? 'created' : res.status === 409 ? 'exists' : `error_${res.status}`;
  }
  return { email: email.ok ? email.id || 'ok' : email.error, sms: text1.ok ? ('id' in text1 && text1.id) || 'ok' : (text1 as { error?: string }).error, hub };
}

export async function GET(req: NextRequest) {
  const secret = process.env.FB_POLL_SECRET;
  if (!secret || req.headers.get('x-poll-secret') !== secret) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const token = process.env.META_PAGE_TOKEN;
  const forms = (process.env.FB_LEAD_FORM_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
  if (!token || !forms.length) return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 500 });

  const lookback = Math.min(Number(req.nextUrl.searchParams.get('lookback')) || 900, 86400);
  const since = Math.floor(Date.now() / 1000) - lookback;
  const results: Array<Record<string, unknown>> = [];
  const errors: string[] = [];

  for (const form of forms) {
    const filtering = JSON.stringify([{ field: 'time_created', operator: 'GREATER_THAN', value: since }]);
    const url = `${GRAPH}/${form}/leads?fields=id,created_time,field_data,ad_name,form_id,is_organic&limit=50&filtering=${encodeURIComponent(filtering)}&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url, { cache: 'no-store' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      errors.push(`form_${form}:${data?.error?.code || res.status}`);
      continue;
    }
    for (const lead of (data.data || []) as Lead[]) {
      results.push({ lead: lead.id.slice(-4), ...(await alertLead(lead)) });
    }
  }

  // If Facebook access breaks, warn Daniel once per day
  if (errors.length) {
    const day = new Date().toISOString().slice(0, 10);
    await resend('fblead-health', day, {
      from: process.env.RESEND_FROM || 'New Design Pro Leads <contact@newdesignpro.com>',
      to: (process.env.LEAD_ALERT_EMAIL || 'newdesignproo@gmail.com').split(','),
      subject: 'Action needed: Facebook lead alerts stopped',
      text: `The Facebook lead alert check failed (${errors.join(', ')}). Check Leads Center in Meta Business Suite for new leads and ask Nico to reconnect the alerts.`,
    });
  }

  return NextResponse.json({ ok: errors.length === 0, checked: forms.length, alerted: results.length, results, errors });
}
