"use client";

import { useState } from "react";
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
import { useTodos } from "@/hooks/useTodos";
import type { Todo } from "@/lib/types";

export default function TodoPage() {
  const {
    todos,
    initialized,
    addTodo,
    toggleComplete,
    toggleFlag,
    deleteTodo,
    editTodo,
  } = useTodos();
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    addTodo(input);
    setInput("");
  };

  const handleEditSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && editingId) {
      editTodo(editingId, editInput);
      setEditingId(null);
      setEditInput("");
    }
  };

  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditInput(todo.title);
  };

  const handleEditBlur = () => {
    setEditingId(null);
    setEditInput("");
  };

  if (!initialized) {
    return null; // または適切なローディング表示
  }

  return (
    <main className="mx-auto max-w-md p-4 space-y-6">
      <Link href="/" className="mb-2 inline-block" aria-label="ホームへ戻る">
        <Home size={26} className="text-gray-400 hover:text-gray-800" />
      </Link>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          placeholder="タスクを入力"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">Add</Button>
      </form>

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
                <DropdownMenuItem onClick={() => deleteTodo(todo.id)}>
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
