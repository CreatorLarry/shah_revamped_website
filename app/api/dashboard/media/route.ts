import {
  deleteSiteImageOverride,
  getSiteImages,
  updateSiteImage,
} from "@/db/dashboard";
import { requireDashboardApiUser } from "@/lib/dashboard-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  try {
    return Response.json({ images: await getSiteImages() });
  } catch {
    return Response.json(
      { error: "The Media Library is not ready. Run supabase/media-library.sql." },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  const access = await requireDashboardApiUser();
  if (access.error || !access.user) return access.error;

  try {
    const payload = (await request.json()) as {
      key?: string;
      altText?: string;
      objectPath?: string;
    };
    const key = String(payload.key ?? "");
    const altText = String(payload.altText ?? "").trim().slice(0, 220);
    const objectPath = String(payload.objectPath ?? "");
    const slot = (await getSiteImages()).find((image) => image.key === key);

    if (!slot) {
      return Response.json({ error: "Unknown website image slot." }, { status: 400 });
    }
    if (!isValidUploadedPath(objectPath, "replacements")) {
      return Response.json(
        { error: "The uploaded replacement file is invalid." },
        { status: 400 },
      );
    }
    const supabase = await createSupabaseServerClient();
    if (!(await storedObjectExists(supabase, objectPath))) {
      return Response.json(
        { error: "The uploaded replacement file could not be found." },
        { status: 400 },
      );
    }

    const { data } = supabase.storage.from("site-images").getPublicUrl(objectPath);
    const image = await updateSiteImage({
      slot,
      currentUrl: data.publicUrl,
      altText,
      updatedBy: access.user.id,
    });

    if (slot.currentUrl) {
      await removeStoredImage(supabase, slot.currentUrl);
    }

    return Response.json({ image });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    return Response.json(
      { error: message || "The replacement image could not be uploaded." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const access = await requireDashboardApiUser();
  if (access.error) return access.error;

  const payload = (await request.json()) as { key?: string };
  const key = payload.key ?? "";
  const slot = (await getSiteImages()).find((image) => image.key === key);
  if (!slot) {
    return Response.json({ error: "Unknown website image slot." }, { status: 400 });
  }

  try {
    const image = await deleteSiteImageOverride(slot);
    let warning: string | undefined;
    if (slot.currentUrl) {
      const supabase = await createSupabaseServerClient();
      const removed = await removeStoredImage(supabase, slot.currentUrl);
      if (!removed) warning = "The website was restored, but the old file could not be removed from storage.";
    }
    return Response.json({ image, warning });
  } catch {
    return Response.json(
      { error: "The original image could not be restored." },
      { status: 500 },
    );
  }
}

function isValidUploadedPath(path: string, folder: "replacements" | "leadership") {
  return new RegExp(
    `^${folder}/[a-z0-9][a-z0-9_-]*[.](?:jpe?g|png|webp|avif)$`,
    "i",
  ).test(path);
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

async function removeStoredImage(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  publicUrl: string,
) {
  try {
    const marker = "/storage/v1/object/public/site-images/";
    const path = new URL(publicUrl).pathname.split(marker)[1];
    if (!path) return false;
    const { error } = await supabase.storage
      .from("site-images")
      .remove([decodeURIComponent(path)]);
    return !error;
  } catch {
    return false;
  }
}
