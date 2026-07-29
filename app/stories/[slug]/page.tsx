import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryArticle } from "@/components/StoryArticle";
import { getPublicStory } from "@/data/story-service";

export const dynamic = "force-dynamic";

type StoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getPublicStory(slug);
  if (!story) return {};

  return {
    title: `${story.title} | Shah Lalji Nangpar Academy`,
    description: story.excerpt,
    alternates: { canonical: story.href },
  };
}

export default async function DynamicStoryPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getPublicStory(slug);
  if (!story) notFound();
  return <StoryArticle story={story} />;
}
