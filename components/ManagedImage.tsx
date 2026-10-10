"use client";

import NextImage, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type ImageOverride = {
  url: string;
  alt: string;
};

type ImageRegistry = Record<string, ImageOverride>;

type ManagedImageProps = ImageProps & {
  imageKey?: string;
};

let registryPromise: Promise<ImageRegistry> | null = null;
const registryListeners = new Set<() => void>();
let contentChannel: BroadcastChannel | null = null;

export function ManagedImage({
  src,
  alt,
  imageKey,
  onError,
  ...props
}: ManagedImageProps) {
  const [override, setOverride] = useState<ImageOverride | null>(null);
  const registryKey = imageKey ?? (typeof src === "string" ? src : "");

  useEffect(() => {
    let active = true;
    ensureContentChannel();

    async function updateImage() {
      if (!registryKey) {
        if (active) setOverride(null);
        return;
      }

      const registry = await loadImageRegistry();
      if (active) setOverride(registry[registryKey] ?? null);
    }

    void updateImage();
    const handleRefresh = () => void updateImage();
    registryListeners.add(handleRefresh);

    return () => {
      active = false;
      registryListeners.delete(handleRefresh);
    };
  }, [registryKey]);

  const resolvedAlt = alt === "" ? "" : override?.alt || alt;

  return (
    <NextImage
      {...props}
      src={override?.url || src}
      alt={resolvedAlt}
      onError={(event) => {
        if (override) setOverride(null);
        onError?.(event);
      }}
    />
  );
}

export function refreshManagedImageRegistry() {
  refreshLocalRegistry();
  ensureContentChannel()?.postMessage({ type: "site-images-updated" });
}

function refreshLocalRegistry() {
  registryPromise = null;
  registryListeners.forEach((listener) => listener());
}

function ensureContentChannel() {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) return null;
  if (!contentChannel) {
    contentChannel = new BroadcastChannel("slna-site-content");
    contentChannel.addEventListener("message", (event) => {
      if (event.data?.type === "site-images-updated") refreshLocalRegistry();
    });
  }
  return contentChannel;
}

function loadImageRegistry() {
  registryPromise ??= fetch("/api/site-images", { cache: "no-store" })
    .then(async (response) => {
      if (!response.ok) return {};
      const result = (await response.json()) as { images?: ImageRegistry };
      return result.images ?? {};
    })
    .catch(() => ({}));

  return registryPromise;
}
