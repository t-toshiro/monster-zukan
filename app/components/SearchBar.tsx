"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    // 入力されたキーワードをURLに付けて、検索ページへ遷移する
    router.push(`/search?q=${encodeURIComponent(keyword)}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center w-full max-w-lg mx-auto bg-gray-100 rounded-lg px-3 py-2.5 transition-colors focus-within:bg-white focus-within:ring-1 focus-within:ring-gray-300 shadow-sm"
    >
      <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 ml-1" />
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="検索"
        className="flex-1 bg-transparent ml-2 text-gray-900 placeholder-gray-500 focus:outline-none text-sm sm:text-base w-full"
      />
      <button type="submit" className="hidden">
        検索
      </button>
    </form>
  );
}
