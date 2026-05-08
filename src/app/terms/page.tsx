import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import LegalHero from "@/components/sections/legal-hero";

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
        <section className="mx-auto w-11/12 max-w-[1280px] py-16 md:py-20" />
      </main>
      <Footer />
    </>
  );
}
