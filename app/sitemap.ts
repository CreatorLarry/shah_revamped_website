import type { MetadataRoute } from "next";
import { contentPages } from "@/data/content-pages";
import { stories } from "@/data/stories";

const baseUrl = "https://shahlalji.ac.ke";

export default function sitemap(): MetadataRoute.Sitemap {
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

  return [...coreRoutes, ...detailRoutes, ...storyRoutes].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/stories") ? "monthly" : "yearly",
    priority: route === "" ? 1 : route.split("/").length === 2 ? 0.8 : 0.7,
  }));
}
