import Image from "next/image";
import AnimatedSectionTitle from "@/components/ui/animated-section-title";
import { cdn } from "@/lib/cdn";

type Brand = { src: string; alt: string };

const row1: Brand[] = [
  { src: cdn("/brands/KFC_logo .jpg"), alt: "KFC" },
  { src: cdn("/brands/cinnabon_logo .png"), alt: "Cinnabon" },
  { src: cdn("/brands/Wingstreet_Logo .png"), alt: "WingStreet" },
  { src: cdn("/brands/Wendys-logo .jpg"), alt: "Wendy's" },
  { src: cdn("/brands/PizzaHut_logo .jpg"), alt: "Pizza Hut" },
  { src: cdn("/brands/TatosWings_Logo .png"), alt: "Tato's Wings" },
  { src: cdn("/brands/Bigos_Logo .jpg"), alt: "Bigos" },
  { src: cdn("/brands/Chitos_Logo .jpg"), alt: "Chitos" },
  { src: cdn("/brands/Dennys_Logo .png"), alt: "Denny's" },
  { src: cdn("/brands/Fridays_logo .png"), alt: "TGI Fridays" },
  { src: cdn("/brands/Alamitos_Logo .png"), alt: "Alamitos" },
  { src: cdn("/brands/ChinaWok_Logo .jpg"), alt: "China Wok" },
  { src: cdn("/brands/McDonald's_logo .png"), alt: "McDonald's" },
];

const row2: Brand[] = [
  { src: cdn("/brands/Papa_Johns_logo .png"), alt: "Papa John's" },
  { src: cdn("/brands/logo_tapachula_franquician .jpg"), alt: "Tapachula" },
  { src: cdn("/brands/TacoPollo_Logo .png"), alt: "Taco Pollo" },
  { src: cdn("/brands/LaCacerola_logo .jpg"), alt: "La Cacerola" },
  { src: cdn("/brands/LaPikalita_Logo .png"), alt: "La Pikalita" },
  { src: cdn("/brands/totosPizza_Logo .png"), alt: "Toto's Pizza" },
  { src: cdn("/brands/churrinChurron_logo .jpg"), alt: "Churrin Churron" },
  { src: cdn("/brands/PolloCampesino_Logo .jpg"), alt: "Pollo Campesino" },
  { src: cdn("/brands/BaleadasExpress_logo .jpg"), alt: "Baleadas Express" },
  { src: cdn("/brands/GoldChickenGold_Logo .png"), alt: "Gold Chicken Gold" },
  { src: cdn("/brands/PastelitosMonica_Logo .jpg"), alt: "Pastelitos Mónica" },
  { src: cdn("/brands/PolloselHondureño_logo .jpg"), alt: "Pollos el Hondureño" },
  { src: cdn("/brands/LaFondaMexicanFood_Logo .jpg"), alt: "La Fonda Mexican Food" },
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
    <div
      className="group overflow-hidden"
      role="region"
      aria-label="Marcas asociadas"
    >
      <div
        className={`flex w-max items-center gap-10 md:gap-12 ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        } group-hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:[animation:none]`}
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

      <div className="anim-reveal-up mt-16 flex flex-col gap-8 md:gap-10">
        <MarqueeRow items={row1} duration={50} />
        <MarqueeRow items={row2} duration={55} reverse />
      </div>
    </section>
  );
}
