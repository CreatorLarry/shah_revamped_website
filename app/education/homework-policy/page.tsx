import type { Metadata } from "next";
import { ContentDetailPage } from "@/components/ContentDetailPage";
import { contentPages } from "@/data/content-pages";

const page = contentPages.homeworkPolicy;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.route },
};

export default function HomeworkPolicyPage() {
  return <ContentDetailPage page={page} />;
}
