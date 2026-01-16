/**
 * API レスポンス型定義
 *
 * バックエンドAPIのレスポンス形式に合わせて型を定義
 */

// 汎用的なページネーションレスポンス
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ユーザー関連の型（サンプル）
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// 投稿関連の型（サンプル）
export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
}

// APIエラーレスポンス
export interface ApiErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, string[]>;
}
