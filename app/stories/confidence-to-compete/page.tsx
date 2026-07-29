import type { Metadata } from "next";
import { StoryArticle } from "@/components/StoryArticle";
import { getPublicStory } from "@/data/story-service";
import { getStory } from "../../../data/stories";

const story = getStory("confidence-to-compete")!;

export const metadata: Metadata = {
  title: `${story.title} | Shah Lalji Nangpar Academy`,
  description: story.excerpt,
  alternates: { canonical: story.href },
};

export const dynamic = "force-dynamic";

export default async function ConfidenceToCompetePage() {
  return <StoryArticle story={(await getPublicStory(story.slug)) ?? story} />;
}
