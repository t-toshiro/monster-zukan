"use server";
import { createClient } from "@/utils/supabase/server";
import { create } from "domain";
import { createLocalRequestContext } from "next/dist/server/after/builtin-request-context";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return redirect("/login?message=LoginFailed");
  }
  return redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) {
    return redirect("/signup?message=Error");
  }
  return redirect("/signup?message=CheckEmail");
}
