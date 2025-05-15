"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Scale, Utensils } from "lucide-react";

// 仮のデータ
const mockData = {
  calories: 850,
  weight: 65.2,
  bodyFat: 18.2,
};

export default function CalorieCard() {
  return (
    <Link href="/calories" className="block w-full">
      <Card className="h-40 transition hover:shadow-md dark:bg-gray-800">
        <CardContent className="relative h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Calories</h3>
            <div className="flex items-center gap-1.5">
              <Scale className="h-4 w-4 text-green-500" />
              <Utensils className="h-4 w-4 text-blue-500" />
            </div>
          </div>

          <div className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex items-center justify-between">
              <span>カロリー</span>
              <span className="font-medium">{mockData.calories} kcal</span>
            </div>
            <div className="flex items-center justify-between">
              <span>体重</span>
              <span className="font-medium">{mockData.weight} kg</span>
            </div>
            <div className="flex items-center justify-between">
              <span>体脂肪率</span>
              <span className="font-medium">{mockData.bodyFat} %</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
