// Twilio SMS (A2P 10DLC messaging service). Best effort: never throws.
// Env: TWILIO_ACCOUNT_SID, TWILIO_API_KEY, TWILIO_API_SECRET, TWILIO_MESSAGING_SERVICE_SID
//      LEAD_ALERT_SMS_TO (owner phone, default +15618093864)
//      LEAD_AUTOTEXT=on  (turns on the instant text to leads who gave SMS consent)
//      MISSED_CALL_TEXT=off|test|on  (text-back after a missed print-line call; unset = off)

import { isOptedOut } from './hubspot';

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
// Skipped for anyone HubSpot shows as opted out (unsubscribed, or an OPTED OUT note), and when that cannot be checked.
export async function leadAutoText(name: string | undefined, phone: string | undefined, consent: boolean, email?: string): Promise<string> {
  if (!consent) return 'no_consent';
  if (process.env.LEAD_AUTOTEXT !== 'on') return 'autotext_off';
  if (!toE164(phone)) return 'bad_phone';
  const out = await isOptedOut({ phone, email });
  if (out !== 'no') return out === 'yes' ? 'opted_out' : 'optout_check_failed';
  const first = (name || '').trim().split(/\s+/)[0];
  const body = `Hi${first ? ' ' + first : ''}, this is New Design Pro. We got your flooring request and will call you to set up your free in-home measure. Reply STOP to opt out.`;
  return sendSms(phone, body, 'We got your flooring request');
}

// ---- Twilio lookups. Used to confirm a webhook really came from Twilio (we hold an API key, not the auth token):
// the SID in the request must exist in our account, be recent, and we only trust the fields Twilio returns.
export type TwilioMessage = { sid: string; from: string; to: string; body: string; direction: string; date_created: string };
export async function fetchTwilioMessage(sid: string): Promise<TwilioMessage | null> {
  const c = cfg();
  if (!c || !/^(SM|MM)[0-9a-f]{32}$/i.test(sid)) return null;
  try {
    const r = await fetch(`${API}/Accounts/${c.sid}/Messages/${sid}.json`, { headers: { Authorization: c.auth }, cache: 'no-store' });
    return r.ok ? ((await r.json()) as TwilioMessage) : null;
  } catch {
    return null;
  }
}

export type TwilioCall = { sid: string; from: string; to: string; direction: string; start_time: string | null; date_created: string };
export async function fetchTwilioCall(sid: string): Promise<TwilioCall | null> {
  const c = cfg();
  if (!c || !/^CA[0-9a-f]{32}$/i.test(sid)) return null;
  try {
    const r = await fetch(`${API}/Accounts/${c.sid}/Calls/${sid}.json`, { headers: { Authorization: c.auth }, cache: 'no-store' });
    return r.ok ? ((await r.json()) as TwilioCall) : null;
  } catch {
    return null;
  }
}

// ---- Test allowlist. In "test" mode nothing leaves for anyone but the owner's own phone and the office inbox.
export const TEST_PHONE = '+15618093864';
export const TEST_EMAIL = 'contact@newdesignpro.com';
export type Flag = 'off' | 'test' | 'on';
export function flag(name: 'QUOTE_FOLLOWUP' | 'MISSED_CALL_TEXT'): Flag {
  const v = (process.env[name] || '').trim().toLowerCase();
  return v === 'on' || v === 'test' ? v : 'off';
}

export const MISSED_CALL_BODY = "Sorry we missed you, this is New Design Pro. We'll call you back. Or reply here with your name and what you need done. Reply STOP to opt out.";

// Text-back after a missed call on the print line. Off unless MISSED_CALL_TEXT is test/on.
// In test mode it only ever texts the owner's own phone. Never texts someone who opted out.
export async function missedCallText(callerPhone: string | undefined): Promise<string> {
  const mode = flag('MISSED_CALL_TEXT');
  if (mode === 'off') return 'missed_call_text_off';
  const to = toE164(callerPhone);
  if (!to) return 'bad_phone';
  if (mode === 'test' && to !== TEST_PHONE) return 'test_mode_skipped';
  const out = await isOptedOut({ phone: to, stopText: true });
  if (out !== 'no') return out === 'yes' ? 'opted_out' : 'optout_check_failed';
  return sendSms(to, MISSED_CALL_BODY, 'Sorry we missed you');
}
