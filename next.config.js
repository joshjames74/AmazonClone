/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = { fs: false};
    return config;
  },
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["en.wikipedia.org", "flagsapi.com", "lh3.googleusercontent.com"]
  }
}

module.exports = nextConfig
