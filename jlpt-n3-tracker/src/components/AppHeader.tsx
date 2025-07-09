import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CalendarDays, CheckCircle2, Flame, Hourglass } from "lucide-react";

type AppHeaderProps = {
    totalDays: number;
    completedDays: number;
    completionRate: number;
    currentStreak: number;
    daysUntilExam: number;
};

export function AppHeader({ totalDays, completedDays, completionRate, currentStreak, daysUntilExam }: AppHeaderProps) {
    return (
        <header className="text-center space-y-4 pt-12">
            <h1 className="text-3xl md:text-4xl font-bold">Lộ trình ôn thi JLPT N3</h1>
            <p className="text-lg md:text-xl text-muted-foreground">09/07/2025 – 07/12/2025</p>
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                <Badge variant="outline" className="px-3 py-1.5">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {totalDays} ngày học
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5">
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    {completedDays} đã xong
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5 text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-700">
                    <Flame className="w-4 h-4 mr-2" />
                    {currentStreak} ngày liên tiếp
                </Badge>
                <Badge variant="outline" className="px-3 py-1.5 text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-700">
                    <Hourglass className="w-4 h-4 mr-2" />
                    Còn {daysUntilExam} ngày
                </Badge>
            </div>
            <div className="max-w-md mx-auto pt-4">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Tiến độ hoàn thành</span>
                    <span>{Math.round(completionRate)}%</span>
                </div>
                <Progress value={completionRate} className="h-3" />
            </div>
        </header>
    );
}