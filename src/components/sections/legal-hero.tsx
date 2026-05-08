import Image from "next/image";

export default function LegalHero({ title }: { title: string }) {
  return (
    <section
      aria-labelledby="legal-hero-heading"
      className="relative h-[420px] md:h-[480px] lg:h-[530px] overflow-hidden"
    >
      <Image
        src="/illustration/Overlay%2BBackground.jpg"
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
