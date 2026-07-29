import type { Metadata } from "next";
import { LeadershipMessagePage } from "@/components/LeadershipMessagePage";
import { leadershipMessages } from "@/data/leadership";

const message = leadershipMessages.schoolAdministrator;

export const metadata: Metadata = {
  title: message.metaTitle,
  description: message.metaDescription,
  alternates: { canonical: message.route },
};

export default function SchoolAdministratorMessagePage() {
  return <LeadershipMessagePage message={message} />;
}
