"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addComment(monsterId: string, formData: FormData) {
  const content = formData.get("content") as string;
  if (!content || content.trim() === "") return;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");
  try {
    await prisma.comment.create({
      data: {
        monsterId,
        content,
        userId: user.id,
      },
    });
  } catch (error) {
    console.log("コメントの追加に失敗しました。");
    throw new Error("コメントの追加に失敗しました。");
  }
  revalidatePath("/");
  revalidatePath(`/monsters/${monsterId}`);
}
