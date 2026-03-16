// app/create/page.tsx
"use client";

import { toast } from "react-hot-toast";
import { useState } from "react";
import useCreateMonster from "../hooks/useCreateMonster";
import ImagePicker from "../components/ImagePicker";

export default function CreatePage() {
  // 画像のURLを保存しておく場所

  const [file, setFile] = useState<File | null>(null);
  const onImageSelect = (compressedFile: File | null) => {
    setFile(compressedFile);
  };
  const { uploadMonster, isUploading } = useCreateMonster();
  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return toast.error("画像を選択してください");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    uploadMonster(file, name, description);
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        モンスターを投稿
      </h1>
      <div className="mb-8">
        <label className="block font-bold mb-2 text-gray-700">画像</label>
        <ImagePicker onImageSelect={onImageSelect} />
      </div>
      <form onSubmit={handleUpload} className="space-y-4">
        <div>
          <label htmlFor="name" className="block font-bold mb-1 text-gray-700">
            モンスターの名前
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="w-full border rounded px-3 py-2 bg-gray-50"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-bold mb-1 text-gray-700"
          >
            特徴
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="w-full border rounded px-3 py-2 bg-gray-50"
          />
        </div>

        <button
          type="submit"
          disabled={!file || isUploading}
          className={`w-full font-bold py-3 rounded transition text-white ${
            !file || isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isUploading ? "登録中..." : "図鑑に登録する"}
        </button>
      </form>
    </div>
  );
}
