import type { Metadata } from "next";
import { ManagedImage as Image } from "@/components/ManagedImage";
import Link from "next/link";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { signIn } from "@/app/login/actions";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Staff Sign In | Shah Lalji Nangpar Academy",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; next?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, next = "/dashboard" } = await searchParams;
  const configured = isSupabaseConfigured();

  return (
    <main className="grid min-h-screen bg-school-cream lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
      <section className="flex items-center px-5 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto w-full max-w-lg">
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-school-muted hover:text-school-red"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Return to website
          </Link>

          <Image
            src="/images/school-logo.png"
            imageKey="login.logo"
            alt="Shah Lalji Nangpar Academy"
            width={86}
            height={86}
            unoptimized
            priority
            className="mt-12 size-[86px] object-contain"
          />
          <p className="mt-8 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-school-red">
            Secure staff workspace
          </p>
          <h1 className="mt-4 font-serif text-5xl leading-none tracking-[-0.045em] text-school-ink sm:text-6xl">
            Welcome back.
          </h1>
          <p className="mt-5 text-base leading-8 text-school-muted">
            Sign in with the administrator account created in Supabase.
          </p>

          {!configured ? (
            <p className="mt-8 border-l-4 border-school-red bg-white p-5 text-sm leading-6 text-school-red">
              Supabase is not configured in this environment. Add the project
              URL and publishable key before signing in.
            </p>
          ) : null}

          {error ? (
            <p
              role="alert"
              className="mt-8 border-l-4 border-school-red bg-white p-5 text-sm leading-6 text-school-red"
            >
              {error}
            </p>
          ) : null}

          <form action={signIn} className="mt-8 grid gap-5">
            <input type="hidden" name="next" value={next} />
            <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-navy">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-h-13 border border-school-navy/15 bg-white px-4 text-base normal-case tracking-normal outline-none focus:border-school-red focus:ring-1 focus:ring-school-red"
              />
            </label>
            <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-navy">
              Password
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="min-h-13 border border-school-navy/15 bg-white px-4 text-base normal-case tracking-normal outline-none focus:border-school-red focus:ring-1 focus:ring-school-red"
              />
            </label>
            <button
              type="submit"
              disabled={!configured}
              className="mt-2 inline-flex min-h-13 items-center justify-center gap-3 bg-school-red px-7 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white hover:bg-school-red-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <LockKeyhole aria-hidden="true" className="size-4" />
              Sign in
            </button>
          </form>
        </div>
      </section>

      <section className="relative hidden overflow-hidden bg-school-navy lg:block">
        <Image
          src="/images/school/senior-students-community.webp"
          imageKey="login.background"
          alt=""
          fill
          unoptimized
          priority
          sizes="55vw"
          className="object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(6,47,95,0.94),rgba(6,47,95,0.18))]" />
        <div className="absolute inset-x-12 bottom-12 border-l-4 border-school-gold bg-school-navy/88 p-8 text-white backdrop-blur-sm">
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.17em] text-school-gold">
            SLNA School Desk
          </p>
          <p className="mt-4 max-w-lg font-serif text-3xl leading-tight">
            Stories, admissions enquiries and website content in one secure
            workspace.
          </p>
        </div>
      </section>
    </main>
  );
}
