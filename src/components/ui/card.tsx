import { cn } from "@/lib/cn";
import type React from "react";

export type CardProps = {
  icon?: React.ReactNode;
  title: string;
  body: string;
  href?: string;
  className?: string;
};

const baseClasses =
  "flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition-shadow";

export default function Card({ icon, title, body, href, className }: CardProps) {
  const classes = cn(baseClasses, className);

  const content = (
    <>
      {icon && <div className="text-brand-primary">{icon}</div>}
      <h3 className="text-h5 font-sans">{title}</h3>
      <p className="text-b2 text-text-muted">{body}</p>
    </>
  );

  if (href !== undefined) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }

  return <article className={classes}>{content}</article>;
}
