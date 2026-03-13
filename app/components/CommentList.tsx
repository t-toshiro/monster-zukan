import type { Comment } from "@/generated/prisma/client";

type Props = { comments: Comment[] };

export default function CommentList({ comments }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {comments?.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          まだコメントがありません
        </p>
      ) : (
        comments?.map((comment) => (
          <div key={comment.id} className="flex flex-col text-sm">
            <div className="flex gap-2">
              {/* Instagram風に「ユーザー名(今回はIDの一部) コメント内容」を並べる */}
              <span className="font-bold text-gray-900 shrink-0">
                {comment.userId.slice(0, 8)}
              </span>
              <span className="text-gray-800 break-words">
                {comment.content}
              </span>
            </div>
            {/* 投稿日時 */}
            <span className="text-[10px] text-gray-400 mt-1">
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      )}
    </div>
  );
}
