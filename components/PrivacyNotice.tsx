"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "slna_privacy_notice_v1";

export function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setIsVisible(
          window.localStorage.getItem(STORAGE_KEY) !== "acknowledged",
        );
      } catch {
        setIsVisible(true);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  function acknowledgeNotice() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "acknowledged");
    } finally {
      setIsVisible(false);
    }
  }

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Privacy notice"
      aria-live="polite"
      className="fixed inset-x-3 bottom-3 z-[100] border border-white/15 bg-school-ink p-5 text-white shadow-2xl sm:inset-x-auto sm:bottom-6 sm:right-6 sm:max-w-xl sm:p-6"
    >
      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-school-gold">
        Your privacy
      </p>
      <h2 className="mt-2 font-serif text-2xl">A clear, necessary notice</h2>
      <p className="mt-3 text-sm leading-6 text-white/72">
        This site does not currently use advertising or analytics cookies. We
        use essential storage for secure staff sign-in and to remember that you
        have seen this notice.
      </p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={acknowledgeNotice}
          className="inline-flex min-h-11 items-center justify-center bg-school-gold px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-school-ink transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
        >
          Understood
        </button>
        <Link
          href="/privacy"
          className="inline-flex min-h-11 items-center justify-center border border-white/25 px-5 py-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-school-gold hover:text-school-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
        >
          Read privacy notice
        </Link>
      </div>
    </aside>
  );
}
