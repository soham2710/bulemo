/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      // Pass through the environment variables with fallbacks
      MONGODB_URI: process.env.MONGODB_URI || "",
      NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "",
      NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000"
    },
  };
  
  module.exports = nextConfig;