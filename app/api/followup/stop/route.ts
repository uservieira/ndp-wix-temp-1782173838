import { NextRequest, NextResponse } from 'next/server';
import { stopDeal } from '@/lib/followup/engine';
import { stopSigOk } from '@/lib/followup/messages';
import { SITE_URL } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Stop link from the quote follow-up emails.
// GET never changes anything (mail scanners open every link); it sends the person to a page with a confirm button.
// POST stops the follow-ups: from that button, or from a mail app's one-click unsubscribe.
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  return NextResponse.redirect(`${SITE_URL}/quote-follow-ups?d=${encodeURIComponent(q.get('d') || '')}&s=${encodeURIComponent(q.get('s') || '')}`, 302);
}

export async function POST(req: NextRequest) {
  const q = req.nextUrl.searchParams;
  const d = q.get('d') || '';
  const s = q.get('s') || '';
  let fromPage = false;
  try { fromPage = (await req.formData()).get('confirm') === '1'; } catch { /* no body */ }
  const ok = stopSigOk(d, s) ? await stopDeal(d, 'stop link') : false;
  console.log(JSON.stringify({ event: 'quote_followup_stop_link', deal: /^\d+$/.test(d) ? d : 'invalid', ok }));
  if (fromPage) return NextResponse.redirect(`${SITE_URL}/quote-follow-ups?done=${ok ? '1' : '0'}`, 303);
  return NextResponse.json({ ok }, { status: ok ? 200 : 400 });
}
