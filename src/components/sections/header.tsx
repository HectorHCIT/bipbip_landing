"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import NavLink from "@/components/ui/nav-link";

const SCROLL_THRESHOLD = 80;

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > SCROLL_THRESHOLD);
  });

  return (
    <motion.header
      id="top"
      initial={false}
      animate={{
        top: isScrolled ? 8 : 24,
        boxShadow: isScrolled
          ? "0 10px 30px rgba(0,0,0,0.18)"
          : "0 0 0 rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-1/2 z-50 w-11/12 -translate-x-1/2 rounded-[48px] bg-[#fb0021] text-white"
    >
      <div className="flex items-center gap-10 px-10 py-4">
        <a href="#top" aria-label="BipBip — ir al inicio" className="shrink-0">
          <Image
            src="/illustration/Logonav.svg"
            alt="BipBip"
            width={167}
            height={48}
            priority
          />
        </a>

        <nav
          aria-label="Principal"
          className="hidden md:flex flex-1 items-center justify-end gap-10"
        >
          <NavLink href="#hero">Inicio</NavLink>
          <NavLink href="#download">App</NavLink>
          <NavLink href="#rewards">Programa de Lealtad</NavLink>
          <NavLink href="#help">Contáctanos</NavLink>
        </nav>
      </div>
    </motion.header>
  );
}
