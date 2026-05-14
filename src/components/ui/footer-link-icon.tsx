import Image from "next/image";
import type { ReactElement } from "react";
import { cdn } from "@/lib/cdn";

export type FooterLinkIconKind = "loyalty" | "phone" | "bike" | "store" | "info";

interface FooterLinkIconProps {
  readonly kind: FooterLinkIconKind;
}

const base = "size-5 shrink-0";

export default function FooterLinkIcon({ kind }: FooterLinkIconProps): ReactElement {
  switch (kind) {
    case "loyalty":
      return (
        <Image
          src={cdn("/floating/coin.svg")}
          alt=""
          aria-hidden="true"
          width={20}
          height={20}
          className={base}
        />
      );
    case "phone":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${base} text-brand-primary`}
          aria-hidden="true"
        >
          <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
        </svg>
      );
    case "bike":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${base} text-brand-primary`}
          aria-hidden="true"
        >
          <path d="M5 20.5A3.5 3.5 0 0 1 1.5 17 3.5 3.5 0 0 1 5 13.5 3.5 3.5 0 0 1 8.5 17 3.5 3.5 0 0 1 5 20.5M5 12a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5m14.8-2.5h-3.3l1-1L15 5l-1.4 1.4 1.5 1.5h-3.6V5h-3v4.5h5.2l-2.5 2.5h-1.2L9 17h2l1.5-2 2.5 4h2.5l-2.5-4 .8-1H17v-2h-1.2l1-1h3.4V9.5zM19 20.5a3.5 3.5 0 0 1-3.5-3.5 3.5 3.5 0 0 1 3.5-3.5 3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5M19 12a5 5 0 0 0-5 5 5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5z" />
        </svg>
      );
    case "store":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`${base} text-brand-primary`}
          aria-hidden="true"
        >
          <path d="M21.9 8.89l-1.05-4.37c-.22-.9-1-1.52-1.91-1.52H5.05c-.9 0-1.69.63-1.9 1.52L2.1 8.89c-.24 1.02-.02 2.06.62 2.88.08.11.19.19.28.29V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-6.94c.09-.09.2-.18.28-.28.64-.82.87-1.87.62-2.89zM13 3l.66 4.39c.05.36-.07.72-.31 1-.27.29-.66.41-1.05.41A1.32 1.32 0 0 1 11 7.5V3h2zm-6.95.43c.06-.25.27-.43.51-.43H9v4.5C9 8.34 8.32 9 7.45 9c-.78 0-1.39-.61-1.5-1.39L6.05 3.43zM19 19H5v-6.21h.5c.91 0 1.74-.39 2.42-.99.16-.14.33-.27.49-.43.36-.4.6-.91.71-1.45.07-.35.13-.69.13-1.06v-.34l.13.07c.6.32 1.27.5 1.97.5.78 0 1.5-.21 2.13-.6l.07-.04v.41c0 .37.06.71.13 1.06.11.54.35 1.05.71 1.45.16.16.33.29.49.43.68.6 1.51.99 2.42.99h.5V19z" />
        </svg>
      );
    case "info":
      return (
        <svg viewBox="0 0 24 24" className={base} aria-hidden="true">
          <circle cx="12" cy="12" r="10" className="fill-brand-primary" />
          <path
            d="M11 10.5h2V17h-2zM12 7a1.25 1.25 0 1 0 0 2.5A1.25 1.25 0 0 0 12 7z"
            fill="white"
          />
        </svg>
      );
  }
}
