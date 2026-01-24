"use client";
import { useRef } from "react";
import ImageUploader from "../components/ImageUploader";
import { updateProfileImage } from "../actions/profile";
import { logout } from "../actions/auth";

type Props = {
  userEmail: string | undefined;
  avatarUrl: string | undefined;
  userId: string;
};
export default function ProfileHeader({ userEmail, avatarUrl, userId }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openModal = () => {
    dialogRef.current?.showModal();
  };
  const closeModal = () => {
    dialogRef.current?.close();
  };
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target == dialogRef.current) {
      closeModal();
    }
  };
  const handleUploadComplete = async (url: string) => {
    await updateProfileImage(url);
    closeModal();
  };
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
      {/* アイコン表示部分 (変更なし) */}
      <div className="relative group cursor-pointer" onClick={openModal}>
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border border-gray-200 shadow-sm relative bg-white">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-4xl text-gray-400">
              👤
            </div>
          )}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            📷
          </div>
        </div>
      </div>

      {/* 名前など (変更なし) */}
      <div className="flex-1 text-center md:text-left space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <h1 className="text-2xl font-light">{userEmail?.split("@")[0]}</h1>
          <form action={logout}>
            <button className="text-sm font-bold border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50 transition">
              ログアウト
            </button>
          </form>
        </div>
        <p className="text-sm text-gray-500">User ID: {userId}</p>
      </div>

      {/* --- モーダル --- */}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="p-0 bg-transparent backdrop:bg-black/60 open:animate-in open:fade-in open:zoom-in-95 focus:outline-none"
      >
        <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden p-6 shadow-2xl m-4">
          <h3 className="text-lg font-bold text-center mb-6">
            プロフィール写真を変更
          </h3>

          {/* ✅ ここに ImageUploader を配置！ */}
          {/* folder="avatars" を指定することで、保存先を切り替える */}
          <ImageUploader
            folderPath="avatars"
            onUploadComplete={handleUploadComplete}
          />

          <button
            className="mt-6 w-full py-2 text-gray-500 hover:text-gray-800 transition text-sm"
            onClick={closeModal}
          >
            キャンセル
          </button>
        </div>
      </dialog>
    </div>
  );
}
