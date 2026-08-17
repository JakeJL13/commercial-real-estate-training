import { BookOpen, FlaskConical, ClipboardCheck, type LucideIcon } from "lucide-react"
import type { LessonType } from "@/lib/course-data"

export const lessonMeta: Record<LessonType, { label: string; icon: LucideIcon }> = {
  lesson: { label: "Lesson", icon: BookOpen },
  workshop: { label: "Workshop", icon: FlaskConical },
  assessment: { label: "Assessment", icon: ClipboardCheck },
}
