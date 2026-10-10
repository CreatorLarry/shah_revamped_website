import {
  getPublishedStories,
  getPublishedStory,
} from "@/db/dashboard";
import { getStory, stories, type Story } from "@/data/stories";

export async function getPublicStories(): Promise<Story[]> {
  try {
    return await getPublishedStories();
  } catch {
    return [...stories];
  }
}

export async function getPublicStory(slug: string): Promise<Story | undefined> {
  try {
    return (await getPublishedStory(slug)) ?? undefined;
  } catch {
    // The bundled stories keep the public website available before database setup.
    return getStory(slug);
  }
}
