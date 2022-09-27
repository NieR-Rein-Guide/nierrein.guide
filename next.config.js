const withPWA = require('next-pwa')({
  dest: 'public'
})

module.exports = withPWA({
  images: {
    domains: [
      "reinguide-assets.s3.eu-central-1.wasabisys.com",
      "s3.eu-central-1.wasabisys.com",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
});