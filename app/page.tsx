import { getMonsters } from "@/app/actions/monsters";
import MonsterInfiniteList from "@/app/components/MonsterInfiniteList";

export const revalidate = 0;

export default async function HomePage() {
  const pageSize = 12;
  const monsters = await getMonsters(1, pageSize);
  const listKey = monsters.length > 0 ? monsters.length : "empty";

  return (
    <div className="max-w-4xl mx-auto px-8 py-12">
      {/* ユーザーがいなければ案内 */}
      {monsters.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          <p>まだ投稿がありません。</p>
          <p>左のメニューの「作成」から投稿してみよう！</p>
        </div>
      )}

      {/* 無限スクロール・もっと見るリスト */}
      <MonsterInfiniteList key={listKey} initialMonsters={monsters} />
    </div>
  );
}
