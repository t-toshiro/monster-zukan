// components/ImageUploader.tsx
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuidv4 } from "uuid"; // ファイル名が被らないようにするツール

// 親（呼び出し元）にURLを渡すための設定
type Props = {
  onUploadComplete: (url: string) => void;
};

export default function ImageUploader({ onUploadComplete }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // 1. ファイルが選択された時の処理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      // プレビュー用にURLを一時作成
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  // 2. アップロードボタンが押された時の処理
  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);

    try {
      const supabase = createClient();

      // ファイル名をランダムにする（被り防止）
      // 例: "monster-1234-5678.png"
      const fileExt = file.name.split(".").pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Supabaseにアップロード！
      const { error: uploadError } = await supabase.storage
        .from("monsters") // 👈 作ったバケット名
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // アップロード成功したら、公開用URLを取得
      const { data } = supabase.storage.from("monsters").getPublicUrl(filePath);

      // 親コンポーネントにURLを渡す
      onUploadComplete(data.publicUrl);
      alert("アップロード完了！");
    } catch (error: any) {
      alert("アップロード失敗: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="border p-4 rounded bg-gray-50">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />

      {/* プレビュー表示エリア */}
      {previewUrl && (
        <div className="mb-4">
          <img
            src={previewUrl}
            alt="プレビュー"
            className="w-32 h-32 object-cover rounded border"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
      >
        {uploading ? "アップロード中..." : "画像を決定"}
      </button>
    </div>
  );
}
