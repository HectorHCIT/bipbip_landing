"use client";

import Image from "next/image";
import { motion } from "motion/react";

const features = [
  {
    icon: "/icons/moto.svg",
    title: "Envío a domicilio",
    body: "Tu comida favorita, directo a tu puerta. Pide con Bipbip y relájate mientras nosotros la llevamos.",
  },
  {
    icon: "/icons/bag.svg",
    title: "Recoger en Restaurante",
    body: "Ordena desde la app y recoge tu pedido sin esperas. ¡Comodidad en cada paso!",
  },
  {
    icon: "/icons/spoon.svg",
    title: "Comer en Restaurante",
    body: "Ordena desde la app y recoge tu pedido sin esperas. ¡Comodidad en cada paso!",
  },
] as const;

export default function FeatureGrid() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white pt-20 pb-30 md:pt-24 md:pb-36 lg:pt-28 lg:pb-40"
      aria-labelledby="features-heading"
    >
      <div className="relative mx-auto w-11/12">
        <header className="flex flex-col items-center gap-2 text-center">
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[40px] leading-[48px] md:text-[48px] md:leading-[56px] font-bold font-sans text-brand-black"
          >
            Elije cómo disfrutar tu comida
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            style={{ originX: 0 }}
            className="w-[260px] md:w-[420px] lg:w-[552px]"
          >
            <Image
              src="/illustration/headline-underline.png"
              alt=""
              aria-hidden="true"
              width={552}
              height={12}
              className="w-full h-auto"
            />
          </motion.div>
        </header>

        <div className="relative mt-24 grid grid-cols-1 gap-20 md:grid-cols-3 md:gap-12 lg:gap-20 lg:max-w-[1060px] lg:mx-auto">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={
                index === 0
                  ? { opacity: 0, x: -48 }
                  : index === 2
                    ? { opacity: 0, x: 48 }
                    : { opacity: 0, y: 32 }
              }
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className={
                "relative flex flex-col items-center gap-6 rounded-3xl bg-white px-8 pt-12 pb-6 shadow-[0_5px_12px_rgba(0,0,0,0.05)]" +
                (index === 1 ? " md:mt-25" : "")
              }
            >
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 flex size-22 items-center justify-center rounded-full bg-white shadow-[0_5px_12px_rgba(0,0,0,0.08)]">
                <Image
                  src={feature.icon}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  className="size-14"
                />
              </div>
              <h3 className="text-[20px] leading-7 font-bold font-sans text-brand-black text-center">
                {feature.title}
              </h3>
              <p className="text-[16px] leading-6 tracking-[0.2px] font-sans text-brand-black text-center">
                {feature.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 bottom-0 hidden lg:block w-[538px] h-[342px] select-none"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.div
          className="relative size-full"
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/floating/cubo%20pollo.svg"
            alt=""
            fill
            className="object-contain object-left-bottom"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
