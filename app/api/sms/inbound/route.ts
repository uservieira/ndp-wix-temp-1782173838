import { fetchTwilioMessage, toE164 } from '@/lib/sms';
import { contactsByPhone, saveSmsConsent } from '@/lib/hubspot';
import { stopDealsForContacts } from '@/lib/followup/engine';
import { sendOwnerAlert } from '@/lib/leadAlert';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Twilio "a message comes in" webhook for the New Design Pro texting number(s).
//   STOP (and the other opt-out words): SMS consent set to "no" on the HubSpot contact, quote follow-up stopped.
//   Any other reply: quote follow-up stopped for that customer, and the reply is sent to the owner right away.
// Twilio itself sends the STOP / START / HELP confirmations; this route never texts the customer back.
// The request is confirmed by looking the message up in our Twilio account; only Twilio's copy is trusted.
const OPT_OUT = new Set(['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT', 'REVOKE', 'OPTOUT']);
const OPT_IN = new Set(['START', 'UNSTOP']);
const HELP = new Set(['HELP', 'INFO']);
const EMPTY = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';
const xml = () => new Response(EMPTY, { headers: { 'Content-Type': 'text/xml' } });

export async function POST(req: Request) {
  let sid = '';
  try { sid = String((await req.formData()).get('MessageSid') || ''); } catch { /* ignore */ }
  let m = sid ? await fetchTwilioMessage(sid) : null;
  if (sid && !m) { await new Promise((r) => setTimeout(r, 900)); m = await fetchTwilioMessage(sid); } // brand-new message, not readable yet
  if (!m || m.direction !== 'inbound' || Date.now() - Date.parse(m.date_created) > 15 * 60 * 1000) {
    return new Response(EMPTY, { status: m ? 200 : 403, headers: { 'Content-Type': 'text/xml' } });
  }
  const from = toE164(m.from) || m.from;
  const body = (m.body || '').trim();
  const word = body.toUpperCase().replace(/[^A-Z]/g, '');
  try {
    const contacts = await contactsByPhone(from);
    const ids = contacts.map((c) => c.id);
    const name = contacts.map((c) => [c.properties.firstname, c.properties.lastname].filter(Boolean).join(' ')).find(Boolean) || 'Unknown number';
    let outcome = 'reply';
    let stopped = 0;
    if (OPT_OUT.has(word)) {
      outcome = 'opt_out';
      await saveSmsConsent({ phone: from, consent: false, source: 'text_stop' });
      stopped = await stopDealsForContacts(ids, 'opted out');
      await sendOwnerAlert({ kind: 'Text opt-out', name, phone: from, details: { Message: body.slice(0, 200), Note: 'They texted STOP. No more texts will go to this number, and any quote follow-up for them has been stopped.' }, idem: `smsin-${m.sid}`, emailOnly: true });
    } else if (OPT_IN.has(word)) {
      outcome = 'opt_in';
      await saveSmsConsent({ phone: from, consent: true, source: 'text_start' });
    } else if (HELP.has(word)) {
      outcome = 'help';
    } else {
      stopped = await stopDealsForContacts(ids, 'text reply');
      await sendOwnerAlert({ kind: 'Text reply', name, phone: from, details: { Message: body.slice(0, 600) || '(no text, may be a photo)', 'Follow-up': stopped ? 'Automatic quote follow-up stopped for this customer.' : undefined }, idem: `smsin-${m.sid}`, smsNote: body.slice(0, 120) });
    }
    console.log(JSON.stringify({ event: 'sms_inbound', outcome, known_contact: ids.length > 0, followups_stopped: stopped }));
  } catch (e) {
    console.log(JSON.stringify({ event: 'sms_inbound_error', error: e instanceof Error ? e.message : 'unknown' }));
  }
  return xml();
}

// Lets Daniel confirm the URL is reachable from a browser. Changes nothing.
export async function GET() {
  return xml();
}
