import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import LegalHero from "@/components/sections/legal-hero";
import TermsContent from "@/components/sections/terms-content";
import { JsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/seo-schemas";

const TERMS_DESCRIPTION =
  "Términos y condiciones de uso de la plataforma BipBip.";

export const metadata: Metadata = pageMetadata({
  title: "Términos y Condiciones",
  description: TERMS_DESCRIPTION,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/terms",
          name: "Términos y Condiciones",
          description: TERMS_DESCRIPTION,
          breadcrumbs: [
            { name: "Inicio", path: "/" },
            { name: "Términos y Condiciones", path: "/terms" },
          ],
        })}
      />
      <Header />
      <main id="main">
        <LegalHero title="Términos & Condiciones" />
        <TermsContent />
      </main>
      <Footer />
    </>
  );
}
