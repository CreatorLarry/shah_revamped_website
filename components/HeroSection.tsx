"use client";

import Image from "next/image";
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import {
  type FocusEvent,
  type TouchEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { ButtonLink } from "@/components/ButtonLink";
import { heroSlides } from "@/data/site";

const AUTOPLAY_DELAY = 6500;

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [manualPaused, setManualPaused] = useState(false);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const showPrevious = useCallback(() => {
    setActiveSlide((current) =>
      current === 0 ? heroSlides.length - 1 : current - 1,
    );
  }, []);

  const showNext = useCallback(() => {
    setActiveSlide((current) => (current + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (manualPaused || interactionPaused || reducedMotion) {
      return;
    }

    const timer = window.setInterval(showNext, AUTOPLAY_DELAY);
    return () => window.clearInterval(timer);
  }, [interactionPaused, manualPaused, reducedMotion, showNext]);

  function handleBlur(event: FocusEvent<HTMLElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setInteractionPaused(false);
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStartX.current === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const distance = endX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(distance) < 52) {
      return;
    }

    if (distance > 0) {
      showPrevious();
    } else {
      showNext();
    }
  }

  const currentSlide = heroSlides[activeSlide];
  const autoplayPaused = manualPaused || interactionPaused || reducedMotion;

  return (
    <section
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      aria-label="Shah Lalji Nangpar Academy highlights"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={handleBlur}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative isolate flex min-h-[calc(100svh-122px)] items-end overflow-hidden bg-school-navy md:min-h-[760px]"
    >
      <div className="absolute inset-0" aria-hidden="true">
        {heroSlides.map((slide, index) => {
          const isActive = index === activeSlide;

          return (
            <div
              key={slide.src}
              className={`absolute inset-0 transition-[opacity,transform] duration-[1400ms] ease-out ${
                isActive
                  ? "z-10 scale-100 opacity-100"
                  : "z-0 scale-[1.035] opacity-0"
              }`}
            >
              <Image
                src={slide.src}
                alt=""
                fill
                unoptimized
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      <div className="absolute inset-0 z-20 bg-[linear-gradient(90deg,rgba(3,29,60,0.94)_0%,rgba(3,29,60,0.78)_43%,rgba(3,29,60,0.2)_79%),linear-gradient(0deg,rgba(3,29,60,0.84)_0%,transparent_48%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-[12%] z-20 hidden w-px bg-white/15 xl:block"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/3 z-20 hidden h-px bg-white/10 xl:block"
      />

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {activeSlide + 1} of {heroSlides.length}: {currentSlide.label}.{" "}
        {currentSlide.caption}
      </p>

      <div className="relative z-30 mx-auto w-full max-w-[1440px] px-4 pb-10 pt-24 sm:px-6 sm:pb-14 md:pb-16 lg:px-10 lg:pb-20">
        <div className="max-w-[900px]">
          <div className="hero-reveal hero-reveal-1 mb-6 flex items-center gap-3 text-[0.67rem] font-bold uppercase tracking-[0.2em] text-school-gold sm:text-[0.72rem]">
            <span aria-hidden="true" className="h-px w-9 bg-school-gold" />
            Cambridge Curriculum International School · Nakuru
          </div>
          <h1
            id="hero-title"
            className="hero-reveal hero-reveal-2 max-w-[850px] font-serif text-[clamp(3.35rem,8.5vw,7.8rem)] leading-[0.87] tracking-[-0.055em] text-white"
          >
            An Education That Inspires{" "}
            <span className="text-school-gold">Excellence.</span>
          </h1>
          <p className="hero-reveal hero-reveal-3 mt-7 max-w-[680px] text-base leading-7 text-white/78 sm:text-lg sm:leading-8">
            Shah Lalji Nangpar Academy nurtures confident, compassionate and
            future-ready learners through a rich Cambridge education from Early
            Years to A-Level.
          </p>
          <div className="hero-reveal hero-reveal-4 mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#admissions">Explore Admissions</ButtonLink>
            <ButtonLink href="#our-school" variant="outline">
              Discover Our School
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-6 border-t border-white/20 pt-5 text-white md:grid-cols-[1fr_auto] md:items-end lg:mt-14">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between md:block">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/45">
                {currentSlide.label}
              </p>
              <p className="mt-2 max-w-md font-serif text-xl tracking-[-0.01em] sm:text-2xl">
                {currentSlide.caption}
              </p>
            </div>
            <a
              href="#our-school"
              className="group inline-flex items-center gap-3 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-gold md:mt-5"
            >
              Explore the school
              <span className="flex size-10 items-center justify-center border border-white/30 transition-colors group-hover:border-school-gold group-hover:bg-school-gold group-hover:text-school-ink">
                <ArrowDown aria-hidden="true" className="size-4" />
              </span>
            </a>
          </div>

          <div className="flex items-center justify-between gap-5 md:justify-end">
            <div
              className="flex items-center gap-2"
              aria-label="Choose a carousel slide"
            >
              {heroSlides.map((slide, index) => (
                <button
                  key={slide.src}
                  type="button"
                  aria-label={`Show slide ${index + 1}: ${slide.label}`}
                  aria-current={index === activeSlide ? "true" : undefined}
                  onClick={() => setActiveSlide(index)}
                  className="group flex min-h-11 w-10 items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-school-gold sm:w-14"
                >
                  <span
                    className={`h-[2px] w-full transition-colors duration-300 ${
                      index === activeSlide
                        ? "bg-school-gold"
                        : "bg-white/35 group-hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center border border-white/25">
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Show previous hero image"
                className="flex size-11 items-center justify-center border-r border-white/25 text-white transition-colors hover:bg-white hover:text-school-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-school-gold sm:size-12"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setManualPaused((paused) => !paused)}
                aria-label={
                  manualPaused
                    ? "Resume automatic hero carousel"
                    : "Pause automatic hero carousel"
                }
                className="flex size-11 items-center justify-center border-r border-white/25 text-white transition-colors hover:bg-white hover:text-school-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-school-gold sm:size-12"
              >
                {manualPaused ? (
                  <Play aria-hidden="true" className="size-4" />
                ) : (
                  <Pause aria-hidden="true" className="size-4" />
                )}
              </button>
              <button
                type="button"
                onClick={showNext}
                aria-label="Show next hero image"
                className="flex size-11 items-center justify-center text-white transition-colors hover:bg-white hover:text-school-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-school-gold sm:size-12"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only">
        {heroSlides.map((slide, index) => (
          <span key={slide.src}>
            Image {index + 1}: {slide.alt}
          </span>
        ))}
      </div>

      {autoplayPaused ? (
        <span className="sr-only">Automatic carousel rotation is paused.</span>
      ) : null}
    </section>
  );
}
