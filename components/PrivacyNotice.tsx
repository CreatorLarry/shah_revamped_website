"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "slna_privacy_notice_v2";

export function PrivacyNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

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

  useEffect(() => {
    if (!isVisible) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    const preventCancel = (event: Event) => event.preventDefault();
    const preventEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    dialog.addEventListener("cancel", preventCancel);
    document.addEventListener("keydown", preventEscape, true);

    return () => {
      dialog.removeEventListener("cancel", preventCancel);
      document.removeEventListener("keydown", preventEscape, true);
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isVisible]);

  function acknowledgeNotice() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "acknowledged");
    } finally {
      setIsVisible(false);
    }
  }

  function leaveSite() {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.replace("about:blank");
  }

  if (!isVisible) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="privacy-gate-title"
      aria-describedby="privacy-gate-description"
      onCancel={(event) => event.preventDefault()}
      className="privacy-gate m-auto w-[calc(100%-1.5rem)] max-w-xl border border-white/15 bg-school-ink p-0 text-white shadow-2xl"
    >
      <div className="p-6 sm:p-8">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-school-gold">
          Before continuing
        </p>
        <h2 id="privacy-gate-title" className="mt-2 font-serif text-3xl">
          Your privacy matters.
        </h2>
        <p
          id="privacy-gate-description"
          className="mt-4 text-sm leading-7 text-white/72"
        >
          This site does not currently use advertising or analytics cookies.
          We use essential storage for secure staff sign-in and to remember
          that you have seen this notice. Select “Understood” to enter the site,
          or go back without continuing.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={acknowledgeNotice}
            className="inline-flex min-h-12 items-center justify-center bg-school-gold px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-school-ink transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
          >
            Understood
          </button>
          <button
            type="button"
            onClick={leaveSite}
            className="inline-flex min-h-12 items-center justify-center border border-white/25 px-6 py-3 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:border-school-gold hover:text-school-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold"
          >
            Go back
          </button>
        </div>
      </div>
    </dialog>
  );
}
