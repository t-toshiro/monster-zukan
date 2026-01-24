//layout.tsx
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Monster Zukan",
  description: "Share your monsters!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="flex bg-gray-50 text-gray-900">
        {/* 左側: 固定サイドバー */}
        <Sidebar />
        <Toaster position="bottom-center" />
        {/* 右側: メインコンテンツエリア */}
        {/* ml-64 はサイドバーの幅(w-64)分だけ右にずらすための指定です */}
        <main className="flex-1 ml-64 min-h-screen">{children}</main>
      </body>
    </html>
  );
}
