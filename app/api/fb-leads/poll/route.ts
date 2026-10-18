import { NextRequest, NextResponse } from 'next/server';
import { emailSignature, textSignature } from '@/lib/emailSignature';
import { BUSINESS_PHONE } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// ============================================================
// Facebook Lead Ads -> instant alert to Daniel (email + text)
// Called every ~90s by .github/workflows/fb-lead-alerts.yml.
// Reads new Instant Form leads from the Graph API, then:
//   1. Emails the lead to LEAD_ALERT_EMAIL
//   2. Texts it via Verizon email-to-text (LEAD_ALERT_SMS_EMAIL)
//   3. Creates the contact in HubSpot
//   4. Sends the lead a branded welcome email from contact@newdesignpro.com
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

function prettySqft(v?: string) {
  if (!v) return '';
  const parts = v.split('_').map((p) => (/^\d+$/.test(p) ? Number(p).toLocaleString('en-US') : p.replace(/plus/i, '+')));
  const joined = parts.every((p) => /^[\d,]+$/.test(p)) ? parts.join('–') : parts.join(' ');
  return `about ${joined} sq ft`;
}

function prettyTimeline(v?: string) {
  if (!v) return '';
  if (/^asap$/i.test(v)) return 'as soon as possible';
  return v.replace(/_/g, ' ');
}

// Branded welcome email to the lead (same template as the website quote email, no price)
async function welcomeLead(lead: Lead, f: Record<string, string>) {
  const to = (f.email || '').trim();
  // Leads before this feature went live were handled by hand (e.g. Lisa, Oct 17)
  if (lead.created_time.replace(/\+0000$/, 'Z') < '2026-10-18T02:20:00Z') return 'skipped_pre_launch';
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return 'skipped';
  const first = esc(((f.full_name || '').trim().split(' ')[0]) || 'there');
  const scope = [prettySqft(f.sqft), prettyTimeline(f.timeline)].filter(Boolean).join(', ');
  const scopeHtml = scope ? ` for <strong>${esc(scope)}</strong>` : '';
  const office = process.env.OFFICE_EMAIL || 'contact@newdesignpro.com';
  const html = `<!doctype html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F7F3EE;padding:24px 12px;margin:0;color:#17140F;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #DED7CC;border-radius:16px;overflow:hidden;">
    <div style="padding:24px 32px;border-bottom:1px solid #EEEAE3;">
      <div style="font-size:14px;color:#6B6357;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your Flooring Request</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px;">New Design Pro</div>
    </div>
    <div style="padding:32px;">
      <div style="font-size:14px;color:#6B6357;">Hi ${first},</div>
      <div style="font-size:15px;line-height:1.55;margin:12px 0;">Thanks for reaching out about new floors. We got your request${scopeHtml}.</div>
      <div style="font-size:20px;font-weight:700;color:#17140F;margin:8px 0 4px;">Daniel will call or text you soon</div>
      <div style="color:#6B6357;font-size:13px;line-height:1.5;margin-top:8px;">Usually the same day, or the next morning if it&apos;s late. If you have photos of the space or any details (rooms, current flooring, timeline), just reply to this email. No pressure if not.</div>

      <div style="margin:24px 0;padding:16px;background:#F7F3EE;border-radius:12px;">
        <div style="font-weight:700;font-size:14px;margin-bottom:8px;">What happens next:</div>
        <ol style="margin:0 0 0 20px;padding:0;font-size:14px;line-height:1.7;color:#3A342B;">
          <li>Daniel reaches out to learn about your project</li>
          <li>We set up a free in-home measure and walk through material choices</li>
          <li>You get a final price, with no obligation</li>
          <li>We schedule your install (usually within 5–7 days)</li>
        </ol>
      </div>

      <div style="margin-top:24px;text-align:center;">
        <a href="https://www.newdesignpro.com/callback?ref=fb-${esc(lead.id.slice(-6))}"
           style="display:inline-block;background:#E85D2F;color:#FFFFFF;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">
          Book the free measure →
        </a>
      </div>

      <div style="margin-top:24px;font-size:13px;color:#6B6357;line-height:1.55;">
        Prefer to talk sooner? Text or call Daniel at <a href="tel:${BUSINESS_PHONE.e164}" style="color:#E85D2F;text-decoration:none;font-weight:600;">${BUSINESS_PHONE.display}</a>.
      </div>
      ${emailSignature("You're getting this because you requested a flooring quote through our Facebook ad.")}
    </div>
  </div>
</body>
</html>`;
  const text = [
    `Hi ${(f.full_name || '').trim().split(' ')[0] || 'there'},`,
    '',
    `Thanks for reaching out about new floors. We got your request${scope ? ' for ' + scope : ''}.`,
    '',
    "Daniel will call or text you soon, usually the same day, or the next morning if it's late.",
    'If you have photos of the space or any details, just reply to this email. No pressure if not.',
    '',
    'What happens next:',
    '1. Daniel reaches out to learn about your project',
    '2. We set up a free in-home measure and walk through material choices',
    '3. You get a final price, with no obligation',
    '4. We schedule your install (usually within 5-7 days)',
    '',
    `Book the free measure: https://www.newdesignpro.com/callback?ref=fb-${lead.id.slice(-6)}`,
    `Prefer to talk sooner? Text or call Daniel at ${BUSINESS_PHONE.display}.`,
    '',
    textSignature(),
    'Insured. Certificate of insurance available on request.',
  ].join('\n');
  const r = await resend('fblead-welcome', lead.id, {
    from: 'Daniel at New Design Pro <contact@newdesignpro.com>',
    to: [to],
    bcc: [office],
    reply_to: office,
    subject: 'We got your flooring request — New Design Pro',
    html,
    text,
  });
  return r.ok ? 'sent' : r.error;
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
    // Another integration (e.g. Zapier) may create the contact first without a name.
    // On 409, fill in name/phone/source on the existing contact instead of skipping.
    if (res.status === 409) {
      const body = await res.json().catch(() => ({} as { message?: string }));
      const existingId = String((body as { message?: string }).message || '').match(/Existing ID:\s*(\d+)/)?.[1];
      if (existingId) {
        const up = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${hsKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            properties: {
              firstname,
              lastname: rest.join(' '),
              ...(phone ? { phone } : {}),
              ndp_lead_source: 'meta_lead_ad',
            },
          }),
        });
        hub = up.ok ? 'updated' : `update_error_${up.status}`;
      }
    }
  }
  const welcome = await welcomeLead(lead, f);
  return { welcome, email: email.ok ? email.id || 'ok' : email.error, sms: text1.ok ? ('id' in text1 && text1.id) || 'ok' : (text1 as { error?: string }).error, hub };
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
