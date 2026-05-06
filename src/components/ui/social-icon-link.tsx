import { cn } from "@/lib/cn";
import Image from "next/image";

export type SocialIconLinkProps = {
  href: string;
  label: string;
  src: string;
  size?: number;
  className?: string;
};

export default function SocialIconLink({
  href,
  label,
  src,
  size = 24,
  className,
}: SocialIconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center transition-opacity hover:opacity-80",
        className,
      )}
    >
      <Image src={src} alt="" aria-hidden="true" width={size} height={size} />
    </a>
  );
}
