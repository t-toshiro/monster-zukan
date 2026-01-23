import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen border-r bg-white flex flex-col fixed left-0 top-0 z-50">
      {/* 1. ロゴエリア */}
      <div className="p-6 mb-4">
        <h1 className="text-2xl font-bold italic tracking-wider">
          MonsterZukan
        </h1>
      </div>

      {/* 2. メニューエリア */}
      <nav className="flex-1 px-4 space-y-2">
        <NavItem href="/" icon={<HomeIcon />} label="ホーム" />
        <NavItem href="/search" icon={<SearchIcon />} label="検索" />
        <NavItem href="/create" icon={<PlusIcon />} label="作成" />
        <NavItem href="/profile" icon={<UserIcon />} label="プロフィール" />
      </nav>

      {/* 3. 下部のメニュー（その他など） */}
      <div className="p-4 border-t">
        <button className="flex items-center space-x-4 p-3 w-full hover:bg-gray-100 rounded-lg transition">
          <MenuIcon />
          <span>その他</span>
        </button>
      </div>
    </aside>
  );
}

// --- 部品: メニュー項目 ---
function NavItem({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center space-x-4 p-3 hover:bg-gray-100 rounded-lg transition text-gray-900 group"
    >
      <div className="group-hover:scale-105 transition-transform">{icon}</div>
      <span className="text-lg">{label}</span>
    </Link>
  );
}

// --- アイコン (SVG) ---
// ※アイコンライブラリを使わず、コードをコピーだけで動くようにSVGを直接書いています
const HomeIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);
const SearchIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const PlusIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);
const UserIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);
