"use client";

import Image from "next/image";
import { motion } from "motion/react";

export type FeatureCard = {
  readonly icon: string;
  readonly iconSize: number;
  readonly iconOffset: number;
  readonly title: string;
  readonly body: string;
};

export default function FeatureCards({
  cards,
}: {
  cards: ReadonlyArray<FeatureCard>;
}) {
  const last = cards.length - 1;
  return (
    <div className="relative mt-32 grid grid-cols-1 gap-24 md:grid-cols-3 md:gap-12 lg:gap-20 lg:max-w-[1060px] lg:mx-auto">
      {cards.map((card, index) => (
        <motion.article
          key={card.title}
          initial={
            index === 0
              ? { opacity: 0, x: -48 }
              : index === last
                ? { opacity: 0, x: 48 }
                : { opacity: 0, y: 32 }
          }
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
          className={
            "relative flex flex-col items-center gap-4 rounded-3xl bg-white px-8 pt-10 pb-6 shadow-card hover:shadow-card-hover transition-shadow" +
            (index === 1 ? " md:mt-25" : "")
          }
        >
          <motion.div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: `-${card.iconOffset}px`,
              width: `${card.iconSize}px`,
              height: `${card.iconSize}px`,
            }}
            initial={{ opacity: 0, scale: 0.4, rotate: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              type: "spring",
              stiffness: 220,
              damping: 12,
              delay: 0.3 + index * 0.15,
            }}
          >
            <motion.div
              className="relative size-full"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 3 + index * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1 + index * 0.2,
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
            </motion.div>
          </motion.div>
          <h3 className="text-h5 text-brand-black text-center">{card.title}</h3>
          <p className="text-b2 text-brand-black text-center">{card.body}</p>
        </motion.article>
      ))}
    </div>
  );
}
