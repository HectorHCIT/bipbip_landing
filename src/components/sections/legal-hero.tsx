import Image from "next/image";
import type { ReactElement } from "react";
import { cdn } from "@/lib/cdn";

export default function LegalHero({ title }: { title: string }): ReactElement {
  return (
    <section
      aria-labelledby="legal-hero-heading"
      className="relative h-[420px] md:h-[480px] lg:h-[530px] overflow-hidden rounded-b-3xl md:rounded-b-[40px]"
    >
      <Image
        src={cdn("/illustration/Overlay+Background.jpg")}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/50"
      />
      <div className="relative flex h-full items-center justify-center px-6 text-center">
        <h1
          id="legal-hero-heading"
          className="text-[28px] leading-[36px] md:text-[38px] md:leading-[44px] font-bold font-sans text-white"
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
