// components/MonsterDetail.tsx
import Image from "next/image";
import { Calendar } from "lucide-react";

type Props = {
  monster: {
    name: string;
    imageUrl: string | null;
    createdAt: Date;
    description: string;
  };
};

export default function MonsterDetail({ monster }: Props) {
  return (
    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 h-full">
      {/* 左側: 画像エリア */}
      <div className="w-full md:w-3/5 bg-gray-100 relative aspect-square md:aspect-auto md:min-h-150">
        {monster.imageUrl ? (
          <Image
            src={monster.imageUrl}
            alt={monster.name}
            fill
            className="object-contain"
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-300 bg-gray-50">
            No Image
          </div>
        )}
      </div>

      {/* 右側: 情報エリア */}
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
  );
}
