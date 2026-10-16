// Maps first-touch attribution to the HubSpot "NDP Lead Source" (ndp_lead_source) option values.
export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  gclid?: string;
  fbclid?: string;
  ref?: string;
};

export function leadSourceFrom(a?: Attribution | null): string {
  if (!a) return 'website_organic';
  const s = (a.utm_source || '').toLowerCase();
  const m = (a.utm_medium || '').toLowerCase();
  const ref = (a.ref || '').toLowerCase();
  if (s === 'postcard' || m === 'mail' || m === 'direct_mail') return 'postcard';
  if (['doorhanger', 'door_hanger', 'sign', 'yardsign', 'yard_sign', 'widesign'].includes(s)) return 'door_hanger_sign';
  if (s === 'referral' || s === 'refer') return 'referral_client';
  if (s === 'gbp' || s === 'google_business' || s === 'gmb') return 'google_maps';
  if (s === 'houzz' || ref.includes('houzz.')) return 'houzz';
  if (s === 'yelp' || ref.includes('yelp.')) return 'yelp';
  if (a.gclid || (s === 'google' && (m === 'cpc' || m === 'paid'))) return 'google_ads';
  if (s === 'facebook' || s === 'instagram' || s === 'meta' || a.fbclid) {
    return m === 'paid' || m === 'cpc' || m === 'paid_social' ? 'meta_lead_ad' : 'social_organic';
  }
  if (ref.includes('facebook.') || ref.includes('instagram.')) return 'social_organic';
  return 'website_organic';
}
