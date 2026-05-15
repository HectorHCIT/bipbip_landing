import Image from "next/image";
import BadgeLink from "@/components/ui/badge-link";
import { cdn } from "@/lib/cdn";

const floatingItems = [
  {
    src: cdn("/floating/burguer.svg"),
    width: 343,
    height: 309,
    className: "absolute top-[16px] left-[45px]",
    enterDelay: "0s",
    floatDelay: "0s",
    floatDuration: "4s",
  },
  {
    src: cdn("/floating/pizza.svg"),
    width: 253,
    height: 171,
    className: "absolute top-0 left-[334px]",
    enterDelay: "0.06s",
    floatDelay: "0.4s",
    floatDuration: "4.2s",
  },
  {
    src: cdn("/floating/egg.svg"),
    width: 247,
    height: 178,
    className: "absolute top-[200px] left-[401px]",
    enterDelay: "0.12s",
    floatDelay: "0.8s",
    floatDuration: "4.4s",
  },
  {
    src: cdn("/floating/cubo pollo.svg"),
    width: 281,
    height: 287,
    className: "absolute top-[291px] left-0",
    enterDelay: "0.18s",
    floatDelay: "1.2s",
    floatDuration: "4.6s",
  },
  {
    src: cdn("/floating/rice wolk.svg"),
    width: 204,
    height: 263,
    className: "absolute top-[328px] left-[362px]",
    enterDelay: "0.24s",
    floatDelay: "1.6s",
    floatDuration: "4.8s",
  },
] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-brand-primary text-brand-black pt-[55vh] sm:pt-[50vh] md:pt-36 lg:pt-32 pb-16 md:pb-20 lg:pb-20"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 select-none"
        aria-hidden="true"
      >
        <Image
          src={cdn("/illustration/herotexture.svg")}
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        <video
          className="absolute inset-0 h-full w-full object-cover md:hidden motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        >
          <source src={cdn("/video.mp4")} type="video/mp4" />
        </video>
      </div>

      <div className="relative mx-auto w-11/12">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8 xl:gap-12">
          <div className="relative z-10 flex flex-col gap-10 w-full mx-auto justify-center items-start">
            {/* TODO(TW-060): partial token match — none of the responsive sizes (36/44/52/56) match text-h2 (48px) exactly */}
            <h1
              id="hero-heading"
              className="anim-load-up text-[44px] leading-[52px] sm:text-[52px] sm:leading-[60px] md:text-[52px] md:leading-[60px] lg:text-[48px] lg:leading-[56px] xl:text-[56px] xl:leading-[64px] font-bold font-sans text-white md:text-brand-black motion-reduce:text-brand-black w-full"
            >
              Tu comida favorita, más cerca que nunca!
            </h1>

            <div className="anim-load-up anim-delay-2 hidden md:flex flex-wrap items-center gap-4">
              <BadgeLink
                href="https://play.google.com/store/apps/details?id=hn.cit.gccustomerapp"
                src={cdn("/illustration/playstore.svg")}
                alt="Disponible en Google Play"
                width={209}
                height={62}
                className="rounded-lg w-[170px] md:w-[209px] [&_img]:w-full [&_img]:h-auto"
              />
              <BadgeLink
                href="https://apps.apple.com/hn/app/bip-bip/id1501865149"
                src={cdn("/illustration/appstore.svg")}
                alt="Descargar en App Store"
                width={186}
                height={62}
                className="rounded-lg w-[170px] md:w-[186px] [&_img]:w-full [&_img]:h-auto"
              />
            </div>
          </div>

          <div
            className="hidden md:flex relative md:h-[640px] lg:h-[700px] xl:h-[886px] items-center justify-center"
            aria-hidden="true"
          >
            <div className="relative w-[648px] h-[591px] scale-[0.45] sm:scale-[0.6] md:scale-100 lg:scale-[1.1] xl:scale-[1.5] origin-center">
              {floatingItems.map((item) => (
                <div
                  key={item.src}
                  className={`anim-load-scale ${item.className}`}
                  style={{ animationDelay: item.enterDelay }}
                >
                  <div
                    className="anim-float"
                    style={{
                      animationDelay: item.floatDelay,
                      animationDuration: item.floatDuration,
                    }}
                  >
                    <Image
                      src={item.src}
                      alt=""
                      width={item.width}
                      height={item.height}
                      priority
                      className="w-auto h-auto"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
