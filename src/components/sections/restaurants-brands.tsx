"use client";

import Image from "next/image";
import { motion } from "motion/react";
import AnimatedSectionTitle from "@/components/ui/animated-section-title";

type Brand = { src: string; alt: string };

const row1: Brand[] = [
  { src: "/brands/KFC_logo%20.jpg", alt: "KFC" },
  { src: "/brands/cinnabon_logo%20.png", alt: "Cinnabon" },
  { src: "/brands/Wingstreet_Logo%20.png", alt: "WingStreet" },
  { src: "/brands/Wendys-logo%20.jpg", alt: "Wendy's" },
  { src: "/brands/PizzaHut_logo%20.jpg", alt: "Pizza Hut" },
  { src: "/brands/TatosWings_Logo%20.png", alt: "Tato's Wings" },
  { src: "/brands/Bigos_Logo%20.jpg", alt: "Bigos" },
  { src: "/brands/Chitos_Logo%20.jpg", alt: "Chitos" },
  { src: "/brands/Dennys_Logo%20.png", alt: "Denny's" },
  { src: "/brands/Fridays_logo%20.png", alt: "TGI Fridays" },
  { src: "/brands/Alamitos_Logo%20.png", alt: "Alamitos" },
  { src: "/brands/ChinaWok_Logo%20.jpg", alt: "China Wok" },
  { src: "/brands/McDonald's_logo%20.png", alt: "McDonald's" },
];

const row2: Brand[] = [
  { src: "/brands/Papa_Johns_logo%20.png", alt: "Papa John's" },
  { src: "/brands/logo_tapachula_franquician%20.jpg", alt: "Tapachula" },
  { src: "/brands/TacoPollo_Logo%20.png", alt: "Taco Pollo" },
  { src: "/brands/LaCacerola_logo%20.jpg", alt: "La Cacerola" },
  { src: "/brands/LaPikalita_Logo%20.png", alt: "La Pikalita" },
  { src: "/brands/totosPizza_Logo%20.png", alt: "Toto's Pizza" },
  { src: "/brands/churrinChurron_logo%20.jpg", alt: "Churrin Churron" },
  { src: "/brands/PolloCampesino_Logo%20.jpg", alt: "Pollo Campesino" },
  { src: "/brands/BaleadasExpress_logo%20.jpg", alt: "Baleadas Express" },
  { src: "/brands/GoldChickenGold_Logo%20.png", alt: "Gold Chicken Gold" },
  { src: "/brands/PastelitosMonica_Logo%20.jpg", alt: "Pastelitos Mónica" },
  { src: "/brands/PolloselHondureño_logo%20.jpg", alt: "Pollos el Hondureño" },
  { src: "/brands/LaFondaMexicanFood_Logo%20.jpg", alt: "La Fonda Mexican Food" },
];

function MarqueeRow({
  items,
  duration,
  reverse = false,
}: {
  items: Brand[];
  duration: number;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group overflow-hidden">
      <div
        className={`flex w-max items-center gap-10 md:gap-12 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused]`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((brand, index) => (
          <div
            key={`${brand.alt}-${index}`}
            className="relative h-16 w-[150px] shrink-0 md:h-20 md:w-[180px]"
            aria-hidden={index >= items.length ? "true" : undefined}
          >
            <Image
              src={brand.src}
              alt={index >= items.length ? "" : brand.alt}
              fill
              sizes="180px"
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function RestaurantsBrands() {
  return (
    <section
      id="restaurants-brands"
      aria-labelledby="restaurants-brands-heading"
      className="bg-white pt-10 pb-24 md:pb-28 lg:pb-32"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <AnimatedSectionTitle id="restaurants-brands-heading" width="wide">
          Ellos ya forman parte de Bip Bip
        </AnimatedSectionTitle>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        className="mt-16 flex flex-col gap-8 md:gap-10"
      >
        <MarqueeRow items={row1} duration={50} />
        <MarqueeRow items={row2} duration={55} reverse />
      </motion.div>
    </section>
  );
}
