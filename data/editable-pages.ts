import type { ContentPage } from "@/data/content-pages";
import { contentPages } from "@/data/content-pages";
import type { LeadershipMessage } from "@/data/leadership";
import { leadershipMessages } from "@/data/leadership";

export type EditablePageKey =
  | "board-chair-message"
  | "school-administrator-message"
  | "fee-structure";

export type DashboardLeadershipMessagePage = {
  key: "board-chair-message" | "school-administrator-message";
  label: string;
  kind: "leadership-message";
  content: LeadershipMessage;
  updatedAt: string;
};

export type DashboardFeePage = {
  key: "fee-structure";
  label: string;
  kind: "fee-structure";
  content: ContentPage;
  updatedAt: string;
};

export type DashboardEditablePage =
  | DashboardLeadershipMessagePage
  | DashboardFeePage;

export const editablePageDefinitions: readonly DashboardEditablePage[] = [
  {
    key: "board-chair-message",
    label: "Board Chair message",
    kind: "leadership-message",
    content: leadershipMessages.boardChair,
    updatedAt: "",
  },
  {
    key: "school-administrator-message",
    label: "School Administrator message",
    kind: "leadership-message",
    content: leadershipMessages.schoolAdministrator,
    updatedAt: "",
  },
  {
    key: "fee-structure",
    label: "Fee structure",
    kind: "fee-structure",
    content: contentPages.feeStructure,
    updatedAt: "",
  },
];

export function getEditablePageDefinition(key: string) {
  return editablePageDefinitions.find((page) => page.key === key);
}
