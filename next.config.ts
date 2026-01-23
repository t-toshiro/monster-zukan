import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co", // Supabaseのドメインを許可 (プロジェクトID部分はワイルドカードでもOKですが、通常はそのまま指定します)
      },
    ],
  },
};

export default nextConfig;
