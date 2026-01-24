//profile.ts
"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfileImage(url: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    data: { avatar_url: url },
  });
  if (error) throw error;
  revalidatePath("profile");
}
