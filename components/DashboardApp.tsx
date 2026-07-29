"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FilePlus2,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Send,
  Settings,
  UsersRound,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import type {
  DashboardSnapshot,
  DashboardStory,
  Enquiry,
} from "@/db/dashboard";

type DashboardSection = "overview" | "stories" | "enquiries";

type DashboardAppProps = {
  displayName: string;
  email: string;
  signOutHref: string;
  initialSnapshot: DashboardSnapshot;
  initialError?: string;
};

const navigation = [
  { id: "overview", label: "Overview", Icon: LayoutDashboard },
  { id: "stories", label: "Stories", Icon: BookOpenText },
  { id: "enquiries", label: "Enquiries", Icon: Inbox },
] as const;

const enquiryStatuses = [
  { value: "new", label: "New" },
  { value: "in_progress", label: "Following up" },
  { value: "closed", label: "Closed" },
] as const;

export function DashboardApp({
  displayName,
  email,
  signOutHref,
  initialSnapshot,
  initialError,
}: DashboardAppProps) {
  const [section, setSection] = useState<DashboardSection>("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stories, setStories] = useState(initialSnapshot.stories);
  const [enquiries, setEnquiries] = useState(initialSnapshot.enquiries);
  const [notice, setNotice] = useState(initialError ?? "");

  const newEnquiries = enquiries.filter(
    (enquiry) => enquiry.status === "new",
  ).length;
  const followUps = enquiries.filter(
    (enquiry) => enquiry.status === "in_progress",
  ).length;
  const publishedStories = stories.filter(
    (story) => story.status === "published",
  ).length;

  const sectionLabel =
    navigation.find((item) => item.id === section)?.label ?? "Overview";

  return (
    <div className="min-h-screen bg-[#f2f4f7] text-school-ink lg:grid lg:grid-cols-[278px_minmax(0,1fr)]">
      <aside className="hidden min-h-screen flex-col bg-school-navy text-white lg:sticky lg:top-0 lg:flex lg:h-screen">
        <div className="border-b border-white/10 px-7 py-7">
          <Link
            href="/"
            className="flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
          >
            <Image
              src="/images/school-logo.png"
              alt=""
              width={58}
              height={58}
              unoptimized
              className="size-[58px] object-contain"
            />
            <span>
              <span className="block text-[0.62rem] font-bold uppercase tracking-[0.17em] text-school-gold">
                SLNA
              </span>
              <span className="mt-1 block font-serif text-xl">School Desk</span>
            </span>
          </Link>
        </div>

        <nav aria-label="Dashboard navigation" className="flex-1 px-4 py-7">
          <p className="px-3 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white/38">
            Workspace
          </p>
          <div className="mt-4 space-y-2">
            {navigation.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSection(id)}
                className={`flex min-h-12 w-full items-center gap-3 px-4 text-left text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold ${
                  section === id
                    ? "bg-white text-school-navy"
                    : "text-white/68 hover:bg-white/8 hover:text-white"
                }`}
              >
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
                {label}
                {id === "enquiries" && newEnquiries > 0 ? (
                  <span className="ml-auto flex min-w-6 items-center justify-center rounded-full bg-school-red px-1.5 py-1 text-[0.62rem] font-bold text-white">
                    {newEnquiries}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </nav>

        <div className="border-t border-white/10 p-5">
          <div className="flex items-center gap-3 px-2 py-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-school-gold font-bold text-school-navy">
              {initials(displayName)}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{displayName}</p>
              <p className="truncate text-xs text-white/45">{email}</p>
            </div>
          </div>
          <a
            href={signOutHref}
            className="mt-2 flex min-h-11 items-center gap-3 px-3 text-xs font-bold uppercase tracking-[0.12em] text-white/58 transition-colors hover:text-school-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-school-gold"
          >
            <LogOut aria-hidden="true" className="size-4" />
            Sign out
          </a>
        </div>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-40 border-b border-school-navy/10 bg-white/94 backdrop-blur-md">
          <div className="flex min-h-[78px] items-center justify-between gap-4 px-4 sm:px-7 lg:px-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                aria-expanded={mobileMenuOpen}
                aria-controls="dashboard-mobile-navigation"
                className="flex size-11 items-center justify-center border border-school-navy/15 text-school-navy lg:hidden"
              >
                {mobileMenuOpen ? (
                  <X aria-hidden="true" className="size-5" />
                ) : (
                  <Menu aria-hidden="true" className="size-5" />
                )}
                <span className="sr-only">Dashboard menu</span>
              </button>
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.17em] text-school-red">
                  School dashboard
                </p>
                <h1 className="mt-1 font-serif text-2xl text-school-ink">
                  {sectionLabel}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="hidden min-h-11 items-center gap-2 border border-school-navy/15 px-4 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-school-navy transition-colors hover:bg-school-navy hover:text-white sm:inline-flex"
              >
                View website
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
              <div className="flex size-10 items-center justify-center rounded-full bg-school-navy text-xs font-bold text-white lg:hidden">
                {initials(displayName)}
              </div>
            </div>
          </div>

          {mobileMenuOpen ? (
            <nav
              id="dashboard-mobile-navigation"
              aria-label="Dashboard mobile navigation"
              className="border-t border-school-navy/10 bg-white px-4 py-3 lg:hidden"
            >
              <div className="grid grid-cols-3 gap-2">
                {navigation.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setSection(id);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex min-h-16 flex-col items-center justify-center gap-2 px-2 text-[0.64rem] font-bold uppercase tracking-[0.08em] ${
                      section === id
                        ? "bg-school-navy text-white"
                        : "bg-school-cream text-school-navy"
                    }`}
                  >
                    <Icon aria-hidden="true" className="size-5" />
                    {label}
                  </button>
                ))}
              </div>
            </nav>
          ) : null}
        </header>

        <main className="px-4 py-7 sm:px-7 sm:py-9 lg:px-10 lg:py-10">
          {notice ? (
            <div
              role="status"
              className="mb-7 flex items-start justify-between gap-5 border-l-4 border-school-red bg-white p-5 text-sm text-school-muted shadow-sm"
            >
              <span className="flex gap-3">
                <CircleAlert
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-school-red"
                />
                {notice}
              </span>
              <button
                type="button"
                onClick={() => setNotice("")}
                className="text-school-muted hover:text-school-red"
                aria-label="Dismiss notification"
              >
                <X aria-hidden="true" className="size-4" />
              </button>
            </div>
          ) : null}

          {section === "overview" ? (
            <OverviewPanel
              displayName={displayName}
              stories={stories}
              enquiries={enquiries}
              publishedStories={publishedStories}
              newEnquiries={newEnquiries}
              followUps={followUps}
              onNavigate={setSection}
            />
          ) : null}

          {section === "stories" ? (
            <StoriesPanel
              stories={stories}
              onStoriesChange={setStories}
              onNotice={setNotice}
            />
          ) : null}

          {section === "enquiries" ? (
            <EnquiriesPanel
              enquiries={enquiries}
              onEnquiriesChange={setEnquiries}
              onNotice={setNotice}
            />
          ) : null}
        </main>
      </div>
    </div>
  );
}

function OverviewPanel({
  displayName,
  stories,
  enquiries,
  publishedStories,
  newEnquiries,
  followUps,
  onNavigate,
}: {
  displayName: string;
  stories: DashboardStory[];
  enquiries: Enquiry[];
  publishedStories: number;
  newEnquiries: number;
  followUps: number;
  onNavigate: (section: DashboardSection) => void;
}) {
  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red">
            Welcome back
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] text-school-ink sm:text-5xl">
            {firstName(displayName)}, here’s today’s picture.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-school-muted">
            Keep school stories current and make sure every prospective family
            receives a timely response.
          </p>
        </div>
        <button
          type="button"
          onClick={() => onNavigate("stories")}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-school-red px-5 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-school-red-dark"
        >
          <FilePlus2 aria-hidden="true" className="size-4" />
          Create a story
        </button>
      </div>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Published stories"
          value={publishedStories}
          note={`${stories.length} total drafts and stories`}
          Icon={BookOpenText}
          tone="navy"
        />
        <MetricCard
          label="New enquiries"
          value={newEnquiries}
          note="Awaiting a first response"
          Icon={Inbox}
          tone="red"
        />
        <MetricCard
          label="Follow-ups"
          value={followUps}
          note="Families currently in progress"
          Icon={Clock3}
          tone="gold"
        />
        <MetricCard
          label="Completed"
          value={enquiries.filter((item) => item.status === "closed").length}
          note="Enquiries closed by the team"
          Icon={CheckCircle2}
          tone="green"
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(300px,0.7fr)]">
        <section className="border border-school-navy/10 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-school-navy/10 px-5 py-5 sm:px-7">
            <div>
              <h3 className="font-serif text-2xl">Recent enquiries</h3>
              <p className="mt-1 text-xs text-school-muted">
                The latest messages from prospective families
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigate("enquiries")}
              className="text-[0.64rem] font-bold uppercase tracking-[0.12em] text-school-red"
            >
              View all
            </button>
          </div>
          {recentEnquiries.length > 0 ? (
            <div className="divide-y divide-school-navy/8">
              {recentEnquiries.map((enquiry) => (
                <div
                  key={enquiry.id}
                  className="grid gap-3 px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:px-7"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-school-ink">
                      {enquiry.parentName}
                    </p>
                    <p className="mt-1 truncate text-sm text-school-muted">
                      {enquiry.yearGroup} · {enquiry.message}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge status={enquiry.status} />
                    <span className="text-xs text-school-muted">
                      {formatDate(enquiry.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              Icon={Inbox}
              title="No enquiries yet"
              description="New admissions enquiries will appear here automatically."
            />
          )}
        </section>

        <section className="relative overflow-hidden bg-school-navy p-7 text-white shadow-sm sm:p-8">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 size-56 rounded-full border border-white/10"
          />
          <Settings
            aria-hidden="true"
            className="size-8 text-school-gold"
            strokeWidth={1.4}
          />
          <h3 className="mt-8 font-serif text-3xl">A focused first release.</h3>
          <p className="mt-4 text-sm leading-7 text-white/65">
            This workspace begins with the two jobs the school needs most:
            publishing stories and responding to families.
          </p>
          <div className="mt-8 border-t border-white/12 pt-6">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-school-gold">
              Secure access
            </p>
            <p className="mt-2 text-xs leading-6 text-white/55">
              School-domain accounts and explicitly approved administrators
              only.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

function StoriesPanel({
  stories,
  onStoriesChange,
  onNotice,
}: {
  stories: DashboardStory[];
  onStoriesChange: (stories: DashboardStory[]) => void;
  onNotice: (message: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [saving, setSaving] = useState(false);
  const filteredStories = useMemo(() => {
    const query = search.trim().toLowerCase();
    return query
      ? stories.filter(
          (story) =>
            story.title.toLowerCase().includes(query) ||
            story.category.toLowerCase().includes(query),
        )
      : stories;
  }, [search, stories]);

  async function refreshStories() {
    const response = await fetch("/api/dashboard/stories");
    const result = (await response.json()) as {
      stories?: DashboardStory[];
      error?: string;
    };
    if (!response.ok || !result.stories) {
      throw new Error(result.error || "Stories could not be refreshed.");
    }
    onStoriesChange(result.stories);
  }

  async function createNewStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    setSaving(true);

    try {
      const response = await fetch("/api/dashboard/stories", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "The story could not be saved.");
      }
      await refreshStories();
      form.reset();
      setShowForm(false);
      onNotice("The new story has been saved.");
    } catch (error) {
      onNotice(
        error instanceof Error ? error.message : "The story could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function changeStatus(
    story: DashboardStory,
    status: "draft" | "published",
  ) {
    try {
      const response = await fetch(`/api/dashboard/stories/${story.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "The status could not be changed.");
      }
      onStoriesChange(
        stories.map((item) =>
          item.id === story.id
            ? { ...item, status, updatedAt: new Date().toISOString() }
            : item,
        ),
      );
      onNotice(
        status === "published"
          ? "The story is now published."
          : "The story has returned to draft.",
      );
    } catch (error) {
      onNotice(
        error instanceof Error
          ? error.message
          : "The status could not be changed.",
      );
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red">
            Content
          </p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] sm:text-5xl">
            School stories
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-school-muted">
            Prepare, review and publish stories that bring school life to the
            public website.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm((open) => !open)}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-school-red px-5 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-white transition-colors hover:bg-school-red-dark"
        >
          {showForm ? (
            <X aria-hidden="true" className="size-4" />
          ) : (
            <FilePlus2 aria-hidden="true" className="size-4" />
          )}
          {showForm ? "Close editor" : "Create a story"}
        </button>
      </div>

      {showForm ? (
        <StoryCreateForm onSubmit={createNewStory} saving={saving} />
      ) : null}

      <section className="mt-8 border border-school-navy/10 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-school-navy/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <div>
            <h3 className="font-serif text-2xl">All stories</h3>
            <p className="mt-1 text-xs text-school-muted">
              {stories.length} stories in this workspace
            </p>
          </div>
          <label className="relative block sm:w-72">
            <span className="sr-only">Search stories</span>
            <Search
              aria-hidden="true"
              className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-school-muted"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search stories"
              className="min-h-11 w-full border border-school-navy/15 bg-school-cream pl-11 pr-4 text-sm outline-none focus:border-school-red"
            />
          </label>
        </div>

        {filteredStories.length > 0 ? (
          <div className="divide-y divide-school-navy/8">
            {filteredStories.map((story) => (
              <article
                key={story.id}
                className="grid gap-5 p-5 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center sm:px-7"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-school-stone">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    unoptimized
                    sizes="110px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={story.status} />
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.13em] text-school-red">
                      {story.category}
                    </span>
                  </div>
                  <h3 className="mt-3 truncate font-serif text-2xl">
                    {story.title}
                  </h3>
                  <p className="mt-2 text-xs text-school-muted">
                    Updated {formatDate(story.updatedAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col sm:items-stretch">
                  <button
                    type="button"
                    onClick={() =>
                      changeStatus(
                        story,
                        story.status === "published" ? "draft" : "published",
                      )
                    }
                    className="min-h-10 border border-school-navy/15 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-navy hover:bg-school-navy hover:text-white"
                  >
                    {story.status === "published" ? "Move to draft" : "Publish"}
                  </button>
                  <Link
                    href={story.href}
                    target="_blank"
                    className="inline-flex min-h-10 items-center justify-center gap-2 border border-school-navy/15 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-navy hover:bg-school-cream"
                  >
                    Preview
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            Icon={BookOpenText}
            title="No matching stories"
            description="Try a different title or category."
          />
        )}
      </section>
    </div>
  );
}

function StoryCreateForm({
  onSubmit,
  saving,
}: {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  saving: boolean;
}) {
  const inputClass =
    "min-h-11 w-full border border-school-navy/15 bg-white px-4 py-3 text-sm outline-none focus:border-school-red focus:ring-1 focus:ring-school-red";

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 border-t-4 border-school-gold bg-school-navy p-6 text-white shadow-sm sm:p-8"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-school-gold">
            Story editor
          </p>
          <h3 className="mt-3 font-serif text-3xl">Create a new story</h3>
        </div>
        <FilePlus2
          aria-hidden="true"
          className="size-8 text-school-gold"
          strokeWidth={1.4}
        />
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <DashboardField label="Title">
          <input
            className={inputClass}
            name="title"
            required
            onBlur={(event) => {
              const form = event.currentTarget.form;
              const slugInput = form?.elements.namedItem(
                "slug",
              ) as HTMLInputElement | null;
              if (slugInput && !slugInput.value) {
                slugInput.value = slugify(event.currentTarget.value);
              }
            }}
          />
        </DashboardField>
        <DashboardField label="Web address">
          <input
            className={inputClass}
            name="slug"
            placeholder="example-story-title"
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            required
          />
        </DashboardField>
        <DashboardField label="Category">
          <input
            className={inputClass}
            name="category"
            placeholder="School Life"
            required
          />
        </DashboardField>
        <DashboardField label="Read time">
          <input
            className={inputClass}
            name="readTime"
            defaultValue="4 minute read"
          />
        </DashboardField>
        <DashboardField label="Hero image path">
          <input
            className={inputClass}
            name="image"
            defaultValue="/images/school/campus-assembly.webp"
            required
          />
        </DashboardField>
        <DashboardField label="Image description">
          <input
            className={inputClass}
            name="alt"
            placeholder="Describe the photograph"
            required
          />
        </DashboardField>
      </div>

      <div className="mt-5 grid gap-5">
        <DashboardField label="Story introduction">
          <textarea
            className={`${inputClass} min-h-28 resize-y`}
            name="excerpt"
            required
          />
        </DashboardField>
        <DashboardField label="Pull quote">
          <textarea
            className={`${inputClass} min-h-24 resize-y`}
            name="quote"
          />
        </DashboardField>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 text-sm text-white/72">
          <input
            type="checkbox"
            name="status"
            value="published"
            className="size-4 accent-school-gold"
          />
          Publish immediately
        </label>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex min-h-12 items-center justify-center gap-3 bg-school-red px-6 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-white hover:bg-school-red-dark disabled:cursor-wait disabled:opacity-60"
        >
          <Send aria-hidden="true" className="size-4" />
          {saving ? "Saving…" : "Save story"}
        </button>
      </div>
    </form>
  );
}

function EnquiriesPanel({
  enquiries,
  onEnquiriesChange,
  onNotice,
}: {
  enquiries: Enquiry[];
  onEnquiriesChange: (enquiries: Enquiry[]) => void;
  onNotice: (message: string) => void;
}) {
  const [filter, setFilter] = useState<"all" | Enquiry["status"]>("all");
  const visibleEnquiries =
    filter === "all"
      ? enquiries
      : enquiries.filter((enquiry) => enquiry.status === filter);

  async function changeStatus(enquiry: Enquiry, status: Enquiry["status"]) {
    try {
      const response = await fetch(`/api/dashboard/enquiries/${enquiry.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "The enquiry could not be updated.");
      }
      onEnquiriesChange(
        enquiries.map((item) =>
          item.id === enquiry.id
            ? { ...item, status, updatedAt: new Date().toISOString() }
            : item,
        ),
      );
      onNotice("The enquiry status has been updated.");
    } catch (error) {
      onNotice(
        error instanceof Error
          ? error.message
          : "The enquiry could not be updated.",
      );
    }
  }

  return (
    <div>
      <div>
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red">
          Admissions
        </p>
        <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] sm:text-5xl">
          Family enquiries
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-school-muted">
          Review each message, record the team’s progress and keep prospective
          families moving forward.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {[
          { value: "all", label: "All" },
          ...enquiryStatuses,
        ].map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() =>
              setFilter(option.value as "all" | Enquiry["status"])
            }
            className={`min-h-10 px-4 text-[0.64rem] font-bold uppercase tracking-[0.1em] ${
              filter === option.value
                ? "bg-school-navy text-white"
                : "border border-school-navy/15 bg-white text-school-navy"
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <section className="mt-6 overflow-hidden border border-school-navy/10 bg-white shadow-sm">
        {visibleEnquiries.length > 0 ? (
          <div className="divide-y divide-school-navy/8">
            {visibleEnquiries.map((enquiry) => (
              <article key={enquiry.id} className="p-5 sm:p-7">
                <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_220px]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <StatusBadge status={enquiry.status} />
                      <span className="text-xs text-school-muted">
                        Received {formatDate(enquiry.createdAt)}
                      </span>
                    </div>
                    <h3 className="mt-4 font-serif text-2xl">
                      {enquiry.parentName}
                    </h3>
                    <p className="mt-1 text-sm text-school-muted">
                      Child age {enquiry.childAge} · {enquiry.yearGroup}
                    </p>
                    <p className="mt-5 max-w-3xl text-sm leading-7 text-school-ink">
                      {enquiry.message}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                      <a
                        href={`mailto:${enquiry.email}`}
                        className="font-semibold text-school-red hover:underline"
                      >
                        {enquiry.email}
                      </a>
                      <a
                        href={`tel:${enquiry.phone.replace(/\s+/g, "")}`}
                        className="font-semibold text-school-navy hover:underline"
                      >
                        {enquiry.phone}
                      </a>
                    </div>
                  </div>
                  <div className="border-t border-school-navy/10 pt-5 xl:border-l xl:border-t-0 xl:pl-6 xl:pt-0">
                    <label className="grid gap-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-school-muted">
                      Response status
                      <select
                        value={enquiry.status}
                        onChange={(event) =>
                          changeStatus(
                            enquiry,
                            event.target.value as Enquiry["status"],
                          )
                        }
                        className="min-h-11 border border-school-navy/15 bg-school-cream px-3 text-sm font-semibold normal-case tracking-normal text-school-navy outline-none focus:border-school-red"
                      >
                        {enquiryStatuses.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <p className="mt-4 text-xs leading-6 text-school-muted">
                      Update this after contacting the family so the team always
                      sees the latest position.
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState
            Icon={UsersRound}
            title="No enquiries in this view"
            description="Choose another status or wait for a new family enquiry."
          />
        )}
      </section>
    </div>
  );
}

function MetricCard({
  label,
  value,
  note,
  Icon,
  tone,
}: {
  label: string;
  value: number;
  note: string;
  Icon: typeof Inbox;
  tone: "navy" | "red" | "gold" | "green";
}) {
  const tones = {
    navy: "bg-school-navy text-white",
    red: "bg-school-red text-white",
    gold: "bg-school-gold text-school-navy",
    green: "bg-[#1d7a59] text-white",
  };

  return (
    <article className="border border-school-navy/10 bg-white p-6 shadow-sm">
      <div
        className={`flex size-11 items-center justify-center ${tones[tone]}`}
      >
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.6} />
      </div>
      <p className="mt-7 text-[0.62rem] font-bold uppercase tracking-[0.14em] text-school-muted">
        {label}
      </p>
      <p className="mt-2 font-serif text-5xl tracking-[-0.05em]">{value}</p>
      <p className="mt-3 text-xs leading-5 text-school-muted">{note}</p>
    </article>
  );
}

function StatusBadge({
  status,
}: {
  status: DashboardStory["status"] | Enquiry["status"];
}) {
  const styles = {
    published: "bg-[#e6f4ee] text-[#176b4c]",
    draft: "bg-school-stone text-school-muted",
    new: "bg-[#fff0f0] text-school-red",
    in_progress: "bg-[#fff7d1] text-[#7a5a00]",
    closed: "bg-[#e6f4ee] text-[#176b4c]",
  };
  const labels = {
    published: "Published",
    draft: "Draft",
    new: "New",
    in_progress: "Following up",
    closed: "Closed",
  };

  return (
    <span
      className={`inline-flex min-h-7 items-center px-2.5 text-[0.58rem] font-bold uppercase tracking-[0.1em] ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

function EmptyState({
  Icon,
  title,
  description,
}: {
  Icon: typeof Inbox;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-school-cream text-school-red">
        <Icon aria-hidden="true" className="size-6" strokeWidth={1.5} />
      </div>
      <h3 className="mt-5 font-serif text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-school-muted">
        {description}
      </p>
    </div>
  );
}

function DashboardField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-white/62">
      {label}
      {children}
    </label>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function firstName(name: string) {
  return name.trim().split(/\s+/)[0] || "team";
}

function formatDate(value: string) {
  const date = new Date(value.includes("T") ? value : `${value.replace(" ", "T")}Z`);
  return new Intl.DateTimeFormat("en-KE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
