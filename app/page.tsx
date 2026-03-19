import { getMonsters } from "@/app/actions/monsters";
import MonsterInfiniteList from "@/app/components/MonsterInfiniteList";

export const revalidate = 0;

export default async function HomePage() {
  const pageSize = 12;
  const monsters = await getMonsters(1, pageSize);
  const listKey = monsters.length > 0 ? monsters.length : "empty";

  return (
    <div>
      {monsters.length === 0 && (
        <div className="text-center text-gray-500 py-20">
          <p>まだ投稿がありません。</p>
          <p>左のメニューの「作成」から投稿してみよう！</p>
        </div>
      )}

      <MonsterInfiniteList key={listKey} initialMonsters={monsters} />
    </div>
  );
}
