/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizeFonts: false,
        optimizeCss: false,   // Disable CSS optimization to save RAM

  },
};

if (process.env.NODE_ENV === "development") {
  // Only enable Sentry locally
  const { withSentryConfig } = require("@sentry/nextjs");
  module.exports = withSentryConfig(nextConfig, {
    org: "student-university-of-agricult",
    project: "typecript-nextjs",
    silent: true,
    widenClientFileUpload: true,
  });
} else {
  // In production/build, export config as-is (ignore Sentry)
  module.exports = nextConfig;
}