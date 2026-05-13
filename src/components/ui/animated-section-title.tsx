"use client";

import Image from "next/image";
import { motion } from "motion/react";
import type { ReactElement, ReactNode } from "react";
import { cdn } from "@/lib/cdn";

const widthMap = {
  default: "w-[260px] md:w-[420px] lg:w-[552px]",
  wide: "w-[320px] md:w-[520px] lg:w-[681px]",
} as const;

export type AnimatedSectionTitleWidth = keyof typeof widthMap;

export default function AnimatedSectionTitle({
  id,
  width = "default",
  children,
}: {
  id: string;
  width?: AnimatedSectionTitleWidth;
  children: ReactNode;
}): ReactElement {
  return (
    <header className="flex flex-col items-center gap-2 text-center">
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="text-[40px] leading-[48px] md:text-h2 font-bold font-sans text-brand-black"
      >
        {children}
      </motion.h2>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
        style={{ originX: 0 }}
        className={widthMap[width]}
      >
        <Image
          src={cdn("/illustration/headline-underline.png")}
          alt=""
          aria-hidden="true"
          width={width === "wide" ? 681 : 552}
          height={12}
          className="w-full h-auto"
        />
      </motion.div>
    </header>
  );
}
