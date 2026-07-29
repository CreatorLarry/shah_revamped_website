import Image from "next/image";
import {
  ArrowUpRight,
  Check,
  GraduationCap,
} from "lucide-react";
import { AcademicJourney } from "@/components/AcademicJourney";
import { ButtonLink } from "@/components/ButtonLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { SectionHeading } from "@/components/SectionHeading";
import { Strengths } from "@/components/Strengths";
import {
  gallery,
  school,
  schoolLife,
  statistics,
} from "@/data/site";
import { stories } from "@/data/stories";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <HeroSection />

        <section
          id="our-school"
          className="scroll-mt-28 overflow-hidden bg-school-cream py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-10">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="Welcome to SLNA"
                title={
                  <>
                    Where ambition finds{" "}
                    <span className="italic text-school-navy">purpose.</span>
                  </>
                }
              />
              <div className="mt-8 grid gap-6 border-t border-school-navy/15 pt-7 sm:grid-cols-[1fr_1.65fr]">
                <p className="text-[0.68rem] font-bold uppercase leading-6 tracking-[0.17em] text-school-red">
                  Nakuru, Kenya
                  <br />
                  Learners aged 2–18
                </p>
                <div className="space-y-5 text-base leading-8 text-school-muted">
                  <p>
                    Shah Lalji Nangpar Academy is a co-educational day school
                    providing a Cambridge Curriculum education across four
                    connected academic divisions.
                  </p>
                  <p>
                    From a child&apos;s earliest discoveries to the focus of
                    A-Level, the academy supports academic growth, creativity,
                    character and confidence within one welcoming community.
                  </p>
                </div>
              </div>
              <div className="mt-9 flex items-center gap-4">
                <span className="h-px flex-1 bg-school-navy/20" />
                <span className="text-[0.7rem] font-extrabold uppercase tracking-[0.21em] text-school-navy">
                  {school.motto}
                </span>
              </div>
            </div>

            <div className="relative lg:col-span-6">
              <div className="relative ml-auto aspect-[5/6] max-w-[610px] overflow-hidden bg-school-navy">
                <Image
                  src="/images/school/student-portrait.webp"
                  alt="A smiling SLNA learner in school uniform"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-school-navy/42 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 left-0 max-w-[300px] border-l-4 border-school-red bg-white p-6 shadow-[0_24px_60px_rgba(6,47,95,0.14)] sm:bottom-8 sm:p-8 lg:-left-10">
                <GraduationCap
                  aria-hidden="true"
                  className="mb-5 size-8 text-school-red"
                  strokeWidth={1.5}
                />
                <p className="font-serif text-2xl leading-tight tracking-[-0.02em] text-school-ink">
                  One school.
                  <br />
                  Every stage.
                  <br />
                  A shared standard.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="education"
          className="scroll-mt-28 bg-school-stone py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow="Academic journey"
                  title={
                    <>
                      Learning that moves{" "}
                      <span className="italic text-school-navy">with them.</span>
                    </>
                  }
                />
              </div>
              <p className="self-end text-base leading-8 text-school-muted lg:col-span-4 lg:col-start-9">
                A connected pathway gives every learner strong foundations,
                clear progression and growing independence from age 2 through
                Year 13.
              </p>
            </div>
            <AcademicJourney />
          </div>
        </section>

        <section className="relative overflow-hidden bg-school-navy py-20 sm:py-24 lg:py-32">
          <div
            aria-hidden="true"
            className="absolute -right-40 -top-72 size-[640px] rounded-full border border-white/10"
          />
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-52 size-[440px] rounded-full border border-school-gold/20"
          />
          <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow="Why Shah Lalji"
                  title="An education for the whole person."
                  tone="light"
                />
              </div>
              <p className="self-end text-base leading-8 text-white/68 lg:col-span-4 lg:col-start-9">
                Strong academics matter. So do the confidence, character and
                relationships that help young people use what they learn well.
              </p>
            </div>
            <Strengths />
          </div>
        </section>

        <section
          id="chairman-message"
          className="scroll-mt-28 bg-white py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="relative lg:col-span-5">
              <div className="relative aspect-[3/4] overflow-hidden bg-school-ink">
                <Image
                  src="/images/school/school-event-leadership.webp"
                  alt="School leadership speaking with learners during an academy event"
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Chairman’s welcome"
                title={
                  <>
                    A community with a{" "}
                    <span className="italic text-school-navy">
                      clear purpose.
                    </span>
                  </>
                }
              />
              <blockquote className="mt-9 border-l-2 border-school-gold pl-6 font-serif text-[clamp(1.65rem,3vw,2.55rem)] leading-[1.28] tracking-[-0.025em] text-school-ink sm:pl-8">
                “Education at SLNA reaches beyond academic achievement. We aim
                to shape thoughtful, confident and compassionate young people
                who will contribute meaningfully to society.”
              </blockquote>
              <p className="mt-8 max-w-2xl text-base leading-8 text-school-muted">
                Our Board, leadership and staff share an unwavering commitment
                to every learner&apos;s growth—building a nurturing environment
                where curiosity, character and excellence can flourish
                together.
              </p>
              <div className="mt-8 flex flex-col gap-6 border-t border-school-navy/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-serif text-2xl text-school-ink">
                    Mr Rajen Shah
                  </p>
                  <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-school-red">
                    Chair, Board of Governors
                  </p>
                </div>
                <a
                  href="https://shahlalji.ac.ke/our-school/about-us/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-school-navy transition-colors hover:text-school-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-navy"
                >
                  Read the full message
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="school-life"
          className="scroll-mt-28 overflow-hidden bg-school-cream py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow="Beyond the classroom"
                  title={
                    <>
                      A school life full of{" "}
                      <span className="italic text-school-navy">
                        possibility.
                      </span>
                    </>
                  }
                  description="Learners are encouraged to discover strengths, contribute to their community and develop the confidence to take part."
                />
                <div className="relative mt-10 aspect-[7/5] overflow-hidden bg-school-navy">
                  <Image
                    src="/images/school/cycling-club.webp"
                    alt="SLNA learners preparing their bicycles during an outdoor club activity"
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-navy/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white sm:bottom-7 sm:left-7 sm:right-7">
                    <p className="max-w-xs font-serif text-2xl leading-tight sm:text-3xl">
                      Space to learn, create, compete and belong.
                    </p>
                    <span className="hidden size-12 items-center justify-center border border-white/40 sm:flex">
                      <ArrowUpRight aria-hidden="true" className="size-5" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="self-end lg:col-span-4 lg:col-start-9">
                <p className="mb-5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-school-red">
                  A rich learner experience
                </p>
                <div className="border-t border-school-navy/20">
                  {schoolLife.map((item, index) => (
                    <div
                      key={item}
                      className="group flex min-h-16 items-center justify-between border-b border-school-navy/20 py-4"
                    >
                      <span className="font-serif text-xl text-school-ink transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                        {item}
                      </span>
                      <span className="text-[0.63rem] font-bold tracking-[0.16em] text-school-red">
                        0{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 border-l-2 border-school-gold bg-white p-6">
                  <p className="text-sm leading-7 text-school-muted">
                    From sport and creative activities to clubs and leadership,
                    learners have many ways to discover their strengths.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col gap-6 border-b border-school-navy/15 pb-8 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-school-red">
                  The academy at a glance
                </p>
                <h2 className="mt-4 font-serif text-4xl tracking-[-0.03em] text-school-ink sm:text-5xl">
                  Facts, clearly presented.
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-school-muted">
                A concise view of the school’s verified structure, location and
                educational pathway.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4">
              {statistics.map((stat) => (
                <div
                  key={stat.label}
                  className="min-h-52 border-b border-school-navy/15 py-8 sm:border-r sm:px-7 first:pl-0 lg:border-b-0 lg:py-10 last:border-r-0"
                >
                  <p className="font-serif text-6xl tracking-[-0.05em] text-school-navy sm:text-7xl">
                    {stat.value}
                  </p>
                  <p className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-school-ink">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-school-muted">
                    {stat.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-school-stone py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-7">
                <SectionHeading
                  eyebrow="Explore SLNA"
                  title={
                    <>
                      Continue your{" "}
                      <span className="italic text-school-navy">
                        discovery.
                      </span>
                    </>
                  }
                />
              </div>
              <p className="self-end text-sm leading-7 text-school-muted lg:col-span-4 lg:col-start-9">
                Learn more about the academic journey, everyday school life and
                the values that shape our community.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {stories.map((story) => (
                <article
                  key={story.title}
                  className="group bg-white shadow-[0_15px_50px_rgba(6,47,95,0.07)]"
                >
                  <a
                    href={story.href}
                    className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red"
                  >
                    <div className="relative aspect-[8/5] overflow-hidden bg-school-navy">
                      <Image
                        src={story.image}
                        alt={story.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6 sm:p-7">
                      <div className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-school-red">
                        {story.category}
                      </div>
                      <h3 className="mt-5 font-serif text-2xl leading-tight tracking-[-0.02em] text-school-ink sm:text-3xl">
                        {story.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-school-muted">
                        {story.excerpt}
                      </p>
                      <span className="mt-7 flex items-center gap-2 border-t border-school-navy/12 pt-4 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-school-navy transition-colors group-hover:text-school-red">
                        Explore
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
          </div>
        </section>

        <section
          id="admissions"
          className="relative scroll-mt-28 overflow-hidden bg-school-red py-20 text-white sm:py-24 lg:py-32"
        >
          <div
            aria-hidden="true"
            className="absolute -right-36 -top-36 size-[520px] rounded-full border border-white/18"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-56 right-[18%] size-[440px] rounded-full bg-school-navy/18"
          />
          <div className="relative mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-10">
            <div className="lg:col-span-8">
              <p className="mb-6 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/75">
                <span aria-hidden="true" className="h-px w-9 bg-white/70" />
                Begin your family’s journey
              </p>
              <h2 className="max-w-[980px] font-serif text-[clamp(3.15rem,7.8vw,7.4rem)] leading-[0.9] tracking-[-0.05em]">
                Come and see where your child could{" "}
                <span className="italic text-school-gold">thrive.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="max-w-md text-base leading-8 text-white/78">
                Our admissions team can answer your questions, arrange a visit
                and guide you through the next steps with care.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <ButtonLink href={school.emailHref} variant="light">
                  Make an Enquiry
                </ButtonLink>
                <ButtonLink href="/contact#visit" variant="outline">
                  Book a School Visit
                </ButtonLink>
                <a
                  href="/admissions"
                  className="flex min-h-12 items-center justify-between border-b border-white/35 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-school-gold hover:text-school-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:col-span-2 lg:col-span-1"
                >
                  Start an application
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className="scroll-mt-28 bg-white py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Gallery preview"
                title={
                  <>
                    Moments that tell the{" "}
                    <span className="italic text-school-navy">school story.</span>
                  </>
                }
              />
              <a
                href="/gallery"
                className="group inline-flex shrink-0 items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-school-navy transition-colors hover:text-school-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-navy"
              >
                View gallery preview
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </div>

            <div
              id="gallery-grid"
              className="mt-12 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[250px] lg:grid-cols-12 lg:auto-rows-[220px]"
            >
              {gallery.map((image, index) => {
                const gridClass = [
                  "col-span-2 row-span-2 lg:col-span-5",
                  "col-span-1 lg:col-span-3",
                  "col-span-1 lg:col-span-4",
                  "col-span-1 lg:col-span-4",
                  "col-span-1 lg:col-span-3",
                  "col-span-2 lg:col-span-7",
                ][index];

                return (
                  <div
                    key={image.src}
                    className={`group relative overflow-hidden bg-school-navy ${gridClass}`}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 42vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-school-navy/0 transition-colors group-hover:bg-school-navy/12" />
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-start gap-3 border-l-2 border-school-gold pl-4 text-sm leading-6 text-school-muted">
              <Check
                aria-hidden="true"
                className="mt-1 size-4 shrink-0 text-school-red"
              />
              Photography supplied by Shah Lalji Nangpar Academy, reflecting
              learning, creativity, sport and community life across the school.
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
