/**
 * 食事エントリーの型定義
 */
export type MealEntry = {
  id: string;
  date: string;
  food_name: string; // 食品名/料理名
  calories: number; // カロリー
  serving_size: number; // グラム数
  created_at: string;
  user_id: string;
};

/**
 * 体重記録の型定義
 */
export type WeightEntry = {
  id: string;
  date: string;
  weight: number; // 体重
  body_fat?: number; // 体脂肪率（オプション）
  created_at: string;
  user_id: string;
};
