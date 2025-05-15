"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Scale, Utensils, LineChart, Target } from "lucide-react";

const menuItems = [
  {
    icon: Utensils,
    label: "食事",
    href: "/calories/meals",
  },
  {
    icon: Scale,
    label: "体重",
    href: "/calories/weight",
  },
  {
    icon: LineChart,
    label: "グラフ",
    href: "/calories/graph",
    disabled: true,
  },
  {
    icon: Target,
    label: "目標",
    href: "/calories/goals",
    disabled: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-64 border-r bg-background p-4 md:block">
      <div className="mb-8">
        <Link href="/" className="text-xl font-bold">
          Life Dash
        </Link>
      </div>
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.disabled ? "#" : item.href}
            className={cn(
              "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
              pathname === item.href
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-secondary/80 hover:text-secondary-foreground",
              item.disabled && "pointer-events-none opacity-50"
            )}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
