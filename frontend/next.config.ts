/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // matches any domain
      },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
