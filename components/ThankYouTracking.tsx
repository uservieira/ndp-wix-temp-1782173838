'use client';

import { useEffect } from 'react';

// Fires GTM dataLayer + Meta Pixel Purchase-equivalent + Google Ads conversion
// on the thank-you page. Google Ads is configured to match this URL:
// URL starts with: www.newdesignpro.com/quote-thank-you

export default function ThankYouTracking({ reference }: { reference: string }) {
  useEffect(() => {
    // GTM dataLayer push — Google Ads conversion tag fires on this event OR on URL match
    if (typeof window !== 'undefined') {
      const w = window as unknown as {
        dataLayer?: unknown[];
        fbq?: (...args: unknown[]) => void;
        gtag?: (...args: unknown[]) => void;
      };

      w.dataLayer = w.dataLayer || [];
      w.dataLayer.push({
        event: 'quote_lead_confirmed',
        reference,
        value: 250,
        currency: 'USD',
      });

      // Meta Pixel — Lead event (deduped with server-side CAPI via event_id)
      if (w.fbq) {
        w.fbq('track', 'Lead', {
          content_name: 'quote_thank_you',
          value: 250,
          currency: 'USD',
        });
      }
    }
  }, [reference]);

  return null;
}
