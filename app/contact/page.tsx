import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, CalendarCheck, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";
import { school } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact Us | Shah Lalji Nangpar Academy",
  description:
    "Contact Shah Lalji Nangpar Academy in Nakuru to ask a question, discuss admissions or arrange a school visit.",
  alternates: { canonical: "/contact" },
};

const mapHref =
  "https://www.google.com/maps/search/?api=1&query=Shah+Lalji+Nangpar+Academy+Nakuru";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="Contact Us"
          title={
            <>
              Let’s begin the{" "}
              <span className="italic text-school-gold">conversation.</span>
            </>
          }
          description="Ask a question, discuss the right academic stage or arrange a visit. Our team is ready to help your family take the next step."
          image="/images/school/school-event-leadership.webp"
          imageAlt="School leaders speaking with learners during an academy event"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Get in touch"
              title={
                <>
                  We’re here to{" "}
                  <span className="italic text-school-navy">help.</span>
                </>
              }
              description="Choose the most convenient way to reach the school. Admissions enquiries are welcome throughout the year."
            />

            <div className="mt-14 grid border-l border-t border-school-navy/15 md:grid-cols-3">
              <a
                href={school.phoneHref}
                className="group min-h-64 border-b border-r border-school-navy/15 bg-white p-7 transition-colors hover:bg-school-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red sm:p-8"
              >
                <Phone
                  aria-hidden="true"
                  className="size-8 text-school-red group-hover:text-school-gold"
                  strokeWidth={1.5}
                />
                <p className="mt-12 text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red group-hover:text-school-gold">
                  Call the school
                </p>
                <p className="mt-3 font-serif text-2xl">{school.phoneDisplay}</p>
              </a>
              <a
                href={school.emailHref}
                className="group min-h-64 border-b border-r border-school-navy/15 bg-white p-7 transition-colors hover:bg-school-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red sm:p-8"
              >
                <Mail
                  aria-hidden="true"
                  className="size-8 text-school-red group-hover:text-school-gold"
                  strokeWidth={1.5}
                />
                <p className="mt-12 text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red group-hover:text-school-gold">
                  Email us
                </p>
                <p className="mt-3 break-all font-serif text-2xl">
                  {school.email}
                </p>
              </a>
              <a
                href={mapHref}
                target="_blank"
                rel="noreferrer"
                className="group min-h-64 border-b border-r border-school-navy/15 bg-white p-7 transition-colors hover:bg-school-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red sm:p-8"
              >
                <MapPin
                  aria-hidden="true"
                  className="size-8 text-school-red group-hover:text-school-gold"
                  strokeWidth={1.5}
                />
                <p className="mt-12 text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red group-hover:text-school-gold">
                  Find us in Nakuru
                </p>
                <p className="mt-3 font-serif text-2xl leading-tight">
                  {school.address}
                </p>
              </a>
            </div>
          </div>
        </section>

        <section
          id="visit"
          className="scroll-mt-32 bg-white py-20 sm:py-24 lg:py-32"
        >
          <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="relative aspect-[7/6] overflow-hidden bg-school-stone lg:col-span-6">
              <Image
                src="/images/school/campus-assembly.webp"
                alt="SLNA learners gathered for an assembly in the school courtyard"
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <SectionHeading
                eyebrow="Plan a visit"
                title={
                  <>
                    Come and see{" "}
                    <span className="italic text-school-navy">
                      SLNA for yourself.
                    </span>
                  </>
                }
                description="A visit gives your family the opportunity to experience the campus, discuss your child’s needs and understand the next steps."
              />
              <ul className="mt-9 border-t border-school-navy/15">
                {[
                  "Tell us your child’s age and current year group",
                  "Share the stage and proposed start date you are considering",
                  "Let us know the best way and time to contact you",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-4 border-b border-school-navy/15 py-4 text-sm leading-6 text-school-ink"
                  >
                    <CalendarCheck
                      aria-hidden="true"
                      className="mt-0.5 size-5 shrink-0 text-school-red"
                      strokeWidth={1.6}
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={school.emailHref}>Email admissions</ButtonLink>
                <a
                  href={mapHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-school-navy/20 px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-school-navy transition-colors hover:bg-school-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-navy"
                >
                  Open directions
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
