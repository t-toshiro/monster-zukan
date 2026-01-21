// app/signup/page.tsx
import { signup } from "@/app/actions/auth";
import Link from "next/link";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-6 mx-auto min-h-[80vh]">
      {/* タイトル */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          アカウント登録
        </h1>
      </div>

      <form
        action={signup}
        className="animate-in flex flex-col w-full gap-4 text-foreground bg-white dark:bg-black p-6 rounded-lg border shadow-sm"
      >
        {/* Email入力 */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            メールアドレス
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password入力 */}
        <div className="flex flex-col gap-2">
          <label
            className="text-sm font-medium leading-none"
            htmlFor="password"
          >
            パスワード
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
        </div>

        {/* アクションエリア */}
        <div className="flex flex-col gap-3 mt-4">
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-md px-4 py-2 transition-colors duration-200">
            登録する
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-black px-2 text-gray-500">
                すでにアカウントをお持ちの方
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="border border-gray-300 hover:bg-gray-50 text-foreground rounded-md px-4 py-2 text-center transition-colors duration-200"
          >
            ログインはこちら
          </Link>
        </div>

        {/* エラーメッセージ */}
        {message && message == "Error" && (
          <div className="mt-2 p-3 bg-red-50  text-red-600 text-sm rounded-md text-center">
            {message}
          </div>
        )}
        {message && message == "CheckEmail" && (
          <div className="mt-2 p-3 bg-green-50  text-green-600 text-sm rounded-md text-center">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
