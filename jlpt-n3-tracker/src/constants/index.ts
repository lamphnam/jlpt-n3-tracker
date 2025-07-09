import { StudyPhase, Achievement } from "@/types";

export const STUDY_PHASES_CONFIG: StudyPhase[] = [
  {
    title: "Giai đoạn 1: Xây nền (09/07 – 09/09/2025)",
    description: "Mỗi ngày học: 30 từ vựng + 3 ngữ pháp",
    details: [
      "Ưu tiên ghi nhớ nhanh, làm quen kiến thức nền",
      "Dùng ví dụ và kiểm tra nhanh mỗi ngày",
    ],
    color: "bg-blue-500",
  },
  {
    title: "Giai đoạn 2: Củng cố (10/09 – 02/11/2025)",
    description: "Mỗi ngày học: 25 từ + 2 điểm ngữ pháp",
    details: [
      "Bắt đầu luyện đề xen kẽ, hiểu sâu hơn",
      "Tập trung củng cố kiến thức đã học",
    ],
    color: "bg-green-500",
  },
  {
    title: "Giai đoạn 3: Ôn sâu (03/11 – 30/11/2025)",
    description: "Mỗi ngày học nhẹ: 10 từ + 1 điểm ngữ pháp",
    details: [
      "Chủ yếu ôn lại, luyện đề, khắc sâu kiến thức",
      "Rà soát lỗi sai và điểm yếu",
    ],
    color: "bg-orange-500",
  },
  {
    title: "Giai đoạn 4: Nước rút (01/12 – 06/12/2025)",
    description: "Không học mới, chỉ ôn tập tổng hợp",
    details: [
      "Luyện đề giống điều kiện thi thật",
      "Chuẩn bị tâm lý và thể chất",
    ],
    color: "bg-red-500",
  },
];

export const PHASES_DATA = [
  {
    name: "Giai đoạn 1: Xây nền",
    start: new Date("2025-07-09T00:00:00"),
    end: new Date("2025-09-09T23:59:59"),
    vocab: 30,
    grammar: 3,
  },
  {
    name: "Giai đoạn 2: Củng cố",
    start: new Date("2025-09-10T00:00:00"),
    end: new Date("2025-11-02T23:59:59"),
    vocab: 25,
    grammar: 2,
  },
  {
    name: "Giai đoạn 3: Ôn sâu",
    start: new Date("2025-11-03T00:00:00"),
    end: new Date("2025-11-30T23:59:59"),
    vocab: 10,
    grammar: 1,
  },
  {
    name: "Giai đoạn 4: Nước rút",
    start: new Date("2025-12-01T00:00:00"),
    end: new Date("2025-12-06T23:59:59"),
    vocab: 0,
    grammar: 0,
  },
];

export const ACHIEVEMENTS_CONFIG: Achievement[] = [
  {
    id: "first_check",
    title: "Khởi đầu nan",
    description: "Hoàn thành ngày học đầu tiên.",
    icon: "🚀",
    isUnlocked: (completedDays) => completedDays.size >= 1,
  },
  {
    id: "7_day_streak",
    title: "Nghiện học",
    description: "Hoàn thành 7 ngày học liên tiếp.",
    icon: "🔥",
    isUnlocked: (_completedDays, _schedule, streaks) =>
      streaks.longestStreak >= 7,
  },
  {
    id: "phase_1_complete",
    title: "Xây nền vững chắc",
    description: "Hoàn thành tất cả các ngày trong Giai đoạn 1.",
    icon: "🏗️",
    isUnlocked: (completedDays, schedule) => {
      const phase1Days = schedule.filter(
        (d) => d.phase === "Giai đoạn 1: Xây nền"
      );
      if (phase1Days.length === 0) return false;
      return phase1Days.every((d) => completedDays.has(d.dateString));
    },
  },
  {
    id: "weekend_warrior",
    title: "Chiến binh cuối tuần",
    description: "Hoàn thành một ngày học vào cuối tuần.",
    icon: "🛡️",
    isUnlocked: (completedDays, schedule) => {
      return schedule.some(
        (d) => d.isWeekend && completedDays.has(d.dateString)
      );
    },
  },
];
