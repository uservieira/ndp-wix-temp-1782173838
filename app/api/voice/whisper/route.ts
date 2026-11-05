// Plays only to Daniel when he answers a print-line call.
export const runtime = 'nodejs';
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Response><Say voice="Polly.Matthew">N D P print call.</Say></Response>`;
const handle = () => new Response(xml, { headers: { 'Content-Type': 'text/xml' } });
export const POST = handle;
export const GET = handle;
