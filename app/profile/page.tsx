// app/profile/page.tsx
import { logout } from "@/app/actions/auth"; // 👈 作ったアクションを読み込む
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // 1. ログイン中のユーザー情報を取得してみる（保護）
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ログインしてなければログイン画面へ強制送還
  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          {/* 仮のユーザーアイコン */}
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
            👤
          </div>
          <div>
            <h1 className="text-xl font-bold">{user.email}</h1>
            <p className="text-gray-500">ユーザーID: {user.id}</p>
          </div>
        </div>

        <hr className="my-6" />

        <div className="space-y-4">
          <h2 className="font-bold text-lg">設定</h2>

          {/* 👇 ここがログアウトボタン！ */}
          <form action={logout}>
            <button className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded border border-red-100 transition">
              🚪 ログアウトする
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
