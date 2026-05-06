import { cn } from "@/lib/cn";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <header className={cn("flex flex-col gap-2", alignClasses, className)}>
      {eyebrow && (
        <span className="text-caption uppercase tracking-wider text-brand-primary font-bold font-sans">
          {eyebrow}
        </span>
      )}
      <h2 className="text-h2 font-sans text-brand-black">{title}</h2>
      {subtitle && (
        <p className="text-b2 text-text-muted">{subtitle}</p>
      )}
    </header>
  );
}
