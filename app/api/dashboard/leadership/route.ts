import {
  deleteLeadershipProfile,
  getDashboardLeadershipProfiles,
  updateLeadershipProfile,
} from "@/db/dashboard";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const allowedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);

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
    const formData = await request.formData();
    const slug = String(formData.get("slug") ?? "");
    const profiles = await getDashboardLeadershipProfiles();
    const current = profiles.find((profile) => profile.slug === slug);
    if (!current) {
      return Response.json({ error: "Unknown leadership profile." }, { status: 400 });
    }

    const name = field(formData, "name", 120);
    const role = field(formData, "role", 120);
    const area = field(formData, "area", 80);
    const description = field(formData, "description", 600);
    const photoAlt = field(formData, "photoAlt", 220, false);
    if (!name || !role || !area || !description) {
      return Response.json(
        { error: "Name, role, leadership area and biography are required." },
        { status: 400 },
      );
    }

    let photoUrl = current.photoUrl;
    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      const extension = allowedTypes.get(file.type);
      if (!extension) {
        return Response.json(
          { error: "Choose a JPG, PNG, WebP or AVIF portrait." },
          { status: 400 },
        );
      }
      if (file.size > MAX_IMAGE_SIZE) {
        return Response.json(
          { error: "Portraits must be 10 MB or smaller." },
          { status: 400 },
        );
      }

      const objectPath = `leadership/${slug}-${Date.now()}.${extension}`;
      const supabase = await createSupabaseServerClient();
      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(objectPath, await file.arrayBuffer(), {
          contentType: file.type,
          cacheControl: "31536000",
          upsert: false,
        });
      if (uploadError) throw uploadError;
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
      confirmed: formData.get("confirmed") === "on",
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
  formData: FormData,
  name: string,
  maxLength: number,
  required = true,
) {
  const value = String(formData.get(name) ?? "").trim().slice(0, maxLength);
  return required || value ? value : "";
}
