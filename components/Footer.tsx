import { ManagedImage as Image } from "@/components/ManagedImage";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Mail,
  MapPin,
  MessageCircle,
  Network,
  Phone,
} from "lucide-react";
import { creator, educationLinks, navigation, school } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-school-ink text-white">
      <div className="border-b border-white/12">
        <div className="mx-auto grid max-w-[1440px] gap-px bg-white/12 px-4 sm:px-6 md:grid-cols-3 lg:px-10">
          <a
            href={school.phoneHref}
            className="group flex min-h-32 items-start gap-4 bg-school-ink px-1 py-8 transition-colors hover:bg-school-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-school-gold sm:px-6"
          >
            <Phone
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-school-gold"
            />
            <span>
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/45">
                Call admissions
              </span>
              <span className="mt-2 block font-serif text-xl text-white">
                {school.phoneDisplay}
              </span>
            </span>
          </a>
          <a
            href={school.emailHref}
            className="group flex min-h-32 items-start gap-4 bg-school-ink px-1 py-8 transition-colors hover:bg-school-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-school-gold sm:px-6"
          >
            <Mail
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-school-gold"
            />
            <span>
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/45">
                Email the school
              </span>
              <span className="mt-2 block break-all font-serif text-xl text-white">
                {school.email}
              </span>
            </span>
          </a>
          <div className="flex min-h-32 items-start gap-4 bg-school-ink px-1 py-8 sm:px-6">
            <MapPin
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-school-gold"
            />
            <span>
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.18em] text-white/45">
                Find us
              </span>
              <span className="mt-2 block font-serif text-xl leading-7 text-white">
                {school.address}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-12 lg:px-10 lg:py-20">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-4">
            <Image
              src="/images/school-logo.png"
              imageKey="global.footer.logo"
              alt=""
              width={90}
              height={90}
              unoptimized
              className="h-[78px] w-[78px] object-contain"
            />
            <div>
              <p className="max-w-[220px] text-sm font-extrabold uppercase leading-[1.35] tracking-[0.09em]">
                {school.name}
              </p>
              <p className="mt-2 text-[0.67rem] font-bold uppercase tracking-[0.18em] text-school-gold">
                {school.motto}
              </p>
            </div>
          </div>
          <p className="mt-7 max-w-sm text-sm leading-7 text-white/58">
            {school.description}
          </p>
          <div className="mt-7 flex gap-2">
            {[
              {
                label: "Facebook",
                href: school.social.facebook,
                Icon: MessageCircle,
              },
              {
                label: "Instagram",
                href: school.social.instagram,
                Icon: Camera,
              },
              {
                label: "LinkedIn",
                href: school.social.linkedin,
                Icon: Network,
              },
            ].map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${label} (opens in a new tab)`}
                className="flex size-11 items-center justify-center border border-white/15 text-white/70 transition-colors hover:border-school-gold hover:bg-school-gold hover:text-school-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-school-gold"
              >
                <Icon aria-hidden="true" className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 lg:col-start-6">
          <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-school-gold">
            Quick links
          </h2>
          <ul className="mt-6 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-sm text-white/62 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-school-gold"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-school-gold">
            Education
          </h2>
          <ul className="mt-6 space-y-3">
            {educationLinks.map((stage) => (
              <li key={stage.href}>
                <a
                  href={stage.href}
                  className="text-sm text-white/62 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-school-gold"
                >
                  {stage.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-school-gold">
            School stories
          </h2>
          <p className="mt-6 text-sm leading-6 text-white/58">
            Explore features from across the academy—from early discovery and
            student life to sport, creativity and learning beyond the classroom.
          </p>
          <Link
            href="/stories"
            className="mt-6 inline-flex items-center gap-3 border-b border-white/25 pb-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-school-gold transition-colors hover:border-school-gold hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-school-gold"
          >
            Read our stories
            <span
              className="flex size-8 items-center justify-center border border-white/20"
              aria-hidden="true"
            >
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-6 text-[0.65rem] uppercase tracking-[0.12em] text-white/38 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
          <p>© 2026 {school.name}. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/admissions" className="transition-colors hover:text-white">
              Admissions
            </Link>
            <Link href="/contact" className="transition-colors hover:text-white">
              Contact us
            </Link>
            <Link href="/dashboard" className="transition-colors hover:text-white">
              Staff dashboard
            </Link>
            {creator.portfolioUrl ? (
              <a
                href={creator.portfolioUrl}
                target="_blank"
                rel="noreferrer"
                className="text-school-gold transition-colors hover:text-white"
              >
                Created by {creator.name}
              </a>
            ) : (
              <span
                className="text-school-gold"
                title="Portfolio link will be added when the new portfolio is ready"
              >
                Created by {creator.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
