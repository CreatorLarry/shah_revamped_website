import type { Metadata } from "next";
import { LeadershipMessagePage } from "@/components/LeadershipMessagePage";
import { leadershipMessages } from "@/data/leadership";
import { getPublicEditablePage } from "@/db/dashboard";

const message = leadershipMessages.boardChair;

export const metadata: Metadata = {
  title: message.metaTitle,
  description: message.metaDescription,
  alternates: { canonical: message.route },
};

export const dynamic = "force-dynamic";

export default async function BoardChairMessagePage() {
  let current = message;
  try {
    current = await getPublicEditablePage("board-chair-message") as typeof message;
  } catch {
    // Keep the bundled message available before the content migration runs.
  }
  return <LeadershipMessagePage message={current} />;
}
