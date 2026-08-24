"use client"

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { modules, totalLessons, flatLessons } from "@/lib/course-data"

const STORAGE_KEY = "cre-bootcamp-progress-v1"

type View =
  | { name: "dashboard" }
  | { name: "module"; moduleId: string }
  | { name: "lesson"; lessonId: string }
  | { name: "glossary" }
  | { name: "state-of-ai" }
  | { name: "agent-lab" }
  | { name: "agent-lab-lesson"; lessonId: string }

interface CourseContextValue {
  view: View
  completed: Set<string>
  goDashboard: () => void
  goModule: (moduleId: string) => void
  goLesson: (lessonId: string) => void
  goGlossary: () => void
  goStateOfAi: () => void
  goAgentLab: () => void
  goAgentLabLesson: (lessonId: string) => void
  toggleComplete: (lessonId: string) => void
  isComplete: (lessonId: string) => boolean
  completedCount: number
  overallPercent: number
  modulePercent: (moduleId: string) => number
  nextLessonId: string | null
  curriculumComplete: boolean
  curriculumLessonsRemaining: number
  resetProgress: () => void
  progressHydrated: boolean
  justCompletedModuleId: string | null
  dismissModuleCelebration: () => void
}

const CourseContext = createContext<CourseContextValue | null>(null)

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>({ name: "dashboard" })
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [progressHydrated, setProgressHydrated] = useState(false)
  const [justCompletedModuleId, setJustCompletedModuleId] = useState<string | null>(null)
  const previousModulePctRef = useRef<Record<string, number>>({})

  // Hydrate from localStorage after mount (SSR-safe).
  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (Array.isArray(parsed)) setCompleted(new Set(parsed.filter((v): v is string => typeof v === "string")))
      }
    } catch {
      // corrupt storage, ignore
    }
    setProgressHydrated(true)
  }, [])

  // Persist on change, but not before hydration completes.
  useEffect(() => {
    if (!progressHydrated || typeof window === "undefined") return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(completed)))
    } catch {
      // quota or private-mode failure, ignore
    }
  }, [completed, progressHydrated])

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
  const goGlossary = useCallback(() => {
    setView({ name: "glossary" })
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [])
  const goStateOfAi = useCallback(() => {
    setView({ name: "state-of-ai" })
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [])
  const goAgentLab = useCallback(() => {
    setView({ name: "agent-lab" })
    if (typeof window !== "undefined") window.scrollTo(0, 0)
  }, [])
  const goAgentLabLesson = useCallback((lessonId: string) => {
    setView({ name: "agent-lab-lesson", lessonId })
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

  const resetProgress = useCallback(() => {
    setCompleted(new Set())
    setJustCompletedModuleId(null)
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        // ignore
      }
    }
  }, [])

  const dismissModuleCelebration = useCallback(() => setJustCompletedModuleId(null), [])

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

  // Curriculum is complete when every lesson in every module has been marked done.
  // The Workshop + Agent Lab unlock only after this is true.
  const curriculumLessonsRemaining = useMemo(() => {
    const all = flatLessons()
    return all.filter(({ lesson }) => !completed.has(lesson.id)).length
  }, [completed])
  const curriculumComplete = curriculumLessonsRemaining === 0

  // Detect the moment a module transitions to 100%, fire a celebration banner.
  useEffect(() => {
    if (!progressHydrated) {
      // Seed the ref during hydration so restored progress doesn't fire a stale toast.
      const seeded: Record<string, number> = {}
      for (const m of modules) {
        if (m.lessons.length === 0) { seeded[m.id] = 0; continue }
        const done = m.lessons.filter((l) => completed.has(l.id)).length
        seeded[m.id] = Math.round((done / m.lessons.length) * 100)
      }
      previousModulePctRef.current = seeded
      return
    }
    for (const m of modules) {
      if (m.lessons.length === 0) continue
      const done = m.lessons.filter((l) => completed.has(l.id)).length
      const pct = Math.round((done / m.lessons.length) * 100)
      const prev = previousModulePctRef.current[m.id] ?? 0
      if (prev < 100 && pct === 100) {
        setJustCompletedModuleId(m.id)
      }
      previousModulePctRef.current[m.id] = pct
    }
  }, [completed, progressHydrated])

  const value = useMemo<CourseContextValue>(
    () => ({
      view,
      completed,
      goDashboard,
      goModule,
      goLesson,
      goGlossary,
      goStateOfAi,
      goAgentLab,
      goAgentLabLesson,
      toggleComplete,
      isComplete,
      completedCount: completed.size,
      overallPercent: Math.round((completed.size / totalLessons) * 100),
      modulePercent,
      nextLessonId,
      curriculumComplete,
      curriculumLessonsRemaining,
      resetProgress,
      progressHydrated,
      justCompletedModuleId,
      dismissModuleCelebration,
    }),
    [view, completed, goDashboard, goModule, goLesson, goGlossary, goStateOfAi, goAgentLab, goAgentLabLesson, toggleComplete, isComplete, modulePercent, nextLessonId, curriculumComplete, curriculumLessonsRemaining, resetProgress, progressHydrated, justCompletedModuleId, dismissModuleCelebration],
  )

  return <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
}

export function useCourse() {
  const ctx = useContext(CourseContext)
  if (!ctx) throw new Error("useCourse must be used within CourseProvider")
  return ctx
}
