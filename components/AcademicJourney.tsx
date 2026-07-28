import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { academicJourney } from "@/data/site";

const placements = [
  "lg:col-span-6 lg:col-start-1",
  "lg:col-span-6 lg:col-start-7 lg:mt-24",
  "lg:col-span-6 lg:col-start-1",
  "lg:col-span-6 lg:col-start-7 lg:mt-24",
] as const;

export function AcademicJourney() {
  return (
    <div className="relative mt-14 grid gap-y-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-0">
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-[23px] top-8 w-px bg-school-navy/15 lg:bottom-20 lg:left-1/2 lg:top-20"
      />
      {academicJourney.map((stage, index) => (
        <article
          key={stage.title}
          className={`group relative pl-16 lg:pl-0 ${placements[index]}`}
        >
          <div className="absolute left-0 top-8 z-10 flex size-12 items-center justify-center border border-school-red bg-school-cream text-[0.68rem] font-extrabold tracking-[0.16em] text-school-red lg:hidden">
            {stage.index}
          </div>
          <a
            href={stage.href}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red"
            aria-label={`Learn more about ${stage.title}`}
          >
            <div className="relative aspect-[7/4] overflow-hidden bg-school-navy">
              <Image
                src={stage.image}
                alt={`Photography placeholder for ${stage.title}`}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-navy/40 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 hidden size-14 items-center justify-center border border-white/50 bg-school-navy/55 text-[0.68rem] font-extrabold tracking-[0.16em] text-white backdrop-blur-sm lg:flex">
                {stage.index}
              </span>
            </div>
            <div className="grid gap-5 border-x border-b border-school-navy/15 bg-white p-6 sm:p-8">
              <div>
                <p className="mb-3 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-school-red">
                  {stage.stage}
                </p>
                <h3 className="font-serif text-3xl leading-tight tracking-[-0.025em] text-school-ink sm:text-4xl">
                  {stage.title}
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-7 text-school-muted sm:text-base">
                {stage.description}
              </p>
              <span className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-school-navy transition-colors group-hover:text-school-red">
                Explore this stage
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
            </div>
          </a>
        </article>
      ))}
    </div>
  );
}
