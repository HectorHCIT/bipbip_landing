import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "static2.bipbip.hn", pathname: "/bipbip_landing/**" },
    ],
  },
  experimental: {
    optimizePackageImports: ["motion"],
  },
};

export default nextConfig;
