"use client"

import { ArrowLeft, ArrowRight, Building2, Clock, Terminal, CheckCircle2, Lock } from "lucide-react"
import { agentLabLessons, agentLabModule, findAgentLabLesson } from "@/lib/agent-lab-data"
import { useCourse } from "./course-provider"
import { Button } from "@/components/ui/button"
import { AgentLabLessonBody } from "./agent-lab-lessons"
import { cn } from "@/lib/utils"

export function AgentLabIndex() {
  const { goAgentLabLesson, isComplete, curriculumComplete, curriculumLessonsRemaining, goDashboard } = useCourse()

  if (!curriculumComplete) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 md:px-10">
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-full border border-border bg-background">
            <Lock className="size-6 text-muted-foreground" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight">Agent Lab is locked</h1>
          <p className="mx-auto mt-3 max-w-xl leading-relaxed text-muted-foreground">
            The Agent Lab and Build Your Agent workshop unlock once you complete every curriculum lesson.
            You have {curriculumLessonsRemaining} lesson{curriculumLessonsRemaining === 1 ? "" : "s"} to go.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Work through Modules 1 through 7 first. Each module includes lessons, workshops, and a vocabulary check.
          </p>
          <Button onClick={goDashboard} className="mt-6">
            Back to dashboard
          </Button>
        </div>
      </div>
    )
  }

  const done = agentLabLessons.filter((l) => isComplete(`agentlab-${l.id}`)).length
  const pct = Math.round((done / agentLabLessons.length) * 100)

  return (
    <div className="mx-auto max-w-4xl px-6 py-10 md:px-10">
      <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
        <Terminal className="size-4" />
        {agentLabModule.code}
      </div>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance">{agentLabModule.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">{agentLabModule.description}</p>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Progress</span>
          <span className="font-mono text-xs font-semibold">{pct}%</span>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5">
          <span className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">Total time</span>
          <span className="font-mono text-xs font-semibold">88 min</span>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">Lessons</h2>
        <ol className="mt-4 space-y-3">
          {agentLabLessons.map((l) => {
            const complete = isComplete(`agentlab-${l.id}`)
            return (
              <li key={l.id}>
                <button
                  onClick={() => goAgentLabLesson(l.id)}
                  className="group flex w-full items-start gap-4 rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40"
                >
                  <div
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-md border font-mono text-sm font-semibold",
                      complete
                        ? "border-accent bg-accent text-accent-foreground"
                        : "border-border bg-secondary text-foreground",
                    )}
                  >
                    {complete ? <CheckCircle2 className="size-5" /> : l.order}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <p className="text-base font-semibold text-foreground">{l.title}</p>
                      <span className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                        <Clock className="size-3" />
                        {l.duration} min
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{l.subtitle}</p>
                    <p className="mt-2 text-[13px] text-foreground/70">{l.goal}</p>
                  </div>
                  <ArrowRight className="mt-2 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                </button>
              </li>
            )
          })}
        </ol>
      </section>
    </div>
  )
}

export function AgentLabLesson({ lessonId }: { lessonId: string }) {
  const { goAgentLab, goAgentLabLesson, toggleComplete, isComplete } = useCourse()
  const lesson = findAgentLabLesson(lessonId)
  if (!lesson) return null

  const key = `agentlab-${lessonId}`
  const done = isComplete(key)
  const pos = agentLabLessons.findIndex((l) => l.id === lessonId)
  const prev = pos > 0 ? agentLabLessons[pos - 1] : null
  const next = pos < agentLabLessons.length - 1 ? agentLabLessons[pos + 1] : null

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <button
        onClick={goAgentLab}
        className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {agentLabModule.code} · {agentLabModule.title}
      </button>

      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          <Terminal className="size-4" />
          Lesson {lesson.order} of {agentLabLessons.length}
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Clock className="size-3.5" /> {lesson.duration} min
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">{lesson.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">{lesson.subtitle}</p>
      </header>

      <article className="mt-8">
        <AgentLabLessonBody lessonId={lessonId} />
      </article>

      <div className="mt-10">
        <Button
          size="lg"
          onClick={() => {
            const wasDone = done
            toggleComplete(key)
            if (!wasDone && next) goAgentLabLesson(next.id)
          }}
          className={cn("w-full sm:w-auto", done && "bg-accent text-accent-foreground hover:bg-accent/90")}
        >
          {done ? (
            <>
              <CheckCircle2 className="size-4" />
              Completed. Mark as not done
            </>
          ) : (
            <>
              Mark complete{next ? " and continue" : ""}
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>

      <nav className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
        {prev ? (
          <button
            onClick={() => goAgentLabLesson(prev.id)}
            className="group flex flex-col rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/30"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="mt-1 truncate text-sm font-medium">{prev.title}</span>
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button
            onClick={() => goAgentLabLesson(next.id)}
            className="group flex flex-col rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-primary/30 sm:items-end"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Next
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1 truncate text-sm font-medium">{next.title}</span>
          </button>
        )}
      </nav>
    </div>
  )
}
