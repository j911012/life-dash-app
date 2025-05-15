import { supabase } from "../supabase/client";
import { Database } from "../supabase/database.types";

type WeightEntry = Database["public"]["Tables"]["weight_entries"]["Row"];
type NewWeightEntry = Omit<WeightEntry, "id" | "created_at" | "user_id">;

// 体重記録の取得
export async function getWeightEntries(): Promise<WeightEntry[]> {
  const { data, error } = await supabase
    .from("weight_entries")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data || [];
}

// 体重記録の保存
export async function saveWeightEntry(
  entry: NewWeightEntry
): Promise<WeightEntry> {
  const { data, error } = await supabase
    .from("weight_entries")
    .insert([entry])
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 体重記録の更新
export async function updateWeightEntry(
  id: string,
  entry: Partial<NewWeightEntry>
): Promise<WeightEntry> {
  const { data, error } = await supabase
    .from("weight_entries")
    .update(entry)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// 体重記録の削除
export async function deleteWeightEntry(id: string): Promise<void> {
  const { error } = await supabase.from("weight_entries").delete().eq("id", id);

  if (error) throw error;
}

// 期間指定での体重記録取得
export async function getWeightEntriesByDateRange(
  startDate: string,
  endDate: string
): Promise<WeightEntry[]> {
  const { data, error } = await supabase
    .from("weight_entries")
    .select("*")
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true });

  if (error) throw error;
  return data || [];
}
