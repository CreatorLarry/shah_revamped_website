import { createStory, getDashboardSnapshot } from "@/db/dashboard";
import { parseStoryInput } from "@/lib/dashboard-content";
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
    const input = parseStoryInput(payload);
    if (!input) {
      return Response.json(
        { error: "Please complete the required story fields correctly." },
        { status: 400 },
      );
    }

    const story = await createStory(input, access.user.id);

    return Response.json({ story }, { status: 201 });
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
