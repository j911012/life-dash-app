import TodoCard from "@/components/todo/TodoCard";
import CalorieCard from "@/components/calorie/CalorieCard";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-sm p-4">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2">
        <TodoCard />
        <CalorieCard />
        {/* 今後 Muscles, Calories などのカードを追加 */}
      </div>
    </main>
  );
}
