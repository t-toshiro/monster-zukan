"use server";

import { prisma } from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

  try {
    //DBに登録
    await prisma.monster.create({
      data: {
        name,
        description,
        imageUrl,
        userId: user.id,
      },
    });
  } catch (error) {
    console.error("モンスターの登録に失敗しました。", error);
    throw new Error("モンスターの登録に失敗しました。");
  }
  redirect("/");
}

export async function deleteMonster(id: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  try {
    const monster = await prisma.monster.findUnique({
      where: { id },
    });
    if (monster?.userId !== user.id) {
      throw new Error("削除する権限がありません");
    }

    await prisma.monster.delete({ where: { id } });
    revalidatePath("/");
  } catch (error) {
    console.error("モンスターの削除に失敗しました。", error);
    throw new Error("モンスターの削除に失敗しました。");
  }
}

export async function updataMonster(id: string, formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  try {
    const monster = await prisma.monster.findUnique({
      where: { id },
    });
    if (monster?.userId !== user.id) {
      throw new Error("更新する権限がありません");
    }

    await prisma.monster.update({
      where: { id },
      data: { name, description },
    });
    revalidatePath("/");
  } catch (error) {
    console.error("モンスターの更新に失敗しました。", error);
    throw new Error("モンスターの更新に失敗しました。");
  }
}

export async function toggleLike(monsterId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  try {
    const existingLike = await prisma.like.findFirst({
      where: {
        monsterId: monsterId,
        userId: user.id,
      },
    });
    if (existingLike) {
      await prisma.like.delete({
        where: { id: existingLike.id },
      });
    } else {
      await prisma.like.create({
        data: {
          monsterId: monsterId,
          userId: user.id,
        },
      });
    }
    revalidatePath("/");
    revalidatePath(`/monsters/${monsterId}`);
  } catch (error) {
    console.error("いいねの登録に失敗しました。", error);
    throw new Error("いいねの登録に失敗しました。");
  }
}
