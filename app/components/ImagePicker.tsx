"use client";

import imageCompression from "browser-image-compression";
import { useState } from "react";
import { toast } from "react-hot-toast";

type Props = {
  onImageSelect: (file: File | null) => void;
  folderPath?: string;
};
export default function ImagePicker({ onImageSelect }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);

  //入力受け取り
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("画像ファイルを選択してください");
        return;
      }
      //   setFile(selectedFile);
      setIsCompressing(true);
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(selectedFile, options);
        setPreviewUrl(URL.createObjectURL(compressedFile));
        onImageSelect(compressedFile);
      } catch (error) {
        console.error("画像の圧縮に失敗しました", error);
        toast.error("画像の処理に失敗しました");
        onImageSelect(null);
      } finally {
        setIsCompressing(false);
      }
    }
  };
  //アップロード

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <input
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        disabled={isCompressing}
        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 text-sm text-gray-500"
      />

      {previewUrl && (
        <img
          src={previewUrl}
          alt="プレビュー"
          className="w-32 h-32 object-cover rounded-full border shadow-sm"
        />
      )}
    </div>
  );
}
