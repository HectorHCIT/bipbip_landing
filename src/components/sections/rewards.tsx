import Image from "next/image";
import Button from "@/components/ui/button";
import { cdn } from "@/lib/cdn";

const benefits = [
  {
    illust: cdn("/icons/moto.svg"),
    title: "Envío gratis",
    illustSize: 84,
    illustOffsetTop: -64,
    reveal: "anim-reveal-left",
  },
  {
    illust: cdn("/floating/burguer.svg"),
    title: "Productos gratis",
    illustSize: 132,
    illustOffsetTop: -76,
    reveal: "anim-reveal-up",
  },
  {
    illust: cdn("/icons/discountcupons.svg"),
    title: "Cupones de descuento",
    illustSize: 110,
    illustOffsetTop: -60,
    reveal: "anim-reveal-right",
  },
] as const;

const coins = [
  { className: "top-[2%] right-[2%] w-[120px] lg:w-[141px] xl:w-[164px]", rotate: -11, floatDelay: "0s", floatDuration: "4s" },
  { className: "top-[42%] right-[-2%] w-[80px] lg:w-[90px] xl:w-[105px]", rotate: 11, floatDelay: "0.6s", floatDuration: "4.2s" },
  { className: "top-[64%] right-[3%] w-[120px] lg:w-[141px] xl:w-[164px]", rotate: -11, floatDelay: "1.2s", floatDuration: "4.4s" },
  { className: "top-[18%] left-[-2%] w-[120px] lg:w-[141px] xl:w-[164px]", rotate: 11, floatDelay: "0.3s", floatDuration: "4.1s" },
  { className: "top-[52%] left-[8%] w-[70px] lg:w-[78px] xl:w-[92px]", rotate: -11, floatDelay: "0.9s", floatDuration: "4.3s" },
  { className: "top-[78%] left-[1%] w-[120px] lg:w-[141px] xl:w-[164px]", rotate: 11, floatDelay: "1.5s", floatDuration: "4.5s" },
] as const;

export default function Rewards() {
  return (
    <section
      id="rewards"
      className="relative overflow-hidden bg-white pt-24 pb-20 md:pt-28 md:pb-24 lg:pt-32 lg:pb-28 xl:pt-40 xl:pb-32"
      aria-labelledby="rewards-heading"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden md:block select-none"
      >
        {coins.map((coin, i) => (
          <div
            key={i}
            className={`anim-reveal-scale absolute ${coin.className}`}
            style={{ transform: `rotate(${coin.rotate}deg)` }}
          >
            <div
              className="anim-float"
              style={{
                animationDelay: coin.floatDelay,
                animationDuration: coin.floatDuration,
              }}
            >
              <Image
                src={cdn("/floating/coin.svg")}
                alt=""
                width={141}
                height={141}
                className="h-auto w-full drop-shadow-[0_8px_16px_rgba(253,195,0,0.25)]"
                style={{ width: "auto", height: "auto" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="relative mx-auto w-11/12 xl:w-full xl:px-8 max-w-[1280px] xl:max-w-[1440px]">
        <header className="flex flex-col items-center gap-2 text-center">
          <h2
            id="rewards-heading"
            className="anim-reveal-up text-[36px] leading-[44px] md:text-h2 xl:text-[56px] xl:leading-[64px] font-bold font-sans text-brand-primary"
          >
            ¡Gana más con cada compra!
          </h2>
          <p className="anim-reveal-up text-[18px] leading-7 md:text-h5 xl:text-[24px] xl:leading-8 font-bold font-sans text-brand-black">
            Acumula puntos y desbloquea increíbles recompensas.
          </p>
          {/* TODO(TW-060): partial token match — text-s2/text-s1 cover size+line-height+weight; tracking-[0.2px] is not part of these tokens */}
          <p className="anim-reveal-up mt-2 max-w-[842px] text-s2 md:text-s1 xl:text-[20px] xl:leading-7 tracking-[0.2px] font-sans text-brand-black">
            En Bipbip, cada pedido te acerca a obtener más beneficios. Sube de
            nivel con tus compras y disfruta de productos gratis, envíos sin
            costo, descuentos exclusivos, ¡y mucho más!
          </p>
        </header>

        <div className="relative mt-32 grid grid-cols-1 gap-24 md:grid-cols-3 md:gap-12 lg:gap-16 xl:gap-20">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className={`${benefit.reveal} relative flex flex-col items-center justify-center gap-8 xl:gap-10 rounded-2xl bg-white px-8 py-6 xl:px-10 xl:py-10 shadow-card`}
            >
              <div
                className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center drop-shadow-[0_5px_10px_rgba(0,0,0,0.2)]"
                style={{
                  top: benefit.illustOffsetTop,
                  width: benefit.illustSize,
                  height: benefit.illustSize,
                }}
              >
                <Image
                  src={benefit.illust}
                  alt=""
                  aria-hidden="true"
                  width={benefit.illustSize}
                  height={benefit.illustSize}
                  className="size-full object-contain"
                />
              </div>
              <h3 className="text-[20px] leading-7 xl:text-[24px] xl:leading-8 font-bold font-sans text-brand-black text-center whitespace-nowrap">
                {benefit.title}
              </h3>
            </article>
          ))}
        </div>

        <div className="anim-reveal-up mt-16 flex justify-center">
          <Button variant="primary" size="lg" href="#download" className="text-white">
            Regístrate en BipBip
          </Button>
        </div>
      </div>
    </section>
  );
}
