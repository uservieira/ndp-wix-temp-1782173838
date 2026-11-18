// Exact wording for the quote follow-up (approved by Daniel, Nov 2026).
// Rules: no prices, no timelines, no licensing/insurance/certification claims, no "waterproof",
// no language mentions. Every text ends with STOP language.
import { createHmac, timingSafeEqual } from 'crypto';
import { emailSignature, textSignature } from '@/lib/emailSignature';
import { SITE_URL } from '@/lib/site';

export type Touch = 1 | 2 | 3;
export const TOUCH_DAY: Record<Touch, number> = { 1: 2, 2: 5, 3: 10 };

function hi(first: string) {
  return first ? `Hi ${first},` : 'Hi,';
}

export function firstName(raw?: string | null): string {
  const f = (raw || '').trim().split(/\s+/)[0] || '';
  if (!f || f.includes('@') || /\d/.test(f)) return '';
  return f.replace(/[^\p{L}'\-.]/gu, '').slice(0, 30);
}

export function smsBody(touch: Touch, first: string): string {
  if (touch === 1) return `${hi(first)} Daniel with New Design Pro. Checking that your quote reached you. Any questions on it? Reply here. Reply STOP to opt out.`;
  if (touch === 2) return `${hi(first)} Daniel with New Design Pro. Anything on the quote you'd like changed or explained? Reply here and I'll go over it. Reply STOP to opt out.`;
  return `${hi(first)} Daniel with New Design Pro, last check-in on your quote. Still interested? Reply here. Went another way? I'd value knowing why. Reply STOP to opt out.`;
}

// Phrase used to spot a copy of the same text already sent in the last two days.
export const SMS_MARKER: Record<Touch, string> = {
  1: 'Checking that your quote reached you',
  2: 'like changed or explained',
  3: 'last check-in on your quote',
};

const EMAIL: Record<Touch, { subject: string; paragraphs: string[] }> = {
  1: {
    subject: 'Did your quote come through?',
    paragraphs: [
      'I sent your flooring quote and want to make sure it reached you.',
      "If anything in it is unclear, or you'd like something changed, reply to this email or text me at (561) 809-3864.",
    ],
  },
  2: {
    subject: "Anything you'd change on the quote?",
    paragraphs: [
      'Checking in on the quote I sent.',
      "If something is holding you back, tell me what it is and I'll give you a straight answer. Reply here, or call or text (561) 809-3864.",
    ],
  },
  3: {
    subject: 'Closing the loop on your quote',
    paragraphs: [
      "This is my last follow-up on your quote. If you're still thinking it over, reply and we'll pick up where we left off.",
      'If you chose someone else, no hard feelings. A one-line reply telling me what decided it would help me a lot.',
    ],
  },
};

function esc(v: string) {
  return v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

export function email(touch: Touch, first: string, stopPageUrl: string): { subject: string; html: string; text: string } {
  const e = EMAIL[touch];
  const paras = [hi(first), ...e.paragraphs];
  const html = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;max-width:560px;color:#17140F;font-size:16px;line-height:1.6;">
${paras.map((p) => `  <p style="margin:0 0 14px;">${esc(p)}</p>`).join('\n')}
  ${emailSignature(`You're getting this because you asked New Design Pro for a flooring quote. Don't want follow-ups about this quote? <a href="${stopPageUrl}" style="color:#9A9285;text-decoration:underline;">Click here to stop them.</a>`, false)}
</div>`;
  const text = `${paras.join('\n\n')}\n\n${textSignature()}\n\nDon't want follow-ups about this quote? Stop them here: ${stopPageUrl}`;
  return { subject: e.subject, html, text };
}

// ---- Stop link. Signed with a server secret so a link only works for its own quote.
function secret() {
  return process.env.FOLLOWUP_SECRET || process.env.FB_POLL_SECRET || '';
}
export function stopSig(dealId: string): string {
  const s = secret();
  if (!s) return '';
  return createHmac('sha256', s).update(`followup-stop:${dealId}`).digest('hex').slice(0, 32);
}
export function stopSigOk(dealId: string, sig: string): boolean {
  const want = stopSig(dealId);
  if (!want || !/^\d{1,20}$/.test(dealId) || sig.length !== want.length) return false;
  return timingSafeEqual(Buffer.from(sig), Buffer.from(want));
}
// The page a person sees (asks them to confirm) and the endpoint mail apps call for one-click unsubscribe.
export function stopPageUrl(dealId: string) {
  return `${SITE_URL}/quote-follow-ups?d=${dealId}&s=${stopSig(dealId)}`;
}
export function stopApiUrl(dealId: string) {
  return `${SITE_URL}/api/followup/stop?d=${dealId}&s=${stopSig(dealId)}`;
}
