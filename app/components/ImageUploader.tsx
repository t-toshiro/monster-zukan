"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-hot-toast";

type Props = {
  onUploadComplete: (url: string) => void;
  folderPath?: string;
};
export default function ImageUploader({
  onUploadComplete,
  folderPath = "monsters",
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  //入力受け取り
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("画像ファイルを選択してください");
        return;
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };
  //アップロード
  const handleUpload = async () => {
    if (!file) {
      toast.error("ファイルが選択されていません");
      return;
    }
    setUploading(true);
    const loadingToastId = toast.loading("アップロード中...");
    try {
      const supabase = createClient();
      //ファイル名の被り対策
      const fileExt = file?.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const filePath = `${folderPath}/${user?.id}/${fileName}`;

      //storageへアップロード
      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      //strogeにアップロードした画像の取得のためのURL（公開URL）を親に送信
      const {
        data: { publicUrl },
      } = supabase.storage.from("images").getPublicUrl(filePath);
      onUploadComplete(publicUrl);
      toast.success("アップロード完了！", { id: loadingToastId });

      //エラー処理
    } catch (error: any) {
      toast.error("失敗しました: " + error.message, { id: loadingToastId });
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* デザインを少し調整: inputをそのまま表示するか、labelで隠すかはお好みで */}
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm text-gray-500"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="プレビュー"
          className="w-32 h-32 object-cover rounded-full border shadow-sm" // アイコン用に丸くしても良いかも
        />
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 disabled:opacity-50 transition w-full"
      >
        {uploading ? "送信中..." : "アップロードする"}
      </button>
    </div>
  );
}
