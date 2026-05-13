import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import LegalHero from "@/components/sections/legal-hero";
import PrivacyContent from "@/components/sections/privacy-content";
import { JsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";
import { webPageSchema } from "@/lib/seo-schemas";

const PRIVACY_DESCRIPTION =
  "Cómo BipBip recopila, usa y protege tus datos personales.";

export const metadata: Metadata = pageMetadata({
  title: "Políticas de Privacidad",
  description: PRIVACY_DESCRIPTION,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          path: "/privacy",
          name: "Políticas de Privacidad",
          description: PRIVACY_DESCRIPTION,
          breadcrumbs: [
            { name: "Inicio", path: "/" },
            { name: "Políticas de Privacidad", path: "/privacy" },
          ],
        })}
      />
      <Header />
      <main id="main">
        <LegalHero title="Políticas de Privacidad" />
        <PrivacyContent />
      </main>
      <Footer />
    </>
  );
}
