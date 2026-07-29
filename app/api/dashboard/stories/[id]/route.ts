import { updateStoryStatus } from "@/db/dashboard";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  const payload = (await request.json()) as { status?: string };
  const status =
    payload.status === "published"
      ? "published"
      : payload.status === "draft"
        ? "draft"
        : null;

  if (!Number.isInteger(id) || id < 1 || !status) {
    return Response.json({ error: "Invalid story update." }, { status: 400 });
  }

  try {
    await updateStoryStatus(id, status);
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "The story status could not be updated." },
      { status: 500 },
    );
  }
}
