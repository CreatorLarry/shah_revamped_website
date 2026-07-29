"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";

type FormStatus =
  | { state: "idle"; message: "" }
  | { state: "submitting"; message: "" }
  | { state: "success"; message: string }
  | { state: "error"; message: string };

const initialStatus: FormStatus = { state: "idle", message: "" };

export function EnquiryForm() {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "submitting", message: "" });

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(result.error || "Your enquiry could not be submitted.");
      }

      form.reset();
      setStatus({
        state: "success",
        message:
          "Thank you. The admissions team has received your enquiry and will be in touch.",
      });
    } catch (error) {
      setStatus({
        state: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your enquiry could not be submitted.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div
        role="status"
        className="border-l-4 border-school-gold bg-school-navy p-8 text-white"
      >
        <CheckCircle2
          aria-hidden="true"
          className="size-9 text-school-gold"
          strokeWidth={1.5}
        />
        <h2 className="mt-6 font-serif text-3xl">Enquiry received</h2>
        <p className="mt-4 text-sm leading-7 text-white/72">{status.message}</p>
        <button
          type="button"
          onClick={() => setStatus(initialStatus)}
          className="mt-7 text-[0.68rem] font-bold uppercase tracking-[0.15em] text-school-gold underline underline-offset-4"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const inputClass =
    "min-h-12 w-full border border-school-navy/15 bg-white px-4 py-3 text-sm text-school-ink outline-none transition-colors placeholder:text-school-muted/55 focus:border-school-red focus:ring-1 focus:ring-school-red";

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-navy">
          Parent or guardian
          <input
            className={inputClass}
            name="parentName"
            autoComplete="name"
            required
          />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-navy">
          Email address
          <input
            className={inputClass}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-navy">
          Phone number
          <input
            className={inputClass}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
          />
        </label>
        <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-navy">
          Child’s age
          <input className={inputClass} name="childAge" required />
        </label>
      </div>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-navy">
        Current or intended year group
        <input className={inputClass} name="yearGroup" required />
      </label>

      <label className="grid gap-2 text-xs font-bold uppercase tracking-[0.12em] text-school-navy">
        How can we help?
        <textarea
          className={`${inputClass} min-h-32 resize-y`}
          name="message"
          required
        />
      </label>

      <label className="sr-only" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      {status.state === "error" ? (
        <p role="alert" className="text-sm leading-6 text-school-red">
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.state === "submitting"}
        className="inline-flex min-h-13 items-center justify-center gap-3 bg-school-red px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-school-red-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red disabled:cursor-wait disabled:opacity-65"
      >
        {status.state === "submitting" ? "Sending…" : "Send enquiry"}
        <Send aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
