import { getPublicSiteImageOverrides } from "@/db/dashboard";

export async function GET() {
  try {
    const images = await getPublicSiteImageOverrides();
    return Response.json(
      { images },
      { headers: { "cache-control": "no-store" } },
    );
  } catch {
    // Local files remain the source of truth until the media table is ready.
    return Response.json({ images: {} });
  }
}
