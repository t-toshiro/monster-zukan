// app/login/page.tsx
import { login } from "@/app/actions/auth";
import Link from "next/link";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-6 mx-auto min-h-[80vh]">
      {/* 修正: シンプルなタイトルに変更 */}
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          ログイン
        </h1>
      </div>

      <form className="animate-in flex flex-col w-full gap-4 text-foreground bg-white dark:bg-black p-6 rounded-lg border shadow-sm">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium leading-none" htmlFor="email">
            メールアドレス
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all"
            name="email"
            placeholder="you@example.com"
            required
          />
        </div>

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

        <div className="flex flex-col gap-3 mt-4">
          <button
            formAction={login}
            className="bg-green-600 hover:bg-green-700 text-white font-bold rounded-md px-4 py-2 transition-colors duration-200"
          >
            ログイン
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-black px-2 text-gray-500">
                アカウントをお持ちでない場合
              </span>
            </div>
          </div>

          <Link
            href="/signup"
            className="border border-gray-300 hover:bg-gray-50 text-foreground rounded-md px-4 py-2 text-center transition-colors duration-200"
          >
            新規登録（サインアップ）
          </Link>
        </div>

        {message && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md text-center">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
