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

export type DashboardEvent = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string | null;
  image: string;
  alt: string;
  status: "draft" | "published";
  createdBy: string;
  createdAt: string;
  updatedAt: string;
};

export type StoryMutationInput = Pick<
  Story,
  | "slug"
  | "category"
  | "title"
  | "excerpt"
  | "image"
  | "alt"
  | "readTime"
  | "quote"
  | "sections"
> & { status: "draft" | "published" };

export type EventMutationInput = Omit<
  DashboardEvent,
  "id" | "createdBy" | "createdAt" | "updatedAt"
>;

export type DashboardSnapshot = {
  stories: DashboardStory[];
  events: DashboardEvent[];
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

type EventRow = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  location: string;
  starts_at: string;
  ends_at: string | null;
  image_url: string;
  image_alt: string;
  status: "draft" | "published";
  created_by: string | null;
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
  const [storyResult, eventResult, enquiryResult] = await Promise.all([
    supabase
      .from("stories")
      .select("*")
      .order("updated_at", { ascending: false })
      .order("id", { ascending: false }),
    supabase
      .from("events")
      .select("*")
      .order("starts_at", { ascending: true })
      .order("id", { ascending: true }),
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
    // Keep the rest of the dashboard usable until the events migration runs.
    events: eventResult.error ? [] : (eventResult.data as EventRow[]).map(mapEvent),
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
  input: StoryMutationInput,
  createdBy: string,
) {
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
      body_json: input.sections,
      status: input.status,
      created_by: createdBy,
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapStory(data as StoryRow);
}

export async function updateStory(id: number, input: StoryMutationInput) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("stories")
    .update({
      slug: input.slug,
      category: input.category,
      title: input.title,
      excerpt: input.excerpt,
      hero_image: input.image,
      hero_alt: input.alt,
      read_time: input.readTime,
      quote: input.quote,
      body_json: input.sections,
      status: input.status,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return mapStory(data as StoryRow);
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

export async function deleteStory(id: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("stories").delete().eq("id", id);
  if (error) throw error;
}

export async function getPublishedEvents(): Promise<DashboardEvent[]> {
  const supabase = createSupabasePublicClient();
  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("status", "published")
    .or(`starts_at.gte.${now},ends_at.gte.${now}`)
    .order("starts_at", { ascending: true });
  if (error) throw error;
  return (data as EventRow[]).map(mapEvent);
}

export async function createEvent(input: EventMutationInput, createdBy: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .insert({
      slug: input.slug,
      title: input.title,
      summary: input.summary,
      description: input.description,
      location: input.location,
      starts_at: input.startsAt,
      ends_at: input.endsAt,
      image_url: input.image,
      image_alt: input.alt,
      status: input.status,
      created_by: createdBy,
    })
    .select("*")
    .single();
  if (error) throw error;
  return mapEvent(data as EventRow);
}

export async function updateEvent(id: number, input: EventMutationInput) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("events")
    .update({
      slug: input.slug,
      title: input.title,
      summary: input.summary,
      description: input.description,
      location: input.location,
      starts_at: input.startsAt,
      ends_at: input.endsAt,
      image_url: input.image,
      image_alt: input.alt,
      status: input.status,
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return mapEvent(data as EventRow);
}

export async function deleteEvent(id: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
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

export async function deleteEnquiry(id: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("enquiries").delete().eq("id", id);
  if (error) throw error;
}

export async function getSiteImages(): Promise<SiteImage[]> {
  const supabase = await createSupabaseServerClient();
  const [imageResult, storyResult, eventResult] = await Promise.all([
    supabase.from("site_images").select("*"),
    supabase.from("stories").select("*").order("id"),
    supabase.from("events").select("*").order("id"),
  ]);

  if (imageResult.error) throw imageResult.error;
  if (storyResult.error) throw storyResult.error;

  const rows = new Map(
    (imageResult.data as SiteImageRow[]).map((row) => [row.key, row]),
  );
  const slots = [
    ...siteImageSlots,
    ...buildStoryImageSlots(storyResult.data as StoryRow[]),
    ...(eventResult.error ? [] : buildEventImageSlots(eventResult.data as EventRow[])),
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

export async function deleteSiteImageOverride(slot: SiteImageSlot) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("site_images")
    .delete()
    .eq("key", slot.key);

  if (error) throw error;
  return {
    key: slot.key,
    label: slot.label,
    group: slot.group,
    defaultUrl: slot.defaultUrl,
    currentUrl: null,
    altText: "",
    updatedAt: "",
  } satisfies SiteImage;
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

export async function deleteLeadershipProfile(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("leadership_profiles")
    .delete()
    .eq("slug", slug);
  if (error) throw error;
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

function mapEvent(row: EventRow): DashboardEvent {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    description: row.description,
    location: row.location,
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    image: row.image_url,
    alt: row.image_alt,
    status: row.status,
    createdBy: row.created_by ?? "website-admin",
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

function buildEventImageSlots(rows: EventRow[]): SiteImageSlot[] {
  return rows.map((row) => ({
    key: `event.${row.slug}.image`,
    label: `Upcoming event — ${row.title}`,
    group: "Events",
    defaultUrl: row.image_url,
  }));
}

function parseSections(value: unknown): Story["sections"] {
  if (Array.isArray(value)) return value as unknown as Story["sections"];
  if (typeof value === "string") {
    return JSON.parse(value) as Story["sections"];
  }
  return [];
}
