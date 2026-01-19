// app/login/page.tsx
import { login, signup } from "@/app/actions/auth"; // 👈 作ったアクションを読み込む

export default function LoginPage({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      {/* フォームのアクションに Server Action を指定するだけ！ */}
      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />

        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />

        {/* formActionを使うと、ボタンごとに別のアクションを呼べる */}
        <button
          formAction={login}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
        >
          ログイン
        </button>

        <button
          formAction={signup}
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
        >
          サインアップ
        </button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
