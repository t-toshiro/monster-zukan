"use client";

import { useTransition } from "react";
import { deleteMonster } from "../actions/monsters";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

export default function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = async () => {
    const confirmed = window.confirm("本当に削除しますか？");
    if (!confirmed) return;
    startTransition(async () => {
      try {
        await deleteMonster(id);
        toast.success("削除しました");
      } catch (error) {
        toast.error("削除に失敗しました");
      }
    });
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className={`
        p-3 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-600 transition
        ${isPending ? "opacity-50 cursor-not-allowed" : ""}
      `}
      title="削除する"
    >
      <Trash2 size={20} />
    </button>
  );
}
