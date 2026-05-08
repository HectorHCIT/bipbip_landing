import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import RestaurantsHero from "@/components/sections/restaurants-hero";
import RestaurantsFeatures from "@/components/sections/restaurants-features";
import RestaurantsBrands from "@/components/sections/restaurants-brands";
import RestaurantsForm from "@/components/sections/restaurants-form";

export const metadata: Metadata = {
  title: "Restaurantes | BipBip",
  description:
    "Haz que tu restaurante venda más. Aumenta tu alcance, recibe más pedidos y genera nuevos ingresos con BipBip.",
};

export default function RestaurantsPage() {
  return (
    <>
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
