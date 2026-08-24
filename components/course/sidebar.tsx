"use client"

import { Building2, LayoutGrid, CheckCircle2, Circle, GraduationCap, BookOpen, BarChart3, Terminal, Lock, RotateCcw } from "lucide-react"
import { modules, course } from "@/lib/course-data"
import { useCourse } from "./course-provider"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const {
    view,
    goDashboard,
    goModule,
    goGlossary,
    goStateOfAi,
    goAgentLab,
    modulePercent,
    overallPercent,
    curriculumComplete,
    curriculumLessonsRemaining,
    completedCount,
    resetProgress,
  } = useCourse()

  const handleReset = () => {
    if (typeof window === "undefined") return resetProgress()
    const ok = window.confirm("Reset all progress? This clears every completed lesson.")
    if (ok) resetProgress()
  }

  const activeModuleId =
    view.name === "module" ? view.moduleId : undefined

  return (
    <aside className="sticky top-0 hidden h-svh w-72 shrink-0 flex-col bg-sidebar text-sidebar-foreground lg:flex">
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex size-9 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
          <Building2 className="size-5" strokeWidth={2} />
        </div>
        <div className="leading-tight">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-sidebar-primary">CRE</p>
          <p className="text-sm font-semibold text-sidebar-accent-foreground">AI Academy</p>
        </div>
      </div>

      <div className="mx-6 mb-5 rounded-lg bg-sidebar-accent/60 p-4">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sidebar-foreground/70">
            Program progress
          </span>
          <span className="font-mono text-sm font-semibold text-sidebar-primary">{overallPercent}%</span>
        </div>
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-sidebar-border">
          <div
            className="h-full rounded-full bg-sidebar-primary transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4">
        <button
          onClick={goDashboard}
          className={cn(
            "mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            view.name === "dashboard"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50",
          )}
        >
          <LayoutGrid className="size-4" />
          Dashboard
        </button>

        <p className="px-3 pb-2 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-sidebar-foreground/55">
          Reference
        </p>

        <button
          onClick={goGlossary}
          className={cn(
            "mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            view.name === "glossary"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50",
          )}
        >
          <BookOpen className="size-4" />
          AI Glossary
        </button>

        <button
          onClick={goStateOfAi}
          className={cn(
            "mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            view.name === "state-of-ai"
              ? "bg-sidebar-accent text-sidebar-accent-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent/50",
          )}
        >
          <BarChart3 className="size-4" />
          State of AI in America
        </button>

        <p className="px-3 pb-2 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-sidebar-foreground/55">
          Workshop
        </p>

        <button
          onClick={curriculumComplete ? goAgentLab : undefined}
          disabled={!curriculumComplete}
          title={
            curriculumComplete
              ? "Open the Agent Lab"
              : `Unlocks after all curriculum lessons complete (${curriculumLessonsRemaining} to go)`
          }
          className={cn(
            "mb-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            !curriculumComplete
              ? "cursor-not-allowed text-sidebar-foreground/40"
              : view.name === "agent-lab" || view.name === "agent-lab-lesson"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50",
          )}
        >
          {curriculumComplete ? <Terminal className="size-4" /> : <Lock className="size-4" />}
          <span className="flex-1 text-left">Build Your Agent</span>
          {!curriculumComplete && (
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-sidebar-foreground/40">
              Locked
            </span>
          )}
        </button>

        <p className="px-3 pb-2 pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-sidebar-foreground/55">
          Curriculum
        </p>

        <ul className="space-y-0.5">
          {modules.map((m) => {
            const pct = modulePercent(m.id)
            const active = m.id === activeModuleId
            const done = pct === 100
            return (
              <li key={m.id}>
                <button
                  onClick={() => goModule(m.id)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md px-3 py-2 text-left transition-colors",
                    active
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/50",
                  )}
                >
                  {done ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sidebar-primary" />
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-sidebar-foreground/40" />
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-sidebar-foreground/55">
                      {m.code}
                    </span>
                    <span className="block truncate text-sm font-medium leading-snug">{m.title}</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="space-y-3 border-t border-sidebar-border px-6 py-4">
        <div className="flex items-center gap-2 text-sidebar-foreground/70">
          <GraduationCap className="size-4" />
          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">{course.cohort}</span>
        </div>
        {completedCount > 0 && (
          <button
            onClick={handleReset}
            className="flex w-full items-center justify-center gap-1.5 rounded-md border border-sidebar-border/60 px-2 py-1.5 text-[11px] font-medium text-sidebar-foreground/70 transition-colors hover:border-sidebar-border hover:text-sidebar-foreground"
            title="Clear all completed lessons"
          >
            <RotateCcw className="size-3" />
            Reset progress
          </button>
        )}
      </div>
    </aside>
  )
}
