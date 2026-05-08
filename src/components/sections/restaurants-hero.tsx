import HeroCard from "@/components/ui/hero-card";

export default function RestaurantsHero() {
  return (
    <HeroCard
      sectionId="restaurants-hero"
      headingId="restaurants-heading"
      variant="split-50"
      title="Haz que tu restaurante venda más"
      body="Aumenta tu alcance, recibe más pedidos y genera nuevos ingresos con una plataforma diseñada para hacer crecer tu negocio."
      ctaLabel="Aplicar ahora"
      ctaHref="#restaurants-form"
      imageSrc="/restaurants/Frame%201000002487.webp"
      imageAlt="Mesa de restaurante con hamburguesas y bebidas"
    />
  );
}
