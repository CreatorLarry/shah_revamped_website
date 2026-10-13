import { deleteEvent, updateEvent } from "@/db/dashboard";
import { parseEventInput } from "@/lib/dashboard-content";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";
import { resolveDashboardImage } from "@/lib/dashboard-storage";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;
  const { id: rawId } = await context.params;
  const id = Number(rawId);
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
  if (!Number.isInteger(id) || id < 1 || !input) {
    return Response.json({ error: "Invalid event update." }, { status: 400 });
  }
  try {
    return Response.json({ event: await updateEvent(id, input) });
  } catch {
    return Response.json({ error: "The event could not be updated." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;
  const { id: rawId } = await context.params;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) {
    return Response.json({ error: "Invalid event." }, { status: 400 });
  }
  try {
    await deleteEvent(id);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "The event could not be deleted." }, { status: 500 });
  }
}
