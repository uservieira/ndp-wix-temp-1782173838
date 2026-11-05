// Plays only to Daniel when he answers a print-line call. Reads the caller's number.
export const runtime = 'nodejs';
function handle(req: Request) {
  const from = (new URL(req.url).searchParams.get('From') || '').replace(/\D/g, '').slice(-10);
  const spoken = from.length === 10 ? `, from ${from.split('').join(' ')}` : '';
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response><Say voice="Polly.Matthew">N D P print call${spoken}.</Say></Response>`;
  return new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
}
export const POST = handle;
export const GET = handle;
