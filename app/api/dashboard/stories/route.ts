import { createStory, getDashboardSnapshot } from "@/db/dashboard";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";

export async function GET() {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  try {
    const snapshot = await getDashboardSnapshot();
    return Response.json({ stories: snapshot.stories });
  } catch {
    return Response.json(
      { error: "The Stories database is temporarily unavailable." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const access = await requireDashboardApiUser();
  if (access.error || !access.user) return access.error;

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const title = clean(payload.title, 140);
    const slug = clean(payload.slug, 140).toLowerCase();
    const category = clean(payload.category, 80);
    const excerpt = clean(payload.excerpt, 500);
    const image = clean(payload.image, 300);
    const alt = clean(payload.alt, 220);
    const readTime = clean(payload.readTime, 40) || "4 minute read";
    const quote = clean(payload.quote, 500) || excerpt;
    const status = payload.status === "published" ? "published" : "draft";

    if (
      !title ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) ||
      !category ||
      !excerpt ||
      !image.startsWith("/images/") ||
      !alt
    ) {
      return Response.json(
        { error: "Please complete the required story fields correctly." },
        { status: 400 },
      );
    }

    const storyId = await createStory(
      {
        slug,
        category,
        title,
        excerpt,
        image,
        alt,
        readTime,
        quote,
        status,
      },
      access.user.email,
    );

    return Response.json({ ok: true, storyId }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message.toLowerCase().includes("unique")) {
      return Response.json(
        { error: "A story already uses that web address." },
        { status: 409 },
      );
    }
    return Response.json(
      { error: "The story could not be saved." },
      { status: 500 },
    );
  }
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
