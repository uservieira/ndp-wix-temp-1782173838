import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://newdesignpro.com'),
  title: {
    default: 'New Design Pro — Luxury Vinyl Plank Flooring, Central Florida',
    template: '%s | New Design Pro',
  },
  description:
    'Central Florida luxury vinyl plank flooring. Supplied & installed from $4.99/sqft. Next-day start available. 50% deposit. Insured.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://newdesignpro.com',
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap"
        />
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-M53H4VTP');`}
        </Script>
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1211317391072105');fbq('track','PageView');`}
        </Script>
        {/* HubSpot */}
        <Script id="hs-script-loader" src="https://js.hs-scripts.com/246668357.js" strategy="afterInteractive" async defer />
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
          />
        </noscript>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
