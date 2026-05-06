import Image from "next/image";
import BadgeLink from "@/components/ui/badge-link";

// TODO(landing-v1): replace with real App Store / Google Play URLs when available
const IOS_URL = "https://apps.apple.com/";
const ANDROID_URL = "https://play.google.com/store/apps";

export default function AppDownload() {
  return (
    <section
      id="download"
      className="bg-brand-primary text-white py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
          {/* Phone mockup column — decorative illustration */}
          <div className="flex justify-center lg:justify-start">
            <Image
              src="/illustration/phonepreview.svg"
              alt=""
              aria-hidden="true"
              width={420}
              height={520}
              className="w-full max-w-[420px] h-auto"
            />
          </div>

          {/* Copy + badges column */}
          <div className="flex flex-col items-start gap-6 lg:gap-8">
            <h2 className="text-h2 font-sans tracking-tight">
              ¡Descargá la App y empezá a disfrutar!
            </h2>
            <p className="text-b2 max-w-md">
              Pedí desde tu celular en segundos. Recibí promos exclusivas y ganá
              puntos en cada compra.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <BadgeLink
                href={IOS_URL}
                src="/illustration/appstore.svg"
                alt="Descargar en App Store"
              />
              <BadgeLink
                href={ANDROID_URL}
                src="/illustration/playstore.svg"
                alt="Disponible en Google Play"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
