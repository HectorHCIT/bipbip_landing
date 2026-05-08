import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import LegalHero from "@/components/sections/legal-hero";

export const metadata: Metadata = {
  title: "Políticas de Privacidad | BipBip",
  description: "Políticas de privacidad de BipBip.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main">
        <LegalHero title="Políticas de Privacidad" />
        <section className="mx-auto w-11/12 max-w-[1280px] py-16 md:py-20" />
      </main>
      <Footer />
    </>
  );
}
