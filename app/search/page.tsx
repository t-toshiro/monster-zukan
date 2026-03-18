import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/app/components/SearchBar";
import { Attribute, Rarity } from "@/generated/prisma/enums";
import { vectorSearchMonster } from "../actions/monsters";

type Props = {
  searchParams: Promise<{
    mode?: "normal" | "ai";
    q?: string;
    attr?: string;
    rarity?: string;
  }>;
};

export default async function SearchPage({ searchParams }: Props) {
  // URLのパラメータを取得
  const params = await searchParams;
  const mode = (params.mode as "normal" | "ai") || "normal";
  const keyword = params.q || "";
  const attrStr = params.attr;
  const rarityStr = params.rarity;

  let monsters: any[] = [];

  if (mode === "ai" && keyword) {
    monsters = await vectorSearchMonster(keyword);
  } else if (mode === "normal") {
    // 通常検索モード
    const whereClause: any = {};

    if (keyword) {
      whereClause.OR = [
        {
          name: {
            contains: keyword,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: keyword,
            mode: "insensitive",
          },
        },
      ];
    }

    if (attrStr) {
      whereClause.attribute = attrStr as Attribute;
    }

    if (rarityStr) {
      whereClause.rarity = rarityStr as Rarity;
    }

    monsters = await prisma.monster.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
    });
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 md:py-12">
      {/* 検索バー */}
      <div className="mb-8">
        <SearchBar />
      </div>

      {(keyword || attrStr || rarityStr) && (
        <div className="text-center text-sm text-gray-500 mb-8 font-medium">
          {mode === "ai" ? "AI検索結果" : "検索結果"} ({monsters.length}件)
        </div>
      )}

      {monsters.length === 0 ? (
        <div className="text-center text-gray-400 py-20 text-sm md:text-base">
          条件に一致するモンスターが見つかりませんでした。
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
