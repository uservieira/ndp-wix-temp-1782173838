/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      { source: '/lvp', destination: '/', permanent: true },
      { source: '/services', destination: '/', permanent: true },
      { source: '/services/:path*', destination: '/', permanent: true },
      { source: '/quote', destination: '/', permanent: true },
      { source: '/lvp-installation', destination: '/', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },
      { source: '/contact', destination: '/form', permanent: true },
      { source: '/flooring', destination: '/', permanent: true },
      { source: '/pricing', destination: '/', permanent: true },
      { source: '/refer-earn', destination: '/refer', permanent: true },
      // Short review link used on cards, emails, and texts. A config redirect sends a real
      // Location header (the statically prerendered redirect() in app/review/page.tsx did not).
      {
        source: '/review',
        destination: 'https://search.google.com/local/writereview?placeid=ChIJ04pkC9peBq8RQI3Z0T1XETk',
        permanent: false,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};
export default nextConfig;
