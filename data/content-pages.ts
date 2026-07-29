export type ContentPageSection = {
  eyebrow?: string;
  title: string;
  paragraphs: readonly string[];
  points?: readonly string[];
};

export type ContentPage = {
  route: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    description: string;
    image: string;
    imageAlt: string;
    imagePosition?: string;
  };
  introduction: {
    eyebrow: string;
    title: string;
    accent?: string;
    paragraphs: readonly string[];
  };
  highlights: readonly {
    label: string;
    value: string;
    note: string;
  }[];
  sections: readonly ContentPageSection[];
  relatedLinks?: readonly {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
  }[];
  notice?: {
    eyebrow: string;
    title: string;
    description: string;
    actionLabel: string;
    actionHref: string;
  };
};

export const contentPages = {
  about: {
    route: "/our-school/about-us",
    metaTitle: "About Us | Shah Lalji Nangpar Academy",
    metaDescription:
      "Meet the leadership vision behind Shah Lalji Nangpar Academy and learn how care, partnership and excellence shape the school community.",
    hero: {
      eyebrow: "About Us",
      title: "Leadership grounded in",
      accent: "purpose.",
      description:
        "A school community shaped by academic ambition, strong character, attentive pastoral care and a shared commitment to every learner.",
      image: "/images/school/school-event-leadership.webp",
      imageAlt: "School leaders speaking with learners during an academy event",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "A warm welcome",
      title: "Learning, character and",
      accent: "community.",
      paragraphs: [
        "The Board of Governors and school leadership share a clear conviction: education should develop thoughtful, confident and compassionate young people, not academic results alone.",
        "Teachers, families and leaders work in partnership to create a nurturing environment where learners can discover their strengths, grow in confidence and prepare for a changing world.",
      ],
    },
    highlights: [
      {
        label: "Our standard",
        value: "Excellence",
        note: "Purposeful learning and continuous improvement",
      },
      {
        label: "Our promise",
        value: "Care",
        note: "Safeguarding, wellbeing and pastoral support",
      },
      {
        label: "Our strength",
        value: "Partnership",
        note: "Families, staff and learners working together",
      },
    ],
    sections: [
      {
        eyebrow: "From the Board",
        title: "An education that reaches beyond achievement.",
        paragraphs: [
          "The Board’s vision places each learner at the centre of school life. Strong values, modern facilities and quality programmes create the conditions for students to become capable contributors to society.",
          "Investment in teaching, innovation and the wider school experience is guided by one goal: helping every learner develop the knowledge, skills and character needed for the opportunities ahead.",
        ],
      },
      {
        eyebrow: "From the school leadership",
        title: "A safe and ambitious learning community.",
        paragraphs: [
          "Academic excellence and personal wellbeing are treated as inseparable. A rigorous curriculum, committed educators and varied co-curricular opportunities help learners build confidence and a lasting love of learning.",
          "Safeguarding and pastoral care are central to the academy. Regular staff development, open communication with families and proactive student support help create a culture where children feel secure, respected and ready to learn.",
        ],
        points: [
          "Respect, integrity and service",
          "Strong relationships with parents and guardians",
          "Support for emotional, social and academic growth",
          "Curiosity, kindness and lifelong learning",
        ],
      },
    ],
    relatedLinks: [
      {
        eyebrow: "Board of Governors",
        title: "Message from the Board Chair",
        description:
          "Read Mr Rajen Shah’s full welcome and his vision for learning, character and community.",
        href: "/our-school/board-chair-message",
      },
      {
        eyebrow: "School administration",
        title: "Message from the School Administrator",
        description:
          "Read Ms Alice Okidia’s full message on safeguarding, wellbeing, academic ambition and partnership.",
        href: "/our-school/school-administrator-message",
      },
      {
        eyebrow: "Our people",
        title: "Senior Management Team",
        description:
          "Meet the academic and operational leaders responsible for the academy’s day-to-day direction.",
        href: "/our-school/senior-management-team",
      },
    ],
  },
  schoolProfile: {
    route: "/education/school-profile",
    metaTitle: "School Profile | Shah Lalji Nangpar Academy",
    metaDescription:
      "Explore the history, community and Cambridge educational pathway of Shah Lalji Nangpar Academy in Nakuru.",
    hero: {
      eyebrow: "School Profile",
      title: "A Nakuru legacy with a",
      accent: "global outlook.",
      description:
        "A non-profit, co-educational day school serving learners from Nursery through A-Level within one connected community.",
      image: "/images/school/campus-assembly.webp",
      imageAlt: "SLNA learners gathered in the academy courtyard",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "A legacy of quality education",
      title: "Rooted in service.",
      accent: "Built for possibility.",
      paragraphs: [
        "Shah Lalji Nangpar Academy serves approximately 700 learners from Nursery to A-Level. Its Cambridge pathway is supported by academic, creative and sporting opportunities across the school.",
        "As a non-profit institution, the academy was established to broaden access to high-quality education in Nakuru while creating a learning environment equipped for the future.",
      ],
    },
    highlights: [
      {
        label: "Learners",
        value: "700",
        note: "From Nursery through A-Level",
      },
      {
        label: "School type",
        value: "Co-educational",
        note: "A day school in Nakuru",
      },
      {
        label: "Opened",
        value: "1994",
        note: "Nursery, Primary and Secondary together",
      },
      {
        label: "Pathway",
        value: "Cambridge",
        note: "Early learning to Sixth Form",
      },
    ],
    sections: [
      {
        eyebrow: "Our history",
        title: "A shared vision became a school.",
        paragraphs: [
          "The vision for the academy took shape in 1988–1989 through the educational work of the Visa Oshwal Community. The Nangpar Raimal family of Nakuru Industries supported the project with land and substantial assistance.",
          "Community contributions helped the Nursery, Primary and Secondary blocks open in January 1994 with approximately 200 learners. The campus later expanded to include an international-standard auditorium, swimming pool and broad indoor and outdoor sports facilities.",
        ],
      },
      {
        eyebrow: "Today",
        title: "One community across every stage.",
        paragraphs: [
          "Learners progress through a connected educational journey while benefiting from specialist teaching, strong facilities and opportunities beyond the classroom.",
          "The academy continues to balance affordability, educational quality and a commitment to preparing young people for further study, leadership and life.",
        ],
        points: [
          "Nursery and Early Years",
          "Junior School",
          "Senior School and IGCSE",
          "A-Level Sixth Form",
        ],
      },
    ],
  },
  nursery: {
    route: "/education/nursery",
    metaTitle: "Early Years & Nursery | Shah Lalji Nangpar Academy",
    metaDescription:
      "Discover the child-centred Early Years and Nursery programme for learners aged 2–6 at Shah Lalji Nangpar Academy.",
    hero: {
      eyebrow: "Early Years",
      title: "Curiosity starts",
      accent: "here.",
      description:
        "A warm, play-rich and inquiry-led beginning for children aged 2–6, with both half-day and full-day options.",
      image: "/images/school/early-years-fruit-learning.webp",
      imageAlt: "Early Years learners exploring fruit with their teachers",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "Nursery School",
      title: "A confident first",
      accent: "step.",
      paragraphs: [
        "The Early Years programme combines the Cambridge Early Years Foundation approach with Reggio Emilia-inspired learning in a secure, inclusive and stimulating environment.",
        "Children learn through purposeful play, investigation, creative expression and positive relationships. The programme supports communication, early literacy and numeracy, physical development and growing independence.",
      ],
    },
    highlights: [
      {
        label: "Age range",
        value: "2–6",
        note: "Playgroup, Nursery and Kindergarten",
      },
      {
        label: "Timetable",
        value: "Flexible",
        note: "Half-day and full-day options",
      },
      {
        label: "Approach",
        value: "Inquiry-led",
        note: "Learning through play and exploration",
      },
    ],
    sections: [
      {
        eyebrow: "How children learn",
        title: "Active discovery, thoughtful guidance.",
        paragraphs: [
          "Learning experiences invite children to ask questions, collaborate and make connections with the world around them. Montessori-informed activities support fine and gross motor development in the youngest classes.",
          "Teachers observe each child carefully and shape experiences that build language, number confidence, social skills, creativity and a positive sense of self.",
        ],
        points: [
          "Child-centred and inquiry-based learning",
          "Social inclusion and collaborative play",
          "Holistic physical, emotional and cognitive development",
          "A caring transition into Junior School",
        ],
      },
      {
        eyebrow: "Beyond the classroom",
        title: "Movement, music and imagination.",
        paragraphs: [
          "Arts, crafts and music are woven into the school week. Children can also take part in age-appropriate activities that help them build coordination, confidence and joy in participation.",
        ],
        points: [
          "Taekwondo",
          "Swimming",
          "Ballet and movement",
          "Afternoon clubs and activities",
        ],
      },
    ],
  },
  juniorSchool: {
    route: "/education/junior-school",
    metaTitle: "Junior School | Shah Lalji Nangpar Academy",
    metaDescription:
      "Explore the broad, inquiry-led Junior School programme from Kindergarten to Year 6 at Shah Lalji Nangpar Academy.",
    hero: {
      eyebrow: "Junior School",
      title: "Strong foundations for",
      accent: "growing minds.",
      description:
        "An engaging primary programme from Kindergarten to Year 6 that builds knowledge, inquiry, confidence and independence.",
      image: "/images/school/chess-club.webp",
      imageAlt: "Junior School learners concentrating during a chess activity",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "Primary education",
      title: "Broad learning.",
      accent: "Real progress.",
      paragraphs: [
        "Junior School follows a British Curriculum approach adapted to the academy’s international and Kenyan context. Learners are encouraged to investigate, communicate clearly and apply what they know.",
        "Regular classroom assessment in core subjects helps teachers understand progress, respond to individual needs and prepare learners confidently for the next stage.",
      ],
    },
    highlights: [
      {
        label: "Year groups",
        value: "KG–Year 6",
        note: "A connected primary journey",
      },
      {
        label: "Curriculum",
        value: "Broad",
        note: "Core, creative and practical subjects",
      },
      {
        label: "Progress",
        value: "Monitored",
        note: "Regular and annual assessments",
      },
    ],
    sections: [
      {
        eyebrow: "Curriculum",
        title: "Knowledge, skills and curiosity.",
        paragraphs: [
          "The programme develops secure foundations in English, Mathematics and Science while giving learners a wider understanding of people, places, culture, technology and creativity.",
        ],
        points: [
          "English Language and Literature",
          "Mathematics and Science",
          "Geography and History",
          "Art and Design, Music and Physical Education",
          "ICT and French",
        ],
      },
      {
        eyebrow: "Enrichment",
        title: "Interests become strengths.",
        paragraphs: [
          "Clubs, sport and the arts give learners space to collaborate, practise discipline and discover new interests. Specialist coaching and inter-school opportunities add challenge and a sense of belonging.",
        ],
        points: [
          "STEM and environmental activities",
          "Drama, theatre and visual art",
          "Public speaking and debate",
          "Team and individual sports",
          "Creative and performing arts",
        ],
      },
    ],
  },
  seniorSchool: {
    route: "/education/senior-school",
    metaTitle: "Senior School | Shah Lalji Nangpar Academy",
    metaDescription:
      "Learn about Cambridge Lower Secondary and the IGCSE pathway in Senior School at Shah Lalji Nangpar Academy.",
    hero: {
      eyebrow: "Senior School",
      title: "Depth, direction and",
      accent: "independence.",
      description:
        "A purposeful journey through Cambridge Lower Secondary in Years 7–9 and the IGCSE programme in Years 10–11.",
      image: "/images/school/outdoor-study.webp",
      imageAlt: "A Senior School learner focused during an outdoor study session",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "Senior programme",
      title: "Challenge with",
      accent: "support.",
      paragraphs: [
        "Senior School builds on the foundations of primary education through an adapted UK National Curriculum and the Cambridge pathway. Learners deepen subject knowledge while developing judgement, responsibility and independent study habits.",
        "The programme balances classroom teaching with practical work, educational experiences, co-curricular activities and close pastoral support.",
      ],
    },
    highlights: [
      {
        label: "Lower Secondary",
        value: "Years 7–9",
        note: "Broad Cambridge progression",
      },
      {
        label: "IGCSE",
        value: "Years 10–11",
        note: "Internationally recognised qualifications",
      },
      {
        label: "Next step",
        value: "A-Level",
        note: "Preparation for focused Sixth Form study",
      },
    ],
    sections: [
      {
        eyebrow: "Cambridge Lower Secondary",
        title: "A secure bridge into specialist study.",
        paragraphs: [
          "Years 7–9 consolidate prior learning and introduce greater subject depth. The Cambridge Checkpoint framework provides an international benchmark and helps learners, families and teachers understand progress.",
          "Students are encouraged to think critically, communicate with confidence and apply their learning across different contexts.",
        ],
        points: [
          "English and Mathematics",
          "Sciences",
          "Humanities and modern languages",
          "Technical and creative subjects",
          "Physical education and personal development",
        ],
      },
      {
        eyebrow: "IGCSE preparation",
        title: "Choices that open future pathways.",
        paragraphs: [
          "In Years 10–11, learners combine compulsory subjects with carefully selected options. Academic and career guidance helps each student build a programme that reflects their strengths and future plans.",
        ],
        points: [
          "Subject selection guidance",
          "Practical and coursework-based learning where required",
          "Examination preparation and study skills",
          "Progression into A-Level and other post-16 pathways",
        ],
      },
    ],
  },
  igcse: {
    route: "/education/igcse",
    metaTitle: "IGCSE | Shah Lalji Nangpar Academy",
    metaDescription:
      "Explore the flexible two-year Cambridge IGCSE programme offered in Years 10–11 at Shah Lalji Nangpar Academy.",
    hero: {
      eyebrow: "IGCSE",
      title: "Globally recognised.",
      accent: "Personally shaped.",
      description:
        "A rigorous two-year programme in Years 10–11 that combines essential core subjects with carefully chosen options.",
      image: "/images/school/senior-students-community.webp",
      imageAlt: "Senior learners together in their red school blazers",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "IGCSE at SLNA",
      title: "A flexible route to",
      accent: "future study.",
      paragraphs: [
        "Most learners take between seven and nine IGCSE subjects. Experienced teachers and career guidance help each student select a balanced combination that supports their interests and longer-term ambitions.",
        "Assessment varies by subject and may include written examinations, oral work, practical assessment and coursework. Throughout the programme, learners strengthen analysis, organisation, technical understanding and independent study.",
      ],
    },
    highlights: [
      {
        label: "Duration",
        value: "2 years",
        note: "Years 10 and 11",
      },
      {
        label: "Typical load",
        value: "7–9",
        note: "Compulsory and optional subjects",
      },
      {
        label: "Progression",
        value: "A-Level",
        note: "A strong base for advanced study",
      },
    ],
    sections: [
      {
        eyebrow: "Subject framework",
        title: "Core confidence, meaningful choice.",
        paragraphs: [
          "Every programme includes Mathematics and English Language, alongside at least one Science, one Humanities subject and one Technical or creative option.",
        ],
        points: [
          "Mathematics",
          "English Language and Literature",
          "Biology, Chemistry and Physics",
          "Business Studies and Economics",
          "French and Swahili",
          "Humanities, technology and creative options",
        ],
      },
      {
        eyebrow: "Preparation",
        title: "More than examination results.",
        paragraphs: [
          "Teaching is closely aligned with Cambridge syllabus and assessment expectations, but the programme also develops the habits learners need for advanced study: intellectual curiosity, resilience and confident independent work.",
          "Successful completion provides a recognised foundation for A-Level and other international post-16 routes.",
        ],
        points: [
          "Experienced subject specialists",
          "Clear coursework and examination guidance",
          "Academic and careers counselling",
          "Bursary consideration for exceptional academic performance",
        ],
      },
    ],
  },
  aLevel: {
    route: "/education/a-level",
    metaTitle: "A-Level Sixth Form | Shah Lalji Nangpar Academy",
    metaDescription:
      "Discover the two-year Cambridge A-Level Sixth Form programme and university preparation at Shah Lalji Nangpar Academy.",
    hero: {
      eyebrow: "A-Level Sixth Form",
      title: "Focused study.",
      accent: "Wider horizons.",
      description:
        "An internationally recognised two-year programme that helps students specialise, work independently and prepare for university.",
      image: "/images/school/museum-learning-trip.webp",
      imageAlt: "Senior learners taking part in an educational museum visit",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "A-Level overview",
      title: "Specialist learning with",
      accent: "personal guidance.",
      paragraphs: [
        "Sixth Form students typically choose three or four subjects aligned with their strengths, interests and possible career direction. Small classes, tutorials and close academic guidance support the transition to more independent study.",
        "The programme normally includes AS-Level assessment in the first year and completion of the full A-Level in the second. Cambridge qualifications support applications to universities in Kenya and around the world.",
      ],
    },
    highlights: [
      {
        label: "Duration",
        value: "2 years",
        note: "AS and A2 progression",
      },
      {
        label: "Subject focus",
        value: "3–4",
        note: "A personalised combination",
      },
      {
        label: "Destination",
        value: "Global",
        note: "University and career preparation",
      },
    ],
    sections: [
      {
        eyebrow: "Subjects",
        title: "Options for specialists and generalists.",
        paragraphs: [
          "Students can build a focused programme around a clear career goal or retain breadth while exploring several academic interests. Final combinations depend on timetable availability and entry requirements.",
        ],
        points: [
          "Mathematics, Biology, Physics and Chemistry",
          "Business Studies, Economics and Accounting",
          "English Language and English Literature",
          "Psychology, Geography and History",
          "French and Global Perspectives",
          "IT, Art and Design, Music and Physical Education",
        ],
      },
      {
        eyebrow: "Sixth Form support",
        title: "Independent, never unsupported.",
        paragraphs: [
          "Students receive individual academic advice, pastoral support and regular tutorials. Careers counselling helps them research suitable courses, understand entry requirements and prepare thoughtful university applications.",
        ],
        points: [
          "Specialist subject teaching",
          "Small-class attention",
          "University application guidance",
          "Career planning and subject-choice support",
        ],
      },
    ],
  },
  homeworkPolicy: {
    route: "/education/homework-policy",
    metaTitle: "Homework & Assessment Policy | Shah Lalji Nangpar Academy",
    metaDescription:
      "Learn how homework and assessment support balanced, independent learning at Shah Lalji Nangpar Academy.",
    hero: {
      eyebrow: "Homework & Assessment",
      title: "Purposeful practice.",
      accent: "Balanced growth.",
      description:
        "Homework and assessment are designed to reinforce understanding, develop independence and give every learner useful feedback.",
      image: "/images/school/student-portrait.webp",
      imageAlt: "A smiling SLNA learner ready for class",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "Homework policy",
      title: "Learning continues with",
      accent: "purpose.",
      paragraphs: [
        "SLNA balances academic rigour with the time children need for family, rest, interests and personal growth. Homework is selected to reinforce classroom learning rather than simply add volume.",
        "Expectations increase gradually as learners progress. In Senior School, private study and effective time management become increasingly important in preparation for examinations and advanced study.",
      ],
    },
    highlights: [
      {
        label: "Primary",
        value: "Reinforce",
        note: "Regular, age-appropriate practice",
      },
      {
        label: "Secondary",
        value: "Prepare",
        note: "Independent study and examination readiness",
      },
      {
        label: "Assessment",
        value: "Inform",
        note: "Teaching and next-step planning",
      },
    ],
    sections: [
      {
        eyebrow: "Why homework matters",
        title: "Practice that builds independence.",
        paragraphs: [
          "Well-designed tasks help learners revisit important ideas, apply skills in a new context and take increasing responsibility for their progress.",
        ],
        points: [
          "Strengthen understanding of classroom concepts",
          "Develop independent learning habits",
          "Prepare for assessment and real-world challenges",
          "Build organisation and time-management skills",
        ],
      },
      {
        eyebrow: "Assessment at SLNA",
        title: "Evidence that guides the next step.",
        paragraphs: [
          "Assessment helps teachers identify achievement, recognise strengths, plan support and evaluate the effectiveness of teaching. A range of methods provides a fuller picture than a single test.",
        ],
        points: [
          "Formal and internal assessments",
          "Homework and classwork review",
          "Research projects and fieldwork",
          "Practical work, discussion and presentation",
        ],
      },
    ],
  },
  feeStructure: {
    route: "/admissions/fee-structure",
    metaTitle: "Fee Structure | Shah Lalji Nangpar Academy",
    metaDescription:
      "Review the published 2025/26 fee components for Shah Lalji Nangpar Academy and contact admissions for the current schedule.",
    hero: {
      eyebrow: "Fee Structure",
      title: "Clear information for",
      accent: "families.",
      description:
        "A guide to the fee components published for the 2025/26 academic year, with direct support from the admissions team.",
      image: "/images/school/campus-assembly.webp",
      imageAlt: "The SLNA learning community gathered on campus",
      imagePosition: "object-center",
    },
    introduction: {
      eyebrow: "Published fee components",
      title: "Plan with",
      accent: "confidence.",
      paragraphs: [
        "The figures below reproduce the additional fee components published by the academy for the 2025/26 academic year. Tuition varies by school stage and the admissions office provides the complete current schedule.",
        "Because fees and payment arrangements can change between academic years, families should confirm all amounts, due dates and refund conditions directly with admissions before making a payment.",
      ],
    },
    highlights: [
      {
        label: "Admission / registration",
        value: "KSh 10,000",
        note: "One-time charge across the three schools",
      },
      {
        label: "Insurance",
        value: "KSh 965",
        note: "Published annual charge",
      },
      {
        label: "Academic year",
        value: "2025/26",
        note: "Contact admissions for the latest schedule",
      },
    ],
    sections: [
      {
        eyebrow: "Refundable caution money",
        title: "Published one-time deposits.",
        paragraphs: [
          "Caution money is described as a one-time refundable payment. The school will confirm the applicable terms and refund conditions.",
        ],
        points: [
          "Nursery School — KSh 40,000",
          "Junior School — KSh 60,000",
          "Senior School — KSh 100,000",
        ],
      },
      {
        eyebrow: "Other published charges",
        title: "Stage-specific application and learning costs.",
        paragraphs: [
          "Some additional charges apply only to particular school stages or activities. Admissions will confirm which items apply to an individual learner.",
        ],
        points: [
          "Junior School interview — KSh 3,000",
          "Senior School interview — KSh 5,000",
          "Nursery and KG afternoon classes — KSh 6,000",
          "Nursery and Junior workbooks — KSh 2,000 annually",
        ],
      },
    ],
    notice: {
      eyebrow: "Before you pay",
      title: "Please request the current official fee schedule.",
      description:
        "The figures on this page are clearly marked as the school’s published 2025/26 information. Admissions will confirm current tuition, extras, payment details and refund terms in writing.",
      actionLabel: "Confirm current fees",
      actionHref: "/contact",
    },
  },
} as const satisfies Record<string, ContentPage>;
