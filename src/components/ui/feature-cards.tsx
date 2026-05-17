import Image from "next/image";
import type { ReactElement } from "react";

export interface FeatureCard {
  readonly icon: string;
  readonly iconSize: number;
  readonly iconOffset: number;
  readonly title: string;
  readonly body: string;
}

const REVEAL_PATTERNS = ["anim-reveal-left", "anim-reveal-up", "anim-reveal-right"] as const;

export default function FeatureCards({
  cards,
}: {
  cards: ReadonlyArray<FeatureCard>;
}): ReactElement {
  const last = cards.length - 1;
  return (
    <div className="relative mt-32 grid grid-cols-1 gap-24 md:grid-cols-3 md:gap-16 lg:gap-20 lg:max-w-[1060px] lg:mx-auto xl:max-w-none">
      {cards.map((card, index) => {
        const reveal =
          index === 0
            ? REVEAL_PATTERNS[0]
            : index === last
              ? REVEAL_PATTERNS[2]
              : REVEAL_PATTERNS[1];
        return (
          <article
            key={card.title}
            className={`${reveal} group relative flex flex-col items-center gap-4 xl:gap-6 rounded-3xl bg-white px-8 pt-10 pb-6 xl:px-10 xl:pt-14 xl:pb-10 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-[box-shadow,transform] duration-300`}
          >
            <div
              className="anim-reveal-scale absolute left-1/2 -translate-x-1/2"
              style={{
                top: `-${card.iconOffset}px`,
                width: `${card.iconSize}px`,
                height: `${card.iconSize}px`,
              }}
            >
              <div
                className="anim-float relative size-full"
                style={{
                  animationDuration: `${3 + index * 0.3}s`,
                  animationDelay: `${1 + index * 0.2}s`,
                }}
              >
                <Image
                  src={card.icon}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes={`${card.iconSize}px`}
                  className="object-contain"
                />
              </div>
            </div>
            <h3 className="text-h5 xl:text-[24px] xl:leading-8 text-brand-black text-center">{card.title}</h3>
            <p className="text-b2 xl:text-[18px] xl:leading-7 text-brand-black text-center">{card.body}</p>
          </article>
        );
      })}
    </div>
  );
}
