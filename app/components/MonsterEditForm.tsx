// app/components/MonsterEditForm.tsx
"use client";

import toast from "react-hot-toast";
import { updataMonster } from "../actions/monsters";
import { useTransition } from "react";
import { Attribute, Rarity } from "@/generated/prisma/enums";

type Props = {
  monster: {
    id: string;
    name: string;
    description: string;
    attribute: Attribute;
    rarity: Rarity;
  };
  onCancel: () => void;
};

export default function MonsterEditForm({ monster, onCancel }: Props) {
  const [isPending, startTransition] = useTransition();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await updataMonster(monster.id, formData);
        toast.success("更新しました");
        onCancel();
      } catch (error) {
        toast.error("更新に失敗しました");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          名前
        </label>
        <input
          type="text"
          name="name"
          defaultValue={monster.name}
          required
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div className="mb-4 grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            属性
          </label>
          <select
            name="attribute"
            defaultValue={monster.attribute}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
          >
            <option value="NORMAL">ノーマル</option>
            <option value="FIRE">炎</option>
            <option value="WATER">水</option>
            <option value="GRASS">草</option>
            <option value="ELECTRIC">雷</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            レア度
          </label>
          <select
            name="rarity"
            defaultValue={monster.rarity}
            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
          >
            <option value="STAR_1">★1</option>
            <option value="STAR_2">★2</option>
            <option value="STAR_3">★3</option>
            <option value="STAR_4">★4</option>
            <option value="STAR_5">★5</option>
          </select>
        </div>
      </div>

      <div className="mb-auto">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          説明
        </label>
        <textarea
          name="description"
          defaultValue={monster.description}
          required
          rows={5}
          className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
        />
      </div>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isPending ? "保存中..." : "保存する"}
        </button>
      </div>
    </form>
  );
}
