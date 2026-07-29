import { Check } from "lucide-react";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { ButtonLink } from "@/components/ButtonLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";
import type { ContentPage } from "@/data/content-pages";

type ContentDetailPageProps = {
  page: ContentPage;
};

export function ContentDetailPage({ page }: ContentDetailPageProps) {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow={page.hero.eyebrow}
          title={
            <>
              {page.hero.title}{" "}
              <span className="italic text-school-gold">
                {page.hero.accent}
              </span>
            </>
          }
          description={page.hero.description}
          image={page.hero.image}
          imageAlt={page.hero.imageAlt}
          imagePosition={page.hero.imagePosition}
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1440px] gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-20 lg:px-10">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow={page.introduction.eyebrow}
                title={
                  <>
                    {page.introduction.title}{" "}
                    {page.introduction.accent ? (
                      <span className="italic text-school-navy">
                        {page.introduction.accent}
                      </span>
                    ) : null}
                  </>
                }
              />
            </div>
            <div className="space-y-5 text-base leading-8 text-school-muted lg:col-span-5 lg:col-start-8">
              {page.introduction.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div
            className={`mx-auto mt-16 grid max-w-[1440px] border-l border-t border-school-navy/15 px-4 sm:px-6 lg:px-10 ${
              page.highlights.length === 4
                ? "sm:grid-cols-2 lg:grid-cols-4"
                : "md:grid-cols-3"
            }`}
          >
            {page.highlights.map((highlight) => (
              <article
                key={highlight.label}
                className="min-h-52 border-b border-r border-school-navy/15 bg-white p-7 sm:p-8"
              >
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-school-red">
                  {highlight.label}
                </p>
                <p className="mt-8 font-serif text-3xl leading-tight text-school-ink sm:text-4xl">
                  {highlight.value}
                </p>
                <p className="mt-3 text-sm leading-6 text-school-muted">
                  {highlight.note}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] divide-y divide-school-navy/15 px-4 sm:px-6 lg:px-10">
            {page.sections.map((section, index) => (
              <article
                key={section.title}
                className="grid gap-9 py-14 first:pt-0 last:pb-0 lg:grid-cols-12 lg:gap-20 lg:py-20"
              >
                <div className="lg:col-span-5">
                  <p className="text-[0.67rem] font-bold uppercase tracking-[0.18em] text-school-red">
                    {section.eyebrow ?? `Section 0${index + 1}`}
                  </p>
                  <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-school-ink sm:text-5xl">
                    {section.title}
                  </h2>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="space-y-5 text-base leading-8 text-school-muted">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.points?.length ? (
                    <ul className="mt-8 border-t border-school-navy/15">
                      {section.points.map((point) => (
                        <li
                          key={point}
                          className="flex gap-4 border-b border-school-navy/15 py-4 text-sm leading-6 text-school-ink sm:text-base"
                        >
                          <Check
                            aria-hidden="true"
                            className="mt-0.5 size-5 shrink-0 text-school-red"
                            strokeWidth={1.8}
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        {page.notice ? (
          <section className="bg-school-navy py-20 text-white sm:py-24">
            <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-10">
              <div className="lg:col-span-7">
                <p className="text-[0.67rem] font-bold uppercase tracking-[0.19em] text-school-gold">
                  {page.notice.eyebrow}
                </p>
                <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.035em] sm:text-5xl">
                  {page.notice.title}
                </h2>
              </div>
              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-base leading-8 text-white/68">
                  {page.notice.description}
                </p>
                <ButtonLink
                  href={page.notice.actionHref}
                  variant="light"
                  className="mt-7"
                >
                  {page.notice.actionLabel}
                </ButtonLink>
              </div>
            </div>
          </section>
        ) : null}

        <AdmissionsCta
          title="Discover the right next step."
          description="Speak with our admissions team about the programme, entry point and practical information that matter to your family."
        />
      </main>
      <Footer />
    </>
  );
}
