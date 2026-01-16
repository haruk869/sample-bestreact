import { Suspense } from "react";
import { Button } from "@/components/ui/Button";

/**
 * React Best Practices デモページ
 *
 * ポイント:
 * 1. ウォーターフォール排除: Suspenseで各セクションを独立させ並列読み込み
 * 2. 直接インポート: バレルファイルを使わずコンポーネントを直接インポート
 * 3. Server Components: データ取得はサーバーで実行
 */

// ローディングスケルトン
function UserSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-32 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-48 bg-gray-200 rounded" />
    </div>
  );
}

function PostsSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-20 bg-gray-200 rounded" />
      ))}
    </div>
  );
}

// サーバーコンポーネント: ユーザー情報（実際のAPIに置き換え）
async function UserInfo() {
  // 実際のプロジェクトでは apiClient.get<User>('/api/user') を使用
  // await new Promise((resolve) => setTimeout(resolve, 1000)); // デモ用遅延
  const user = { name: "山田太郎", email: "taro@example.com" };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-xl font-semibold">{user.name}</h2>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}

// サーバーコンポーネント: 投稿一覧（実際のAPIに置き換え）
async function RecentPosts() {
  // 実際のプロジェクトでは apiClient.get<Post[]>('/api/posts') を使用
  // await new Promise((resolve) => setTimeout(resolve, 1500)); // デモ用遅延
  const posts = [
    { id: "1", title: "React Best Practicesを学ぶ", createdAt: "2024-01-15" },
    { id: "2", title: "Next.js App Routerの使い方", createdAt: "2024-01-14" },
    { id: "3", title: "TypeScriptで型安全な開発", createdAt: "2024-01-13" },
  ];

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded-lg bg-white shadow-sm">
          <h3 className="font-medium">{post.title}</h3>
          <p className="text-sm text-gray-500">{post.createdAt}</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <main className="max-w-2xl mx-auto space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            React Best Practices Demo
          </h1>
          <p className="text-gray-600">
            Vercelのベストプラクティスに沿った構成
          </p>
        </header>

        {/* ベストプラクティス: Suspenseで並列データ取得 */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            ユーザー情報
          </h2>
          <Suspense fallback={<UserSkeleton />}>
            <UserInfo />
          </Suspense>
        </section>

        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            最近の投稿
          </h2>
          <Suspense fallback={<PostsSkeleton />}>
            <RecentPosts />
          </Suspense>
        </section>

        {/* ボタンコンポーネントのデモ */}
        <section>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            UIコンポーネント
          </h2>
          <div className="flex gap-3 flex-wrap">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* ベストプラクティス説明 */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-3 text-blue-900">
            適用されているベストプラクティス
          </h2>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>
              ✓ <strong>ウォーターフォール排除</strong>:
              Suspenseで各セクションを独立させ並列読み込み
            </li>
            <li>
              ✓ <strong>直接インポート</strong>:
              バレルファイルを使わずコンポーネントを直接インポート
            </li>
            <li>
              ✓ <strong>Server Components</strong>:
              データ取得はサーバーで実行
            </li>
            <li>
              ✓ <strong>型安全なAPIクライアント</strong>:
              src/lib/api/client.ts で一元管理
            </li>
            <li>
              ✓ <strong>React Query</strong>:
              クライアントサイドのキャッシュ管理
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
