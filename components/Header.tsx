"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navigation, school } from "@/data/site";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header>
      <div className="bg-school-navy text-white">
        <div className="mx-auto flex min-h-10 max-w-[1440px] items-center justify-between gap-5 px-4 text-[0.68rem] font-semibold uppercase tracking-[0.11em] sm:px-6 lg:px-10">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-3.5 text-school-gold" />
              {school.location}
            </span>
            <a
              href={school.phoneHref}
              className="hidden items-center gap-2 transition-colors hover:text-school-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold md:flex"
            >
              <Phone aria-hidden="true" className="size-3.5" />
              {school.phoneDisplay}
            </a>
            <a
              href={school.emailHref}
              className="hidden items-center gap-2 transition-colors hover:text-school-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold lg:flex"
            >
              <Mail aria-hidden="true" className="size-3.5" />
              {school.email}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/contact"
              className="border-l border-white/20 pl-4 text-school-gold transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </div>

      <div className="sticky top-0 z-50 border-b border-school-navy/10 bg-white/95 shadow-[0_12px_28px_rgba(6,47,95,0.07)] backdrop-blur-md">
        <div className="mx-auto flex min-h-[82px] max-w-[1440px] items-center justify-between gap-5 px-4 sm:px-6 lg:min-h-[92px] lg:px-10">
          <Link
            href="/"
            aria-label="Shah Lalji Nangpar Academy home"
            className="flex items-center gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-navy"
          >
            <Image
              src="/images/school-logo.png"
              alt=""
              width={70}
              height={70}
              unoptimized
              priority
              className="h-[62px] w-[62px] object-contain lg:h-[72px] lg:w-[72px]"
            />
            <span className="hidden max-w-[205px] border-l border-school-navy/15 pl-3 text-[0.75rem] font-extrabold uppercase leading-[1.25] tracking-[0.08em] text-school-navy sm:block">
              Shah Lalji
              <br />
              Nangpar Academy
            </span>
          </Link>

          <nav aria-label="Main navigation" className="hidden xl:block">
            <ul className="flex items-center gap-1 xl:gap-2">
              {navigation.map((item) => (
                <li key={item.href} className="group relative">
                  <a
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={`relative flex items-center gap-1 px-3 py-3 text-[0.69rem] font-bold uppercase tracking-[0.13em] transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-school-red after:transition-transform hover:text-school-red hover:after:scale-x-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy xl:px-4 ${
                      isActive(item.href)
                        ? "text-school-red after:scale-x-100"
                        : "text-school-ink after:scale-x-0"
                    }`}
                  >
                    {item.label}
                    {"children" in item ? (
                      <ChevronDown
                        aria-hidden="true"
                        className="size-3.5 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                        strokeWidth={2}
                      />
                    ) : null}
                  </a>
                  {"children" in item ? (
                    <div className="pointer-events-none invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 translate-y-2 border-t-2 border-school-red bg-white p-2 opacity-0 shadow-[0_20px_45px_rgba(6,47,95,0.18)] transition-[opacity,transform,visibility] duration-200 group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                      <ul>
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              aria-current={
                                pathname === child.href ? "page" : undefined
                              }
                              className={`block px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.11em] transition-colors hover:bg-school-cream hover:text-school-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-school-navy ${
                                pathname === child.href
                                  ? "bg-school-cream text-school-red"
                                  : "text-school-ink"
                              }`}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/contact#visit"
              className="hidden min-h-12 items-center justify-center rounded-[3px] bg-school-red px-5 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-white transition-colors hover:bg-school-red-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red sm:inline-flex lg:px-6"
            >
              Book a Visit
            </a>
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setMenuOpen((open) => !open)}
              className="inline-flex size-12 items-center justify-center rounded-[3px] border border-school-navy/15 text-school-navy transition-colors hover:bg-school-navy hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-navy xl:hidden"
            >
              {menuOpen ? (
                <X aria-hidden="true" className="size-6" />
              ) : (
                <Menu aria-hidden="true" className="size-6" />
              )}
            </button>
          </div>
        </div>

        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className={`absolute inset-x-0 top-full overflow-hidden border-t border-school-navy/10 bg-white shadow-xl transition-[max-height,opacity] duration-300 xl:hidden ${
            menuOpen
              ? "max-h-[calc(100vh-7rem)] overflow-y-auto opacity-100"
              : "pointer-events-none max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-[1440px] px-4 py-5 sm:px-6">
            <ul className="divide-y divide-school-navy/10">
              {navigation.map((item) => (
                <li key={item.href} className="py-1">
                  <a
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-h-12 items-center justify-between py-3 text-sm font-bold uppercase tracking-[0.13em] transition-colors hover:text-school-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy ${
                      isActive(item.href)
                        ? "text-school-red"
                        : "text-school-ink"
                    }`}
                  >
                    {item.label}
                    <span aria-hidden="true" className="text-school-red">
                      ↗
                    </span>
                  </a>
                  {"children" in item ? (
                    <ul className="mb-3 ml-4 border-l border-school-navy/15 pl-4">
                      {item.children
                        .filter((child) => child.href !== item.href)
                        .map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              aria-current={
                                pathname === child.href ? "page" : undefined
                              }
                              onClick={() => setMenuOpen(false)}
                              className={`block py-2 text-xs font-semibold uppercase tracking-[0.11em] transition-colors hover:text-school-red focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-navy ${
                                pathname === child.href
                                  ? "text-school-red"
                                  : "text-school-muted"
                              }`}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
            <div className="mt-5 grid gap-2 border-t border-school-navy/10 pt-5 text-sm text-school-muted sm:grid-cols-2">
              <a
                href={school.phoneHref}
                className="flex items-center gap-2 py-2 hover:text-school-red"
              >
                <Phone aria-hidden="true" className="size-4" />
                {school.phoneDisplay}
              </a>
              <a
                href={school.emailHref}
                className="flex items-center gap-2 py-2 hover:text-school-red"
              >
                <Mail aria-hidden="true" className="size-4" />
                {school.email}
              </a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
