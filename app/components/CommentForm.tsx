import { addComment } from "../actions/social";

export default function CommentForm({ monsterId }: { monsterId: string }) {
  const addCommentWithId = addComment.bind(null, monsterId);
  return (
    <form action={addCommentWithId}>
      <textarea name="content" required />
      <button type="submit">追加</button>
    </form>
  );
}
