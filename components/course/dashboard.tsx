"use client"

import { ArrowRight, Clock, BookMarked, Trophy, PlayCircle, Terminal, Lock } from "lucide-react"
import { modules, course, totalLessons, totalMinutes, findModuleByLesson } from "@/lib/course-data"
import { useCourse } from "./course-provider"
import { lessonMeta } from "./lesson-meta"
import { Button } from "@/components/ui/button"

export function Dashboard() {
  const {
    goModule,
    goLesson,
    goAgentLab,
    overallPercent,
    completedCount,
    modulePercent,
    nextLessonId,
    curriculumComplete,
    curriculumLessonsRemaining,
  } = useCourse()

  const nextModule = nextLessonId ? findModuleByLesson(nextLessonId) : undefined
  const nextLesson = nextModule?.lessons.find((l) => l.id === nextLessonId)
  const hours = Math.round((totalMinutes / 60) * 10) / 10

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <header className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {course.subtitle}
        </p>
        <h1 className="mt-2 max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          {course.title}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          A practical, decision-focused program that teaches asset managers how to apply AI across the full asset
          lifecycle — from data foundations to forecasting, lease intelligence, and responsible governance.
        </p>
      </header>

      {/* Stat row */}
      <div className="mb-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard icon={Trophy} label="Completion" value={`${overallPercent}%`} />
        <StatCard icon={BookMarked} label="Lessons done" value={`${completedCount} / ${totalLessons}`} />
        <StatCard icon={Clock} label="Total content" value={`${hours} hrs`} />
        <StatCard icon={PlayCircle} label="Modules" value={`${modules.length}`} />
      </div>

      {/* Continue learning */}
      {nextLesson && nextModule ? (
        <section className="mb-10 overflow-hidden rounded-xl border border-border bg-primary text-primary-foreground">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="max-w-xl">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">
                {completedCount === 0 ? "Start here" : "Continue where you left off"}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary-foreground/60">
                {nextModule.code} · {lessonMeta[nextLesson.type].label}
              </p>
              <h2 className="mt-1 text-xl font-semibold text-balance md:text-2xl">{nextLesson.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-primary-foreground/75">{nextLesson.summary}</p>
            </div>
            <Button
              size="lg"
              onClick={() => goLesson(nextLesson.id)}
              className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90"
            >
              {completedCount === 0 ? "Begin program" : "Resume"}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </section>
      ) : (
        <section className="mb-10 rounded-xl border border-accent/40 bg-accent/10 p-8 text-center">
          <Trophy className="mx-auto size-8 text-accent" />
          <h2 className="mt-3 text-xl font-semibold">Program complete</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            You&apos;ve finished every module. Revisit any lesson from the curriculum below.
          </p>
        </section>
      )}

      {/* Workshop card */}
      <section className="mb-10">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Workshop</h2>
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {curriculumComplete ? "Unlocked" : "Locked"}
          </span>
        </div>
        <div
          className={
            curriculumComplete
              ? "rounded-xl border border-accent/40 bg-card p-6 md:p-7"
              : "rounded-xl border border-border bg-muted/30 p-6 md:p-7"
          }
        >
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {curriculumComplete ? (
                  <>
                    <Terminal className="size-3.5 text-accent" />
                    Build Your Agent
                  </>
                ) : (
                  <>
                    <Lock className="size-3.5" />
                    Locked
                  </>
                )}
              </div>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-balance md:text-2xl">
                {curriculumComplete
                  ? "Build a local financial agent on your Mac"
                  : "The Agent Lab unlocks after Module 7"}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {curriculumComplete
                  ? "Install VS Code and Claude Code, then build an agent that reads Ram and Wolf documents and produces variance analysis, NOI reconciliation, and deal underwriting."
                  : `Finish every curriculum lesson first. You have ${curriculumLessonsRemaining} lesson${curriculumLessonsRemaining === 1 ? "" : "s"} left across the seven modules.`}
              </p>
            </div>
            <Button
              size="lg"
              onClick={curriculumComplete ? goAgentLab : undefined}
              disabled={!curriculumComplete}
              className="shrink-0"
              variant={curriculumComplete ? "default" : "secondary"}
            >
              {curriculumComplete ? (
                <>
                  Open the Agent Lab
                  <ArrowRight className="size-4" />
                </>
              ) : (
                <>
                  <Lock className="size-4" />
                  Locked
                </>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Curriculum grid */}
      <div className="mb-4 flex items-baseline justify-between">
        <h2 className="text-lg font-semibold tracking-tight">Curriculum</h2>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          {modules.length} modules
        </span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {modules.map((m, i) => {
          const pct = modulePercent(m.id)
          return (
            <button
              key={m.id}
              onClick={() => goModule(m.id)}
              className="group flex flex-col rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {m.code}
                </span>
                <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary-foreground">
                  {m.track}
                </span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug text-balance">{m.title}</h3>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                {m.description}
              </p>
              <div className="mt-4">
                <div className="flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>
                    {m.lessons.length} {m.lessons.length === 1 ? "unit" : "units"}
                  </span>
                  <span className={pct === 100 ? "text-accent" : ""}>{pct}%</span>
                </div>
                <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <Icon className="size-4 text-accent" />
      <p className="mt-3 font-mono text-xl font-semibold tabular-nums">{value}</p>
      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
    </div>
  )
}
