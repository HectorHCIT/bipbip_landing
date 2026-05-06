// TODO(landing-v1): add WhatsApp social icon when asset is available
import Image from "next/image";
import BadgeLink from "@/components/ui/badge-link";
import SocialIconLink from "@/components/ui/social-icon-link";

const linkColumns = [
  {
    title: "App",
    links: [
      { href: "#download", label: "Descargá la app" },
      { href: "#features", label: "Cómo funciona" },
      { href: "#rewards", label: "Recompensas" },
    ],
  },
  {
    title: "Para clientes",
    links: [
      { href: "#help", label: "Ayuda" },
      { href: "#", label: "Términos y condiciones" },
      { href: "#", label: "Política de privacidad" },
    ],
  },
  {
    title: "Para restaurantes",
    links: [
      { href: "#", label: "Sumate como aliado" },
      { href: "#", label: "Centro de socios" },
    ],
  },
] as const;

const socials = [
  {
    src: "/illustration/fb.svg",
    href: "https://facebook.com/",
    label: "Facebook",
  },
  {
    src: "/illustration/ig.svg",
    href: "https://instagram.com/",
    label: "Instagram",
  },
  {
    src: "/illustration/in.svg",
    href: "https://linkedin.com/",
    label: "LinkedIn",
  },
  {
    src: "/illustration/x.svg",
    href: "https://x.com/",
    label: "X (Twitter)",
  },
  {
    src: "/illustration/ytb.svg",
    href: "https://youtube.com/",
    label: "YouTube",
  },
] as const;

export default function Footer() {
  return (
    <footer id="site-footer" className="text-white">
      {/* ── Main red band ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-brand-primary">
        {/* Decorative background — absolute, behind all content */}
        <Image
          src="/illustration/bgfotter.svg"
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-20 pointer-events-none select-none"
        />

        <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8 py-12 md:py-16">
          {/* Top grid: logo + 3 link columns */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {/* Logo + tagline — spans 2 cols on all breakpoints */}
            <div className="col-span-2">
              <Image
                src="/illustration/logofotter.svg"
                alt="BipBip"
                width={140}
                height={42}
              />
              <p className="mt-4 text-b2 max-w-xs">
                Tu comida favorita, más cerca que nunca.
              </p>
            </div>

            {/* 3 link columns */}
            {linkColumns.map((col) => (
              <nav
                key={col.title}
                aria-labelledby={`footer-${col.title.replace(/\s+/g, "-")}`}
              >
                <h3
                  id={`footer-${col.title.replace(/\s+/g, "-")}`}
                  className="text-s2 font-bold mb-4"
                >
                  {col.title}
                </h3>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-b3 hover:underline focus-visible:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Bottom row: store badges + social icons */}
          <div className="mt-10 pt-8 border-t border-white/20 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            {/* App store badges */}
            <div className="flex flex-wrap gap-3">
              <BadgeLink
                href="https://apps.apple.com/"
                src="/illustration/appstore.svg"
                alt="Descargar en App Store"
              />
              <BadgeLink
                href="https://play.google.com/store/apps"
                src="/illustration/playstore.svg"
                alt="Disponible en Google Play"
              />
            </div>

            {/* Social icon links */}
            <ul className="flex items-center gap-4" aria-label="Redes sociales">
              {socials.map((social) => (
                <li key={social.label}>
                  <SocialIconLink
                    href={social.href}
                    src={social.src}
                    label={social.label}
                    size={28}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom black strip — copyright + CIT credit ───────────────── */}
      <div className="bg-brand-black">
        <div className="mx-auto flex max-w-[1280px] flex-col-reverse items-center gap-3 px-4 py-5 md:flex-row md:justify-between md:px-6 lg:px-8">
          <p className="text-caption opacity-80">
            © {new Date().getFullYear()} BipBip. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2 text-caption opacity-80">
            <span>Powered by</span>
            {/* Note: filename has a space — encoded as %20 for Next.js Image src */}
            <Image
              src="/illustration/Logo%20CIT.svg"
              alt="CIT"
              width={56}
              height={22}
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
