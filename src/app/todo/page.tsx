"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Flag, Home } from "lucide-react";
import type { Todo } from "@/lib/types";

export default function TodoPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");

  // localStorageからTodoを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Todoが更新されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (!input.trim()) return;
    setTodos([
      {
        id: crypto.randomUUID(),
        title: input.trim(),
        completed: false,
        flagged: false,
      },
      ...todos,
    ]);
    setInput("");
  };

  const toggleComplete = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleFlag = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, flagged: !todo.flagged } : todo
      )
    );
  };

  const deleteTask = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 編集モードを開始
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditInput(todo.title);
  };

  // 編集モードでEnterキーを押したら編集を確定
  const handleEditSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (editInput.trim()) {
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === editingId ? { ...todo, title: editInput.trim() } : todo
          )
        );
      }
      setEditingId(null);
      setEditInput("");
    }
  };

  // フォーカスが外れたら編集をキャンセル
  const handleEditBlur = () => {
    setEditingId(null);
    setEditInput("");
  };

  return (
    <main className="mx-auto max-w-md p-4 space-y-6">
      <Link href="/" className="mb-2 inline-block" aria-label="ホームへ戻る">
        <Home size={26} className="text-gray-400 hover:text-gray-800" />
      </Link>

      <div className="flex gap-2">
        <Input
          placeholder="タスクを入力"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addTask}>Add</Button>
      </div>

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="flex items-center rounded-md border p-2">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => toggleComplete(todo.id)}
              className="mr-3"
            />

            {editingId === todo.id ? (
              <Input
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                onKeyDown={handleEditSubmit}
                onBlur={handleEditBlur}
                className="flex-1"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 truncate ${
                  todo.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {todo.title}
              </span>
            )}

            {todo.flagged && <Flag className="h-4 w-4 text-yellow-500" />}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-28">
                <DropdownMenuItem onClick={() => startEditing(todo)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggleFlag(todo.id)}>
                  {todo.flagged ? "Unflag" : "Flag"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteTask(todo.id)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        ))}
      </ul>
    </main>
  );
}
