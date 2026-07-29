import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, Clock3 } from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";
import { seniorManagementTeam } from "@/data/leadership";

export const metadata: Metadata = {
  title: "Senior Management Team | Shah Lalji Nangpar Academy",
  description:
    "Meet the academic and operational leaders who form the Senior Management Team at Shah Lalji Nangpar Academy.",
  alternates: { canonical: "/our-school/senior-management-team" },
};

export default function SeniorManagementTeamPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="Senior Management Team"
          title={
            <>
              Leadership across{" "}
              <span className="italic text-school-gold">every function.</span>
            </>
          }
          description="Academic and operational leaders working together to keep learning, wellbeing, technology, facilities and finance moving in one clear direction."
          image="/images/school/school-event-leadership.webp"
          imageAlt="School leaders engaging with learners during an academy event"
          imagePosition="object-center"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="One leadership team"
                title={
                  <>
                    Academic vision.{" "}
                    <span className="italic text-school-navy">
                      Operational strength.
                    </span>
                  </>
                }
              />
            </div>
            <div className="space-y-5 text-base leading-8 text-school-muted lg:col-span-5 lg:col-start-8">
              <p>
                The Senior Management Team brings school-stage leadership
                together with the functions that support a safe, organised and
                future-ready academy.
              </p>
              <p>
                Confirmed leaders are named below. Operational roles whose
                names or portraits are still being assembled are included in
                the structure and clearly marked for completion before launch.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid border-l border-t border-school-navy/15 sm:grid-cols-2 xl:grid-cols-3">
              {seniorManagementTeam.map((member, index) => {
                const initials = member.confirmed
                  ? member.name
                      .replace(/^(Mr|Ms|Mrs|Dr)\.?\s+/i, "")
                      .split(/\s+/)
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : member.role
                      .split(/\s+/)
                      .filter((part) => !["of", "the"].includes(part.toLowerCase()))
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase();
                const StatusIcon = member.confirmed ? BadgeCheck : Clock3;

                return (
                  <article
                    key={member.role}
                    className={`min-h-[390px] border-b border-r border-school-navy/15 p-7 sm:p-8 ${
                      member.confirmed ? "bg-white" : "bg-school-cream/60"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <span
                        aria-hidden="true"
                        className={`flex size-16 items-center justify-center font-serif text-2xl ${
                          member.confirmed
                            ? "bg-school-navy text-white"
                            : "border border-dashed border-school-navy/30 text-school-navy"
                        }`}
                      >
                        {initials}
                      </span>
                      <span className="text-[0.62rem] font-bold tracking-[0.16em] text-school-navy/30">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-8 text-[0.64rem] font-bold uppercase tracking-[0.16em] text-school-red">
                      {member.area}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl leading-tight text-school-ink">
                      {member.name}
                    </h2>
                    <p className="mt-2 text-sm font-bold uppercase tracking-[0.11em] text-school-navy">
                      {member.role}
                    </p>
                    <p className="mt-5 text-sm leading-7 text-school-muted">
                      {member.description}
                    </p>
                    <p
                      className={`mt-6 flex items-center gap-2 text-[0.62rem] font-bold uppercase tracking-[0.13em] ${
                        member.confirmed
                          ? "text-school-navy"
                          : "text-school-muted"
                      }`}
                    >
                      <StatusIcon aria-hidden="true" className="size-4" />
                      {member.confirmed
                        ? "Profile confirmed"
                        : "Name and portrait pending"}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-school-navy py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-10">
            <div className="lg:col-span-7">
              <p className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-school-gold">
                Governance and administration
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">
                Read directly from the academy’s leadership.
              </h2>
            </div>
            <div className="grid gap-3 lg:col-span-4 lg:col-start-9">
              {[
                {
                  label: "Message from the Board Chair",
                  href: "/our-school/board-chair-message",
                },
                {
                  label: "Message from the School Administrator",
                  href: "/our-school/school-administrator-message",
                },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between border border-white/20 px-5 py-4 text-[0.67rem] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:border-school-gold hover:text-school-gold"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <AdmissionsCta />
      </main>
      <Footer />
    </>
  );
}
