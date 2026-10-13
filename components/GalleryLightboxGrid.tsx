"use client";

import { X, ZoomIn } from "lucide-react";
import { useEffect, useState } from "react";
import { ManagedImage as Image } from "@/components/ManagedImage";
import { photoLibrary } from "@/data/site";

const spans = [
  "sm:col-span-2 lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "sm:col-span-2 lg:col-span-8",
  "lg:col-span-5",
  "lg:col-span-7",
  "sm:col-span-2 lg:col-span-6",
  "lg:col-span-6",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
  "sm:col-span-2 lg:col-span-8",
  "lg:col-span-4",
  "lg:col-span-5",
  "lg:col-span-7",
  "sm:col-span-2 lg:col-span-12",
] as const;

export function GalleryLightboxGrid() {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (selected === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  const activePhoto = selected === null ? null : photoLibrary[selected];

  return (
    <>
      <div className="mt-14 grid auto-rows-[250px] grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[270px] lg:grid-cols-12">
        {photoLibrary.map((photo, index) => (
          <figure key={photo.src} className={`group relative overflow-hidden bg-school-navy ${spans[index]}`}>
            <button
              type="button"
              onClick={() => setSelected(index)}
              className="absolute inset-0 w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-school-red"
              aria-label={`View full image: ${photo.title}`}
            >
              <Image
                src={photo.src}
                imageKey={`gallery.photo.${index + 1}`}
                alt={photo.alt}
                fill
                unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-school-navy/82 via-transparent to-transparent" />
              <span className="absolute right-4 top-4 flex size-10 items-center justify-center bg-white/92 text-school-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                <ZoomIn aria-hidden="true" className="size-5" />
              </span>
              <span className="absolute inset-x-0 bottom-0 block p-5 text-white sm:p-6">
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.17em] text-school-gold">{photo.category}</p>
                <p className="mt-2 font-serif text-2xl leading-tight">{photo.title}</p>
              </span>
            </button>
          </figure>
        ))}
      </div>

      {activePhoto && selected !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-school-navy/95 p-4 sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelected(null);
          }}
        >
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 z-10 flex size-12 items-center justify-center bg-white text-school-navy hover:bg-school-gold sm:right-8 sm:top-8"
            aria-label="Close full image"
          >
            <X aria-hidden="true" className="size-6" />
          </button>
          <figure className="flex h-full w-full max-w-[1500px] flex-col">
            <div className="relative min-h-0 flex-1">
              <Image
                src={activePhoto.src}
                imageKey={`gallery.photo.${selected + 1}`}
                alt={activePhoto.alt}
                fill
                unoptimized
                priority
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="shrink-0 pt-4 text-center text-white">
              <span className="text-[0.62rem] font-bold uppercase tracking-[0.16em] text-school-gold">{activePhoto.category}</span>
              <span className="ml-3 font-serif text-xl">{activePhoto.title}</span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
