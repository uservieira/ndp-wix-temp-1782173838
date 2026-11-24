import { NextRequest, NextResponse } from 'next/server';
import { filterLogReady, filteredDigest, releaseDigest, REASON_LABEL, type FilterReason } from '@/lib/leadFilter';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Weekly count-only summary of what the junk filter caught. Called by .github/workflows/filtered-digest.yml
// with the shared poll secret. At most one email a week, none when the count is 0, never any entry details.
//   ?dry=1  returns the counts without reserving the week or sending anything.
export async function GET(req: NextRequest) {
  const secret = process.env.FOLLOWUP_SECRET || process.env.FB_POLL_SECRET;
  if (!secret || req.headers.get('x-poll-secret') !== secret) return NextResponse.json({ ok: false }, { status: 401 });
  if (!filterLogReady()) return NextResponse.json({ ok: true, note: 'log_not_configured' });

  const dry = req.nextUrl.searchParams.get('dry') === '1';
  const d = await filteredDigest(!dry);
  if (!d) return NextResponse.json({ ok: false, error: 'log_unreachable' }, { status: 502 });
  if (dry) return NextResponse.json({ ok: true, dry: true, total: d.total, by_reason: d.by_reason });
  if (!d.claimed) return NextResponse.json({ ok: true, note: 'already_ran_this_week' });
  if (d.total === 0) return NextResponse.json({ ok: true, note: 'nothing_filtered', total: 0 });

  const lines = (Object.keys(REASON_LABEL) as FilterReason[]).filter((k) => d.by_reason[k]).map((k) => `${REASON_LABEL[k]}: ${d.by_reason[k]}`);
  const since = new Date(d.since).toLocaleDateString('en-US', { timeZone: 'America/New_York', month: 'short', day: 'numeric' });
  const head = `The website filtered ${d.total} junk form ${d.total === 1 ? 'entry' : 'entries'} since ${since}. None were emailed or added to HubSpot.`;
  const foot = 'The full entries are kept in the filtered-entry log for 180 days.';
  const key = process.env.RESEND_API_KEY;
  let sent = false;
  if (key) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || 'New Design Pro Leads <contact@newdesignpro.com>',
          to: [process.env.OFFICE_EMAIL || 'contact@newdesignpro.com'],
          subject: `Website forms: ${d.total} junk ${d.total === 1 ? 'entry' : 'entries'} filtered this week`,
          text: [head, '', ...lines, '', foot].join('\n'),
          html: `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#17140F;max-width:520px;font-size:15px;line-height:1.5;"><p>${head}</p><p>${lines.join('<br>')}</p><p style="color:#6B6357;">${foot}</p></div>`,
        }),
      });
      sent = res.ok;
    } catch { /* handled below */ }
  }
  if (!sent) {
    // Give the week back so the retry run can send it.
    const released = await releaseDigest();
    return NextResponse.json({ ok: false, error: 'email_failed', released }, { status: 502 });
  }
  return NextResponse.json({ ok: true, sent: true, total: d.total, by_reason: d.by_reason });
}
