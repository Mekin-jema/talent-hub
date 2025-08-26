/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
  // other config here..
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // matches any domain
      },
    ],
  },

};

module.exports = nextConfig;
