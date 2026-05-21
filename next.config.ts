import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.98"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hdiuqutaklaydnqpyfbv.supabase.co",
      },
    ],
  },
};

export default nextConfig;