import { Suspense } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

/**
 * React Best Practices デモページ
 *
 * ベストプラクティス適用:
 * 1. ウォーターフォール排除: Suspenseで各セクションを独立させ並列読み込み
 * 2. 直接インポート: バレルファイルを使わずコンポーネントを直接インポート
 * 3. Server Components: データ取得はサーバーで実行
 */

// ローディングスケルトン
function CardSkeleton() {
  return (
    <div className="animate-pulse p-4 border rounded-lg bg-white">
      <div className="h-5 w-3/4 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div className="animate-pulse flex items-center gap-4 p-6 bg-white rounded-xl border">
      <div className="w-20 h-20 bg-gray-200 rounded-full" />
      <div className="flex-1">
        <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
        <div className="h-4 w-48 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

// GitHubユーザー情報
async function GitHubProfile() {
  const user = {
    login: "haruk869",
    avatar_url: "https://avatars.githubusercontent.com/u/93960257?v=4",
    html_url: "https://github.com/haruk869",
    public_repos: 3,
  };

  return (
    <a
      href={user.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-6 bg-white rounded-xl border hover:shadow-md transition-shadow"
    >
      <Image
        src={user.avatar_url}
        alt={user.login}
        width={80}
        height={80}
        className="rounded-full"
      />
      <div>
        <h3 className="text-xl font-bold text-gray-900">{user.login}</h3>
        <p className="text-gray-600">GitHub / {user.public_repos} repositories</p>
      </div>
    </a>
  );
}

// サイトからの最新投稿
async function LatestPosts() {
  const posts = [
    {
      id: "1",
      title: "Suspenseによる並列データ取得",
      description: "ウォーターフォールを排除し、複数のデータソースを同時に読み込む",
      tag: "CRITICAL",
      tagColor: "bg-red-100 text-red-700",
    },
    {
      id: "2",
      title: "直接インポートでバンドル最適化",
      description: "バレルファイル(index.ts)を避け、必要なものだけをインポート",
      tag: "CRITICAL",
      tagColor: "bg-red-100 text-red-700",
    },
    {
      id: "3",
      title: "Server Componentsの活用",
      description: "データ取得をサーバーで実行し、クライアントへのJS転送量を削減",
      tag: "HIGH",
      tagColor: "bg-orange-100 text-orange-700",
    },
    {
      id: "4",
      title: "型安全なAPIクライアント",
      description: "TypeScriptで一元管理されたfetchラッパーでエラーハンドリング",
      tag: "HIGH",
      tagColor: "bg-orange-100 text-orange-700",
    },
  ];

  return (
    <div className="grid gap-3">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4 bg-white rounded-lg border hover:shadow-sm transition-shadow"
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-gray-900">{post.title}</h3>
              <p className="text-sm text-gray-600 mt-1">{post.description}</p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded ${post.tagColor}`}
            >
              {post.tag}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* ヒーローセクション */}
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto py-16 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ノーコードからの究極Reactサイト
          </h1>
          <p className="text-xl text-gray-600">
            <a
              href="https://vercel.com/blog/introducing-react-best-practices"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              React Best Practices
            </a>
            {" "}を使った最適サイトの構築
          </p>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-12 px-4 space-y-12">
        {/* 作成者情報 */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Created by
          </h2>
          <Suspense fallback={<ProfileSkeleton />}>
            <GitHubProfile />
          </Suspense>
        </section>

        {/* 最新投稿（ベストプラクティス一覧） */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            サイトで実装されているベストプラクティス
          </h2>
          <Suspense
            fallback={
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <CardSkeleton key={i} />
                ))}
              </div>
            }
          >
            <LatestPosts />
          </Suspense>
        </section>

        {/* UIコンポーネント */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            UIコンポーネント
          </h2>
          <div className="bg-white p-6 rounded-xl border">
            <p className="text-sm text-gray-600 mb-4">
              直接インポート（
              <code className="bg-gray-100 px-1 rounded text-xs">
                @/components/ui/Button
              </code>
              ）で必要なコンポーネントのみをバンドル。バレルファイル経由のインポートを避けることでTree
              Shakingが効きやすくなります。
            </p>
            <div className="flex gap-3 flex-wrap">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
        </section>

        {/* 技術スタック */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            技術スタック
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="bg-white p-5 rounded-xl border">
              <h3 className="font-semibold text-gray-900 mb-3">フレームワーク</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-black rounded-full" />
                  Next.js 16 (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                  Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  React Query (TanStack)
                </li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl border">
              <h3 className="font-semibold text-gray-900 mb-3">インフラ</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-gray-800 rounded-full" />
                  GitHub Pages
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  GitHub Actions
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  Static Export (SSG)
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* コード構成 */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            プロジェクト構成
          </h2>
          <div className="bg-gray-900 text-gray-100 p-5 rounded-xl font-mono text-sm overflow-x-auto">
            <pre>{`src/
├── app/
│   ├── layout.tsx      # Providers統合
│   ├── page.tsx        # このページ
│   └── providers.tsx   # React Query
├── components/
│   └── ui/
│       └── Button.tsx  # 直接インポート用
├── lib/
│   └── api/
│       └── client.ts   # 型安全APIクライアント
└── types/
    └── api.ts          # 型定義`}</pre>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="border-t bg-white">
        <div className="max-w-3xl mx-auto py-8 px-4 text-center text-sm text-gray-500">
          <p>
            Built with{" "}
            <a
              href="https://vercel.com/blog/introducing-react-best-practices"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Best Practices
            </a>
            {" / "}
            <a
              href="https://github.com/haruk869/sample-bestreact"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
