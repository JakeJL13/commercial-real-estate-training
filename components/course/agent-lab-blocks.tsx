"use client"

import { useState } from "react"
import { Check, Copy, Download, Terminal, FileText, AlertCircle, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyBlock({
  label,
  code,
  language = "shell",
}: {
  label?: string
  code: string
  language?: "shell" | "text" | "prompt"
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const isTerminal = language === "shell"
  const isPrompt = language === "prompt"

  return (
    <div className="my-5 overflow-hidden rounded-lg border border-border bg-secondary/40">
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-4 py-2">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {isTerminal && <Terminal className="size-3.5" />}
          {isPrompt && <Sparkles className="size-3.5" />}
          {!isTerminal && !isPrompt && <FileText className="size-3.5" />}
          {label ?? (isTerminal ? "Terminal" : isPrompt ? "Prompt" : "Text")}
        </div>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
        >
          {copied ? <Check className="size-3.5 text-accent" /> : <Copy className="size-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre
        className={cn(
          "overflow-x-auto p-4 font-mono text-[13px] leading-relaxed",
          isTerminal && "text-foreground",
          isPrompt && "text-foreground/90",
        )}
      >
        <code className="whitespace-pre-wrap break-words">{code}</code>
      </pre>
    </div>
  )
}

export function DownloadCard({
  href,
  filename,
  label,
  description,
}: {
  href: string
  filename: string
  label: string
  description: string
}) {
  return (
    <a
      href={href}
      download={filename}
      className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Download className="size-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <span className="font-mono text-[11px] text-muted-foreground">{filename}</span>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </a>
  )
}

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: "info" | "warn" | "success"
  title: string
  children: React.ReactNode
}) {
  const styles: Record<string, { border: string; icon: string; iconColor: string }> = {
    info: {
      border: "border-primary/30 bg-primary/5",
      icon: "AlertCircle",
      iconColor: "text-primary",
    },
    warn: {
      border: "border-amber-500/40 bg-amber-500/5",
      icon: "AlertCircle",
      iconColor: "text-amber-600 dark:text-amber-400",
    },
    success: {
      border: "border-emerald-500/40 bg-emerald-500/5",
      icon: "Check",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
  }
  const s = styles[variant]

  return (
    <div className={cn("my-5 rounded-lg border p-5", s.border)}>
      <div className="flex items-center gap-2">
        <AlertCircle className={cn("size-4", s.iconColor)} />
        <p className={cn("font-mono text-[11px] uppercase tracking-[0.14em]", s.iconColor)}>{title}</p>
      </div>
      <div className="mt-2 text-[15px] leading-6 text-foreground/90">{children}</div>
    </div>
  )
}

export function Checklist({ items }: { items: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <ul className="my-5 space-y-2">
      {items.map((item, i) => (
        <li key={i}>
          <button
            onClick={() => toggle(i)}
            className={cn(
              "flex w-full items-start gap-3 rounded-lg border border-border bg-card p-3 text-left transition-colors hover:border-primary/30",
              checked.has(i) && "bg-secondary/60",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                checked.has(i)
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background",
              )}
            >
              {checked.has(i) && <Check className="size-3" strokeWidth={3} />}
            </span>
            <span
              className={cn(
                "text-[15px] leading-6",
                checked.has(i) && "text-muted-foreground line-through",
              )}
            >
              {item}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export function StepList({ steps }: { steps: { title: string; body: React.ReactNode }[] }) {
  return (
    <ol className="my-6 space-y-6">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary font-mono text-sm font-semibold text-primary-foreground">
            {i + 1}
          </div>
          <div className="min-w-0 flex-1 pt-1">
            <p className="text-base font-semibold text-foreground">{step.title}</p>
            <div className="mt-2 text-[15px] leading-6 text-foreground/90">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  )
}
