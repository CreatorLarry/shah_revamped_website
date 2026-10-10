"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  CheckCircle2,
  CircleAlert,
  Clock3,
  FilePlus2,
  Inbox,
  Images,
  LayoutDashboard,
  LogOut,
  Menu,
  Search,
  Send,
  Settings,
  Pencil,
  Plus,
  Trash2,
  Upload,
  UsersRound,
  X,
} from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
import {
  ManagedImage as Image,
  refreshManagedImageRegistry,
} from "@/components/ManagedImage";
import type {
  DashboardSnapshot,
  DashboardEvent,
  DashboardStory,
  Enquiry,
  LeadershipProfile,
  SiteImage,
} from "@/db/dashboard";

type DashboardSection =
  | "overview"
  | "stories"
  | "events"
  | "media"
  | "leadership"
  | "enquiries";

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
  { id: "events", label: "Events", Icon: CalendarDays },
  { id: "media", label: "Media", Icon: Images },
  { id: "leadership", label: "Leadership", Icon: UsersRound },
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
  const [events, setEvents] = useState(initialSnapshot.events);
  const [enquiries, setEnquiries] = useState(initialSnapshot.enquiries);
  const [media, setMedia] = useState<SiteImage[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [leadership, setLeadership] = useState<LeadershipProfile[]>([]);
  const [leadershipLoaded, setLeadershipLoaded] = useState(false);
  const [leadershipLoading, setLeadershipLoading] = useState(false);
  const [notice, setNotice] = useState(initialError ?? "");

  async function openSection(nextSection: DashboardSection) {
    setSection(nextSection);
    setMobileMenuOpen(false);
    if (nextSection === "media" && !mediaLoading) {
      setMediaLoading(true);
      try {
        const response = await fetch("/api/dashboard/media");
        const result = (await response.json()) as {
          images?: SiteImage[];
          error?: string;
        };
        if (!response.ok) {
          throw new Error(result.error || "The Media Library could not be loaded.");
        }
        setMedia(result.images ?? []);
      } catch (error) {
        setNotice(
          error instanceof Error
            ? error.message
            : "The Media Library could not be loaded.",
        );
      } finally {
        setMediaLoading(false);
      }
    }

    if (
      nextSection === "leadership" &&
      !leadershipLoaded &&
      !leadershipLoading
    ) {
      setLeadershipLoading(true);
      try {
        const response = await fetch("/api/dashboard/leadership");
        const result = (await response.json()) as {
          profiles?: LeadershipProfile[];
          error?: string;
        };
        if (!response.ok) {
          throw new Error(result.error || "Leadership profiles could not be loaded.");
        }
        setLeadership(result.profiles ?? []);
        setLeadershipLoaded(true);
      } catch (error) {
        setNotice(
          error instanceof Error
            ? error.message
            : "Leadership profiles could not be loaded.",
        );
      } finally {
        setLeadershipLoading(false);
      }
    }
  }

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
              imageKey="dashboard.sidebar.logo"
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
                onClick={() => void openSection(id)}
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
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                {navigation.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => void openSection(id)}
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
              role={isErrorNotice(notice) ? "alert" : "status"}
              className={`fixed bottom-5 left-5 right-5 z-[70] flex max-w-md items-start justify-between gap-5 border-l-4 bg-white p-5 text-sm text-school-ink shadow-[0_18px_55px_rgba(6,47,95,0.2)] sm:left-auto ${isErrorNotice(notice) ? "border-school-red" : "border-emerald-600"}`}
            >
              <span className="flex gap-3">
                {isErrorNotice(notice) ? (
                  <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-school-red" />
                ) : (
                  <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-emerald-600" />
                )}
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
              onNavigate={(nextSection) => void openSection(nextSection)}
            />
          ) : null}

          {section === "stories" ? (
            <StoriesPanel
              stories={stories}
              onStoriesChange={setStories}
              onNotice={setNotice}
            />
          ) : null}

          {section === "events" ? (
            <EventsPanel
              events={events}
              onEventsChange={setEvents}
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

          {section === "media" ? (
            <MediaPanel
              images={media}
              loading={mediaLoading}
              onImagesChange={setMedia}
              onNotice={setNotice}
            />
          ) : null}

          {section === "leadership" ? (
            <LeadershipPanel
              profiles={leadership}
              loading={leadershipLoading}
              onProfilesChange={setLeadership}
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
            Keep stories, events, leadership and photography current while every
            prospective family receives a timely response.
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
          <h3 className="mt-8 font-serif text-3xl">One connected publishing desk.</h3>
          <p className="mt-4 text-sm leading-7 text-white/65">
            Website content, photography, leadership profiles, upcoming dates
            and admissions enquiries now live in one secure workspace.
          </p>
          <div className="mt-8 border-t border-white/12 pt-6">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-school-gold">
              Secure access
            </p>
            <p className="mt-2 text-xs leading-6 text-white/55">
              Only administrator email addresses explicitly approved by the
              site owner can open this workspace.
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
  const [editingStory, setEditingStory] = useState<DashboardStory | null>(null);
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

  async function saveStory(values: StoryEditorPayload) {
    setSaving(true);

    try {
      const response = await fetch(
        editingStory ? `/api/dashboard/stories/${editingStory.id}` : "/api/dashboard/stories",
        {
          method: editingStory ? "PATCH" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const result = (await response.json()) as { story?: DashboardStory; error?: string };
      if (!response.ok || !result.story) {
        throw new Error(result.error || "The story could not be saved.");
      }
      onStoriesChange(
        editingStory
          ? stories.map((story) => story.id === result.story?.id ? result.story : story)
          : [result.story, ...stories],
      );
      setShowForm(false);
      setEditingStory(null);
      onNotice(editingStory ? "The story changes are now live." : "The new story has been saved.");
    } catch (error) {
      onNotice(
        error instanceof Error ? error.message : "The story could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteSelectedStory(story: DashboardStory) {
    if (!window.confirm(`Delete “${story.title}”? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/dashboard/stories/${story.id}`, { method: "DELETE" });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The story could not be deleted.");
      onStoriesChange(stories.filter((item) => item.id !== story.id));
      if (editingStory?.id === story.id) {
        setEditingStory(null);
        setShowForm(false);
      }
      onNotice("The story has been deleted from the website.");
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "The story could not be deleted.");
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
          onClick={() => {
            if (showForm) {
              setShowForm(false);
              setEditingStory(null);
            } else {
              setEditingStory(null);
              setShowForm(true);
            }
          }}
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
        <StoryCreateForm
          key={editingStory?.id ?? "new"}
          story={editingStory}
          onSubmit={saveStory}
          onCancel={() => {
            setShowForm(false);
            setEditingStory(null);
          }}
          saving={saving}
        />
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
                    imageKey={`story.${story.slug}.hero`}
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
                    onClick={() => {
                      setEditingStory(story);
                      setShowForm(true);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="inline-flex min-h-10 items-center justify-center gap-2 border border-school-navy/15 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-navy hover:bg-school-cream"
                  >
                    <Pencil aria-hidden="true" className="size-3.5" /> Edit
                  </button>
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
                  <button
                    type="button"
                    onClick={() => void deleteSelectedStory(story)}
                    className="inline-flex min-h-10 items-center justify-center gap-2 border border-school-red/25 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-red hover:bg-school-red hover:text-white"
                  >
                    <Trash2 aria-hidden="true" className="size-3.5" /> Delete
                  </button>
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

type StoryEditorPayload = {
  title: string;
  slug: string;
  category: string;
  readTime: string;
  image: string;
  alt: string;
  excerpt: string;
  quote: string;
  status: "draft" | "published";
  sections: Array<{
    heading: string;
    paragraphs: string[];
    image?: string;
    imageAlt?: string;
  }>;
};

function StoryCreateForm({
  story,
  onSubmit,
  onCancel,
  saving,
}: {
  story: DashboardStory | null;
  onSubmit: (values: StoryEditorPayload) => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const inputClass =
    "min-h-11 w-full border border-school-navy/15 bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-school-ink outline-none placeholder:text-school-muted/60 focus:border-school-red focus:ring-1 focus:ring-school-red";
  const [sections, setSections] = useState(() =>
    story?.sections.length
      ? story.sections.map((section) => ({
          heading: section.heading,
          paragraphs: [...section.paragraphs],
          image: section.image ?? "",
          imageAlt: section.imageAlt ?? "",
        }))
      : [{ heading: "The story", paragraphs: [""], image: "", imageAlt: "" }],
  );

  function submitStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    onSubmit({
      title: String(values.title ?? ""),
      slug: String(values.slug ?? ""),
      category: String(values.category ?? ""),
      readTime: String(values.readTime ?? ""),
      image: String(values.image ?? ""),
      alt: String(values.alt ?? ""),
      excerpt: String(values.excerpt ?? ""),
      quote: String(values.quote ?? ""),
      status: values.status === "published" ? "published" : "draft",
      sections: sections.map((section) => ({
        heading: section.heading,
        paragraphs: section.paragraphs.filter(Boolean),
        ...(section.image ? { image: section.image, imageAlt: section.imageAlt } : {}),
      })),
    });
  }

  return (
    <form
      onSubmit={submitStory}
      className="mt-8 border-t-4 border-school-gold bg-school-navy p-6 text-white shadow-sm sm:p-8"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-school-gold">
            Story editor
          </p>
          <h3 className="mt-3 font-serif text-3xl">
            {story ? `Edit ${story.title}` : "Create a new story"}
          </h3>
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
            defaultValue={story?.title}
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
            defaultValue={story?.slug}
            placeholder="example-story-title"
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            required
          />
        </DashboardField>
        <DashboardField label="Category">
          <input
            className={inputClass}
            name="category"
            defaultValue={story?.category}
            placeholder="School Life"
            required
          />
        </DashboardField>
        <DashboardField label="Read time">
          <input
            className={inputClass}
            name="readTime"
            defaultValue={story?.readTime ?? "4 minute read"}
          />
        </DashboardField>
        <DashboardField label="Hero image path">
          <input
            className={inputClass}
            name="image"
            defaultValue={story?.image ?? "/images/school/campus-assembly.webp"}
            required
          />
        </DashboardField>
        <DashboardField label="Image description">
          <input
            className={inputClass}
            name="alt"
            defaultValue={story?.alt}
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
            defaultValue={story?.excerpt}
            required
          />
        </DashboardField>
        <DashboardField label="Pull quote">
          <textarea
            className={`${inputClass} min-h-24 resize-y`}
            name="quote"
            defaultValue={story?.quote}
          />
        </DashboardField>
      </div>

      <div className="mt-8 border-t border-white/15 pt-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-school-gold">Full story</p>
            <p className="mt-2 text-sm text-white/65">Edit every section. Separate paragraphs with a blank line.</p>
          </div>
          <button
            type="button"
            onClick={() => setSections((items) => [...items, { heading: "", paragraphs: [""], image: "", imageAlt: "" }])}
            className="inline-flex min-h-10 items-center gap-2 border border-white/25 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white hover:bg-white hover:text-school-navy"
          >
            <Plus aria-hidden="true" className="size-4" /> Add section
          </button>
        </div>
        <div className="mt-5 grid gap-5">
          {sections.map((section, index) => (
            <section key={index} className="border border-white/15 bg-white/6 p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-white/70">Section {index + 1}</p>
                {sections.length > 1 ? (
                  <button type="button" onClick={() => setSections((items) => items.filter((_, itemIndex) => itemIndex !== index))} className="inline-flex items-center gap-2 text-xs font-bold uppercase text-school-gold hover:text-white">
                    <Trash2 aria-hidden="true" className="size-3.5" /> Remove
                  </button>
                ) : null}
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <DashboardField label="Section heading">
                  <input className={inputClass} value={section.heading} required onChange={(event) => setSections((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, heading: event.target.value } : item))} />
                </DashboardField>
                <DashboardField label="Section image path (optional)">
                  <input className={inputClass} value={section.image} onChange={(event) => setSections((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, image: event.target.value } : item))} />
                </DashboardField>
                <div className="md:col-span-2">
                  <DashboardField label="Paragraphs">
                    <textarea className={`${inputClass} min-h-32 resize-y`} value={section.paragraphs.join("\n\n")} required onChange={(event) => setSections((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, paragraphs: event.target.value.split(/\n\s*\n/).map((paragraph) => paragraph.trim()) } : item))} />
                  </DashboardField>
                </div>
                <div className="md:col-span-2">
                  <DashboardField label="Section image description">
                    <input className={inputClass} value={section.imageAlt} onChange={(event) => setSections((items) => items.map((item, itemIndex) => itemIndex === index ? { ...item, imageAlt: event.target.value } : item))} />
                  </DashboardField>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 text-sm text-white/72">
          <input
            type="checkbox"
            name="status"
            value="published"
            defaultChecked={story?.status === "published"}
            className="size-4 accent-school-gold"
          />
          Publish immediately
        </label>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={onCancel} className="min-h-12 border border-white/25 px-5 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-white hover:bg-white hover:text-school-navy">Cancel</button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex min-h-12 items-center justify-center gap-3 bg-school-red px-6 text-[0.68rem] font-bold uppercase tracking-[0.13em] text-white hover:bg-school-red-dark disabled:cursor-wait disabled:opacity-60"
          >
            <Send aria-hidden="true" className="size-4" />
            {saving ? "Saving…" : story ? "Save changes" : "Save story"}
          </button>
        </div>
      </div>
    </form>
  );
}

type EventEditorPayload = {
  title: string;
  slug: string;
  summary: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string | null;
  image: string;
  alt: string;
  status: "draft" | "published";
};

function EventsPanel({
  events,
  onEventsChange,
  onNotice,
}: {
  events: DashboardEvent[];
  onEventsChange: (events: DashboardEvent[]) => void;
  onNotice: (message: string) => void;
}) {
  const [editingEvent, setEditingEvent] = useState<DashboardEvent | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  async function saveEvent(values: EventEditorPayload) {
    setSaving(true);
    try {
      const response = await fetch(
        editingEvent ? `/api/dashboard/events/${editingEvent.id}` : "/api/dashboard/events",
        {
          method: editingEvent ? "PATCH" : "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        },
      );
      const result = (await response.json()) as { event?: DashboardEvent; error?: string };
      if (!response.ok || !result.event) throw new Error(result.error || "The event could not be saved.");
      onEventsChange(
        editingEvent
          ? events.map((event) => event.id === result.event?.id ? result.event : event)
          : [...events, result.event].sort((a, b) => a.startsAt.localeCompare(b.startsAt)),
      );
      setShowForm(false);
      setEditingEvent(null);
      onNotice(editingEvent ? "The event changes are now live." : "The upcoming event has been created.");
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "The event could not be saved.");
    } finally {
      setSaving(false);
    }
  }

  async function setEventStatus(event: DashboardEvent) {
    setSaving(true);
    try {
      const status = event.status === "published" ? "draft" : "published";
      const response = await fetch(`/api/dashboard/events/${event.id}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...event, status }),
      });
      const result = (await response.json()) as { event?: DashboardEvent; error?: string };
      if (!response.ok || !result.event) throw new Error(result.error || "The event status could not be changed.");
      onEventsChange(events.map((item) => item.id === event.id ? result.event! : item));
      onNotice(status === "published" ? "The event is now live on the website." : "The event has returned to draft.");
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "The event status could not be changed.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteSelectedEvent(event: DashboardEvent) {
    if (!window.confirm(`Delete “${event.title}”? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/dashboard/events/${event.id}`, { method: "DELETE" });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The event could not be deleted.");
      onEventsChange(events.filter((item) => item.id !== event.id));
      onNotice("The event has been deleted from the website.");
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "The event could not be deleted.");
    }
  }

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red">Calendar</p>
          <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] sm:text-5xl">Upcoming events</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-school-muted">Create, revise, publish and remove the dates shown on the public Events page.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/events" target="_blank" className="inline-flex min-h-12 items-center gap-2 border border-school-navy/15 bg-white px-5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-school-navy">View page <ArrowUpRight aria-hidden="true" className="size-4" /></Link>
          <button type="button" onClick={() => { setEditingEvent(null); setShowForm((open) => !open); }} className="inline-flex min-h-12 items-center gap-2 bg-school-red px-5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white hover:bg-school-red-dark">
            {showForm ? <X aria-hidden="true" className="size-4" /> : <Plus aria-hidden="true" className="size-4" />}
            {showForm ? "Close editor" : "Add event"}
          </button>
        </div>
      </div>

      {showForm ? (
        <EventEditor
          key={editingEvent?.id ?? "new-event"}
          event={editingEvent}
          saving={saving}
          onSubmit={saveEvent}
          onCancel={() => { setShowForm(false); setEditingEvent(null); }}
        />
      ) : null}

      <section className="mt-8 overflow-hidden border border-school-navy/10 bg-white shadow-sm">
        {events.length ? (
          <div className="divide-y divide-school-navy/10">
            {events.map((event) => (
              <article key={event.id} className="grid gap-5 p-5 sm:grid-cols-[110px_minmax(0,1fr)_auto] sm:items-center sm:px-7">
                <div className="relative aspect-[4/3] overflow-hidden bg-school-stone">
                  <Image src={event.image} imageKey={`event.${event.slug}.image`} alt="" fill unoptimized sizes="110px" className="object-cover" />
                </div>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3"><StatusBadge status={event.status} /><span className="text-xs text-school-muted">{formatEventDashboardDate(event.startsAt)}</span></div>
                  <h3 className="mt-3 font-serif text-2xl">{event.title}</h3>
                  <p className="mt-2 text-sm text-school-muted">{event.location}</p>
                </div>
                <div className="flex flex-wrap gap-2 sm:flex-col">
                  <button type="button" onClick={() => { setEditingEvent(event); setShowForm(true); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="inline-flex min-h-10 items-center justify-center gap-2 border border-school-navy/15 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-navy"><Pencil aria-hidden="true" className="size-3.5" /> Edit</button>
                  <button type="button" onClick={() => void setEventStatus(event)} className="min-h-10 border border-school-navy/15 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-navy">{event.status === "published" ? "Move to draft" : "Publish"}</button>
                  <button type="button" onClick={() => void deleteSelectedEvent(event)} className="inline-flex min-h-10 items-center justify-center gap-2 border border-school-red/25 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-red hover:bg-school-red hover:text-white"><Trash2 aria-hidden="true" className="size-3.5" /> Delete</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <EmptyState Icon={CalendarDays} title="No upcoming events yet" description="Add the first event, then publish it when the details are ready." />
        )}
      </section>
    </div>
  );
}

function EventEditor({ event, saving, onSubmit, onCancel }: {
  event: DashboardEvent | null;
  saving: boolean;
  onSubmit: (values: EventEditorPayload) => void;
  onCancel: () => void;
}) {
  const inputClass = "min-h-11 w-full border border-school-navy/15 bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal text-school-ink outline-none placeholder:text-school-muted/60 focus:border-school-red";

  function submit(eventForm: FormEvent<HTMLFormElement>) {
    eventForm.preventDefault();
    const values = Object.fromEntries(new FormData(eventForm.currentTarget).entries());
    const startsAt = new Date(String(values.startsAt)).toISOString();
    const endsValue = String(values.endsAt ?? "");
    onSubmit({
      title: String(values.title ?? ""),
      slug: String(values.slug ?? ""),
      summary: String(values.summary ?? ""),
      description: String(values.description ?? ""),
      location: String(values.location ?? ""),
      startsAt,
      endsAt: endsValue ? new Date(endsValue).toISOString() : null,
      image: String(values.image ?? ""),
      alt: String(values.alt ?? ""),
      status: values.status === "published" ? "published" : "draft",
    });
  }

  return (
    <form onSubmit={submit} className="mt-8 border-t-4 border-school-gold bg-school-navy p-6 text-white shadow-sm sm:p-8">
      <p className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-school-gold">Event editor</p>
      <h3 className="mt-3 font-serif text-3xl">{event ? `Edit ${event.title}` : "Create an upcoming event"}</h3>
      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <DashboardField label="Event title"><input className={inputClass} name="title" defaultValue={event?.title} required onBlur={(change) => { const slug = change.currentTarget.form?.elements.namedItem("slug") as HTMLInputElement | null; if (slug && !slug.value) slug.value = slugify(change.currentTarget.value); }} /></DashboardField>
        <DashboardField label="Web address"><input className={inputClass} name="slug" defaultValue={event?.slug} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" required /></DashboardField>
        <DashboardField label="Starts"><input className={inputClass} type="datetime-local" name="startsAt" defaultValue={toLocalDateTime(event?.startsAt)} required /></DashboardField>
        <DashboardField label="Ends (optional)"><input className={inputClass} type="datetime-local" name="endsAt" defaultValue={toLocalDateTime(event?.endsAt)} /></DashboardField>
        <DashboardField label="Location"><input className={inputClass} name="location" defaultValue={event?.location} required /></DashboardField>
        <DashboardField label="Image path"><input className={inputClass} name="image" defaultValue={event?.image ?? "/images/school/campus-assembly.webp"} required /></DashboardField>
        <div className="md:col-span-2"><DashboardField label="Image description"><input className={inputClass} name="alt" defaultValue={event?.alt} required /></DashboardField></div>
        <div className="md:col-span-2"><DashboardField label="Short summary"><textarea className={`${inputClass} min-h-24 resize-y`} name="summary" defaultValue={event?.summary} required /></DashboardField></div>
        <div className="md:col-span-2"><DashboardField label="Full details"><textarea className={`${inputClass} min-h-36 resize-y`} name="description" defaultValue={event?.description} required /></DashboardField></div>
      </div>
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-3 text-sm text-white/72"><input type="checkbox" name="status" value="published" defaultChecked={event?.status === "published"} className="size-4 accent-school-gold" /> Publish on the Events page</label>
        <div className="flex gap-3"><button type="button" onClick={onCancel} className="min-h-12 border border-white/25 px-5 text-[0.68rem] font-bold uppercase tracking-[0.12em]">Cancel</button><button type="submit" disabled={saving} className="inline-flex min-h-12 items-center gap-2 bg-school-red px-6 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-white disabled:opacity-60"><Send aria-hidden="true" className="size-4" />{saving ? "Saving…" : "Save event"}</button></div>
      </div>
    </form>
  );
}

function MediaPanel({
  images,
  loading,
  onImagesChange,
  onNotice,
}: {
  images: SiteImage[];
  loading: boolean;
  onImagesChange: (images: SiteImage[]) => void;
  onNotice: (message: string) => void;
}) {
  const [group, setGroup] = useState("All");
  const [savingKey, setSavingKey] = useState("");
  const groups = ["All", ...new Set(images.map((image) => image.group))];
  const visibleImages =
    group === "All"
      ? images
      : images.filter((image) => image.group === group);

  async function uploadReplacement(
    event: FormEvent<HTMLFormElement>,
    image: SiteImage,
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("key", image.key);
    setSavingKey(image.key);

    try {
      const response = await fetch("/api/dashboard/media", {
        method: "POST",
        body: formData,
      });
      const result = (await response.json()) as {
        image?: SiteImage;
        error?: string;
      };
      if (!response.ok || !result.image) {
        throw new Error(result.error || "The replacement could not be saved.");
      }

      onImagesChange(
        images.map((item) =>
          item.key === result.image?.key ? result.image : item,
        ),
      );
      refreshManagedImageRegistry();
      onNotice(`${image.label} has been updated across the website.`);
    } catch (error) {
      onNotice(
        error instanceof Error
          ? error.message
          : "The replacement could not be saved.",
      );
    } finally {
      setSavingKey("");
    }
  }

  async function restoreOriginal(image: SiteImage) {
    if (!window.confirm(`Remove the replacement for “${image.label}” and restore the original image?`)) return;
    setSavingKey(image.key);
    try {
      const response = await fetch("/api/dashboard/media", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ key: image.key }),
      });
      const result = (await response.json()) as {
        image?: SiteImage;
        warning?: string;
        error?: string;
      };
      if (!response.ok || !result.image) {
        throw new Error(result.error || "The original could not be restored.");
      }

      onImagesChange(
        images.map((item) =>
          item.key === result.image?.key ? result.image : item,
        ),
      );
      refreshManagedImageRegistry();
      onNotice(result.warning || `${image.label} replacement was deleted and the original image is live again.`);
    } catch (error) {
      onNotice(
        error instanceof Error
          ? error.message
          : "The original could not be restored.",
      );
    } finally {
      setSavingKey("");
    }
  }

  return (
    <div>
      <div>
        <p className="text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red">
          Website photography
        </p>
        <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] sm:text-5xl">
          Media Library
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-school-muted">
          Every card represents one exact website placement. Replacing it will
          not change another section, even when both originally used the same
          photograph. JPG, PNG, WebP and AVIF files up to 10 MB are accepted.
        </p>
      </div>

      {images.length > 0 ? (
        <div className="mt-8 flex flex-wrap gap-2">
          {groups.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setGroup(option)}
              className={`min-h-10 px-4 text-[0.64rem] font-bold uppercase tracking-[0.1em] ${
                group === option
                  ? "bg-school-navy text-white"
                  : "border border-school-navy/15 bg-white text-school-navy"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-8 border border-school-navy/10 bg-white p-10 text-center text-sm text-school-muted">
          Loading the Media Library…
        </div>
      ) : visibleImages.length > 0 ? (
        <div className="mt-7 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleImages.map((image) => {
            const saving = savingKey === image.key;
            return (
              <article
                key={image.key}
                className="overflow-hidden border border-school-navy/10 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] bg-school-stone">
                  <Image
                    src={image.currentUrl || image.defaultUrl}
                    alt=""
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 bg-school-navy/88 px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.1em] text-white backdrop-blur-sm">
                    {image.currentUrl ? "Replacement active" : "Original image"}
                  </span>
                </div>

                <div className="p-5">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-school-red">
                    {image.group}
                  </p>
                  <h3 className="mt-2 font-serif text-2xl">{image.label}</h3>
                  <p className="mt-2 break-all text-xs leading-5 text-school-muted">
                    {image.key}
                  </p>

                  <form
                    key={`${image.key}-${image.updatedAt}`}
                    onSubmit={(event) => uploadReplacement(event, image)}
                    className="mt-5 grid gap-4 border-t border-school-navy/10 pt-5"
                  >
                    <label className="grid gap-2 text-[0.6rem] font-bold uppercase tracking-[0.11em] text-school-muted">
                      Replacement file
                      <input
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        required
                        className="block w-full text-xs font-normal normal-case tracking-normal file:mr-3 file:border-0 file:bg-school-cream file:px-3 file:py-2 file:text-[0.6rem] file:font-bold file:uppercase file:tracking-[0.08em] file:text-school-navy"
                      />
                    </label>
                    <label className="grid gap-2 text-[0.6rem] font-bold uppercase tracking-[0.11em] text-school-muted">
                      Image description
                      <input
                        name="altText"
                        defaultValue={image.altText}
                        maxLength={220}
                        placeholder="Describe the image for accessibility"
                        className="min-h-11 border border-school-navy/15 bg-school-cream px-3 text-sm font-normal normal-case tracking-normal text-school-ink outline-none focus:border-school-red"
                      />
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 bg-school-red px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white hover:bg-school-red-dark disabled:cursor-wait disabled:opacity-60"
                      >
                        <Upload aria-hidden="true" className="size-4" />
                        {saving ? "Uploading…" : "Replace image"}
                      </button>
                      {image.currentUrl ? (
                        <button
                          type="button"
                          disabled={saving}
                          onClick={() => restoreOriginal(image)}
                          className="inline-flex min-h-11 items-center justify-center gap-2 border border-school-navy/15 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-navy hover:bg-school-cream disabled:opacity-60"
                        >
                          <Trash2 aria-hidden="true" className="size-4" />
                          Delete replacement
                        </button>
                      ) : null}
                    </div>
                  </form>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <EmptyState
          Icon={Images}
          title="Media Library setup required"
          description="Run supabase/media-library.sql, then reopen this section."
        />
      )}
    </div>
  );
}

function LeadershipPanel({
  profiles,
  loading,
  onProfilesChange,
  onNotice,
}: {
  profiles: LeadershipProfile[];
  loading: boolean;
  onProfilesChange: (profiles: LeadershipProfile[]) => void;
  onNotice: (message: string) => void;
}) {
  const [savingSlug, setSavingSlug] = useState("");
  const profileInputClass =
    "min-h-11 w-full border border-school-navy/15 bg-school-cream px-3 text-sm font-normal normal-case tracking-normal text-school-ink outline-none placeholder:text-school-muted/60 focus:border-school-red";

  async function saveProfile(
    event: FormEvent<HTMLFormElement>,
    profile: LeadershipProfile,
  ) {
    event.preventDefault();
    setSavingSlug(profile.slug);
    try {
      const response = await fetch("/api/dashboard/leadership", {
        method: "POST",
        body: new FormData(event.currentTarget),
      });
      const result = (await response.json()) as {
        profile?: LeadershipProfile;
        error?: string;
      };
      if (!response.ok || !result.profile) {
        throw new Error(result.error || "The leadership profile could not be saved.");
      }
      onProfilesChange(
        profiles.map((item) =>
          item.slug === result.profile?.slug ? result.profile : item,
        ),
      );
      onNotice(`${result.profile.name}'s leadership profile has been updated.`);
    } catch (error) {
      onNotice(
        error instanceof Error
          ? error.message
          : "The leadership profile could not be saved.",
      );
    } finally {
      setSavingSlug("");
    }
  }

  async function deleteProfile(profile: LeadershipProfile) {
    if (!window.confirm(`Delete ${profile.name}'s leadership profile? This cannot be undone.`)) return;
    setSavingSlug(profile.slug);
    try {
      const response = await fetch("/api/dashboard/leadership", {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug: profile.slug }),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The leadership profile could not be deleted.");
      onProfilesChange(profiles.filter((item) => item.slug !== profile.slug));
      onNotice("The leadership profile has been deleted from the website.");
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "The leadership profile could not be deleted.");
    } finally {
      setSavingSlug("");
    }
  }

  if (loading) {
    return (
      <div className="border border-school-navy/10 bg-white p-10 text-center text-sm text-school-muted">
        Loading leadership profiles…
      </div>
    );
  }

  return (
    <div>
      <p className="text-[0.66rem] font-bold uppercase tracking-[0.17em] text-school-red">
        People and responsibilities
      </p>
      <h2 className="mt-3 font-serif text-4xl tracking-[-0.035em] sm:text-5xl">
        Leadership profiles
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-school-muted">
        Update each leader’s name, role, biography and portrait. Every profile
        has its own independent photo.
      </p>

      {profiles.length > 0 ? (
        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {profiles.map((profile) => {
            const saving = savingSlug === profile.slug;
            return (
              <form
                key={`${profile.slug}-${profile.updatedAt}`}
                onSubmit={(event) => saveProfile(event, profile)}
                className="overflow-hidden border border-school-navy/10 bg-white shadow-sm"
              >
                <input type="hidden" name="slug" value={profile.slug} />
                <div className="grid sm:grid-cols-[180px_minmax(0,1fr)]">
                  <div className="relative min-h-52 bg-school-navy">
                    {profile.photoUrl ? (
                      <Image
                        src={profile.photoUrl}
                        alt=""
                        fill
                        unoptimized
                        sizes="180px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full min-h-52 items-center justify-center font-serif text-5xl text-white/85">
                        {initials(profile.name)}
                      </span>
                    )}
                  </div>
                  <div className="grid gap-4 p-5">
                    <DashboardField label="Name">
                      <input
                        name="name"
                        defaultValue={profile.name}
                        required
                        maxLength={120}
                        className={profileInputClass}
                      />
                    </DashboardField>
                    <DashboardField label="Role">
                      <input
                        name="role"
                        defaultValue={profile.role}
                        required
                        maxLength={120}
                        className={profileInputClass}
                      />
                    </DashboardField>
                    <DashboardField label="Leadership area">
                      <input
                        name="area"
                        defaultValue={profile.area}
                        required
                        maxLength={80}
                        className={profileInputClass}
                      />
                    </DashboardField>
                  </div>
                </div>
                <div className="grid gap-4 border-t border-school-navy/10 p-5">
                  <DashboardField label="Biography">
                    <textarea
                      name="description"
                      defaultValue={profile.description}
                      required
                      maxLength={600}
                      className={`${profileInputClass} min-h-28 resize-y py-3 leading-6`}
                    />
                  </DashboardField>
                  <div className="grid gap-4 md:grid-cols-2">
                    <DashboardField label="Portrait">
                      <input
                        type="file"
                        name="file"
                        accept="image/jpeg,image/png,image/webp,image/avif"
                        className="block w-full text-xs font-normal normal-case tracking-normal text-school-muted file:mr-3 file:border-0 file:bg-school-cream file:px-3 file:py-2 file:text-[0.6rem] file:font-bold file:uppercase file:text-school-navy"
                      />
                    </DashboardField>
                    <DashboardField label="Portrait description">
                      <input
                        name="photoAlt"
                        defaultValue={profile.photoAlt}
                        maxLength={220}
                        placeholder={`${profile.name}, ${profile.role}`}
                        className={profileInputClass}
                      />
                    </DashboardField>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <label className="flex items-center gap-3 text-sm text-school-muted">
                      <input
                        type="checkbox"
                        name="confirmed"
                        defaultChecked={profile.confirmed}
                        className="size-4 accent-school-red"
                      />
                      Profile is confirmed and ready to publish
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" disabled={saving} onClick={() => void deleteProfile(profile)} className="inline-flex min-h-11 items-center justify-center gap-2 border border-school-red/25 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-red hover:bg-school-red hover:text-white disabled:opacity-60"><Trash2 aria-hidden="true" className="size-4" />Delete</button>
                      <button
                        type="submit"
                        disabled={saving}
                        className="inline-flex min-h-11 items-center justify-center gap-2 bg-school-red px-5 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-white hover:bg-school-red-dark disabled:cursor-wait disabled:opacity-60"
                      >
                        <Upload aria-hidden="true" className="size-4" />
                        {saving ? "Saving…" : "Save profile"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            );
          })}
        </div>
      ) : (
        <EmptyState
          Icon={UsersRound}
          title="Leadership setup required"
          description="Run supabase/media-library.sql again, then reopen this section."
        />
      )}
    </div>
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

  async function deleteSelectedEnquiry(enquiry: Enquiry) {
    if (!window.confirm(`Delete the enquiry from ${enquiry.parentName}? This cannot be undone.`)) return;
    try {
      const response = await fetch(`/api/dashboard/enquiries/${enquiry.id}`, { method: "DELETE" });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error || "The enquiry could not be deleted.");
      onEnquiriesChange(enquiries.filter((item) => item.id !== enquiry.id));
      onNotice("The enquiry has been permanently deleted.");
    } catch (error) {
      onNotice(error instanceof Error ? error.message : "The enquiry could not be deleted.");
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
                    <button type="button" onClick={() => void deleteSelectedEnquiry(enquiry)} className="mt-5 inline-flex min-h-10 w-full items-center justify-center gap-2 border border-school-red/25 px-4 text-[0.62rem] font-bold uppercase tracking-[0.1em] text-school-red hover:bg-school-red hover:text-white"><Trash2 aria-hidden="true" className="size-3.5" />Delete enquiry</button>
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
    <label className="grid gap-2">
      <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em]">
        {label}
      </span>
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

function formatEventDashboardDate(value: string) {
  return new Intl.DateTimeFormat("en-KE", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "Africa/Nairobi",
  }).format(new Date(value));
}

function toLocalDateTime(value?: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Africa/Nairobi",
  });
  return formatter.format(date).replace(" ", "T");
}

function isErrorNotice(message: string) {
  return /(could not|not ready|required|invalid|failed|error|unavailable)/i.test(message);
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
