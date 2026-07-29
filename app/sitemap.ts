import type { MetadataRoute } from "next";
import { contentPages } from "@/data/content-pages";
import { leadershipRoutes } from "@/data/leadership";
import { stories } from "@/data/stories";
import { getSiteOrigin } from "@/lib/site-origin";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteOrigin();
  const coreRoutes = [
    "",
    "/our-school",
    "/education",
    "/admissions",
    "/school-life",
    "/stories",
    "/gallery",
    "/contact",
  ];
  const detailRoutes = Object.values(contentPages).map((page) => page.route);
  const storyRoutes = stories.map((story) => `/stories/${story.slug}`);

  return [
    ...coreRoutes,
    ...detailRoutes,
    ...leadershipRoutes,
    ...storyRoutes,
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/stories") ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
