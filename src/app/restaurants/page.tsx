import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import RestaurantsHero from "@/components/sections/restaurants-hero";
import RestaurantsFeatures from "@/components/sections/restaurants-features";
import RestaurantsBrands from "@/components/sections/restaurants-brands";
import RestaurantsForm from "@/components/sections/restaurants-form";
import { JsonLd } from "@/components/seo/jsonld";
import { pageMetadata } from "@/lib/seo";
import { serviceSchema, webPageSchema } from "@/lib/seo-schemas";

const RESTAURANTS_DESCRIPTION =
  "Sumate como restaurante aliado a BipBip — accedé a miles de clientes y crecé tus pedidos sin invertir en logística.";

export const metadata: Metadata = pageMetadata({
  title: "Restaurantes",
  description: RESTAURANTS_DESCRIPTION,
  path: "/restaurants",
  ogImagePath: "/og/restaurants.png",
});

export default function RestaurantsPage() {
  return (
    <>
      <JsonLd
        data={[
          ...webPageSchema({
            path: "/restaurants",
            name: "Restaurantes",
            description: RESTAURANTS_DESCRIPTION,
            breadcrumbs: [
              { name: "Inicio", path: "/" },
              { name: "Restaurantes", path: "/restaurants" },
            ],
          }),
          serviceSchema({ type: "restaurants" }),
        ]}
      />
      <Header />
      <main id="main">
        <RestaurantsHero />
        <RestaurantsFeatures />
        <RestaurantsBrands />
        <RestaurantsForm />
      </main>
      <Footer />
    </>
  );
}
