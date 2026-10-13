import { createEvent, getDashboardSnapshot } from "@/db/dashboard";
import { parseEventInput } from "@/lib/dashboard-content";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";
import { resolveDashboardImage } from "@/lib/dashboard-storage";

export async function GET() {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;
  try {
    return Response.json({ events: (await getDashboardSnapshot()).events });
  } catch {
    return Response.json(
      { error: "Upcoming Events is not ready. Run supabase/setup.sql again." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  const access = await requireDashboardApiUser();
  if (access.error || !access.user) return access.error;
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const objectPath = String(payload.imageObjectPath ?? "");
    if (objectPath) {
      const publicUrl = await resolveDashboardImage(objectPath, "events");
      if (!publicUrl) {
        return Response.json({ error: "The uploaded event image could not be verified." }, { status: 400 });
      }
      payload.image = publicUrl;
    }
    const input = parseEventInput(payload);
    if (!input) {
      return Response.json(
        { error: "Please complete the required event fields correctly." },
        { status: 400 },
      );
    }
    const event = await createEvent(input, access.user.id);
    return Response.json({ event }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message.toLowerCase() : "";
    if (message.includes("unique")) {
      return Response.json(
        { error: "An event already uses that web address." },
        { status: 409 },
      );
    }
    return Response.json(
      { error: "The event could not be saved. Run supabase/setup.sql if Events is new." },
      { status: 500 },
    );
  }
}
