import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { WeightChart } from "@/components/calorie/WeightChart";

// モックデータ
type WeightRecord = {
  id: number;
  date: string;
  weight: number;
  bodyFat: number | null;
};

const mockRecords: WeightRecord[] = [
  { id: 1, date: "2024/5/10", weight: 65.2, bodyFat: 18.2 },
  { id: 2, date: "2024/5/9", weight: 65.4, bodyFat: 18.4 },
  { id: 3, date: "2024/5/8", weight: 65.5, bodyFat: 18.5 },
  { id: 4, date: "2024/5/7", weight: 65.7, bodyFat: 18.6 },
  { id: 5, date: "2024/5/6", weight: 65.8, bodyFat: 18.7 },
];

// グラフ用のデータ整形
const chartData = [...mockRecords]
  .reverse()
  .map(({ date, weight }) => ({ date, weight }));

export default function WeightPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 flex items-center">
        <Link
          href="/calories"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="カロリーページに戻る"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="flex-1 text-center text-lg md:text-xl font-semibold">
          体重・体脂肪率
        </h1>
        <div className="w-10"></div>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 md:max-w-[180px]">
              <Input type="number" placeholder="体重 (kg)" step="0.1" />
            </div>
            <div className="flex-1 md:max-w-[180px]">
              <Input type="number" placeholder="体脂肪率 (%)" step="0.1" />
            </div>
            <Button>記録</Button>
          </div>
        </CardContent>
      </Card>

      {/* グラフ表示 */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <WeightChart data={chartData} />
        </CardContent>
      </Card>
    </div>
  );
}
