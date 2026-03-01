import { useState, useTransition } from "react";
import { start } from "repl";
import { toggleLike } from "../actions/monsters";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

type Props = {
  monsterId: string;
  initialLikesCount: number;
  initialIsLiked: boolean;
};

export default function LikeButton({
  monsterId,
  initialLikesCount,
  initialIsLiked,
}: Props) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikeCount] = useState(initialLikesCount);

  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likesCount - 1 : likesCount + 1);

    startTransition(async () => {
      try {
        await toggleLike(monsterId);
      } catch (error) {
        setIsLiked(!isLiked);
        setLikeCount(isLiked ? likesCount + 1 : likesCount - 1);
        toast.error("いいねに失敗しました");
      }
    });
  };
  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`
        flex-1 py-4 rounded-2xl font-bold text-lg transition shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center gap-2
        ${
          isLiked
            ? "bg-pink-50 text-pink-600 border border-pink-200" // いいね済みの時のデザイン
            : "bg-gray-900 text-white hover:bg-gray-800" // まだいいねしてない時のデザイン
        }
      `}
    >
      <Heart
        size={24}
        className={isLiked ? "fill-pink-500 text-pink-500" : "text-white"}
      />
      <span>{likesCount} いいね！</span>
    </button>
  );
}
