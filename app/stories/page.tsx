import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";
import { stories } from "../../data/stories";

export const metadata: Metadata = {
  title: "School Stories | Shah Lalji Nangpar Academy",
  description:
    "Read stories about learning, sport, creativity and community life at Shah Lalji Nangpar Academy.",
  alternates: { canonical: "/stories" },
};

export default function StoriesPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="School Stories"
          title={
            <>
              Experiences that shape{" "}
              <span className="italic text-school-gold">young lives.</span>
            </>
          }
          description="Explore the moments, programmes and people that bring learning to life across the SLNA community."
          image="/images/school/senior-students-community.webp"
          imageAlt="SLNA senior students sharing a lively moment together"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="From the academy"
              title={
                <>
                  Stories of curiosity,{" "}
                  <span className="italic text-school-navy">
                    courage and belonging.
                  </span>
                </>
              }
              description="Go beyond the timetable and discover how learners build confidence, deepen understanding and contribute to school life."
            />

            <div className="mt-14 grid gap-8 lg:grid-cols-3">
              {stories.map((story, index) => (
                <article
                  key={story.slug}
                  className={`group overflow-hidden border border-school-navy/15 bg-white ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <Link
                    href={story.href}
                    aria-label={`Read ${story.title}`}
                    className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red"
                  >
                    <div
                      className={`relative overflow-hidden bg-school-navy ${
                        index === 0 ? "aspect-[8/5]" : "aspect-[7/6]"
                      }`}
                    >
                      <Image
                        src={story.image}
                        alt={story.alt}
                        fill
                        unoptimized
                        sizes={
                          index === 0
                            ? "(max-width: 1024px) 100vw, 67vw"
                            : "(max-width: 1024px) 100vw, 33vw"
                        }
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                      />
                    </div>
                    <div className="p-7 sm:p-9">
                      <div className="flex flex-wrap items-center gap-3 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-school-red">
                        <span>{story.category}</span>
                        <span
                          aria-hidden="true"
                          className="size-1 rounded-full bg-school-gold"
                        />
                        <span className="flex items-center gap-2 text-school-muted">
                          <Clock3 aria-hidden="true" className="size-4" />
                          {story.readTime}
                        </span>
                      </div>
                      <div className="mt-5 flex items-start justify-between gap-5">
                        <h2 className="font-serif text-3xl leading-[1.02] tracking-[-0.03em] text-school-ink sm:text-4xl">
                          {story.title}
                        </h2>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="mt-1 size-6 shrink-0 text-school-red transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                        />
                      </div>
                      <p className="mt-5 text-sm leading-7 text-school-muted">
                        {story.excerpt}
                      </p>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <AdmissionsCta
          eyebrow="Visit SLNA"
          title="Discover the setting behind the stories."
          description="Meet our team, explore the campus and see how the SLNA experience could support your child’s next chapter."
        />
      </main>
      <Footer />
    </>
  );
}
