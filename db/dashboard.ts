import { stories as seedStories, type Story } from "@/data/stories";

type Bindings = {
  DB?: D1Database;
};

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
  body_json: string;
  status: "draft" | "published";
  created_by: string;
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

let schemaPromise: Promise<void> | null = null;

async function getDatabase(): Promise<D1Database> {
  const { env } = await import("cloudflare:workers");
  const database = (env as unknown as Bindings).DB;
  if (!database) {
    throw new Error("The dashboard database binding is unavailable.");
  }
  return database;
}

export async function ensureDashboardSchema() {
  if (!schemaPromise) {
    schemaPromise = initialiseSchema().catch((error) => {
      schemaPromise = null;
      throw error;
    });
  }
  return schemaPromise;
}

async function initialiseSchema() {
  const database = await getDatabase();
  await database.batch([
    database.prepare(`
      CREATE TABLE IF NOT EXISTS stories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        slug TEXT NOT NULL,
        category TEXT NOT NULL,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        hero_image TEXT NOT NULL,
        hero_alt TEXT NOT NULL,
        read_time TEXT NOT NULL,
        quote TEXT NOT NULL,
        body_json TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'draft',
        created_by TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `),
    database.prepare(
      "CREATE UNIQUE INDEX IF NOT EXISTS stories_slug_idx ON stories (slug)",
    ),
    database.prepare(
      "CREATE INDEX IF NOT EXISTS stories_status_idx ON stories (status)",
    ),
    database.prepare(`
      CREATE TABLE IF NOT EXISTS enquiries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        parent_name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        child_age TEXT NOT NULL,
        year_group TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'new',
        created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `),
    database.prepare(
      "CREATE INDEX IF NOT EXISTS enquiries_status_idx ON enquiries (status)",
    ),
    database.prepare(
      "CREATE INDEX IF NOT EXISTS enquiries_created_at_idx ON enquiries (created_at)",
    ),
  ]);

  await database.batch(
    seedStories.map((story) =>
      database
        .prepare(`
          INSERT OR IGNORE INTO stories (
            slug, category, title, excerpt, hero_image, hero_alt,
            read_time, quote, body_json, status, created_by
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'published', ?)
        `)
        .bind(
          story.slug,
          story.category,
          story.title,
          story.excerpt,
          story.image,
          story.alt,
          story.readTime,
          story.quote,
          JSON.stringify(story.sections),
          "website-seed",
        ),
    ),
  );
}

export async function getDashboardSnapshot(): Promise<DashboardSnapshot> {
  await ensureDashboardSchema();
  const database = await getDatabase();
  const [storyRows, enquiryRows] = await Promise.all([
    database
      .prepare("SELECT * FROM stories ORDER BY updated_at DESC, id DESC")
      .all<StoryRow>(),
    database
      .prepare("SELECT * FROM enquiries ORDER BY created_at DESC, id DESC")
      .all<EnquiryRow>(),
  ]);

  return {
    stories: storyRows.results.map(mapStory),
    enquiries: enquiryRows.results.map(mapEnquiry),
  };
}

export async function getPublishedStories(): Promise<Story[]> {
  await ensureDashboardSchema();
  const database = await getDatabase();
  const rows = await database
    .prepare(
      "SELECT * FROM stories WHERE status = 'published' ORDER BY updated_at DESC, id DESC",
    )
    .all<StoryRow>();
  return rows.results.map(mapStory);
}

export async function getPublishedStory(slug: string): Promise<Story | null> {
  await ensureDashboardSchema();
  const database = await getDatabase();
  const row = await database
    .prepare(
      "SELECT * FROM stories WHERE slug = ? AND status = 'published' LIMIT 1",
    )
    .bind(slug)
    .first<StoryRow>();
  return row ? mapStory(row) : null;
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
  await ensureDashboardSchema();
  const sections = [
    {
      heading: "The story",
      paragraphs: [input.excerpt],
      image: input.image,
      imageAlt: input.alt,
    },
  ];
  const database = await getDatabase();
  const result = await database
    .prepare(`
      INSERT INTO stories (
        slug, category, title, excerpt, hero_image, hero_alt,
        read_time, quote, body_json, status, created_by
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    .bind(
      input.slug,
      input.category,
      input.title,
      input.excerpt,
      input.image,
      input.alt,
      input.readTime,
      input.quote,
      JSON.stringify(sections),
      input.status,
      createdBy,
    )
    .run();
  return result.meta.last_row_id;
}

export async function updateStoryStatus(
  id: number,
  status: "draft" | "published",
) {
  await ensureDashboardSchema();
  const database = await getDatabase();
  await database
    .prepare(
      "UPDATE stories SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    )
    .bind(status, id)
    .run();
}

export async function createEnquiry(input: {
  parentName: string;
  email: string;
  phone: string;
  childAge: string;
  yearGroup: string;
  message: string;
}) {
  await ensureDashboardSchema();
  const database = await getDatabase();
  const result = await database
    .prepare(`
      INSERT INTO enquiries (
        parent_name, email, phone, child_age, year_group, message
      ) VALUES (?, ?, ?, ?, ?, ?)
    `)
    .bind(
      input.parentName,
      input.email,
      input.phone,
      input.childAge,
      input.yearGroup,
      input.message,
    )
    .run();
  return result.meta.last_row_id;
}

export async function updateEnquiryStatus(
  id: number,
  status: "new" | "in_progress" | "closed",
) {
  await ensureDashboardSchema();
  const database = await getDatabase();
  await database
    .prepare(
      "UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    )
    .bind(status, id)
    .run();
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
    sections: JSON.parse(row.body_json) as Story["sections"],
    status: row.status,
    createdBy: row.created_by,
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
