import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BipBip — Tu comida favorita, más cerca que nunca",
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
  // metadataBase: new URL('https://bipbip.example'), // TODO(landing-v1): set when production deploy URL is confirmed
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
        {children}
      </body>
    </html>
  );
}
