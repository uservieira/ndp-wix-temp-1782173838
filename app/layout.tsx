import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { SITE_URL } from '@/lib/site';
import JsonLd from '@/components/JsonLd';
import MobileCallBar from '@/components/MobileCallBar';
import PromoPopup from '@/components/PromoPopup';
import { businessSchema } from '@/lib/schema';
import { fontVars } from '@/lib/fonts';
// vercel analytics active

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'New Design Pro — Luxury Vinyl Plank Flooring, Central Florida',
    template: '%s | New Design Pro',
  },
  description:
    'Central Florida luxury vinyl plank flooring. Supplied & installed from $4.99/sqft. Next-day start available. 50% deposit. Insured.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'New Design Pro',
    images: [{ url: '/assets/lvp-livingroom-md-v19.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport = {
  themeColor: '#0F1210',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <head>
        {/* Trackers (GTM, Meta Pixel, HubSpot): load on the visitor's first
            scroll/tap/keypress, or after 6s, so they never compete with the
            first paint. PageView still fires for every real visitor. */}
        <Script id="ndp-attribution" strategy="afterInteractive">
          {`(function(){try{var k='ndp_src',p=new URLSearchParams(location.search),o={};['utm_source','utm_medium','utm_campaign','gclid','fbclid'].forEach(function(n){var v=p.get(n);if(v)o[n]=v.slice(0,120)});var r=document.referrer;if(r&&r.indexOf(location.hostname)<0)o.ref=r.slice(0,200);var old=null;try{old=JSON.parse(localStorage.getItem(k)||'null')}catch(e){}var fresh=old&&old.ts&&(Date.now()-old.ts<90*864e5);if(Object.keys(o).length&&(!fresh||o.utm_source||o.gclid||o.fbclid)){o.ts=Date.now();localStorage.setItem(k,JSON.stringify(o))}}catch(e){}})();`}
        </Script>
        <Script id="deferred-trackers" strategy="afterInteractive">
          {`(function(){var done=false;var ev=['scroll','pointerdown','touchstart','keydown','mousemove'];function load(){if(done)return;done=true;ev.forEach(function(e){removeEventListener(e,load,{passive:true})});
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M53H4VTP');
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1211317391072105');fbq('track','PageView');
var h=document.createElement('script');h.id='hs-script-loader';h.async=true;h.defer=true;h.src='https://js.hs-scripts.com/246668357.js';document.body.appendChild(h);}
ev.forEach(function(e){addEventListener(e,load,{passive:true})});document.addEventListener('click',function(e){var a=e.target&&e.target.closest?e.target.closest('a[href^="tel:"]'):null;if(!a)return;window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:'ndp_phone_click',phone_number:a.getAttribute('href').replace('tel:',''),page_path:location.pathname});load();},true);if(/[?&](gclid|gbraid|wbraid|fbclid)=/.test(location.search)||location.pathname.indexOf('/quote-thank-you')===0){load();}else{setTimeout(load,6000);}})();`}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M53H4VTP"
            height={0}
            width={0}
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1211317391072105&ev=PageView&noscript=1"
            alt=""
            aria-hidden="true"
          />
        </noscript>
        <JsonLd data={businessSchema()} />
        {children}
        <MobileCallBar />
        <PromoPopup />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
