import { PHASES_DATA } from "@/constants";
import { StudyDay } from "@/types";

export const generateStudySchedule = (): StudyDay[] => {
  const schedule: StudyDay[] = [];
  const startDate = new Date("2025-07-09T00:00:00");
  const endDate = new Date("2025-12-07T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const finalExamDay: StudyDay = {
    date: new Date(endDate),
    dateString: endDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    dayName: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][endDate.getDay()],
    content: "NGÀY THI JLPT N3! 頑張って！",
    phase: "Ngày thi",
    isExamDay: true,
    isWeekend: true,
    isToday: endDate.getTime() === today.getTime(),
  };

  const currentDate = new Date(startDate);
  while (currentDate < endDate) {
    const dayOfWeek = currentDate.getDay();
    const currentPhase = PHASES_DATA.find(
      (phase) => currentDate >= phase.start && currentDate <= phase.end
    );
    let content = "";
    if (dayOfWeek === 0) {
      content = "Ôn tập toàn bộ nội dung trong tuần";
    } else {
      content = currentPhase
        ? currentPhase.vocab > 0
          ? `${currentPhase.vocab} từ vựng mới; ${currentPhase.grammar} điểm ngữ pháp mới`
          : "Luyện đề thi thử + ôn tập tổng hợp"
        : "Nghỉ ngơi";
    }

    schedule.push({
      date: new Date(currentDate),
      dateString: currentDate.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      dayName: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][dayOfWeek],
      content,
      phase: currentPhase?.name || "",
      isWeekend: dayOfWeek === 0,
      isExamDay: false,
      isToday: currentDate.getTime() === today.getTime(),
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  schedule.push(finalExamDay);
  return schedule;
};
