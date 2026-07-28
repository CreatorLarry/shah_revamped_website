import {
  BookOpenText,
  Compass,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { strengths } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  book: BookOpenText,
  spark: Sparkles,
  compass: Compass,
  people: UsersRound,
};

export function Strengths() {
  return (
    <div className="mt-14 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
      {strengths.map((strength, index) => {
        const Icon = iconMap[strength.icon];

        return (
          <article
            key={strength.title}
            className="group min-h-[285px] border-b border-r border-white/15 p-7 transition-colors duration-300 hover:bg-white/[0.055] sm:p-8"
          >
            <div className="mb-12 flex items-start justify-between">
              <Icon
                aria-hidden="true"
                className="size-8 text-school-gold"
                strokeWidth={1.45}
              />
              <span className="text-[0.62rem] font-bold tracking-[0.18em] text-white/35">
                0{index + 1}
              </span>
            </div>
            <h3 className="font-serif text-2xl leading-tight text-white">
              {strength.title}
            </h3>
            <p className="mt-4 text-sm leading-6 text-white/62">
              {strength.description}
            </p>
          </article>
        );
      })}
    </div>
  );
}
