import AnimatedSectionTitle from "@/components/ui/animated-section-title";
import FeatureCards, { type FeatureCard } from "@/components/ui/feature-cards";
import { cdn } from "@/lib/cdn";

const cards = [
  {
    icon: cdn("/restaurants/image 84.svg"),
    iconSize: 90,
    iconOffset: 63,
    title: "Mayor alcance",
    body: "Aumenta la visibilidad de tu restaurante frente a nuevos clientes.",
  },
  {
    icon: cdn("/restaurants/Rectangle 545.svg"),
    iconSize: 106,
    iconOffset: 72,
    title: "Canal adicional de ventas",
    body: "Recibe pedidos desde una plataforma diseñada para facilitar tu operación.",
  },
  {
    icon: cdn("/restaurants/Rectangle 546.svg"),
    iconSize: 106,
    iconOffset: 72,
    title: "Crecimiento para tu negocio",
    body: "Genera más ingresos con una solución enfocada en impulsar tus ventas.",
  },
] as const satisfies ReadonlyArray<FeatureCard>;

export default function RestaurantsFeatures() {
  return (
    <section
      id="restaurants-features"
      aria-labelledby="restaurants-features-heading"
      className="relative overflow-hidden bg-white pt-20 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32"
    >
      <div className="relative mx-auto w-11/12">
        <AnimatedSectionTitle id="restaurants-features-heading">
          Haz crecer tu restaurante con BipBip
        </AnimatedSectionTitle>
        <FeatureCards cards={cards} />
      </div>
    </section>
  );
}
