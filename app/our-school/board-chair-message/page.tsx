import type { Metadata } from "next";
import { LeadershipMessagePage } from "@/components/LeadershipMessagePage";
import { leadershipMessages } from "@/data/leadership";

const message = leadershipMessages.boardChair;

export const metadata: Metadata = {
  title: message.metaTitle,
  description: message.metaDescription,
  alternates: { canonical: message.route },
};

export default function BoardChairMessagePage() {
  return <LeadershipMessagePage message={message} />;
}
