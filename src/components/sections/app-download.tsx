import Image from "next/image";
import BadgeLink from "@/components/ui/badge-link";
import { cdn } from "@/lib/cdn";

const IOS_URL = "https://apps.apple.com/hn/app/bip-bip/id1501865149";
const ANDROID_URL =
  "https://play.google.com/store/apps/details?id=hn.cit.gccustomerapp";

export default function AppDownload() {
  return (
    <section
      id="download"
      className="relative bg-white py-32 md:py-36 lg:py-44"
      aria-labelledby="download-heading"
    >
      <div className="relative mx-auto w-11/12 max-w-[480px] md:max-w-[560px] lg:max-w-none">
        <div
          aria-hidden="true"
          className="anim-reveal-scale pointer-events-none absolute -top-4 -right-6 w-[200px] md:-top-10 md:right-0 md:w-[240px] lg:-top-16 lg:w-[320px] z-10 select-none"
        >
          <div className="anim-float-slow">
            <Image
              src={cdn("/floating/pizza.svg")}
              alt=""
              width={340}
              height={230}
              className="w-full h-auto"
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </div>

        <div className="relative lg:aspect-[1280/440]">
          {/* Mobile portrait shape (sm). Stretches to fill via preserveAspectRatio="none". */}
          <svg
            aria-hidden="true"
            viewBox="0 0 358 1176"
            preserveAspectRatio="none"
            className="md:hidden absolute inset-0 w-full h-full pointer-events-none select-none text-brand-primary"
          >
            <path
              fill="currentColor"
              d="M0 162.928C0 140.086 13.8739 119.533 35.0592 110.991L303.042 2.94177C329.331 -7.65785 358 11.6943 358 40.0399V1135.98C358 1161.55 334.337 1180.55 309.369 1175.04L43.9168 1116.38C18.2636 1110.71 0 1087.97 0 1061.7V162.928Z"
            />
          </svg>
          {/* Tablet shape (md) — interpolated between sm and lg. Container forced to aspect-[768/900] so curves don't deform. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 768 900"
            preserveAspectRatio="none"
            className="hidden md:block lg:hidden absolute inset-0 w-full h-full pointer-events-none select-none text-brand-primary"
          >
            <path
              fill="currentColor"
              d="M0 180C0 156 17 135 40 128L700 6C728 -3 768 16 768 55V793C768 828 730 895 695 893L60 838C27 836 0 813 0 786V180Z"
            />
          </svg>
          {/* Desktop shape (lg+). Container forced to aspect-[1280/440] so curves stay sharp. */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1280 440"
            preserveAspectRatio="none"
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none select-none text-brand-primary"
          >
            <path
              fill="currentColor"
              d="M0 135.655C0 106.251 22.7409 81.8551 52.0722 79.7928L1183.69 0.226073C1235.75 -3.43458 1280 37.8132 1280 90.0044V349.87C1280 400.953 1237.53 441.795 1186.49 439.801L53.8142 395.556C23.7596 394.382 0 369.676 0 339.599V135.655Z"
            />
          </svg>
          <div className="relative grid h-full grid-cols-1 lg:grid-cols-2 items-center gap-10 md:gap-10 lg:gap-16 px-6 py-24 pb-32 md:px-10 md:py-28 md:pb-32 lg:px-24 lg:py-0 lg:pb-0">
            <div className="anim-reveal-left relative flex justify-center lg:justify-start lg:-translate-y-6">
              <Image
                src={cdn("/illustration/phonepreview.svg")}
                alt=""
                aria-hidden="true"
                width={420}
                height={520}
                className="h-auto w-full max-w-[260px] md:max-w-[320px] lg:max-w-[400px] drop-shadow-[20px_20px_64px_rgba(0,0,0,0.45)]"
                style={{ width: "auto", height: "auto" }}
              />
            </div>

            <div className="flex flex-col items-center gap-6 md:gap-6 lg:gap-7 text-center lg:items-center lg:text-center">
              <h2
                id="download-heading"
                className="anim-reveal-right text-[34px] leading-[42px] md:text-[40px] md:leading-[48px] lg:text-[44px] lg:leading-[52px] xl:text-h2 font-bold font-sans text-white"
              >
                ¡Descarga la App y empieza a disfrutar!
              </h2>

              {/* TODO(TW-060): partial token match — text-s1 matches size/line-height/weight; tracking-[0.2px] is not part of the token */}
              <p className="anim-reveal-right text-s1 tracking-[0.2px] font-sans text-white max-w-[461px]">
                Pide rápido y fácil de los mejores restaurantes de tu ciudad:
              </p>

              <div className="anim-reveal-right flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
                <BadgeLink
                  href={ANDROID_URL}
                  src={cdn("/illustration/playstore.svg")}
                  alt="Disponible en Google Play"
                  width={234}
                  height={70}
                  className="rounded-md"
                />
                <BadgeLink
                  href={IOS_URL}
                  src={cdn("/illustration/appstore.svg")}
                  alt="Descargar en App Store"
                  width={210}
                  height={70}
                  className="rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
