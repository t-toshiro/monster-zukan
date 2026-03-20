# Monster Zukan (モンスター図鑑)

ユーザーが作成したオリジナルの「モンスター」を共有し、閲覧・検索できる画像投稿型のSNSアプリケーションです。Next.js (App Router)、Supabase、Prismaを使用して構築されており、OpenAIのベクトルエンベディングを用いた類似検索機能も備えています。

## 📁 プロジェクト構成

```
monster-zukan/
├── app/                  # Next.js App Router (各ページ、コンポーネント、Server Actions)
│   ├── actions/          # サーバーサイド処理 (DB操作, API呼び出しなど)
│   ├── components/       # 再利用可能なUIコンポーネント
│   └── (その他各ルート)
├── lib/                  # 共通ユーティリティ (Prisma Client初期化など)
├── prisma/               # Prisma Schemaとマイグレーションファイル
├── utils/                # 外部サービスの設定 (Supabase Clientなど)
└── public/               # 静的ファイル
```

## 🚀 クイックスタート

### 前提条件

- Node.js 18.x以上
- npm または yarn
- Supabase アカウント (PostgreSQL, Storage, Auth)
- OpenAI API キー (ベクトル検索用)

### セットアップ手順

#### 1. リポジトリのクローン

```bash
git clone https://github.com/t-toshiro/monster-zukan.git
cd monster-zukan
```

#### 2. パッケージのインストール

```bash
npm install
```

#### 3. 環境変数の設定

`.env.example` などの内容を参考に、プロジェクト直下に `.env.local` ファイルを作成し、必要な環境変数を設定します。

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Database
DATABASE_URL=your_database_connection_string
DIRECT_URL=your_database_direct_connection_string

# OpenAI
OPENAI_API_KEY=your_openai_api_key
```

#### 4. データベースのセットアップ

Prismaを使用してデータベーススキーマを反映させ、クライアントを生成します。

```bash
npm run prisma db push
npm run prisma generate
```

#### 5. 開発サーバーの起動

```bash
npm run dev
```

サーバーが起動したら、ブラウザで `http://localhost:3000` にアクセスしてください。

## ✨ 主な機能

- **ユーザー認証**: Supabase Authによる安全なログイン/サインアップ機能
- **投稿機能**: 属性(炎・水など)やレアリティ、画像と説明文を組み合わせたモンスターの登録
- **画像管理**: 画像投稿時に自動圧縮・リサイズを行い、Supabase Storageへアップロード
- **インタラクション**:
  - 各モンスターへの「いいね」機能
  - 投稿に対する「コメント」機能
- **ベクトル検索 (AI検索)**: OpenAIのEmbedding APIを用いた、自然言語による類似モンスター検索機能
- **無限スクロール**: ページネーションではなく、スクロールでシームレスに一覧表示するUI
- **レスポンシブデザイン**: Tailwind CSSによるモバイル・PC両対応のレイアウト

## 🛠️ 技術スタック

### フロントエンド

- **フレームワーク**: Next.js 16 (App Router)
- **UIライブラリ**: React 19
- **スタイリング**: Tailwind CSS 4, Tailwind Merge
- **アイコン**: Lucide React
- **その他**: React Hot Toast (通知), browser-image-compression (画像圧縮)

### バックエンド / データベース

- **BaaS**: Supabase (Auth, Storage, PostgreSQL)
- **ORM**: Prisma (PgBouncer対応)
- **AI / 検索**: OpenAI API (text-embedding-3-small)

## 📝 ライセンス

このプロジェクトは学習用・ポートフォリオ用のプロジェクトです。ご自身のプロジェクトの参考として自由にご活用ください。

---

**Built with ❤️ using Next.js, Supabase, Prisma, and OpenAI**