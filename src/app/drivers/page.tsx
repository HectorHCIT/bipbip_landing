import type { Metadata } from "next";
import Header from "@/components/sections/header";
import Footer from "@/components/sections/footer";
import DriversHero from "@/components/sections/drivers-hero";
import DriversFeatures from "@/components/sections/drivers-features";
import DriversForm from "@/components/sections/drivers-form";

export const metadata: Metadata = {
  title: "Repartidores | BipBip",
  description:
    "Convertite en repartidor BipBip. Genera ingresos a tu propio ritmo, en las zonas de tu preferencia.",
};

export default function DriversPage() {
  return (
    <>
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
