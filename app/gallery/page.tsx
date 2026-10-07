import type { Metadata } from "next";
import { ManagedImage as Image } from "@/components/ManagedImage";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";
import { photoLibrary } from "@/data/site";

export const metadata: Metadata = {
  title: "Photo Gallery | Shah Lalji Nangpar Academy",
  description:
    "Explore learning, creativity, sport and community life at Shah Lalji Nangpar Academy through our photo gallery.",
  alternates: { canonical: "/gallery" },
};

const spans = [
  "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "sm:col-span-2 lg:col-span-8",
  "lg:col-span-5",
  "lg:col-span-7",
  "sm:col-span-2 lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "sm:col-span-2 lg:col-span-8",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-7",
  "sm:col-span-2 lg:col-span-12",
] as const;

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main>
        <InteriorHero
          eyebrow="Photo Gallery"
          title={
            <>
              Moments that tell the{" "}
              <span className="italic text-school-gold">school story.</span>
            </>
          }
          description="A glimpse of learning, creativity, teamwork and everyday belonging across the SLNA community."
          image="/images/school/creative-arts-masks.webp"
          imageKey="gallery.hero"
          imageAlt="Learners presenting colourful masks they created during an arts activity"
        />

        <section className="bg-school-cream py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
            <SectionHeading
              eyebrow="Life at SLNA"
              title={
                <>
                  Learning in{" "}
                  <span className="italic text-school-navy">full colour.</span>
                </>
              }
              description="From focused study to performance, competition and shared celebration, every image reflects part of the learner experience."
            />

            <div className="mt-14 grid auto-rows-[250px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[270px] lg:grid-cols-12">
              {photoLibrary.map((photo, index) => (
                <figure
                  key={photo.src}
                  className={`group relative overflow-hidden bg-school-navy ${spans[index]}`}
                >
                  <Image
                    src={photo.src}
                    imageKey={`gallery.photo.${index + 1}`}
                    alt={photo.alt}
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-school-navy/82 via-transparent to-transparent" />
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
                    <p className="text-[0.6rem] font-bold uppercase tracking-[0.17em] text-school-gold">
                      {photo.category}
                    </p>
                    <p className="mt-2 font-serif text-2xl leading-tight">
                      {photo.title}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <AdmissionsCta
          eyebrow="Experience the school"
          title="See the community behind the photographs."
          description="A campus visit is the best way to understand the learning environment, meet the team and imagine your child at SLNA."
        />
      </main>
      <Footer />
    </>
  );
}
