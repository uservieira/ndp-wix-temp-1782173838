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
      { source: '/contact', destination: '/', permanent: true },
      { source: '/flooring', destination: '/', permanent: true },
      { source: '/pricing', destination: '/', permanent: true },
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
