import type { Metadata } from "next";
import { ContentDetailPage } from "@/components/ContentDetailPage";
import { contentPages } from "@/data/content-pages";
import { getPublicEditablePage } from "@/db/dashboard";

const page = contentPages.feeStructure;

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: page.route },
};

export const dynamic = "force-dynamic";

export default async function FeeStructurePage() {
  let current = page;
  try {
    current = await getPublicEditablePage("fee-structure") as typeof page;
  } catch {
    // Keep the bundled fee page available before the content migration runs.
  }
  return <ContentDetailPage page={current} />;
}
