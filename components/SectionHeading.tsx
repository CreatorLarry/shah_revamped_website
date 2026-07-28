import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  tone?: "dark" | "light";
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
  align = "left",
}: SectionHeadingProps) {
  const isLight = tone === "light";

  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : ""}>
      <div
        className={`mb-5 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.22em] ${
          align === "center" ? "justify-center" : ""
        } ${isLight ? "text-school-gold" : "text-school-red"}`}
      >
        <span
          aria-hidden="true"
          className={`h-px w-8 ${isLight ? "bg-school-gold" : "bg-school-red"}`}
        />
        {eyebrow}
      </div>
      <h2
        className={`font-serif text-[clamp(2.25rem,5vw,4.65rem)] leading-[0.98] tracking-[-0.035em] ${
          isLight ? "text-white" : "text-school-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${
            align === "center" ? "mx-auto" : ""
          } ${isLight ? "text-white/70" : "text-school-muted"}`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
