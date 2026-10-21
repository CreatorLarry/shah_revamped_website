import { NextResponse } from "next/server";
import {
  getPublicStoryEngagement,
  submitStoryComment,
  submitStoryReaction,
} from "@/db/story-engagement";

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const reactionWindows = new Map<string, number[]>();
const commentWindows = new Map<string, number[]>();

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "Invalid story." }, { status: 400 });
  }

  try {
    const engagement = await getPublicStoryEngagement(slug);
    return NextResponse.json(engagement, {
      headers: { "cache-control": "no-store" },
    });
  } catch {
    return NextResponse.json(
      { error: "Story engagement is not available yet." },
      { status: 503 },
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  if (!SLUG_PATTERN.test(slug)) {
    return NextResponse.json({ error: "Invalid story." }, { status: 400 });
  }

  try {
    const payload = (await request.json()) as Record<string, unknown>;
    const kind = payload.kind;
    const clientKey = getClientKey(request);

    if (kind === "reaction") {
      if (!allowRequest(reactionWindows, clientKey, 12, 10 * 60_000)) {
        return NextResponse.json(
          { error: "Please wait before reacting again." },
          { status: 429 },
        );
      }

      const cookieToken = readCookie(request.headers.get("cookie"), "slna_story_voter");
      const voterToken = UUID_PATTERN.test(cookieToken) ? cookieToken : crypto.randomUUID();
      const result = await submitStoryReaction(slug, voterToken);
      const response = NextResponse.json(result, { status: 201 });
      response.cookies.set("slna_story_voter", voterToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
      });
      return response;
    }

    if (kind === "comment") {
      if (clean(payload.website, 120)) {
        return NextResponse.json({ ok: true }, { status: 201 });
      }
      if (!allowRequest(commentWindows, clientKey, 3, 10 * 60_000)) {
        return NextResponse.json(
          { error: "Please wait before submitting another comment." },
          { status: 429 },
        );
      }

      const startedAt = Number(payload.startedAt);
      const name = clean(payload.name, 80);
      const body = clean(payload.comment, 1500);
      if (
        !Number.isFinite(startedAt) ||
        Date.now() - startedAt < 1200 ||
        name.length < 2 ||
        body.length < 10
      ) {
        return NextResponse.json(
          { error: "Please enter your name and a thoughtful comment." },
          { status: 400 },
        );
      }

      await submitStoryComment(slug, { name, body });
      return NextResponse.json(
        { ok: true, message: "Thank you. Your comment is awaiting review." },
        { status: 201 },
      );
    }

    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  } catch {
    return NextResponse.json(
      { error: "We could not save this submission. Please try again." },
      { status: 500 },
    );
  }
}

function clean(value: unknown, maxLength: number) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";
}

function getClientKey(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function allowRequest(
  windows: Map<string, number[]>,
  key: string,
  maximum: number,
  duration: number,
) {
  const now = Date.now();
  const recent = (windows.get(key) ?? []).filter((time) => now - time < duration);
  if (recent.length >= maximum) return false;
  recent.push(now);
  windows.set(key, recent);
  if (windows.size > 1000) windows.clear();
  return true;
}

function readCookie(header: string | null, name: string) {
  if (!header) return "";
  for (const part of header.split(";")) {
    const [key, ...value] = part.trim().split("=");
    if (key === name) return decodeURIComponent(value.join("="));
  }
  return "";
}
