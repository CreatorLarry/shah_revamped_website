export type StorySection = {
  heading: string;
  paragraphs: readonly string[];
  image?: string;
  imageAlt?: string;
};

export type Story = {
  slug: string;
  href: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  alt: string;
  readTime: string;
  quote: string;
  sections: readonly StorySection[];
};

export const stories: readonly Story[] = [
  {
    slug: "learning-through-discovery",
    href: "/stories/learning-through-discovery",
    category: "Early Years",
    title: "Learning Through Discovery",
    excerpt:
      "How purposeful, hands-on experiences help young learners build language, confidence and curiosity from the very beginning.",
    image: "/images/school/early-years-fruit-learning.webp",
    alt: "Teachers and Early Years learners exploring fruit in the classroom",
    readTime: "4 minute read",
    quote:
      "When children can touch, talk, compare and create, learning becomes something they understand—not simply something they are told.",
    sections: [
      {
        heading: "Learning begins with curiosity",
        paragraphs: [
          "In Early Years, the most meaningful questions often begin with something familiar. A piece of fruit, a colour, a sound or a story can become the starting point for language, number, observation and conversation.",
          "Purposeful activities give young learners room to notice differences, describe what they see and make connections with the world around them. The teacher guides the experience while each child remains an active participant.",
        ],
        image: "/images/school/early-years-fruit-learning.webp",
        imageAlt:
          "Early Years learners choosing and discussing fruit with their teachers",
      },
      {
        heading: "Confidence grows through participation",
        paragraphs: [
          "Young children build confidence by trying, responding and sharing ideas in a supportive setting. Whether they are exploring food, dressing for a careers activity or practising a new movement, participation helps them develop independence.",
          "These moments also strengthen social learning. Children take turns, listen to one another and discover that their contributions matter within the group.",
        ],
        image: "/images/school/careers-day.webp",
        imageAlt:
          "Young learners dressed for different careers during a school activity",
      },
      {
        heading: "A foundation for the journey ahead",
        paragraphs: [
          "The Early Years experience is designed to prepare children for far more than the next classroom. Curiosity, communication, self-belief and the ability to work with others form a foundation that supports every later stage of learning.",
          "At SLNA, those foundations grow within one connected community, allowing learners to move forward with familiarity, encouragement and a growing sense of possibility.",
        ],
        image: "/images/school/early-years-taekwondo.webp",
        imageAlt: "Early Years learners practising taekwondo together",
      },
    ],
  },
  {
    slug: "confidence-to-compete",
    href: "/stories/confidence-to-compete",
    category: "Sport",
    title: "Confidence to Compete",
    excerpt:
      "Sport gives learners a practical language for discipline, teamwork, resilience and the courage to keep improving.",
    image: "/images/school/swimming-competition.webp",
    alt: "SLNA swimmers competing in marked lanes during a school event",
    readTime: "5 minute read",
    quote:
      "Competition matters, but the deeper success is learning how to prepare, respond and return stronger.",
    sections: [
      {
        heading: "More than a result",
        paragraphs: [
          "A race, match or training session makes progress visible. Learners can feel the effect of preparation, understand where technique matters and recognise that improvement is built through consistent effort.",
          "Sport also teaches young people how to respond when an outcome is not what they hoped for. Reflection, composure and the decision to try again are valuable far beyond the field, court or pool.",
        ],
        image: "/images/school/swimming-training.webp",
        imageAlt:
          "Three learners practising their swimming strokes in the school pool",
      },
      {
        heading: "Belonging to a team",
        paragraphs: [
          "Team environments ask learners to communicate, trust one another and understand their role within a shared goal. They learn when to lead, when to support and how individual effort contributes to collective performance.",
          "The friendships and school spirit that grow through sport help learners feel connected to the wider academy community.",
        ],
        image: "/images/school/basketball-team.webp",
        imageAlt: "The school basketball team gathered on the indoor court",
      },
      {
        heading: "Strength that transfers",
        paragraphs: [
          "The habits developed through sport—focus, discipline, courage and respect—support learning in every setting. Learners become more comfortable receiving feedback, setting goals and working patiently towards them.",
          "By offering varied activities, SLNA gives more young people the opportunity to find a discipline that challenges them and a community in which they can grow.",
        ],
        image: "/images/school/cycling-club.webp",
        imageAlt:
          "Learners standing with their bicycles during an outdoor cycling activity",
      },
    ],
  },
  {
    slug: "learning-beyond-the-classroom",
    href: "/stories/learning-beyond-the-classroom",
    category: "School Life",
    title: "Learning Beyond the Classroom",
    excerpt:
      "Visits, creative projects and shared experiences help learners connect knowledge with the wider world.",
    image: "/images/school/museum-learning-trip.webp",
    alt: "Senior learners taking part in an educational museum visit",
    readTime: "4 minute read",
    quote:
      "A powerful learning experience changes the way a learner sees a subject—and sometimes the way they see themselves.",
    sections: [
      {
        heading: "Experience gives knowledge context",
        paragraphs: [
          "Classroom learning provides essential structure, but new environments can make ideas feel immediate. Educational visits encourage learners to observe closely, ask different questions and connect subject knowledge with real places and experiences.",
          "Being away from the usual classroom also asks students to manage themselves, collaborate and represent their school with maturity.",
        ],
        image: "/images/school/museum-learning-trip.webp",
        imageAlt:
          "Senior learners collaborating during an educational museum visit",
      },
      {
        heading: "Creativity makes thinking visible",
        paragraphs: [
          "Creative work gives learners another way to process ideas and communicate what they understand. Making, performing and presenting require imagination, decision-making and the confidence to share something personal.",
          "The finished piece matters, but so does the process: testing an idea, adapting it and learning how to turn an intention into something others can see.",
        ],
        image: "/images/school/creative-arts-masks.webp",
        imageAlt:
          "Learners presenting colourful masks they created during an arts activity",
      },
      {
        heading: "Community is part of the curriculum",
        paragraphs: [
          "Assemblies, clubs, trips and shared events help learners understand that school is a community as well as a place of study. They create opportunities to listen, contribute and recognise the experiences of others.",
          "Together, these moments build belonging and give young people more ways to discover their interests, strengths and responsibilities.",
        ],
        image: "/images/school/campus-assembly.webp",
        imageAlt:
          "SLNA learners gathered for an assembly in the school courtyard",
      },
    ],
  },
] as const;

export function getStory(slug: string) {
  return stories.find((story) => story.slug === slug);
}
