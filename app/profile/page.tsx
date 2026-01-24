import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import ProfileHeader from "@/app/profile/ProfileHeader";
import { Camera } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  const monsters = await prisma.monster.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const avatarUrl = user.user_metadata?.avatar_url;

  return (
    // ✅ 変更点:
    // 1. ml-64 などの余白クラスは削除 (layout.tsxに任せる)
    // 2. max-w-5xl: サイドバーがある分、少し横幅を広く取ってバランス良くする
    // 3. mx-auto: メインエリアの中で中央揃えにする
    <div className="w-full max-w-5xl mx-auto py-12 px-4 md:px-8">
      {/* プロフィールヘッダー */}
      {/* 狭くなりすぎないよう、ここは少し幅を制限しても良いが、今回は自然に任せる */}
      <div className="mb-12 px-4">
        <ProfileHeader
          userEmail={user.email}
          avatarUrl={avatarUrl}
          userId={user.id}
        />
      </div>

      {/* 区切り線 */}
      <div className="border-t border-gray-200 mb-8 mx-4"></div>

      {/* 投稿エリア */}
      {monsters.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
          <div className="p-6 rounded-full bg-white border border-gray-200 shadow-sm">
            <Camera size={48} strokeWidth={1} />
          </div>
          <div className="text-center">
            <p className="text-xl font-medium text-gray-600">写真のシェア</p>
            <p className="text-sm mt-1">
              作成したモンスターを投稿してみましょう。
            </p>
          </div>
        </div>
      ) : (
        // グリッド表示
        // サイドバーがあっても3列が綺麗に見えるように調整
        <ul className="grid grid-cols-3 gap-1 md:gap-6">
          {monsters.map((monster) => (
            <li
              key={monster.id}
              className="relative aspect-square bg-gray-200 group overflow-hidden rounded-sm md:rounded-lg cursor-pointer shadow-sm hover:shadow-md transition-all"
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
                    sizes="(max-width: 768px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-xs text-gray-400">
                    No Image
                  </div>
                )}

                {/* オーバーレイ (PCでのみホバー効果を強くする) */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                  <p className="text-white font-bold text-sm md:text-lg drop-shadow-md truncate px-2">
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
