import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/app/components/SearchBar";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  // URLの "?q=キーワード" を取得
  const params = await searchParams;
  const keyword = params.q || "";

  // Prismaで検索（名前、または説明文にキーワードが含まれるものを探す）
  const monsters = await prisma.monster.findMany({
    where: {
      OR: [
        {
          name: {
            contains: keyword,
            mode: "insensitive", // 大文字・小文字を区別しない
          },
        },
        {
          description: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 md:py-12">
      {/* 検索バー */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {keyword && (
        <div className="text-center text-sm text-gray-500 mb-8 font-medium">
          「{keyword}」の検索結果 ({monsters.length}件)
        </div>
      )}

      {monsters.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-sm md:text-base">
          モンスターが見つかりませんでした。
        </div>
      ) : (
        <ul className="grid grid-cols-3 gap-1">
          {monsters.map((monster) => (
            <li
              key={monster.id}
              className="relative aspect-square bg-gray-200 group overflow-hidden"
            >
              <Link
                href={`/monsters/${monster.id}`}
                className="block w-full h-full"
              >
                {monster.imageUrl ? (
                  <Image
                    src={monster.imageUrl}
                    alt={monster.name}
                    fill
                    sizes="(max-width: 768px) 33vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400 text-xs md:text-sm">
                    No Image
                  </div>
                )}

                {/* ホバー時に名前が出るエフェクト */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2">
                  <p className="text-white font-bold text-xs md:text-base text-center line-clamp-2">
                    {monster.name}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
