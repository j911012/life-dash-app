import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen, ChevronLeft } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

// モックデータ
type Meal = {
  id: number;
  name: string;
  serving_size: number;
  calories: number;
};

const mockMeals: Meal[] = [
  {
    id: 1,
    name: "サラダ",
    serving_size: 100,
    calories: 200,
  },
  {
    id: 2,
    name: "ハンバーグ",
    serving_size: 150,
    calories: 300,
  },
  {
    id: 3,
    name: "チキン胸肉",
    serving_size: 120,
    calories: 165,
  },
  {
    id: 4,
    name: "玄米ご飯",
    serving_size: 150,
    calories: 180,
  },
  {
    id: 5,
    name: "豆腐",
    serving_size: 150,
    calories: 126,
  },
  {
    id: 6,
    name: "味噌汁",
    serving_size: 200,
    calories: 50,
  },
  {
    id: 7,
    name: "ヨーグルト",
    serving_size: 100,
    calories: 98,
  },
  {
    id: 8,
    name: "チーズ",
    serving_size: 30,
    calories: 100,
  },
  {
    id: 9,
    name: "ヨーグルト",
    serving_size: 100,
    calories: 98,
  },
];

export default function MealsPage() {
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center">
        <Link
          href="/calories"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          aria-label="カロリーページに戻る"
        >
          <ChevronLeft className="h-6 w-6" />
        </Link>
        <h1 className="flex-1 text-center text-lg md:text-xl font-semibold">
          食事記録
        </h1>
        <div className="w-10"></div>
      </div>
      <Card>
        <CardContent className="pb-6">
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex-1">
              <Input type="text" placeholder="食事を入力" />
            </div>
            <div className="w-full md:w-32">
              <Input type="number" placeholder="g" />
            </div>
            <Button>追加</Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>食事</TableHead>
                  <TableHead className="text-right">グラム</TableHead>
                  <TableHead className="text-right">カロリー</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockMeals.map((meal) => (
                  <TableRow key={meal.id}>
                    <TableCell>{meal.name}</TableCell>
                    <TableCell className="text-right">
                      {meal.serving_size}g
                    </TableCell>
                    <TableCell className="text-right">
                      {meal.calories}kcal
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Pen className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
