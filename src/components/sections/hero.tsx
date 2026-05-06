import Image from "next/image";
import BadgeLink from "@/components/ui/badge-link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-primary text-white pt-24 md:pt-28 lg:pt-32 pb-16 md:pb-20 lg:pb-24"
      aria-labelledby="hero-heading"
    >
      {/* Decorative red textured background */}
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
      >
        <Image
          src="/illustration/herotexture.svg"
          alt=""
          fill
          className="object-cover object-center"
          priority={false}
        />
      </div>

      {/* Content container */}
      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8 min-h-[480px]">
          {/* Left column — headline + badges */}
          <div className="flex flex-col gap-8 max-w-xl">
            <h1
              id="hero-heading"
              className="text-h2 font-sans text-white tracking-tight"
            >
              Tú comida favorita, más cerca que nunca!
            </h1>

            <div className="flex flex-wrap gap-4">
              <BadgeLink
                href="https://play.google.com/store/apps"
                src="/illustration/playstore.svg"
                alt="Disponible en Google Play"
              />
              <BadgeLink
                href="https://apps.apple.com/"
                src="/illustration/appstore.svg"
                alt="Descargar en App Store"
              />
            </div>
          </div>

          {/* Right column — floating food illustrations (desktop only) */}
          <div
            className="hidden lg:block relative h-[480px] w-full"
            aria-hidden="true"
          >
            {/* Burguer — top right */}
            <Image
              src="/floating/burguer.svg"
              alt=""
              width={200}
              height={200}
              className="absolute top-0 right-8"
              aria-hidden="true"
              priority
            />

            {/* Pizza — top left of cluster */}
            <Image
              src="/floating/pizza.svg"
              alt=""
              width={140}
              height={140}
              className="absolute top-12 left-0"
              aria-hidden="true"
            />

            {/* Cubo Pollo — middle right (red striped bucket) */}
            <Image
              src="/floating/cubo%20pollo.svg"
              alt=""
              width={180}
              height={180}
              className="absolute top-44 right-32"
              aria-hidden="true"
            />

            {/* Egg — small accent, mid-left */}
            <Image
              src="/floating/egg.svg"
              alt=""
              width={90}
              height={90}
              className="absolute top-56 left-16"
              aria-hidden="true"
            />

            {/* Rice wolk — bottom right */}
            <Image
              src="/floating/rice%20wolk.svg"
              alt=""
              width={170}
              height={170}
              className="absolute bottom-0 right-0"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
