import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import MonsterDetail from "@/app/components/MonsterDetail";
import Modal from "@/app/components/Modal";
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
    <Modal>
      <MonsterDetail monster={monster} currentUserId={user?.id} />
    </Modal>
  );
}
