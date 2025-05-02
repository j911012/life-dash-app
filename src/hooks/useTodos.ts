"use client";

import { useState, useEffect } from "react";
import type { Todo } from "@/lib/types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [initialized, setInitialized] = useState(false);

  // 初期化時にlocalStorageからデータを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
    setInitialized(true);
  }, []);

  // todosが更新されたらlocalStorageに保存
  useEffect(() => {
    if (initialized) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, initialized]);

  const addTodo = (title: string) => {
    if (!title.trim()) return;
    setTodos((prev) => [
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        completed: false,
        flagged: false,
      },
      ...prev,
    ]);
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
    initialized,
    addTodo,
    toggleComplete,
    toggleFlag,
    deleteTodo,
    editTodo,
  };
}
