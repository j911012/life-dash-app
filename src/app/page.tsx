import TodoCard from "@/app/components/TodoCard";

export default function Home() {
  return (
    <main className="mx-auto max-w-screen-sm p-4">
      <h1 className="mb-6 text-2xl font-bold">LifeDash</h1>

      <div className="grid gap-4 sm:grid-cols-2">
        <TodoCard />
      </div>
    </main>
  );
}
