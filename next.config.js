/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    // Static export can't use the runtime image optimizer; we still get AVIF/WebP
    // via <picture>/next/image "unoptimized" mode with explicit dimensions.
    unoptimized: true,
  },
};

module.exports = nextConfig;
