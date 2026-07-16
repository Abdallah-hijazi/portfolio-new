import type { NextConfig } from "next";

/**
 * Set NEXT_PUBLIC_BASE_PATH when deploying to a GitHub Pages *project* site
 * (e.g. "/portfolio"). Leave empty for user/organization pages
 * (https://<user>.github.io) or custom domains.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  reactStrictMode: true,
  ...(basePath ? { basePath } : {}),
  images: {
    // GitHub Pages has no image optimization server.
    unoptimized: true,
  },
};

export default nextConfig;
