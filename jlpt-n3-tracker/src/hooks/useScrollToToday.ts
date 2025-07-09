import { useEffect, useRef } from "react";
import { StudyDay } from "@/types";

export const useScrollToToday = (
  schedule: StudyDay[],
  activeFilter: string
) => {
  const todayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeFilter !== "all") return;

    const todayIndex = schedule.findIndex((day) => day.isToday);
    if (todayIndex > -1) {
      const timer = setTimeout(() => {
        todayRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 500); // Delay to allow animations to finish
      return () => clearTimeout(timer);
    }
  }, [schedule, activeFilter]);

  return todayRef;
};
