import type { Metadata } from "next";
import { CalendarDays, Clock3, MapPin } from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { ManagedImage as Image } from "@/components/ManagedImage";
import { SectionHeading } from "@/components/SectionHeading";
import { getPublishedEvents } from "@/db/dashboard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Upcoming Events | Shah Lalji Nangpar Academy",
  description: "See upcoming events, activities and important dates at Shah Lalji Nangpar Academy.",
  alternates: { canonical: "/events" },
};

export default async function EventsPage() {
  let events = [] as Awaited<ReturnType<typeof getPublishedEvents>>;
  try {
    events = await getPublishedEvents();
  } catch {
    // The designed empty state keeps this page usable before its migration runs.
  }

  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="School Calendar"
          title={<>What’s coming <span className="italic text-school-gold">next.</span></>}
          description="Keep up with the gatherings, competitions, performances and important dates that bring our school community together."
          image="/images/school/campus-assembly.webp"
          imageKey="events.hero"
          imageAlt="SLNA learners gathered for a school event"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Upcoming Events"
              title={<>Dates for your <span className="italic text-school-navy">diary.</span></>}
              description="Event details are published by the school team and may be updated as arrangements are confirmed."
            />

            {events.length ? (
              <div className="mt-14 grid gap-8 lg:grid-cols-2">
                {events.map((event) => (
                  <article key={event.id} className="overflow-hidden border border-school-navy/15 bg-white shadow-sm">
                    <div className="relative aspect-[16/9] overflow-hidden bg-school-navy">
                      <Image
                        src={event.image}
                        imageKey={`event.${event.slug}.image`}
                        alt={event.alt}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-7 sm:p-9">
                      <p className="flex items-center gap-2 text-[0.66rem] font-bold uppercase tracking-[0.15em] text-school-red">
                        <CalendarDays aria-hidden="true" className="size-4" />
                        {formatEventDate(event.startsAt)}
                      </p>
                      <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] text-school-ink sm:text-4xl">{event.title}</h2>
                      <p className="mt-4 text-sm leading-7 text-school-muted">{event.summary}</p>
                      <div className="mt-6 grid gap-3 border-t border-school-navy/10 pt-5 text-sm text-school-ink sm:grid-cols-2">
                        <span className="flex items-center gap-3"><Clock3 aria-hidden="true" className="size-4 text-school-red" />{formatEventTime(event.startsAt, event.endsAt)}</span>
                        <span className="flex items-center gap-3"><MapPin aria-hidden="true" className="size-4 text-school-red" />{event.location}</span>
                      </div>
                      <p className="mt-6 whitespace-pre-line text-sm leading-7 text-school-ink">{event.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-14 border-l-4 border-school-gold bg-white p-8 sm:p-10">
                <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-school-red">Calendar update</p>
                <h2 className="mt-3 font-serif text-3xl text-school-ink">New dates will appear here soon.</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-school-muted">The school team is preparing the next set of events. Please check back, or contact the academy for a specific date.</p>
              </div>
            )}
          </div>
        </section>
        <AdmissionsCta title="Come and experience the academy." description="Arrange a visit and meet the people behind our learning community." />
      </main>
      <Footer />
    </>
  );
}

function formatEventDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "Africa/Nairobi" }).format(new Date(value));
}

function formatEventTime(start: string, end: string | null) {
  const formatter = new Intl.DateTimeFormat("en-KE", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Nairobi" });
  return end ? `${formatter.format(new Date(start))} – ${formatter.format(new Date(end))}` : formatter.format(new Date(start));
}
