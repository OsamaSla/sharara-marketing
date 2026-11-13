import type { NextConfig } from "next";

/**
 * Static export for GitHub Pages.
 *
 * `NEXT_PUBLIC_BASE_PATH` is set by the deploy workflow (`/sharara-marketing`);
 * it stays empty for local builds and for a custom domain, which serves from
 * the root. `next/image` cannot optimise on Pages, so images are served as-is
 * (`unoptimized`), and every `<Image>` src goes through `asset()` in `lib/site.ts`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || undefined;

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;
