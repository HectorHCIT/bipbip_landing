"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactElement } from "react";

type HeroCardVariant = "split-547" | "split-50";

const variants = {
  "split-547": {
    grid: "lg:grid-cols-[minmax(0,547px)_1fr]",
    padding: "px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-18",
    bodyClass: "text-b2 text-brand-black max-w-[295px]",
    sizes: "(max-width: 1024px) 100vw, 733px",
  },
  "split-50": {
    grid: "lg:grid-cols-2",
    padding: "px-8 py-12 md:px-10 md:py-16 lg:px-10 lg:py-18",
    bodyClass: "text-b2 text-brand-black",
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
    "inline-flex h-12 w-full md:max-w-[288px] items-center justify-center rounded-lg bg-brand-primary px-4 text-button text-white shadow-cta transition-opacity hover:opacity-95";

  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="pt-32 md:pt-36 lg:pt-32 pb-16"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-[40px] bg-white shadow-hero-card"
        >
          <div className={`grid grid-cols-1 ${v.grid} items-stretch lg:min-h-[631px]`}>
            <div className={`flex flex-col justify-center gap-10 lg:gap-12 ${v.padding}`}>
              <div className="flex flex-col gap-4">
                <motion.h1
                  id={headingId}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  // TODO(TW-060): no exact text token for 40/44 (mobile) or 56/60 (desktop); h2 is 48/56
                  className="text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] font-bold font-sans text-brand-black"
                >
                  {title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  className={v.bodyClass}
                >
                  {body}
                </motion.p>
              </div>
              {ctaHref ? (
                <motion.a
                  href={ctaHref}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={ctaClass}
                >
                  {ctaLabel}
                </motion.a>
              ) : (
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={ctaClass}
                >
                  {ctaLabel}
                </motion.button>
              )}
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
              className="relative min-h-[320px] lg:min-h-[631px] overflow-hidden"
            >
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                priority
                sizes={v.sizes}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
