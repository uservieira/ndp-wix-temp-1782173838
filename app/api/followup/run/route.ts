import { NextRequest, NextResponse } from 'next/server';
import { runFollowups, preview } from '@/lib/followup/engine';
import { flag, sendSms, missedCallText, leadAutoText, TEST_PHONE, MISSED_CALL_BODY } from '@/lib/sms';
import { inSendWindow } from '@/lib/followup/engine';
import type { Touch } from '@/lib/followup/messages';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Daily quote follow-up run. Called by .github/workflows/quote-followup.yml with the shared poll secret.
// The response holds counts only, never customer details (workflow logs are visible to repo collaborators).
//   ?preview=day2|day5|day10|missed|instant  sends that one message to the owner's own phone / office inbox only.
export async function GET(req: NextRequest) {
  const secret = process.env.FOLLOWUP_SECRET || process.env.FB_POLL_SECRET;
  if (!secret || req.headers.get('x-poll-secret') !== secret) return NextResponse.json({ ok: false }, { status: 401 });

  const q = req.nextUrl.searchParams;
  const pv = q.get('preview');
  if (pv) {
    const touch = ({ day2: 1, day5: 2, day10: 3 } as Record<string, Touch>)[pv];
    const ch = q.get('channel');
    if (touch) return NextResponse.json({ ok: true, preview: pv, result: await preview(touch, ch === 'sms' || ch === 'email' ? ch : 'both') });
    if (!inSendWindow(new Date())) return NextResponse.json({ ok: true, preview: pv, result: { note: 'outside_send_window' } });
    if (pv === 'missed') return NextResponse.json({ ok: true, preview: pv, result: { sms: flag('MISSED_CALL_TEXT') === 'off' ? 'flag_off' : await sendSms(TEST_PHONE, MISSED_CALL_BODY) } });
    if (pv === 'instant') return NextResponse.json({ ok: true, preview: pv, result: { sms: await leadAutoText('Daniel', TEST_PHONE, true) } });
    return NextResponse.json({ ok: false, error: 'unknown_preview' }, { status: 400 });
  }

  const result = await runFollowups();
  console.log(JSON.stringify({ event: 'quote_followup_run', ...result }));
  return NextResponse.json({ ...result, missedCallText: flag('MISSED_CALL_TEXT') });
}
