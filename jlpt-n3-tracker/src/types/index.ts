export type StudyDay = {
  date: Date;
  dateString: string;
  dayName: string;
  content: string;
  phase: string;
  isWeekend: boolean;
  isToday: boolean;
  isExamDay: boolean;
};

export type StudyPhase = {
  title: string;
  description: string;
  details: string[];
  color: string;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: (
    completedDays: Set<string>,
    schedule: StudyDay[],
    streaks: { currentStreak: number; longestStreak: number }
  ) => boolean;
};
