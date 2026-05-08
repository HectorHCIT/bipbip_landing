"use client";

import Image from "next/image";
import { motion } from "motion/react";

const cards = [
  {
    icon: "/restaurants/image%2084.svg",
    iconSize: 90,
    iconOffset: 63,
    title: "Mayor alcance",
    body: "Aumenta la visibilidad de tu restaurante frente a nuevos clientes.",
  },
  {
    icon: "/restaurants/Rectangle%20545.svg",
    iconSize: 106,
    iconOffset: 72,
    title: "Canal adicional de ventas",
    body: "Recibe pedidos desde una plataforma diseñada para facilitar tu operación.",
  },
  {
    icon: "/restaurants/Rectangle%20546.svg",
    iconSize: 106,
    iconOffset: 72,
    title: "Crecimiento para tu negocio",
    body: "Genera más ingresos con una solución enfocada en impulsar tus ventas.",
  },
] as const;

export default function RestaurantsFeatures() {
  return (
    <section
      id="restaurants-features"
      className="relative overflow-hidden bg-white pt-20 pb-20 md:pt-24 md:pb-28 lg:pt-28 lg:pb-32"
      aria-labelledby="restaurants-features-heading"
    >
      <div className="relative mx-auto w-11/12">
        <header className="flex flex-col items-center gap-2 text-center">
          <motion.h2
            id="restaurants-features-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[40px] leading-[48px] md:text-[48px] md:leading-[56px] font-bold font-sans text-brand-black"
          >
            Haz crecer tu restaurante con BipBip
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

        <div className="relative mt-32 grid grid-cols-1 gap-24 md:grid-cols-3 md:gap-12 lg:gap-20 lg:max-w-[1060px] lg:mx-auto">
          {cards.map((card, index) => (
            <motion.article
              key={card.title}
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
              whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
              className={
                "relative flex flex-col items-center gap-4 rounded-3xl bg-white px-8 pt-10 pb-6 shadow-[0_5px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-shadow" +
                (index === 1 ? " md:mt-25" : "")
              }
            >
              <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                  top: `-${card.iconOffset}px`,
                  width: `${card.iconSize}px`,
                  height: `${card.iconSize}px`,
                }}
                initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  type: "spring",
                  stiffness: 220,
                  damping: 12,
                  delay: 0.3 + index * 0.15,
                }}
              >
                <motion.div
                  className="relative size-full"
                  animate={{ y: [0, -6, 0] }}
                  transition={{
                    duration: 3 + index * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1 + index * 0.2,
                  }}
                >
                  <Image
                    src={card.icon}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes={`${card.iconSize}px`}
                    className="object-contain"
                  />
                </motion.div>
              </motion.div>
              <h3 className="text-[20px] leading-7 font-bold font-sans text-brand-black text-center">
                {card.title}
              </h3>
              <p className="text-[16px] leading-6 tracking-[0.2px] font-sans text-brand-black text-center">
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
