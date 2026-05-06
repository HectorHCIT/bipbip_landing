import { cn } from "@/lib/cn";
import Link from "next/link";
import type React from "react";

export type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function NavLink({ href, children, className }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-[18px] leading-7 font-medium text-white hover:text-brand-yellow transition-colors",
        className,
      )}
    >
      {children}
    </Link>
  );
}
