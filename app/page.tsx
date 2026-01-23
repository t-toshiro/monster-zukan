import { prisma } from "@/lib/prisma";
import Image from "next/image";

export const revalidate = 0;

export default async function HomePage() {
  const monsters = await prisma.monster.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    // サイドバーが白いので、コンテンツエリアも背景を馴染ませるか、少しグレーにする
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* ユーザーがいなければ案内 */}
      {monsters.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          <p>まだ投稿がありません。</p>
          <p>左のメニューの「作成」から投稿してみよう！</p>
        </div>
      )}

      {/* グリッド表示 */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1">
        {monsters.map((monster) => (
          <li
            key={monster.id}
            className="relative aspect-square bg-gray-200 group overflow-hidden"
          >
            {monster.imageUrl ? (
              <Image
                src={monster.imageUrl}
                alt={monster.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                No Image
              </div>
            )}

            {/* ホバー時に名前が出るエフェクト（お好みで） */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-bold">{monster.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
