const LOCAL_ORIGIN = "http://localhost:3000";

export function getSiteOrigin(): string {
  const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configuredOrigin) return LOCAL_ORIGIN;

  try {
    return new URL(configuredOrigin).origin;
  } catch {
    return LOCAL_ORIGIN;
  }
}
