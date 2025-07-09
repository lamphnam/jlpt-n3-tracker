import { useEffect } from "react";
import toast from "react-hot-toast";
import useStoredState from "./useStoredState";
import { ACHIEVEMENTS_CONFIG } from "@/constants";
import { calculateStreaks } from "@/utils/streak";
import { StudyDay } from "@/types";

export const useAchievements = (
  completedDays: Set<string>,
  schedule: StudyDay[]
) => {
  const [unlockedAchievements, setUnlockedAchievements] = useStoredState<
    string[]
  >("jlptN3UnlockedAchievements", []);
  const unlockedSet = new Set(unlockedAchievements);

  useEffect(() => {
    const streaks = calculateStreaks(completedDays);
    const newUnlocked = new Set(unlockedSet);
    let hasNewAchievement = false;

    ACHIEVEMENTS_CONFIG.forEach((ach) => {
      if (!unlockedSet.has(ach.id)) {
        if (ach.isUnlocked(completedDays, schedule, streaks)) {
          newUnlocked.add(ach.id);
          toast.success(`Thành tựu mới: ${ach.title}!`, { icon: ach.icon });
          hasNewAchievement = true;
        }
      }
    });

    if (hasNewAchievement) {
      setUnlockedAchievements(Array.from(newUnlocked));
    }
  }, [completedDays, schedule, unlockedSet, setUnlockedAchievements]);

  return unlockedSet;
};
