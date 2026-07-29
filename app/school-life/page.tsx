import type { Metadata } from "next";
import Image from "next/image";
import {
  HeartHandshake,
  Lightbulb,
  Palette,
  ShieldCheck,
  Trophy,
  UsersRound,
} from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { ButtonLink } from "@/components/ButtonLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "School Life | Shah Lalji Nangpar Academy",
  description:
    "Explore pastoral care, safeguarding, sport, arts, leadership, clubs and student life at Shah Lalji Nangpar Academy.",
  alternates: { canonical: "/school-life" },
};

const activities = [
  {
    title: "Sport",
    description:
      "Team and individual sport build fitness, resilience, leadership and school spirit.",
    image: "/images/school/swimming-competition.webp",
    alt: "SLNA swimmers competing in marked lanes during a school event",
    items: [
      "Football",
      "Basketball",
      "Athletics",
      "Netball",
      "Rugby",
      "Swimming",
      "Table tennis",
      "Volleyball",
    ],
    Icon: Trophy,
  },
  {
    title: "The arts",
    description:
      "Creative opportunities help learners express ideas, perform with confidence and collaborate.",
    image: "/images/school/creative-arts-masks.webp",
    alt: "Learners presenting colourful masks they created during an arts activity",
    items: [
      "Choir",
      "Orchestra",
      "Dance",
      "Drama and theatre",
      "Creative arts",
      "Music",
    ],
    Icon: Palette,
  },
  {
    title: "Leadership",
    description:
      "Learners practise responsibility, initiative and service through meaningful roles.",
    image: "/images/school/school-event-leadership.webp",
    alt: "School leaders speaking with learners during an academy event",
    items: [
      "Student council",
      "Peer mentoring",
      "Event planning",
      "Sports leadership",
      "Arts leadership",
    ],
    Icon: UsersRound,
  },
  {
    title: "Clubs and societies",
    description:
      "Interest-led groups deepen knowledge, communication and practical problem-solving.",
    image: "/images/school/chess-club.webp",
    alt: "Junior School learners concentrating during a chess activity",
    items: [
      "Model United Nations",
      "World Scholar’s Cup",
      "Debate",
      "Entrepreneurship",
      "Robotics",
      "Art",
      "Science",
    ],
    Icon: Lightbulb,
  },
] as const;

export default function SchoolLifePage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="School Life"
          title={
            <>
              Space to discover,{" "}
              <span className="italic text-school-gold">
                contribute and belong.
              </span>
            </>
          }
          description="A rich school experience supports learners academically, socially and emotionally while giving them opportunities to explore interests and build lasting skills."
          image="/images/school/sports-day-community.webp"
          imageAlt="Junior learners enjoying an energetic outdoor school activity"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="relative aspect-[7/6] overflow-hidden bg-school-stone lg:col-span-6">
              <Image
                src="/images/school/student-portrait.webp"
                alt="A smiling SLNA learner in school uniform"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <SectionHeading
                eyebrow="Pastoral care"
                title={
                  <>
                    Known, supported and{" "}
                    <span className="italic text-school-navy">safe.</span>
                  </>
                }
                description="Strong relationships create the conditions for learning. Heads of Year, Form Tutors and the counselling team work together to support academic progress and personal wellbeing."
              />
              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                <div className="border-l-2 border-school-gold bg-white p-6">
                  <HeartHandshake
                    aria-hidden="true"
                    className="size-7 text-school-red"
                    strokeWidth={1.5}
                  />
                  <h2 className="mt-5 font-serif text-2xl text-school-ink">
                    Student wellbeing
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-school-muted">
                    Personalised support for academic, social and emotional
                    development.
                  </p>
                </div>
                <div className="border-l-2 border-school-gold bg-white p-6">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-7 text-school-red"
                    strokeWidth={1.5}
                  />
                  <h2 className="mt-5 font-serif text-2xl text-school-ink">
                    Safeguarding
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-school-muted">
                    Clear structures and staff training help protect every
                    learner in our care.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Beyond the classroom"
              title={
                <>
                  Interests become{" "}
                  <span className="italic text-school-navy">strengths.</span>
                </>
              }
              description="Our co-curricular programme gives learners room to practise, create, compete and lead."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-2">
              {activities.map(
                ({ title, description, image, alt, items, Icon }) => (
                  <article
                    key={title}
                    className="overflow-hidden border border-school-navy/15 bg-school-cream"
                  >
                    <div className="relative aspect-[8/5] overflow-hidden bg-school-navy">
                      <Image
                        src={image}
                        alt={alt}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-7 sm:p-9">
                      <div className="flex items-center gap-4">
                        <Icon
                          aria-hidden="true"
                          className="size-7 text-school-red"
                          strokeWidth={1.5}
                        />
                        <h2 className="font-serif text-3xl text-school-ink">
                          {title}
                        </h2>
                      </div>
                      <p className="mt-5 max-w-xl text-sm leading-7 text-school-muted">
                        {description}
                      </p>
                      <ul className="mt-7 flex flex-wrap gap-2">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="border border-school-navy/15 bg-white px-3 py-2 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-school-navy"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ),
              )}
            </div>

            <div className="mt-12">
              <ButtonLink href="/gallery" variant="ghost">
                View the photo gallery
              </ButtonLink>
            </div>
          </div>
        </section>

        <section className="bg-school-navy py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="A culture of care"
                title="Safety makes confident learning possible."
                tone="light"
              />
            </div>
            <div className="space-y-5 text-base leading-8 text-white/68 lg:col-span-5 lg:col-start-8">
              <p>
                SLNA’s safeguarding approach includes regular staff training,
                clear reporting structures and open communication between
                learners, parents and staff.
              </p>
              <p>
                The counselling team offers confidential support when learners
                need help with academic, social, emotional or personal
                challenges.
              </p>
            </div>
          </div>
        </section>

        <AdmissionsCta />
      </main>
      <Footer />
    </>
  );
}
