/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['img.freepik.com'], // Add the domain of your external images here
  },
}

module.exports = nextConfig;
