import type { Metadata } from "next";
import {
  BadgeCheck,
  CalendarDays,
  ClipboardCheck,
  FileText,
  MessageCircle,
  UserRoundCheck,
} from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { ButtonLink } from "@/components/ButtonLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Admissions | Shah Lalji Nangpar Academy",
  description:
    "Learn about admissions, assessments, required documents and joining Shah Lalji Nangpar Academy in Nakuru.",
  alternates: { canonical: "/admissions" },
};

const steps = [
  {
    title: "Make an enquiry",
    description:
      "Contact the admissions team with your child’s age, current school and preferred year of entry.",
    Icon: MessageCircle,
  },
  {
    title: "Visit the academy",
    description:
      "An informal visit is recommended so your family can meet the school and ask questions.",
    Icon: CalendarDays,
  },
  {
    title: "Complete an assessment",
    description:
      "Junior and Senior School applicants complete an age-appropriate assessment.",
    Icon: ClipboardCheck,
  },
  {
    title: "Submit the application",
    description:
      "Complete the admission form and provide the supporting documents requested by the school.",
    Icon: FileText,
  },
  {
    title: "Interview and confirmation",
    description:
      "Final admission follows an interview and written confirmation of placement and start date.",
    Icon: UserRoundCheck,
  },
] as const;

export default function AdmissionsPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="Admissions"
          title={
            <>
              Your family’s journey{" "}
              <span className="italic text-school-gold">starts here.</span>
            </>
          }
          description="SLNA welcomes learners from all backgrounds. Our admissions team will help you understand the right entry point and guide you through every step."
          image="/images/school/campus-assembly.webp"
          imageAlt="SLNA learners gathered for an assembly in the school courtyard"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="lg:col-span-7">
              <SectionHeading
                eyebrow="Joining SLNA"
                title={
                  <>
                    A clear and{" "}
                    <span className="italic text-school-navy">
                      supportive process.
                    </span>
                  </>
                }
                description="Applications are considered for Early Years, Junior School, Senior School and A-Level, subject to the availability of places."
              />
            </div>
            <div className="self-end lg:col-span-4 lg:col-start-9">
              <div className="border-l-2 border-school-gold bg-white p-7">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red">
                  Entry ages
                </p>
                <p className="mt-4 font-serif text-2xl leading-tight text-school-ink">
                  Early Years to Junior School
                </p>
                <p className="mt-2 text-sm text-school-muted">Ages 2–11</p>
                <p className="mt-5 font-serif text-2xl leading-tight text-school-ink">
                  Senior School and A-Level
                </p>
                <p className="mt-2 text-sm text-school-muted">Up to age 18</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Admission steps"
              title="From enquiry to first day."
              description="The admissions team will confirm the exact requirements for your child’s year group."
            />
            <div className="mt-14 grid border-l border-t border-school-navy/15 md:grid-cols-2 lg:grid-cols-5">
              {steps.map(({ title, description, Icon }, index) => (
                <article
                  key={title}
                  className="min-h-[300px] border-b border-r border-school-navy/15 p-7"
                >
                  <div className="flex items-start justify-between">
                    <Icon
                      aria-hidden="true"
                      className="size-7 text-school-red"
                      strokeWidth={1.5}
                    />
                    <span className="text-[0.62rem] font-bold tracking-[0.16em] text-school-navy/35">
                      0{index + 1}
                    </span>
                  </div>
                  <h2 className="mt-10 font-serif text-2xl leading-tight text-school-ink">
                    {title}
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-school-muted">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-school-stone py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-14 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Prepare your application"
                title={
                  <>
                    Documents to{" "}
                    <span className="italic text-school-navy">bring.</span>
                  </>
                }
                description="The school may request additional information depending on the applicant’s age and previous school."
              />
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <ul className="border-t border-school-navy/20">
                {[
                  "Copy of the learner’s passport or birth certificate",
                  "The previous two academic reports",
                  "Leaving certificate from the previous school",
                  "Parent or guardian passport photo",
                  "Parent or guardian ID or passport copy",
                ].map((document) => (
                  <li
                    key={document}
                    className="flex items-center gap-4 border-b border-school-navy/20 py-5 text-sm leading-6 text-school-ink sm:text-base"
                  >
                    <BadgeCheck
                      aria-hidden="true"
                      className="size-5 shrink-0 text-school-red"
                      strokeWidth={1.6}
                    />
                    {document}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-school-navy py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-10">
            {[
              [
                "When can learners join?",
                "The academic year begins in September, but learners may join during the year when places are available.",
              ],
              [
                "What if a year group is full?",
                "Applicants may join a first-come, first-served waiting list. Siblings of current learners may receive priority.",
              ],
              [
                "Where can we confirm fees?",
                "The admissions office provides the current fee schedule, payment details, term dates and school calendar.",
              ],
            ].map(([question, answer]) => (
              <article
                key={question}
                className="border border-white/15 p-7 sm:p-8"
              >
                <h2 className="font-serif text-2xl leading-tight">
                  {question}
                </h2>
                <p className="mt-5 text-sm leading-7 text-white/62">
                  {answer}
                </p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="light">
                Speak with admissions
              </ButtonLink>
              <ButtonLink href="/admissions/fee-structure" variant="outline">
                View fee structure
              </ButtonLink>
            </div>
          </div>
        </section>

        <AdmissionsCta
          eyebrow="Take the next step"
          title="Come and experience SLNA."
          description="Arrange a conversation or campus visit and let our team help you decide whether SLNA is the right fit for your family."
        />
      </main>
      <Footer />
    </>
  );
}
