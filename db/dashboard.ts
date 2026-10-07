import type { Story } from "@/data/stories";
import { siteImageSlots, type SiteImageSlot } from "@/data/site-images";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DashboardStory = Story & {
  id: number;
  status: "draft" | "published";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type Enquiry = {
  id: number;
  parentName: string;
  email: string;
  phone: string;
  childAge: string;
  yearGroup: string;
  message: string;
  status: "new" | "in_progress" | "closed";
  createdAt: string;
  updatedAt: string;
};

export type DashboardSnapshot = {
  stories: DashboardStory[];
  enquiries: Enquiry[];
};

export type SiteImage = {
  key: string;
  label: string;
  group: string;
  defaultUrl: string;
  currentUrl: string | null;
  altText: string;
  updatedAt: string;
};

export type LeadershipProfile = {
  id: number;
  slug: string;
  name: string;
  role: string;
  area: string;
  description: string;
  photoUrl: string | null;
  photoAlt: string;
  confirmed: boolean;
  sortOrder: number;
  updatedAt: string;
};

type StoryRow = {
  id: number;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  hero_image: string;
  hero_alt: string;
  read_time: string;
  quote: string;
  body_json: unknown;
  status: "draft" | "published";
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

type EnquiryRow = {
  id: number;
  parent_name: string;
  email: string;
  phone: string;
  child_age: string;
  year_group: string;
  message: string;
  status: "new" | "in_progress" | "closed";
  created_at: string;
  updated_at: string;
};

type SiteImageRow = {
  key: string;
  label: string;
  group_name: string;
  default_url: string;
  current_url: string | null;
  alt_text: string;
  updated_at: string;
};

type LeadershipProfileRow = {
  id: number;
  slug: string;
  name: string;
  role: string;
  area: string;
  description: string;
  photo_url: string | null;
  photo_alt: string;
  confirmed: boolean;
  sort_order: number;
  updated_at: string;
};

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  const supabase = await createSupabaseServerClient();
  const [storyResult, enquiryResult] = await Promise.all([
    supabase
      .from("stories")
      .select("*")
      .order("updated_at", { ascending: false })
      .order("id", { ascending: false }),
    supabase
      .from("enquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .order("id", { ascending: false }),
  ]);

  if (storyResult.error) throw storyResult.error;
  if (enquiryResult.error) throw enquiryResult.error;

  return {
    stories: (storyResult.data as StoryRow[]).map(mapStory),
    enquiries: (enquiryResult.data as EnquiryRow[]).map(mapEnquiry),
  };
}

export async function getPublishedStories(): Promise<Story[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("status", "published")
    .order("updated_at", { ascending: false })
    .order("id", { ascending: false });

  if (error) throw error;
  return (data as StoryRow[]).map(mapStory);
}

export async function getPublishedStory(slug: string): Promise<Story | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("stories")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) throw error;
  return data ? mapStory(data as StoryRow) : null;
}

export async function createStory(
  input: {
    slug: string;
    category: string;
    title: string;
    excerpt: string;
    image: string;
    alt: string;
    readTime: string;
    quote: string;
    status: "draft" | "published";
  },
  createdBy: string,
) {
  const sections = [
    {
      heading: "The story",
      paragraphs: [input.excerpt],
      image: input.image,
      imageAlt: input.alt,
    },
  ];
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("stories")
    .insert({
      slug: input.slug,
      category: input.category,
      title: input.title,
      excerpt: input.excerpt,
      hero_image: input.image,
      hero_alt: input.alt,
      read_time: input.readTime,
      quote: input.quote,
      body_json: sections,
      status: input.status,
      created_by: createdBy,
    })
    .select("id")
    .single();

  if (error) throw error;
  return Number(data.id);
}

export async function updateStoryStatus(
  id: number,
  status: "draft" | "published",
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("stories")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function createEnquiry(input: {
  parentName: string;
  email: string;
  phone: string;
  childAge: string;
  yearGroup: string;
  message: string;
}) {
  const supabase = createSupabasePublicClient();
  const { error } = await supabase.from("enquiries").insert({
      parent_name: input.parentName,
      email: input.email,
      phone: input.phone,
      child_age: input.childAge,
      year_group: input.yearGroup,
      message: input.message,
    });

  if (error) throw error;
  // Do not return the inserted row to public visitors; enquiries are private.
  return null;
}

export async function updateEnquiryStatus(
  id: number,
  status: "new" | "in_progress" | "closed",
) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("enquiries")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

export async function getSiteImages(): Promise<SiteImage[]> {
  const supabase = await createSupabaseServerClient();
  const [imageResult, storyResult] = await Promise.all([
    supabase.from("site_images").select("*"),
    supabase.from("stories").select("*").order("id"),
  ]);

  if (imageResult.error) throw imageResult.error;
  if (storyResult.error) throw storyResult.error;

  const rows = new Map(
    (imageResult.data as SiteImageRow[]).map((row) => [row.key, row]),
  );
  const slots = [
    ...siteImageSlots,
    ...buildStoryImageSlots(storyResult.data as StoryRow[]),
  ];

  return slots
    .map((slot) => {
      const row = rows.get(slot.key);
      return {
        key: slot.key,
        label: slot.label,
        group: slot.group,
        defaultUrl: slot.defaultUrl,
        currentUrl: row?.current_url ?? null,
        altText: row?.alt_text ?? "",
        updatedAt: row?.updated_at ?? "",
      };
    })
    .sort((a, b) =>
      `${a.group}-${a.label}`.localeCompare(`${b.group}-${b.label}`),
    );
}

export async function getPublicSiteImageOverrides() {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("site_images")
    .select("key, current_url, alt_text")
    .not("current_url", "is", null);

  if (error) throw error;

  return Object.fromEntries(
    (data as Pick<SiteImageRow, "key" | "current_url" | "alt_text">[])
      .filter((image) => image.current_url)
      .map((image) => [
        image.key,
        { url: image.current_url as string, alt: image.alt_text },
      ]),
  );
}

export async function updateSiteImage(input: {
  slot: SiteImageSlot;
  currentUrl: string;
  altText: string;
  updatedBy: string;
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("site_images")
    .upsert({
      key: input.slot.key,
      label: input.slot.label,
      group_name: input.slot.group,
      default_url: input.slot.defaultUrl,
      current_url: input.currentUrl,
      alt_text: input.altText,
      updated_by: input.updatedBy,
    }, { onConflict: "key" })
    .select("*")
    .single();

  if (error) throw error;
  return mapSiteImage(data as SiteImageRow);
}

export async function resetSiteImage(slot: SiteImageSlot) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("site_images")
    .update({ current_url: null, alt_text: "", updated_by: null })
    .eq("key", slot.key)
    .select("*")
    .single();

  if (error) throw error;
  return mapSiteImage(data as SiteImageRow);
}

export async function getDashboardLeadershipProfiles() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leadership_profiles")
    .select("*")
    .order("sort_order")
    .order("id");
  if (error) throw error;
  return (data as LeadershipProfileRow[]).map(mapLeadershipProfile);
}

export async function getPublicLeadershipProfiles() {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("leadership_profiles")
    .select("*")
    .order("sort_order")
    .order("id");
  if (error) throw error;
  return (data as LeadershipProfileRow[]).map(mapLeadershipProfile);
}

export async function updateLeadershipProfile(input: {
  slug: string;
  name: string;
  role: string;
  area: string;
  description: string;
  photoUrl: string | null;
  photoAlt: string;
  confirmed: boolean;
}) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leadership_profiles")
    .update({
      name: input.name,
      role: input.role,
      area: input.area,
      description: input.description,
      photo_url: input.photoUrl,
      photo_alt: input.photoAlt,
      confirmed: input.confirmed,
    })
    .eq("slug", input.slug)
    .select("*")
    .single();
  if (error) throw error;
  return mapLeadershipProfile(data as LeadershipProfileRow);
}

function mapStory(row: StoryRow): DashboardStory {
  return {
    id: row.id,
    slug: row.slug,
    href: `/stories/${row.slug}`,
    category: row.category,
    title: row.title,
    excerpt: row.excerpt,
    image: row.hero_image,
    alt: row.hero_alt,
    readTime: row.read_time,
    quote: row.quote,
    sections: parseSections(row.body_json),
    status: row.status,
    createdBy: row.created_by ?? "website-seed",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapEnquiry(row: EnquiryRow): Enquiry {
  return {
    id: row.id,
    parentName: row.parent_name,
    email: row.email,
    phone: row.phone,
    childAge: row.child_age,
    yearGroup: row.year_group,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSiteImage(row: SiteImageRow): SiteImage {
  return {
    key: row.key,
    label: row.label,
    group: row.group_name,
    defaultUrl: row.default_url,
    currentUrl: row.current_url,
    altText: row.alt_text,
    updatedAt: row.updated_at,
  };
}

function mapLeadershipProfile(row: LeadershipProfileRow): LeadershipProfile {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    role: row.role,
    area: row.area,
    description: row.description,
    photoUrl: row.photo_url,
    photoAlt: row.photo_alt,
    confirmed: row.confirmed,
    sortOrder: row.sort_order,
    updatedAt: row.updated_at,
  };
}

function buildStoryImageSlots(rows: StoryRow[]): SiteImageSlot[] {
  return rows.flatMap((row) => {
    const sections = parseSections(row.body_json);
    const placements: SiteImageSlot[] = [
      {
        key: `home.story.${row.slug}`,
        label: `Homepage story card — ${row.title}`,
        group: "Stories",
        defaultUrl: row.hero_image,
      },
      {
        key: `stories.index.${row.slug}`,
        label: `Stories listing — ${row.title}`,
        group: "Stories",
        defaultUrl: row.hero_image,
      },
      {
        key: `story.${row.slug}.hero`,
        label: `Story hero — ${row.title}`,
        group: "Stories",
        defaultUrl: row.hero_image,
      },
    ];

    sections.forEach((section, index) => {
      if (!section.image) return;
      placements.push({
        key: `story.${row.slug}.section.${index + 1}`,
        label: `${row.title} — section ${index + 1}`,
        group: "Stories",
        defaultUrl: section.image,
      });
    });
    return placements;
  });
}

function parseSections(value: unknown): Story["sections"] {
  if (Array.isArray(value)) return value as unknown as Story["sections"];
  if (typeof value === "string") {
    return JSON.parse(value) as Story["sections"];
  }
  return [];
}
