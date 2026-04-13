import type { NextConfig } from "next";

const allowedDevOrigins = [
  "*.replit.dev",
  "*.worf.replit.dev",
  "*.spock.replit.dev",
  process.env.REPLIT_DEV_DOMAIN,
].filter(Boolean) as string[];

const nextConfig: NextConfig = {
  allowedDevOrigins,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
