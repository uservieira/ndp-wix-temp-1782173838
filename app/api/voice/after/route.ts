// Runs after the print-line forward ends (only wired in when MISSED_CALL_TEXT is test/on).
// If Daniel did not pick up, the caller hears the same "we missed you" line as before and gets one text.
import { fetchTwilioCall, missedCallText } from '@/lib/sms';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
const LINE = '+16893487406';
const MISSED = new Set(['no-answer', 'busy', 'failed', 'canceled']);
const SAY = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Joanna">Thanks for calling New Design Pro. We missed you, but we will call you right back.</Say>
</Response>`;
const DONE = '<?xml version="1.0" encoding="UTF-8"?><Response><Hangup/></Response>';
const xml = (body: string) => new Response(body, { headers: { 'Content-Type': 'text/xml' } });

export async function POST(req: Request) {
  let status = '';
  let sid = '';
  try {
    const f = await req.formData();
    status = String(f.get('DialCallStatus') || '');
    sid = String(f.get('CallSid') || '');
  } catch { /* ignore */ }
  if (!MISSED.has(status)) return xml(DONE);
  // Confirm the call is real and recent before texting anyone: it must be in our Twilio account, to the print line.
  const call = sid ? await fetchTwilioCall(sid) : null;
  const recent = call ? Date.now() - Date.parse(call.start_time || call.date_created) < 10 * 60 * 1000 : false;
  if (call && recent && call.to === LINE && call.direction === 'inbound') {
    const res = await missedCallText(call.from).catch(() => 'error');
    console.log(JSON.stringify({ event: 'missed_call_text', result: String(res).slice(0, 60) }));
  }
  return xml(SAY);
}
