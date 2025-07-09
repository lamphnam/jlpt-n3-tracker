import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StudyPhase } from "@/types";
import { Target } from "lucide-react";

type PhaseCardProps = {
    phase: StudyPhase;
};

export function PhaseCard({ phase }: PhaseCardProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className={cn("w-3 h-3 rounded-full mt-1.5 flex-shrink-0", phase.color)} />
                    <div className="flex-1">
                        <CardTitle className="text-xl">{phase.title}</CardTitle>
                        <CardDescription className="text-base mt-1">{phase.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-2 pl-4">
                    {phase.details.map((detail) => (
                        <li key={detail} className="flex items-start gap-2">
                            <Target className="w-4 h-4 mt-1 text-muted-foreground flex-shrink-0" />
                            <span className="text-foreground/80">{detail}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
}