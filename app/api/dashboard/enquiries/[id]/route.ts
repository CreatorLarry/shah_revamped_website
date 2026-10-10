import { deleteEnquiry, updateEnquiryStatus } from "@/db/dashboard";
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
  const allowedStatuses = ["new", "in_progress", "closed"] as const;
  const status = allowedStatuses.find((value) => value === payload.status);

  if (!Number.isInteger(id) || id < 1 || !status) {
    return Response.json({ error: "Invalid enquiry update." }, { status: 400 });
  }

  try {
    await updateEnquiryStatus(id, status);
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "The enquiry status could not be updated." },
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
    return Response.json({ error: "Invalid enquiry." }, { status: 400 });
  }
  try {
    await deleteEnquiry(id);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "The enquiry could not be deleted." }, { status: 500 });
  }
}
