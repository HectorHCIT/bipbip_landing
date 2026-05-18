import { NextResponse } from "next/server";
import { IOS_BUNDLE_ID } from "@/lib/mobile-app";

/**
 * Apple Universal Links — Apple fetches this file (no extension) to validate
 * that `bipbip.hn` is associated with the BipBip customer app. MUST be served
 * as `application/json`, which is why this is a route handler instead of a
 * static file in `public/`.
 *
 * Spec: https://developer.apple.com/documentation/xcode/supporting-associated-domains
 */
export function GET(): NextResponse {
  const appleAppSiteAssociation = {
    applinks: {
      apps: [],
      details: [
        {
          appID: IOS_BUNDLE_ID,
          paths: ["/", "NOT /*"],
        },
      ],
    },
  };

  return NextResponse.json(appleAppSiteAssociation, {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
