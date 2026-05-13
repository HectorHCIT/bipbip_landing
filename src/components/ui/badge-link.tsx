import { cn } from "@/lib/cn";
import Image from "next/image";

export type BadgeLinkProps = {
  href: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

export default function BadgeLink({ href, src, alt, width, height, className }: BadgeLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={alt}
      className={cn(
        "inline-flex transition-opacity hover:opacity-90 focus-visible:opacity-90",
        className,
      )}
    >
      <Image src={src} alt="" aria-hidden="true" width={width} height={height} />
    </a>
  );
}
