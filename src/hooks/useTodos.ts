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

  // Todoの完了
  const toggleComplete = async (id: string) => {
    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;

    // 楽観的更新
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    // サーバー側の更新
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !targetTodo.completed }),
      });

      if (!response.ok) {
        // エラーがあったら楽観的更新を元に戻す
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: targetTodo.completed } : todo
          )
        );
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update todo");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  // Todoのフラグ
  const toggleFlag = async (id: string) => {
    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;

    // 楽観的更新
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, flagged: !todo.flagged } : todo
      )
    );

    // サーバー側の更新
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flagged: !targetTodo.flagged }),
      });

      if (!response.ok) {
        // エラーがあったら楽観的更新を元に戻す
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, flagged: targetTodo.flagged } : todo
          )
        );
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update todo");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Todoの編集
  const editTodo = async (id: string, newTitle: string) => {
    if (!newTitle.trim()) return;

    const targetTodo = todos.find((todo) => todo.id === id);
    if (!targetTodo) return;

    // 楽観的更新
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle.trim() } : todo
      )
    );

    // サーバー側の更新
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: newTitle.trim() }),
      });

      if (!response.ok) {
        // エラーがあったら楽観的更新を元に戻す
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, title: targetTodo.title } : todo
          )
        );
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update todo");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
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
