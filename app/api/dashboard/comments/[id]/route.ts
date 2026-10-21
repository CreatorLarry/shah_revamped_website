import {
  deleteStoryComment,
  moderateStoryComment,
  type DashboardStoryComment,
} from "@/db/story-engagement";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";

const statuses = new Set<DashboardStoryComment["status"]>([
  "pending",
  "approved",
  "rejected",
]);

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const access = await requireDashboardApiUser();
  if (access.error || !access.user) return access.error;

  const { id: rawId } = await context.params;
  const id = Number(rawId);
  const payload = (await request.json()) as Record<string, unknown>;
  const status = payload.status;
  const staffReply = clean(payload.staffReply, 1500);
  if (
    !Number.isInteger(id) ||
    id < 1 ||
    typeof status !== "string" ||
    !statuses.has(status as DashboardStoryComment["status"])
  ) {
    return Response.json({ error: "Invalid comment update." }, { status: 400 });
  }

  try {
    const comment = await moderateStoryComment(id, {
      status: status as DashboardStoryComment["status"],
      staffReply,
      moderatedBy: access.user.id,
    });
    return Response.json({ comment });
  } catch {
    return Response.json(
      { error: "The comment could not be updated." },
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
    return Response.json({ error: "Invalid comment." }, { status: 400 });
  }
  try {
    await deleteStoryComment(id);
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "The comment could not be deleted." },
      { status: 500 },
    );
  }
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}
