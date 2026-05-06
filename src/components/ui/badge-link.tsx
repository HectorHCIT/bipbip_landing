import { cn } from "@/lib/cn";
import Image from "next/image";

export type BadgeLinkProps = {
  href: string;
  src: string;
  alt: string;
  className?: string;
};

export default function BadgeLink({ href, src, alt, className }: BadgeLinkProps) {
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
      <Image src={src} alt={alt} width={160} height={48} />
    </a>
  );
}
