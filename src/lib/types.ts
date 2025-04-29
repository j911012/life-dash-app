/**
 * Todo エンティティの型定義
 */
export type Todo = {
  id: string;
  title: string;
  category?: string;
  flagged: boolean;
  completed: boolean;
  createdAt: string;
};
