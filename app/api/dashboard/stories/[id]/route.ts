import { deleteStory, updateStory, updateStoryStatus } from "@/db/dashboard";
import { parseStoryInput } from "@/lib/dashboard-content";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  const payload = (await request.json()) as Record<string, unknown>;
  const status =
    payload.status === "published"
      ? "published"
      : payload.status === "draft"
        ? "draft"
        : null;

  if (!Number.isInteger(id) || id < 1) {
    return Response.json({ error: "Invalid story update." }, { status: 400 });
  }

  try {
    if (Object.keys(payload).length === 1 && status) {
      await updateStoryStatus(id, status);
      return Response.json({ ok: true });
    }
    const input = parseStoryInput(payload);
    if (!input) {
      return Response.json(
        { error: "Please complete the required story fields correctly." },
        { status: 400 },
      );
    }
    return Response.json({ story: await updateStory(id, input) });
  } catch {
    return Response.json(
      { error: "The story status could not be updated." },
      { status: 500 },
    );
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
    return Response.json({ error: "Invalid story." }, { status: 400 });
  }
  try {
    await deleteStory(id);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "The story could not be deleted." }, { status: 500 });
  }
}
