import type { Metadata } from "next";
import { StoryArticle } from "@/components/StoryArticle";
import { getPublicStory } from "@/data/story-service";
import { notFound } from "next/navigation";
import { getStory } from "../../../data/stories";

const story = getStory("learning-beyond-the-classroom")!;

export const metadata: Metadata = {
  title: `${story.title} | Shah Lalji Nangpar Academy`,
  description: story.excerpt,
  alternates: { canonical: story.href },
};

export const dynamic = "force-dynamic";

export default async function LearningBeyondTheClassroomPage() {
  const currentStory = await getPublicStory(story.slug);
  if (!currentStory) notFound();
  return <StoryArticle story={currentStory} />;
}
