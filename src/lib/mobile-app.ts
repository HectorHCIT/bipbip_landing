/**
 * Single source of truth for the BipBip customer mobile app identifiers.
 *
 * Values come from environment variables with safe defaults so dev/preview do
 * not break if the env is missing. All consumers are server-side (route
 * handlers + metadata generation), so these are intentionally NOT prefixed
 * with `NEXT_PUBLIC_` — they end up in HTML output but never in the client
 * JS bundle.
 */

// `||` (not `??`) so an empty string declared in Vercel falls back to the
// default instead of producing malformed identifiers downstream.
const fromEnv = (value: string | undefined, fallback: string): string =>
  value?.trim() || fallback;

export const IOS_APP_ID = fromEnv(process.env.MOBILE_APP_IOS_ID, "1501865149");

/** Team ID + bundle identifier, e.g. `X35XBA523L.hn.cit.gccustomerapp`. */
export const IOS_BUNDLE_ID = fromEnv(
  process.env.MOBILE_APP_IOS_BUNDLE_ID,
  "X35XBA523L.hn.cit.gccustomerapp",
);

export const ANDROID_PACKAGE = fromEnv(
  process.env.MOBILE_APP_ANDROID_PACKAGE,
  "hn.cit.gccustomerapp",
);

/**
 * Android app-signing SHA-256 fingerprints. CSV so the env can carry multiple
 * fingerprints (debug + release, or Play App Signing's upload + app keys)
 * without code changes.
 */
export const ANDROID_SHA256_FINGERPRINTS: readonly string[] = fromEnv(
  process.env.MOBILE_APP_ANDROID_SHA256_FINGERPRINTS,
  "33:72:5C:43:FA:C3:77:CA:98:9D:C0:EF:88:23:F0:D3:7A:DD:4C:AB:56:EC:5D:77:49:60:3D:FC:5E:96:6F:C5",
)
  .split(",")
  .map((fp) => fp.trim())
  .filter(Boolean);

export const APP_STORE_URL = `https://apps.apple.com/us/app/bip-bip/id${IOS_APP_ID}`;
export const PLAY_STORE_URL = `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`;
