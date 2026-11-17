import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { SITE_URL } from '@/lib/site';
import { GitHubError, hasGitHubToken } from '@/lib/holo/github';
import { IngestError, ingest, parseDelivery } from '@/lib/holo/ingest';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

// Receives approved articles from Holo (app.tryholo.ai) and publishes them to /blog.
// Docs: https://docs.tryholo.ai/seo/seo-webhooks.md
//
// Auth: X-Holo-Signature: sha256=<hex HMAC-SHA256(HOLO_WEBHOOK_SECRET, raw body)>.
// No secret configured, no header, or a wrong signature all answer 401. Nothing is
// published without a valid signature.

const MAX_BODY_BYTES = 3 * 1024 * 1024;
const EVENTS = new Set(['article.published', 'article.updated']);

const reply = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

function validSignature(raw: Buffer, header: string | null): boolean {
  const secret = (process.env.HOLO_WEBHOOK_SECRET ?? '').trim();
  if (!secret) {
    console.error('[holo] HOLO_WEBHOOK_SECRET is not set; rejecting the request');
    return false;
  }
  if (!header) return false;
  const expected = `sha256=${createHmac('sha256', secret).update(raw).digest('hex')}`;
  // Hash both sides to a fixed length so the comparison is constant time for any input.
  const a = createHash('sha256').update(header.trim()).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

export async function POST(req: Request) {
  if (Number(req.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) return reply(413, { message: 'Payload too large' });
  // Raw bytes first: the signature covers the body exactly as sent.
  const raw = Buffer.from(await req.arrayBuffer());
  if (raw.length > MAX_BODY_BYTES) return reply(413, { message: 'Payload too large' });
  if (!validSignature(raw, req.headers.get('x-holo-signature'))) return reply(401, { message: 'Invalid signature' });

  let payload: any;
  try {
    payload = JSON.parse(raw.toString('utf8'));
  } catch {
    return reply(400, { message: 'Body is not valid JSON' });
  }
  if (!payload || typeof payload !== 'object') return reply(400, { message: 'Body is not valid JSON' });

  if (payload.test === true) return reply(200, { message: 'Test webhook received' });
  if (!EVENTS.has(payload.event)) return reply(200, { message: 'Event ignored' });

  try {
    const delivery = parseDelivery(payload, req.headers.get('x-holo-delivery'));
    // 503 so Holo retries once the token is in place.
    if (!hasGitHubToken()) {
      console.error('[holo] GH_HOLO_TOKEN is not set; cannot publish');
      return reply(503, { message: 'Publishing is not configured yet' });
    }
    const result = await ingest(delivery);
    console.log(`[holo] ${result.status} /blog/${result.slug}${result.commit ? ` in ${result.commit.slice(0, 7)}` : ''} (delivery ${delivery.deliveryId})`);
    return reply(200, { url: `${SITE_URL}/blog/${result.slug}`, status: result.status });
  } catch (err) {
    if (err instanceof IngestError) {
      console.error(`[holo] ${err.status}: ${err.message}`);
      return reply(err.status, { message: err.message });
    }
    if (err instanceof GitHubError) {
      console.error(`[holo] GitHub ${err.status}: ${err.message}`);
      // A rejected token or missing permission will not fix itself, but the delivery should
      // not be lost: answer 5xx so Holo keeps retrying while it is fixed.
      return reply(err.status === 409 ? 503 : 502, { message: 'Could not save the article. It will be retried.' });
    }
    console.error('[holo] unexpected error', err instanceof Error ? err.message : err);
    return reply(500, { message: 'Unexpected error. It will be retried.' });
  }
}

// Anything that is not a signed POST gets nothing useful back.
export function GET() {
  return reply(405, { message: 'Method not allowed' });
}
