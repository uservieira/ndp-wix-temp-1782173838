// Owner lead alerts: email + text (Verizon email-to-text) for every website lead.
// Same channels as the Facebook lead poller. Best effort: never throws.
type Alert = {
  kind: string; // e.g. "Website quote", "Homepage quote", "Callback request", "LVP10 pop-up"
  name?: string;
  phone?: string;
  email?: string;
  source?: string;
  details?: Record<string, string | undefined>;
  idem: string; // idempotency key
};

function esc(s: string) {
  return s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c] as string));
}

async function send(key: string, payload: Record<string, unknown>, idem: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', 'Idempotency-Key': idem.slice(0, 250) },
    body: JSON.stringify(payload),
  });
  return res.ok ? 'ok' : `resend_${res.status}`;
}

export async function sendOwnerAlert(a: Alert): Promise<{ email: string; sms: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return { email: 'resend_not_configured', sms: 'resend_not_configured' };
  try {
    const from = process.env.RESEND_FROM || 'New Design Pro Leads <contact@newdesignpro.com>';
    const to = (process.env.LEAD_ALERT_EMAIL || 'newdesignproo@gmail.com').split(',').map((s) => s.trim()).filter(Boolean);
    const sms = (process.env.LEAD_ALERT_SMS_EMAIL || '5618093864@vtext.com').split(',').map((s) => s.trim()).filter(Boolean);
    const name = (a.name || 'Website lead').trim();
    const digits = (a.phone || '').replace(/\D/g, '');
    const when = new Date().toLocaleString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    const rows = Object.entries({ Phone: a.phone, Email: a.email, Source: a.source, ...(a.details || {}) })
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#6B6357;">${esc(k)}</td><td style="padding:6px 0;font-weight:600;">${esc(String(v))}</td></tr>`)
      .join('');
    const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#17140F;max-width:520px;">
  <div style="font-size:13px;color:#E85D2F;font-weight:700;text-transform:uppercase;letter-spacing:1px;">New ${esc(a.kind)} · ${esc(when)}</div>
  <div style="font-size:22px;font-weight:800;margin:6px 0 12px;">${esc(name)}</div>
  ${digits ? `<a href="tel:+${digits.length === 10 ? '1' + digits : digits}" style="display:inline-block;background:#E85D2F;color:#fff;padding:12px 22px;border-radius:10px;text-decoration:none;font-weight:700;">Call ${esc(a.phone || '')} now</a>` : ''}
  <table style="margin-top:16px;font-size:15px;border-collapse:collapse;">${rows}</table>
</div>`;
    const text = [`New ${a.kind} (${when})`, `Name: ${name}`, ...Object.entries({ Phone: a.phone, Email: a.email, Source: a.source, ...(a.details || {}) }).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`)].join('\n');
    const email = await send(key, { from, to, subject: `New ${a.kind}: ${name}${a.phone ? ' · ' + a.phone : ''}`, html, text }, `alert-email-${a.idem}`);
    const smsBody = [`${a.kind.toUpperCase()}: ${name}`, a.phone || a.email, a.details?.['Sq ft'], a.details?.Scope].filter(Boolean).join(' | ').slice(0, 155);
    const smsRes = sms.length ? await send(key, { from, to: sms, subject: 'NDP lead', text: smsBody }, `alert-sms-${a.idem}`) : 'skipped';
    return { email, sms: smsRes };
  } catch (e) {
    return { email: e instanceof Error ? e.message : 'alert_error', sms: 'alert_error' };
  }
}
