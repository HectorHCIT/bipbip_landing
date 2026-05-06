import Image from "next/image";
import NavLink from "@/components/ui/nav-link";

export default function Header() {
  return (
    <header
      id="top"
      className="absolute inset-x-0 top-0 z-20 bg-[#fb0021] text-white"
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-5">
        {/* ── Logo (left) ──────────────────────────────────────────────── */}
        <a href="#top" aria-label="BipBip — ir al inicio" className="shrink-0">
          <Image
            src="/illustration/Logonav.svg"
            alt="BipBip"
            width={140}
            height={42}
            priority
          />
        </a>

        {/* ── Primary nav — hidden on mobile, shown on md+ ─────────────── */}
        <nav
          aria-label="Principal"
          className="hidden md:flex items-center gap-6 lg:gap-8"
        >
          <NavLink href="#hero">Inicio</NavLink>
          <NavLink href="#features">Cómo funciona</NavLink>
          <NavLink href="#rewards">Programa de calidad</NavLink>
          <NavLink href="#partners">Aliados</NavLink>
          <NavLink href="#help">Contáctanos</NavLink>
        </nav>

        {/*
         * TODO(landing-v1): hamburger menu deferred per spec (SHOULD, not MUST).
         * When promoted, convert this file to 'use client', add useState toggle,
         * render a <button aria-label="Abrir menú"> with the mobile nav panel.
         */}
      </div>
    </header>
  );
}
