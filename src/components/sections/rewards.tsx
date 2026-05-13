"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Button from "@/components/ui/button";
import { cdn } from "@/lib/cdn";

const benefits = [
  {
    illust: cdn("/icons/moto.svg"),
    title: "Envío gratis",
    illustSize: 84,
    illustOffsetTop: -64,
  },
  {
    illust: cdn("/floating/burguer.svg"),
    title: "Productos gratis",
    illustSize: 132,
    illustOffsetTop: -76,
  },
  {
    illust: cdn("/icons/discountcupons.svg"),
    title: "Cupones de descuento",
    illustSize: 110,
    illustOffsetTop: -60,
  },
] as const;

const coins = [
  { className: "top-[2%] right-[2%] w-[120px] lg:w-[141px]", rotate: -11, delay: 0 },
  { className: "top-[42%] right-[-2%] w-[80px] lg:w-[90px]", rotate: 11, delay: 0.6 },
  { className: "top-[64%] right-[3%] w-[120px] lg:w-[141px]", rotate: -11, delay: 1.2 },
  { className: "top-[18%] left-[-2%] w-[120px] lg:w-[141px]", rotate: 11, delay: 0.3 },
  { className: "top-[52%] left-[8%] w-[70px] lg:w-[78px]", rotate: -11, delay: 0.9 },
  { className: "top-[78%] left-[1%] w-[120px] lg:w-[141px]", rotate: 11, delay: 1.5 },
] as const;

export default function Rewards() {
  return (
    <section
      id="rewards"
      className="relative overflow-hidden bg-white pt-24 pb-20 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28"
      aria-labelledby="rewards-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block select-none"
      >
        {coins.map((coin, i) => (
          <motion.div
            key={i}
            className={`absolute ${coin.className}`}
            initial={{ opacity: 0, scale: 0.6, rotate: coin.rotate }}
            whileInView={{ opacity: 1, scale: 1, rotate: coin.rotate }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.6,
              delay: coin.delay * 0.15,
              ease: "easeOut",
            }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4 + coin.delay * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: coin.delay,
              }}
            >
              <Image
                src={cdn("/floating/coin.svg")}
                alt=""
                width={141}
                height={141}
                className="h-auto w-full drop-shadow-[0_8px_16px_rgba(253,195,0,0.25)]"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto w-11/12 max-w-[1280px]">
        <header className="flex flex-col items-center gap-2 text-center">
          <motion.h2
            id="rewards-heading"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="text-[36px] leading-[44px] md:text-h2 font-bold font-sans text-brand-primary"
          >
            ¡Gana más con cada compra!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
            className="text-[18px] leading-7 md:text-h5 font-bold font-sans text-brand-black"
          >
            Acumula puntos y desbloquea increíbles recompensas.
          </motion.p>
          {/* TODO(TW-060): partial token match — text-s2/text-s1 cover size+line-height+weight; tracking-[0.2px] is not part of these tokens */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, delay: 0.24, ease: "easeOut" }}
            className="mt-2 max-w-[842px] text-s2 md:text-s1 tracking-[0.2px] font-sans text-brand-black"
          >
            En Bipbip, cada pedido te acerca a obtener más beneficios. Sube de
            nivel con tus compras y disfruta de productos gratis, envíos sin
            costo, descuentos exclusivos, ¡y mucho más!
          </motion.p>
        </header>

        <div className="relative mt-32 grid grid-cols-1 gap-24 md:grid-cols-3 md:gap-12 lg:gap-20">
          {benefits.map((benefit, index) => (
            <motion.article
              key={benefit.title}
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
              className="relative flex flex-col items-center justify-center gap-8 rounded-2xl bg-white px-8 py-6 shadow-card"
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center drop-shadow-[0_5px_10px_rgba(0,0,0,0.2)]"
                style={{
                  top: benefit.illustOffsetTop,
                  width: benefit.illustSize,
                  height: benefit.illustSize,
                }}
              >
                <Image
                  src={benefit.illust}
                  alt=""
                  aria-hidden="true"
                  width={benefit.illustSize}
                  height={benefit.illustSize}
                  className="size-full object-contain"
                />
              </div>
              <h3 className="text-[20px] leading-7 font-bold font-sans text-brand-black text-center whitespace-nowrap">
                {benefit.title}
              </h3>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        >
          <Button variant="primary" size="lg" href="#download" className="text-white">
            Regístrate en BipBip
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
