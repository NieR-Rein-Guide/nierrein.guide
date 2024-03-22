const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  output: 'export',
  reactStrictMode: false,
  experimental: {
    largePageDataBytes: 1028 * 1000,
  },
  images: {
    domains: [
      "reinguide-assets.s3.eu-central-1.wasabisys.com",
      "s3.eu-central-1.wasabisys.com",
      "assets.nierrein.guide",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});