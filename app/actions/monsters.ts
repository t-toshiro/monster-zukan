"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createMonster(formData: FormData) {
  //ユーザーチェック
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");
  // フォームから値を取り出す
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;

  //DBに登録
  await prisma.monster.create({
    data: {
      name,
      description,
      imageUrl,
      userId: user.id,
    },
  });
  redirect("/");
}
