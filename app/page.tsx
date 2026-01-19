// app/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// サーバーコンポーネントなので async をつけます
export default async function HomePage() {
  // 1. データベースからモンスターを全部とってくる
  // (orderBy: { createdAt: 'desc' } で、新しい順に並べ替え)
  const monsters = await prisma.monster.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">🦕 モンスター図鑑</h1>

        {/* 登録画面へのボタン */}
        <Link
          href="/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-bold shadow"
        >
          + 新しいモンスターを発見
        </Link>
      </div>

      {/* 2. モンスターが0匹のときの表示 */}
      {monsters.length === 0 && (
        <div className="text-center py-20 bg-gray-100 rounded-lg">
          <p className="text-xl text-gray-500 mb-4">
            まだモンスターがいません...
          </p>
          <p>右上のボタンから最初の1匹を登録しよう！</p>
        </div>
      )}

      {/* 3. モンスター一覧を表示 (グリッドレイアウト) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {monsters.map((monster) => (
          <div
            key={monster.id}
            className="border rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition"
          >
            {/* 画像 */}
            <div className="h-48 overflow-hidden bg-gray-200">
              <img
                src={monster.imageUrl}
                alt={monster.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* 詳細情報 */}
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold">{monster.name}</h2>
                <span className="text-sm bg-gray-200 px-2 py-1 rounded">
                  {monster.type || "不明"}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {monster.description}
              </p>

              <div className="flex justify-between text-sm text-gray-500">
                <span>HP: {monster.hp || "?"}</span>
                {/* 詳細ページへのリンク（まだ作ってませんが、後で作れます）
                   <Link href={`/monsters/${monster.id}`}>詳細を見る</Link> 
                */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
