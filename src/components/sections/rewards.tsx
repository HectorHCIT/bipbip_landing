import Image from "next/image";
import Card from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";
import Button from "@/components/ui/button";

const benefits = [
  {
    icon: "/icons/discountcupons.svg",
    title: "Gana puntos",
    body: "Acumulá puntos por cada pedido y canjéalos por descuentos.",
  },
  {
    icon: "/icons/bag.svg",
    title: "Productos gratis",
    body: "Convertí tus puntos en productos gratis de tus restaurantes favoritos.",
  },
  {
    icon: "/icons/spoon.svg",
    title: "Promos exclusivas",
    body: "Accedé a promociones únicas reservadas para usuarios BipBip.",
  },
] as const;

export default function Rewards() {
  return (
    <section id="rewards" className="bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/floating/coin.svg"
            alt=""
            aria-hidden="true"
            width={120}
            height={120}
            className="mb-6"
          />
          <SectionHeading
            eyebrow="Beneficios"
            title="¡Gana más con cada compra!"
            subtitle="Sumá puntos en cada pedido y canjéalos por recompensas exclusivas."
            align="center"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:mt-16">
          {benefits.map((b) => (
            <Card
              key={b.title}
              icon={
                <Image
                  src={b.icon}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                />
              }
              title={b.title}
              body={b.body}
            />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="primary" size="lg" href="#download">
            Empezá a ganar puntos
          </Button>
        </div>
      </div>
    </section>
  );
}
