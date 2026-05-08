"use client";

import Image from "next/image";
import { motion } from "motion/react";
import BadgeLink from "@/components/ui/badge-link";
import SocialIconLink from "@/components/ui/social-icon-link";

const linkColumns = [
  {
    title: "Nosotros",
    links: [
      { href: "#rewards", label: "Loyalty Program" },
      { href: "#help", label: "Contáctanos" },
      { href: "/drivers", label: "Repartidores" },
      { href: "/restaurants", label: "Restaurantes" },
    ],
  },
  {
    title: "App Cliente",
    links: [
      { href: "/privacy", label: "Políticas de Privacidad" },
      { href: "/terms", label: "Términos & Condiciones" },
    ],
  },
  {
    title: "App Restaurantes",
    links: [
      { href: "/privacy", label: "Políticas de Privacidad" },
      { href: "/terms", label: "Términos & Condiciones" },
    ],
  },
] as const;

const socials = [
  { src: "/illustration/fb.svg", href: "https://facebook.com/", label: "Facebook" },
  { src: "/illustration/ig.svg", href: "https://instagram.com/", label: "Instagram" },
  { src: "/illustration/x.svg", href: "https://x.com/", label: "X (Twitter)" },
  { src: "/illustration/ytb.svg", href: "https://youtube.com/", label: "YouTube" },
  { src: "/illustration/in.svg", href: "https://linkedin.com/", label: "LinkedIn" },
] as const;

export default function Footer() {
  return (
    <footer id="site-footer" className="bg-white text-brand-black">
      <div className="relative overflow-hidden">
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[300px] select-none"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/illustration/bgfotter.svg"
            alt=""
            fill
            className="object-cover object-bottom"
          />
        </motion.div>

        <div className="relative mx-auto w-11/12 max-w-[1280px] pt-12 md:pt-16 pb-48 md:pb-56">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-12 items-start">
            <motion.div
              className="col-span-2 md:col-span-1"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Image
                src="/illustration/logofotter.svg"
                alt="BipBip"
                width={303}
                height={87}
                className="w-[200px] md:w-[240px] lg:w-[280px] h-auto"
              />
            </motion.div>

            {linkColumns.map((col, index) => (
              <motion.nav
                key={col.title}
                aria-labelledby={`footer-${col.title.replace(/\s+/g, "-")}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + index * 0.1,
                  ease: "easeOut",
                }}
              >
                <h3
                  id={`footer-${col.title.replace(/\s+/g, "-")}`}
                  className="text-[18px] leading-7 font-bold font-sans text-brand-black mb-4"
                >
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-[14px] leading-5 tracking-[0.2px] text-brand-black hover:text-brand-primary focus-visible:text-brand-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            ))}
          </div>

          <div className="relative mt-12 md:mt-16 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <motion.div
              className="flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            >
              <BadgeLink
                href="https://play.google.com/store/apps"
                src="/illustration/playstore.svg"
                alt="Disponible en Google Play"
                width={162}
                height={48}
              />
              <BadgeLink
                href="https://apps.apple.com/"
                src="/illustration/appstore.svg"
                alt="Descargar en App Store"
                width={144}
                height={48}
              />
            </motion.div>

            <motion.ul
              className="flex items-center gap-4"
              aria-label="Redes sociales"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
              }}
            >
              {socials.map((social) => (
                <motion.li
                  key={social.label}
                  variants={{
                    hidden: { opacity: 0, scale: 0.6 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: 1.12, transition: { duration: 0.2 } }}
                >
                  <SocialIconLink
                    href={social.href}
                    src={social.src}
                    label={social.label}
                    size={32}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>

      <div className="bg-brand-black text-white">
        <div className="mx-auto flex w-11/12 max-w-[1280px] flex-col-reverse items-center gap-3 py-4 md:flex-row md:justify-between">
          <p className="text-[12px] leading-5 tracking-[0.2px]">
            © {new Date().getFullYear()} Derechos Reservados Grupo Comidas
          </p>
          <div className="flex items-center gap-2">
            <Image
              src="/illustration/Logo%20CIT.svg"
              alt="CIT"
              width={161}
              height={33}
              className="h-7 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
