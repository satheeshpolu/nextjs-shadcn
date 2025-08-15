// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.benzinga.com", "media.ycharts.com", "www.benzinga.com"], // ✅ whitelist this domain
  },
};

module.exports = nextConfig;
