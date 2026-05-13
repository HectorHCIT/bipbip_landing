"use client";

import Image from "next/image";
import { motion } from "motion/react";
import AnimatedSectionTitle from "@/components/ui/animated-section-title";
import FeatureCards, { type FeatureCard } from "@/components/ui/feature-cards";
import { cdn } from "@/lib/cdn";

const cards = [
  {
    icon: cdn("/drivers/image84.png"),
    iconSize: 90,
    iconOffset: 63,
    title: "Tu tiempo tus horas",
    body: "Tu decide en que horarios y días trabajar.",
  },
  {
    icon: cdn("/drivers/Rectangle545.png"),
    iconSize: 106,
    iconOffset: 72,
    title: "Establece tu zona de trabajo",
    body: "Establece en que zonas y cuales órdenes entregar.",
  },
  {
    icon: cdn("/drivers/Rectangle546.png"),
    iconSize: 106,
    iconOffset: 72,
    title: "Genera ingresos",
    body: "Por cada orden entregada vas a generar ingresos.",
  },
] as const satisfies ReadonlyArray<FeatureCard>;

export default function DriversFeatures() {
  return (
    <section
      id="drivers-features"
      aria-labelledby="drivers-features-heading"
      className="relative overflow-hidden bg-white pt-20 pb-32 md:pt-24 md:pb-44 lg:pt-28 lg:pb-56"
    >
      <div className="relative mx-auto w-11/12">
        <AnimatedSectionTitle id="drivers-features-heading">
          Únete a la Bip Bip
        </AnimatedSectionTitle>
        <FeatureCards cards={cards} />
      </div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-6 top-12 hidden md:block w-[234px] h-[156px] select-none"
        initial={{ opacity: 0, rotate: -12 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative size-full"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={cdn("/floating/pizza.svg")}
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 234px"
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute right-8 bottom-16 hidden md:block w-[260px] h-[240px] select-none"
        initial={{ opacity: 0, rotate: 12 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="relative size-full"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <Image
            src={cdn("/drivers/60236155.svg")}
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 260px"
            className="object-contain"
          />
        </motion.div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 bottom-0 hidden md:block w-[420px] h-[380px] select-none"
        initial={{ opacity: 0, x: -120 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="relative size-full"
          animate={{ y: [0, -4, 0, -2, 0] }}
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <Image
            src={cdn("/drivers/driverinmotoanimado.webp")}
            alt=""
            fill
            sizes="(max-width: 768px) 0px, 420px"
            className="object-contain object-left-bottom"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
