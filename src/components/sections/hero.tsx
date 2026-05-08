"use client";

import Image from "next/image";
import { motion } from "motion/react";
import BadgeLink from "@/components/ui/badge-link";

const floatingItems = [
  {
    src: "/floating/burguer.svg",
    width: 343,
    height: 309,
    className: "absolute top-[16px] left-[45px]",
    delay: 0,
    priority: false,
  },
  {
    src: "/floating/pizza.svg",
    width: 253,
    height: 171,
    className: "absolute top-0 left-[334px]",
    delay: 0.4,
    priority: false,
  },
  {
    src: "/floating/egg.svg",
    width: 247,
    height: 178,
    className: "absolute top-[200px] left-[401px]",
    delay: 0.8,
    priority: false,
  },
  {
    src: "/floating/cubo%20pollo.svg",
    width: 281,
    height: 287,
    className: "absolute top-[291px] left-0",
    delay: 1.2,
    priority: false,
  },
  {
    src: "/floating/rice%20wolk.svg",
    width: 204,
    height: 263,
    className: "absolute top-[328px] left-[362px]",
    delay: 1.6,
    priority: false,
  },
] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-primary text-brand-black pt-32 md:pt-36 lg:pt-32 pb-16 md:pb-20 lg:pb-20"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
      >
        <Image
          src="/illustration/herotexture.svg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative mx-auto w-11/12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="flex flex-col gap-10 w-full mx-auto justify-center items-start">
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[48px] leading-[72px] font-bold font-sans text-brand-black w-full"
            >
              Tu comida favorita, más cerca que nunca!
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-4"
            >
              <BadgeLink
                href="https://play.google.com/store/apps"
                src="/illustration/playstore.svg"
                alt="Disponible en Google Play"
                width={209}
                height={62}
                className="rounded-lg"
              />
              <BadgeLink
                href="https://apps.apple.com/"
                src="/illustration/appstore.svg"
                alt="Descargar en App Store"
                width={186}
                height={62}
                className="rounded-lg"
              />
            </motion.div>
          </div>

          <div
            className="hidden lg:block relative w-[648px] h-[591px] mx-auto scale-[1.5] origin-center"
            aria-hidden="true"
          >
            {floatingItems.map((item) => (
              <motion.div
                key={item.src}
                className={item.className}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.5, delay: item.delay * 0.15 },
                  scale: { duration: 0.5, delay: item.delay * 0.15 },
                  y: {
                    duration: 4 + item.delay * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: item.delay,
                  },
                }}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={item.width}
                  height={item.height}
                  priority={item.priority}
                  style={{ width: "auto", height: "auto" }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
