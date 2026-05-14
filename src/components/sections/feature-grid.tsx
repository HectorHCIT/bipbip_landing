import Image from "next/image";
import AnimatedSectionTitle from "@/components/ui/animated-section-title";
import { cdn } from "@/lib/cdn";

const features = [
  {
    icon: cdn("/icons/moto.svg"),
    title: "Envío a domicilio",
    body: "Tu comida favorita, directo a tu puerta. Pide con Bipbip y relájate mientras nosotros la llevamos.",
    reveal: "anim-reveal-left",
  },
  {
    icon: cdn("/icons/bag.svg"),
    title: "Recoger en Restaurante",
    body: "Ordena desde la app y recoge tu pedido sin esperas. ¡Comodidad en cada paso!",
    reveal: "anim-reveal-up",
  },
  {
    icon: cdn("/icons/spoon.svg"),
    title: "Comer en Restaurante",
    body: "Ordena desde la app y recoge tu pedido sin esperas. ¡Comodidad en cada paso!",
    reveal: "anim-reveal-right",
  },
] as const;

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white pt-20 pb-30 md:pt-24 md:pb-36 lg:pt-28 lg:pb-40"
      aria-labelledby="features-heading"
    >
      <div className="relative mx-auto w-11/12">
        <AnimatedSectionTitle id="features-heading">
          Elije cómo disfrutar tu comida
        </AnimatedSectionTitle>

        <div className="relative mt-24 grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-16 lg:gap-20 lg:max-w-[1060px] lg:mx-auto">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={
                `${feature.reveal} relative flex flex-col items-center gap-6 rounded-3xl bg-white px-8 pt-12 pb-6 shadow-card` +
                (index === 1 ? " md:mt-25" : "")
              }
            >
              {/* TODO(STY-008): --shadow-card uses opacity 0.05; this raw value uses 0.08 — confirm intended token before swapping */}
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 flex size-22 items-center justify-center rounded-full bg-white shadow-[0_5px_12px_rgba(0,0,0,0.08)]">
                <Image
                  src={feature.icon}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  className="size-14"
                />
              </div>
              <h3 className="text-h5 text-brand-black text-center">{feature.title}</h3>
              <p className="text-b2 text-brand-black text-center">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="anim-reveal-left pointer-events-none absolute left-0 bottom-0 z-10 hidden lg:block w-[538px] h-[342px] select-none"
      >
        <div className="anim-float-slow relative size-full">
          <Image
            src={cdn("/floating/cubo pollo.svg")}
            alt=""
            fill
            sizes="538px"
            className="object-contain object-left-bottom"
          />
        </div>
      </div>
    </section>
  );
}
