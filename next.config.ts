import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The local photography is pre-compressed. Serving it directly avoids
    // relying on a platform-specific image service while preserving next/image
    // sizing, lazy loading and layout stability.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
