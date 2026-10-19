'use client';

import { phoneError } from '@/lib/phone';
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


// ---------- UI helpers ----------
const ICONS: Record<string, JSX.Element> = {
  planks: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9.3h18M3 14.7h18M9 4v5.3M15 9.3v5.4M7 14.7V20" /></>,
  hands: <><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" /></>,
  tile: <><rect x="3" y="3" width="8" height="8" rx="1" /><rect x="13" y="3" width="8" height="8" rx="1" /><rect x="3" y="13" width="8" height="8" rx="1" /><rect x="13" y="13" width="8" height="8" rx="1" /></>,
  shower: <><path d="M5 21V8a5 5 0 0 1 10 0" /><path d="M11 8h8l-1 3h-6z" /><path d="M13 14v1M16 14v1M19 14v1M13.5 18v1M16.5 18v1" /></>,
  kitchen: <><rect x="3" y="10" width="18" height="11" rx="1.5" /><path d="M3 14h18M8 10V6a2 2 0 0 1 4 0M16 4v6" /></>,
  bath: <><path d="M3 12h18v3a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" /><path d="M6 12V6a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2" /></>,
  spark: <><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6" /></>,
};

function Choice({ active, onClick, label, sub, icon, badge, price }: {
  active: boolean; onClick: () => void; label: string; sub?: string; icon?: keyof typeof ICONS; badge?: string; price?: string;
}) {
  return (
    <button type="button" role="radio" aria-checked={active} className={`qc ${active ? 'is-on' : ''} ${icon ? 'has-icon' : ''}`} onClick={onClick}>
      {icon && (
        <span className="qc-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">{ICONS[icon]}</svg>
        </span>
      )}
      <span className="qc-text">
        {badge && <span className="qc-badge">{badge}</span>}
        <span className="qc-label">{label}</span>
        {sub && <span className="qc-sub">{sub}</span>}
      </span>
      {price && <span className="qc-price">{price}</span>}
      <span className="qc-check" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </span>
    </button>
  );
}

const VALID_CODE = /^lvp10$/i;
const PROMO_LIVE = () => new Date() <= new Date('2026-12-31T23:59:59-05:00');
const money = (n: number) => `$${Math.round(n).toLocaleString()}`;

const STEP_TITLES = [
  '', // 0 not used
  'What do you need?',
  'How much space?',
  'Current floor situation?',
  'Baseboards?',
  'Floor package',
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
  const [codeDraft, setCodeDraft] = useState('');
  const [codeStatus, setCodeStatus] = useState<'idle' | 'applied' | 'invalid' | 'expired'>('idle');
  const [codeOpen, setCodeOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [burst, setBurst] = useState(0);

  const isFlooringScope = form.scope === 'lvp-supplied' || form.scope === 'lvp-labor';
  const isTile = form.scope === 'tile-floor' || form.scope === 'tile-wall';
  const isRemodel = form.scope === 'kitchen' || form.scope === 'bathroom';
  const isOther = form.scope === 'other';
  const isShortFlow = isRemodel || isOther || isTile; // scope → (sqft) → contact

  // Prefill from links like /form?tier=standard&collection=Azul%20Tortuga&color=White%20Haven
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const q = new URLSearchParams(window.location.search);
    try { if (localStorage.getItem('ndp_promo_popup_v1') === 'claimed') { setUnlocked(true); setCodeDraft((d) => d || 'LVP10'); } } catch {}
    const urlCode = (q.get('code') || q.get('promo') || '').trim().toUpperCase().slice(0, 20);
    if (urlCode) { setCodeDraft(urlCode); setCodeOpen(true); if (VALID_CODE.test(urlCode) && PROMO_LIVE()) { setForm((f) => ({ ...f, promoCode: urlCode })); setCodeStatus('applied'); } }
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
  const back = () => setStep((s) => ((isRemodel || isOther) && s === 3 ? 1 : Math.max(1, s - 1)));

  // Tap a choice: select it, then glide to the next step so it feels quick.
  const pick = (patch: Partial<FormData>, advance = true) => {
    setForm((f) => ({ ...f, ...patch }));
    // Remodels and "something else" skip straight to contact (step 3).
    const jump = patch.scope === 'kitchen' || patch.scope === 'bathroom' || patch.scope === 'other' ? 2 : 1;
    if (advance) window.setTimeout(() => setStep((s) => s + jump), 280);
  };

  const applyCode = (raw?: string) => {
    const code = (raw ?? codeDraft).trim().toUpperCase();
    setCodeDraft(code);
    if (!VALID_CODE.test(code)) { setCodeStatus('invalid'); setForm((f) => ({ ...f, promoCode: '' })); return; }
    if (!PROMO_LIVE()) { setCodeStatus('expired'); setForm((f) => ({ ...f, promoCode: '' })); return; }
    setForm((f) => ({ ...f, promoCode: code }));
    setCodeStatus('applied');
    setBurst((b) => b + 1);
    try { (window as any).dataLayer?.push({ event: 'promo_code_applied', promo: code }); } catch {}
  };
  const removeCode = () => { setForm((f) => ({ ...f, promoCode: '' })); setCodeStatus('idle'); };

  const contactOk = () => !!form.name && !!form.email && /^\S+@\S+\.\S+$/.test(form.email) && !!form.zip && (!form.phone.trim() || !phoneError(form.phone));
  const quotePhoneErr = form.phone.trim() && form.phone.replace(/\D/g, '').length >= 10 ? phoneError(form.phone) : null;

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

    // Backup delivery: Formspree emails every lead to the office, same as the homepage form.
    const formspree = fetch('https://formspree.io/f/mlgyeqrg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `New /form quote request: ${form.name || 'website lead'}`,
        form_name: 'form_page_quote',
        ...form,
        estimate: `${finalQuote.tierName || ''} $${finalQuote.low ?? ''}-$${finalQuote.high ?? ''}`,
        promo_used: finalQuote.eligible ? 'LVP10' : '',
        page: typeof window !== 'undefined' ? window.location.href : '',
      }),
    }).then((r) => r.ok).catch(() => false);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          calculatedQuote: finalQuote,
          attribution: (() => {
            try { return JSON.parse(localStorage.getItem('ndp_src') || 'null'); } catch { return null; }
          })(),
        }),
      });
      const json = await res.json();
      const backupOk = await formspree;
      if ((!res.ok || !json.ok) && !backupOk) {
        throw new Error(json.error || 'Something went wrong. Please try again.');
      }
      setSubmitted(true);

      // Fire dataLayer event for GTM / Google Ads conversion
      if (typeof window !== 'undefined' && (window as unknown as { dataLayer: unknown[] }).dataLayer) {
        (window as unknown as { dataLayer: unknown[] }).dataLayer.push({
          event: 'ndp_lead_submit',
          form_name: 'quote_form',
          form_location: 'form_page',
          lead_scope: form.scope,
        });
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
        <h2>Got it. Your quote is on its way.</h2>
        <p>We&apos;ll reach out within 24 hours to confirm your free in-home measure.</p>
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
        <div className="quote-step" key="s1">
          <h2>What do you need?</h2>
          <p className="quote-step-sub">Tap one to keep going.</p>
          <div className="qc-list" role="radiogroup" aria-label="Project type">
            {([
              { v: 'lvp-supplied', icon: 'planks', label: 'LVP flooring, supplied + installed', sub: `${SUPPLIER.name} floors, from $${tierRateFor('entry').toFixed(2)}/sqft`, badge: 'Most popular' },
              { v: 'lvp-labor', icon: 'hands', label: 'LVP flooring, labor only', sub: `You supply materials · ${PRICING.laborQuoted}` },
              { v: 'tile-floor', icon: 'tile', label: 'Tile floor', sub: PRICING.tileQuoted },
              { v: 'tile-wall', icon: 'shower', label: 'Tile wall, shower or backsplash', sub: PRICING.tileQuoted },
              { v: 'kitchen', icon: 'kitchen', label: 'Kitchen remodel', sub: '$8k – $25k typical' },
              { v: 'bathroom', icon: 'bath', label: 'Bathroom remodel', sub: '$5k – $18k typical' },
              { v: 'other', icon: 'spark', label: 'Something else', sub: 'Tell us what you have in mind' },
            ] as const).map((o) => (
              <Choice key={o.v} icon={o.icon} label={o.label} sub={o.sub} badge={'badge' in o ? o.badge : undefined} active={form.scope === o.v} onClick={() => pick({ scope: o.v as Scope })} />
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 — Sqft */}
      {step === 2 && (isFlooringScope || isTile) && (
        <div className="quote-step" key="s2">
          <h2>How much space?</h2>
          <p className="quote-step-sub">A rough range in square feet is fine. We measure exactly at the free visit.</p>
          <div className="qc-grid" role="radiogroup" aria-label="Square footage">
            {[
              { v: 'under-500', label: 'Under 500', sub: 'A room or hallway' },
              { v: '500-1000', label: '500–1,000', sub: 'A few rooms' },
              { v: '1000-1500', label: '1,000–1,500', sub: 'Most Central FL homes' },
              { v: '1500-2500', label: '1,500–2,500', sub: 'Whole home' },
              { v: '2500+', label: '2,500+', sub: 'Large or two-story' },
              { v: 'exact', label: 'I know it', sub: 'Type exact sqft' },
            ].map((o) => (
              <Choice key={o.v} label={o.label} sub={o.sub} active={form.sqftRange === o.v} onClick={() => pick({ sqftRange: o.v as SqftRange }, o.v !== 'exact')} />
            ))}
          </div>
          {form.sqftRange === 'exact' && (
            <div className="quote-field qc-inline">
              <label htmlFor="sqftExact">Exact square footage</label>
              <input id="sqftExact" type="text" inputMode="numeric" placeholder="e.g. 1250" autoFocus value={form.sqftExact} onChange={(e) => setForm({ ...form, sqftExact: e.target.value.replace(/\D/g, '') })} />
            </div>
          )}
        </div>
      )}

      {/* STEP 3 — Current floor */}
      {step === 3 && isFlooringScope && (
        <div className="quote-step" key="s3">
          <h2>What&apos;s on the floor now?</h2>
          <p className="quote-step-sub">Tells us if we need to remove and haul away the old floor.</p>
          <div className="qc-list" role="radiogroup" aria-label="Current floor">
            <Choice label="Remove carpet or tile first" sub="We demo and haul away the old floor" active={form.condition === 'demo-carpet'} onClick={() => pick({ condition: 'demo-carpet' })} />
            <Choice label="Install over existing floor" sub="Concrete, existing LVP or sealed subfloor. No demo needed" active={form.condition === 'over-existing'} onClick={() => pick({ condition: 'over-existing' })} />
            <Choice label="I'm not sure yet" sub="We'll figure it out at the free measure" active={form.condition === 'unsure'} onClick={() => pick({ condition: 'unsure' })} />
          </div>
        </div>
      )}

      {/* STEP 4 — Baseboards */}
      {step === 4 && isFlooringScope && (
        <div className="quote-step" key="s4">
          <h2>Baseboards?</h2>
          <p className="quote-step-sub">Quarter round is included with every package. New baseboards are an add-on.</p>
          <div className="qc-list" role="radiogroup" aria-label="Baseboards">
            <Choice label="Keep my baseboards" sub="Quarter round at the wall, included" active={form.baseboards === 'keep-add-qr'} onClick={() => pick({ baseboards: 'keep-add-qr' })} />
            <Choice label="New baseboards" sub="Cleanest finished look" price={`+$${BASEBOARD_ADDON.price.toFixed(2)}/lf`} active={form.baseboards === 'replace'} onClick={() => pick({ baseboards: 'replace' })} />
          </div>
        </div>
      )}

      {/* STEP 5 — Quality */}
      {step === 5 && isFlooringScope && (
        <div className="quote-step" key="s5">
          <h2>Pick your floor package</h2>
          <p className="quote-step-sub">All 100% waterproof, click-lock and warranty-backed. The difference is thickness and durability.</p>
          <div className="qc-list" role="radiogroup" aria-label="Floor package">
            <Choice label="Entry" sub="12-mil wear layer, 4.7mm. Budget-friendly" price={`$${tierRateFor('entry').toFixed(2)}`} active={form.quality === 'standard'} onClick={() => pick({ quality: 'standard' })} />
            <Choice label="Standard" badge="Most popular" sub="20-mil, 5mm. Carpet demo, haul-away and minor prep included" price={`$${tierRateFor('standard').toFixed(2)}`} active={form.quality === 'premium'} onClick={() => pick({ quality: 'premium' })} />
            <Choice label="Premium" sub="20-mil, 6mm core. Everything in Standard plus flatness, moisture and warranty file" price={`$${tierRateFor('premium').toFixed(2)}`} active={form.quality === 'luxury'} onClick={() => pick({ quality: 'luxury' })} />
          </div>
          <p className="qc-unit">Per sq ft, supplied + installed</p>
        </div>
      )}

      {/* STEP 6 — Stairs */}
      {step === 6 && isFlooringScope && (
        <div className="quote-step" key="s6">
          <h2>Any stairs?</h2>
          <p className="quote-step-sub">Stairs are quoted at your free in-home measure.</p>
          <div className="qc-grid qc-grid-2" role="radiogroup" aria-label="Stairs">
            <Choice label="No stairs" sub="Single story" active={!form.hasStairs} onClick={() => pick({ hasStairs: false, stairsCount: '' })} />
            <Choice label="Yes, stairs" sub="Add the step count" active={form.hasStairs} onClick={() => pick({ hasStairs: true, stairsCount: form.stairsCount || '12' }, false)} />
          </div>
          {form.hasStairs && (
            <div className="quote-field qc-inline">
              <label htmlFor="stairsCount">Number of steps</label>
              <input id="stairsCount" type="text" inputMode="numeric" placeholder="e.g. 12" value={form.stairsCount} onChange={(e) => setForm({ ...form, stairsCount: e.target.value.replace(/\D/g, '') })} />
            </div>
          )}
        </div>
      )}

      {/* CONTACT STEP */}
      {isContactStep && (
        <div className="quote-step">
          <h2>Where should we send your quote?</h2>
          <p className="quote-step-sub">Instant email with your estimated price range. No spam. We&apos;ll only follow up if you say yes.</p>

          {quote && quote.low > 0 && (() => {
            const full = calculateQuote({ ...form, promoCode: '' });
            return (
              <div className={`quote-preview ${quote.eligible ? 'has-promo' : ''}`}>
                <div className="quote-preview-label">Your estimated range</div>
                {quote.eligible && <div className="quote-preview-was">{money(full.low)} – {money(full.high)}</div>}
                <div className="quote-preview-price" key={quote.eligible ? 'd' : 'f'}>
                  {money(quote.low)} – {money(quote.high)}
                </div>
                <div className="quote-preview-scope">{quote.scopeLabel}</div>
                {quote.eligible && (
                  <div className="quote-preview-promo">You save {money(full.low - quote.low)} – {money(full.high - quote.high)}</div>
                )}
                <div className="quote-preview-note">Final price confirmed after in-home measure. Free, no obligation.</div>
              </div>
            );
          })()}

          {/* DISCOUNT CODE TICKET */}
          <div className={`promo-ticket is-${codeStatus}`} aria-live="polite">
            {codeStatus === 'applied' ? (
              <div className="promo-ticket-done" key={burst}>
                <span className="promo-burst" aria-hidden="true">{Array.from({ length: 10 }).map((_, i) => <i key={i} style={{ ['--i' as string]: i } as React.CSSProperties} />)}</span>
                <span className="promo-ticket-seal" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
                </span>
                <span className="promo-ticket-copy">
                  <strong>10% off unlocked</strong>
                  <span>{form.scope === 'lvp-supplied' ? `Code ${form.promoCode} · already taken off above` : `Code ${form.promoCode} · good on supplied + installed LVP. We\u2019ll note it.`}</span>
                  <button type="button" className="promo-ticket-x" onClick={removeCode} aria-label="Remove discount code">Remove code</button>
                </span>
              </div>
            ) : !codeOpen && !unlocked ? (
              <button type="button" className="promo-ticket-open" onClick={() => setCodeOpen(true)}>
                <span className="promo-ticket-tag" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>
                </span>
                <span className="promo-ticket-copy"><strong>Have a discount code?</strong><span>Tap to add it and watch your price drop</span></span>
                <span className="promo-ticket-plus" aria-hidden="true">+</span>
              </button>
            ) : (
              <div className="promo-ticket-form">
                <div className="promo-ticket-head">
                  <span className="promo-ticket-tag" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"><path d="M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z" /><circle cx="7.5" cy="7.5" r="1.5" /></svg>
                  </span>
                  <span className="promo-ticket-copy">
                    <strong>{unlocked ? 'You unlocked 10% off' : 'Enter your discount code'}</strong>
                    <span>{unlocked ? 'Your code from our offer is LVP10. Tap Apply.' : 'From our email or pop-up offer'}</span>
                  </span>
                </div>
                <div className="promo-ticket-row">
                  <label htmlFor="promoCode" className="sr-only">Discount code</label>
                  <input
                    id="promoCode"
                    type="text"
                    autoCapitalize="characters"
                    autoComplete="off"
                    spellCheck={false}
                    placeholder="LVP10"
                    value={codeDraft}
                    maxLength={20}
                    onChange={(e) => { setCodeDraft(e.target.value.toUpperCase()); if (codeStatus !== 'idle') setCodeStatus('idle'); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); applyCode(); } }}
                  />
                  <button type="button" onClick={() => applyCode()}>Apply</button>
                </div>
                {codeStatus === 'invalid' && <p className="promo-ticket-err">That code didn&apos;t work. Check the spelling and try again.</p>}
                {codeStatus === 'expired' && <p className="promo-ticket-err">That offer has ended.</p>}
              </div>
            )}
          </div>

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
              aria-invalid={!!quotePhoneErr}
            />
            {quotePhoneErr && <div className="quote-error" role="alert">{quotePhoneErr}</div>}
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
