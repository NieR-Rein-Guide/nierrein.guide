const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

module.exports = {
  images: {
    domains: [
      "reinguide-assets.s3.eu-central-1.wasabisys.com",
      's3.eu-central-1.wasabisys.com'
    ],
  },
};