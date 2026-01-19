// app/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function addMonster(formData: FormData, imageUrl: string) {
  console.log("🚀 Server Action: addMonster が呼び出されました！");

  try {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    // 数値変換がうまくいっているか確認
    const hpString = formData.get("hp") as string;
    const hp = hpString ? parseInt(hpString) : null;
    const type = formData.get("type") as string;

    console.log("📝 受け取ったデータ:", { name, type, hp, imageUrl });

    // 1. ログイン中のユーザーを取得
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
        },
      }
    );

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      console.error("❌ 認証エラー: ユーザーが見つかりません", authError);
      throw new Error("ログインしていません");
    }

    console.log("👤 ログインユーザーID:", user.id);

    // 2. データベースに保存
    console.log("💾 データベースに保存を開始します...");

    await prisma.monster.create({
      data: {
        name,
        description,
        imageUrl,
        hp,
        type: type as any, // ここは念の為 any にしておきます
        userId: user.id,
      },
    });

    console.log("✅ 保存成功！トップページにリダイレクトします");
  } catch (error) {
    // ここでエラーの正体がわかります
    console.error("💥 エラー発生！！！！！");
    console.error(error);
    return; // エラー時はリダイレクトさせない
  }
}
