import { ManagedImage as Image } from "@/components/ManagedImage";
import Link from "next/link";
import type { ReactNode } from "react";

type InteriorHeroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image: string;
  imageKey: string;
  imageAlt: string;
  imagePosition?: string;
};

export function InteriorHero({
  eyebrow,
  title,
  description,
  image,
  imageKey,
  imageAlt,
  imagePosition = "object-center",
}: InteriorHeroProps) {
  return (
    <section className="overflow-hidden bg-school-navy text-white">
      <div className="mx-auto grid min-h-[520px] max-w-[1600px] lg:min-h-[590px] lg:grid-cols-12">
        <div className="relative z-10 flex items-center px-4 py-14 sm:px-6 sm:py-16 lg:col-span-6 lg:px-10 lg:py-20 xl:pl-[max(2.5rem,calc((100vw-1440px)/2+2.5rem))]">
          <div className="max-w-[720px]">
            <Link
              href="/"
              className="mb-7 inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/55 transition-colors hover:text-school-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
            >
              <span aria-hidden="true">←</span>
              Home
            </Link>
            <p className="mb-5 flex items-center gap-3 text-[0.7rem] font-bold uppercase tracking-[0.21em] text-school-gold">
              <span aria-hidden="true" className="h-px w-9 bg-school-gold" />
              {eyebrow}
            </p>
            <h1 className="font-serif text-[clamp(3.05rem,6.5vw,6.35rem)] leading-[0.92] tracking-[-0.05em]">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
              {description}
            </p>
          </div>
        </div>

        <div className="relative min-h-[390px] lg:col-span-6 lg:min-h-full">
          <Image
            src={image}
            imageKey={imageKey}
            alt={imageAlt}
            fill
            unoptimized
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover ${imagePosition}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-school-navy/30 via-transparent to-transparent lg:from-school-navy/55" />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-school-navy/35 to-transparent lg:hidden"
          />
        </div>
      </div>
    </section>
  );
}
