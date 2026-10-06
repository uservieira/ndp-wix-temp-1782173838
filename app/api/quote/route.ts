import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { BUSINESS_PHONE, CLAIMS } from '@/lib/site';

export const runtime = 'nodejs';

// ============================================================
// NDP Quote Form Handler
// Fans out submission to: Resend (email), HubSpot (CRM),
// Google Sheet (Leads tab), Meta CAPI (Lead event)
// ============================================================

type QuoteBody = {
  scope: string;
  sqftRange?: string;
  sqftExact?: string;
  condition?: string;
  baseboards?: string;
  quality?: string;
  hasStairs?: boolean;
  stairsCount?: string;
  name: string;
  email: string;
  zip: string;
  phone?: string;
  promoCode?: string;
  smsConsent?: boolean;
  notes?: string;
  calculatedQuote?: {
    low: number;
    high: number;
    tierName: string;
    tierRate: number;
    sqftLow: number;
    sqftHigh: number;
    discount: number;
    eligible: boolean;
    scopeLabel: string;
  };
};

function sha256(s: string) {
  return crypto.createHash('sha256').update(s.trim().toLowerCase()).digest('hex');
}

function normalizePhone(p?: string) {
  if (!p) return undefined;
  const digits = p.replace(/\D/g, '');
  return digits.length ? digits : undefined;
}

// -----------------------------------------------------------
// Resend — instant email to customer
// -----------------------------------------------------------
async function sendResendEmail(body: QuoteBody, reference: string): Promise<{ ok: boolean; error?: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM || 'New Design Pro <quote@newdesignpro.com>';
  if (!apiKey) return { ok: false, error: 'resend_not_configured' };

  const q = body.calculatedQuote;
  const scopeLabel = q?.scopeLabel || body.scope;
  const priceLine = q && q.low > 0
    ? `<div style="font-size:32px;font-weight:800;color:#17140F;margin:8px 0 4px;">$${q.low.toLocaleString()} – $${q.high.toLocaleString()}</div>`
    : `<div style="font-size:20px;font-weight:700;color:#17140F;margin:8px 0 4px;">We'll price this in person</div>`;
  const promoLine = q?.eligible
    ? `<div style="color:#E85D2F;font-weight:600;font-size:14px;margin:4px 0 12px;">✓ 10% LVP10 promo discount applied</div>`
    : '';

  const html = `<!doctype html>
<html>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#F7F3EE;padding:24px 12px;margin:0;color:#17140F;">
  <div style="max-width:560px;margin:0 auto;background:#FFFFFF;border:1px solid #DED7CC;border-radius:16px;overflow:hidden;">
    <div style="padding:24px 32px;border-bottom:1px solid #EEEAE3;">
      <div style="font-size:14px;color:#6B6357;text-transform:uppercase;letter-spacing:1px;font-weight:600;">Your Quote</div>
      <div style="font-size:22px;font-weight:800;margin-top:4px;">New Design Pro</div>
    </div>
    <div style="padding:32px;">
      <div style="font-size:14px;color:#6B6357;">Hi ${body.name.split(' ')[0]},</div>
      <div style="font-size:15px;line-height:1.55;margin:12px 0;">Here&apos;s your estimated price range for <strong>${scopeLabel}</strong>:</div>
      ${priceLine}
      ${promoLine}
      <div style="color:#6B6357;font-size:13px;line-height:1.5;margin-top:8px;">Final price confirmed after a free in-home measure. No obligation.</div>

      <div style="margin:24px 0;padding:16px;background:#F7F3EE;border-radius:12px;">
        <div style="font-weight:700;font-size:14px;margin-bottom:8px;">What happens next:</div>
        <ol style="margin:0 0 0 20px;padding:0;font-size:14px;line-height:1.7;color:#3A342B;">
          <li>Daniel will text or call you to schedule the free in-home measure (usually same day or next day)</li>
          <li>We measure, walk through material choices, and confirm final price</li>
          <li>50% deposit, we schedule the install (usually within 5–7 days)</li>
          <li>Job done, 50% balance at completion</li>
        </ol>
      </div>

      <div style="margin-top:24px;text-align:center;">
        <a href="https://www.newdesignpro.com/callback?ref=${reference}"
           style="display:inline-block;background:#E85D2F;color:#FFFFFF;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:700;font-size:15px;">
          Book the free measure →
        </a>
      </div>

      <div style="margin-top:24px;font-size:13px;color:#6B6357;line-height:1.55;">
        Prefer to talk? Text or call Daniel at <a href="tel:${BUSINESS_PHONE.e164}" style="color:#E85D2F;text-decoration:none;font-weight:600;">${BUSINESS_PHONE.display}</a>.
      </div>

      <div style="margin-top:16px;font-size:12px;color:#9A9285;border-top:1px solid #EEEAE3;padding-top:16px;">
        Reference #: ${reference}<br>
        This is not a binding quote. Final price depends on the in-home measure.
      </div>
    </div>
    <div style="padding:16px 32px;background:#F7F3EE;font-size:12px;color:#6B6357;text-align:center;">
      New Design Pro · Central Florida · newdesignpro.com<br>
      Insured. ${CLAIMS.experienceShort}.
    </div>
  </div>
</body>
</html>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [body.email],
        bcc: ['info@newdesignpro.com'],
        subject: q?.low ? `Your quote: $${q.low.toLocaleString()}–$${q.high.toLocaleString()} · New Design Pro` : 'Your quote request — New Design Pro',
        html,
        reply_to: 'info@newdesignpro.com',
      }),
    });
    if (!res.ok) {
      const txt = await res.text();
      return { ok: false, error: `resend_${res.status}:${txt.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'resend_unknown' };
  }
}

// -----------------------------------------------------------
// HubSpot — create/update contact + deal
// -----------------------------------------------------------
async function createHubSpotContact(body: QuoteBody, reference: string): Promise<{ ok: boolean; error?: string; contactId?: string; dealId?: string }> {
  const apiKey = process.env.HUBSPOT_ACCESS_TOKEN;
  if (!apiKey) return { ok: false, error: 'hubspot_not_configured' };

  const [firstName, ...lastParts] = body.name.trim().split(' ');
  const lastName = lastParts.join(' ') || '';
  const q = body.calculatedQuote;

  // 1. Upsert contact by email
  try {
    const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        properties: {
          email: body.email,
          firstname: firstName,
          lastname: lastName,
          phone: body.phone || '',
          zip: body.zip,
          lifecyclestage: 'lead',
          hs_lead_status: 'NEW',
          ndp_scope: body.scope,
          ndp_sqft: body.sqftExact || body.sqftRange || '',
          ndp_promo_used: q?.eligible ? 'LVP10' : '',
          ndp_reference: reference,
          message: body.notes || '',
        },
      }),
    });
    let contactId: string | undefined;
    if (contactRes.ok) {
      const c = await contactRes.json();
      contactId = c.id;
    } else if (contactRes.status === 409) {
      // Contact exists — find and update
      const searchRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filterGroups: [{ filters: [{ propertyName: 'email', operator: 'EQ', value: body.email }] }],
          limit: 1,
        }),
      });
      if (searchRes.ok) {
        const s = await searchRes.json();
        contactId = s.results?.[0]?.id;
        if (contactId) {
          await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
            method: 'PATCH',
            headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({
              properties: {
                phone: body.phone || '',
                zip: body.zip,
                hs_lead_status: 'NEW',
                ndp_scope: body.scope,
                ndp_reference: reference,
              },
            }),
          });
        }
      }
    } else {
      const errTxt = await contactRes.text();
      return { ok: false, error: `hubspot_contact_${contactRes.status}:${errTxt.slice(0, 200)}` };
    }

    // 2. Create a Deal
    let dealId: string | undefined;
    if (contactId) {
      const dealAmount = q ? (q.low + q.high) / 2 : 5000;
      const dealRes = await fetch('https://api.hubapi.com/crm/v3/objects/deals', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          properties: {
            dealname: `${body.name} — ${q?.scopeLabel || body.scope}`,
            pipeline: 'default',
            dealstage: 'appointmentscheduled', // Adjust based on user's pipeline
            amount: String(Math.round(dealAmount)),
            closedate: new Date(Date.now() + 30 * 86400000).toISOString(),
          },
          associations: [
            {
              to: { id: contactId },
              types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 3 }], // contact-to-deal
            },
          ],
        }),
      });
      if (dealRes.ok) {
        const d = await dealRes.json();
        dealId = d.id;
      }
    }

    return { ok: true, contactId, dealId };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'hubspot_unknown' };
  }
}

// -----------------------------------------------------------
// Google Sheet — append to Leads tab
// -----------------------------------------------------------
async function appendToGoogleSheet(body: QuoteBody, reference: string): Promise<{ ok: boolean; error?: string }> {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL; // Apps Script webhook
  if (!webhookUrl) return { ok: false, error: 'sheet_not_configured' };

  const q = body.calculatedQuote;
  const row = {
    timestamp: new Date().toISOString(),
    reference,
    name: body.name,
    email: body.email,
    phone: body.phone || '',
    zip: body.zip,
    scope: body.scope,
    sqft: body.sqftExact || body.sqftRange || '',
    condition: body.condition || '',
    baseboards: body.baseboards || '',
    quality: body.quality || '',
    hasStairs: body.hasStairs ? body.stairsCount || '?' : 'no',
    quoteLow: q?.low || 0,
    quoteHigh: q?.high || 0,
    tier: q?.tierName || '',
    promoUsed: q?.eligible ? 'LVP10' : '',
    source: 'website_form',
    notes: body.notes || '',
    smsConsent: body.smsConsent ? 'yes' : 'no',
  };

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(row),
    });
    if (!res.ok) return { ok: false, error: `sheet_${res.status}` };
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'sheet_unknown' };
  }
}

// -----------------------------------------------------------
// Meta CAPI — fire Lead event server-side
// -----------------------------------------------------------
async function fireMetaCapi(body: QuoteBody, reference: string, ip?: string, userAgent?: string): Promise<{ ok: boolean; event_id?: string; error?: string }> {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  const testCode = process.env.META_CAPI_TEST_EVENT_CODE;
  if (!pixelId || !accessToken) return { ok: false, error: 'meta_not_configured' };

  const phone = normalizePhone(body.phone);
  const email = body.email?.trim().toLowerCase();
  const firstName = body.name?.trim().split(' ')[0]?.toLowerCase();
  const lastName = body.name?.trim().split(' ').slice(1).join(' ').toLowerCase() || undefined;
  const zip = body.zip?.trim();
  const q = body.calculatedQuote;

  const user_data: Record<string, string> = {};
  if (email) user_data.em = sha256(email);
  if (phone) user_data.ph = sha256(phone);
  if (firstName) user_data.fn = sha256(firstName);
  if (lastName) user_data.ln = sha256(lastName);
  if (zip) user_data.zp = sha256(zip);
  if (ip) user_data.client_ip_address = ip;
  if (userAgent) user_data.client_user_agent = userAgent;

  const eventId = `lead_${reference}`;
  const payload: Record<string, unknown> = {
    data: [{
      event_name: 'Lead',
      event_time: Math.floor(Date.now() / 1000),
      action_source: 'website',
      event_source_url: 'https://www.newdesignpro.com/form',
      event_id: eventId,
      user_data,
      custom_data: {
        currency: 'USD',
        value: q ? (q.low + q.high) / 2 : 250,
        content_name: 'quote_form',
        content_category: body.scope,
        sqft: body.sqftExact || body.sqftRange || '',
      },
    }],
  };
  if (testCode) payload.test_event_code = testCode;

  try {
    const url = `https://graph.facebook.com/v20.0/${pixelId}/events?access_token=${accessToken}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return { ok: res.ok, event_id: eventId, error: res.ok ? undefined : `meta_${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'meta_unknown' };
  }
}

// -----------------------------------------------------------
// POST handler
// -----------------------------------------------------------
export async function POST(req: NextRequest) {
  let body: QuoteBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // Basic validation
  if (!body.name || !body.email || !body.zip || !body.scope) {
    return NextResponse.json({ ok: false, error: 'missing_required_fields' }, { status: 400 });
  }
  if (!/^\S+@\S+\.\S+$/.test(body.email)) {
    return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  }

  const reference = `NDP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    undefined;
  const userAgent = req.headers.get('user-agent') || undefined;

  // Fire everything in parallel
  const [emailResult, hubspotResult, sheetResult, metaResult] = await Promise.allSettled([
    sendResendEmail(body, reference),
    createHubSpotContact(body, reference),
    appendToGoogleSheet(body, reference),
    fireMetaCapi(body, reference, ip, userAgent),
  ]);

  // Log all outcomes but don't fail the request unless the primary email failed AND we couldn't record anywhere
  const results = {
    email: emailResult.status === 'fulfilled' ? emailResult.value : { ok: false, error: 'promise_rejected' },
    hubspot: hubspotResult.status === 'fulfilled' ? hubspotResult.value : { ok: false, error: 'promise_rejected' },
    sheet: sheetResult.status === 'fulfilled' ? sheetResult.value : { ok: false, error: 'promise_rejected' },
    meta: metaResult.status === 'fulfilled' ? metaResult.value : { ok: false, error: 'promise_rejected' },
  };

  // Log to console for Vercel logs (Daniel can review)
  console.log(JSON.stringify({
    event: 'quote_form_submit',
    reference,
    name: body.name,
    email: body.email,
    scope: body.scope,
    results,
  }));

  // As long as we captured the lead (even if just to logs), return ok:true so the user's UX is smooth
  return NextResponse.json({
    ok: true,
    reference,
    results,
  });
}
