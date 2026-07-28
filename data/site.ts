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
    src: "/images/school/campus-assembly.webp",
    alt: "SLNA learners gathered for an assembly in the school courtyard",
    label: "Our Campus",
    caption: "A welcoming place to learn and belong",
  },
  {
    src: "/images/school/sports-day-community.webp",
    alt: "Junior learners enjoying an energetic outdoor school activity",
    label: "School Life",
    caption: "Learning, creativity and character in action",
  },
  {
    src: "/images/school/senior-students-community.webp",
    alt: "Senior students gathered together in their red school blazers",
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
    image: "/images/school/early-years-fruit-learning.webp",
    alt: "Early Years learners exploring different fruits with their teachers",
    href: "#contact",
  },
  {
    index: "02",
    title: "Junior School",
    stage: "Primary · Up to Year 6",
    description:
      "Engaging Cambridge-aligned learning that develops strong foundations, inquiry and a growing sense of independence.",
    image: "/images/school/chess-club.webp",
    alt: "Junior School learners concentrating during a chess activity",
    href: "#contact",
  },
  {
    index: "03",
    title: "Senior School",
    stage: "Years 7–11 · IGCSE pathway",
    description:
      "A broad and inclusive programme that deepens subject knowledge, critical thinking and personal responsibility.",
    image: "/images/school/outdoor-study.webp",
    alt: "A Senior School learner writing during an outdoor study session",
    href: "#contact",
  },
  {
    index: "04",
    title: "A-Level",
    stage: "Years 12–13 · Age 16+",
    description:
      "A focused two-year pathway that prepares ambitious learners for university, leadership and life beyond school.",
    image: "/images/school/museum-learning-trip.webp",
    alt: "Senior learners taking part in an educational museum visit",
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
// them with approved stories and dates before the public content launch.
export const stories = [
  {
    category: "Sample story",
    title: "Inside a Day at SLNA",
    excerpt:
      "A placeholder feature introducing the rhythm, relationships and experiences that shape a school day.",
    image: "/images/school/outdoor-study.webp",
    alt: "A learner focused on her work during an outdoor study session",
    status: "Replace with an approved school story",
  },
  {
    category: "Sample guide",
    title: "The Cambridge Journey, Explained",
    excerpt:
      "A placeholder editorial guide showing families how learning progresses from Early Years to A-Level.",
    image: "/images/school/early-years-fruit-learning.webp",
    alt: "Teachers and Early Years learners exploring fruit in the classroom",
    status: "Replace with approved admissions content",
  },
  {
    category: "Sample profile",
    title: "Meet Our Learning Community",
    excerpt:
      "A placeholder profile format for future stories about learners, educators, families and school life.",
    image: "/images/school/senior-students-community.webp",
    alt: "A diverse group of SLNA senior students in their school blazers",
    status: "Replace with an approved community story",
  },
] as const;

export const gallery = [
  {
    src: "/images/school/creative-arts-masks.webp",
    alt: "Learners presenting colourful masks they created during an arts activity",
  },
  {
    src: "/images/school/early-years-taekwondo.webp",
    alt: "Early Years learners practising taekwondo together",
  },
  {
    src: "/images/school/netball-training.webp",
    alt: "A learner preparing to pass a ball during outdoor netball training",
  },
  {
    src: "/images/school/swimming-competition.webp",
    alt: "SLNA swimmers competing in marked lanes during a school event",
  },
  {
    src: "/images/school/careers-day.webp",
    alt: "Young learners dressed for different careers during a school activity",
  },
  {
    src: "/images/school/cycling-club.webp",
    alt: "Learners standing with their bicycles during an outdoor cycling activity",
  },
] as const;
