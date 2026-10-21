"use client";

import {
  CheckCircle2,
  MessageSquareText,
  Send,
  ThumbsUp,
} from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import type { PublicStoryComment, StoryEngagement as StoryEngagementData } from "@/db/story-engagement";

export function StoryEngagement({ storySlug }: { storySlug: string }) {
  const [engagement, setEngagement] = useState<StoryEngagementData | null>(null);
  const [reacted, setReacted] = useState(false);
  const [reactionBusy, setReactionBusy] = useState(false);
  const [commentBusy, setCommentBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [startedAt, setStartedAt] = useState(() => Date.now());

  useEffect(() => {
    let active = true;
    setReacted(window.localStorage.getItem(`slna-story-reaction:${storySlug}`) === "1");
    fetch(`/api/stories/${storySlug}/engagement`, { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unavailable");
        return (await response.json()) as StoryEngagementData;
      })
      .then((data) => {
        if (active) setEngagement(data);
      })
      .catch(() => {
        // The story remains fully available before the engagement migration runs.
      });
    return () => {
      active = false;
    };
  }, [storySlug]);

  async function react() {
    if (reactionBusy || reacted) return;
    setReactionBusy(true);
    setNotice("");
    try {
      const response = await fetch(`/api/stories/${storySlug}/engagement`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ kind: "reaction" }),
      });
      const result = (await response.json()) as {
        reactionCount?: number;
        error?: string;
      };
      if (!response.ok) throw new Error(result.error || "Your reaction could not be saved.");
      setEngagement((current) => ({
        reactionCount: result.reactionCount ?? current?.reactionCount ?? 0,
        comments: current?.comments ?? [],
      }));
      setReacted(true);
      window.localStorage.setItem(`slna-story-reaction:${storySlug}`, "1");
      setNotice("Thank you for celebrating this story.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Your reaction could not be saved.");
    } finally {
      setReactionBusy(false);
    }
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCommentBusy(true);
    setNotice("");
    const form = event.currentTarget;
    const values = new FormData(form);
    try {
      const response = await fetch(`/api/stories/${storySlug}/engagement`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          kind: "comment",
          name: values.get("name"),
          comment: values.get("comment"),
          website: values.get("website"),
          startedAt,
        }),
      });
      const result = (await response.json()) as { message?: string; error?: string };
      if (!response.ok) throw new Error(result.error || "Your comment could not be submitted.");
      form.reset();
      setStartedAt(Date.now());
      setNotice(result.message || "Thank you. Your comment is awaiting review.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Your comment could not be submitted.");
    } finally {
      setCommentBusy(false);
    }
  }

  if (!engagement) return null;

  return (
    <section className="border-t border-school-navy/10 bg-school-cream py-20 sm:py-24" aria-labelledby="story-conversation-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-school-red">
              Join the conversation
            </p>
            <h2 id="story-conversation-title" className="mt-4 font-serif text-4xl tracking-[-0.04em] text-school-ink sm:text-5xl">
              What did this story inspire?
            </h2>
            <p className="mt-5 text-sm leading-7 text-school-muted">
              Celebrate the story or leave a respectful message. Comments are reviewed by the school before publication.
            </p>
            <button
              type="button"
              onClick={() => void react()}
              disabled={reactionBusy || reacted}
              className={`mt-8 inline-flex min-h-13 items-center gap-3 px-6 text-[0.68rem] font-bold uppercase tracking-[0.13em] transition-colors ${reacted ? "bg-[#e6f4ee] text-[#176b4c]" : "bg-school-navy text-white hover:bg-school-red"}`}
            >
              {reacted ? <CheckCircle2 aria-hidden="true" className="size-4" /> : <ThumbsUp aria-hidden="true" className="size-4" />}
              {reacted ? "Inspired" : "This inspired me"}
              <span className="border-l border-current/20 pl-3">{engagement.reactionCount}</span>
            </button>

            <form onSubmit={submitComment} className="mt-10 space-y-4">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor={`website-${storySlug}`}>Website</label>
                <input id={`website-${storySlug}`} name="website" tabIndex={-1} autoComplete="off" />
              </div>
              <label className="block">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-school-navy">Your name</span>
                <input name="name" required minLength={2} maxLength={80} className="mt-2 min-h-12 w-full border border-school-navy/15 bg-white px-4 text-sm outline-none focus:border-school-red" />
              </label>
              <label className="block">
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-school-navy">Comment</span>
                <textarea name="comment" required minLength={10} maxLength={1500} rows={5} className="mt-2 w-full resize-y border border-school-navy/15 bg-white px-4 py-3 text-sm leading-6 outline-none focus:border-school-red" />
              </label>
              <button disabled={commentBusy} className="inline-flex min-h-12 items-center justify-center gap-3 bg-school-red px-6 text-[0.66rem] font-bold uppercase tracking-[0.13em] text-white hover:bg-school-red-dark disabled:cursor-wait disabled:opacity-65">
                <Send aria-hidden="true" className="size-4" />
                {commentBusy ? "Submitting…" : "Submit for review"}
              </button>
            </form>

            {notice ? <p role="status" className="mt-5 border-l-2 border-school-gold pl-4 text-sm leading-6 text-school-muted">{notice}</p> : null}
          </div>

          <div>
            <div className="flex items-center justify-between border-b border-school-navy/15 pb-5">
              <h3 className="font-serif text-3xl text-school-ink">Community comments</h3>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-muted">
                <MessageSquareText aria-hidden="true" className="size-4" />
                {engagement.comments.length}
              </span>
            </div>
            {engagement.comments.length ? (
              <div className="divide-y divide-school-navy/10">
                {engagement.comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)}
              </div>
            ) : (
              <p className="py-10 text-sm leading-7 text-school-muted">No published comments yet. You can be the first to leave a thoughtful message.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CommentCard({ comment }: { comment: PublicStoryComment }) {
  return (
    <article className="py-7">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h4 className="font-semibold text-school-ink">{comment.name}</h4>
        <time className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-school-muted" dateTime={comment.createdAt}>
          {formatCommentDate(comment.createdAt)}
        </time>
      </div>
      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-school-muted">{comment.body}</p>
      {comment.staffReply ? (
        <div className="mt-5 border-l-2 border-school-gold bg-white p-4">
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-school-red">SLNA reply</p>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-school-muted">{comment.staffReply}</p>
        </div>
      ) : null}
    </article>
  );
}

function formatCommentDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}
