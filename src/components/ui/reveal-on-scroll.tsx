"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

export type RevealOnScrollProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  amount?: number;
  className?: string;
};

export default function RevealOnScroll({
  children,
  delay = 0,
  y = 24,
  duration = 0.55,
  amount = 0.2,
  className,
}: RevealOnScrollProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
