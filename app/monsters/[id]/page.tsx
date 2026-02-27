import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react"; // use は削除してOK
import MonsterDetail from "@/app/components/MonsterDetail";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MonsterDetailPage({ params }: Props) {
  // Promiseを解決してIDを取得
  const { id } = await params;

  const monster = await prisma.monster.findUnique({
    where: { id: id },
  });

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

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

      <MonsterDetail monster={monster} currentUserId={user?.id} />
    </div>
  );
}
