// Twilio voice webhook for (689) 348-7406, the print line (stickers, magnets, signs).
// Forwards the call to Daniel's cell. Caller ID always shows the print line itself (saved on his phone as
// "NDP Print Line") so iPhone call screening lets it ring. The whisper reads the caller's number.
// Calls are logged automatically in Twilio's call log (counted in the monthly review).
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
  try {
    if (req.method === 'POST') from = String((await req.formData()).get('From') || '');
    else from = new URL(req.url).searchParams.get('From') || '';
  } catch {}
  const safe = /^\+?\d{7,15}$/.test(from) ? from : '';
  const xml = twiml().replace('{{Q}}', safe ? `?From=${encodeURIComponent(safe)}` : '');
  return new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
}
export const POST = handle;
export const GET = handle;
