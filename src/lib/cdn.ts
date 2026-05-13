const DEFAULT_CDN_BASE = "https://static2.bipbip.hn/bipbip_landing";
const CDN_BASE = (process.env.NEXT_PUBLIC_CDN_BASE_URL ?? DEFAULT_CDN_BASE).replace(/\/$/, "");

/**
 * Builds a CDN URL for a static asset.
 * Encodes path segments so spaces and special chars work in <Image> / <img>.
 * Preserves the path structure (slashes are kept literal).
 */
export function cdn(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const encoded = normalized
    .split("/")
    .map((segment) => (segment === "" ? "" : encodeURIComponent(segment)))
    .join("/");
  return `${CDN_BASE}${encoded}`;
}
