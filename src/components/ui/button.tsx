import { cn } from "@/lib/cn";
import type React from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-brand-primary text-white hover:bg-brand-primary/90",
  secondary: "bg-brand-yellow text-brand-black hover:bg-brand-yellow/90",
  ghost: "bg-transparent text-brand-black hover:bg-grey-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-b3 px-4 py-2 xl:px-5 xl:py-2.5 rounded-lg",
  md: "text-button px-5 py-3 xl:px-6 xl:py-3.5 rounded-xl",
  lg: "text-button px-7 py-4 xl:px-8 xl:py-5 xl:text-[18px] rounded-2xl",
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-sans font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

export default function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    href,
    ...rest
  } = props;

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href !== undefined) {
    const linkProps = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...linkProps}>
        {children}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
