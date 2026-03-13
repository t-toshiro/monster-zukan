// components/MonsterDetail.tsx
"use client";
import Image from "next/image";
import { Calendar } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import MonsterEditForm from "./MonsterEditForm";
import LikeButton from "./LikeButton";
import CommentList from "./CommentList";
import { Comment } from "@/generated/prisma/client";
import CommentForm from "./CommentForm";

type Props = {
  monster: {
    userId: string;
    id: string;
    name: string;
    imageUrl: string | null;
    createdAt: Date;
    description: string;
    likes: { userId: string }[];
    comments: Comment[];
  };
  currentUserId: string | undefined;
};

export default function MonsterDetail({ monster, currentUserId }: Props) {
  const [isEditing, setEditing] = useState(false);
  const likesCount = monster.likes.length;
  const isLikedByMe = currentUserId
    ? monster.likes.some((like) => like.userId === currentUserId)
    : false;

  return (
    <div className="flex flex-col md:flex-row w-full h-full bg-white">
      {/* 左側: 画像エリア (Instagram風の黒背景で中央配置) */}
      <div className="w-full md:flex-1 bg-black relative flex items-center justify-center min-h-[50vh] md:min-h-0 border-r border-gray-100">
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
          <div className="flex items-center justify-center h-full text-gray-400 bg-gray-900 w-full">
            No Image
          </div>
        )}
      </div>

      {/* 右側: 情報エリア（Instagram風レイアウト・固定幅） */}
      <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col bg-white shrink-0 h-full">
        {isEditing ? (
          <div className="p-8 overflow-y-auto">
            <MonsterEditForm
              monster={monster}
              onCancel={() => setEditing(false)}
            />
          </div>
        ) : (
          <>
            {/* 上部: スクロール可能なエリア（説明文 ＋ コメント一覧） */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin scrollbar-thumb-gray-200">
              {/* モンスター名と日付 */}
              <div className="mb-6 pb-4 border-b border-gray-100">
                <h1 className="text-3xl font-black text-gray-900 mb-2 leading-tight">
                  {monster.name}
                </h1>
                <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                  <Calendar size={14} />
                  <span>
                    {new Date(monster.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* 説明文 */}
              <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap mb-8">
                <p>{monster.description}</p>
              </div>

              {/* コメント一覧 */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <CommentList comments={monster.comments || []} />
              </div>
            </div>

            {/* 下部: 固定エリア（いいね ＋ コメント入力） */}
            <div className="p-4 md:p-6 border-t border-gray-100 bg-white">
              <div className="flex items-center justify-between mb-4">
                <LikeButton
                  monsterId={monster.id}
                  initialLikesCount={likesCount}
                  initialIsLiked={isLikedByMe}
                />

                {/* 自分の投稿の場合の操作ボタン */}
                {monster.userId === currentUserId && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setEditing(true)}
                      className="p-2 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      title="編集"
                    >
                      ✏️
                    </button>
                    <DeleteButton id={monster.id} />
                  </div>
                )}
              </div>

              {/* コメント入力フォーム */}
              <div className="mt-2">
                <CommentForm monsterId={monster.id} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
