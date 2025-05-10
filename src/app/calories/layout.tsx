import Sidebar from "@/components/layout/Sidebar";
import MenuBar from "@/components/layout/MenuBar";

export default function CaloriesRayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
      <MenuBar />
    </div>
  );
}
