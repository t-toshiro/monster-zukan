// app/components/SearchBar.tsx
"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Sparkles } from "lucide-react";

function SearchBarInner() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. URLから現在の状態を取得
  const searchMode = (searchParams.get("mode") as "normal" | "ai") || "normal";
  
  // 2. 入力欄の状態 (URLと同期させるが、タイピング中はローカルStateで管理)
  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [attribute, setAttribute] = useState(searchParams.get("attr") || "");
  const [rarity, setRarity] = useState(searchParams.get("rarity") || "");

  // URL（検索結果）が変わった際に、入力欄をURLの状態に同期させる
  useEffect(() => {
    setKeyword(searchParams.get("q") || "");
    setAttribute(searchParams.get("attr") || "");
    setRarity(searchParams.get("rarity") || "");
  }, [searchParams]);

  const handleModeChange = (mode: "normal" | "ai") => {
    if (mode === searchMode) return;
    
    // モード切り替え = リセット
    // 他のクエリパラメータを破棄して、新しいモードの初期状態で遷移
    router.push(`/search?mode=${mode}`);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    params.append("mode", searchMode);
    
    if (keyword.trim()) params.append("q", keyword.trim());
    if (attribute) params.append("attr", attribute);
    if (rarity) params.append("rarity", rarity);

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl mx-auto">
      {/* モード切り替えトグル */}
      <div className="flex justify-center bg-gray-100 p-1 rounded-lg w-fit mx-auto">
        <button
          type="button"
          onClick={() => handleModeChange("normal")}
          className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors ${
            searchMode === "normal"
              ? "bg-white text-gray-900 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          通常検索
        </button>
        <button
          type="button"
          onClick={() => handleModeChange("ai")}
          className={`px-4 py-1.5 text-sm font-bold rounded-md transition-colors flex items-center gap-1 ${
            searchMode === "ai"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Sparkles
            size={14}
            className={searchMode === "ai" ? "text-yellow-300" : ""}
          />
          AI検索
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex flex-col gap-3">
        {/* 検索バー */}
        <div
          className={`flex items-center w-full rounded-lg px-3 py-2.5 transition-colors focus-within:ring-1 shadow-sm border ${
            searchMode === "ai"
              ? "bg-blue-50 border-blue-200 focus-within:ring-blue-400 focus-within:bg-white"
              : "bg-gray-100 border-transparent focus-within:bg-white focus-within:ring-gray-300"
          }`}
        >
          {searchMode === "ai" ? (
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0 ml-1" />
          ) : (
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-1" />
          )}
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder={
              searchMode === "ai"
                ? "例：燃えているかっこいいドラゴン"
                : "キーワードで検索"
            }
            className="flex-1 bg-transparent ml-2 text-gray-900 placeholder-gray-500 focus:outline-none text-sm sm:text-base w-full"
          />
          <button type="submit" className="hidden">
            検索
          </button>
        </div>

        {/* 絞り込みプルダウン */}
        <div className="flex gap-3">
          <select
            value={attribute}
            onChange={(e) => setAttribute(e.target.value)}
            disabled={searchMode === "ai"}
            className={`flex-1 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition-colors ${
              searchMode === "ai" ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-50 border-gray-200 text-gray-700"
            }`}
          >
            <option value="">すべての属性</option>
            <option value="NORMAL">ノーマル</option>
            <option value="FIRE">炎</option>
            <option value="WATER">水</option>
            <option value="GRASS">草</option>
            <option value="ELECTRIC">雷</option>
          </select>

          <select
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            disabled={searchMode === "ai"}
            className={`flex-1 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none transition-colors ${
               searchMode === "ai" ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-50 border-gray-200 text-gray-700"
            }`}
          >
            <option value="">すべてのレア度</option>
            <option value="STAR_1">★1</option>
            <option value="STAR_2">★2</option>
            <option value="STAR_3">★3</option>
            <option value="STAR_4">★4</option>
            <option value="STAR_5">★5</option>
          </select>

          <button
            type="submit"
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors whitespace-nowrap"
          >
            検索
          </button>
        </div>
      </form>
    </div>
  );
}

export default function SearchBar() {
  return (
    <Suspense fallback={<div className="h-20 w-full animate-pulse bg-gray-100 rounded-lg" />}>
      <SearchBarInner />
    </Suspense>
  );
}
