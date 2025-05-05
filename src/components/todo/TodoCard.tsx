"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";

export default function TodoCard() {
  const { todos, isLoading, error } = useTodos();

  // 未完了のタスクのみをフィルタリング
  const incompleteTodos = todos.filter((todo) => !todo.completed);
  // 最新3件を取得
  const displayTodos = incompleteTodos.slice(0, 3);

  return (
    <Link href="/todo" className="block w-full">
      <Card className="h-40 transition hover:shadow-md dark:bg-gray-800">
        {isLoading && (
          <CardContent className="flex items-center justify-center h-full">
            <div className="animate-pulse">Loading...</div>
          </CardContent>
        )}

        {error && (
          <CardContent className="flex items-center justify-center h-full text-red-500">
            <div>Error: {error}</div>
          </CardContent>
        )}

        {!isLoading && !error && incompleteTodos.length === 0 && (
          <CardContent className="flex items-center justify-center h-full text-gray-500">
            <div>すべてのタスクが完了しています！</div>
          </CardContent>
        )}

        {!isLoading && !error && incompleteTodos.length > 0 && (
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
        )}
      </Card>
    </Link>
  );
}
