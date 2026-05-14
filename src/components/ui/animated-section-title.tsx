import Image from "next/image";
import type { ReactElement, ReactNode } from "react";
import { cdn } from "@/lib/cdn";

const widthMap = {
  default: "w-[260px] md:w-[420px] lg:w-[552px]",
  wide: "w-[320px] md:w-[520px] lg:w-[681px]",
} as const;

export type AnimatedSectionTitleWidth = keyof typeof widthMap;

export default function AnimatedSectionTitle({
  id,
  width = "default",
  children,
}: {
  id: string;
  width?: AnimatedSectionTitleWidth;
  children: ReactNode;
}): ReactElement {
  return (
    <header className="flex flex-col items-center gap-2 text-center">
      <h2
        id={id}
        className="anim-reveal-up text-[40px] leading-[48px] md:text-h2 font-bold font-sans text-brand-black"
      >
        {children}
      </h2>
      <div className={`anim-reveal-right origin-left ${widthMap[width]}`}>
        <Image
          src={cdn("/illustration/headline-underline.png")}
          alt=""
          aria-hidden="true"
          width={width === "wide" ? 681 : 552}
          height={12}
          className="w-full h-auto"
        />
      </div>
    </header>
  );
}
