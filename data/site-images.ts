import { academicJourney, gallery, heroSlides, photoLibrary } from "@/data/site";
import { contentPages } from "@/data/content-pages";

export type SiteImageSlot = {
  key: string;
  label: string;
  group: string;
  defaultUrl: string;
};

const fixedSlots: SiteImageSlot[] = [
  { key: "global.header.logo", label: "Header logo", group: "Global", defaultUrl: "/images/school-logo.png" },
  { key: "global.footer.logo", label: "Footer logo", group: "Global", defaultUrl: "/images/school-logo.png" },
  { key: "login.logo", label: "Login logo", group: "Dashboard", defaultUrl: "/images/school-logo.png" },
  { key: "login.background", label: "Login background", group: "Dashboard", defaultUrl: "/images/school/senior-students-community.webp" },
  { key: "dashboard.access.logo", label: "Dashboard access logo", group: "Dashboard", defaultUrl: "/images/school-logo.png" },
  { key: "dashboard.access.background", label: "Dashboard access background", group: "Dashboard", defaultUrl: "/images/school/senior-students-community.webp" },
  { key: "dashboard.sidebar.logo", label: "Dashboard sidebar logo", group: "Dashboard", defaultUrl: "/images/school-logo.png" },
  { key: "home.welcome", label: "Homepage welcome portrait", group: "Homepage", defaultUrl: "/images/school/student-portrait.webp" },
  { key: "home.leadership", label: "Homepage leadership feature", group: "Homepage", defaultUrl: "/images/school/school-event-leadership.webp" },
  { key: "home.school-life", label: "Homepage school life feature", group: "Homepage", defaultUrl: "/images/school/cycling-club.webp" },
  { key: "our-school.hero", label: "Our School hero", group: "Our School", defaultUrl: "/images/school/senior-students-community.webp" },
  { key: "our-school.responsibility", label: "Our School responsibility feature", group: "Our School", defaultUrl: "/images/school/school-event-leadership.webp" },
  { key: "education.hero", label: "Education hero", group: "Education", defaultUrl: "/images/school/outdoor-study.webp" },
  { key: "school-life.hero", label: "School Life hero", group: "School Life", defaultUrl: "/images/school/sports-day-community.webp" },
  { key: "school-life.pastoral", label: "School Life pastoral care", group: "School Life", defaultUrl: "/images/school/student-portrait.webp" },
  { key: "school-life.activity.sport", label: "School Life sport card", group: "School Life", defaultUrl: "/images/school/swimming-competition.webp" },
  { key: "school-life.activity.arts", label: "School Life arts card", group: "School Life", defaultUrl: "/images/school/creative-arts-masks.webp" },
  { key: "school-life.activity.leadership", label: "School Life leadership card", group: "School Life", defaultUrl: "/images/school/school-event-leadership.webp" },
  { key: "school-life.activity.clubs", label: "School Life clubs card", group: "School Life", defaultUrl: "/images/school/chess-club.webp" },
  { key: "admissions.hero", label: "Admissions hero", group: "Admissions", defaultUrl: "/images/school/campus-assembly.webp" },
  { key: "contact.hero", label: "Contact hero", group: "Contact", defaultUrl: "/images/school/school-event-leadership.webp" },
  { key: "contact.visit", label: "Contact visit feature", group: "Contact", defaultUrl: "/images/school/campus-assembly.webp" },
  { key: "stories.hero", label: "Stories page hero", group: "Stories", defaultUrl: "/images/school/senior-students-community.webp" },
  { key: "events.hero", label: "Upcoming Events page hero", group: "Events", defaultUrl: "/images/school/campus-assembly.webp" },
  { key: "gallery.hero", label: "Gallery hero", group: "Gallery", defaultUrl: "/images/school/creative-arts-masks.webp" },
  { key: "leadership.smt.hero", label: "Senior Management Team hero", group: "Leadership", defaultUrl: "/images/school/school-event-leadership.webp" },
  { key: "leadership.board-chair.hero", label: "Board Chair message hero", group: "Leadership", defaultUrl: "/images/chairman-portrait.jpg" },
  { key: "leadership.board-chair.portrait", label: "Board Chair message portrait", group: "Leadership", defaultUrl: "/images/chairman-portrait.jpg" },
  { key: "leadership.administrator.hero", label: "Administrator message hero", group: "Leadership", defaultUrl: "/images/school/school-event-leadership.webp" },
  { key: "leadership.administrator.portrait", label: "Administrator message portrait", group: "Leadership", defaultUrl: "/images/school/school-event-leadership.webp" },
];

export const siteImageSlots: readonly SiteImageSlot[] = [
  ...fixedSlots,
  ...heroSlides.map((slide, index) => ({
    key: `home.hero.${index + 1}`,
    label: `Homepage hero slide ${index + 1}`,
    group: "Homepage",
    defaultUrl: slide.src,
  })),
  ...academicJourney.map((stage) => ({
    key: `home.journey.${stage.index}`,
    label: `Homepage journey — ${stage.title}`,
    group: "Homepage",
    defaultUrl: stage.image,
  })),
  ...academicJourney.map((stage) => ({
    key: `education.stage.${stage.index}`,
    label: `Education stage — ${stage.title}`,
    group: "Education",
    defaultUrl: stage.image,
  })),
  ...gallery.map((photo, index) => ({
    key: `home.gallery.${index + 1}`,
    label: `Homepage gallery image ${index + 1}`,
    group: "Homepage",
    defaultUrl: photo.src,
  })),
  ...photoLibrary.map((photo, index) => ({
    key: `gallery.photo.${index + 1}`,
    label: `Gallery — ${photo.title}`,
    group: "Gallery",
    defaultUrl: photo.src,
  })),
  ...Object.values(contentPages).map((page) => ({
    key: `content.${page.route.slice(1).replaceAll("/", ".")}.hero`,
    label: `${page.hero.eyebrow} hero`,
    group: page.route.startsWith("/education") ? "Education" : "Other pages",
    defaultUrl: page.hero.image,
  })),
];

const managedImageKeys = new Set(siteImageSlots.map((slot) => slot.key));

export function getSiteImageSlot(key: string) {
  return siteImageSlots.find((slot) => slot.key === key);
}

export function isManagedImageKey(key: string) {
  return managedImageKeys.has(key);
}
