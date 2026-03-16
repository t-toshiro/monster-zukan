"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getMonsters } from "@/app/actions/monsters";
import { Monster } from "@/generated/prisma/client";

type Props = {
  initialMonsters: Monster[];
};

export default function MonsterInfiniteList({ initialMonsters }: Props) {
  const blurDataUrl =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mO88B8AAqUB0Y/O2fQAAAAASUVORK5CYII=";
  const [monsters, setMonsters] = useState<Monster[]>(initialMonsters);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialMonsters.length >= 12);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const nextPage = page + 1;
    const pageSize = 12;
    try {
      const newMonsters = await getMonsters(nextPage, pageSize);
      if (newMonsters.length < pageSize) {
        setHasMore(false);
      }
      setMonsters((prev) => [...prev, ...newMonsters]);
      setPage(nextPage);
    } catch (error) {
      console.error("Error loading more monsters:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
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
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-white font-bold">{monster.name}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {hasMore && (
        <div className="flex justify-center pb-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="px-6 py-3 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "読み込み中..." : "もっと見る"}
          </button>
        </div>
      )}
    </div>
  );
}
