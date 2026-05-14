"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import BadgeLink from "@/components/ui/badge-link";
import SocialIconLink from "@/components/ui/social-icon-link";
import FooterLinkIcon, {
  type FooterLinkIconKind,
} from "@/components/ui/footer-link-icon";
import { cdn } from "@/lib/cdn";

interface FooterLink {
  readonly href: string;
  readonly label: string;
  readonly icon: FooterLinkIconKind;
}

interface FooterColumn {
  readonly title: string;
  readonly links: readonly FooterLink[];
}

const linkColumns: readonly FooterColumn[] = [
  {
    title: "Nosotros",
    links: [
      { href: "/#rewards", label: "Programa de Lealtad", icon: "loyalty" },
      { href: "/#help", label: "Contáctanos", icon: "phone" },
      { href: "/drivers", label: "Repartidores", icon: "bike" },
      { href: "/restaurants", label: "Restaurantes", icon: "store" },
    ],
  },
  {
    title: "App Cliente",
    links: [
      { href: "/privacy", label: "Políticas de Privacidad", icon: "info" },
      { href: "/terms", label: "Términos & Condiciones", icon: "info" },
    ],
  },
  {
    title: "App Restaurantes",
    links: [
      { href: "/privacy", label: "Políticas de Privacidad", icon: "info" },
      { href: "/terms", label: "Términos & Condiciones", icon: "info" },
    ],
  },
];

const socials = [
  {
    src: cdn("/illustration/fb.svg"),
    href: "https://www.facebook.com/BipBipFoodDelivery/",
    label: "Facebook",
  },
  {
    src: cdn("/illustration/ig.svg"),
    href: "https://www.instagram.com/bipbip.hn/",
    label: "Instagram",
  },
] as const;

const linkClass =
  "inline-flex items-center gap-2.5 text-b3 text-brand-black hover:text-brand-primary focus-visible:text-brand-primary transition-colors";

export default function Footer() {
  return (
    <footer
      id="site-footer"
      aria-label="Pie de página"
      className="bg-white text-brand-black"
    >
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
            src={cdn("/illustration/bgfotter.svg")}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </motion.div>

        <div className="relative mx-auto w-11/12 max-w-[1280px] pt-12 md:pt-16 pb-24 md:pb-56">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 items-start">
            <motion.div
              className="sm:col-span-2 md:col-span-3 lg:col-span-1 flex justify-center lg:justify-start"
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <Image
                src={cdn("/illustration/logofotter.svg")}
                alt="BipBip"
                width={303}
                height={87}
                className="w-[200px] md:w-[260px] lg:w-[280px] h-auto"
              />
            </motion.div>

            {linkColumns.map((col, index) => {
              const headingId = `footer-${col.title.replace(/\s+/g, "-")}`;
              return (
                <motion.nav
                  key={col.title}
                  aria-labelledby={headingId}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.1,
                    ease: "easeOut",
                  }}
                  className="text-center md:text-left"
                >
                  {/* TODO(TW-060): text-s1 token uses leading 24px and weight 600,
                      but this heading needs leading-7 (28px) and font-bold (700).
                      Add a heading-specific text token before swapping. */}
                  <h3
                    id={headingId}
                    className="text-[18px] leading-7 font-bold font-sans text-brand-black mb-4"
                  >
                    {col.title}
                  </h3>
                  <ul className="flex flex-col items-center md:items-start gap-3">
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className={linkClass}>
                          <FooterLinkIcon kind={link.icon} />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.nav>
              );
            })}
          </div>

          <motion.div
            className="relative mt-10 md:mt-12 lg:mt-16 flex flex-col items-center gap-4 md:flex-row md:justify-center lg:justify-start md:gap-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <BadgeLink
              href="https://play.google.com/store/apps/details?id=hn.cit.gccustomerapp"
              src={cdn("/illustration/playstore.svg")}
              alt="Disponible en Google Play"
              width={162}
              height={48}
            />
            <BadgeLink
              href="https://apps.apple.com/hn/app/bip-bip/id1501865149"
              src={cdn("/illustration/appstore.svg")}
              alt="Descargar en App Store"
              width={144}
              height={48}
            />
          </motion.div>
        </div>
      </div>

      <div className="bg-brand-black text-white">
        <div className="mx-auto flex w-11/12 max-w-[1280px] flex-col items-center gap-4 py-5 md:flex-row md:justify-between md:py-4">
          <nav aria-label="Redes sociales" className="md:order-2">
            <motion.ul
              className="flex items-center gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
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
                    size={28}
                  />
                </motion.li>
              ))}
            </motion.ul>
          </nav>

          <p className="text-caption text-center md:order-1 md:text-left">
            © {new Date().getFullYear()} Derechos Reservados Grupo Comidas
          </p>

          <div className="flex items-center gap-2 md:order-3">
            <Image
              src={cdn("/illustration/Logo CIT.svg")}
              alt="CIT"
              width={161}
              height={33}
              className="h-6 md:h-7 w-auto"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
