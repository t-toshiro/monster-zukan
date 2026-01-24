// app/create/page.tsx
"use client";

import { createMonster } from "@/app/actions/monsters";
import ImageUploader from "@/app/components/ImageUploader";
import { useState } from "react";

export default function CreatePage() {
  // 画像のURLを保存しておく場所
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        モンスターを投稿
      </h1>

      {/* 1. まず画像をアップロードしてもらう */}
      <div className="mb-8">
        <label className="block font-bold mb-2 text-gray-700">
          ① 画像をアップロード
        </label>
        {/* 子コンポーネントに「終わったらこの関数呼んでね」と依頼する */}
        <ImageUploader onUploadComplete={(url) => setImageUrl(url)} />
      </div>

      {/* 2. 画像URLがセットされたらフォームへの入力を許可する（任意） */}
      {imageUrl && (
        <p className="text-green-600 font-bold mb-4">
          ✅ 画像の準備完了！残りの情報を入力してください。
        </p>
      )}

      {/* 3. メインの入力フォーム */}
      {/* action={createMonster} でサーバー側のアクションを呼び出す */}
      <form action={createMonster} className="space-y-4">
        {/* ★重要：アップロードされた画像のURLをこっそりサーバーに送る仕掛け */}
        {/* ユーザーには見えないが、送信時に 'imagePath' という名前でデータが送られる */}
        <input type="hidden" name="imageUrl" value={imageUrl} />

        <div>
          <label htmlFor="name" className="block font-bold mb-1 text-gray-700">
            ② モンスターの名前
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="例：ドラゴン"
            className="w-full border rounded px-3 py-2 bg-gray-50"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block font-bold mb-1 text-gray-700"
          >
            ③ 説明文
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            placeholder="どんなモンスター？"
            className="w-full border rounded px-3 py-2 bg-gray-50"
          />
        </div>

        {/* 画像がないときはボタンを押せないようにする */}
        <button
          type="submit"
          disabled={!imageUrl}
          className={`w-full font-bold py-3 rounded transition text-white ${
            imageUrl
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          図鑑に登録する
        </button>
      </form>
    </div>
  );
}
