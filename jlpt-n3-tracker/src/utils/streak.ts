export const calculateStreaks = (
  completedDays: Set<string>
): { currentStreak: number; longestStreak: number } => {
  if (completedDays.size === 0) return { currentStreak: 0, longestStreak: 0 };

  const sortedDates = Array.from(completedDays)
    .map((dateStr) => {
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day);
    })
    .sort((a, b) => a.getTime() - b.getTime());

  let longestStreak = 0;
  let currentStreak = 0;

  if (sortedDates.length > 0) {
    longestStreak = 1;
    let tempLongest = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const diff =
        (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) /
        (1000 * 60 * 60 * 24);
      if (diff === 1) {
        tempLongest++;
      } else {
        if (tempLongest > longestStreak) longestStreak = tempLongest;
        tempLongest = 1;
      }
    }
    if (tempLongest > longestStreak) longestStreak = tempLongest;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const lastCompletedDate = sortedDates[sortedDates.length - 1];

    const isLastDayTodayOrYesterday =
      today.getTime() - lastCompletedDate.getTime() <= 24 * 60 * 60 * 1000;

    if (isLastDayTodayOrYesterday) {
      currentStreak = 1;
      for (let i = sortedDates.length - 1; i > 0; i--) {
        const diff =
          (sortedDates[i].getTime() - sortedDates[i - 1].getTime()) /
          (1000 * 60 * 60 * 24);
        if (diff === 1) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }

  return { currentStreak, longestStreak };
};
