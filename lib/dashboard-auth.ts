import { getChatGPTUser, type ChatGPTUser } from "@/app/chatgpt-auth";

export type DashboardAccessMode = "platform" | "local-preview";

export function getLocalDashboardUser(): ChatGPTUser | null {
  const previewEnabled =
    process.env.NODE_ENV !== "production" &&
    process.env.DASHBOARD_LOCAL_PREVIEW?.trim().toLowerCase() === "true";

  if (!previewEnabled) return null;

  const email =
    process.env.DASHBOARD_LOCAL_PREVIEW_EMAIL?.trim() ??
    "admin@local.preview";
  const fullName =
    process.env.DASHBOARD_LOCAL_PREVIEW_NAME?.trim() ??
    "Local Administrator";

  return {
    displayName: fullName,
    email,
    fullName,
  };
}

export function isDashboardAdmin(email: string): boolean {
  const normalisedEmail = email.trim().toLowerCase();
  const approvedAdmins = (process.env.DASHBOARD_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return approvedAdmins.includes(normalisedEmail);
}

export async function getDashboardUser(): Promise<ChatGPTUser | null> {
  const localUser = getLocalDashboardUser();
  if (localUser) return localUser;

  const user = await getChatGPTUser();
  return user && isDashboardAdmin(user.email) ? user : null;
}

export async function requireDashboardApiUser() {
  const localUser = getLocalDashboardUser();
  if (localUser) return { user: localUser, error: null };

  const user = await getChatGPTUser();
  if (!user) {
    return {
      user: null,
      error: Response.json(
        { error: "Sign in is required." },
        { status: 401 },
      ),
    };
  }

  if (!isDashboardAdmin(user.email)) {
    return {
      user: null,
      error: Response.json(
        { error: "This account is not authorised for the school dashboard." },
        { status: 403 },
      ),
    };
  }

  return { user, error: null };
}
