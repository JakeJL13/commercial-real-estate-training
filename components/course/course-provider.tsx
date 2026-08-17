"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { modules, totalLessons, flatLessons } from "@/lib/course-data"

type View =
  | { name: "dashboard" }
  | { name: "module"; moduleId: string }
  | { name: "lesson"; lessonId: string }

interface CourseContextValue {
  view: View
  completed: Set<string>
  goDashboard: () => void
  goModule: (moduleId: string) => void
  goLesson: (lessonId: string) => void
  toggleComplete: (lessonId: string) => void
  isComplete: (lessonId: string) => boolean
  completedCount: number
  overallPercent: number
  modulePercent: (moduleId: string) => number
  nextLessonId: string | null
}

const CourseContext = createContext<CourseContextValue | null>(null)

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>({ name: "dashboard" })
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const goDashboard = useCallback(() => {
    setView({ name: "dashboard" })
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [])
  const goModule = useCallback((moduleId: string) => {
    setView({ name: "module", moduleId })
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [])
  const goLesson = useCallback((lessonId: string) => {
    setView({ name: "lesson", lessonId })
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [])

  const toggleComplete = useCallback((lessonId: string) => {
    setCompleted((prev) => {
      const next = new Set(prev)
      if (next.has(lessonId)) next.delete(lessonId)
      else next.add(lessonId)
      return next
    })
  }, [])

  const isComplete = useCallback((lessonId: string) => completed.has(lessonId), [completed])

  const modulePercent = useCallback(
    (moduleId: string) => {
      const mod = modules.find((m) => m.id === moduleId)
      if (!mod || mod.lessons.length === 0) return 0
      const done = mod.lessons.filter((l) => completed.has(l.id)).length
      return Math.round((done / mod.lessons.length) * 100)
    },
    [completed],
  )

  const nextLessonId = useMemo(() => {
    const all = flatLessons()
    const next = all.find(({ lesson }) => !completed.has(lesson.id))
    return next ? next.lesson.id : null
  }, [completed])

  const value = useMemo<CourseContextValue>(
    () => ({
      view,
      completed,
      goDashboard,
      goModule,
      goLesson,
      toggleComplete,
      isComplete,
      completedCount: completed.size,
      overallPercent: Math.round((completed.size / totalLessons) * 100),
      modulePercent,
      nextLessonId,
    }),
    [view, completed, goDashboard, goModule, goLesson, toggleComplete, isComplete, modulePercent, nextLessonId],
  )

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
}

export function useCourse() {
  const ctx = useContext(CourseContext)
  if (!ctx) throw new Error("useCourse must be used within CourseProvider")
  return ctx
}
