import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "light" | "outline" | "ghost";
  className?: string;
};

const variants = {
  primary:
    "bg-school-red text-white hover:bg-school-red-dark focus-visible:outline-school-red",
  light:
    "bg-white text-school-navy hover:bg-school-gold focus-visible:outline-white",
  outline:
    "border border-white/55 text-white hover:border-white hover:bg-white hover:text-school-navy focus-visible:outline-white",
  ghost:
    "border border-school-navy/20 bg-transparent text-school-navy hover:border-school-navy hover:bg-school-navy hover:text-white focus-visible:outline-school-navy",
} as const;

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-3 rounded-[3px] px-5 py-3 text-[0.72rem] font-bold uppercase tracking-[0.16em] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 sm:px-6 ${variants[variant]} ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        strokeWidth={1.8}
      />
    </a>
  );
}
