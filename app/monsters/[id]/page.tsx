import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react"; // use は削除してOK

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MonsterDetailPage({ params }: Props) {
  // Promiseを解決してIDを取得
  const { id } = await params;

  const monster = await prisma.monster.findUnique({
    where: { id: id },
  });

  if (!monster) {
    notFound();
  }

  return (
    // ✅ 変更点1: max-w-4xl から max-w-7xl へ変更。全体の横幅をガツンと広げる。
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8">
      {/* 戻るボタン */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition group"
        >
          <ArrowLeft
            size={18}
            className="mr-1 group-hover:-translate-x-1 transition-transform"
          />
          図鑑一覧に戻る
        </Link>
      </div>

      {/* メインカード */}
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
        {/* 左側: 画像エリア */}
        {/* ✅ 変更点2: md:w-1/2 から md:w-3/5 (60%) へ変更。画像の比率を上げる。 */}
        {/* ✅ 変更点3: md:min-h-[600px] を追加。PCで見た時に高さが確保され、迫力が出る。 */}
        <div className="w-full md:w-3/5 bg-gray-100 relative aspect-square md:aspect-auto md:min-h-[600px]">
          {monster.imageUrl ? (
            <Image
              src={monster.imageUrl}
              alt={monster.name}
              fill
              className="object-contain"
              priority
              // 大きく表示されるので、画質の良い画像を要求する設定
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-300 bg-gray-50">
              No Image
            </div>
          )}
        </div>

        {/* 右側: 情報エリア */}
        {/* ✅ 変更点4: 画像を広げた分、こちらは md:w-2/5 (40%) に狭める。 */}
        <div className="p-8 md:p-12 md:w-2/5 flex flex-col justify-center bg-white/80 backdrop-blur-sm">
          <div className="mb-auto">
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
              {monster.name}
            </h1>

            <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-10 pb-6 border-b border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full">
                <Calendar size={16} className="text-blue-500" />
                <span>
                  {new Date(monster.createdAt).toLocaleDateString()} に発見
                </span>
              </div>
            </div>

            <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed whitespace-pre-wrap">
              <p>{monster.description}</p>
            </div>
          </div>

          <div className="mt-12 pt-6">
            <button className="w-full py-4 rounded-2xl bg-gray-900 text-white font-bold text-lg hover:bg-gray-800 transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <span>❤️</span> いいね！（未実装）
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
