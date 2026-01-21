// app/signup/page.tsx
import { signup } from "@/app/actions/auth"; // 👈 さっき直した Server Action を使う

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const { message } = await searchParams;
  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">アカウント登録</h1>

      {/* useStateなどは全部消して、form action に指定するだけ */}
      <form action={signup} className="flex flex-col gap-4">
        <input
          className="block w-full border p-2"
          type="email"
          name="email"
          placeholder="メールアドレス"
          required
        />
        <input
          className="block w-full border p-2"
          type="password"
          name="password"
          placeholder="パスワード"
          required
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          登録する
        </button>

        {/* メッセージ表示エリア */}
        {message && (
          <p className="mt-4 text-red-500 bg-red-50 p-2 rounded">{message}</p>
        )}
      </form>
    </div>
  );
}
