import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// GET: すべてのTodoを取得
export async function GET() {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("created_at", { ascending: false }); // 降順

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST: 新しいTodoを作成
export async function POST(request: NextRequest) {
  const { title } = await request.json();

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("todos")
    .insert([{ title }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
