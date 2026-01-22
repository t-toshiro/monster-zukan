// app/profile/page.tsx（または app/page.tsx など配置場所に合わせて）
import { createClient } from "@/utils/supabase/server";
import { logout } from "../actions/auth";
import { redirect } from "next/navigation";
import { User, Mail, Fingerprint, LogOut } from "lucide-react"; // アイコン用にインポート

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect("/login");

  return (
    <div className="flex flex-col w-full px-8 sm:max-w-md justify-center gap-6 mx-auto min-h-[80vh]">
      {/* ヘッダー部分 */}
      <div className="flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <User className="w-10 h-10 text-gray-500" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">プロフィール</h1>
        <p className="text-sm text-gray-500 mt-1">
          現在ログイン中のアカウント情報
        </p>
      </div>

      {/* 情報カード */}
      <div className="flex flex-col w-full text-foreground bg-white dark:bg-black rounded-lg border shadow-sm overflow-hidden">
        {/* メールアドレスの行 */}
        <div className="flex items-center gap-4 p-4 border-b">
          <div className="p-2 bg-green-50 rounded-md">
            <Mail className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium text-gray-500 uppercase">
              メールアドレス
            </p>
            <p className="text-sm font-medium truncate" title={user.email}>
              {user.email}
            </p>
          </div>
        </div>

        {/* ユーザーIDの行 */}
        <div className="flex items-center gap-4 p-4">
          <div className="p-2 bg-purple-50 rounded-md">
            <Fingerprint className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-medium text-gray-500 uppercase">
              ユーザーID
            </p>
            <p className="text-xs font-mono text-gray-600 truncate bg-gray-100 p-1 rounded mt-1 select-all">
              {user.id}
            </p>
          </div>
        </div>
      </div>

      {/* ログアウトボタンエリア */}
      <form action={logout}>
        <button className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-md px-4 py-3 transition-colors duration-200 shadow-sm">
          <LogOut className="w-4 h-4" />
          ログアウト
        </button>
      </form>
    </div>
  );
}
