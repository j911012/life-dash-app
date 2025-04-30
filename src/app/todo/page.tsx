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
import type { Todo } from "@/lib/types";

const initialTasks: Todo[] = [
  { id: "1", title: "タスク 1", completed: true, flagged: false },
  { id: "2", title: "タスク 2", completed: false, flagged: true },
  { id: "3", title: "タスク 3", completed: false, flagged: false },
];

export default function TodoPage() {
  const [tasks, setTasks] = useState<Todo[]>(initialTasks);
  const [input, setInput] = useState("");

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      {
        id: crypto.randomUUID(),
        title: input.trim(),
        completed: false,
        flagged: false,
      },
    ]);
    setInput("");
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleFlag = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, flagged: !task.flagged } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
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
        {tasks.map((task) => (
          <li key={task.id} className="flex items-center rounded-md border p-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => toggleComplete(task.id)}
              className="mr-3"
            />

            <span
              className={`flex-1 truncate ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.title}
            </span>

            {task.flagged && <Flag className="h-4 w-4 text-yellow-500" />}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-28">
                <DropdownMenuItem onClick={() => toggleFlag(task.id)}>
                  {task.flagged ? "Unflag" : "Flag"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteTask(task.id)}>
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
