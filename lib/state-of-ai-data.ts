export interface Stat {
  value: string
  label: string
  source: string
  sourceUrl: string
  note?: string
}

export interface StatBlock {
  id: string
  title: string
  subtitle: string
  stats: Stat[]
}

export const heroStats: Stat[] = [
  {
    value: "18%",
    label: "of US firms use AI for a business function (year-end 2025)",
    source: "Federal Reserve, Census BTOS",
    sourceUrl:
      "https://www.federalreserve.gov/econres/notes/feds-notes/monitoring-ai-adoption-in-the-u-s-economy-20260403.html",
  },
  {
    value: "32%",
    label: "employment-weighted AI adoption (weighted by firm size)",
    source: "Census Bureau CES Working Paper 26-25",
    sourceUrl: "https://www.census.gov/library/working-papers/2026/adrm/CES-WP-26-25.html",
  },
  {
    value: "50%",
    label: "of US adults have used generative AI at least occasionally",
    source: "Federal Reserve / Real-Time Population Survey",
    sourceUrl:
      "https://www.federalreserve.gov/econres/notes/feds-notes/monitoring-ai-adoption-in-the-u-s-economy-20260403.html",
  },
  {
    value: "5.5%",
    label: "of the US workforce meets a proficient AI-use bar",
    source: "Section AI Proficiency Report",
    sourceUrl: "https://www.sectionai.com/ai/the-ai-proficiency-report",
  },
]

export const workforceStats: Stat[] = [
  {
    value: "45%",
    label: "of US employees use AI at work at least a few times a year (Q3 2025)",
    source: "Gallup",
    sourceUrl: "https://www.gallup.com/workplace/699689/ai-use-at-work-rises.aspx",
  },
  {
    value: "23%",
    label: "use AI at work a few times a week or more",
    source: "Gallup (Q3 2025)",
    sourceUrl: "https://www.gallup.com/workplace/699689/ai-use-at-work-rises.aspx",
  },
  {
    value: "12%",
    label: "use AI at work every day (Q4 2025)",
    source: "Gallup",
    sourceUrl: "https://www.gallup.com/workplace/701195/frequent-workplace-continued-rise.aspx",
  },
  {
    value: "49%",
    label: "of US workers report they never use AI in their role",
    source: "Gallup (Q4 2025)",
    sourceUrl: "https://www.gallup.com/workplace/701195/frequent-workplace-continued-rise.aspx",
  },
  {
    value: "41%",
    label: "of US workers used generative AI at work (Nov 2025)",
    source: "Federal Reserve RPS",
    sourceUrl:
      "https://www.federalreserve.gov/econres/notes/feds-notes/monitoring-ai-adoption-in-the-u-s-economy-accessible-20260403.htm",
  },
  {
    value: "5.7%",
    label: "of US work hours are spent using generative AI (Aug 2025)",
    source: "St. Louis Fed",
    sourceUrl: "https://www.stlouisfed.org/on-the-economy/2025/nov/state-generative-ai-adoption-2025",
  },
]

export const proficiencyStats: Stat[] = [
  {
    value: "5.5%",
    label: "of workers are Proficient AI users (use agents, automations, custom workflows)",
    source: "Section AI Proficiency Report",
    sourceUrl: "https://www.sectionai.com/ai/the-ai-proficiency-report",
  },
  {
    value: "73.5%",
    label: "of workers are Experimenters (basic one-off tasks only)",
    source: "Section AI Proficiency Report",
    sourceUrl: "https://www.sectionai.com/ai/the-ai-proficiency-report",
  },
  {
    value: "20.9%",
    label: "of workers are Novices (barely engage with AI)",
    source: "Section AI Proficiency Report",
    sourceUrl: "https://www.sectionai.com/ai/the-ai-proficiency-report",
  },
  {
    value: "79%",
    label: "of workers feel unprepared to use AI at work",
    source: "Bright Horizons 2025 Education Index",
    sourceUrl:
      "https://www.brighthorizons.com/article/employers/ai-workforce-readiness-crisis-79-of-workers-say-theyre-not-ready",
  },
  {
    value: "24%",
    label: "of employees who use AI believe they have the skills to use it well",
    source: "Skillsoft (2026)",
    sourceUrl:
      "https://finance.yahoo.com/sectors/technology/articles/only-1-4-employees-feel-120000286.html",
  },
  {
    value: "37.8%",
    label: "of workers have received no AI training at all",
    source: "Section AI Proficiency Report",
    sourceUrl: "https://www.sectionai.com/ai/the-ai-proficiency-report",
  },
  {
    value: "17%",
    label: "of trained workers were trained on agents or automations (the proficiency bar)",
    source: "Section AI Proficiency Report",
    sourceUrl: "https://www.sectionai.com/ai/the-ai-proficiency-report",
  },
  {
    value: "1.8×",
    label: "higher proficiency score for workers trained on agents vs. those not",
    source: "Section AI Proficiency Report",
    sourceUrl: "https://www.sectionai.com/ai/the-ai-proficiency-report",
  },
]

export const corporateStats: Stat[] = [
  {
    value: "17-20%",
    label: "of US businesses used AI in a business function (Dec 2025 to May 2026)",
    source: "Census Bureau BTOS",
    sourceUrl: "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html",
  },
  {
    value: "20-23%",
    label: "of businesses expect to be using AI within 6 months",
    source: "Census Bureau BTOS",
    sourceUrl: "https://www.census.gov/library/stories/2026/05/ai-use-businesses.html",
  },
  {
    value: "28%",
    label: "of employees say their employer provides no AI training at all",
    source: "The Conference Board (2026)",
    sourceUrl: "https://www.conference-board.org/press/ai-skilling",
  },
  {
    value: "33%",
    label: "of workers received employer-provided AI training in the past 6 months",
    source: "The Conference Board (2026)",
    sourceUrl: "https://www.conference-board.org/press/ai-skilling",
  },
  {
    value: "36%",
    label: "of employees feel they have the training and resources to use AI well",
    source: "Deloitte survey via Yahoo Finance",
    sourceUrl: "https://finance.yahoo.com/news/worker-anxiety-over-ai-growing-063500293.html",
    note: "Down from 45% the prior year.",
  },
  {
    value: "47%",
    label: "of workers say they need to learn new skills because of AI",
    source: "Deloitte via Yahoo Finance",
    sourceUrl: "https://finance.yahoo.com/news/worker-anxiety-over-ai-growing-063500293.html",
  },
]

export const creStats: Stat[] = [
  {
    value: "88%",
    label: "of CRE investors, owners, and landlords have started piloting AI",
    source: "JLL 2025 Global Real Estate Technology Survey",
    sourceUrl:
      "https://www.jll.com/en-us/newsroom/real-estates-ai-reality-check-companies-piloting-only-achieved-all-ai-goals",
  },
  {
    value: "92%",
    label: "of CRE occupier teams are running or planning AI pilots",
    source: "JLL",
    sourceUrl: "https://www.jll.com/en-us/insights/global-real-estate-cre-technology-survey",
    note: "Under 5% had these plans just two years earlier.",
  },
  {
    value: "5%",
    label: "of CRE firms piloting AI have achieved all their AI goals",
    source: "JLL",
    sourceUrl:
      "https://www.jll.com/en-us/newsroom/real-estates-ai-reality-check-companies-piloting-only-achieved-all-ai-goals",
  },
  {
    value: "60%+",
    label: "of real estate investors remain unprepared for true AI integration",
    source: "JLL, via Noda",
    sourceUrl: "https://www.noda.ai/insights/ai-adoption-commercial-real-estate-portfolios",
  },
  {
    value: "66%",
    label: "of CRE professionals use AI weekly or daily",
    source: "First American Data & Analytics + DealGround",
    sourceUrl: "https://dna.firstam.com/insights-blog/ai-in-commercial-real-estate-study-strategic-implications",
    note: "42% report daily use.",
  },
  {
    value: "5%",
    label: "of CRE professionals fully trust AI to support real-world decisions",
    source: "First American Data & Analytics + DealGround",
    sourceUrl: "https://dna.firstam.com/insights-blog/ai-in-commercial-real-estate-study-strategic-implications",
  },
  {
    value: "97%",
    label: "of CRE investors have integrated AI into their investment process",
    source: "Dealpath 2026 State of AI in CRE Investing",
    sourceUrl: "https://www.dealpath.com/resource/ai-impact-survey/",
  },
  {
    value: "$16.7B",
    label: "in 2025 proptech funding (up 67.9% year over year)",
    source: "Value Add VC",
    sourceUrl:
      "https://valueaddvc.com/blog/ai-in-commercial-real-estate-how-landlords-and-reits-are-using-data-to-price-space",
  },
]

export const takeaways: { title: string; body: string }[] = [
  {
    title: "Adoption is racing ahead of ability",
    body:
      "Firm-level AI adoption crossed 18% in the US at the end of 2025 and CRE pilots are close to universal, but only about 1 in 20 workers can actually build with AI. Being early to a tool is not the same as being good at it.",
  },
  {
    title: "The proficiency bar has moved to agents",
    body:
      "Basic chatbot use no longer counts as proficiency. Section's research puts the bar at building or running agents and automations. Only 17% of trained workers have touched that level, and firms that train on agents see 1.8× the proficiency score.",
  },
  {
    title: "CRE is in a pilot-happy, results-poor moment",
    body:
      "JLL says 88% of investors and 92% of occupiers are piloting AI, but only 5% have hit their goals. The gap is not tools. It is workflow design, governance, and skill. This bootcamp is aimed squarely at that gap.",
  },
  {
    title: "Training is the constraint, not compute",
    body:
      "About 28% of employers offer no AI training and only a third of workers got employer training in the past six months. Workers who feel prepared dropped from 45% to 36% year over year. Firms that treat AI like a training problem, not a procurement problem, win.",
  },
  {
    title: "AJ's target: move from Experimenter to Proficient",
    body:
      "AJ starts this bootcamp inside the 73.5% Experimenter band. By Wednesday afternoon he will have built and shipped an agent, which puts him past the 17% training bar and into the top 5.5% of the US workforce by capability.",
  },
]
