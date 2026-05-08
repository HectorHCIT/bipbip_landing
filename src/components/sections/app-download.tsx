"use client";

import Image from "next/image";
import { motion } from "motion/react";
import BadgeLink from "@/components/ui/badge-link";

const IOS_URL = "https://apps.apple.com/";
const ANDROID_URL = "https://play.google.com/store/apps";

export default function AppDownload() {
  return (
    <section
      id="download"
      className="relative bg-white py-32 md:py-36 lg:py-44"
      aria-labelledby="download-heading"
    >
      <div className="relative mx-auto w-11/12">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 -right-8 w-[300px] md:-top-12 md:right-0 md:w-[300px] lg:-top-16 lg:w-[340px] z-10 select-none"
          initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [0, 3, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/floating/pizza.svg"
              alt=""
              width={340}
              height={230}
              style={{ width: "auto", height: "auto" }}
              className="w-full"
            />
          </motion.div>
        </motion.div>

        <div className="relative lg:aspect-[1280/450]">
          <svg
            aria-hidden="true"
            viewBox="0 0 360 600"
            preserveAspectRatio="none"
            className="lg:hidden absolute inset-0 w-full h-full pointer-events-none select-none text-brand-primary"
          >
            <path
              fill="currentColor"
              d="M 29,83 L 331,7 Q 360,0 360,30 L 360,480 Q 360,510 331,517 L 29,593 Q 0,600 0,570 L 0,120 Q 0,90 29,83 Z"
            />
          </svg>
          <svg
            aria-hidden="true"
            viewBox="0 0 1280 450"
            preserveAspectRatio="none"
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none text-brand-primary"
          >
            <path
              fill="currentColor"
              d="M 80,60 L 1230,15 Q 1280,15 1280,65 L 1280,395 Q 1280,445 1230,440 L 80,390 Q 30,390 30,345 L 30,100 Q 30,55 80,60 Z"
            />
          </svg>
          <div className="relative grid h-full grid-cols-1 lg:grid-cols-2 items-center gap-10 lg:gap-16 px-6 py-28 pb-36 md:px-12 md:py-32 md:pb-40 lg:px-24 lg:py-0 lg:pb-0">
            <motion.div
              className="relative flex justify-center lg:justify-start lg:-translate-x-8 lg:-translate-y-6"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            >
              <Image
                src="/illustration/phonepreview.svg"
                alt=""
                aria-hidden="true"
                width={420}
                height={520}
                style={{ width: "auto", height: "auto" }}
                className="w-full max-w-[316px] md:max-w-[380px] lg:max-w-[420px] drop-shadow-[20px_20px_64px_rgba(0,0,0,0.45)]"
              />
            </motion.div>

            <div className="flex flex-col items-center gap-6 text-center lg:text-center lg:items-center">
              <motion.h2
                id="download-heading"
                className="text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] lg:text-h2 font-bold font-sans text-white"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                ¡Descarga la App y empieza a disfrutar!
              </motion.h2>

              <motion.p
                className="text-[18px] leading-6 tracking-[0.2px] font-semibold font-sans text-white max-w-[461px]"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              >
                Pide rápido y fácil de los mejores restaurantes de tu ciudad:
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2"
                initial={{ opacity: 0, x: 48 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              >
                <BadgeLink
                  href={ANDROID_URL}
                  src="/illustration/playstore.svg"
                  alt="Disponible en Google Play"
                  width={234}
                  height={70}
                  className="rounded-md"
                />
                <BadgeLink
                  href={IOS_URL}
                  src="/illustration/appstore.svg"
                  alt="Descargar en App Store"
                  width={210}
                  height={70}
                  className="rounded-md"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
