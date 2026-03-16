"use client";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import { createMonster } from "../actions/monsters";
import { useRouter } from "next/navigation";

export default function useCreateMonster() {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const uploadMonster = async (
    file: File,
    name: string,
    description: string,
  ) => {
    setIsUploading(true);
    const loadingToastId = toast.loading("アップロード中...");
    try {
      const supabase = createClient();
      //ファイル名の被り対策
      const fileExt = file?.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const filePath = `monsters/${user?.id}/${fileName}`;

      //storageへアップロード
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      //strogeにアップロードした画像の取得のためのURL（公開URL）を親に送信
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("imageUrl", publicUrl);
      await createMonster(formData);

      toast.success("アップロード完了！", { id: loadingToastId });
      router.push("/");
      //エラー処理
    } catch (error: any) {
      toast.error("失敗しました: " + error.message, { id: loadingToastId });
    } finally {
      setIsUploading(false);
    }
  };
  return { uploadMonster, isUploading };
}
