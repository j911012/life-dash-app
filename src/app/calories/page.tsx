"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale, Utensils, ChevronLeft, ChevronRight, Home } from "lucide-react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const mockData = [
  { date: "5/1", weight: 66.0, bodyFat: 19.0, calories: 2100 },
  { date: "5/2", weight: 65.9, bodyFat: 18.9, calories: 1950 },
  { date: "5/3", weight: 65.8, bodyFat: 18.8, calories: 2200 },
  { date: "5/4", weight: 65.9, bodyFat: 18.9, calories: 1800 },
  { date: "5/5", weight: 65.7, bodyFat: 18.7, calories: 2000 },
  { date: "5/6", weight: 65.6, bodyFat: 18.6, calories: 1900 },
  { date: "5/7", weight: 65.5, bodyFat: 18.5, calories: 2100 },
  { date: "5/8", weight: 65.4, bodyFat: 18.4, calories: 1950 },
  { date: "5/9", weight: 65.3, bodyFat: 18.3, calories: 2200 },
  { date: "5/10", weight: 65.2, bodyFat: 18.2, calories: 1800 },
  { date: "5/11", weight: 65.1, bodyFat: 18.1, calories: 2000 },
  { date: "5/12", weight: 65.0, bodyFat: 18.0, calories: 1900 },
  { date: "5/13", weight: 64.9, bodyFat: 17.9, calories: 2100 },
];

const mockMeals = [
  { id: 1, name: "トースト", calories: 300, serving_size: 120 },
  { id: 2, name: "サラダ", calories: 400, serving_size: 250 },
  { id: 3, name: "ヨーグルト", calories: 150, serving_size: 100 },
];

export default function CaloriesPage() {
  const latestData = mockData[mockData.length - 1];
  const today = new Date();
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][today.getDay()];
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}`;

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto px-4 py-6 pb-20 md:pb-6">
      <div className="mx-auto space-y-4 md:space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="p-1 hover:bg-accent rounded-full"
            aria-label="ホームへ戻る"
          >
            <Home className="h-5 w-5 md:h-6 md:w-6 text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:bg-accent rounded-full">
              <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
            </button>
            <span className="text-base md:text-lg font-medium">
              今日 {formattedDate} ({dayOfWeek})
            </span>
            <button className="p-1 hover:bg-accent rounded-full">
              <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
            </button>
          </div>
        </div>

        {/* 今日の概要 */}
        <div className="grid gap-3 grid-cols-2 md:gap-4">
          <Card className="border-0 shadow-sm">
            <CardHeader className="p-3 pb-1 md:p-4 md:pb-1">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <Utensils className="h-4 w-4 md:h-5 md:w-5 text-blue-500" />
                カロリー
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 md:p-4 md:pt-0">
              <div className="text-lg md:text-xl font-bold">850 kcal</div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm">
            <CardHeader className="p-3 pb-1 md:p-4 md:pb-1">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <Scale className="h-4 w-4 md:h-5 md:w-5 text-green-500" />
                体重・体脂肪率
              </CardTitle>
            </CardHeader>
            <CardContent className="p-3 pt-0 md:p-4 md:pt-0">
              <div className="flex items-center justify-between gap-4 md:justify-start md:gap-10">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg md:text-xl font-bold">
                    {latestData.weight}
                  </span>
                  <span className="text-xs text-muted-foreground">kg</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg md:text-xl font-bold">
                    {latestData.bodyFat}
                  </span>
                  <span className="text-xs text-muted-foreground">%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* グラフ */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-3 md:p-6">
            <CardTitle className="text-sm md:text-base">
              体重とカロリーの推移
            </CardTitle>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-accent rounded-full">
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </button>
              <span className="text-xs md:text-sm">2024年3月</span>
              <button className="p-1 hover:bg-accent rounded-full">
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent className="relative p-3 pt-0 md:p-6 md:pt-0">
            <div className="h-[250px] md:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={mockData}
                  margin={{ right: 10, left: 10, top: 10, bottom: 0 }}
                >
                  <XAxis
                    dataKey="date"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    yAxisId="weight"
                    orientation="left"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={["dataMin - 0.5", "dataMax + 0.5"]}
                    width={40}
                  />
                  <YAxis
                    yAxisId="calories"
                    orientation="right"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    width={45}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: "12px" }}
                    itemStyle={{ fontSize: "12px" }}
                    labelStyle={{ fontSize: "12px" }}
                  />
                  <Legend
                    wrapperStyle={{
                      fontSize: "12px",
                      paddingTop: "15px",
                    }}
                  />
                  <Bar
                    yAxisId="calories"
                    dataKey="calories"
                    fill="rgb(59,130,246)"
                    name="カロリー (kcal)"
                    barSize={6}
                  />
                  <Line
                    yAxisId="weight"
                    type="monotone"
                    dataKey="weight"
                    stroke="rgb(34,197,94)"
                    name="体重 (kg)"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* 食事履歴 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between p-3 md:p-6">
            <CardTitle className="text-sm md:text-base">食事履歴</CardTitle>
            <Link
              href="/calories/meals"
              className="text-xs md:text-sm text-muted-foreground hover:text-primary"
            >
              すべて表示
            </Link>
          </CardHeader>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <ul className="space-y-2">
              {mockMeals.map((meal) => (
                <li
                  key={meal.id}
                  className="flex items-center justify-between text-xs md:text-sm"
                >
                  <span className="text-muted-foreground">{meal.name}</span>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-muted-foreground">
                      {meal.serving_size}g
                    </span>
                    <span>{meal.calories} kcal</span>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
