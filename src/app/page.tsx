import type { Metadata } from "next";
import { cdn } from "@/lib/cdn";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import FeatureGrid from "@/components/sections/feature-grid";
import AppDownload from "@/components/sections/app-download";
import Rewards from "@/components/sections/rewards";
import HelpContact from "@/components/sections/help-contact";
import Footer from "@/components/sections/footer";

export const metadata: Metadata = {
  title: "BipBip — Pedí lo que querés, cuando querés",
  description:
    "Descubrí restaurantes, supermercados y tiendas con entrega rápida en Honduras. Pedí desde la app de BipBip y recibí en minutos.",
  openGraph: {
    title: "BipBip — Pedí lo que querés, cuando querés",
    images: [cdn("/og/home.png")],
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <FeatureGrid />
        <AppDownload />
        <Rewards />
        <HelpContact />
      </main>
      <Footer />
    </>
  );
}
