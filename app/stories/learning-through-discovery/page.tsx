import type { Metadata } from "next";
import { StoryArticle } from "@/components/StoryArticle";
import { getStory } from "../../../data/stories";

const story = getStory("learning-through-discovery")!;

export const metadata: Metadata = {
  title: `${story.title} | Shah Lalji Nangpar Academy`,
  description: story.excerpt,
  alternates: { canonical: story.href },
};

export default function LearningThroughDiscoveryPage() {
  return <StoryArticle story={story} />;
}
