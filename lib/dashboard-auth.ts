import { getChatGPTUser, type ChatGPTUser } from "@/app/chatgpt-auth";

export function isDashboardAdmin(email: string): boolean {
  const normalisedEmail = email.trim().toLowerCase();
  const approvedAdmins = (process.env.DASHBOARD_ALLOWED_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);

  return approvedAdmins.includes(normalisedEmail);
}

export async function getDashboardUser(): Promise<ChatGPTUser | null> {
  const user = await getChatGPTUser();
  return user && isDashboardAdmin(user.email) ? user : null;
}

export async function requireDashboardApiUser() {
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
