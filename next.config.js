const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/graphql',
          destination: `${process.env.BACKEND_BASE_URL}/api/graphql`,
        },
        // Note: Below is for OAuth next-auth - currently, not use
        // TODO: Potentially add to docs(?)
        {
          source: '/api/auth/:auth*',
          destination: `${process.env.BACKEND_BASE_URL}/admin/api/auth/:auth*`,
        },
        {
          source: '/admin/:admin*',
          destination: `${process.env.BACKEND_BASE_URL}/admin/:admin*`, // Couple with line above
        },
      ],
    };
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, '');
    config.resolve.extensions = ['.ts', '.tsx', '.js', '.jsx'];

    return config;
  },
}

module.exports = nextConfig
