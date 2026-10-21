import { createSupabasePublicClient } from "@/lib/supabase/public";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type PublicStoryComment = {
  id: number;
  name: string;
  body: string;
  staffReply: string;
  createdAt: string;
};

export type StoryEngagement = {
  reactionCount: number;
  comments: PublicStoryComment[];
};

export type DashboardStoryComment = PublicStoryComment & {
  storySlug: string;
  status: "pending" | "approved" | "rejected";
};

type PublicCommentRow = {
  id: number;
  commenter_name: string;
  body: string;
  staff_reply: string;
  created_at: string;
};

type DashboardCommentRow = PublicCommentRow & {
  story_slug: string;
  status: "pending" | "approved" | "rejected";
};

export async function getPublicStoryEngagement(
  storySlug: string,
): Promise<StoryEngagement> {
  const supabase = createSupabasePublicClient();
  const [countResult, commentsResult] = await Promise.all([
    supabase
      .from("story_reaction_counts")
      .select("reaction_count")
      .eq("story_slug", storySlug)
      .maybeSingle(),
    supabase
      .from("story_comments")
      .select("id,commenter_name,body,staff_reply,created_at")
      .eq("story_slug", storySlug)
      .eq("status", "approved")
      .order("created_at", { ascending: false }),
  ]);

  if (countResult.error) throw countResult.error;
  if (commentsResult.error) throw commentsResult.error;

  return {
    reactionCount: Number(countResult.data?.reaction_count ?? 0),
    comments: ((commentsResult.data ?? []) as PublicCommentRow[]).map(
      mapPublicComment,
    ),
  };
}

export async function submitStoryReaction(
  storySlug: string,
  voterToken: string,
) {
  const supabase = createSupabasePublicClient();
  const { error } = await supabase.from("story_reactions").insert({
    story_slug: storySlug,
    voter_token: voterToken,
  });

  if (error && error.code !== "23505") throw error;

  const { data, error: countError } = await supabase
    .from("story_reaction_counts")
    .select("reaction_count")
    .eq("story_slug", storySlug)
    .maybeSingle();
  if (countError) throw countError;

  return {
    reactionCount: Number(data?.reaction_count ?? 0),
    alreadyReacted: error?.code === "23505",
  };
}

export async function submitStoryComment(
  storySlug: string,
  input: { name: string; body: string },
) {
  const supabase = createSupabasePublicClient();
  const { error } = await supabase.from("story_comments").insert({
    story_slug: storySlug,
    commenter_name: input.name,
    body: input.body,
  });
  if (error) throw error;
}

export async function getDashboardStoryComments(): Promise<
  DashboardStoryComment[]
> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("story_comments")
    .select("id,story_slug,commenter_name,body,staff_reply,status,created_at")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return ((data ?? []) as DashboardCommentRow[]).map(mapDashboardComment);
}

export async function moderateStoryComment(
  id: number,
  input: {
    status: DashboardStoryComment["status"];
    staffReply: string;
    moderatedBy: string;
  },
) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("story_comments")
    .update({
      status: input.status,
      staff_reply: input.staffReply,
      moderated_at: new Date().toISOString(),
      moderated_by: input.moderatedBy,
    })
    .eq("id", id)
    .select("id,story_slug,commenter_name,body,staff_reply,status,created_at")
    .single();
  if (error) throw error;
  return mapDashboardComment(data as DashboardCommentRow);
}

export async function deleteStoryComment(id: number) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("story_comments").delete().eq("id", id);
  if (error) throw error;
}

function mapPublicComment(row: PublicCommentRow): PublicStoryComment {
  return {
    id: row.id,
    name: row.commenter_name,
    body: row.body,
    staffReply: row.staff_reply,
    createdAt: row.created_at,
  };
}

function mapDashboardComment(row: DashboardCommentRow): DashboardStoryComment {
  return {
    ...mapPublicComment(row),
    storySlug: row.story_slug,
    status: row.status,
  };
}
