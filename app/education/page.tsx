import type { Metadata } from "next";
import { ManagedImage as Image } from "@/components/ManagedImage";
import { Languages, Palette, Sparkles, Trophy } from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { ButtonLink } from "@/components/ButtonLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";
import { academicJourney } from "@/data/site";

export const metadata: Metadata = {
  title: "Education | Shah Lalji Nangpar Academy",
  description:
    "Explore the Cambridge Curriculum pathway at Shah Lalji Nangpar Academy, from Early Years through IGCSE and A-Level.",
  alternates: { canonical: "/education" },
};

const stageDetails = [
  {
    id: "early-years",
    summary:
      "A warm, play-rich beginning that develops communication, early literacy and numeracy, creativity and growing independence.",
    points: [
      "Purposeful learning through play and exploration",
      "Early language, number and social development",
      "A caring transition into school life",
    ],
  },
  {
    id: "junior-school",
    summary:
      "An engaging primary programme up to Year 6, shaped by the UK National Curriculum and Cambridge Primary progression.",
    points: [
      "Broad, inquiry-led learning",
      "Strong foundations across core subjects",
      "Cambridge Upper Primary Checkpoint preparation",
    ],
  },
  {
    id: "senior-school",
    summary:
      "A broad secondary curriculum that deepens understanding and gives learners an internationally recognised pathway.",
    points: [
      "Cambridge Lower Secondary in Years 7–9",
      "Cambridge IGCSE in Years 10–11",
      "Critical thinking, responsibility and subject depth",
    ],
  },
  {
    id: "a-level",
    summary:
      "A focused two-year Sixth Form programme for learners aged 16+, supporting ambitious university and career pathways.",
    points: [
      "Tailored subject combinations",
      "Independent study and academic rigour",
      "Preparation for universities worldwide",
    ],
  },
] as const;

export default function EducationPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="Education"
          title={
            <>
              Learning that moves{" "}
              <span className="italic text-school-gold">with them.</span>
            </>
          }
          description="A coherent Cambridge Curriculum journey from age 2 to 18, building strong foundations, subject depth and growing independence at every stage."
          image="/images/school/outdoor-study.webp"
          imageKey="education.hero"
          imageAlt="A learner focused on her work during an outdoor study session"
          imagePosition="object-center"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Cambridge pathway"
                title={
                  <>
                    One connected journey.{" "}
                    <span className="italic text-school-navy">
                      Four defining stages.
                    </span>
                  </>
                }
              />
            </div>
            <div className="space-y-5 text-base leading-8 text-school-muted lg:col-span-4 lg:col-start-9">
              <p>
                SLNA provides a high-quality Cambridge education across Early
                Years, Primary, Secondary and A-Level. Each stage builds on the
                one before it while responding to the needs of the learner.
              </p>
              <p>
                Academic rigour is balanced with creativity, personal
                development and opportunities for students to discover their
                strengths.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] space-y-20 px-4 sm:px-6 lg:px-10">
            {academicJourney.map((stage, index) => {
              const detail = stageDetails[index];
              const imageFirst = index % 2 === 0;

              return (
                <article
                  key={stage.title}
                  id={detail.id}
                  className="scroll-mt-32 grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
                >
                  <div
                    className={`relative aspect-[7/5] overflow-hidden bg-school-stone lg:col-span-6 ${
                      imageFirst ? "" : "lg:order-2"
                    }`}
                  >
                    <Image
                      src={stage.image}
                      imageKey={`education.stage.${stage.index}`}
                      alt={stage.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute left-5 top-5 flex size-14 items-center justify-center bg-school-red text-[0.67rem] font-bold tracking-[0.16em] text-white">
                      {stage.index}
                    </span>
                  </div>
                  <div
                    className={`lg:col-span-5 ${
                      imageFirst ? "lg:col-start-8" : "lg:col-start-1 lg:row-start-1"
                    }`}
                  >
                    <p className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-school-red">
                      {stage.stage}
                    </p>
                    <h2 className="mt-4 font-serif text-4xl tracking-[-0.035em] text-school-ink sm:text-5xl">
                      {stage.title}
                    </h2>
                    <p className="mt-6 text-base leading-8 text-school-muted">
                      {detail.summary}
                    </p>
                    <ul className="mt-8 border-t border-school-navy/15">
                      {detail.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-4 border-b border-school-navy/15 py-4 text-sm leading-6 text-school-ink"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-school-red"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <ButtonLink href={stage.href} variant="ghost">
                        Explore {stage.title}
                      </ButtonLink>
                      {stage.title === "Senior School" ? (
                        <ButtonLink href="/education/igcse" variant="ghost">
                          Explore IGCSE
                        </ButtonLink>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="bg-school-navy py-20 text-white sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Beyond core subjects"
              title="A broader education."
              tone="light"
              description="Enrichment subjects and co-curricular opportunities help learners build confidence, creativity and a fuller understanding of the world."
            />
            <div className="mt-12 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  title: "Modern languages",
                  copy: "French and global communication",
                  Icon: Languages,
                },
                {
                  title: "Creative arts",
                  copy: "Art, music and performance",
                  Icon: Palette,
                },
                {
                  title: "Physical education",
                  copy: "Movement, teamwork and wellbeing",
                  Icon: Trophy,
                },
                {
                  title: "Personal growth",
                  copy: "Leadership, initiative and service",
                  Icon: Sparkles,
                },
              ].map(({ title, copy, Icon }) => (
                <article
                  key={title}
                  className="min-h-56 border-b border-r border-white/15 p-7 sm:p-8"
                >
                  <Icon
                    aria-hidden="true"
                    className="size-7 text-school-gold"
                    strokeWidth={1.5}
                  />
                  <h2 className="mt-9 font-serif text-2xl">{title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/60">
                    {copy}
                  </p>
                </article>
              ))}
            </div>
            <div className="mt-10 flex">
              <ButtonLink href="/education/homework-policy" variant="outline">
                Read homework & assessment policy
              </ButtonLink>
            </div>
          </div>
        </section>

        <AdmissionsCta
          eyebrow="Find the right stage"
          title="A clear pathway for every learner."
          description="Talk to our admissions team about your child’s age, current year group and the best point of entry into the SLNA journey."
        />
      </main>
      <Footer />
    </>
  );
}
