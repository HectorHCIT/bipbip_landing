"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function RestaurantsHero() {
  return (
    <section
      id="restaurants-hero"
      aria-labelledby="restaurants-heading"
      className="pt-32 md:pt-36 lg:pt-32 pb-16"
    >
      <div className="mx-auto w-11/12 max-w-[1280px]">
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-[40px] bg-white shadow-[0px_10px_40px_0px_rgba(0,0,0,0.10)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch lg:min-h-[631px]">
            <div className="flex flex-col justify-center gap-10 px-8 py-12 md:px-10 md:py-16 lg:px-10 lg:py-18">
              <div className="flex flex-col gap-4">
                <motion.h1
                  id="restaurants-heading"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-[40px] leading-[44px] md:text-[56px] md:leading-[60px] font-bold font-sans text-brand-black"
                >
                  Haz que tu restaurante venda más
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
                  className="text-b2 text-brand-black"
                >
                  Aumenta tu alcance, recibe más pedidos y genera nuevos ingresos con una plataforma diseñada para hacer crecer tu negocio.
                </motion.p>
              </div>

              <motion.button
                type="button"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="h-12 w-full max-w-[288px] rounded-lg bg-brand-primary px-4 text-button text-white shadow-[0px_5px_24px_0px_rgba(0,0,0,0.05)] transition-opacity hover:opacity-95"
              >
                Aplicar ahora
              </motion.button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
              className="relative min-h-[320px] lg:min-h-[631px] overflow-hidden"
            >
              <Image
                src="/restaurants/Frame%201000002487.png"
                alt="Mesa de restaurante con hamburguesas y bebidas"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 640px"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
