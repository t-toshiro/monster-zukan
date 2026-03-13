import { addComment } from "../actions/social";

export default function CommentForm({ monsterId }: { monsterId: string }) {
  const addCommentWithId = addComment.bind(null, monsterId);

  return (
    // カプセル型（丸い枠）をやめて、本物のInstagram Web版と同じ
    // 「シンプルでフラットな入力欄」に完全変更します。
    // これで丸みにカーソルがぶつかる物理的な問題が100%解決します。
    <form
      action={addCommentWithId}
      className="flex items-center w-full bg-white"
    >
      <input
        type="text"
        name="content"
        required
        placeholder="コメントを追加..."
        autoComplete="off"
        className="flex-1 py-3 bg-transparent text-sm text-gray-900 placeholder-gray-500 focus:outline-none"
      />

      <button
        type="submit"
        className="pl-4 text-blue-500 font-bold text-sm hover:text-blue-700 transition-colors whitespace-nowrap shrink-0"
      >
        投稿する
      </button>
    </form>
  );
}
