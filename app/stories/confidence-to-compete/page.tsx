import type { Metadata } from "next";
import { StoryArticle } from "@/components/StoryArticle";
import { getStory } from "@/data/stories";

const story = getStory("confidence-to-compete")!;

export const metadata: Metadata = {
  title: `${story.title} | Shah Lalji Nangpar Academy`,
  description: story.excerpt,
  alternates: { canonical: story.href },
};

export default function ConfidenceToCompetePage() {
  return <StoryArticle story={story} />;
}
