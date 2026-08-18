"use client"

import { Building2 } from "lucide-react"
import { useCourse } from "./course-provider"
import { Sidebar } from "./sidebar"
import { Dashboard } from "./dashboard"
import { ModuleDetail } from "./module-detail"
import { LessonDetail } from "./lesson-detail"
import { Glossary } from "./glossary"
import { StateOfAi } from "./state-of-ai"

export function Platform() {
  const { view, goDashboard, overallPercent } = useCourse()

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar />
      <main className="min-w-0 flex-1">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between border-b border-border bg-card px-5 py-3 lg:hidden">
          <button onClick={goDashboard} className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Building2 className="size-4" />
            </div>
            <span className="text-sm font-semibold">Meridian AI Academy</span>
          </button>
          <span className="font-mono text-xs font-semibold text-muted-foreground">{overallPercent}%</span>
        </div>

        {view.name === "dashboard" && <Dashboard />}
        {view.name === "module" && <ModuleDetail moduleId={view.moduleId} />}
        {view.name === "lesson" && <LessonDetail lessonId={view.lessonId} />}
        {view.name === "glossary" && <Glossary />}
        {view.name === "state-of-ai" && <StateOfAi />}
      </main>
    </div>
  )
}
