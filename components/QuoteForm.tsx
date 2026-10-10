'use client';

import { useState, useEffect } from 'react';
import { LVP_TIERS, PRICING, SUPPLIER, BASEBOARD_ADDON } from '@/lib/site';

const tierRateFor = (key: (typeof LVP_TIERS)[number]['key']) => LVP_TIERS.find((t) => t.key === key)!.price;

// ============================================================
// NDP Multi-Step Quote Form — qualifies tier, calculates price
// ============================================================

type Scope =
  | 'lvp-supplied'
  | 'lvp-labor'
  | 'tile-floor'
  | 'tile-wall'
  | 'kitchen'
  | 'bathroom'
  | 'other';

type SqftRange = 'under-500' | '500-1000' | '1000-1500' | '1500-2500' | '2500+' | 'exact';
type FloorCondition = 'demo-carpet' | 'over-existing' | 'unsure';
type Baseboards = 'keep-add-qr' | 'replace';
type QualityPref = 'standard' | 'premium' | 'luxury';

type FormData = {
  scope: Scope | '';
  sqftRange: SqftRange | '';
  sqftExact: string;
  condition: FloorCondition | '';
  baseboards: Baseboards | '';
  quality: QualityPref | '';
  hasStairs: boolean;
  stairsCount: string;
  name: string;
  email: string;
  zip: string;
  phone: string;
  promoCode: string;
  smsConsent: boolean;
  notes: string;
  collection: string;
  color: string;
};

const emptyForm: FormData = {
  scope: '',
  sqftRange: '',
  sqftExact: '',
  condition: '',
  baseboards: '',
  quality: '',
  hasStairs: false,
  stairsCount: '',
  name: '',
  email: '',
  zip: '',
  phone: '',
  promoCode: '',
  smsConsent: false,
  notes: '',
  collection: '',
  color: '',
};

// Pricing logic
const SQFT_MIDPOINT: Record<Exclude<SqftRange, 'exact'>, number> = {
  'under-500': 350,
  '500-1000': 750,
  '1000-1500': 1250,
  '1500-2500': 2000,
  '2500+': 3000,
};

const SQFT_LOW: Record<Exclude<SqftRange, 'exact'>, number> = {
  'under-500': 250,
  '500-1000': 500,
  '1000-1500': 1000,
  '1500-2500': 1500,
  '2500+': 2500,
};

const SQFT_HIGH: Record<Exclude<SqftRange, 'exact'>, number> = {
  'under-500': 500,
  '500-1000': 1000,
  '1000-1500': 1500,
  '1500-2500': 2500,
  '2500+': 3500,
};

// Returns [lowPrice, highPrice, tierName, tierPerSqft]
function calculateQuote(data: FormData): {
  low: number;
  high: number;
  tierName: string;
  tierRate: number;
  sqftLow: number;
  sqftHigh: number;
  discount: number;
  eligible: boolean;
  scopeLabel: string;
  quoted?: boolean;
} {
  const { scope, sqftRange, sqftExact, condition, baseboards, quality, hasStairs, stairsCount, promoCode } = data;

  let sqftLow = 0;
  let sqftHigh = 0;
  if (sqftRange === 'exact') {
    const n = parseInt(sqftExact.replace(/\D/g, ''), 10) || 0;
    sqftLow = Math.max(50, n * 0.95);
    sqftHigh = n * 1.05;
  } else if (sqftRange && sqftRange in SQFT_LOW) {
    sqftLow = SQFT_LOW[sqftRange as Exclude<SqftRange, 'exact'>];
    sqftHigh = SQFT_HIGH[sqftRange as Exclude<SqftRange, 'exact'>];
  }

  // Determine the effective tier for LVP-supplied jobs (owner-locked LVP_TIERS)
  let tierRate = tierRateFor('standard');
  let tierName = 'Standard Supplied';
  let scopeLabel = '';

  const requiresDemo = condition === 'demo-carpet';
  const requiresBaseboardReplace = baseboards === 'replace';

  // Scopes that are never priced online: quoted after a free in-home measure.
  const quotedOnly = (name: string, label: string) => ({
    low: 0,
    high: 0,
    tierName: name,
    tierRate: 0,
    sqftLow,
    sqftHigh,
    discount: 0,
    eligible: false,
    scopeLabel: label,
    quoted: true,
  });

  if (scope === 'lvp-supplied') {
    if (quality === 'luxury') {
      tierRate = tierRateFor('premium');
      tierName = 'Premium Supplied';
    } else if (quality === 'premium' || requiresDemo) {
      // Carpet demo is part of the Standard package. Baseboards are an add-on on every tier.
      tierRate = tierRateFor('standard');
      tierName = 'Standard Supplied';
    } else {
      tierRate = tierRateFor('entry');
      tierName = 'Entry Supplied';
    }
    scopeLabel = `LVP install (supplied + installed) — ${tierName}`;
    if (requiresBaseboardReplace) scopeLabel += ` + new baseboards ($${BASEBOARD_ADDON.price.toFixed(2)}/lf)`;
    if (data.collection) {
      scopeLabel += ` · ${SUPPLIER.name} ${data.collection}${data.color ? ` ${data.color}` : ''}`;
    }
  } else if (scope === 'lvp-labor') {
    return quotedOnly('Labor Only (LVP)', `LVP install — labor only (${PRICING.laborQuoted.toLowerCase()})`);
  } else if (scope === 'tile-floor') {
    return quotedOnly('Tile Floor', `Tile floor installation (${PRICING.tileQuoted.toLowerCase()})`);
  } else if (scope === 'tile-wall') {
    return quotedOnly('Tile Wall / Shower', `Tile wall, shower, or backsplash (${PRICING.tileQuoted.toLowerCase()})`);
  } else if (scope === 'kitchen') {
    // Kitchen is a range, not per-sqft. Use flat estimate.
    return {
      low: 8000,
      high: 25000,
      tierName: 'Kitchen Remodel',
      tierRate: 0,
      sqftLow: 0,
      sqftHigh: 0,
      discount: 0,
      eligible: false,
      scopeLabel: 'Full kitchen remodel',
    };
  } else if (scope === 'bathroom') {
    return {
      low: 5000,
      high: 18000,
      tierName: 'Bathroom Remodel',
      tierRate: 0,
      sqftLow: 0,
      sqftHigh: 0,
      discount: 0,
      eligible: false,
      scopeLabel: 'Full bathroom remodel',
    };
  } else if (scope === 'other') {
    return {
      low: 0,
      high: 0,
      tierName: 'Custom Scope',
      tierRate: 0,
      sqftLow: 0,
      sqftHigh: 0,
      discount: 0,
      eligible: false,
      scopeLabel: 'Custom scope — we\'ll quote in person',
    };
  }

  // Baseboard add-on: rough footage from sqft, priced per linear foot. Final lf measured in-home.
  const baseboardPerSqft = scope === 'lvp-supplied' && requiresBaseboardReplace ? BASEBOARD_ADDON.price * BASEBOARD_ADDON.lfPerSqft : 0;
  let low = sqftLow * (tierRate + baseboardPerSqft);
  let high = sqftHigh * (tierRate + baseboardPerSqft);

  // Stairs are never priced online; they're quoted at the free measure.
  if (hasStairs) {
    const stairs = parseInt(stairsCount.replace(/\D/g, ''), 10) || 0;
    scopeLabel += ` + ${stairs > 0 ? `${stairs} ` : ''}stairs (${PRICING.stairsQuoted.toLowerCase()})`;
  }

  // Apply promo code
  const eligible = /^lvp10$/i.test(promoCode.trim()) && scope === 'lvp-supplied' && new Date() <= new Date('2026-12-31T23:59:59-05:00'); // labor-only is quoted in-home
  const discount = eligible ? 0.1 : 0;
  if (eligible) {
    low = low * 0.9;
    high = high * 0.9;
  }

  return {
    low: Math.round(low / 50) * 50,
    high: Math.round(high / 50) * 50,
    tierName,
    tierRate,
    sqftLow,
    sqftHigh,
    discount,
    eligible,
    scopeLabel,
  };
}

const STEP_TITLES = [
  '', // 0 not used
  'What do you need?',
  'How much space?',
  'Current floor situation?',
  'Baseboards?',
  'Floor quality preference?',
  'Any stairs?',
  'Your info',
];

const TOTAL_STEPS = 7;

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quote, setQuote] = useState<ReturnType<typeof calculateQuote> | null>(null);

  const isFlooringScope = form.scope === 'lvp-supplied' || form.scope === 'lvp-labor';
  const isTile = form.scope === 'tile-floor' || form.scope === 'tile-wall';
  const isRemodel = form.scope === 'kitchen' || form.scope === 'bathroom';
  const isOther = form.scope === 'other';
  const isShortFlow = isRemodel || isOther || isTile; // scope → (sqft) → contact

  // Prefill from links like /form?tier=standard&collection=Azul%20Tortuga&color=White%20Haven
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new URLSearchParams(window.location.search);
    const tier = (q.get('tier') || '').toLowerCase();
    const collection = (q.get('collection') || '').slice(0, 60);
    const color = (q.get('color') || '').slice(0, 60);
    const tierToQuality: Record<string, QualityPref> = { entry: 'standard', standard: 'premium', premium: 'luxury' };
    const scopeFromTier: Record<string, Scope> = {
      entry: 'lvp-supplied',
      standard: 'lvp-supplied',
      premium: 'lvp-supplied',
      'lvp-supplied': 'lvp-supplied',
      labor: 'lvp-labor',
      'lvp-labor': 'lvp-labor',
      'tile-floor': 'tile-floor',
      'tile-wall': 'tile-wall',
    };
    if (!scopeFromTier[tier] && !collection) return;
    setForm((f) => ({
      ...f,
      scope: scopeFromTier[tier] || (collection ? 'lvp-supplied' : f.scope),
      quality: tierToQuality[tier] || f.quality,
      collection,
      color,
      notes:
        collection && !f.notes
          ? `Interested in ${SUPPLIER.name} ${collection}${color ? ` — ${color}` : ''}. Please bring a sample to the free measure.`
          : f.notes,
    }));
  }, []);

  // Determine the actual total steps for the current scope
  const effectiveTotal = isShortFlow ? 3 : TOTAL_STEPS; // Remodels and tile skip LVP qualifying detail

  // Advance
  const next = () => setStep((s) => Math.min(s + 1, effectiveTotal + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const contactOk = () => !!form.name && !!form.email && /^\S+@\S+\.\S+$/.test(form.email) && !!form.zip;

  const canAdvance = (): boolean => {
    if (step === 1) return !!form.scope;
    if (isTile && step === 3) return contactOk();
    if (step === 2) {
      if (isRemodel || isOther) return true;
      if (form.sqftRange === 'exact') return !!form.sqftExact && parseInt(form.sqftExact) >= 50;
      return !!form.sqftRange;
    }
    if (step === 3) {
      if (isRemodel || isOther) return true; // Contact step
      return !!form.condition;
    }
    if (step === 4) return !!form.baseboards;
    if (step === 5) return !!form.quality;
    if (step === 6) return true; // Stairs is optional yes/no
    // Contact step
    return contactOk();
  };

  // Contact step is different index depending on scope
  const contactStep = isShortFlow ? 3 : 7;
  const isContactStep = step === contactStep;

  // Live preview quote (shown from step 2 onward for flooring)
  useEffect(() => {
    if (step >= 2 && (isFlooringScope || isRemodel || isTile)) {
      setQuote(calculateQuote(form));
    }
  }, [form, step, isFlooringScope, isRemodel, isTile]);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    const finalQuote = calculateQuote(form);
    setQuote(finalQuote);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, calculatedQuote: finalQuote }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || 'Something went wrong. Please try again.');
      }
      setSubmitted(true);

      // Fire dataLayer event for GTM / Google Ads conversion
      if (typeof window !== 'undefined' && (window as unknown as { dataLayer: unknown[] }).dataLayer) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: 'quote_form_submit',
          scope: form.scope,
          sqft_low: finalQuote.sqftLow,
          sqft_high: finalQuote.sqftHigh,
          quote_low: finalQuote.low,
          quote_high: finalQuote.high,
          tier: finalQuote.tierName,
          promo_used: finalQuote.eligible,
        });
      }

      // Meta Pixel event
      if (typeof window !== 'undefined' && (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq) {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq('track', 'Lead', {
          content_name: 'quote_form',
          content_category: form.scope,
          value: 250,
          currency: 'USD',
        });
      }

      // Redirect to thank-you page after 1.5s so conversions fire
      setTimeout(() => {
        window.location.href = '/quote-thank-you?ref=' + encodeURIComponent(json.reference || '');
      }, 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="quote-success">
        <div className="quote-success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2>Your quote is on its way</h2>
        <p>Check your inbox at <strong>{form.email}</strong> in the next minute.</p>
        <p className="quote-success-sub">Redirecting…</p>
      </div>
    );
  }

  const progress = (step / effectiveTotal) * 100;

  return (
    <div className="quote-form" role="form" aria-label="Quote request form">
      <div className="quote-progress">
        <div className="quote-progress-bar" style={{ width: `${Math.min(100, progress)}%` }} />
      </div>
      <div className="quote-progress-label">
        Step {Math.min(step, effectiveTotal)} of {effectiveTotal} · {isTile && isContactStep ? STEP_TITLES[7] : STEP_TITLES[Math.min(step, isRemodel || isOther ? 3 : 7)]}
      </div>

      {/* STEP 1 — Scope */}
      {step === 1 && (
        <div className="quote-step">
          <h2>What do you need?</h2>
          <div className="quote-cards">
            {[
              { v: 'lvp-supplied', label: 'LVP flooring — supplied + installed', sub: `From $${tierRateFor('entry').toFixed(2)}/sqft` },
              { v: 'lvp-labor', label: 'LVP flooring — labor only (you supply materials)', sub: PRICING.laborQuoted },
              { v: 'tile-floor', label: 'Tile floor', sub: PRICING.tileQuoted },
              { v: 'tile-wall', label: 'Tile wall, shower, or backsplash', sub: PRICING.tileQuoted },
              { v: 'kitchen', label: 'Kitchen remodel', sub: '$8k – $25k typical' },
              { v: 'bathroom', label: 'Bathroom remodel', sub: '$5k – $18k typical' },
              { v: 'other', label: 'Something else', sub: 'Tell us what you have in mind' },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                className={`quote-card ${form.scope === opt.v ? 'is-active' : ''}`}
                onClick={() => setForm({ ...form, scope: opt.v as Scope })}
              >
                <div className="quote-card-label">{opt.label}</div>
                <div className="quote-card-sub">{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 — Sqft (only for flooring) OR Contact step for remodels */}
      {step === 2 && (isFlooringScope || isTile) && (
        <div className="quote-step">
          <h2>How much space?</h2>
          <p className="quote-step-sub">Pick a range, or enter exact square footage if you know it.</p>
          <div className="quote-cards">
            {[
              { v: 'under-500', label: 'Under 500 sqft', sub: 'Small room or hallway' },
              { v: '500-1000', label: '500–1,000 sqft', sub: 'Single floor or main level' },
              { v: '1000-1500', label: '1,000–1,500 sqft', sub: 'Most Central FL homes' },
              { v: '1500-2500', label: '1,500–2,500 sqft', sub: 'Whole home' },
              { v: '2500+', label: '2,500+ sqft', sub: 'Large home or multi-story' },
              { v: 'exact', label: 'I know exact sqft', sub: 'Enter below' },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                className={`quote-card ${form.sqftRange === opt.v ? 'is-active' : ''}`}
                onClick={() => setForm({ ...form, sqftRange: opt.v as SqftRange })}
              >
                <div className="quote-card-label">{opt.label}</div>
                <div className="quote-card-sub">{opt.sub}</div>
              </button>
            ))}
          </div>
          {form.sqftRange === 'exact' && (
            <div className="quote-field" style={{ marginTop: 16 }}>
              <label htmlFor="sqftExact">Exact square footage</label>
              <input
                id="sqftExact"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 1250"
                value={form.sqftExact}
                onChange={(e) => setForm({ ...form, sqftExact: e.target.value.replace(/\D/g, '') })}
              />
            </div>
          )}
        </div>
      )}

      {/* STEP 3 — Current floor condition (only for flooring) */}
      {step === 3 && isFlooringScope && (
        <div className="quote-step">
          <h2>Current floor situation?</h2>
          <p className="quote-step-sub">This tells us if we need to demo and haul away old floors.</p>
          <div className="quote-cards">
            <button
              type="button"
              className={`quote-card ${form.condition === 'over-existing' ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, condition: 'over-existing' })}
            >
              <div className="quote-card-label">Install over existing floor</div>
              <div className="quote-card-sub">Concrete, existing LVP, or sealed subfloor — no demo needed</div>
            </button>
            <button
              type="button"
              className={`quote-card ${form.condition === 'demo-carpet' ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, condition: 'demo-carpet' })}
            >
              <div className="quote-card-label">Remove carpet or tile first</div>
              <div className="quote-card-sub">We demo and haul away the old floor</div>
            </button>
            <button
              type="button"
              className={`quote-card ${form.condition === 'unsure' ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, condition: 'unsure' })}
            >
              <div className="quote-card-label">I&apos;m not sure yet</div>
              <div className="quote-card-sub">We&apos;ll figure it out at the free measure</div>
            </button>
          </div>
        </div>
      )}

      {/* STEP 4 — Baseboards */}
      {step === 4 && isFlooringScope && (
        <div className="quote-step">
          <h2>Baseboards?</h2>
          <p className="quote-step-sub">Quarter round is included with every package. New baseboards are an add-on at ${BASEBOARD_ADDON.price.toFixed(2)}/linear ft installed.</p>
          <div className="quote-cards">
            <button
              type="button"
              className={`quote-card ${form.baseboards === 'keep-add-qr' ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, baseboards: 'keep-add-qr' })}
            >
              <div className="quote-card-label">Keep existing baseboards</div>
              <div className="quote-card-sub">Quarter round at the wall base, included</div>
            </button>
            <button
              type="button"
              className={`quote-card ${form.baseboards === 'replace' ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, baseboards: 'replace' })}
            >
              <div className="quote-card-label">Replace with new baseboards</div>
              <div className="quote-card-sub">Add-on: ${BASEBOARD_ADDON.price.toFixed(2)}/linear ft installed. Cleanest finished look</div>
            </button>
          </div>
        </div>
      )}

      {/* STEP 5 — Quality preference */}
      {step === 5 && isFlooringScope && (
        <div className="quote-step">
          <h2>Floor quality preference?</h2>
          <p className="quote-step-sub">All our LVP is 100% waterproof, click-lock, and warranty-backed. Difference is durability and feel.</p>
          <div className="quote-cards">
            <button
              type="button"
              className={`quote-card ${form.quality === 'standard' ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, quality: 'standard' })}
            >
              <div className="quote-card-label">Entry — 12-mil wear layer, 4.7mm Panzu LVP</div>
              <div className="quote-card-sub">Standard install + quarter round, budget-friendly (${tierRateFor('entry').toFixed(2)}/sqft)</div>
            </button>
            <button
              type="button"
              className={`quote-card ${form.quality === 'premium' ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, quality: 'premium' })}
            >
              <div className="quote-card-label">Standard — 20-mil wear layer, 5mm LVP</div>
              <div className="quote-card-sub">Most Popular. Carpet demo, haul-away &amp; minor prep included (${tierRateFor('standard').toFixed(2)}/sqft)</div>
            </button>
            <button
              type="button"
              className={`quote-card ${form.quality === 'luxury' ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, quality: 'luxury' })}
            >
              <div className="quote-card-label">Premium — 20-mil, 6mm-core LVP</div>
              <div className="quote-card-sub">Everything in Standard + documented flatness, moisture &amp; warranty file (${tierRateFor('premium').toFixed(2)}/sqft)</div>
            </button>
          </div>
        </div>
      )}

      {/* STEP 6 — Stairs */}
      {step === 6 && isFlooringScope && (
        <div className="quote-step">
          <h2>Any stairs to cover?</h2>
          <p className="quote-step-sub">Stairs (riser + tread) are quoted at your free in-home measure. Skip if none.</p>
          <div className="quote-cards">
            <button
              type="button"
              className={`quote-card ${!form.hasStairs ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, hasStairs: false, stairsCount: '' })}
            >
              <div className="quote-card-label">No stairs</div>
              <div className="quote-card-sub">Single-story or stairs already handled</div>
            </button>
            <button
              type="button"
              className={`quote-card ${form.hasStairs ? 'is-active' : ''}`}
              onClick={() => setForm({ ...form, hasStairs: true, stairsCount: form.stairsCount || '12' })}
            >
              <div className="quote-card-label">Yes, I have stairs</div>
              <div className="quote-card-sub">Enter number of steps below</div>
            </button>
          </div>
          {form.hasStairs && (
            <div className="quote-field" style={{ marginTop: 16 }}>
              <label htmlFor="stairsCount">Number of steps</label>
              <input
                id="stairsCount"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 12"
                value={form.stairsCount}
                onChange={(e) => setForm({ ...form, stairsCount: e.target.value.replace(/\D/g, '') })}
              />
            </div>
          )}
        </div>
      )}

      {/* CONTACT STEP */}
      {isContactStep && (
        <div className="quote-step">
          <h2>Where should we send your quote?</h2>
          <p className="quote-step-sub">Instant email with your estimated price range. No spam. We&apos;ll only follow up if you say yes.</p>

          {quote && quote.low > 0 && (
            <div className="quote-preview">
              <div className="quote-preview-label">Your estimated range:</div>
              <div className="quote-preview-price">
                ${quote.low.toLocaleString()} – ${quote.high.toLocaleString()}
              </div>
              <div className="quote-preview-scope">{quote.scopeLabel}</div>
              {quote.eligible && (
                <div className="quote-preview-promo">10% LVP10 discount applied</div>
              )}
              <div className="quote-preview-note">Final price confirmed after in-home measure. Free, no obligation.</div>
            </div>
          )}
          {quote && quote.quoted && (
            <div className="quote-preview">
              <div className="quote-preview-label">Your price:</div>
              <div className="quote-preview-price">{PRICING.formQuotedNote}</div>
              <div className="quote-preview-scope">{quote.scopeLabel}</div>
              <div className="quote-preview-note">Free, no-obligation measure. Written quote within 24 hours.</div>
            </div>
          )}

          <div className="quote-field">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="e.g. Jane Smith"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="quote-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="quote-field">
            <label htmlFor="zip">ZIP code</label>
            <input
              id="zip"
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              placeholder="34747"
              value={form.zip}
              onChange={(e) => setForm({ ...form, zip: e.target.value.replace(/\D/g, '').slice(0, 5) })}
              required
            />
          </div>

          <div className="quote-field">
            <label htmlFor="phone">Phone <span className="quote-optional">(optional — helps us follow up faster)</span></label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              placeholder="(407) 555-1234"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="quote-field">
            <label htmlFor="promoCode">Promo code <span className="quote-optional">(optional)</span></label>
            <input
              id="promoCode"
              type="text"
              placeholder="Enter code"
              value={form.promoCode}
              onChange={(e) => setForm({ ...form, promoCode: e.target.value.toUpperCase() })}
              maxLength={20}
            />
          </div>

          <div className="quote-field">
            <label htmlFor="notes">Anything we should know? <span className="quote-optional">(optional)</span></label>
            <textarea
              id="notes"
              placeholder="Timeline, colors you like, subfloor concerns, etc."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
            />
          </div>

          {form.phone && (
            <div className="quote-consent">
              <label>
                <input
                  type="checkbox"
                  checked={form.smsConsent}
                  onChange={(e) => setForm({ ...form, smsConsent: e.target.checked })}
                />
                <span>
                  I agree to receive text messages from New Design Pro about my quote. Msg &amp; data rates may apply. ~1–4 msgs per active quote. Reply STOP to opt out. See <a href="/privacy" target="_blank">Privacy</a> &amp; <a href="/terms" target="_blank">Terms</a>.
                </span>
              </label>
            </div>
          )}

          {error && <div className="quote-error">{error}</div>}
        </div>
      )}

      {/* NAV */}
      <div className="quote-nav">
        {step > 1 && (
          <button type="button" className="quote-btn quote-btn-secondary" onClick={back} disabled={submitting}>
            Back
          </button>
        )}
        {!isContactStep ? (
          <button
            type="button"
            className="quote-btn quote-btn-primary"
            onClick={next}
            disabled={!canAdvance()}
          >
            Continue
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className="quote-btn quote-btn-primary"
            onClick={handleSubmit}
            disabled={!canAdvance() || submitting}
          >
            {submitting ? 'Sending…' : 'Get my quote'}
            {!submitting && (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
