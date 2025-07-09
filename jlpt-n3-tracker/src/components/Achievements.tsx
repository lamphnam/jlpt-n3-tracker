import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ACHIEVEMENTS_CONFIG } from "@/constants";
import { cn } from "@/lib/utils";
import { Award } from "lucide-react";

type AchievementsProps = {
    unlockedIds: Set<string>;
};

export function Achievements({ unlockedIds }: AchievementsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Thành tựu
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {ACHIEVEMENTS_CONFIG.map(ach => (
                    <div
                        key={ach.id}
                        className={cn(
                            "flex flex-col items-center text-center p-4 border rounded-lg transition-all transform hover:-translate-y-1",
                            unlockedIds.has(ach.id)
                                ? "border-amber-400 bg-amber-50 dark:bg-amber-900/20"
                                : "opacity-40 grayscale"
                        )}
                        title={ach.description}
                    >
                        <div className="text-4xl mb-2">{ach.icon}</div>
                        <h3 className="font-semibold text-sm">{ach.title}</h3>
                        {!unlockedIds.has(ach.id) && <p className="text-xs text-muted-foreground mt-1">Chưa mở khóa</p>}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}