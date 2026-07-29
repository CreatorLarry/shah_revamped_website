import { ButtonLink } from "@/components/ButtonLink";

type AdmissionsCtaProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function AdmissionsCta({
  eyebrow = "Admissions",
  title = "See where your child could thrive.",
  description = "Our admissions team can answer your questions, arrange a visit and guide your family through the next steps.",
}: AdmissionsCtaProps) {
  return (
    <section className="relative overflow-hidden bg-school-red py-20 text-white sm:py-24">
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-40 size-[460px] rounded-full border border-white/20"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-52 right-[22%] size-[380px] rounded-full bg-school-navy/20"
      />
      <div className="relative mx-auto grid max-w-[1440px] gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:items-end lg:px-10">
        <div className="lg:col-span-8">
          <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/72">
            <span aria-hidden="true" className="h-px w-8 bg-white/65" />
            {eyebrow}
          </p>
          <h2 className="max-w-[900px] font-serif text-[clamp(2.8rem,6vw,6.1rem)] leading-[0.92] tracking-[-0.045em]">
            {title}
          </h2>
        </div>
        <div className="lg:col-span-4">
          <p className="max-w-md text-base leading-8 text-white/78">
            {description}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col">
            <ButtonLink href="/contact" variant="light">
              Make an enquiry
            </ButtonLink>
            <ButtonLink href="/admissions" variant="outline">
              Explore admissions
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
