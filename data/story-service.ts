import {
  getPublishedStories,
  getPublishedStory,
} from "@/db/dashboard";
import { getStory, stories, type Story } from "@/data/stories";

export async function getPublicStories(): Promise<Story[]> {
  try {
    const storedStories = await getPublishedStories();
    return storedStories.length > 0 ? storedStories : [...stories];
  } catch {
    return [...stories];
  }
}

export async function getPublicStory(slug: string): Promise<Story | undefined> {
  try {
    const storedStory = await getPublishedStory(slug);
    if (storedStory) return storedStory;
  } catch {
    // The bundled stories keep the public website available before D1 setup.
  }
  return getStory(slug);
}
