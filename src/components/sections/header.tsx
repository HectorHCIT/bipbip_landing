"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const SCROLL_THRESHOLD = 80;

const navItems = [
  { href: "/#hero", label: "Inicio" },
  { href: "/#download", label: "App" },
  { href: "/#rewards", label: "Programa de Lealtad" },
  { href: "/#help", label: "Contáctanos" },
] as const;

const navLinkClass =
  "text-[18px] leading-7 font-semibold text-white hover:text-brand-yellow focus-visible:text-brand-yellow transition-colors";

export default function Header() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

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
      className="fixed left-1/2 z-50 w-11/12 -translate-x-1/2 rounded-[48px] bg-brand-primary text-white"
    >
      <div className="flex items-center gap-4 md:gap-10 px-6 md:px-10 py-4">
        <Link href="/" aria-label="BipBip — ir al inicio" className="shrink-0">
          <Image
            src="/illustration/Logonav.svg"
            alt="BipBip"
            width={167}
            height={48}
            priority
          />
        </Link>

        <nav
          aria-label="Principal"
          className="hidden md:flex flex-1 items-center justify-end gap-10"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="ml-auto md:hidden flex size-10 items-center justify-center rounded-full hover:bg-white/10 focus-visible:bg-white/10 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-6"
            aria-hidden="true"
          >
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </>
            ) : (
              <>
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </>
            )}
          </svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            id="mobile-nav"
            aria-label="Principal móvil"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="md:hidden overflow-hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pb-5 pt-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-[16px] leading-6 font-semibold hover:bg-white/10 focus-visible:bg-white/10 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
