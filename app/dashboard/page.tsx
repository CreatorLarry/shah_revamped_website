import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, LockKeyhole, ShieldX } from "lucide-react";
import {
  chatGPTSignInPath,
  chatGPTSignOutPath,
  getChatGPTUser,
} from "@/app/chatgpt-auth";
import { DashboardApp } from "@/components/DashboardApp";
import { getDashboardSnapshot, type DashboardSnapshot } from "@/db/dashboard";
import { isDashboardAdmin } from "@/lib/dashboard-auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "School Dashboard | Shah Lalji Nangpar Academy",
  description: "Secure staff workspace for SLNA website content and enquiries.",
  robots: { index: false, follow: false },
};

const emptySnapshot: DashboardSnapshot = {
  stories: [],
  enquiries: [],
};

export default async function DashboardPage() {
  const user = await getChatGPTUser();

  if (!user) {
    return (
      <DashboardAccessPage
        title="School Desk"
        description="Sign in with an approved school account to manage stories and admissions enquiries."
        actionHref={chatGPTSignInPath("/dashboard")}
        actionLabel="Sign in securely"
      />
    );
  }

  if (!isDashboardAdmin(user.email)) {
    return (
      <DashboardAccessPage
        title="Access not approved"
        description={`${user.email} is signed in, but it is not currently approved for the school dashboard.`}
        actionHref={chatGPTSignOutPath("/dashboard")}
        actionLabel="Use another account"
        denied
      />
    );
  }

  let snapshot = emptySnapshot;
  let databaseError: string | undefined;
  try {
    snapshot = await getDashboardSnapshot();
  } catch {
    databaseError =
      "The dashboard opened securely, but its database is not ready yet. Publishing the configured database will complete setup.";
  }

  return (
    <DashboardApp
      displayName={user.displayName}
      email={user.email}
      signOutHref={chatGPTSignOutPath("/")}
      initialSnapshot={snapshot}
      initialError={databaseError}
    />
  );
}

function DashboardAccessPage({
  title,
  description,
  actionHref,
  actionLabel,
  denied = false,
}: {
  title: string;
  description: string;
  actionHref: string;
  actionLabel: string;
  denied?: boolean;
}) {
  const Icon = denied ? ShieldX : LockKeyhole;

  return (
    <main className="grid min-h-screen bg-school-cream lg:grid-cols-2">
      <section className="flex items-center px-5 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-xl">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-school-muted hover:text-school-red"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Return to website
          </Link>
          <Image
            src="/images/school-logo.png"
            alt="Shah Lalji Nangpar Academy"
            width={92}
            height={92}
            unoptimized
            priority
            className="mt-14 size-[92px] object-contain"
          />
          <p className="mt-9 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-school-red">
            Secure staff workspace
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-[0.95] tracking-[-0.045em] text-school-ink sm:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-school-muted">
            {description}
          </p>
          <a
            href={actionHref}
            className="mt-9 inline-flex min-h-13 items-center justify-center gap-3 bg-school-red px-7 py-3 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-school-red-dark"
          >
            <Icon aria-hidden="true" className="size-4" />
            {actionLabel}
          </a>
          <p className="mt-7 max-w-md text-xs leading-6 text-school-muted">
            Access is restricted to school-domain accounts and administrators
            explicitly approved by SLNA.
          </p>
        </div>
      </section>
      <section className="relative hidden overflow-hidden bg-school-navy lg:block">
        <Image
          src="/images/school/senior-students-community.webp"
          alt=""
          fill
          unoptimized
          priority
          sizes="50vw"
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,47,95,0.92),rgba(6,47,95,0.18))]" />
        <div className="absolute inset-x-12 bottom-12 border-l-4 border-school-gold bg-school-navy/88 p-8 text-white backdrop-blur-sm">
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.17em] text-school-gold">
            One connected workspace
          </p>
          <p className="mt-4 max-w-lg font-serif text-3xl leading-tight">
            Publish school life with confidence and respond to every family with
            care.
          </p>
        </div>
      </section>
    </main>
  );
}
