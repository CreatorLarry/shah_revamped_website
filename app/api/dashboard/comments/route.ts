import { getDashboardStoryComments } from "@/db/story-engagement";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";

export async function GET() {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  try {
    return Response.json({ comments: await getDashboardStoryComments() });
  } catch {
    return Response.json(
      {
        error:
          "Comment moderation is not ready. Run supabase/story-engagement.sql in the website's Supabase project.",
      },
      { status: 503 },
    );
  }
}
