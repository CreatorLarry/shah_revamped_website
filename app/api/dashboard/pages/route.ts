import {
  getDashboardEditablePages,
  updateEditablePage,
} from "@/db/dashboard";
import {
  getEditablePageDefinition,
  type EditablePageKey,
} from "@/data/editable-pages";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";
import { parseEditablePageContent } from "@/lib/editable-page-content";
import { resolveDashboardImage } from "@/lib/dashboard-storage";

export async function GET() {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;
  try {
    return Response.json({ pages: await getDashboardEditablePages() });
  } catch {
    return Response.json(
      { error: "Page editing is not ready. Run supabase/content-management.sql." },
      { status: 503 },
    );
  }
}

export async function PATCH(request: Request) {
  const access = await requireDashboardApiUser();
  if (access.error || !access.user) return access.error;

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const key = String(payload.key ?? "") as EditablePageKey;
    const definition = getEditablePageDefinition(key);
    if (!definition) {
      return Response.json({ error: "Unknown website page." }, { status: 400 });
    }

    let content = payload.content;
    const objectPath = String(payload.photoObjectPath ?? "");
    if (objectPath) {
      if (definition.kind !== "leadership-message") {
        return Response.json({ error: "This page does not accept a portrait." }, { status: 400 });
      }
      const publicUrl = await resolveDashboardImage(objectPath, "pages");
      if (!publicUrl || !content || typeof content !== "object" || Array.isArray(content)) {
        return Response.json({ error: "The uploaded portrait could not be verified." }, { status: 400 });
      }
      content = { ...(content as Record<string, unknown>), image: publicUrl };
    }

    const parsed = parseEditablePageContent(key, content);
    if (!parsed) {
      return Response.json(
        { error: "Please complete the required page fields correctly." },
        { status: 400 },
      );
    }

    const page = await updateEditablePage({
      key,
      content: parsed,
      updatedBy: access.user.id,
    });
    return Response.json({ page });
  } catch (error) {
    return Response.json(
      { error: error instanceof Error ? error.message : "The page could not be saved." },
      { status: 500 },
    );
  }
}
