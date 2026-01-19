// actions/auth.ts
"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server"; // ※Supabaseのサーバー用クライアント作成関数
import { headers } from "next/headers";

// ログイン処理
export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // エラーならリダイレクトしてエラー表示（例）
    return redirect("/login?message=Could not authenticate user");
  }

  // 成功したらトップページへ
  return redirect("/");
}

// サインアップ処理
export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${(await headers()).get("origin")}/auth/callback`,
    },
  });

  if (error) {
    return redirect("/login?message=Could not authenticate user");
  }

  return redirect("/login?message=Check email to continue sign in process");
}

// ログアウト処理
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}
