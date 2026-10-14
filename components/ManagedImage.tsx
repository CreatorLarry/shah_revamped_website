"use client";

import NextImage, { type ImageProps } from "next/image";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type ImageOverride = {
  url: string;
  alt: string;
};

export type ImageRegistry = Record<string, ImageOverride>;

type ManagedImageProps = ImageProps & {
  imageKey?: string;
};

let registryPromise: Promise<ImageRegistry> | null = null;
const registryListeners = new Set<() => void>();
let contentChannel: BroadcastChannel | null = null;
const ImageRegistryContext = createContext<ImageRegistry>({});

export function ManagedImageProvider({
  children,
  initialRegistry,
}: {
  children: ReactNode;
  initialRegistry: ImageRegistry;
}) {
  const [registry, setRegistry] = useState(initialRegistry);

  useEffect(() => {
    let active = true;
    ensureContentChannel();

    const handleRefresh = () => {
      void loadImageRegistry().then((nextRegistry) => {
        if (active) setRegistry(nextRegistry);
      });
    };

    registryListeners.add(handleRefresh);
    return () => {
      active = false;
      registryListeners.delete(handleRefresh);
    };
  }, []);

  return (
    <ImageRegistryContext.Provider value={registry}>
      {children}
    </ImageRegistryContext.Provider>
  );
}

export function ManagedImage({
  src,
  alt,
  imageKey,
  onError,
  ...props
}: ManagedImageProps) {
  const registry = useContext(ImageRegistryContext);
  const registryKey = imageKey ?? (typeof src === "string" ? src : "");
  const override = registryKey ? registry[registryKey] : undefined;
  const [failedOverrideUrl, setFailedOverrideUrl] = useState("");
  const activeOverride =
    override?.url === failedOverrideUrl ? undefined : override;
  const resolvedAlt = alt === "" ? "" : activeOverride?.alt || alt;

  return (
    <NextImage
      {...props}
      src={activeOverride?.url || src}
      alt={resolvedAlt}
      onError={(event) => {
        if (activeOverride) setFailedOverrideUrl(activeOverride.url);
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
