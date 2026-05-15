"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cdn } from "@/lib/cdn";

const SCROLL_THRESHOLD = 80;

const navItems = [
  { href: "/#hero", label: "Inicio" },
  { href: "/#download", label: "App" },
  { href: "/#rewards", label: "Programa de Lealtad" },
  { href: "/#help", label: "Contáctanos" },
] as const;

// TODO(TW-060): text-s2/text-s1 tokens use leading 24px (line-height 1.5rem),
// but the design here uses leading-7 (28px). Either widen the token line-height
// or define a header-specific text token before swapping these utilities.
const navLinkClass =
  "relative whitespace-nowrap text-[15px] xl:text-[18px] leading-7 font-semibold text-white transition-colors hover:text-brand-yellow focus-visible:text-brand-yellow after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-brand-yellow after:scale-x-0 after:origin-center hover:after:scale-x-100 focus-visible:after:scale-x-100 after:transition-transform after:duration-300";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      id="top"
      className={`fixed left-1/2 -translate-x-1/2 z-50 w-11/12 rounded-[28px] md:rounded-[48px] bg-brand-primary text-white transition-[top,box-shadow] duration-300 ease-out ${
        isScrolled
          ? "top-2 shadow-header-glow"
          : "top-6 shadow-header-glow-soft"
      }`}
    >
      <div className="flex items-center gap-4 md:gap-6 lg:gap-8 xl:gap-10 px-5 md:px-6 lg:px-8 xl:px-10 py-3.5 md:py-4">
        <Link href="/" aria-label="BipBip — ir al inicio" className="shrink-0">
          <Image
            src={cdn("/illustration/Logonav.svg")}
            alt="BipBip"
            width={167}
            height={48}
            priority
            className="h-9 md:h-12 w-auto"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>

        <nav
          aria-label="Principal"
          className="hidden lg:flex flex-1 items-center justify-end gap-5 xl:gap-10"
        >
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
          <Link
            href="/#download"
            className="inline-flex shrink-0 whitespace-nowrap items-center justify-center h-11 rounded-full bg-white px-5 text-button text-brand-primary shadow-cta hover:opacity-90 focus-visible:opacity-90 transition-opacity"
          >
            Descargar app
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="ml-auto lg:hidden flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full hover:bg-white/10 focus-visible:bg-white/10 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="size-5"
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

      <div
        className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <nav
          id="mobile-nav"
          aria-label="Principal móvil"
          aria-hidden={!open}
          className="overflow-hidden"
        >
          <ul className="flex flex-col gap-1 px-5 pb-4 pt-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  tabIndex={open ? 0 : -1}
                  className="block rounded-lg px-3 py-3 text-[16px] leading-6 font-semibold hover:bg-white/10 focus-visible:bg-white/10 transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="px-3 pt-3 pb-1">
              <Link
                href="/#download"
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                className="flex items-center justify-center h-11 w-full rounded-full bg-white text-button text-brand-primary shadow-cta hover:opacity-90 focus-visible:opacity-90 transition-opacity"
              >
                Descargar app
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
