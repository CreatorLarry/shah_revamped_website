import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { school } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Notice | Shah Lalji Nangpar Academy",
  description:
    "How Shah Lalji Nangpar Academy handles personal information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Who is responsible for your information?",
    content: (
      <>
        <p>
          {school.name} is responsible for deciding how personal information
          submitted through this website is used. Questions about this notice
          or a privacy request can be sent to{" "}
          <a href={school.emailHref}>{school.email}</a>.
        </p>
      </>
    ),
  },
  {
    title: "Information we collect",
    content: (
      <>
        <p>
          When a parent or guardian submits an admissions enquiry, we collect
          their name, email address and telephone number, together with the
          child’s age, intended year group and the message provided. Authorised
          staff accounts also use sign-in information to access the school
          dashboard. If a visitor comments on a story, we collect the display
          name and comment they choose to submit. Comments are reviewed before
          publication.
        </p>
        <p>
          Like most hosted websites, our service providers may process limited
          technical information needed to deliver and secure the site, such as
          request timestamps, device or browser information and IP addresses.
        </p>
      </>
    ),
  },
  {
    title: "Why we use it",
    content: (
      <>
        <p>
          Enquiry details are used to respond to the family, discuss admissions
          and arrange a visit where requested. Staff authentication information
          is used to protect the dashboard and maintain the website. We do not
          use enquiry information for unrelated advertising. Story reactions
          and comments are used only to support respectful engagement with
          school news.
        </p>
      </>
    ),
  },
  {
    title: "Children’s information and school imagery",
    content: (
      <>
        <p>
          The enquiry form is intended for completion by a parent or guardian.
          Learner photographs and stories are managed by authorised school
          staff and should only be published where the school has an
          appropriate lawful basis and any required permissions under its
          safeguarding and media procedures.
        </p>
      </>
    ),
  },
  {
    title: "Service providers and transfers",
    content: (
      <>
        <p>
          The website uses Vercel for hosting and Supabase for database,
          storage and staff authentication services. These providers process
          information on the school’s behalf and may process it outside Kenya.
          The school is responsible for ensuring that any cross-border
          processing is covered by appropriate safeguards.
        </p>
      </>
    ),
  },
  {
    title: "Cookies and browser storage",
    content: (
      <>
        <p>
          The public site does not currently use advertising or analytics
          cookies. Essential cookies are used when authorised staff sign in so
          that the dashboard session remains secure. The privacy notice stores
          a small acknowledgement in your browser’s local storage so it does
          not appear on every visit. A functional identifier and local browser
          setting prevent repeated reactions to the same story; they are not
          used for advertising or cross-site tracking.
        </p>
        <p>
          If optional analytics or marketing tools are introduced later, this
          notice and the site’s consent controls must be updated before those
          tools are enabled.
        </p>
      </>
    ),
  },
  {
    title: "Retention and security",
    content: (
      <>
        <p>
          Personal information should be retained only for as long as it is
          needed for the purpose described above or to meet a legal obligation.
          Access to submitted enquiries and website management tools is limited
          to authorised staff. The school should periodically review and delete
          information that is no longer required.
        </p>
      </>
    ),
  },
  {
    title: "Your data-protection rights",
    content: (
      <>
        <p>
          Subject to Kenyan data-protection law, you may ask to be informed
          about the use of your personal information, access it, object to
          certain processing, or request correction or deletion where
          applicable. A parent or guardian may exercise relevant rights for a
          child.
        </p>
        <p>
          Contact the school first at <a href={school.emailHref}>{school.email}</a>.
          You may also contact the Office of the Data Protection Commissioner
          if you believe your data-protection rights have been infringed.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-school-navy pb-20 pt-32 text-white sm:pb-24 sm:pt-40 lg:pb-28 lg:pt-44">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-10">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-school-gold">
              Privacy &amp; data protection
            </p>
            <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              How we handle your information.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70">
              This notice explains what the website collects, why it is used
              and the choices available to you.
            </p>
            <p className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white/45">
              Last updated 13 October 2026
            </p>
          </div>
        </section>

        <section className="bg-school-cream py-16 sm:py-20 lg:py-24">
          <div className="mx-auto grid max-w-[1100px] gap-12 px-4 sm:px-6 lg:grid-cols-[250px_1fr] lg:px-10">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-school-red">
                At a glance
              </p>
              <p className="mt-4 text-sm leading-7 text-school-muted">
                No advertising or analytics cookies are currently used. The
                admissions form and secure staff dashboard are the main data
                processing features.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-flex border-b border-school-navy/25 pb-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-school-navy hover:border-school-red hover:text-school-red"
              >
                Contact the school
              </Link>
            </aside>

            <div className="divide-y divide-school-navy/15 border-y border-school-navy/15 bg-white px-6 sm:px-10">
              {sections.map((section) => (
                <section key={section.title} className="py-9 sm:py-11">
                  <h2 className="font-serif text-3xl tracking-[-0.03em] text-school-ink sm:text-4xl">
                    {section.title}
                  </h2>
                  <div className="mt-5 space-y-4 text-sm leading-7 text-school-muted [&_a]:font-semibold [&_a]:text-school-red [&_a]:underline [&_a]:underline-offset-4">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
