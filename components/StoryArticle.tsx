import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock3 } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import type { Story } from "@/data/stories";

type StoryArticleProps = {
  story: Story;
};

export function StoryArticle({ story }: StoryArticleProps) {
  return (
    <>
      <Header />
      <main>
        <header className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-school-navy text-white">
          <Image
            src={story.image}
            alt={story.alt}
            fill
            unoptimized
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,29,60,0.96)_0%,rgba(3,29,60,0.78)_48%,rgba(3,29,60,0.25)_100%),linear-gradient(0deg,rgba(3,29,60,0.88)_0%,transparent_62%)]" />
          <div className="relative mx-auto w-full max-w-[1440px] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-10 lg:pb-24">
            <Link
              href="/stories"
              className="inline-flex items-center gap-3 text-[0.66rem] font-bold uppercase tracking-[0.17em] text-white/60 transition-colors hover:text-school-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
            >
              <ArrowLeft aria-hidden="true" className="size-4" />
              All stories
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.16em] text-school-gold">
              <span>{story.category}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-white/40" />
              <span className="flex items-center gap-2 text-white/62">
                <Clock3 aria-hidden="true" className="size-4" />
                {story.readTime}
              </span>
            </div>
            <h1 className="mt-6 max-w-[980px] font-serif text-[clamp(3.5rem,8vw,7.7rem)] leading-[0.88] tracking-[-0.055em]">
              {story.title}
            </h1>
            <p className="mt-7 max-w-3xl text-base leading-8 text-white/76 sm:text-xl sm:leading-9">
              {story.excerpt}
            </p>
          </div>
        </header>

        <article className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
              <aside className="lg:col-span-3">
                <div className="border-l-2 border-school-gold bg-school-cream p-6 lg:sticky lg:top-28">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.17em] text-school-red">
                    In this story
                  </p>
                  <ol className="mt-5 space-y-4">
                    {story.sections.map((section, index) => (
                      <li key={section.heading}>
                        <a
                          href={`#section-${index + 1}`}
                          className="text-sm leading-6 text-school-muted transition-colors hover:text-school-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-school-red"
                        >
                          <span className="mr-2 font-bold text-school-red">
                            0{index + 1}
                          </span>
                          {section.heading}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </aside>

              <div className="lg:col-span-8 lg:col-start-5">
                <div className="space-y-20">
                  {story.sections.map((section, index) => (
                    <section
                      key={section.heading}
                      id={`section-${index + 1}`}
                      className="scroll-mt-32"
                    >
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-school-red">
                        0{index + 1}
                      </p>
                      <h2 className="mt-4 font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-school-ink sm:text-5xl">
                        {section.heading}
                      </h2>
                      <div className="mt-7 space-y-5 text-base leading-8 text-school-muted sm:text-lg sm:leading-9">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      {section.image && section.imageAlt ? (
                        <figure className="mt-10">
                          <div className="relative aspect-[8/5] overflow-hidden bg-school-stone">
                            <Image
                              src={section.image}
                              alt={section.imageAlt}
                              fill
                              unoptimized
                              sizes="(max-width: 1024px) 100vw, 67vw"
                              className="object-cover"
                            />
                          </div>
                        </figure>
                      ) : null}
                    </section>
                  ))}
                </div>

                <blockquote className="mt-20 border-l-4 border-school-gold bg-school-navy p-8 font-serif text-2xl leading-[1.35] text-white sm:p-10 sm:text-3xl">
                  “{story.quote}”
                </blockquote>
              </div>
            </div>
          </div>
        </article>

        <section className="bg-school-red py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-10">
            <div className="lg:col-span-8">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.19em] text-white/65">
                Continue exploring
              </p>
              <h2 className="mt-5 font-serif text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.94] tracking-[-0.045em]">
                There is more to discover at SLNA.
              </h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col">
              <ButtonLink href="/stories" variant="light">
                More stories
              </ButtonLink>
              <ButtonLink href="/admissions" variant="outline">
                Explore admissions
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
