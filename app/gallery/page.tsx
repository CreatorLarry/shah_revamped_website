import type { Metadata } from "next";
import { AdmissionsCta } from "@/components/AdmissionsCta";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { InteriorHero } from "@/components/InteriorHero";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryLightboxGrid } from "@/components/GalleryLightboxGrid";

export const metadata: Metadata = {
  title: "Photo Gallery | Shah Lalji Nangpar Academy",
  description:
    "Explore learning, creativity, sport and community life at Shah Lalji Nangpar Academy through our photo gallery.",
  alternates: { canonical: "/gallery" },
};

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

            <GalleryLightboxGrid />
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
