import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Quote } from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import type { LeadershipMessage } from "@/data/leadership";

type LeadershipMessagePageProps = {
  message: LeadershipMessage;
};

export function LeadershipMessagePage({
  message,
}: LeadershipMessagePageProps) {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow={message.eyebrow}
          title={
            <>
              {message.title}{" "}
              <span className="italic text-school-gold">{message.accent}</span>
            </>
          }
          description={message.description}
          image={message.image}
          imageAlt={message.imageAlt}
          imagePosition={message.imagePosition}
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <aside className="lg:col-span-4">
              <div className="sticky top-32 border-t-4 border-school-red bg-white p-7 shadow-[0_18px_45px_rgba(6,47,95,0.08)] sm:p-8">
                <div className="relative aspect-[4/3] overflow-hidden bg-school-stone">
                  <Image
                    src={message.image}
                    alt={message.imageAlt}
                    fill
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 32vw"
                    className={`object-cover ${message.imagePosition ?? "object-center"}`}
                  />
                </div>
                <p className="mt-7 font-serif text-3xl leading-tight text-school-ink">
                  {message.person}
                </p>
                <p className="mt-2 text-[0.67rem] font-bold uppercase tracking-[0.16em] text-school-red">
                  {message.role}
                </p>
                <Link
                  href="/our-school/senior-management-team"
                  className="mt-7 inline-flex items-center gap-3 border-t border-school-navy/15 pt-5 text-[0.67rem] font-bold uppercase tracking-[0.14em] text-school-navy transition-colors hover:text-school-red"
                >
                  Meet the leadership team
                </Link>
              </div>
            </aside>

            <article className="lg:col-span-7 lg:col-start-6">
              <Quote
                aria-hidden="true"
                className="size-10 text-school-gold"
                strokeWidth={1.4}
              />
              <p className="mt-7 font-serif text-3xl leading-[1.35] tracking-[-0.025em] text-school-ink sm:text-4xl">
                A welcome from {message.person}.
              </p>

              <div className="mt-10 space-y-12">
                {message.sections.map((section, index) => (
                  <section
                    key={section.heading ?? `message-section-${index + 1}`}
                    className="border-t border-school-navy/15 pt-9"
                  >
                    {section.heading ? (
                      <h2 className="font-serif text-3xl leading-tight text-school-ink">
                        {section.heading}
                      </h2>
                    ) : null}
                    <div
                      className={`space-y-5 text-base leading-8 text-school-muted ${
                        section.heading ? "mt-6" : ""
                      }`}
                    >
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <footer className="mt-12 border-l-2 border-school-gold bg-white p-7 sm:p-8">
                <p className="font-serif text-2xl text-school-ink">
                  {message.person}
                </p>
                <p className="mt-2 text-[0.67rem] font-bold uppercase tracking-[0.16em] text-school-red">
                  {message.role}
                </p>
              </footer>

              <Link
                href="/our-school/about-us"
                className="mt-10 inline-flex items-center gap-3 text-[0.67rem] font-bold uppercase tracking-[0.15em] text-school-navy transition-colors hover:text-school-red"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Return to About Us
              </Link>
            </article>
          </div>
        </section>

        <AdmissionsCta />
      </main>
      <Footer />
    </>
  );
}
