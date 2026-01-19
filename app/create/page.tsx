"use client";

import { useState } from "react";
import { addMonster } from "@/app/actions/monsters";
import ImageUploader from "@/app/components/ImageUploader";
import { useRouter } from "next/navigation";

export default function AddMonsterPage() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState("");
  // ローディング状態も作っておくと親切です
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUploadComplete = (url: string) => {
    setImageUrl(url);
  };

  // 変更点: "action" ではなく "onSubmit" 用の関数にします
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 1. ブラウザの標準動作（再読み込み）を止める
    e.preventDefault();

    // 2. ログ確認
    console.log("👆 登録ボタンが押されました！(onSubmit発火)");

    if (!imageUrl) {
      alert("画像をアップロードしてください！");
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. フォームのデータを自分で吸い出す
      const formData = new FormData(e.currentTarget);

      console.log("🚀 Server Action を呼び出します...");

      // 4. サーバーアクション実行
      await addMonster(formData, imageUrl);

      console.log("✅ 成功！");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("💥 エラー:", error);
      alert("登録に失敗しました");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">モンスター登録</h1>

      <div className="mb-6">
        <label className="block mb-2 font-bold">モンスター画像</label>
        <ImageUploader onUploadComplete={handleUploadComplete} />
      </div>

      {/* 👇 ここを変更しました！ action={...} ではなく onSubmit={...} */}
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-bold">名前</label>
          <input
            name="name"
            required
            className="w-full border p-2 rounded"
            placeholder="例: ピカチュウ"
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">タイプ</label>
          <select name="type" className="w-full border p-2 rounded">
            <option value="UNKNOWN">不明</option>
            <option value="FIRE">ほのお</option>
            <option value="WATER">みず</option>
            <option value="GRASS">くさ</option>
            <option value="LIGHT">ひかり</option>
            <option value="DARK">やみ</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-bold">HP</label>
          <input
            name="hp"
            type="number"
            className="w-full border p-2 rounded"
            placeholder="例: 100"
          />
        </div>

        <div>
          <label className="block mb-1 font-bold">説明文</label>
          <textarea
            name="description"
            required
            className="w-full border p-2 rounded h-24"
            placeholder="どんなモンスター？"
          />
        </div>

        <button
          type="submit"
          // 連打防止機能もつけました
          disabled={!imageUrl || isSubmitting}
          className="w-full bg-red-600 text-white font-bold py-3 rounded hover:bg-red-700 disabled:opacity-50"
        >
          {isSubmitting ? "登録中..." : "図鑑に登録する！"}
        </button>
      </form>
    </div>
  );
}
