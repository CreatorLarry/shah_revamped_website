import {
  deleteSiteImageOverride,
  getSiteImages,
  updateSiteImage,
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
    const formData = await request.formData();
    const key = String(formData.get("key") ?? "");
    const altText = String(formData.get("altText") ?? "").trim().slice(0, 220);
    const file = formData.get("file");
    const extension = file instanceof File ? allowedTypes.get(file.type) : null;
    const slot = (await getSiteImages()).find((image) => image.key === key);

    if (!slot) {
      return Response.json({ error: "Unknown website image slot." }, { status: 400 });
    }
    if (!(file instanceof File) || !extension || file.size < 1) {
      return Response.json(
        { error: "Choose a JPG, PNG, WebP or AVIF image." },
        { status: 400 },
      );
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return Response.json(
        { error: "Images must be 10 MB or smaller." },
        { status: 400 },
      );
    }

    const safeName = key
      .replace(/^\/images\//, "")
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9/-]+/gi, "-")
      .replace(/\/+/, "/");
    const objectPath = `replacements/${safeName}-${Date.now()}.${extension}`;
    const supabase = await createSupabaseServerClient();
    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(objectPath, await file.arrayBuffer(), {
        contentType: file.type,
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadError) throw uploadError;
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
