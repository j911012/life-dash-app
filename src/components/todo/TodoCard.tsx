"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";

export default function TodoCard() {
  const { todos, initialized } = useTodos();

  // 未完了のタスクのみをフィルタリング
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  // 最新3件を取得
  const displayTodos = incompleteTodos.slice(0, 3);

  if (!initialized) {
    return null; // または適切なローディング表示
  }

  return (
    <Link href="/todo" className="block w-full">
      <Card className="h-40 transition hover:shadow-md dark:bg-gray-800">
        <CardContent className="relative h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Todo</h3>
            <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
              {incompleteTodos.length}
            </span>
          </div>

          <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {displayTodos.map((todo) => (
              <li key={todo.id} className="flex items-center truncate">
                • {todo.title}
                {todo.flagged && (
                  <Flag size={14} className="ml-1 text-yellow-500" />
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
}
