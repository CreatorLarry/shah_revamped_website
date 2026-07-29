import type { Metadata } from "next";
import { ContentDetailPage } from "@/components/ContentDetailPage";
import { contentPages } from "@/data/content-pages";

const page = contentPages.aLevel;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.route },
};

export default function ALevelPage() {
  return <ContentDetailPage page={page} />;
}
