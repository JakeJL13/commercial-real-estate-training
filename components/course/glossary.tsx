"use client"

import { useMemo, useState } from "react"
import { BookOpen, Search } from "lucide-react"
import { glossaryTerms, glossaryCategories, type GlossaryTerm } from "@/lib/glossary-data"
import { cn } from "@/lib/utils"

export function Glossary() {
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<GlossaryTerm["category"] | "All">("All")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return glossaryTerms.filter((t) => {
      const inCat = activeCategory === "All" || t.category === activeCategory
      if (!inCat) return false
      if (!q) return true
      return (
        t.term.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.long.toLowerCase().includes(q) ||
        t.creExample.toLowerCase().includes(q)
      )
    })
  }, [query, activeCategory])

  const grouped = useMemo(() => {
    const g = {} as Record<GlossaryTerm["category"], GlossaryTerm[]>
    for (const cat of glossaryCategories) g[cat] = []
    for (const t of filtered) g[t.category].push(t)
    for (const cat of glossaryCategories) g[cat].sort((a, b) => a.term.localeCompare(b.term))
    return g
  }, [filtered])

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <header className="mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <BookOpen className="size-3.5" />
          Reference
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">AI Glossary for CRE</h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Every term you will hear across the bootcamp, defined in plain language with a commercial real estate example
          for each. Use search to jump straight to a term. Use categories to filter by topic.
        </p>
      </header>

      {/* Search + filter */}
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search terms, definitions, or examples"
            className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <CategoryChip
            active={activeCategory === "All"}
            onClick={() => setActiveCategory("All")}
            label={`All (${glossaryTerms.length})`}
          />
          {glossaryCategories.map((c) => {
            const count = glossaryTerms.filter((t) => t.category === c).length
            return (
              <CategoryChip
                key={c}
                active={activeCategory === c}
                onClick={() => setActiveCategory(c)}
                label={`${c} (${count})`}
              />
            )
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
          No terms match that search. Try a broader keyword or clear the filter.
        </div>
      ) : (
        <div className="space-y-10">
          {glossaryCategories.map((cat) => {
            const items = grouped[cat]
            if (!items || items.length === 0) return null
            return (
              <section key={cat}>
                <div className="mb-3 flex items-baseline justify-between border-b border-border pb-2">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{cat}</h2>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {items.length} {items.length === 1 ? "term" : "terms"}
                  </span>
                </div>
                <div className="grid gap-3">
                  {items.map((t) => (
                    <article
                      key={t.id}
                      id={t.id}
                      className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/30"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-lg font-semibold tracking-tight">{t.term}</h3>
                        <span className="rounded-full bg-secondary px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-secondary-foreground">
                          {t.category}
                        </span>
                      </div>
                      <p className="mt-2 text-sm font-medium text-foreground/90">{t.short}</p>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.long}</p>
                      <div className="mt-3 rounded-md border-l-2 border-primary bg-primary/5 px-3 py-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                          CRE example
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-foreground/90">{t.creExample}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}

function CategoryChip({
  active,
  onClick,
  label,
}: {
  active: boolean
  onClick: () => void
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {label}
    </button>
  )
}
