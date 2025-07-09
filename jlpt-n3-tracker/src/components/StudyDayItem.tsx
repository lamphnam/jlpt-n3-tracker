import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StudyDay } from "@/types";

type StudyDayItemProps = {
    day: StudyDay;
    isCompleted: boolean;
    onToggle: (dateString: string) => void;
    itemRef?: React.Ref<HTMLDivElement>;
};

export const StudyDayItem = React.memo(({ day, isCompleted, onToggle, itemRef }: StudyDayItemProps) => {
    return (
        <Card
            ref={itemRef}
            className={cn(
                "transition-all hover:shadow-md dark:hover:shadow-primary/10",
                isCompleted ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "bg-card",
                day.isExamDay && "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700",
                day.isToday && !isCompleted && "border-primary shadow-md"
            )}
        >
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                        <Checkbox
                            checked={isCompleted}
                            onCheckedChange={() => onToggle(day.dateString)}
                            id={day.dateString}
                            className="w-5 h-5 mt-1"
                            disabled={day.isExamDay}
                        />
                        <div className="grid gap-0.5">
                            <label htmlFor={day.dateString} className="flex items-center gap-2 font-medium cursor-pointer">
                                {day.dateString} ({day.dayName})
                                {day.isWeekend && !day.isExamDay && <Badge variant="secondary" className="text-xs">Ôn tập</Badge>}
                                {day.isToday && <Badge className="text-xs">Hôm nay</Badge>}
                                {day.isExamDay && <Badge variant="destructive" className="text-xs">Ngày thi</Badge>}
                            </label>
                            <p className="text-sm text-muted-foreground">{day.content}</p>
                        </div>
                    </div>
                    <Badge variant="outline" className="text-xs hidden sm:flex whitespace-nowrap">
                        {day.phase.split(":")[0]}
                    </Badge>
                </div>
            </CardContent>
        </Card>
    );
});