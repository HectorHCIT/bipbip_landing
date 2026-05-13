"use client";

import Image from "next/image";
import { motion } from "motion/react";
import BadgeLink from "@/components/ui/badge-link";
import { cdn } from "@/lib/cdn";

const floatingItems = [
  {
    src: cdn("/floating/burguer.svg"),
    width: 343,
    height: 309,
    className: "absolute top-[16px] left-[45px]",
    delay: 0,
    priority: true,
  },
  {
    src: cdn("/floating/pizza.svg"),
    width: 253,
    height: 171,
    className: "absolute top-0 left-[334px]",
    delay: 0.4,
    priority: false,
  },
  {
    src: cdn("/floating/egg.svg"),
    width: 247,
    height: 178,
    className: "absolute top-[200px] left-[401px]",
    delay: 0.8,
    priority: false,
  },
  {
    src: cdn("/floating/cubo pollo.svg"),
    width: 281,
    height: 287,
    className: "absolute top-[291px] left-0",
    delay: 1.2,
    priority: false,
  },
  {
    src: cdn("/floating/rice wolk.svg"),
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
          src={cdn("/illustration/herotexture.svg")}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative mx-auto w-11/12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          <div className="flex flex-col gap-10 w-full mx-auto justify-center items-start">
            {/* TODO(TW-060): partial token match — none of the responsive sizes (36/44/52/56) match text-h2 (48px) exactly */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-[36px] leading-[44px] sm:text-[44px] sm:leading-[52px] md:text-[52px] md:leading-[60px] lg:text-[56px] lg:leading-[64px] font-bold font-sans text-brand-black w-full"
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
                src={cdn("/illustration/playstore.svg")}
                alt="Disponible en Google Play"
                width={209}
                height={62}
                className="rounded-lg w-[170px] md:w-[209px] [&_img]:w-full [&_img]:h-auto"
              />
              <BadgeLink
                href="https://apps.apple.com/"
                src={cdn("/illustration/appstore.svg")}
                alt="Descargar en App Store"
                width={186}
                height={62}
                className="rounded-lg w-[170px] md:w-[186px] [&_img]:w-full [&_img]:h-auto"
              />
            </motion.div>
          </div>

          <div
            className="hidden md:flex relative md:h-[640px] lg:h-[886px] items-center justify-center overflow-hidden"
            aria-hidden="true"
          >
            <div className="relative w-[648px] h-[591px] md:scale-100 lg:scale-[1.5] origin-center">
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
                  viewport={{ amount: 0.1 }}
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
                    className="w-auto h-auto"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
