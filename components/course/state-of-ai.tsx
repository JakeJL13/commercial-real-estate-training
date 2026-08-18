"use client"

import { BarChart3, TrendingUp, Building, Users, GraduationCap, ExternalLink } from "lucide-react"
import {
  heroStats,
  workforceStats,
  proficiencyStats,
  corporateStats,
  creStats,
  takeaways,
  type Stat,
} from "@/lib/state-of-ai-data"

export function StateOfAi() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10 md:px-10">
      <header className="mb-8">
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <BarChart3 className="size-3.5" />
          Market snapshot
        </div>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
          State of AI in America
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
          Where the US workforce, corporate outlook, and commercial real estate industry actually sit on AI adoption
          and proficiency. Numbers pulled from the Census Bureau, Federal Reserve, Gallup, JLL, and independent
          research groups. Every stat is cited.
        </p>
      </header>

      {/* Hero stats */}
      <section className="mb-10 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {heroStats.map((s) => (
          <HeroStat key={s.label} stat={s} />
        ))}
      </section>

      {/* Takeaways */}
      <section className="mb-10">
        <SectionHeading icon={TrendingUp} title="What this means for AJ" subtitle="Five takeaways" />
        <div className="space-y-3">
          {takeaways.map((t) => (
            <div key={t.title} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-semibold tracking-tight">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <StatSection
        icon={Users}
        title="The US workforce"
        subtitle="Who is actually using AI at work"
        stats={workforceStats}
      />

      <StatSection
        icon={GraduationCap}
        title="Proficiency and training gap"
        subtitle="Adoption is not the same as capability"
        stats={proficiencyStats}
      />

      <StatSection
        icon={Building}
        title="Corporate outlook"
        subtitle="What US firms are doing and not doing"
        stats={corporateStats}
      />

      <StatSection
        icon={Building}
        title="Commercial real estate"
        subtitle="The industry AJ works in"
        stats={creStats}
      />

      <footer className="mt-10 rounded-xl border border-border bg-muted/40 p-5 text-sm text-muted-foreground">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">Sources</p>
        <p className="mt-2 leading-relaxed">
          US Census Bureau Business Trends and Outlook Survey (BTOS), Federal Reserve Board (Monitoring AI Adoption
          in the US Economy, April 2026), St. Louis Fed, NBER working papers, Gallup Workforce polls (Q3 and Q4 2025),
          The Conference Board (AI Skilling report, July 2026), Section AI Proficiency Report, Bright Horizons 2025
          Education Index, Skillsoft, Deloitte (via Yahoo Finance), JLL 2025 Global Real Estate Technology Survey,
          Dealpath 2026 State of AI in CRE Investing, First American Data &amp; Analytics + DealGround, Value Add VC.
          Numbers are current as of the report dates cited on each stat.
        </p>
      </footer>
    </div>
  )
}

function SectionHeading({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-4 flex items-center gap-3 border-b border-border pb-3">
      <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon className="size-4" />
      </div>
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  )
}

function StatSection({
  icon,
  title,
  subtitle,
  stats,
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  subtitle: string
  stats: Stat[]
}) {
  return (
    <section className="mb-10">
      <SectionHeading icon={icon} title={title} subtitle={subtitle} />
      <div className="grid gap-3 sm:grid-cols-2">
        {stats.map((s) => (
          <StatCard key={s.label} stat={s} />
        ))}
      </div>
    </section>
  )
}

function HeroStat({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-mono text-3xl font-semibold tabular-nums text-primary">{stat.value}</p>
      <p className="mt-2 text-sm leading-snug text-foreground/90">{stat.label}</p>
      <a
        href={stat.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-primary"
      >
        {stat.source}
        <ExternalLink className="size-3" />
      </a>
    </div>
  )
}

function StatCard({ stat }: { stat: Stat }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-baseline gap-3">
        <p className="font-mono text-2xl font-semibold tabular-nums text-primary">{stat.value}</p>
      </div>
      <p className="mt-2 text-sm leading-snug text-foreground/90">{stat.label}</p>
      {stat.note ? (
        <p className="mt-1.5 text-xs italic leading-relaxed text-muted-foreground">{stat.note}</p>
      ) : null}
      <a
        href={stat.sourceUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground hover:text-primary"
      >
        {stat.source}
        <ExternalLink className="size-3" />
      </a>
    </div>
  )
}
