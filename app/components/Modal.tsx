"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { X } from "lucide-react"; // アイコン用

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    // マウントされたら自動的にモーダルを開く
    dialogRef.current?.showModal();
  }, []);

  // 閉じる処理 = ブラウザの履歴を1つ戻る
  const onDismiss = () => {
    router.back();
  };

  const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target == dialogRef.current) onDismiss();
  };

  return (
    <dialog
      ref={dialogRef}
      onClick={handleClick}
      onClose={onDismiss} // Escキーで閉じた時も戻る
      className="backdrop:bg-black/80 bg-transparent p-0 w-full max-w-5xl outline-none"
    >
      <div className="relative w-full">
        {/* 閉じるボタン（右上の×） */}
        <button
          onClick={onDismiss}
          className="absolute right-4 top-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition"
        >
          <X size={24} />
        </button>

        {/* モーダルの中身（詳細ページ）がここに入る */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
          {children}
        </div>
      </div>
    </dialog>
  );
}
