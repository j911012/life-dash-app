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
      <main className="flex-1 pb-20 md:pb-0">
        <div className="mx-auto max-w-4xl p-4">{children}</div>
      </main>
      <MenuBar />
    </div>
  );
}
