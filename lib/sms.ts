// Twilio SMS (A2P 10DLC messaging service). Best effort: never throws.
// Env: TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, TWILIO_MESSAGING_SERVICE_SID
//      LEAD_ALERT_SMS_TO (owner phone, default +15618093864)
//      LEAD_AUTOTEXT=on  (turns on the instant text to leads who gave SMS consent)

const API = 'https://api.twilio.com/2010-04-01';

function cfg() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const key = process.env.TWILIO_API_KEY || sid;
  const secret = process.env.TWILIO_API_SECRET || process.env.TWILIO_AUTH_TOKEN;
  const svc = process.env.TWILIO_MESSAGING_SERVICE_SID;
  if (!sid || !key || !secret || !svc) return null;
  return { sid, svc, auth: 'Basic ' + Buffer.from(`${key}:${secret}`).toString('base64') };
}

export function toE164(phone?: string): string | null {
  const d = (phone || '').replace(/\D/g, '');
  if (d.length === 10) return `+1${d}`;
  if (d.length === 11 && d.startsWith('1')) return `+${d}`;
  return null;
}

// Skips the send if a message to this number containing `marker` already went out in the last ~2 days
// (the Facebook poller can see the same lead more than once).
export async function sendSms(toPhone: string | undefined, body: string, marker?: string): Promise<string> {
  const c = cfg();
  if (!c) return 'twilio_not_configured';
  const to = toE164(toPhone);
  if (!to) return 'bad_phone';
  try {
    if (marker) {
      const since = new Date(Date.now() - 2 * 86400000).toISOString().slice(0, 10);
      const q = new URLSearchParams({ To: to, 'DateSent>': since, PageSize: '50' });
      const r = await fetch(`${API}/Accounts/${c.sid}/Messages.json?${q}`, { headers: { Authorization: c.auth }, cache: 'no-store' });
      if (r.ok) {
        const j = (await r.json()) as { messages?: Array<{ body?: string }> };
        if ((j.messages || []).some((m) => (m.body || '').includes(marker))) return 'duplicate_skipped';
      }
    }
    const res = await fetch(`${API}/Accounts/${c.sid}/Messages.json`, {
      method: 'POST',
      headers: { Authorization: c.auth, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ To: to, MessagingServiceSid: c.svc, Body: body }),
    });
    if (res.ok) return 'ok';
    const t = await res.text();
    return `twilio_${res.status}:${t.slice(0, 120)}`;
  } catch (e) {
    return e instanceof Error ? e.message : 'twilio_error';
  }
}

export function ownerPhone() {
  return process.env.LEAD_ALERT_SMS_TO || '+15618093864';
}

// Instant text to the lead. Only when they opted in and LEAD_AUTOTEXT=on.
export async function leadAutoText(name: string | undefined, phone: string | undefined, consent: boolean): Promise<string> {
  if (!consent) return 'no_consent';
  if (process.env.LEAD_AUTOTEXT !== 'on') return 'autotext_off';
  const first = (name || '').trim().split(/\s+/)[0];
  const body = `Hi${first ? ' ' + first : ''}, this is New Design Pro. We got your flooring request and will call you shortly to set up your free in-home measure. Reply STOP to opt out.`;
  return sendSms(phone, body, 'We got your flooring request');
}
