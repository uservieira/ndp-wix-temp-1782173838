// Twilio voice webhook for (689) 348-7406, the print line (stickers, magnets, signs).
// Forwards the call to Daniel's cell. Caller ID always shows the print line itself (saved on his phone as
// "NDP Print Line") so iPhone call screening lets it ring. The whisper reads the caller's number.
// Calls are logged automatically in Twilio's call log (counted in the monthly review).
import { sendOwnerAlert } from '@/lib/leadAlert';

export const runtime = 'nodejs';
const CELL = process.env.PRINT_LINE_FORWARD_TO || '+15618093864';
const LINE = '+16893487406';

function twiml() {
  const base = 'https://www.newdesignpro.com';
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial callerId="${LINE}" timeout="25" answerOnBridge="true">
    <Number url="${base}/api/voice/whisper{{Q}}">${CELL}</Number>
  </Dial>
  <Say voice="Polly.Joanna">Thanks for calling New Design Pro. We missed you, but we will call you right back.</Say>
</Response>`;
}

async function handle(req: Request) {
  let from = '';
  let callSid = '';
  try {
    if (req.method === 'POST') {
      const f = await req.formData();
      from = String(f.get('From') || '');
      callSid = String(f.get('CallSid') || '');
    } else from = new URL(req.url).searchParams.get('From') || '';
  } catch {}
  const safe = /^\+?\d{7,15}$/.test(from) ? from : '';
  const xml = twiml().replace('{{Q}}', safe ? `?From=${encodeURIComponent(safe)}` : '');
  // Written alert with the caller's number (email now; text once Twilio texting is approved).
  if (callSid && safe) {
    await sendOwnerAlert({
      kind: 'Print line call',
      name: 'Print line caller',
      phone: safe,
      source: 'Offline – print (stickers, magnets, signs)',
      details: { Line: '(689) 348-7406' },
      idem: `print-${callSid}`,
    }).catch(() => {});
  }
  return new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
}
export const POST = handle;
export const GET = handle;
