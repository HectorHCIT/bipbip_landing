import Image from "next/image";
import Card from "@/components/ui/card";
import SectionHeading from "@/components/ui/section-heading";

const features = [
  {
    icon: "/icons/moto.svg",
    title: "Pide a domicilio",
    body: "Recibí tu comida favorita en casa, rápido y caliente.",
  },
  {
    icon: "/icons/bag.svg",
    title: "Recoge en restaurante",
    body: "Ordená desde la app y pasá a recoger sin esperar.",
  },
  {
    icon: "/icons/burguer.svg",
    title: "Llamá al restaurante",
    body: "Conectá directo con tu restaurante favorito.",
  },
] as const;

export default function FeatureGrid() {
  return (
    <section id="features" className="bg-white py-16 md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <SectionHeading
          eyebrow="¿Cómo funciona?"
          title="Elige cómo disfrutar tu comida"
          align="center"
        />
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((f) => (
            <Card
              key={f.title}
              icon={
                <Image
                  src={f.icon}
                  alt=""
                  aria-hidden="true"
                  width={64}
                  height={64}
                />
              }
              title={f.title}
              body={f.body}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
