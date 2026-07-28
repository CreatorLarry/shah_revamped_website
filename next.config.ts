import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The Phase 1 assets are already compressed local JPEG/PNG files. Serving
    // them directly avoids relying on a platform-specific image service while
    // preserving next/image sizing, lazy loading and layout stability.
    unoptimized: true,
  },
};

export default nextConfig;
