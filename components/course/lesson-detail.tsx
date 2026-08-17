"use client"

import { ArrowLeft, ArrowRight, Check, CheckCircle2, Lightbulb, Clock } from "lucide-react"
import { modules, flatLessons, findModuleByLesson } from "@/lib/course-data"
import { useCourse } from "./course-provider"
import { lessonMeta } from "./lesson-meta"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function LessonDetail({ lessonId }: { lessonId: string }) {
  const { goModule, goLesson, toggleComplete, isComplete } = useCourse()

  const mod = findModuleByLesson(lessonId)
  const lesson = mod?.lessons.find((l) => l.id === lessonId)
  if (!mod || !lesson) return null

  const all = flatLessons()
  const pos = all.findIndex(({ lesson: l }) => l.id === lessonId)
  const prev = pos > 0 ? all[pos - 1] : null
  const next = pos < all.length - 1 ? all[pos + 1] : null
  const done = isComplete(lesson.id)
  const Meta = lessonMeta[lesson.type]
  const lessonIndex = mod.lessons.findIndex((l) => l.id === lessonId)

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <button
        onClick={() => goModule(mod.id)}
        className="mb-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        {mod.code} · {mod.title}
      </button>

      <header className="border-b border-border pb-6">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          <Meta.icon className="size-4" />
          {Meta.label}
          <span className="text-border">·</span>
          <span className="text-muted-foreground">
            Unit {lessonIndex + 1} of {mod.lessons.length}
          </span>
          <span className="text-border">·</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Clock className="size-3.5" /> {lesson.duration} min
          </span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance">{lesson.title}</h1>
        <p className="mt-3 text-lg leading-relaxed text-muted-foreground text-pretty">{lesson.summary}</p>
      </header>

      <article className="mt-8 space-y-5 leading-relaxed text-foreground/90">
        {lesson.content.map((p, i) => (
          <p key={i} className="text-[15px] leading-7">
            {p}
          </p>
        ))}
      </article>

      <section className="mt-8 rounded-xl border border-border bg-secondary/50 p-6">
        <div className="flex items-center gap-2">
          <Lightbulb className="size-4 text-accent" />
          <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-foreground">Key takeaways</h2>
        </div>
        <ul className="mt-4 space-y-3">
          {lesson.keyTakeaways.map((t, i) => (
            <li key={i} className="flex gap-3 text-[15px] leading-6">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8">
        <Button
          size="lg"
          onClick={() => {
            const wasDone = done
            toggleComplete(lesson.id)
            if (!wasDone && next) goLesson(next.lesson.id)
          }}
          className={cn(
            "w-full sm:w-auto",
            done && "bg-accent text-accent-foreground hover:bg-accent/90",
          )}
        >
          {done ? (
            <>
              <CheckCircle2 className="size-4" />
              Completed — mark as not done
            </>
          ) : (
            <>
              Mark complete{next ? " & continue" : ""}
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>

      <nav className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-2">
        {prev ? (
          <button
            onClick={() => goLesson(prev.lesson.id)}
            className="group flex flex-col rounded-lg border border-border bg-card p-4 text-left transition-colors hover:border-primary/30"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              Previous
            </span>
            <span className="mt-1 truncate text-sm font-medium">{prev.lesson.title}</span>
          </button>
        ) : (
          <span />
        )}
        {next && (
          <button
            onClick={() => goLesson(next.lesson.id)}
            className="group flex flex-col rounded-lg border border-border bg-card p-4 text-right transition-colors hover:border-primary/30 sm:items-end"
          >
            <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
              Next
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
            <span className="mt-1 truncate text-sm font-medium">{next.lesson.title}</span>
          </button>
        )}
      </nav>
    </div>
  )
}
