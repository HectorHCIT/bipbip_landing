import { NextResponse } from "next/server";
import {
  ANDROID_PACKAGE,
  ANDROID_SHA256_FINGERPRINTS,
} from "@/lib/mobile-app";

/**
 * Android App Links — `digital asset links` proves to Android that
 * `bipbip.hn` and the BipBip customer app share ownership, enabling deep
 * linking without the chooser dialog.
 *
 * Spec: https://developers.google.com/digital-asset-links/v1/getting-started
 */
export function GET(): NextResponse {
  const assetLinks = [
    {
      relation: ["delegate_permission/common.handle_all_urls"],
      target: {
        namespace: "android_app",
        package_name: ANDROID_PACKAGE,
        sha256_cert_fingerprints: ANDROID_SHA256_FINGERPRINTS,
      },
    },
  ];

  return NextResponse.json(assetLinks, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
