"use client"

import { useState, useMemo } from "react"
import { AlertTriangle, Info, Lightbulb, Building2, CheckCircle2, XCircle, ChevronRight, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"

/* ---------------- Callout ---------------- */

export type CalloutTone = "info" | "warn" | "tip"

export function Callout({
  tone = "info",
  title,
  children,
}: {
  tone?: CalloutTone
  title?: string
  children: React.ReactNode
}) {
  const styles = {
    info: {
      wrap: "border-primary/30 bg-primary/5",
      icon: "text-primary",
      Icon: Info,
      label: "Note",
    },
    warn: {
      wrap: "border-destructive/40 bg-destructive/5",
      icon: "text-destructive",
      Icon: AlertTriangle,
      label: "Watch out",
    },
    tip: {
      wrap: "border-accent/40 bg-accent/5",
      icon: "text-accent",
      Icon: Lightbulb,
      label: "Tip",
    },
  }[tone]

  return (
    <div className={cn("my-5 rounded-lg border p-4", styles.wrap)}>
      <div className="flex items-center gap-2">
        <styles.Icon className={cn("size-4", styles.icon)} />
        <span className={cn("font-mono text-[11px] uppercase tracking-[0.14em]", styles.icon)}>
          {title ?? styles.label}
        </span>
      </div>
      <div className="mt-2 text-[15px] leading-7 text-foreground/90">{children}</div>
    </div>
  )
}

/* ---------------- CRE Example ---------------- */

export function CreExample({
  scenario,
  children,
}: {
  scenario: string
  children: React.ReactNode
}) {
  return (
    <div className="my-5 overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center gap-2 border-b border-border bg-secondary/40 px-4 py-2">
        <Building2 className="size-4 text-primary" />
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
          CRE example
        </span>
        <span className="text-border">·</span>
        <span className="text-sm font-medium text-foreground">{scenario}</span>
      </div>
      <div className="p-4 text-[15px] leading-7 text-foreground/90">{children}</div>
    </div>
  )
}

/* ---------------- Matching Pairs (Quizlet-style) ---------------- */

export interface MatchingPair {
  term: string
  match: string
}

interface MatchingCard {
  id: string
  side: "term" | "match"
  pairIndex: number
  text: string
}

export function MatchingPairs({
  title,
  pairs,
}: {
  title?: string
  pairs: MatchingPair[]
}) {
  const initialCards = useMemo<MatchingCard[]>(() => {
    const cards: MatchingCard[] = []
    pairs.forEach((p, i) => {
      cards.push({ id: `t-${i}`, side: "term", pairIndex: i, text: p.term })
      cards.push({ id: `m-${i}`, side: "match", pairIndex: i, text: p.match })
    })
    // stable shuffle using seed 42 so it's the same on server + client (avoid hydration mismatch)
    return shuffle(cards, 42)
  }, [pairs])

  const [cards, setCards] = useState<MatchingCard[]>(initialCards)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [wrongIds, setWrongIds] = useState<Set<string>>(new Set())
  const [attempts, setAttempts] = useState(0)

  const complete = matched.size === pairs.length

  const reset = () => {
    setCards(shuffle(initialCards.slice(), Math.floor(Math.random() * 1000)))
    setSelectedId(null)
    setMatched(new Set())
    setWrongIds(new Set())
    setAttempts(0)
  }

  const onCardClick = (card: MatchingCard) => {
    if (matched.has(card.pairIndex)) return
    if (selectedId === card.id) {
      setSelectedId(null)
      return
    }
    if (selectedId === null) {
      setSelectedId(card.id)
      setWrongIds(new Set())
      return
    }
    const first = cards.find((c) => c.id === selectedId)
    if (!first) return
    setAttempts((a) => a + 1)
    if (first.pairIndex === card.pairIndex && first.side !== card.side) {
      setMatched((prev) => new Set(prev).add(card.pairIndex))
      setSelectedId(null)
    } else {
      setWrongIds(new Set([first.id, card.id]))
      setSelectedId(null)
      setTimeout(() => setWrongIds(new Set()), 700)
    }
  }

  return (
    <section className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Matching · Interactive
          </div>
          <h3 className="mt-1 text-lg font-semibold">{title ?? "Match the pairs"}</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Click a term, then click its definition. Wrong matches flash red.
          </p>
        </div>
        <button
          onClick={reset}
          className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <RotateCcw className="size-3.5" />
          Reset
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
        {cards.map((c) => {
          const isMatched = matched.has(c.pairIndex)
          const isSelected = selectedId === c.id
          const isWrong = wrongIds.has(c.id)
          return (
            <button
              key={c.id}
              onClick={() => onCardClick(c)}
              disabled={isMatched}
              className={cn(
                "flex min-h-[80px] items-center justify-center rounded-lg border p-3 text-center text-[13px] leading-snug transition-all",
                isMatched && "border-accent/40 bg-accent/10 text-muted-foreground line-through opacity-60",
                !isMatched && !isSelected && !isWrong && "border-border bg-secondary/30 hover:border-primary/40 hover:bg-secondary/60",
                isSelected && "border-primary bg-primary/10 text-foreground shadow-sm",
                isWrong && "border-destructive bg-destructive/10 text-destructive",
              )}
            >
              {c.text}
            </button>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
        <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
          {matched.size} / {pairs.length} matched · {attempts} attempts
        </div>
        {complete && (
          <div className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            <CheckCircle2 className="size-4" />
            All matched
          </div>
        )}
      </div>
    </section>
  )
}

function shuffle<T>(arr: T[], seed: number): T[] {
  // simple deterministic Fisher–Yates using a seed
  const out = arr.slice()
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

/* ---------------- Knowledge Check (multi-question survey) ---------------- */

export interface KnowledgeCheckQuestion {
  q: string
  options: string[]
  correct: number // index of the correct option
  explain?: string
}

export function KnowledgeCheck({
  title,
  questions,
}: {
  title?: string
  questions: KnowledgeCheckQuestion[]
}) {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const score = useMemo(() => {
    return questions.reduce((n, q, i) => (answers[i] === q.correct ? n + 1 : n), 0)
  }, [answers, questions])

  const allAnswered = Object.keys(answers).length === questions.length

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <section className="my-6 rounded-xl border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
            Knowledge check · {questions.length} questions
          </div>
          <h3 className="mt-1 text-lg font-semibold">{title ?? "Test yourself"}</h3>
        </div>
        {submitted && (
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/40 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <RotateCcw className="size-3.5" />
            Retake
          </button>
        )}
      </div>

      <ol className="mt-4 space-y-6">
        {questions.map((q, i) => {
          const chosen = answers[i]
          const isCorrect = chosen === q.correct
          return (
            <li key={i}>
              <div className="flex gap-2 text-[15px] font-medium">
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                <span>{q.q}</span>
              </div>
              <div className="mt-2 space-y-1.5">
                {q.options.map((opt, j) => {
                  const isChosen = chosen === j
                  const showCorrect = submitted && j === q.correct
                  const showWrong = submitted && isChosen && j !== q.correct
                  return (
                    <button
                      key={j}
                      onClick={() => {
                        if (submitted) return
                        setAnswers((a) => ({ ...a, [i]: j }))
                      }}
                      disabled={submitted}
                      className={cn(
                        "flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-[14px] leading-6 transition-colors",
                        !submitted && !isChosen && "border-border bg-background hover:border-primary/40 hover:bg-secondary/40",
                        !submitted && isChosen && "border-primary bg-primary/5",
                        showCorrect && "border-accent bg-accent/10",
                        showWrong && "border-destructive bg-destructive/10",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full border font-mono text-[11px]",
                          !submitted && !isChosen && "border-border text-muted-foreground",
                          !submitted && isChosen && "border-primary bg-primary text-primary-foreground",
                          showCorrect && "border-accent bg-accent text-accent-foreground",
                          showWrong && "border-destructive bg-destructive text-destructive-foreground",
                        )}
                      >
                        {String.fromCharCode(65 + j)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {showCorrect && <CheckCircle2 className="size-4 shrink-0 text-accent" />}
                      {showWrong && <XCircle className="size-4 shrink-0 text-destructive" />}
                    </button>
                  )
                })}
              </div>
              {submitted && q.explain && (
                <div
                  className={cn(
                    "mt-2 rounded-md border px-3 py-2 text-[13px] leading-6",
                    isCorrect ? "border-accent/40 bg-accent/5" : "border-destructive/30 bg-destructive/5",
                  )}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    {isCorrect ? "Correct — " : "Why: "}
                  </span>
                  {q.explain}
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        {!submitted ? (
          <>
            <div className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
              {Object.keys(answers).length} / {questions.length} answered
            </div>
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium transition-colors",
                allAnswered
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-secondary text-muted-foreground",
              )}
            >
              Submit
              <ChevronRight className="size-4" />
            </button>
          </>
        ) : (
          <div className="flex w-full items-center justify-between">
            <div className="text-sm">
              <span className="font-semibold text-foreground">
                Score: {score} / {questions.length}
              </span>
              <span className="ml-2 text-muted-foreground">
                {score === questions.length
                  ? "Perfect."
                  : score >= questions.length * 0.7
                  ? "Solid grasp."
                  : "Review the lesson and retry."}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
