import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import LegalHero from "@/components/sections/legal-hero";
import TermsContent from "@/components/sections/terms-content";

export const metadata: Metadata = {
  title: "Términos y Condiciones | BipBip",
  description: "Términos y condiciones de BipBip.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main id="main">
        <LegalHero title="Términos & Condiciones" />
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
