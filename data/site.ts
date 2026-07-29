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

export const creator = {
  name: "Mwangi Ngugi",
  portfolioUrl:
    process.env.NEXT_PUBLIC_CREATOR_PORTFOLIO_URL?.trim() ?? "",
} as const;

export const navigation = [
  {
    label: "Our School",
    href: "/our-school",
    children: [
      { label: "Our School Overview", href: "/our-school" },
      { label: "About Us", href: "/our-school/about-us" },
      {
        label: "Board Chair Message",
        href: "/our-school/board-chair-message",
      },
      {
        label: "Administrator Message",
        href: "/our-school/school-administrator-message",
      },
      {
        label: "Senior Management Team",
        href: "/our-school/senior-management-team",
      },
      { label: "School Profile", href: "/education/school-profile" },
    ],
  },
  {
    label: "Education",
    href: "/education",
    children: [
      { label: "Education Overview", href: "/education" },
      { label: "Early Years", href: "/education/nursery" },
      { label: "Junior School", href: "/education/junior-school" },
      { label: "Senior School", href: "/education/senior-school" },
      { label: "IGCSE", href: "/education/igcse" },
      { label: "A-Level", href: "/education/a-level" },
      { label: "Homework Policy", href: "/education/homework-policy" },
    ],
  },
  {
    label: "Admissions",
    href: "/admissions",
    children: [
      { label: "Admissions Overview", href: "/admissions" },
      { label: "Fee Structure", href: "/admissions/fee-structure" },
    ],
  },
  { label: "School Life", href: "/school-life" },
  { label: "Stories", href: "/stories" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
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
    href: "/education/nursery",
  },
  {
    index: "02",
    title: "Junior School",
    stage: "Primary · Up to Year 6",
    description:
      "Engaging Cambridge-aligned learning that develops strong foundations, inquiry and a growing sense of independence.",
    image: "/images/school/chess-club.webp",
    alt: "Junior School learners concentrating during a chess activity",
    href: "/education/junior-school",
  },
  {
    index: "03",
    title: "Senior School",
    stage: "Years 7–11 · IGCSE pathway",
    description:
      "A broad and inclusive programme that deepens subject knowledge, critical thinking and personal responsibility.",
    image: "/images/school/outdoor-study.webp",
    alt: "A Senior School learner writing during an outdoor study session",
    href: "/education/senior-school",
  },
  {
    index: "04",
    title: "A-Level",
    stage: "Years 12–13 · Age 16+",
    description:
      "A focused two-year pathway that prepares ambitious learners for university, leadership and life beyond school.",
    image: "/images/school/museum-learning-trip.webp",
    alt: "Senior learners taking part in an educational museum visit",
    href: "/education/a-level",
  },
] as const;

export const educationLinks = [
  { label: "Early Years", href: "/education/nursery" },
  { label: "Junior School", href: "/education/junior-school" },
  { label: "Senior School", href: "/education/senior-school" },
  { label: "IGCSE", href: "/education/igcse" },
  { label: "A-Level", href: "/education/a-level" },
  { label: "Homework Policy", href: "/education/homework-policy" },
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

export const statistics = [
  {
    label: "Academic divisions",
    value: "4",
    note: "Early Years to A-Level",
  },
  {
    label: "Learner age range",
    value: "2–18",
    note: "A connected educational journey",
  },
  {
    label: "Curriculum",
    value: "Cambridge",
    note: "Internationally recognised pathway",
  },
  {
    label: "Home city",
    value: "Nakuru",
    note: "A co-educational day school",
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

export const photoLibrary = [
  {
    src: "/images/school/creative-arts-masks.webp",
    alt: "Learners presenting colourful masks they created during an arts activity",
    title: "Creative expression",
    category: "Arts",
  },
  {
    src: "/images/school/early-years-fruit-learning.webp",
    alt: "Early Years learners exploring different fruits with their teachers",
    title: "Learning through discovery",
    category: "Early Years",
  },
  {
    src: "/images/school/chess-club.webp",
    alt: "Junior School learners concentrating during a chess activity",
    title: "Thinking ahead",
    category: "Clubs",
  },
  {
    src: "/images/school/sports-day-community.webp",
    alt: "Junior learners enjoying an energetic outdoor school activity",
    title: "Joy in participation",
    category: "Community",
  },
  {
    src: "/images/school/netball-training.webp",
    alt: "A learner preparing to pass a ball during outdoor netball training",
    title: "Ready to compete",
    category: "Sport",
  },
  {
    src: "/images/school/outdoor-study.webp",
    alt: "A learner focused on her work during an outdoor study session",
    title: "Focused learning",
    category: "Academics",
  },
  {
    src: "/images/school/senior-students-community.webp",
    alt: "Senior students gathered together in their red school blazers",
    title: "One learning community",
    category: "Senior School",
  },
  {
    src: "/images/school/early-years-taekwondo.webp",
    alt: "Early Years learners practising taekwondo together",
    title: "Confidence in motion",
    category: "Early Years",
  },
  {
    src: "/images/school/careers-day.webp",
    alt: "Young learners dressed for different careers during a school activity",
    title: "Imagining the future",
    category: "Early Years",
  },
  {
    src: "/images/school/basketball-team.webp",
    alt: "The school basketball team gathered on the indoor court",
    title: "Team spirit",
    category: "Sport",
  },
  {
    src: "/images/school/swimming-competition.webp",
    alt: "SLNA swimmers competing in marked lanes during a school event",
    title: "Racing with purpose",
    category: "Sport",
  },
  {
    src: "/images/school/swimming-training.webp",
    alt: "Three learners practising their swimming strokes in the school pool",
    title: "Building technique",
    category: "Sport",
  },
  {
    src: "/images/school/cycling-club.webp",
    alt: "Learners standing with their bicycles during an outdoor cycling activity",
    title: "Learning beyond the classroom",
    category: "Clubs",
  },
  {
    src: "/images/school/museum-learning-trip.webp",
    alt: "Senior learners taking part in an educational museum visit",
    title: "Learning through experience",
    category: "Trips",
  },
  {
    src: "/images/school/campus-assembly.webp",
    alt: "SLNA learners gathered for an assembly in the school courtyard",
    title: "Gathered as one",
    category: "Community",
  },
  {
    src: "/images/school/student-portrait.webp",
    alt: "A smiling SLNA learner in school uniform",
    title: "Confidence to thrive",
    category: "Learners",
  },
  {
    src: "/images/school/school-event-leadership.webp",
    alt: "School leaders speaking with learners during an academy event",
    title: "Leadership in action",
    category: "Community",
  },
] as const;
