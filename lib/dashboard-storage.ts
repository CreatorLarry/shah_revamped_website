import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function resolveDashboardImage(
  objectPath: string,
  folder: "events" | "pages",
) {
  const pattern = new RegExp(
    `^${folder}/[a-z0-9][a-z0-9_-]*[.](?:jpe?g|png|webp|avif)$`,
    "i",
  );
  if (!pattern.test(objectPath)) return null;

  const separator = objectPath.lastIndexOf("/");
  const directory = objectPath.slice(0, separator);
  const fileName = objectPath.slice(separator + 1);
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.storage
    .from("site-images")
    .list(directory, { limit: 10, search: fileName });
  if (error || !data?.some((file) => file.name === fileName)) return null;

  return supabase.storage.from("site-images").getPublicUrl(objectPath).data.publicUrl;
}
