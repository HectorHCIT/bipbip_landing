import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import MotionProvider from "@/components/providers/motion-provider";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bipbip.hn";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "BipBip — Tu comida favorita, más cerca que nunca",
    template: "%s | BipBip",
  },
  description:
    "Pedí tu comida favorita en Honduras: rapidez, restaurantes top y recompensas en cada compra. Descargá la app BipBip.",
  applicationName: "BipBip",
  openGraph: {
    type: "website",
    locale: "es_HN",
    siteName: "BipBip",
    title: "BipBip — Tu comida favorita, más cerca que nunca",
    description: "Pedí, ganá puntos y disfrutá. Descargá la app BipBip.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BipBip",
    description: "Tu comida favorita, más cerca que nunca.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:p-3 focus:rounded focus:text-brand-black focus:outline-2 focus:outline-brand-primary"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
