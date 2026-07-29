import { sql } from "drizzle-orm";
import {
  index,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const storiesTable = sqliteTable(
  "stories",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull(),
    category: text("category").notNull(),
    title: text("title").notNull(),
    excerpt: text("excerpt").notNull(),
    heroImage: text("hero_image").notNull(),
    heroAlt: text("hero_alt").notNull(),
    readTime: text("read_time").notNull(),
    quote: text("quote").notNull(),
    bodyJson: text("body_json").notNull(),
    status: text("status", { enum: ["draft", "published"] })
      .notNull()
      .default("draft"),
    createdBy: text("created_by").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    uniqueIndex("stories_slug_idx").on(table.slug),
    index("stories_status_idx").on(table.status),
  ],
);

export const enquiriesTable = sqliteTable(
  "enquiries",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    parentName: text("parent_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    childAge: text("child_age").notNull(),
    yearGroup: text("year_group").notNull(),
    message: text("message").notNull(),
    status: text("status", {
      enum: ["new", "in_progress", "closed"],
    })
      .notNull()
      .default("new"),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => [
    index("enquiries_status_idx").on(table.status),
    index("enquiries_created_at_idx").on(table.createdAt),
  ],
);
