/**
 * One place that knows where the site is served from.
 *
 * GitHub Pages project sites live under a sub-path (`/<repo>/`), so the build
 * sets `NEXT_PUBLIC_BASE_PATH`. A custom domain (or a `<user>.github.io` repo)
 * serves from the root and leaves it empty.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Absolute origin of the deployment, without a trailing slash. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://osamasla.github.io/sharara-marketing"
).replace(/\/$/, "");

/** `metadataBase` needs a trailing slash so relative paths resolve inside the sub-path. */
export const METADATA_BASE = new URL(`${SITE_URL}/`);

/** Prefix a file from `/public` with the deployment base path. */
export function asset(src: string) {
  return src.startsWith("/") ? `${BASE_PATH}${src}` : src;
}
