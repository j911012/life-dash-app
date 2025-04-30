import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Todo } from "@/lib/types";
import { Flag } from "lucide-react";
const dummyTasks: Todo[] = [
  { id: "1", title: "タスク 1", completed: false, flagged: false },
  { id: "2", title: "タスク 2", completed: false, flagged: true },
  { id: "3", title: "タスク 3", completed: false, flagged: false },
];

export default function TodoCard() {
  return (
    <Link href="/todo" className="block w-full">
      <Card className="h-40 transition hover:shadow-md dark:bg-gray-800">
        <CardContent className="relative h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Todo</h3>
            <span className="rounded-full bg-blue-500 px-2 py-0.5 text-xs text-white">
              {dummyTasks.length}
            </span>
          </div>

          <ul className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            {dummyTasks.map((task) => (
              <li key={task.id} className="flex items-center truncate">
                • {task.title}
                {task.flagged && (
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
