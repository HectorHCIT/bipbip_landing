import Image from "next/image";
import type { ReactElement } from "react";

type HeroCardVariant = "split-547" | "split-50";

const variants = {
  "split-547": {
    grid: "lg:grid-cols-[minmax(0,547px)_1fr]",
    padding: "px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-18",
    bodyClass: "text-b2 md:max-w-[295px]",
    sizes: "(max-width: 1024px) 100vw, 733px",
  },
  "split-50": {
    grid: "lg:grid-cols-2",
    padding: "px-8 py-12 md:px-10 md:py-16 lg:px-10 lg:py-18",
    bodyClass: "text-b2",
    sizes: "(max-width: 1024px) 100vw, 640px",
  },
} as const;

export default function HeroCard({
  sectionId,
  headingId,
  variant = "split-547",
  title,
  body,
  ctaLabel,
  ctaHref,
  imageSrc,
  imageAlt,
}: {
  sectionId: string;
  headingId: string;
  variant?: HeroCardVariant;
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
}): ReactElement {
  const v = variants[variant];
  // STY-005: replacing this ad-hoc CTA with the shared <Button> component is
  // out of scope here — requires verifying the variant prop API across pages.
  const ctaClass =
    "anim-load-up anim-delay-3 inline-flex h-12 w-full md:max-w-[288px] items-center justify-center rounded-lg bg-brand-primary px-4 text-button text-white shadow-cta transition-[opacity,transform] duration-200 hover:opacity-95 hover:scale-[1.02] active:scale-[0.98]";

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="pt-32 md:pt-36 lg:pt-32 pb-16"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <div className="anim-load-up relative overflow-hidden rounded-[40px] bg-white shadow-hero-card">
          {/* Mobile-only background image (decorative) */}
          <div
            aria-hidden="true"
            className="anim-load-scale anim-delay-2 absolute inset-0 md:hidden"
          >
            <Image
              src={imageSrc}
              alt=""
              fill
              className="object-cover"
              priority
              sizes="(max-width: 767px) 92vw, 1px"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          <div className={`relative grid grid-cols-1 ${v.grid} items-stretch min-h-[520px] md:min-h-0 lg:min-h-[631px]`}>
            <div className={`relative z-10 flex flex-col justify-center gap-10 lg:gap-12 ${v.padding}`}>
              <div className="flex flex-col gap-4">
                <h1
                  id={headingId}
                  // TODO(TW-060): no exact text token for 40/44 (mobile) or 56/60 (desktop); h2 is 48/56
                  className="anim-load-up text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] font-bold font-sans text-white md:text-brand-black"
                >
                  {title}
                </h1>
                <p className={`anim-load-up anim-delay-1 ${v.bodyClass} text-white md:text-brand-black`}>
                  {body}
                </p>
              </div>
              {ctaHref ? (
                <a href={ctaHref} className={ctaClass}>
                  {ctaLabel}
                </a>
              ) : (
                <button type="button" className={ctaClass}>
                  {ctaLabel}
                </button>
              )}
            </div>
            {/* Desktop image column */}
            <div className="anim-load-scale anim-delay-2 hidden md:block relative md:min-h-[320px] lg:min-h-[631px] overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes={v.sizes}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
