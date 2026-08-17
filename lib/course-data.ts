export type LessonType = "lesson" | "workshop" | "assessment"

export interface Lesson {
  id: string
  title: string
  type: LessonType
  duration: number // minutes
  summary: string
  content: string[]
  keyTakeaways: string[]
}

export interface Module {
  id: string
  code: string
  title: string
  track: string
  description: string
  lessons: Lesson[]
}

export const course = {
  title: "AI for Commercial Real Estate Asset Management",
  subtitle: "Applied AI Certification",
  cohort: "Spring 2026 Cohort",
}

export const modules: Module[] = [
  {
    id: "m1",
    code: "AI-101",
    title: "Foundations of AI for Asset Management",
    track: "Foundations",
    description:
      "Establish a working mental model of modern AI and where it creates durable value across a commercial real estate portfolio.",
    lessons: [
      {
        id: "m1l1",
        title: "The AI Landscape for CRE",
        type: "lesson",
        duration: 14,
        summary:
          "How machine learning, predictive models, and generative AI differ — and which asset management problems each is suited to solve.",
        content: [
          "Asset managers are being asked to do more with leaner teams while the volume of portfolio data grows every quarter. AI is not a single technology but a spectrum: rules-based automation, statistical machine learning, and the newer wave of generative and agentic systems each solve a different class of problem.",
          "In this lesson we separate hype from utility. Predictive machine learning excels at forecasting continuous outcomes such as vacancy, NOI, and renewal probability. Generative AI excels at reading and drafting unstructured documents — leases, offering memoranda, and management reports. Understanding which tool fits which task is the single most important skill for deploying AI responsibly.",
          "We close by mapping a typical asset management workflow — from acquisition underwriting through hold-period optimization to disposition — and flagging the three or four points where AI moves the needle most today.",
        ],
        keyTakeaways: [
          "AI is a spectrum of tools, not one capability — match the tool to the task.",
          "Predictive ML is for forecasting numbers; generative AI is for reading and writing documents.",
          "The highest-value entry points are lease intelligence, performance forecasting, and deal screening.",
        ],
      },
      {
        id: "m1l2",
        title: "Building the Business Case",
        type: "lesson",
        duration: 12,
        summary: "A framework for quantifying ROI and prioritizing AI initiatives against your portfolio strategy.",
        content: [
          "Every AI initiative competes for the same scarce resources: analyst time, capital, and executive attention. This lesson gives you a one-page framework to score opportunities on value, feasibility, and data readiness.",
          "We walk through a worked example: automating lease abstraction across a 4M SF office portfolio. You will estimate hours saved, error reduction, and the payback period, then stress-test the assumptions the way an investment committee would.",
        ],
        keyTakeaways: [
          "Score initiatives on value, feasibility, and data readiness before committing capital.",
          "Time saved is real ROI, but error reduction and faster decisions often dominate the case.",
          "Start with a narrow, measurable pilot rather than a portfolio-wide rollout.",
        ],
      },
      {
        id: "m1l3",
        title: "Knowledge Check: Foundations",
        type: "assessment",
        duration: 8,
        summary: "Confirm your grasp of AI categories and where they apply across the asset lifecycle.",
        content: [
          "A short scenario-based assessment. You will be given five portfolio situations and asked to identify whether predictive ML, generative AI, or classic automation is the right fit, and to justify the business case in one sentence each.",
        ],
        keyTakeaways: [
          "Reinforces the tool-to-task mapping from lessons 1 and 2.",
          "Practices articulating value in the language of an investment committee.",
        ],
      },
    ],
  },
  {
    id: "m2",
    code: "AI-140",
    title: "Portfolio Data Foundations",
    track: "Foundations",
    description:
      "AI is only as good as the data beneath it. Learn to assess, structure, and govern the portfolio data that models depend on.",
    lessons: [
      {
        id: "m2l1",
        title: "Auditing Your Data Estate",
        type: "lesson",
        duration: 16,
        summary: "Locate, catalog, and grade the rent rolls, leases, financials, and operational data across your systems.",
        content: [
          "Most asset management data lives in a patchwork of accounting systems, property management platforms, spreadsheets, and PDF documents. Before any model can be trusted, you need a clear map of what exists and how reliable it is.",
          "This lesson introduces a lightweight data catalog you can build in a spreadsheet: source system, owner, refresh cadence, and a quality grade. We then discuss the difference between structured data (rent rolls, GL) and unstructured data (leases, emails) and why each requires a different pipeline.",
        ],
        keyTakeaways: [
          "You cannot model what you have not cataloged — start with a data inventory.",
          "Grade each source on completeness, accuracy, and freshness.",
          "Structured and unstructured data need fundamentally different pipelines.",
        ],
      },
      {
        id: "m2l2",
        title: "Data Hygiene Workshop",
        type: "workshop",
        duration: 22,
        summary: "Hands-on: standardize a messy multi-property rent roll into a clean, model-ready dataset.",
        content: [
          "In this workshop you will work with a deliberately messy rent roll spanning three properties with inconsistent unit naming, mixed date formats, and missing lease expirations.",
          "You will apply a repeatable cleaning sequence: normalize identifiers, reconcile totals against the GL, flag and handle missing values, and produce a validated export. The same sequence applies whether you use spreadsheets, Python, or an AI copilot.",
        ],
        keyTakeaways: [
          "Standardized identifiers are the foundation of every downstream join.",
          "Always reconcile aggregates against a trusted source before trusting the detail.",
          "A repeatable cleaning sequence turns a chore into a checklist.",
        ],
      },
    ],
  },
  {
    id: "m3",
    code: "AI-210",
    title: "Predictive Performance Analytics",
    track: "Analytics",
    description:
      "Use AI to forecast the metrics that drive asset value — occupancy, NOI, renewals, and operating expense trajectories.",
    lessons: [
      {
        id: "m3l1",
        title: "Forecasting NOI and Occupancy",
        type: "lesson",
        duration: 18,
        summary: "How predictive models turn historical performance and market signals into forward-looking forecasts.",
        content: [
          "Net operating income and occupancy are the heartbeat of asset value. This lesson shows how predictive models learn from historical performance, seasonality, and external market signals to produce forecasts with confidence intervals rather than single-point guesses.",
          "We emphasize interpreting model output as a range and understanding the drivers behind a forecast, so you can challenge it with domain expertise rather than accepting it blindly.",
        ],
        keyTakeaways: [
          "Good forecasts come with confidence ranges, not just a single number.",
          "Always ask which drivers move the forecast — a model you cannot interrogate is a liability.",
          "Domain expertise plus model output beats either one alone.",
        ],
      },
      {
        id: "m3l2",
        title: "Renewal Probability Modeling",
        type: "lesson",
        duration: 15,
        summary: "Predict which tenants are at risk of leaving so you can intervene before they do.",
        content: [
          "Tenant retention is far cheaper than re-leasing. This lesson explores how classification models score each tenant's likelihood to renew using lease terms, payment history, space utilization, and market rent gaps.",
          "You will learn to translate a probability score into an action: which accounts warrant a proactive conversation, an early renewal offer, or a re-leasing contingency plan.",
        ],
        keyTakeaways: [
          "Retention scoring lets you act on risk months before expiration.",
          "A probability is only useful if it maps to a specific intervention.",
          "The mark-to-market rent gap is one of the strongest churn signals.",
        ],
      },
      {
        id: "m3l3",
        title: "Analytics Assessment",
        type: "assessment",
        duration: 10,
        summary: "Interpret model output for a sample portfolio and recommend asset-level actions.",
        content: [
          "You will be given forecast output and renewal scores for a five-asset portfolio and asked to prioritize where to focus attention next quarter, defending each call.",
        ],
        keyTakeaways: [
          "Practices moving from model output to a defensible action plan.",
          "Reinforces reading forecasts as ranges and probabilities as triggers.",
        ],
      },
    ],
  },
  {
    id: "m4",
    code: "AI-230",
    title: "Lease & Document Intelligence",
    track: "Analytics",
    description:
      "Deploy generative AI to read, abstract, and query the mountain of unstructured documents that define your assets.",
    lessons: [
      {
        id: "m4l1",
        title: "Automated Lease Abstraction",
        type: "lesson",
        duration: 17,
        summary: "How large language models extract critical dates, clauses, and economics from lease documents.",
        content: [
          "Lease abstraction has historically been slow, expensive, and error-prone. Generative AI can now read a lease and extract commencement and expiration dates, options, escalations, recovery structures, and co-tenancy clauses in minutes.",
          "This lesson covers how these systems work, where they still make mistakes, and why a human-in-the-loop review step remains essential for anything that drives a financial decision.",
        ],
        keyTakeaways: [
          "LLMs can abstract leases in minutes but are not infallible.",
          "Always keep a human-in-the-loop review for financially material terms.",
          "Structured extraction unlocks portfolio-wide lease analytics.",
        ],
      },
      {
        id: "m4l2",
        title: "Querying Documents with AI",
        type: "workshop",
        duration: 20,
        summary: "Hands-on: ask natural-language questions across a portfolio of leases and management agreements.",
        content: [
          "In this workshop you will use a retrieval-based assistant to answer questions like 'which leases expire in the next 18 months with no renewal option?' across a document set — without manually opening a single file.",
          "You will learn to write precise prompts, verify answers against the source text, and recognize when the system is guessing rather than citing.",
        ],
        keyTakeaways: [
          "Retrieval-based assistants let you interrogate documents in plain language.",
          "Always verify an answer against the cited source passage.",
          "Precise questions produce precise, checkable answers.",
        ],
      },
    ],
  },
  {
    id: "m5",
    code: "AI-260",
    title: "Market Intelligence & Deal Screening",
    track: "Analytics",
    description:
      "Combine external market data with AI to screen opportunities and pressure-test hold-versus-sell decisions.",
    lessons: [
      {
        id: "m5l1",
        title: "AI-Assisted Deal Screening",
        type: "lesson",
        duration: 15,
        summary: "Rapidly triage acquisition and disposition opportunities against your investment criteria.",
        content: [
          "This lesson shows how AI can pre-screen a pipeline of opportunities against your fund's criteria — geography, asset class, return thresholds, and risk tolerance — surfacing the handful worth a full underwrite.",
          "We stress that screening accelerates human judgment, it does not replace it; the goal is to spend analyst time on the deals most likely to close.",
        ],
        keyTakeaways: [
          "AI screening filters noise so analysts focus on live opportunities.",
          "Encode your investment criteria explicitly so the filter is auditable.",
          "Screening informs the shortlist; underwriting still decides.",
        ],
      },
      {
        id: "m5l2",
        title: "Hold vs. Sell Analysis",
        type: "lesson",
        duration: 13,
        summary: "Use scenario modeling to inform disposition timing across a portfolio.",
        content: [
          "Every asset faces a recurring question: hold, refinance, or sell. This lesson shows how AI-assisted scenario modeling projects outcomes under varied rate, rent, and cap-rate assumptions to inform disposition timing.",
        ],
        keyTakeaways: [
          "Scenario modeling reframes hold-vs-sell as a range of outcomes.",
          "Stress the assumptions that matter most: rates, rent growth, and exit cap.",
        ],
      },
    ],
  },
  {
    id: "m6",
    code: "AI-310",
    title: "Risk, Governance & Responsible AI",
    track: "Governance",
    description:
      "Adopt AI without introducing new risk. Cover model governance, fair housing, data privacy, and responsible deployment.",
    lessons: [
      {
        id: "m6l1",
        title: "Governing AI in the Enterprise",
        type: "lesson",
        duration: 16,
        summary: "Establish the controls, documentation, and review gates that keep AI trustworthy at scale.",
        content: [
          "As AI moves from pilot to production, governance becomes non-negotiable. This lesson covers model documentation, approval gates, monitoring for drift, and clear accountability for AI-informed decisions.",
          "We frame governance not as a brake but as the enabler that lets you scale AI with confidence and defensibility.",
        ],
        keyTakeaways: [
          "Governance is what lets you scale AI safely, not a barrier to it.",
          "Document models, define approval gates, and monitor for drift.",
          "Accountability for AI-informed decisions must sit with a named human.",
        ],
      },
      {
        id: "m6l2",
        title: "Fair Housing, Privacy & Bias",
        type: "lesson",
        duration: 14,
        summary: "Understand the legal and ethical guardrails specific to real estate AI.",
        content: [
          "Real estate carries specific regulatory obligations around fair housing and data privacy. This lesson explains how bias can creep into models, the classes of data to keep out of certain decisions, and how to audit for disparate impact.",
        ],
        keyTakeaways: [
          "Some data must never drive certain decisions — know the protected classes.",
          "Audit models for disparate impact, not just accuracy.",
          "Privacy obligations extend to how tenant data trains your models.",
        ],
      },
      {
        id: "m6l3",
        title: "Capstone: Your AI Roadmap",
        type: "assessment",
        duration: 25,
        summary: "Synthesize the program into a prioritized, governed AI roadmap for your own portfolio.",
        content: [
          "The capstone brings the entire program together. You will draft a 12-month AI roadmap for your portfolio: the initiatives you will pilot, the data you must prepare, the governance you will put in place, and the metrics that define success.",
          "This is the deliverable you take back to your team and investment committee.",
        ],
        keyTakeaways: [
          "Turns the full program into a concrete, sequenced plan of action.",
          "Balances ambition with data readiness and governance.",
          "Produces a committee-ready artifact you own.",
        ],
      },
    ],
  },
]

export const totalLessons = modules.reduce((n, m) => n + m.lessons.length, 0)

export const totalMinutes = modules.reduce(
  (n, m) => n + m.lessons.reduce((s, l) => s + l.duration, 0),
  0,
)

export function findModuleByLesson(lessonId: string) {
  return modules.find((m) => m.lessons.some((l) => l.id === lessonId))
}

export function flatLessons() {
  return modules.flatMap((m) => m.lessons.map((l) => ({ module: m, lesson: l })))
}
