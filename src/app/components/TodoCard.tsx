"use client";

import Link from "next/link";

export default function TodoCard() {
  const dummyTasks = ["タスク 1", "タスク 2", "タスク 3"]; // 後で最新3件に置換予定
  const incompleteCount = dummyTasks.length; // 後でリアル値に置換

  return (
    <Link
      href="/todo"
      className="
        relative block h-38 rounded-xl border border-gray-300
        bg-white p-4 shadow-sm transition hover:shadow-md
        dark:bg-gray-800
      "
    >
      <h2 className="text-lg font-semibold">Todo</h2>

      <span className="absolute top-4 right-3 rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
        {incompleteCount}
      </span>

      <ul className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {dummyTasks.map((title, idx) => (
          <li key={idx} className="truncate">
            • {title}
          </li>
        ))}
      </ul>
    </Link>
  );
}
