import { supabase } from "../supabase/client";
import { Database } from "../supabase/database.types";

type MealEntry = Database["public"]["Tables"]["meal_entries"]["Row"];
type NewMealEntry = Omit<MealEntry, "id" | "created_at" | "user_id">;

// 食事記録の取得
export async function getMealEntries(date?: string): Promise<MealEntry[]> {
  let query = supabase.from("meal_entries").select("*");

  if (date) {
    query = query.eq("date", date);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) throw error;
  return data || [];
}

// 食事記録の保存
export async function saveMealEntry(entry: NewMealEntry): Promise<MealEntry> {
  const { data, error } = await supabase
    .from("meal_entries")
    .insert([entry])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 食事記録の更新
export async function updateMealEntry(
  id: string,
  entry: Partial<NewMealEntry>
): Promise<MealEntry> {
  const { data, error } = await supabase
    .from("meal_entries")
    .update(entry)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 食事記録の削除
export async function deleteMealEntry(id: string): Promise<void> {
  const { error } = await supabase.from("meal_entries").delete().eq("id", id);

  if (error) throw error;
}

// 期間指定での食事記録取得
export async function getMealEntriesByDateRange(
  startDate: string,
  endDate: string
): Promise<MealEntry[]> {
  const { data, error } = await supabase
    .from("meal_entries")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  if (error) throw error;
  return data || [];
}

// 日別カロリー集計
export async function getDailyCalories(date: string): Promise<number> {
  const { data, error } = await supabase
    .from("meal_entries")
    .select("calories")
    .eq("date", date);

  if (error) throw error;
  return data?.reduce((sum, entry) => sum + entry.calories, 0) || 0;
}
