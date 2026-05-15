import Image from "next/image";
import AnimatedSectionTitle from "@/components/ui/animated-section-title";
import FeatureCards, { type FeatureCard } from "@/components/ui/feature-cards";
import { cdn } from "@/lib/cdn";

const cards = [
  {
    icon: cdn("/drivers/image84.png"),
    iconSize: 90,
    iconOffset: 63,
    title: "Tu tiempo tus horas",
    body: "Tu decide en que horarios y días trabajar.",
  },
  {
    icon: cdn("/drivers/Rectangle545.png"),
    iconSize: 106,
    iconOffset: 72,
    title: "Establece tu zona de trabajo",
    body: "Establece en que zonas y cuales órdenes entregar.",
  },
  {
    icon: cdn("/drivers/Rectangle546.png"),
    iconSize: 106,
    iconOffset: 72,
    title: "Genera ingresos",
    body: "Por cada orden entregada vas a generar ingresos.",
  },
] as const satisfies ReadonlyArray<FeatureCard>;

export default function DriversFeatures() {
  return (
    <section
      id="drivers-features"
      aria-labelledby="drivers-features-heading"
      className="relative overflow-hidden bg-white pt-20 pb-32 md:pt-24 md:pb-44 lg:pt-28 lg:pb-40 xl:pb-56"
    >
      <div className="relative mx-auto w-11/12">
        <AnimatedSectionTitle id="drivers-features-heading">
          Únete a la Bip Bip
        </AnimatedSectionTitle>
        <FeatureCards cards={cards} />
      </div>

      <div
        aria-hidden="true"
        className="anim-reveal-scale pointer-events-none absolute -right-8 top-16 hidden lg:block w-[200px] h-[134px] xl:w-[234px] xl:h-[156px] xl:right-6 xl:top-4 select-none"
      >
        <div className="anim-float relative size-full">
          <Image
            src={cdn("/floating/pizza.svg")}
            alt=""
            fill
            sizes="(max-width: 1024px) 0px, 234px"
            className="object-contain"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="anim-reveal-scale pointer-events-none absolute right-8 bottom-16 hidden md:block w-[260px] h-[240px] lg:w-[160px] lg:h-[148px] lg:right-2 lg:bottom-4 xl:w-[260px] xl:h-[240px] xl:right-8 xl:bottom-16 select-none"
      >
        <div
          className="anim-float-slow relative size-full"
          style={{ animationDelay: "0.5s" }}
        >
          <Image
            src={cdn("/drivers/60236155.svg")}
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 260px"
            className="object-contain"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="anim-reveal-left pointer-events-none absolute -left-12 bottom-0 hidden md:block w-[420px] h-[380px] lg:w-[320px] lg:h-[290px] xl:w-[420px] xl:h-[380px] select-none"
      >
        <div
          className="anim-float relative size-full"
          style={{ animationDuration: "2.4s", animationDelay: "1.2s" }}
        >
          <Image
            src={cdn("/drivers/driverinmotoanimado.webp")}
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 420px"
            className="object-contain object-left-bottom"
          />
        </div>
      </div>
    </section>
  );
}
