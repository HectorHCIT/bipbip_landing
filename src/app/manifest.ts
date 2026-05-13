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
  };
}
