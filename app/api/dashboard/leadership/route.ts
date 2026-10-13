import {
  deleteLeadershipProfile,
  getDashboardLeadershipProfiles,
  updateLeadershipProfile,
} from "@/db/dashboard";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  try {
    return Response.json({ profiles: await getDashboardLeadershipProfiles() });
  } catch {
    return Response.json(
      { error: "Leadership editing is not ready. Run supabase/media-library.sql again." },
      { status: 503 },
    );
  }
}

export async function DELETE(request: Request) {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;
  try {
    const payload = (await request.json()) as { slug?: string };
    const slug = String(payload.slug ?? "");
    const current = (await getDashboardLeadershipProfiles()).find(
      (profile) => profile.slug === slug,
    );
    if (!current) {
      return Response.json({ error: "Unknown leadership profile." }, { status: 400 });
    }
    await deleteLeadershipProfile(slug);
    return Response.json({ ok: true });
  } catch {
    return Response.json(
      { error: "The leadership profile could not be deleted." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const slug = String(payload.slug ?? "");
    const profiles = await getDashboardLeadershipProfiles();
    const current = profiles.find((profile) => profile.slug === slug);
    if (!current) {
      return Response.json({ error: "Unknown leadership profile." }, { status: 400 });
    }

    const name = field(payload, "name", 120);
    const role = field(payload, "role", 120);
    const area = field(payload, "area", 80);
    const description = field(payload, "description", 600);
    const photoAlt = field(payload, "photoAlt", 220, false);
    if (!name || !role || !area || !description) {
      return Response.json(
        { error: "Name, role, leadership area and biography are required." },
        { status: 400 },
      );
    }

    let photoUrl = current.photoUrl;
    const objectPath = String(payload.photoObjectPath ?? "");
    if (objectPath) {
      if (!isValidLeadershipPath(objectPath)) {
        return Response.json(
          { error: "The uploaded leadership portrait is invalid." },
          { status: 400 },
        );
      }
      const supabase = await createSupabaseServerClient();
      if (!(await storedObjectExists(supabase, objectPath))) {
        return Response.json(
          { error: "The uploaded leadership portrait could not be found." },
          { status: 400 },
        );
      }
      photoUrl = supabase.storage.from("site-images").getPublicUrl(objectPath).data.publicUrl;
    }

    const profile = await updateLeadershipProfile({
      slug,
      name,
      role,
      area,
      description,
      photoUrl,
      photoAlt,
      confirmed: payload.confirmed === true,
    });
    return Response.json({ profile });
  } catch {
    return Response.json(
      { error: "The leadership profile could not be saved." },
      { status: 500 },
    );
  }
}

function field(
  payload: Record<string, unknown>,
  name: string,
  maxLength: number,
  required = true,
) {
  const value = String(payload[name] ?? "").trim().slice(0, maxLength);
  return required || value ? value : "";
}

function isValidLeadershipPath(path: string) {
  return /^leadership\/[a-z0-9][a-z0-9_-]*[.](?:jpe?g|png|webp|avif)$/i.test(path);
}

async function storedObjectExists(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  objectPath: string,
) {
  const separator = objectPath.lastIndexOf("/");
  const folder = objectPath.slice(0, separator);
  const fileName = objectPath.slice(separator + 1);
  const { data, error } = await supabase.storage
    .from("site-images")
    .list(folder, { limit: 10, search: fileName });

  return !error && data?.some((file) => file.name === fileName) === true;
}
