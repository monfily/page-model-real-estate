import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["*.replit.dev", "*.worf.replit.dev"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
