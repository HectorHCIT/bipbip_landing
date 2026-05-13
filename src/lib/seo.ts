import type { Metadata } from "next";
import { cdn } from "@/lib/cdn";

export const SITE_URL = "https://bipbip.hn";
export const SITE_NAME = "BipBip";
export const SITE_LOCALE = "es_HN";
export const DEFAULT_DESCRIPTION =
  "BipBip es la app #1 de delivery en Honduras: pedí comida, mandados y compras de tus restaurantes y tiendas favoritas, con entrega rápida y seguimiento en vivo.";
export const DEFAULT_OG_IMAGE_PATH = "/og/home.png";
export const TWITTER_HANDLE = "@bipbip";

export interface PageMetaInput {
  /**
   * Per-page title fragment. Combined with the layout title template as
   * `${title} | BipBip`. Use `absoluteTitle` to bypass the template.
   */
  title?: string;
  /**
   * Use this to set a fully-formed `<title>` that ignores the parent template
   * (useful for the home page).
   */
  absoluteTitle?: string;
  description: string;
  /** Path under SITE_URL — e.g. '/', '/drivers', '/restaurants'. */
  path: string;
  /** CDN-relative path to a 1200x630 OG image. Defaults to home OG. */
  ogImagePath?: string;
  /** Set to true to emit `noindex, nofollow` (staging / drafts). */
  noIndex?: boolean;
}

function joinUrl(base: string, path: string): string {
  if (!path.startsWith("/")) {
    return `${base}/${path}`;
  }
  return `${base}${path}`;
}

/**
 * Builds a per-page Next.js Metadata object with canonical URL, OG, Twitter,
 * robots, and language alternates already wired up.
 */
export function pageMetadata(input: PageMetaInput): Metadata {
  const {
    title,
    absoluteTitle,
    description,
    path,
    ogImagePath = DEFAULT_OG_IMAGE_PATH,
    noIndex = false,
  } = input;

  const canonical = joinUrl(SITE_URL, path);
  const ogImageUrl = cdn(ogImagePath);
  const resolvedTitle: Metadata["title"] = absoluteTitle
    ? { absolute: absoluteTitle }
    : (title ?? undefined);
  const ogTwitterTitle = absoluteTitle ?? title ?? SITE_NAME;

  const metadata: Metadata = {
    title: resolvedTitle,
    description,
    alternates: {
      canonical,
      languages: { "es-HN": canonical },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      url: canonical,
      title: ogTwitterTitle,
      description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: ogTwitterTitle,
      description,
      images: [ogImageUrl],
    },
  };

  if (noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    };
  }

  return metadata;
}
