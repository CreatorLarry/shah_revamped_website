import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type DashboardAccessMode = "supabase";

export type DashboardUser = {
  id: string;
  displayName: string;
  email: string;
  isAdmin: boolean;
};

export async function getDashboardIdentity(): Promise<DashboardUser | null> {
  if (!isSupabaseConfigured()) return null;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user?.email) return null;

  const fullName =
    typeof data.user.user_metadata?.full_name === "string"
      ? data.user.user_metadata.full_name.trim()
      : "";

  return {
    id: data.user.id,
    displayName: fullName || data.user.email.split("@")[0],
    email: data.user.email,
    isAdmin: data.user.app_metadata?.role === "admin",
  };
}

export async function requireDashboardApiUser() {
  if (!isSupabaseConfigured()) {
    return {
      user: null,
      error: Response.json(
        { error: "The dashboard database has not been configured yet." },
        { status: 503 },
      ),
    };
  }

  const user = await getDashboardIdentity();
  if (!user) {
    return {
      user: null,
      error: Response.json(
        { error: "Sign in is required." },
        { status: 401 },
      ),
    };
  }

  if (!user.isAdmin) {
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
