import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server Actions や Server Components で使うためのクライアント作成関数
export async function createClient() {
  const cookieStore = await cookies(); // Next.js 15以降は await が必要

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // Server Component から呼ばれた場合の無視設定
          }
        },
      },
    }
  );
}
