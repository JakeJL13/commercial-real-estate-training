"use client"

import { ArrowLeft, ChevronRight, CheckCircle2, Clock, PartyPopper, X } from "lucide-react"
import { modules } from "@/lib/course-data"
import { useCourse } from "./course-provider"
import { lessonMeta } from "./lesson-meta"
import { cn } from "@/lib/utils"

export function ModuleDetail({ moduleId }: { moduleId: string }) {
  const {
    goDashboard,
    goLesson,
    isComplete,
    modulePercent,
    justCompletedModuleId,
    dismissModuleCelebration,
    curriculumLessonsRemaining,
    curriculumComplete,
  } = useCourse()
  const mod = modules.find((m) => m.id === moduleId)
  if (!mod) return null

  const pct = modulePercent(mod.id)
  const minutes = mod.lessons.reduce((s, l) => s + l.duration, 0)
  const index = modules.findIndex((m) => m.id === moduleId)
  const showCelebration = justCompletedModuleId === mod.id

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:px-10">
      <button
        onClick={goDashboard}
        className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Dashboard
      </button>

      {showCelebration && (
        <div className="mb-6 flex items-start gap-4 rounded-xl border border-accent/40 bg-accent/10 p-5">
          <PartyPopper className="mt-0.5 size-5 shrink-0 text-accent" />
          <div className="flex-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Module complete</p>
            <p className="mt-1 text-base font-semibold">Nice work. {mod.title} is done.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {curriculumComplete
                ? "Every module is finished. The Agent Lab is now unlocked from the sidebar."
                : `${curriculumLessonsRemaining} lesson${curriculumLessonsRemaining === 1 ? "" : "s"} left across the remaining modules before the Agent Lab unlocks.`}
            </p>
          </div>
          <button
            onClick={dismissModuleCelebration}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-accent/20 hover:text-foreground"
            aria-label="Dismiss"
          >
            <X className="size-4" />
          </button>
        </div>
      )}

      <header className="border-b border-border pb-8">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{mod.code}</span>
          <span className="h-3 w-px bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Module {index + 1} · {mod.track}
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">{mod.title}</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{mod.description}</p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            {minutes} min · {mod.lessons.length} units
          </div>
          <div className="flex min-w-40 flex-1 items-center gap-3">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="font-mono text-xs font-semibold tabular-nums text-foreground">{pct}%</span>
          </div>
        </div>
      </header>

      <ol className="mt-8 space-y-3">
        {mod.lessons.map((lesson, i) => {
          const done = isComplete(lesson.id)
          const Meta = lessonMeta[lesson.type]
          return (
            <li key={lesson.id}>
              <button
                onClick={() => goLesson(lesson.id)}
                className="group flex w-full items-center gap-4 rounded-xl border border-border bg-card p-4 text-left transition-all hover:border-primary/30 hover:shadow-sm md:p-5"
              >
                <div
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg font-mono text-sm font-semibold",
                    done ? "bg-accent/15 text-accent" : "bg-secondary text-secondary-foreground",
                  )}
                >
                  {done ? <CheckCircle2 className="size-5" /> : String(i + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <Meta.icon className="size-3.5" />
                    {Meta.label}
                    <span className="text-border">·</span>
                    {lesson.duration} min
                  </div>
                  <h3 className="mt-1 font-medium leading-snug text-pretty">{lesson.title}</h3>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{lesson.summary}</p>
                </div>
                <ChevronRight className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
