"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = safeNextPath(String(formData.get("next") ?? "/dashboard"));

  if (!email || !password) {
    redirect(loginErrorPath("Enter your email address and password.", next));
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(loginErrorPath("The email address or password is incorrect.", next));
  }

  revalidatePath("/", "layout");
  redirect(next);
}

function loginErrorPath(message: string, next: string) {
  const params = new URLSearchParams({ error: message, next });
  return `/login?${params.toString()}`;
}

function safeNextPath(value: string) {
  if (!value.startsWith("/") || value.startsWith("//")) return "/dashboard";
  return value;
}
