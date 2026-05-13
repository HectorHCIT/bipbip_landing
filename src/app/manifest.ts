import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "BipBip",
    short_name: "BipBip",
    description: "Tu comida favorita, donde estés",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#fb0021",
    lang: "es-HN",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
    prefer_related_applications: true,
    related_applications: [
      {
        platform: "play",
        url: "https://play.google.com/store/apps/details?id=hn.cit.gccustomerapp",
        id: "hn.cit.gccustomerapp",
      },
      {
        platform: "itunes",
        url: "https://apps.apple.com/hn/app/bip-bip/id1501865149",
        id: "1501865149",
      },
    ],
  };
}
