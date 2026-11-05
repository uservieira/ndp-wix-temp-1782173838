// Twilio voice webhook for (689) 348-7406, the print line (stickers, magnets, signs).
// Forwards the call to Daniel's cell, showing the caller's number, with a short whisper first.
// Calls are logged automatically in Twilio's call log (counted in the monthly review).
export const runtime = 'nodejs';
const CELL = process.env.PRINT_LINE_FORWARD_TO || '+15618093864';

function twiml() {
  const base = 'https://www.newdesignpro.com';
  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial callerId="{{From}}" timeout="25" answerOnBridge="true">
    <Number url="${base}/api/voice/whisper">${CELL}</Number>
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
  const xml = twiml().replace('callerId="{{From}}" ', safe ? `callerId="${safe}" ` : '');
  return new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
}
export const POST = handle;
export const GET = handle;
