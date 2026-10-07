export type LeadershipMessage = {
  route: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  person: string;
  role: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  sections: readonly {
    heading?: string;
    paragraphs: readonly string[];
  }[];
};

export const leadershipMessages = {
  boardChair: {
    route: "/our-school/board-chair-message",
    metaTitle: "Message from the Board Chair | Shah Lalji Nangpar Academy",
    metaDescription:
      "Read the welcome message from Mr Rajen Shah, Chair of the Board of Governors at Shah Lalji Nangpar Academy.",
    eyebrow: "Message from the Board Chair",
    title: "A shared commitment to",
    accent: "every learner.",
    description:
      "Mr Rajen Shah reflects on the academy’s purpose, its partnership with families and the values that guide its future.",
    person: "Mr Rajen Shah",
    role: "Chair, Board of Governors",
    image: "/images/chairman-portrait.jpg",
    imageAlt: "Mr Rajen Shah, Chair of the Board of Governors",
    imagePosition: "object-center",
    sections: [
      {
        paragraphs: [
          "On behalf of the Board of Governors, I extend a warm and heartfelt welcome to the Shah Lalji Nangpar Academy community. It is both a privilege and a joy to be part of an institution so deeply committed to excellence in education, character development and community building.",
          "At Shah Lalji Nangpar Academy, we believe that education is not merely about academic achievement. It is about shaping young minds to become thoughtful, confident and compassionate individuals who will make meaningful contributions to society. Our school stands on strong values, a clear vision and an unwavering commitment to the growth and success of every student.",
        ],
      },
      {
        heading: "Helping every child thrive",
        paragraphs: [
          "We are proud of our dedicated teachers, staff and leadership team, who work tirelessly to create a nurturing, dynamic and stimulating environment. Their passion for education and focus on individual development help students discover their unique talents and reach their fullest potential.",
          "As we look to the future, we remain committed to continuous improvement and innovation. Through investment in modern facilities, quality programmes and a culture of excellence, the academy is preparing students for the challenges of today and the opportunities of tomorrow.",
        ],
      },
      {
        heading: "A partnership with families",
        paragraphs: [
          "To our parents and guardians, thank you for your trust and partnership. Together, we share the vital role of nurturing and inspiring the next generation. To our students, you are the heart of our academy. Your curiosity, determination and enthusiasm remind us every day of the incredible potential within each of you.",
          "Let us continue this journey in a spirit of collaboration, excellence and kindness. Welcome to a place where learning is celebrated, character is cultivated and lifelong success begins.",
        ],
      },
    ],
  },
  schoolAdministrator: {
    route: "/our-school/school-administrator-message",
    metaTitle:
      "Message from the School Administrator | Shah Lalji Nangpar Academy",
    metaDescription:
      "Read the welcome message from Ms Alice Okidia, School Administrator at Shah Lalji Nangpar Academy.",
    eyebrow: "Message from the School Administrator",
    title: "A safe place to learn,",
    accent: "belong and grow.",
    description:
      "Ms Alice Okidia shares the academy’s commitment to academic excellence, wellbeing, safeguarding and strong community relationships.",
    person: "Ms Alice Okidia",
    role: "School Administrator",
    image: "/images/school/school-event-leadership.webp",
    imageAlt: "School leadership engaging with learners during an academy event",
    imagePosition: "object-center",
    sections: [
      {
        paragraphs: [
          "Dear students, parents, staff and visitors, welcome to Shah Lalji Nangpar Academy. I am delighted to invite you into our vibrant learning community, where academic excellence, personal growth and the wellbeing of every student are at the heart of all we do.",
          "We recognise and nurture each student’s unique strengths, talents and aspirations. Our curriculum, dedicated educators and extensive co-curricular opportunities prepare learners not only for academic success, but also for purposeful and fulfilling lives.",
        ],
      },
      {
        heading: "Safeguarding and pastoral care",
        paragraphs: [
          "Safeguarding and pastoral care are fundamental pillars of our school community. We are committed to a safe and supportive environment where every child feels secure, respected and valued.",
          "Our pastoral team works closely with students, parents and staff to support emotional and social needs. Regular staff training, open communication with families and a proactive approach to wellbeing help students navigate challenges and build resilience.",
        ],
      },
      {
        heading: "Building a strong community together",
        paragraphs: [
          "Our community is founded on respect, integrity and a commitment to service. By building strong relationships with parents, guardians and the wider community, we create a nurturing environment where every child can reach their full potential.",
          "Whether you are a current or prospective student, parent, member of staff or friend of the academy, you are a valued part of our journey. Welcome to a school where futures are built, wellbeing is a priority and excellence is a tradition.",
        ],
      },
    ],
  },
} as const satisfies Record<string, LeadershipMessage>;

export const seniorManagementTeam = [
  {
    slug: "school-administrator",
    name: "Ms Alice Okidia",
    role: "School Administrator",
    area: "Executive leadership",
    description:
      "Leads whole-school operations, strategy, safeguarding and the coordination of academic and administrative teams.",
    confirmed: true,
  },
  {
    slug: "senior-school-head",
    name: "Ms Molly Okumu",
    role: "Senior School Head",
    area: "Senior School",
    description:
      "Leads teaching, learning, pastoral care and student progress across Senior School, IGCSE and Sixth Form.",
    confirmed: true,
  },
  {
    slug: "junior-school-head",
    name: "Mr George Gasper",
    role: "Junior School Head",
    area: "Junior School",
    description:
      "Leads the Junior School’s academic programme, learner development and partnership with families.",
    confirmed: true,
  },
  {
    slug: "head-of-early-years",
    name: "Ms Pheoby Marimu",
    role: "Head of Early Years",
    area: "Early Years",
    description:
      "Leads the academy’s youngest learning community and its child-centred foundation programme.",
    confirmed: true,
  },
  {
    slug: "head-of-information-technology",
    name: "Profile to be confirmed",
    role: "Head of Information Technology",
    area: "Digital systems",
    description:
      "Oversees technology infrastructure, digital learning systems, data security and school-wide IT support.",
    confirmed: false,
  },
  {
    slug: "facilities-manager",
    name: "Profile to be confirmed",
    role: "Facilities Manager",
    area: "Campus operations",
    description:
      "Coordinates campus facilities, maintenance, safety, utilities and the readiness of learning spaces.",
    confirmed: false,
  },
  {
    slug: "school-accountant",
    name: "Profile to be confirmed",
    role: "School Accountant",
    area: "Finance",
    description:
      "Supports financial stewardship, reporting, fee administration, budgeting and operational accountability.",
    confirmed: false,
  },
] as const;

export const leadershipRoutes = [
  leadershipMessages.boardChair.route,
  leadershipMessages.schoolAdministrator.route,
  "/our-school/senior-management-team",
] as const;
