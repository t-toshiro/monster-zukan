"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // モーダルオープン時はメイン画面のスクロールを止める
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const onDismiss = () => {
    router.back();
  };

  return (
    // fixed で画面全体を覆うレイヤー。z-[60]でサイドバー(z-50)の上に配置。
    <div className="fixed inset-0 z-[60] flex">
      {/* 
        ★ここがポイント！★
        左側のサイドバー(w-64)と全く同じ幅の透明な「スペーサー」を置きます。
        これにより、右側の黒背景エリアがサイドバーに被らず、
        その中のモーダルが「サイドバーの右側エリアのど真ん中」に綺麗に配置されます。
        （InstagramのPC版と同じ挙動になります）
      */}
      <div 
        className="w-64 hidden md:block shrink-0 bg-transparent" 
        onClick={onDismiss}
      ></div>
      
      {/* 右側のメインエリア。背景を暗くする */}
      <div 
        className="flex-1 flex flex-col items-center justify-center bg-black/75 p-4 md:p-8 relative"
        onClick={onDismiss} // 背景クリックで閉じる
      >
        {/* モーダル本体 */}
        <div 
          className="relative w-full max-w-5xl h-[85vh] bg-white rounded-2xl flex flex-col shadow-2xl"
          onClick={(e) => e.stopPropagation()} // 中身をクリックしても閉じないようにする
        >
          {/* 閉じるボタン（枠の外、右上に配置） */}
          <button
            onClick={onDismiss}
            className="absolute -top-12 right-0 z-50 p-2 text-white/80 hover:text-white transition-colors"
          >
            <X size={32} />
          </button>

          {/* コンテンツエリア（角丸を維持して子要素をいっぱいに広げる） */}
          <div className="w-full h-full rounded-2xl overflow-hidden flex">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
