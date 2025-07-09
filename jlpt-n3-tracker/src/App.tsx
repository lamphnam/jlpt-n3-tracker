
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { CalendarDays, BookOpen, Target, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils" // Import cn utility

// Thêm vào đầu tệp App.tsx
type StudyDay = {
  date: Date;
  dateString: string;
  dayName: string;
  content: string;
  phase: string;
  isWeekend: boolean;
  isExamDay: boolean;
};

// Generate study schedule data
const generateStudySchedule = () => {
  const schedule: StudyDay[] = [];
  const startDate = new Date("2025-07-09T00:00:00")
  const endDate = new Date("2025-12-07T00:00:00")

  const phases = [
    { name: "Giai đoạn 1: Xây nền", start: new Date("2025-07-09"), end: new Date("2025-09-09"), vocab: 30, grammar: 3 },
    { name: "Giai đoạn 2: Củng cố", start: new Date("2025-09-10"), end: new Date("2025-11-02"), vocab: 25, grammar: 2 },
    { name: "Giai đoạn 3: Ôn sâu", start: new Date("2025-11-03"), end: new Date("2025-11-30"), vocab: 10, grammar: 1 },
    { name: "Giai đoạn 4: Nước rút", start: new Date("2025-12-01"), end: new Date("2025-12-06"), vocab: 0, grammar: 0 },
  ]

  const currentDate = new Date(startDate)

  const finalExamDay = {
    date: new Date(endDate),
    dateString: endDate.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' }),
    dayName: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][endDate.getDay()],
    content: "NGÀY THI JLPT N3! 頑張って！",
    phase: "Ngày thi",
    isExamDay: true,
    isWeekend: true,
  }

  while (currentDate < endDate) {
    const dayOfWeek = currentDate.getDay()
    const currentPhase = phases.find((phase) => currentDate >= phase.start && currentDate <= phase.end)

    let content = ""
    if (dayOfWeek === 0) { // Chủ Nhật
      content = "Ôn tập toàn bộ nội dung trong tuần"
    } else { // Thứ 2 -> Thứ 7
      if (currentPhase?.name === "Giai đoạn 4: Nước rút") {
        content = "Luyện đề thi thử + ôn tập tổng hợp"
      } else {
        content = `${currentPhase?.vocab || 0} từ vựng mới; ${currentPhase?.grammar || 0} điểm ngữ pháp mới`
      }
    }

    schedule.push({
      date: new Date(currentDate),
      dateString: currentDate.toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' }),
      dayName: ["CN", "T2", "T3", "T4", "T5", "T6", "T7"][dayOfWeek],
      content,
      phase: currentPhase?.name || "",
      isWeekend: dayOfWeek === 0,
      isExamDay: false,
    })

    currentDate.setDate(currentDate.getDate() + 1)
  }

  schedule.push(finalExamDay);
  return schedule
}

export default function App() {
  const schedule = generateStudySchedule()

  const [completedDays, setCompletedDays] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem("jlptN3TrackerCompletedDays")
      return saved ? new Set(JSON.parse(saved)) : new Set()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return new Set()
    }
  })

  useEffect(() => {
    localStorage.setItem("jlptN3TrackerCompletedDays", JSON.stringify(Array.from(completedDays)))
  }, [completedDays])


  const toggleDay = (dateString: string) => {
    setCompletedDays(prev => {
      const newCompleted = new Set(prev)
      if (newCompleted.has(dateString)) {
        newCompleted.delete(dateString)
      } else {
        newCompleted.add(dateString)
      }
      return newCompleted
    })
  }

  const completionRate = (completedDays.size / (schedule.length - 1)) * 100

  const studyPhases = [
    {
      title: "Giai đoạn 1: Xây nền (9/7 – 9/9/2025)",
      description: "Mỗi ngày học: 30 từ vựng + 3 ngữ pháp",
      details: ["Ưu tiên ghi nhớ nhanh, làm quen kiến thức nền", "Dùng ví dụ và kiểm tra nhanh mỗi ngày"],
      color: "bg-blue-500",
    },
    {
      title: "Giai đoạn 2: Củng cố (10/9 – 2/11/2025)",
      description: "Mỗi ngày học: 25 từ + 2 điểm ngữ pháp",
      details: ["Bắt đầu luyện đề xen kẽ, hiểu sâu hơn", "Tập trung củng cố kiến thức đã học"],
      color: "bg-green-500",
    },
    {
      title: "Giai đoạn 3: Ôn sâu (3/11 – 30/11/2025)",
      description: "Mỗi ngày học nhẹ: 10 từ + 1 điểm ngữ pháp",
      details: ["Chủ yếu ôn lại, luyện đề, khắc sâu kiến thức", "Rà soát lỗi sai và điểm yếu"],
      color: "bg-orange-500",
    },
    {
      title: "Giai đoạn 4: Nước rút (1/12 – 6/12/2025)",
      description: "Không học mới, chỉ ôn tập tổng hợp",
      details: ["Luyện đề giống điều kiện thi thật", "Chuẩn bị tâm lý và thể chất"],
      color: "bg-red-500",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6 bg-slate-50 min-h-screen font-sans">
      <header className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Lộ trình ôn thi JLPT N3</h1>
        <p className="text-lg md:text-xl text-gray-600">09/07/2025 – 07/12/2025</p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Badge variant="outline" className="text-md px-4 py-2">
            <CalendarDays className="w-4 h-4 mr-2" />
            {schedule.length - 1} ngày học
          </Badge>
          <Badge variant="outline" className="text-md px-4 py-2">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {completedDays.size} ngày hoàn thành
          </Badge>
        </div>
        <div className="max-w-md mx-auto pt-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Tiến độ hoàn thành</span>
            <span>{Math.round(completionRate)}%</span>
          </div>
          <Progress value={completionRate} className="h-3" />
        </div>
      </header>

      <main>
        <Tabs defaultValue="checklist" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="checklist">Checklist Theo Ngày</TabsTrigger>
            <TabsTrigger value="phases">Kế Hoạch 4 Giai Đoạn</TabsTrigger>
          </TabsList>

          <TabsContent value="checklist" className="mt-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <BookOpen className="w-5 h-5" />
                  Nguyên tắc học
                </CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-1 text-slate-700">
                <p><strong>T2–T7:</strong> Học mới theo mục tiêu mỗi ngày.</p>
                <p><strong>CN:</strong> Ôn lại toàn bộ kiến thức trong tuần.</p>
              </CardContent>
            </Card>

            <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
              {schedule.map((day) => (
                <Card
                  key={day.dateString}
                  className={cn(
                    "transition-all",
                    completedDays.has(day.dateString) ? "bg-green-50 border-green-200" : "bg-white",
                    day.isExamDay && "bg-yellow-50 border-yellow-300"
                  )}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-start gap-4">
                        <Checkbox
                          checked={completedDays.has(day.dateString)}
                          onCheckedChange={() => toggleDay(day.dateString)}
                          id={day.dateString}
                          className="w-5 h-5 mt-1"
                          disabled={day.isExamDay}
                        />
                        <div className="grid gap-0.5">
                          <label htmlFor={day.dateString} className="flex items-center gap-2 font-medium cursor-pointer">
                            {day.dateString} ({day.dayName})
                            {day.isWeekend && <Badge variant="secondary" className="text-xs">Ôn tập</Badge>}
                            {day.isExamDay && <Badge variant="destructive" className="text-xs">Ngày thi</Badge>}
                          </label>
                          <p className="text-sm text-gray-600">{day.content}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs hidden sm:flex whitespace-nowrap">
                        {day.phase.split(":")[0]}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="phases" className="mt-4 space-y-6">
            {studyPhases.map((phase) => (
              <Card key={phase.title}>
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
                        <Target className="w-4 h-4 mt-1 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}