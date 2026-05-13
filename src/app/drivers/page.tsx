import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import DriversHero from "@/components/sections/drivers-hero";
import DriversFeatures from "@/components/sections/drivers-features";
import DriversForm from "@/components/sections/drivers-form";
import { JsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema, webPageSchema } from "@/lib/seo-schemas";

const DRIVERS_DESCRIPTION =
  "Trabajá con BipBip — manejá tus horarios, generá ingresos extra y unite a la red de repartidores #1 de Honduras.";

export const metadata: Metadata = pageMetadata({
  title: "Repartidores",
  description: DRIVERS_DESCRIPTION,
  path: "/drivers",
  ogImagePath: "/og/drivers.png",
});

export default function DriversPage() {
  return (
    <>
      <JsonLd
        data={[
          ...webPageSchema({
            path: "/drivers",
            name: "Repartidores",
            description: DRIVERS_DESCRIPTION,
            breadcrumbs: [
              { name: "Inicio", path: "/" },
              { name: "Repartidores", path: "/drivers" },
            ],
          }),
          serviceSchema({ type: "drivers" }),
        ]}
      />
      <Header />
      <main id="main">
        <DriversHero />
        <DriversFeatures />
        <DriversForm />
      </main>
      <Footer />
    </>
  );
}
