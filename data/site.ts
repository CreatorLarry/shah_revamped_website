export const school = {
  name: "Shah Lalji Nangpar Academy",
  shortName: "SLNA",
  motto: "Striving for Excellence",
  description:
    "A Cambridge Curriculum International School in Nakuru, Kenya, serving learners from Early Years to A-Level.",
  address: "P.O. Box 55 - 20100, Nakuru, Kenya",
  location: "Nakuru, Kenya",
  phoneDisplay: "+254 (0) 757 361 200",
  phoneHref: "tel:+254757361200",
  email: "info@shahlalji.ac.ke",
  emailHref: "mailto:info@shahlalji.ac.ke",
  social: {
    facebook: "https://www.facebook.com/shahlaljinangparacademy",
    instagram: "https://www.instagram.com/shahlaljinangpar/",
    linkedin:
      "https://www.linkedin.com/company/shah-lalji-nangpar/posts/?feedView=all",
  },
} as const;

export const navigation = [
  { label: "Our School", href: "#our-school" },
  { label: "Education", href: "#education" },
  { label: "Admissions", href: "#admissions" },
  { label: "School Life", href: "#school-life" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
] as const;

export const heroSlides = [
  {
    src: "/images/hero-campus.jpg",
    alt: "Temporary wide campus photography placeholder",
    label: "Our Campus",
    caption: "A welcoming place to learn and belong",
  },
  {
    src: "/images/school-life.jpg",
    alt: "Temporary school-life photography placeholder",
    label: "School Life",
    caption: "Learning, creativity and character in action",
  },
  {
    src: "/images/gallery-01.jpg",
    alt: "Temporary school-community photography placeholder",
    label: "Our Community",
    caption: "Growing with confidence from Early Years to A-Level",
  },
] as const;

export const academicJourney = [
  {
    index: "01",
    title: "Early Years",
    stage: "From age 2 · Early foundations",
    description:
      "A warm, purposeful start where play, curiosity and early learning build confidence for the journey ahead.",
    image: "/images/early-years.jpg",
    href: "#contact",
  },
  {
    index: "02",
    title: "Junior School",
    stage: "Primary · Up to Year 6",
    description:
      "Engaging Cambridge-aligned learning that develops strong foundations, inquiry and a growing sense of independence.",
    image: "/images/junior-school.jpg",
    href: "#contact",
  },
  {
    index: "03",
    title: "Senior School",
    stage: "Years 7–11 · IGCSE pathway",
    description:
      "A broad and inclusive programme that deepens subject knowledge, critical thinking and personal responsibility.",
    image: "/images/senior-school.jpg",
    href: "#contact",
  },
  {
    index: "04",
    title: "A-Level",
    stage: "Years 12–13 · Age 16+",
    description:
      "A focused two-year pathway that prepares ambitious learners for university, leadership and life beyond school.",
    image: "/images/a-level.jpg",
    href: "#contact",
  },
] as const;

export const strengths = [
  {
    title: "Cambridge Curriculum",
    description:
      "A coherent international pathway from early learning through IGCSE and A-Level.",
    icon: "book",
  },
  {
    title: "Holistic Development",
    description:
      "Learning enriched by sport, the arts, clubs and opportunities beyond the classroom.",
    icon: "spark",
  },
  {
    title: "Character & Leadership",
    description:
      "An education that values confidence, compassion, responsibility and service.",
    icon: "compass",
  },
  {
    title: "Supportive Community",
    description:
      "A welcoming school culture shaped by partnership between learners, families and staff.",
    icon: "people",
  },
] as const;

export const schoolLife = [
  "Academics",
  "Sports",
  "Arts",
  "Clubs",
  "Leadership",
  "Community engagement",
] as const;

// TODO(content): Replace each unavailable value only after the school provides
// a verified figure. The homepage intentionally renders an em dash until then.
export const statistics = [
  {
    label: "Learners",
    value: "—",
    note: "Verified figure to be supplied",
  },
  {
    label: "Years of excellence",
    value: "—",
    note: "Verified figure to be supplied",
  },
  {
    label: "Academic divisions",
    value: "4",
    note: "Early Years to A-Level",
  },
  {
    label: "Learner age range",
    value: "2–18",
    note: "As stated on the current school website",
  },
] as const;

// TODO(content): These cards are intentionally marked as sample content. Replace
// them with approved stories, dates and images before the public content launch.
export const stories = [
  {
    category: "Sample story",
    title: "Inside a Day at SLNA",
    excerpt:
      "A placeholder feature introducing the rhythm, relationships and experiences that shape a school day.",
    image: "/images/gallery-02.jpg",
    status: "Replace with an approved school story",
  },
  {
    category: "Sample guide",
    title: "The Cambridge Journey, Explained",
    excerpt:
      "A placeholder editorial guide showing families how learning progresses from Early Years to A-Level.",
    image: "/images/gallery-04.jpg",
    status: "Replace with approved admissions content",
  },
  {
    category: "Sample profile",
    title: "Meet Our Learning Community",
    excerpt:
      "A placeholder profile format for future stories about learners, educators, families and school life.",
    image: "/images/gallery-06.jpg",
    status: "Replace with an approved community story",
  },
] as const;

export const gallery = [
  {
    src: "/images/gallery-01.jpg",
    alt: "Placeholder for a wide school campus photograph",
  },
  {
    src: "/images/gallery-02.jpg",
    alt: "Placeholder for a classroom learning photograph",
  },
  {
    src: "/images/gallery-03.jpg",
    alt: "Placeholder for a student activity photograph",
  },
  {
    src: "/images/gallery-04.jpg",
    alt: "Placeholder for a sports photograph",
  },
  {
    src: "/images/gallery-05.jpg",
    alt: "Placeholder for an arts and creativity photograph",
  },
  {
    src: "/images/gallery-06.jpg",
    alt: "Placeholder for a school community photograph",
  },
] as const;
