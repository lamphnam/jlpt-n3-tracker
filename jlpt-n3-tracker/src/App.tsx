import { useMemo, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Flame, Route, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { STUDY_PHASES_CONFIG } from "@/constants";
import { generateStudySchedule } from "@/utils/schedule";
import { calculateStreaks } from "@/utils/streak";

import { useScrollToToday } from "@/hooks/useScrollToToday";
import { useAchievements } from "@/hooks/useAchievements";
import useStoredState from "@/hooks/useStoredState";

import { AppHeader } from "@/components/AppHeader";
import { PhaseCard } from "@/components/PhaseCard";
import { StudyDayItem } from "@/components/StudyDayItem";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import { FilterControls, FilterType } from "@/components/FilterControls";
import { Achievements } from "@/components/Achievements";

export default function App() {
  const [activeTab, setActiveTab] = useStoredState<string>('jlptN3ActiveTab', 'checklist');
  const [filter, setFilter] = useStoredState<FilterType>('jlptN3Filter', 'all');

  const schedule = useMemo(() => generateStudySchedule(), []);
  const todayRef = useScrollToToday(schedule, filter);

  const [completedDays, setCompletedDays] = useStoredState<string[]>(
    'jlptN3TrackerCompletedDaysV2',
    []
  );
  const completedDaysSet = useMemo(() => new Set(completedDays), [completedDays]);

  const unlockedAchievements = useAchievements(completedDaysSet, schedule);

  const toggleDay = useCallback((dateString: string) => {
    setCompletedDays(prev => {
      const newCompleted = new Set(prev);
      if (newCompleted.has(dateString)) {
        newCompleted.delete(dateString);
      } else {
        newCompleted.add(dateString);
      }
      return Array.from(newCompleted);
    });
  }, [setCompletedDays]);

  const filteredSchedule = useMemo(() => {
    switch (filter) {
      case 'completed':
        return schedule.filter(day => completedDaysSet.has(day.dateString));
      case 'incomplete':
        return schedule.filter(day => !completedDaysSet.has(day.dateString) && !day.isExamDay);
      case 'all':
      default:
        return schedule;
    }
  }, [filter, schedule, completedDaysSet]);

  const { currentStreak } = useMemo(() => calculateStreaks(completedDaysSet), [completedDaysSet]);

  const daysUntilExam = useMemo(() => {
    const today = new Date();
    const examDate = new Date("2025-12-07T00:00:00");
    const diff = Math.ceil((examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, []);

  const completionRate = (completedDays.length / (schedule.length - 1)) * 100;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 bg-background min-h-screen font-sans relative">
      <DarkModeToggle />
      <AppHeader
        totalDays={schedule.length - 1}
        completedDays={completedDays.length}
        completionRate={completionRate}
        currentStreak={currentStreak}
        daysUntilExam={daysUntilExam}
      />

      <main>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="checklist"><Route className="w-4 h-4 mr-2" />Checklist</TabsTrigger>
            <TabsTrigger value="phases"><Flame className="w-4 h-4 mr-2" />Kế hoạch</TabsTrigger>
            <TabsTrigger value="achievements"><Award className="w-4 h-4 mr-2" />Thành tựu</TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="mt-4 space-y-4">
            <FilterControls activeFilter={filter} onFilterChange={setFilter} />
            <motion.div layout className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              <AnimatePresence>
                {filteredSchedule.length > 0 ? (
                  filteredSchedule.map((day) => (
                    <motion.div
                      key={day.dateString}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <StudyDayItem
                        day={day}
                        isCompleted={completedDaysSet.has(day.dateString)}
                        onToggle={toggleDay}
                        itemRef={day.isToday ? todayRef : undefined}
                      />
                    </motion.div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">Không có mục nào phù hợp.</p>
                )}
              </AnimatePresence>
            </motion.div>
          </TabsContent>

          <TabsContent value="phases" className="mt-4 space-y-6">
            {STUDY_PHASES_CONFIG.map((phase) => (
              <PhaseCard key={phase.title} phase={phase} />
            ))}
          </TabsContent>

          <TabsContent value="achievements" className="mt-4">
            <Achievements unlockedIds={unlockedAchievements} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}