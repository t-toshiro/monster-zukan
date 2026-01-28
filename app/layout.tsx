//layout.tsx
import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";
import React from "react";

export const metadata = {
  title: "Monster Zukan",
  description: "Share your monsters!",
};

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
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
        {modal}
      </body>
    </html>
  );
}
