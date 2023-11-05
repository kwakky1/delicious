// next.config.js

/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV !== "production",
  runtimeCaching,
});

module.exports = withPWA({
  remotePatterns: [{ hostname: "s3.us-west-2.amazonaws.com" }],
  reactStrictMode: false,
});
