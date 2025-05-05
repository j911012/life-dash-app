"use client";

import { useState, useEffect } from "react";
import type { Todo } from "@/lib/types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Todoの取得
  const fetchTodos = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // 初期ロード時にTodoを取得
  useEffect(() => {
    fetchTodos();
  }, []);

  // todosが更新されたらlocalStorageに保存
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Todoの追加
  const addTodo = async (title: string) => {
    if (!title.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: title.trim() }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const newTodo = await response.json();
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
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

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo
      )
    );
  };

  return {
    todos,
    isLoading,
    error,
    refetch: fetchTodos,
    addTodo,
    toggleComplete,
    toggleFlag,
    deleteTodo,
    editTodo,
  };
}
