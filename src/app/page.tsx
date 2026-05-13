import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Hero from "@/components/sections/hero";
import FeatureGrid from "@/components/sections/feature-grid";
import AppDownload from "@/components/sections/app-download";
import Rewards from "@/components/sections/rewards";
import HelpContact from "@/components/sections/help-contact";
import Footer from "@/components/sections/footer";
import { JsonLd } from "@/components/seo/jsonld";
import { DEFAULT_DESCRIPTION, pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/seo-schemas";

export const metadata: Metadata = pageMetadata({
  absoluteTitle: "BipBip — Tu comida favorita, donde estés",
  description: DEFAULT_DESCRIPTION,
  path: "/",
  ogImagePath: "/og/home.png",
});

export default function Home() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/",
          name: "Inicio",
          description: DEFAULT_DESCRIPTION,
        })}
      />
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
