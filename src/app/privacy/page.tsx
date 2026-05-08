import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import LegalHero from "@/components/sections/legal-hero";
import PrivacyContent from "@/components/sections/privacy-content";

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
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
