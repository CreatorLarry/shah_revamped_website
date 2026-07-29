import { getDashboardSnapshot } from "@/db/dashboard";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";

export async function GET() {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  try {
    const snapshot = await getDashboardSnapshot();
    return Response.json({ enquiries: snapshot.enquiries });
  } catch {
    return Response.json(
      { error: "The Enquiries database is temporarily unavailable." },
      { status: 500 },
    );
  }
}
