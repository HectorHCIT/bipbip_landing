import HeroCard from "@/components/ui/hero-card";

export default function DriversHero() {
  return (
    <HeroCard
      sectionId="drivers-hero"
      headingId="drivers-heading"
      variant="split-547"
      title="Convertite en repartidor"
      body="Genera ingresos a tu propio ritmo, en las zonas de tu preferencia."
      ctaLabel="Aplicar ahora"
      ctaHref="#drivers-form"
      imageSrc="/drivers/driver.webp"
      imageAlt="Repartidor BipBip con casco"
    />
  );
}
