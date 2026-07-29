import type { Metadata } from "next";
import { ContentDetailPage } from "@/components/ContentDetailPage";
import { contentPages } from "@/data/content-pages";

const page = contentPages.nursery;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.route },
};

export default function NurseryPage() {
  return <ContentDetailPage page={page} />;
}
