# Sample Best React

Vercel の [React Best Practices](https://vercel.com/blog/introducing-react-best-practices) に沿った Next.js プロジェクトのテンプレートです。

**デモページ公開中**: https://haruk869.github.io/sample-bestreact/

## 技術スタック

- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Query** (TanStack Query)

## プロジェクト構成

```
src/
├── app/                      # App Router
│   ├── layout.tsx            # ルートレイアウト（Provider統合）
│   ├── page.tsx              # ホームページ（ベストプラクティス実装例）
│   ├── providers.tsx         # React Query Provider
│   └── globals.css           # グローバルスタイル
├── components/
│   └── ui/
│       └── Button.tsx        # UIコンポーネント（直接インポート用）
├── lib/
│   └── api/
│       └── client.ts         # 型安全なAPIクライアント
└── types/
    └── api.ts                # API レスポンス型定義
```

## 適用されているベストプラクティス

### 1. ウォーターフォール排除 (CRITICAL)

順次 `await` による遅延を避け、Suspense で各セクションを独立させて並列読み込みを実現。

```tsx
// 各コンポーネントが独立してデータ取得 → 並列実行
<Suspense fallback={<UserSkeleton />}>
  <UserInfo />
</Suspense>
<Suspense fallback={<PostsSkeleton />}>
  <RecentPosts />
</Suspense>
```

### 2. バンドルサイズ最適化 (CRITICAL)

バレルファイル（index.ts）からのインポートを避け、直接インポートを使用。

```tsx
// NG: import { Button } from '@/components';
// OK:
import { Button } from '@/components/ui/Button';
```

### 3. 型安全な API クライアント

`src/lib/api/client.ts` で一元管理。エラーハンドリングと型安全性を確保。

```tsx
import { apiClient } from '@/lib/api/client';
import type { User } from '@/types/api';

const user = await apiClient.get<User>('/api/users/1');
```

### 4. Server Components

データ取得はサーバーコンポーネントで実行し、クライアントへの JavaScript 転送量を削減。

### 5. React Query によるキャッシュ管理

クライアントサイドのデータキャッシュと再取得を効率的に管理。

## セットアップ

```bash
# 依存関係インストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Lint
npm run lint
```

開発サーバー起動後、http://localhost:3003 でアクセス。

## デプロイ

GitHub Pages へのデプロイは以下のタイミングで自動実行されます：

- `main` ブランチへの push
- `v*` タグの push（例: `v1.0.0`）

```bash
# タグを打ってデプロイ
git tag v1.0.0
git push origin v1.0.0
```

## API 連携の設定

REST API バックエンドと連携する場合は `.env.local` を作成:

```
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

## 参考リンク

- [React Best Practices (Vercel Blog)](https://vercel.com/blog/introducing-react-best-practices)
- [AGENTS.md (全ルール)](https://github.com/vercel-labs/agent-skills/blob/main/skills/react-best-practices/AGENTS.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [TanStack Query](https://tanstack.com/query/latest)
