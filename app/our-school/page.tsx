import type { Metadata } from "next";
import Image from "next/image";
import {
  Compass,
  GraduationCap,
  HeartHandshake,
  UsersRound,
} from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";
import { school } from "@/data/site";

export const metadata: Metadata = {
  title: "Our School | Shah Lalji Nangpar Academy",
  description:
    "Discover the values, purpose and learning community of Shah Lalji Nangpar Academy in Nakuru, Kenya.",
  alternates: { canonical: "/our-school" },
};

const values = [
  {
    title: "Academic excellence",
    description:
      "A purposeful Cambridge education that builds knowledge, curiosity and the confidence to keep learning.",
    Icon: GraduationCap,
  },
  {
    title: "Whole-person growth",
    description:
      "Sport, creativity, leadership and service sit alongside strong academic foundations.",
    Icon: Compass,
  },
  {
    title: "Character and care",
    description:
      "Learners are encouraged to become thoughtful, responsible and compassionate members of society.",
    Icon: HeartHandshake,
  },
  {
    title: "A welcoming community",
    description:
      "Students, families and staff work in partnership within a diverse, supportive day-school environment.",
    Icon: UsersRound,
  },
] as const;

export default function OurSchoolPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="Our School"
          title={
            <>
              A community with a{" "}
              <span className="italic text-school-gold">clear purpose.</span>
            </>
          }
          description="A co-educational Cambridge Curriculum day school where learners aged 2–18 are known, supported and encouraged to strive for excellence."
          image="/images/school/senior-students-community.webp"
          imageAlt="Senior students gathered together in their red school blazers"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="School profile"
                title={
                  <>
                    Rooted in Nakuru.{" "}
                    <span className="italic text-school-navy">
                      Ready for the world.
                    </span>
                  </>
                }
              />
            </div>
            <div className="space-y-6 text-base leading-8 text-school-muted lg:col-span-5 lg:col-start-8">
              <p>
                {school.name} is a co-educational day school serving families
                from Nakuru and the surrounding region. The academy provides a
                connected educational journey from Early Years through Junior
                School, Senior School and A-Level.
              </p>
              <p>
                The school combines academic ambition with creativity,
                character, wellbeing and meaningful opportunities beyond the
                classroom. The result is a community where learners can grow in
                confidence while preparing for university, leadership and life.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-[1440px] border-l border-t border-school-navy/15 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-10">
            {[
              ["School type", "Co-educational day school"],
              ["Curriculum", "Cambridge pathway"],
              ["Age range", "2–18 years"],
              ["Location", "Nakuru, Kenya"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="min-h-48 border-b border-r border-school-navy/15 bg-white p-7 sm:p-8"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-school-red">
                  {label}
                </p>
                <p className="mt-8 font-serif text-2xl leading-tight text-school-ink sm:text-3xl">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-school-navy py-20 text-white sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Why SLNA"
              title="The values behind the learning."
              tone="light"
              description="Our approach is shaped by a belief that academic achievement is strongest when it grows alongside character, creativity and belonging."
            />
            <div className="mt-14 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {values.map(({ title, description, Icon }, index) => (
                <article
                  key={title}
                  className="min-h-[310px] border-b border-r border-white/15 p-7 sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      aria-hidden="true"
                      className="size-8 text-school-gold"
                      strokeWidth={1.45}
                    />
                    <span className="text-[0.62rem] font-bold tracking-[0.18em] text-white/35">
                      0{index + 1}
                    </span>
                  </div>
                  <h2 className="mt-12 font-serif text-2xl leading-tight">
                    {title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/62">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="relative aspect-[7/6] overflow-hidden bg-school-stone lg:col-span-6">
              <Image
                src="/images/school/school-event-leadership.webp"
                alt="School leaders speaking with learners during an academy event"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <SectionHeading
                eyebrow="Shared responsibility"
                title={
                  <>
                    Every learner{" "}
                    <span className="italic text-school-navy">matters.</span>
                  </>
                }
                description="Leadership, teaching and pastoral support work together to create an environment where young people feel safe, challenged and encouraged."
              />
              <blockquote className="mt-9 border-l-2 border-school-gold pl-6 font-serif text-2xl leading-[1.35] text-school-ink sm:text-3xl">
                “Education reaches beyond academic achievement. It prepares
                young people to contribute with confidence and compassion.”
              </blockquote>
            </div>
          </div>
        </section>

        <AdmissionsCta />
      </main>
      <Footer />
    </>
  );
}
