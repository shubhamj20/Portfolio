import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disabled because Mapbox GL (hero map) creates a WebGL context tied
  // to its container; React StrictMode's dev-only double mount/unmount
  // destroys and recreates that context faster than Mapbox tolerates,
  // leaving the map blank until a manual refresh.
  reactStrictMode: false,
};

export default nextConfig;
