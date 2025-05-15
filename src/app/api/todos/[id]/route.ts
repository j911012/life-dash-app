import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

// PATCH: Todoの更新
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { title, completed, flagged } = await request.json();

    const { data, error } = await supabase
      .from("todos")
      .update({
        ...(title && { title }),
        ...(completed !== undefined && { completed }),
        ...(flagged !== undefined && { flagged }),
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "不正なリクエストです" },
      { status: 400 }
    );
  }
}

// DELETE: Todoの削除
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase.from("todos").delete().eq("id", params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Deleted successfully" });
}
