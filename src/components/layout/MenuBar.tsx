"use client";

import Link from "next/link";
import { Scale, Utensils, LineChart, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

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

export default function MenuBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-background md:hidden">
      <div className="flex h-16 items-center justify-around">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-1 px-4 py-2",
              pathname === item.href
                ? "text-primary"
                : "text-muted-foreground hover:text-primary",
              item.disabled && "pointer-events-none opacity-50"
            )}
          >
            <item.icon size={24} />
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
