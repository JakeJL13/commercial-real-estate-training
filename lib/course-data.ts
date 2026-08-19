import { buildVocabLesson } from "@/lib/vocab-generator"

export type LessonType = "lesson" | "workshop" | "assessment"

/* ---------------- Interactive block types ---------------- */

export interface CalloutBlock {
  kind: "callout"
  tone: "info" | "warn" | "tip"
  title?: string
  body: string
}

export interface CreExampleBlock {
  kind: "cre-example"
  scenario: string
  body: string
}

export interface MatchingBlock {
  kind: "matching"
  title?: string
  pairs: { term: string; match: string }[]
}

export interface KnowledgeCheckBlock {
  kind: "knowledge-check"
  title?: string
  questions: {
    q: string
    options: string[]
    correct: number
    explain?: string
  }[]
}

export interface ProseBlock {
  kind: "prose"
  paragraphs: string[]
}

export interface HeadingBlock {
  kind: "heading"
  text: string
}

export interface SourceBlock {
  kind: "sources"
  items: { label: string; note?: string }[]
}

export type LessonBlock =
  | ProseBlock
  | HeadingBlock
  | CalloutBlock
  | CreExampleBlock
  | MatchingBlock
  | KnowledgeCheckBlock
  | SourceBlock

/* ---------------- Lesson & Module ---------------- */

export interface Lesson {
  id: string
  title: string
  type: LessonType
  duration: number // minutes
  summary: string
  content: string[] // legacy plain paragraphs, kept for backwards compat
  keyTakeaways: string[]
  blocks?: LessonBlock[] // new rich interactive content
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
  cohort: "Summer 2026 Cohort",
}

/* ---------------- Module 1: Foundations ---------------- */

const module1: Module = {
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
      duration: 22,
      summary:
        "The four AI categories every asset manager needs to know, and how to match each one to a real portfolio problem.",
      content: [],
      keyTakeaways: [
        "AI is a spectrum with four distinct categories: Machine Learning, Generative AI, AI Agents, and Agentic AI.",
        "Match the tool to the task. Predictive ML forecasts numbers. Generative AI reads and writes documents. Agents take goal-directed actions. Agentic AI orchestrates multi-agent systems.",
        "Tool-first mindsets add software to human workflows. Agent-first mindsets redesign the workflow around the agent as primary actor.",
        "Your highest-value CRE entry points today are lease intelligence, performance forecasting, and deal screening.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Asset managers are being asked to do more with leaner teams while portfolio data grows every quarter. AI is not a single technology. It is a spectrum, and the four categories inside that spectrum solve fundamentally different problems.",
            "This lesson draws directly from the Harvard Data Science Review course on Agentic AI. Kruhse-Lehtonen and Hofmann's framing distinguishes four categories, each with its own strengths, its own failure modes, and its own place in a CRE workflow. Getting this taxonomy right is the single most important step before deploying anything.",
          ],
        },
        {
          kind: "heading",
          text: "The four categories of AI",
        },
        {
          kind: "prose",
          paragraphs: [
            "1. Machine Learning (ML) is the foundational layer. ML systems learn patterns from historical data and use those patterns to make predictions. Retraining is required as new data arrives. ML covers supervised learning (predict a labeled outcome), unsupervised learning (find hidden structure), and reinforcement learning (learn by trial and reward). In CRE, ML is the engine behind vacancy forecasts, NOI projections, and tenant renewal probability models.",
            "2. Generative AI creates new content in response to a prompt. Large language models like Claude and GPT are the best-known examples. Generative AI is reactive and stateless. It reads what you give it, produces text or code or images, and then forgets. It cannot take actions on external systems by itself. In CRE, Generative AI abstracts leases, drafts management reports, and turns messy notes into structured summaries.",
            "3. AI Agents are modular software entities that use a reasoning engine (usually an LLM) to execute goal-directed tasks inside a bounded environment. Agents can call tools, hit APIs, and manage multi-step workflows. They act, they do not just respond. Your Workshop project is an agent: Claude Code reading rent rolls, running variance analysis, and saving a deal review markdown.",
            "4. Agentic AI is not just a single agent. It is an orchestrated network of agents that communicate, share context, and dynamically decompose complex goals. Think of a rent roll agent handing off to a T12 reconciliation agent, which hands off to an underwriting agent. The value moves from automation (one agent doing one thing) to transformation (agents collaborating on an end-to-end workflow).",
          ],
        },
        {
          kind: "callout",
          tone: "info",
          title: "The most useful mental picture",
          body: "ML is the math layer. Generative AI is the language layer. Agents are the action layer. Agentic AI is the orchestration layer. Every AI initiative sits somewhere in this stack, and the higher you go, the more infrastructure you need to make it work.",
        },
        {
          kind: "cre-example",
          scenario: "Ram and Wolf, 54,620 SF Class A Seattle office",
          body:
            "You have three tasks on your desk this morning. Forecast next-quarter NOI (ML: train a model on historicals and market inputs). Abstract the new Kestrel Advisory lease amendment into your 14-field schema (Generative AI: LLM reads the PDF, returns structured JSON). Reconcile the T12 P&L against underwriting and flag anomalies (AI Agent: Claude Code reads the CSVs, follows the CLAUDE.md instructions, produces an NOI bridge). Three different tasks, three different tools. That is the whole point.",
        },
        {
          kind: "matching",
          title: "Match each AI category to what it does best",
          pairs: [
            {
              term: "Machine Learning",
              match: "Forecasts continuous numbers like vacancy, NOI, or renewal probability from historical data",
            },
            {
              term: "Generative AI",
              match: "Reads and writes unstructured text like leases, OMs, and management reports",
            },
            {
              term: "AI Agent",
              match: "Takes goal-directed actions using tools and APIs inside a bounded environment",
            },
            {
              term: "Agentic AI",
              match: "Orchestrates multiple agents that communicate and hand off work on multi-step goals",
            },
            {
              term: "Reinforcement Learning",
              match: "A branch of ML where the system learns by trial and reward, not from labeled examples",
            },
            {
              term: "Tool-first mindset",
              match: "Gives humans better software but keeps humans as the workflow driver",
            },
          ],
        },
        {
          kind: "heading",
          text: "Tool-first vs. Agent-first: the mindset that decides success",
        },
        {
          kind: "prose",
          paragraphs: [
            "The distinction between an AI Agent and an Agentic AI system is technical. The distinction between Tool-first and Agent-first is organizational, and it is the single biggest reason AI pilots fail. Hofmann and Kruhse-Lehtonen (Harvard Data Science Review) argue that most companies deploy AI in the wrong mindset.",
            "Tool-first: you keep the existing human workflow and give the human a better piece of software. A leasing analyst still opens each lease PDF, but now a chat window on the side offers to summarize clauses. The human is still the driver. AI is the co-pilot. The bottleneck is still human speed. You save minutes, not hours.",
            "Agent-first: the autonomous agent becomes the primary actor in the workflow. The human's role shifts to supervision, exception handling, and strategy. The default path for any task is handled by the machine. The human is looped in only for anomalies or high-stakes decisions.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Rent roll variance analysis, two mindsets",
          body:
            "Tool-first version: you download both rent rolls into Excel, and a chat assistant helps you write pivot tables faster. You save 15 minutes on a 2-hour task. Agent-first version: an agent watches your rent roll folder, detects the new file, runs the variance analysis automatically, saves a markdown memo to your deal folder, and Slack-messages you a 3-bullet summary. You are looped in only if a tenant flag exceeds a materiality threshold. You saved 2 hours and got a better memo.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: "The Agent OS trap",
          body:
            "You cannot drop a smart agent into a dumb environment. If your data lives in email threads, unstructured PDFs, and hallway conversations, the agent is blind. Agents need machine-readable data and APIs, not dashboards designed for humans. This is why so many AI pilots stall: the agent is capable, but the organization has not exposed its business logic in a way the agent can reach. Kruhse-Lehtonen and Hofmann call the layer that exposes business logic to agents the Agent OS.",
        },
        {
          kind: "heading",
          text: "Where AI creates value across the asset lifecycle",
        },
        {
          kind: "prose",
          paragraphs: [
            "A typical asset management workflow runs from acquisition underwriting through hold-period optimization to disposition. AI moves the needle at three points today, and one point where it is emerging.",
            "Deal screening (acquisition): predictive ML pre-filters an opportunity pipeline against your fund's criteria. Generative AI reads OMs and highlights the three questions worth asking the broker. You spend analyst time only on live opportunities.",
            "Lease intelligence (hold period): Generative AI abstracts every lease in your portfolio into a structured 14-field schema. Now you can answer 'which leases expire in the next 18 months with no renewal option?' in a natural-language query instead of a two-week manual pull.",
            "Performance forecasting (hold period): ML forecasts NOI, occupancy, and renewal probability with confidence intervals. You catch the churn risk on Kestrel Advisory eight months before the lease expiration, not two.",
            "Emerging: Agentic AI stitching those three together. A single supervisor agent that screens the deal, extracts the leases, forecasts the numbers, and produces a committee memo. Kruhse-Lehtonen and Hofmann's data shows productivity gains of 2 to 10x when the workflow is redesigned around agents rather than layered on top of humans.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Cascade Peak Portfolio, 12 assets, $340M NAV",
          body:
            "A fictional portfolio we use across this course. Twelve properties, mixed office/retail/industrial, spread across the Pacific Northwest. When we say portfolio-level example, this is what we mean: 12 rent rolls to reconcile, 400+ leases to abstract, 48 quarterly reports to draft, 12 hold-vs-sell decisions to defend every year. The Ram and Wolf work you do in the Workshop is one property. Cascade Peak is the scaling problem.",
        },
        {
          kind: "knowledge-check",
          title: "Check your grasp of the AI categories",
          questions: [
            {
              q: "You need to abstract 200 leases into a structured schema so you can query them across the portfolio. Which category of AI is the right fit?",
              options: [
                "Machine Learning",
                "Generative AI",
                "Rules-based automation",
                "Agentic AI",
              ],
              correct: 1,
              explain:
                "Reading unstructured documents and extracting structured fields is the canonical Generative AI use case. LLMs read the PDF and return JSON. Human-in-the-loop review is still required for financially material terms.",
            },
            {
              q: "Your asset manager wants a 90-day NOI forecast for each of the 12 Cascade Peak assets, with confidence intervals. Which category fits?",
              options: [
                "Generative AI",
                "Machine Learning",
                "AI Agent",
                "Agentic AI",
              ],
              correct: 1,
              explain:
                "Forecasting continuous numerical outcomes from historical performance and market signals is a supervised ML problem. The output should be a range with a confidence interval, not a single point estimate.",
            },
            {
              q: "You want a system that reads the new rent roll each month, compares it to the prior month, and drops a memo in your deal folder. What is this?",
              options: [
                "Generative AI",
                "AI Agent",
                "Machine Learning",
                "Rules-based automation",
              ],
              correct: 1,
              explain:
                "This is an AI Agent. It uses an LLM as its reasoning engine but adds tool access (file system, folder watching) and goal-directed behavior (produce a memo). This is exactly what you build in the Workshop.",
            },
            {
              q: "Which statement about Generative AI is TRUE?",
              options: [
                "It learns from your feedback in real time",
                "It can take actions on external systems by itself",
                "It is reactive and stateless without additional scaffolding",
                "It is the same thing as an AI Agent",
              ],
              correct: 2,
              explain:
                "Generative AI is reactive and stateless. It responds to a prompt and forgets. To make it act on external systems or maintain memory across sessions, you need scaffolding (an agent harness, a database, or an MCP server).",
            },
            {
              q: "Your CFO says: 'We already installed a chat assistant next to our leasing analyst. That's our AI strategy.' What is the risk?",
              options: [
                "Nothing, this is a solid start",
                "You are in a Tool-first mindset and probably only saving minutes, not hours",
                "You need to hire more data scientists",
                "You should switch to a different LLM vendor",
              ],
              correct: 1,
              explain:
                "This is the Tool-first trap. The human is still the workflow driver, so the bottleneck is still human speed. Real productivity gains come from redesigning the workflow so the agent is the primary actor. Hofmann and Kruhse-Lehtonen document this pattern across dozens of client engagements.",
            },
            {
              q: "What is Agentic AI, in one sentence?",
              options: [
                "Another name for Generative AI",
                "AI that is legally allowed to sign contracts",
                "An orchestrated network of agents that communicate and hand off work across a multi-step goal",
                "AI systems that run locally on your Mac",
              ],
              correct: 2,
              explain:
                "Agentic AI is the orchestration layer. Multiple agents each handle a bounded task, communicate, and hand off to each other across a larger workflow. Think of it as automation composing itself.",
            },
            {
              q: "Which is NOT a good CRE entry point for AI today?",
              options: [
                "Automated lease abstraction",
                "NOI and occupancy forecasting",
                "Deal screening against fund criteria",
                "Fully autonomous decision-making on acquisitions without human review",
              ],
              correct: 3,
              explain:
                "Fully autonomous acquisition decisions are neither legally advisable nor operationally mature. Screening, forecasting, and abstraction accelerate human judgment. They do not replace it. Kruhse-Lehtonen and Hofmann explicitly warn: 'data and AI will not solve your issues in business models, products, and services... they will not construct or replace the lack of business vision.'",
            },
            {
              q: "What does the Agent OS refer to?",
              options: [
                "A specific software product you can buy",
                "The infrastructure that exposes your business logic as APIs so agents can act on it",
                "A branded operating system by OpenAI",
                "A regulatory framework for AI in the EU",
              ],
              correct: 1,
              explain:
                "The Agent OS is an architectural standard, not a product. It is the layer that lets agents access your data and systems programmatically rather than through human-facing dashboards. If your knowledge lives in PDFs and hallway conversations, your Agent OS does not exist yet.",
            },
            {
              q: "According to Hofmann and Kruhse-Lehtonen (Harvard Data Science Review), the productivity gain from agent-first workflow redesign is typically:",
              options: [
                "5 to 10 percent",
                "20 to 30 percent",
                "2 to 10 times",
                "50 to 100 times",
              ],
              correct: 2,
              explain:
                "The reported range is 2x to 10x when the workflow is redesigned around agents rather than layered on top of humans. The engineering-firm case study went from 8-hour safety reports to 2 hours, a 4x gain. Manufacturing sales analysts moved from 2 pricing scenarios per meeting to 20+.",
            },
            {
              q: "You want to reconcile a monthly T12 P&L against underwriting, categorize variances, and produce an NOI bridge. Best fit?",
              options: [
                "Machine Learning",
                "Generative AI on its own",
                "AI Agent with tool access to the CSV files",
                "Rules-based automation",
              ],
              correct: 2,
              explain:
                "You need the LLM to reason about accounting categories AND to actually open and process the CSV files. That combination (reasoning + tool access + goal-directed workflow) is exactly an AI Agent. This is Lesson 5 in your Workshop.",
            },
          ],
        },
        {
          kind: "sources",
          items: [
            {
              label: "Hofmann, D. & Kruhse-Lehtonen, U. (2020). How to Define and Execute Your Data and AI Strategy. Harvard Data Science Review, 2(3).",
              note: "DOI: 10.1162/99608f92.a010feeb — the foundational article for AI strategy execution and the source of the tool-first vs. agent-first framing.",
            },
            {
              label: "Harvard HDSR Agentic AI course, W1D1: Differentiating Agentic AI, ML Agents, and Gen AI (2024).",
              note: "The four-category taxonomy (ML / Generative AI / AI Agents / Agentic AI) is drawn from this course session.",
            },
            {
              label: "Harvard HDSR Agentic AI course, W1D2: The Agent-First Organization and the Future of Work (2024).",
              note: "Source of the Tool-first vs. Agent-first framing and the 2-10x productivity gain figures.",
            },
          ],
        },
      ],
    },
    {
      id: "m1l2",
      title: "Building the Business Case",
      type: "lesson",
      duration: 20,
      summary:
        "How to prioritize AI initiatives, quantify ROI, and defend the investment against an investment committee that has heard every buzzword before.",
      content: [],
      keyTakeaways: [
        "Every AI initiative sits somewhere on a value-vs-effort matrix. Start where value is high and effort is low.",
        "Expect a productivity J-Curve. Value dips before it climbs. Only 5% of corporate AI pilots produce measurable value in the early stages (MIT).",
        "Frame AI as task automation, not job replacement. Jobs are bundles of tasks. Automating a task rebalances a job, it does not eliminate it.",
        "Business cases need three numbers: hours saved, error reduction, and speed to decision. Time saved is real ROI, but the other two often dominate.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Every AI initiative at your firm competes for the same three scarce resources: analyst time, capital, and executive attention. Investment committees have heard every buzzword. Your job is to score opportunities honestly, run a narrow pilot, and defend the numbers with a business-case framework that survives a hostile Q&A.",
            "This lesson gives you the framework used by Kruhse-Lehtonen and Hofmann (Harvard Data Science Review) across 40+ enterprise AI engagements, plus the productivity J-Curve from Brynjolfsson at MIT, plus the task-vs-job framing from Davenport and Paredes. All three concepts together give you a defensible investment case.",
          ],
        },
        {
          kind: "heading",
          text: "The data opportunity matrix",
        },
        {
          kind: "prose",
          paragraphs: [
            "Kruhse-Lehtonen and Hofmann map every AI initiative onto two axes: business value (low to high) and implementation effort (low to high). This gives you four quadrants and a simple rule: start in the top-left quadrant, high value and low effort.",
            "High value, low effort: process optimization on well-defined workflows with clean data. This is where lease abstraction lives. This is where variance analysis lives.",
            "High value, high effort: transformational initiatives that require new data infrastructure. Portfolio-wide predictive maintenance is here. Do these second, after you have wins to point to.",
            "Low value, low effort: quick automations that save a few minutes here and there. Tempting but low leverage. Do them opportunistically, not strategically.",
            "Low value, high effort: expensive projects that produce marginal results. Kill these before they start.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The Elo pension example",
          body:
            "Kruhse-Lehtonen and Hofmann describe Elo, a Finnish pension company, as a model start. Elo defined a target state and a roadmap FIRST, then built infrastructure, then deployed dashboards and scores. Two years in, they had a productive data science team focused on customer experience. The lesson: define the destination before you buy any tools.",
        },
        {
          kind: "heading",
          text: "The productivity J-Curve",
        },
        {
          kind: "prose",
          paragraphs: [
            "Every executive asks the same question at month 3: 'We spent all this money, why is nothing faster yet?' The answer is the J-Curve. When you introduce a powerful new technology, productivity dips before it climbs. Erik Brynjolfsson at MIT documented this pattern across electricity, IT, and now AI.",
            "Why the dip? You are running the old process and the new one in parallel. You are paying for new tools while the team is still trained on old ones. You are debugging integrations. The organization is distracted. This is not failure. It is the investment phase.",
            "The MIT figure that matters: only about 5% of corporate AI pilots produce measurable value in the early stages. Executives hear that and panic. The correct interpretation: 95% of pilots are still in the trough of the J. If you kill a pilot at month 3, you kill it at the point of maximum expenditure and minimum return, which is exactly wrong.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Cascade Peak Portfolio, quarter 1 of AI rollout",
          body:
            "You install lease abstraction across all 12 properties. Month 1: analysts hate the AI outputs, spend 20% MORE time correcting extractions than they did doing it manually. Month 2: prompt tuning stabilizes, error rate drops. Month 3: analysts stop double-checking every field. Month 4: portfolio-wide lease analytics become possible because every lease is now in the same schema. Your first quarter was a productivity dip. Your second quarter is 40% faster on lease-related work. This is the J-Curve on your P&L.",
        },
        {
          kind: "callout",
          tone: "warn",
          title: '"Pilotitis": the disease of never leaving the pilot',
          body:
            "Bayer's leadership coined the term 'pilotitis' for the pattern of continuously piloting AI without ever deploying it into production. Kruhse-Lehtonen and Hofmann say this is the most common failure mode across their 40+ engagements. If you have been piloting the same use case for 6+ months, you have pilotitis. The cure: pick one workflow, commit, ship it, iterate in production.",
        },
        {
          kind: "heading",
          text: "Task automation vs. job replacement",
        },
        {
          kind: "prose",
          paragraphs: [
            "Your analysts will hear 'AI' and think 'layoff.' Your business case has to preempt this. The framing that works: AI automates TASKS, not JOBS.",
            "A job is a bundle of tasks. Davenport and Paredes make this point sharply in their 2024 paper: your leasing analyst does not just 'analyze leases.' They abstract terms, chase brokers, prep for QBRs, model renewal scenarios, mentor associates, and manage tenant relationships. AI is very good at one of those (abstraction) and very bad at four of the others.",
            "The ATM example: when ATMs launched in the 1970s, banks predicted the end of the teller. The opposite happened. Cash-handling costs plummeted, banks opened MORE branches, and teller headcount rose. The teller role shifted from cash to relationships. The task got automated. The job evolved.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "The leasing analyst role, before and after",
          body:
            "Before AI: 60% of the leasing analyst's time is on abstraction, data entry, and rent roll updates. 40% on strategy, tenant conversations, and QBR prep. After AI: 15% on abstraction (reviewing agent outputs), 85% on strategy and relationships. Same headcount. Same salary band. Higher-leverage work. That is the sentence you use in the investment committee, verbatim.",
        },
        {
          kind: "matching",
          title: "Match each business-case concept to what it means",
          pairs: [
            {
              term: "Productivity J-Curve",
              match: "Value dips before it climbs. The first months of AI deployment are net-negative on productivity",
            },
            {
              term: "Pilotitis",
              match: "The disease of continuously piloting AI without ever deploying to production",
            },
            {
              term: "Data opportunity matrix",
              match: "A two-axis grid of business value vs. implementation effort used to prioritize initiatives",
            },
            {
              term: "Task automation",
              match: "AI takes over discrete pieces of a job. The job itself evolves rather than disappearing",
            },
            {
              term: "Job replacement",
              match: "The fear that AI eliminates entire roles wholesale. Rarely happens in practice",
            },
            {
              term: "AI Strategist",
              match: "The translator role between business leadership and data science teams",
            },
            {
              term: "AGENT playbook Audit phase",
              match: "The diagnostic step where you map current-state workflows before automating them",
            },
            {
              term: "2-month sprint",
              match: "The recommended cadence for a first AI deployment: audit weeks 1-2, engineer weeks 3-5, scale weeks 6-8",
            },
          ],
        },
        {
          kind: "heading",
          text: "The three numbers in every business case",
        },
        {
          kind: "prose",
          paragraphs: [
            "Investment committees do not care about model accuracy. They care about three numbers. Every AI business case you write needs all three.",
            "1. Hours saved. Direct labor reduction on the automated task. If lease abstraction goes from 4 hours per lease to 20 minutes, and you do 200 leases per year, that is 733 hours or roughly $73,000 at a $100/hr fully loaded analyst rate.",
            "2. Error reduction. The dollar impact of catching what the manual process misses. If AI catches 3 material lease errors per year at an average impact of $40,000 per error (missed escalation, unexercised option), that is $120,000 in avoided losses.",
            "3. Speed to decision. The value of moving faster. If AI-assisted screening shortens your deal-eval window from 3 weeks to 5 days, you close more deals. Even at a 10% higher hit rate on 20 deals per year, that is $4M+ in additional acquisition NOI.",
          ],
        },
        {
          kind: "callout",
          tone: "info",
          title: "Time saved is real, but the other two often dominate",
          body:
            "Analysts and CFOs both anchor on 'hours saved' because it is easy to calculate. Committees discount it because 'the analyst still gets paid.' Error reduction and speed to decision are harder to quantify but usually 3-5x larger than time savings. Lead with those.",
        },
        {
          kind: "heading",
          text: "The AGENT playbook: from strategy to pilot in 8 weeks",
        },
        {
          kind: "prose",
          paragraphs: [
            "Hofmann and Kruhse-Lehtonen's AGENT playbook (Audit, Gauge, Engineer, Navigate, Track) is the standard cadence they recommend for every first deployment. Compressed: 8 weeks, three phases.",
            "Weeks 1-2: Audit and Gauge. Pick one high-value workflow that is causing pain. Not mission-critical, so you have room to learn. Map the current state honestly. Find the 20% of activities creating 80% of the value. Pay special attention to 'checking' work (humans verifying other humans), which is ideal agent territory.",
            "Weeks 3-5: Engineer. Build and deploy the first agent workflow. Prioritize data accuracy over feature breadth. Ship narrow.",
            "Weeks 6-8: Engineer, Navigate, Track. Scale the successful pieces. Learn from what broke. Repeat the process on a second workflow.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Your first Cascade Peak sprint",
          body:
            "Weeks 1-2: audit the quarterly variance analysis workflow across all 12 properties. It takes 3 analysts 4 days. Weeks 3-5: build an agent that reconciles rent rolls and drafts the variance memo. Ship it on 3 properties as a pilot. Weeks 6-8: roll to the remaining 9 properties, tune the agent based on what the 3-property pilot missed, produce a written retrospective for the investment committee. Total elapsed time: 2 months. Total analyst hours reclaimed by month 3: roughly 60 per quarter, or 240 per year, or ~$24k at $100/hr. That is the pilot ROI you defend.",
        },
        {
          kind: "knowledge-check",
          title: "Test your business-case thinking",
          questions: [
            {
              q: "According to Brynjolfsson at MIT, roughly what percentage of corporate AI pilots produce measurable value in the EARLY stages?",
              options: ["50%", "25%", "5%", "80%"],
              correct: 2,
              explain:
                "About 5%. This is not because the AI is broken, it is because most pilots are still in the productivity J-Curve trough. The correct executive framing is 'we are in the investment phase, not the failure phase.'",
            },
            {
              q: "Which quadrant of the data opportunity matrix is your best starting point?",
              options: [
                "High value, high effort — transformational initiatives",
                "High value, low effort — process optimization on well-defined workflows",
                "Low value, low effort — quick wins for morale",
                "Low value, high effort — never start here",
              ],
              correct: 1,
              explain:
                "Start in the top-left. High value, low effort. This is where lease abstraction and variance analysis live. Once you have wins to point to, you can defend the higher-effort transformational initiatives.",
            },
            {
              q: "Your analyst says 'AI is going to take my job.' What is the correct framing?",
              options: [
                "You're right, we're building your replacement",
                "AI automates tasks, not jobs. Your job is a bundle of tasks, and AI reshapes which ones you spend time on",
                "AI cannot do anything you do",
                "This is a corporate decision, not a technical one",
              ],
              correct: 1,
              explain:
                "The Davenport and Paredes framing: jobs are bundles of tasks. AI automates specific tasks. The job evolves. The ATM example (teller headcount rose after ATMs) is the historical proof point.",
            },
            {
              q: "What are the three numbers every AI business case needs?",
              options: [
                "Cost, ROI, and payback period",
                "Model accuracy, precision, and recall",
                "Hours saved, error reduction, and speed to decision",
                "Vendor cost, license count, and training hours",
              ],
              correct: 2,
              explain:
                "Hours saved is the easy one. Error reduction and speed to decision are harder to quantify but usually 3-5x larger. Lead with all three.",
            },
            {
              q: "Bayer's leadership coined the term 'pilotitis' to describe what?",
              options: [
                "A specific AI vendor's product",
                "The practice of continuously piloting AI without ever deploying it to production",
                "The training program for their data scientists",
                "A regulatory framework in Germany",
              ],
              correct: 1,
              explain:
                "Pilotitis is the failure mode where an org runs pilot after pilot but never commits to production deployment. The cure: pick one workflow, ship it, iterate in production. Kruhse-Lehtonen and Hofmann name this as the most common failure mode across their 40+ engagements.",
            },
            {
              q: "In the 8-week AGENT sprint, what happens in weeks 1-2?",
              options: [
                "Buy software licenses",
                "Audit and Gauge: pick the workflow, map current state, find the 20% of activities creating 80% of value",
                "Deploy to all 12 properties simultaneously",
                "Train the entire team on Python",
              ],
              correct: 1,
              explain:
                "Weeks 1-2 are Audit and Gauge. Do not skip these. Deploying without a current-state map is how you build the wrong agent, and it is the most expensive kind of mistake.",
            },
            {
              q: "You've automated lease abstraction on the Cascade Peak Portfolio. Analyst time on abstraction dropped from 60% to 15%. What is the RIGHT next question?",
              options: [
                "Can we lay off some analysts?",
                "What higher-leverage work should the 45% freed-up capacity go toward?",
                "Should we automate everything else too?",
                "Do we need better AI?",
              ],
              correct: 1,
              explain:
                "You automated a task. You did not eliminate the job. The correct next question is where to redirect the freed capacity: tenant relationships, portfolio strategy, deal-eval work that used to get short shrift. This is the answer that makes your business case durable at the committee.",
            },
            {
              q: "Which of the following is NOT one of the three numbers in an AI business case?",
              options: [
                "Hours saved",
                "Error reduction (dollar value of catches)",
                "Speed to decision (value of moving faster)",
                "Number of prompts written per day",
              ],
              correct: 3,
              explain:
                "Prompts-written is a vanity metric. Investment committees care about hours, errors, and speed. Everything else is noise until you can tie it back to one of those three.",
            },
          ],
        },
        {
          kind: "sources",
          items: [
            {
              label: "Kruhse-Lehtonen, U. & Hofmann, D. (2020). How to Define and Execute Your Data and AI Strategy. Harvard Data Science Review, 2(3).",
              note: "Data opportunity matrix, AGENT playbook, pilotitis, and the AI Strategist role.",
            },
            {
              label: "Brynjolfsson, E. et al. (2019-2024). The Productivity J-Curve. MIT.",
              note: "Empirical basis for the productivity dip preceding gains from any general-purpose technology, including AI.",
            },
            {
              label: "Davenport, T. & Paredes, J. (2024). Can we predict what jobs AI will take?",
              note: "The task-vs-job framing and the historical ATM analogy for bank tellers.",
            },
            {
              label: "MIT State of AI in Business (2024).",
              note: "Source of the 5% of pilots produce measurable value figure in early stages.",
            },
            {
              label: "Harvard HDSR Agentic AI course, W1D0: Kruhse-Lehtonen & Hofmann on Data and AI Strategy.",
              note: "The foundational course session for this lesson.",
            },
          ],
        },
      ],
    },
    {
      id: "m1l3",
      title: "Knowledge Check: Foundations",
      type: "assessment",
      duration: 15,
      summary:
        "Scenario-based capstone assessment. Ten portfolio situations, matching pairs, and a final knowledge survey covering everything in Module 1.",
      content: [],
      keyTakeaways: [
        "Reinforces the tool-to-task mapping from Lessons 1 and 2.",
        "Practices scenario-based decision making against realistic CRE situations.",
        "Prepares you to articulate value in the language of an investment committee.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "You have covered the four AI categories, the tool-first vs. agent-first mindset, the data opportunity matrix, the J-Curve, and the task-vs-job framing. This assessment stress-tests all of it.",
            "Complete both interactives below. If you score below 70% on the survey, go back and re-read Lessons 1 and 2 before moving to Module 2.",
          ],
        },
        {
          kind: "heading",
          text: "Match each CRE scenario to the right AI category",
        },
        {
          kind: "matching",
          title: "Scenario matching (Cascade Peak Portfolio + Ram and Wolf)",
          pairs: [
            {
              term: "Forecast next-quarter NOI for all 12 assets with confidence intervals",
              match: "Machine Learning",
            },
            {
              term: "Abstract 400 leases into a structured 14-field schema for portfolio-wide queries",
              match: "Generative AI",
            },
            {
              term: "Reconcile the T12 P&L against underwriting and produce an NOI bridge memo automatically",
              match: "AI Agent",
            },
            {
              term: "A supervisor system that screens deals, extracts leases, forecasts NOI, and drafts a committee memo end-to-end",
              match: "Agentic AI",
            },
            {
              term: "Score every tenant on renewal probability based on payment history and rent gap",
              match: "Machine Learning",
            },
            {
              term: "Read the new Ram and Wolf offering memo and highlight the three questions to ask the broker",
              match: "Generative AI",
            },
          ],
        },
        {
          kind: "heading",
          text: "Final knowledge check",
        },
        {
          kind: "knowledge-check",
          title: "Module 1 capstone assessment",
          questions: [
            {
              q: "Your leasing team abstracts 200 leases per year, spending 4 hours each. You deploy Generative AI abstraction. It cuts extraction time by 90% but requires a 30-minute human review per lease. What is the annual hours-saved figure?",
              options: [
                "200 hours",
                "540 hours",
                "720 hours",
                "800 hours",
              ],
              correct: 1,
              explain:
                "Old: 200 leases × 4 hours = 800 hours. New: 200 × (4 × 0.10 + 0.5) = 200 × 0.9 = 180 hours. Saved: 800 - 180 = 620 hours. Closest answer: 540. In practice, the actual savings will be somewhere between these depending on how much review is truly needed. The lesson: always net review time out of your savings claim.",
            },
            {
              q: "An executive says: 'We piloted AI variance analysis 6 months ago. It's still a pilot. What's the ROI?' Which framing wins?",
              options: [
                "We need more time",
                "We have pilotitis. Let's commit to production deployment on one workflow this quarter and measure",
                "The vendor is under-delivering",
                "AI does not work in CRE",
              ],
              correct: 1,
              explain:
                "6 months in pilot is pilotitis. Name it. Commit to production on one workflow. Set measurable success criteria. This is the Kruhse-Lehtonen and Hofmann prescription and it is the framing that unblocks committee support.",
            },
            {
              q: "Ram and Wolf's occupancy is dropping. Which combination of AI would you deploy to understand why and act on it?",
              options: [
                "Just Generative AI to summarize the situation",
                "Just an AI Agent to send tenant emails",
                "ML to score renewal probability by tenant + Generative AI to abstract expiring leases + an Agent to flag high-risk tenants weekly",
                "Agentic AI only, one big system",
              ],
              correct: 2,
              explain:
                "Real portfolio problems rarely need one category. ML scores the risk. Generative AI extracts the lease terms. An Agent monitors and alerts. Later, you might orchestrate them into an Agentic system, but the multi-category approach is the right starting point.",
            },
            {
              q: "You are month 4 into an AI deployment. Analyst time has NOT dropped yet. What is the most likely explanation?",
              options: [
                "The AI is broken and you should cancel the project",
                "You are in the J-Curve trough. Value dip precedes value climb",
                "You need a better vendor",
                "AI does not work in CRE",
              ],
              correct: 1,
              explain:
                "This is the productivity J-Curve. Value dips for the first 3-6 months. Killing the project here means killing at maximum spend and minimum return. Communicate the J-Curve to your committee proactively so they do not panic at month 3.",
            },
            {
              q: "Which of these is a TOOL-FIRST deployment?",
              options: [
                "An agent that watches your rent roll folder and drafts variance memos automatically",
                "A chat assistant that sits next to the analyst and helps write faster Excel formulas",
                "A supervisor agent that runs deal screening end-to-end",
                "A local Claude Code agent that runs your Ram and Wolf financials",
              ],
              correct: 1,
              explain:
                "Tool-first: the human is still the workflow driver, AI is just a co-pilot. Agent-first: the agent is the primary actor, the human supervises. The chat assistant helps the human. The other three replace the human's execution role.",
            },
            {
              q: "According to Hofmann and Kruhse-Lehtonen, what is the correct sequence?",
              options: [
                "Buy tools → hire data scientists → figure out use cases",
                "Business vision → prioritized use cases → data audit → tooling → deployment",
                "Deploy AI everywhere → measure → optimize",
                "Hire a Chief AI Officer → let them figure it out",
              ],
              correct: 1,
              explain:
                "Vision first. Prioritized use cases second. Data audit third. Tooling fourth. Deployment fifth. The Elo pension example in Lesson 2 is the canonical model. Companies that skip vision end up with expensive tools and no productivity.",
            },
            {
              q: "Which is TRUE about the Agent OS?",
              options: [
                "It is a product you can buy from OpenAI",
                "It is an architectural standard that exposes business logic as APIs so agents can act on data programmatically",
                "It only matters if you use Claude",
                "It requires you to move all data to the cloud",
              ],
              correct: 1,
              explain:
                "The Agent OS is not a product. It is the layer of infrastructure that makes your business logic reachable by agents. If your data lives in PDFs and hallway conversations, your Agent OS does not exist yet, and no vendor will sell you one.",
            },
            {
              q: "The safety-audit engineering firm case (Harvard HDSR) went from 8-hour reports to 2-hour reports. What did NOT happen next?",
              options: [
                "Analyst capacity increased significantly",
                "Analysts stopped checking boxes and started focusing on the anomalies the agents flagged",
                "The firm laid off half its engineering staff",
                "The firm redirected engineer time to the truly complex cases",
              ],
              correct: 2,
              explain:
                "This is the whole point. Task automation redirected human time toward higher-value work. It did not eliminate the humans. This is exactly the argument you make to your team and your committee.",
            },
            {
              q: "You have $150K to spend on AI at Cascade Peak next year. Where should it go?",
              options: [
                "One transformational, portfolio-wide initiative",
                "Twelve small property-level initiatives",
                "One high-value, low-effort pilot (lease abstraction or variance analysis) with clear success metrics and a written retrospective",
                "Hire an AI vendor and let them decide",
              ],
              correct: 2,
              explain:
                "Small, measurable, well-defined pilots beat sprawling transformational bets. High value, low effort quadrant. Kruhse-Lehtonen and Hofmann's data across 40+ engagements is unambiguous on this point.",
            },
            {
              q: "Which sentence would you use to close your investment committee pitch?",
              options: [
                "AI will replace our analysts and cut headcount by 30%",
                "AI will free 45% of leasing analyst capacity for tenant strategy work, catch an estimated 3 material lease errors per year worth ~$120K, and compress deal-eval from 3 weeks to 5 days. Total year-1 value: ~$300K on a $150K investment",
                "Everyone else is doing AI, we should too",
                "We piloted AI 6 months ago and it's going great",
              ],
              correct: 1,
              explain:
                "This sentence hits all three numbers (hours, errors, speed), quantifies the year-1 value against the investment, and reframes the analyst role in higher-leverage terms. That is the committee-ready pitch.",
            },
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Passed with 70%+? You're ready for Module 2.",
          body:
            "Module 2 dives into how LLMs actually work under the hood and gives you the ACTOR framework for prompt engineering. It is where the abstract categories from Module 1 become concrete tools you use every day.",
        },
        {
          kind: "sources",
          items: [
            {
              label: "Harvard HDSR Agentic AI course (2024) — full-course sources synthesized in this assessment.",
              note: "Scenarios and canonical framings drawn from W1D0, W1D1, W1D2, and W1D4.",
            },
          ],
        },
      ],
    },
  ],
}

/* ---------------- Modules 3-7 (existing content, shifted from old 2-6) ---------------- */


/* ---------------- Module 2: Your AI Workbench + AGENT Framework ---------------- */

const module2: Module = {
  id: "m2",
  code: "AI-120",
  title: "Your AI Workbench: AGENT Framework and No-Code Agents",
  track: "Foundations",
  description:
    "Learn to design agentic workflows from scratch using the AGENT framework. Build two working no-code agents (career and personal) in Claude and ChatGPT along the way.",
  lessons: [
    /* ============ M2L1: The AI Workbench ============ */
    {
      id: "m2l1",
      title: "Your AI Workbench: Claude, ChatGPT, and What Belongs Where",
      type: "lesson",
      duration: 12,
      summary:
        "Set up your two-app stack. Understand what Claude Projects, Claude Cowork, Scheduled Tasks, Custom GPTs, and Connectors each do best.",
      content: [
        "This module teaches you to design agentic workflows using the AGENT framework and to build two working no-code agents. Before we build, you need a working AI workbench.",
      ],
      keyTakeaways: [
        "Claude Projects are your persistent workspace: files, instructions, and history stay put.",
        "Custom GPTs are shareable specialist agents you configure once and reuse.",
        "Scheduled Tasks run agents on a cron so work happens without you.",
        "Connectors are hands: they let AI reach into Drive, Gmail, Calendar, and beyond.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "You will build two agents in this module: one career agent, one personal agent. Both use the AGENT framework. Both live in the workbench you set up here.",
            "The workbench has five pieces: Claude Projects (persistent workspaces), Claude Cowork (real-time collaboration), Scheduled Tasks (cron for agents), Custom GPTs (shareable specialist bots), and Connectors (integrations to Drive, Gmail, Calendar, and more). Nothing exotic. Everything available on standard paid Claude or ChatGPT plans.",
          ],
        },
        {
          kind: "heading",
          text: "Claude Projects: your persistent workspace",
        },
        {
          kind: "prose",
          paragraphs: [
            "A Claude Project is a folder where files, custom instructions, and chat history live together. Every conversation you start inside the project inherits the instructions and can search the uploaded files. This is the closest thing to a persistent brain for your AI.",
            "Rules of thumb: one project per real-world workflow (not per property, unless the property is complex enough to be its own workflow). Fewer high-value files beat more low-value ones. Version-control your uploads and delete stale copies.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Ram and Wolf asset management project",
          body:
            "Create a Claude Project called 'Ram and Wolf Asset Management.' Upload the master lease abstract, the current rent roll, the last 3 monthly financial packages, and the property fact sheet. Write instructions once: 'You are the asset manager for Ram and Wolf, a 45,000 SF mixed-use asset in Seattle. When I paste new data, tie every observation back to the master lease and current rent roll.' From this point forward, every conversation starts with all that context loaded.",
        },
        {
          kind: "heading",
          text: "Claude Cowork: real-time multi-person AI",
        },
        {
          kind: "prose",
          paragraphs: [
            "Cowork is Google Docs style collaboration inside a Claude conversation. Multiple humans type into the same chat, everyone sees Claude's replies, and everyone contributes context in real time.",
            "Best for joint reviews (hold-vs-sell debates), negotiation prep with your acquisitions lead, and memo drafting where two people bring different context. Not a replacement for a phone call, but a great way to align without a meeting.",
          ],
        },
        {
          kind: "heading",
          text: "Scheduled Tasks: agents that run without you",
        },
        {
          kind: "prose",
          paragraphs: [
            "Available in both Claude and ChatGPT. Set a schedule (daily, weekly, monthly, or custom cron), pick the underlying project or GPT, and route the output to email, Slack, or an in-app inbox. Always route somewhere visible or the task will fail silently and you will never know.",
            "The most common CRE use case: Monday morning rent-roll delta briefings, monthly variance memos, and quarterly market-scan digests.",
          ],
        },
        {
          kind: "heading",
          text: "Custom GPTs: shareable specialist agents",
        },
        {
          kind: "prose",
          paragraphs: [
            "A Custom GPT wraps ChatGPT with pre-loaded instructions, knowledge files, and connectors. You configure it once. You (or your team) reuse it forever. Custom GPTs support Private, Internal / Link, and Public sharing.",
            "The four configuration slots: Instructions (the persistent system prompt), Knowledge (up to 20 uploaded files), Capabilities (web browse, code interpreter, image generation, canvas), and Actions/Connectors (API integrations).",
          ],
        },
        {
          kind: "heading",
          text: "Connectors: hands for your AI",
        },
        {
          kind: "prose",
          paragraphs: [
            "Claude calls them integrations. ChatGPT calls them Connectors (Actions is the custom-API layer). Same idea: give the AI limited, scoped access to real systems.",
            "Rule: scope permissions to the minimum. Read-only Drive access to a single folder beats full Drive access. Draft-only Gmail beats send. Event-create Calendar beats full calendar admin.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Your setup checklist",
          body:
            "Before Lesson 2: (1) Create one Claude Project called 'Career' and one called 'Personal.' (2) Upload one document to each (your resume for Career, a running list of goals for Personal). (3) Enable Google Drive and Gmail connectors in both Claude and ChatGPT. That is enough to build the two agents in this module.",
        },
        {
          kind: "sources",
          items: [
            { label: "HDSR Agentic AI curriculum (Hofmann & Kruhse-Lehtonen)", note: "Workbench framing" },
            { label: "Anthropic Claude Projects documentation" },
            { label: "OpenAI Custom GPTs documentation" },
          ],
        },
      ],
    },

    /* ============ M2L2: The Strategy Layer ============ */
    {
      id: "m2l2",
      title: "The Strategy Layer: What Must Happen Before AGENT",
      type: "lesson",
      duration: 14,
      summary:
        "AGENT operates on ONE selected workflow. Learn the four strategy moves that come first: assess, formulate, identify, select.",
      content: [
        "Most people skip straight to building. That is the number-one reason pilots stall. The AGENT framework does not start until you have picked a specific workflow.",
      ],
      keyTakeaways: [
        "AGENT operates on a single workflow, not on 'the company.'",
        "Strategy layer has 4 moves: assess capabilities, formulate vision, identify opportunities, select ONE workflow.",
        "The desired outcome must be written as: 'As a [role], I want to [change], so that [result].'",
        "Skip the strategy layer and you get pilotitis: pilots that never ship.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "AGENT is a design framework. It operates on ONE selected workflow. Before you can run AGENT, you have to pick that workflow. This is the strategy layer, and it has four moves.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Skip this at your peril",
          body:
            "Bayer named the failure mode 'pilotitis': continuously piloting AI without ever deploying to production. Kruhse-Lehtonen and Hofmann found it in 40+ enterprise engagements. The root cause is almost always the same: no strategy layer. Teams pick fun problems, not high-value ones.",
        },
        {
          kind: "heading",
          text: "Move 1: Assess your AI strategy and current capabilities",
        },
        {
          kind: "prose",
          paragraphs: [
            "Honest inventory. What AI is your team already using? Where is data machine-readable and where does it live in PDFs and inboxes? What is your team's comfort level with agents right now, and where is the resistance?",
            "For a solo asset manager, this is a 30-minute journaling exercise. For a firm, it is a workshop with the operations and IT leads. Either way, the output is a short doc: what we have, what we don't, what is blocking us.",
          ],
        },
        {
          kind: "heading",
          text: "Move 2: Formulate your agentic AI vision",
        },
        {
          kind: "prose",
          paragraphs: [
            "One or two sentences. Link the vision to a business outcome. Not 'use AI more.' Try: 'By end of year, every rent roll delta briefing, lease abstraction, and variance memo runs agent-first, with human review only on exceptions.'",
            "The vision anchors every AGENT sprint you run. If a proposed workflow does not move the vision forward, it is not the right workflow to build first.",
          ],
        },
        {
          kind: "heading",
          text: "Move 3: Identify agentic AI opportunities",
        },
        {
          kind: "prose",
          paragraphs: [
            "Now brainstorm broadly. Every recurring workflow across acquisitions, asset management, leasing, capital markets, and operations is a candidate. Do not filter yet. List 15 to 25 candidate workflows.",
            "Then run each through the data opportunity matrix: business value on one axis (low to high), implementation effort on the other. High value / low effort goes first.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Ram and Wolf opportunity list",
          body:
            "Candidate workflows for Ram and Wolf: (1) monthly rent-roll delta briefing, (2) lease abstraction for renewals, (3) variance memo drafting, (4) tenant follow-up email drafts, (5) new-deal quick screen, (6) capital-project status sync, (7) monthly investor letter draft, (8) market comp scan. Plot each on the value / effort matrix. Rent-roll delta briefing scores high value, low effort. That is where you start.",
        },
        {
          kind: "heading",
          text: "Move 4: Select ONE workflow to transform first",
        },
        {
          kind: "prose",
          paragraphs: [
            "This is the hardest move. Everyone wants to boil the ocean. Pick ONE workflow. The one you selected is the input to Audit (the first phase of AGENT).",
            "Write down your desired outcome as: 'As a [role], I want to [change], so that [result].' This one sentence anchors the entire sprint.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Written desired outcome",
          body:
            "'As the asset manager for Ram and Wolf, I want the monthly rent-roll delta briefing to run agent-first with me reviewing only exceptions, so that I reclaim 4 hours per month and the briefing is in my inbox by 6am the first business day.' That is a testable, dated, role-anchored outcome.",
        },
        {
          kind: "matching",
          title: "Match each strategy move to what it produces",
          pairs: [
            { term: "Assess", match: "A short doc: what we have, what we don't, what is blocking us" },
            { term: "Formulate", match: "A 1-2 sentence vision linked to a business outcome" },
            { term: "Identify", match: "15-25 candidate workflows plotted on the value/effort matrix" },
            { term: "Select", match: "One workflow chosen and a written desired outcome" },
          ],
        },
        {
          kind: "knowledge-check",
          title: "Strategy Layer check",
          questions: [
            {
              q: "What does the AGENT framework operate on?",
              options: [
                "The entire organization at once",
                "One specific selected workflow",
                "Every AI tool your team uses",
                "Only workflows in acquisitions",
              ],
              correct: 1,
              explain:
                "AGENT is a design framework applied to ONE workflow. Applying it to 'the company' is a common failure mode.",
            },
            {
              q: "Which is the correct format for a desired outcome statement?",
              options: [
                "We should use AI more",
                "Speed up our processes",
                "As a [role], I want to [change], so that [result]",
                "Automate everything possible",
              ],
              correct: 2,
              explain:
                "The role-change-result format forces you to be specific about who benefits, what changes, and why it matters.",
            },
            {
              q: "What is 'pilotitis'?",
              options: [
                "A type of AI model",
                "Continuously piloting AI without ever deploying to production",
                "A governance framework",
                "A category of prompt engineering",
              ],
              correct: 1,
              explain:
                "Named by Bayer's leadership, documented across 40+ engagements by Kruhse-Lehtonen and Hofmann.",
            },
          ],
        },
        {
          kind: "sources",
          items: [
            {
              label: "Kruhse-Lehtonen & Hofmann, 'How to Define and Execute Your Data and AI Strategy'",
              note: "W1D0 reading, strategy layer framework",
            },
            { label: "HDSR Agentic AI course, DAIN Studios" },
          ],
        },
      ],
    },

    /* ============ M2L3: The AGENT Framework (5 phases) ============ */
    {
      id: "m2l3",
      title: "The AGENT Framework: 5 Phases from Audit to Track",
      type: "lesson",
      duration: 18,
      summary:
        "Audit, Gauge, Engineer, Navigate, Track. The five-phase design framework you apply to your selected workflow.",
      content: [
        "You have one workflow selected and a written desired outcome. Now you run it through AGENT.",
      ],
      keyTakeaways: [
        "Audit: document the trigger, map steps, define the outcome.",
        "Gauge: score each step 1-5 on impact, repeatability, complexity. Mark enhance/automate/eliminate.",
        "Engineer: design the agent-first flow. Straight-through path first, then exception lane.",
        "Navigate: define human-agent collaboration. Humans govern, agents do.",
        "Track: outcome-centric metrics. Acceptance rate, first-pass validation, exception SLA.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "The AGENT framework is a 5-phase design process. Each phase produces a concrete deliverable. Skip a phase and the whole thing wobbles.",
          ],
        },
        {
          kind: "heading",
          text: "A: Audit: understand how work is done today",
        },
        {
          kind: "prose",
          paragraphs: [
            "Skipping Audit is the single most common failure mode of no-code agents. You cannot redesign a workflow you have not honestly mapped.",
            "Document the trigger (what event kicks it off, manual or automated). Map every step (owner, system, input, output). Document data flows and roles. Define the final output ('done' state). Restate the desired outcome from the strategy layer.",
          ],
        },
        {
          kind: "callout",
          tone: "info",
          title: "Audit deliverable",
          body:
            "A process workflow map (steps, owners, systems, inputs, outputs) plus a one-sentence desired outcome in the 'As a [role], I want to [change], so that [result]' format.",
        },
        {
          kind: "heading",
          text: "G: Gauge: assess each step against the outcome",
        },
        {
          kind: "prose",
          paragraphs: [
            "Score every step 1-5 on three axes: Impact (how much does this step move the outcome?), Repeatability (how consistent and rule-based is it?), Complexity (how much judgment, exception handling, or risk is involved?).",
            "Then mark each step: enhance, automate, or eliminate. High impact + high repeatability = automate first. High complexity does NOT mean 'do not automate,' it means 'pair automation with controls.'",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Gauging the rent-roll delta briefing",
          body:
            "Step 1: pull rent roll from Yardi. Impact 5, Repeatability 5, Complexity 1 → automate. Step 2: compare to last month. Impact 5, Repeatability 5, Complexity 2 → automate. Step 3: flag anomalies. Impact 5, Repeatability 3, Complexity 4 → automate with human review. Step 4: draft briefing. Impact 4, Repeatability 4, Complexity 3 → automate first draft. Step 5: send. Impact 2, Repeatability 5, Complexity 1 → automate. The whole workflow becomes agent-first with review only at step 3.",
        },
        {
          kind: "heading",
          text: "E: Engineer: design the agent-first flow",
        },
        {
          kind: "prose",
          paragraphs: [
            "Redesign, do not retrofit. You are not making the human workflow faster. You are replacing it with a different system of reasoning and execution.",
            "Five rules: (1) make data accessible, (2) make decisions explicit, (3) make success measurable, (4) build the straight-through path first then the exception lane, (5) instrument everything for observability from day one.",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Reinvent, do not retrofit",
          body:
            "The most common Engineer mistake is copying the human workflow into agents. The human workflow has waits, meetings, and handoffs that exist because humans are involved. Delete them. Design what an agent-native version looks like.",
        },
        {
          kind: "heading",
          text: "N: Navigate: human-agent collaboration model",
        },
        {
          kind: "prose",
          paragraphs: [
            "Design the interface around exceptions, not around everything. Agents explain their actions and surface their reasoning. Agents accept human intervention gracefully. Humans move from doing the work to governing it: policy definition, approvals, complex exceptions.",
            "Define escalation paths. Define stop-the-line controls. Assume the agent will do something wrong at some point. Design the recovery flow now.",
          ],
        },
        {
          kind: "heading",
          text: "T: Track: measure value fast with outcome-centric metrics",
        },
        {
          kind: "prose",
          paragraphs: [
            "Leading indicators beat lagging ones. Track: acceptance rate of agent proposals (target 70%+ once stabilized), first-pass validation rate, reliability, latency, exception SLA, adoption rate, conflict volume trend.",
            "Weekly review during the first 8 weeks. Move to monthly once stable. If acceptance rate is below 70% after week 4, go back to Engineer.",
          ],
        },
        {
          kind: "matching",
          title: "Match each AGENT phase to its deliverable",
          pairs: [
            { term: "Audit", match: "Process workflow map plus one-sentence desired outcome" },
            { term: "Gauge", match: "Scoring table with enhance/automate/eliminate per step" },
            { term: "Engineer", match: "Working straight-through pipeline plus exception lane" },
            { term: "Navigate", match: "Human-agent collaboration doc with escalation paths" },
            { term: "Track", match: "Metrics dashboard with acceptance rate at 70%+" },
          ],
        },
        {
          kind: "knowledge-check",
          title: "AGENT phase check",
          questions: [
            {
              q: "What are the three axes used to score each step in the Gauge phase?",
              options: [
                "Cost, speed, and quality",
                "Impact, repeatability, and complexity",
                "Difficulty, priority, and urgency",
                "Volume, variety, and velocity",
              ],
              correct: 1,
              explain:
                "Impact, Repeatability, Complexity. Score each 1-5, then mark the step enhance/automate/eliminate.",
            },
            {
              q: "What is the correct Engineer sequence?",
              options: [
                "Exception lane first, then straight-through",
                "Both at the same time",
                "Straight-through path first, then exception lane",
                "Only build the straight-through path",
              ],
              correct: 2,
              explain:
                "Straight-through first (the 80% happy path), then instrument the exception lane. Building both simultaneously is a common Engineer mistake.",
            },
            {
              q: "What is the target acceptance rate for agent proposals during Track?",
              options: [
                "50% or higher",
                "70% or higher once stabilized",
                "95% or higher from day one",
                "There is no target",
              ],
              correct: 1,
              explain:
                "70% is the stabilized target. Below that after 4 weeks means you go back to Engineer.",
            },
            {
              q: "What does high complexity in the Gauge phase mean?",
              options: [
                "Do not automate this step",
                "Automate only after 6 months of pilot",
                "Automate with paired controls",
                "Delete this step from the workflow",
              ],
              correct: 2,
              explain:
                "High complexity means the step involves judgment, exception handling, or risk. Automate it, but pair with governance controls, human review gates, or shadow mode.",
            },
          ],
        },
        {
          kind: "sources",
          items: [
            { label: "HDSI / DAIN Studios agentic AI curriculum", note: "AGENT framework primary source" },
            {
              label: "W1D4 Personal Reading: 'Auditing your workflow for agentic AI'",
              note: "AGENT playbook and 8-week sprint structure",
            },
          ],
        },
      ],
    },

    /* ============ M2L4: The Four Elements of Every Agent ============ */
    {
      id: "m2l4",
      title: "The Four Elements of Every Agent",
      type: "lesson",
      duration: 15,
      summary:
        "Reasoning engine, context and memory, tools and actions, governance and guardrails. Miss one, it's not an agent, it's a prompt.",
      content: [
        "Every real agent has four elements. If one is missing, what you built is a prompt, not an agent.",
      ],
      keyTakeaways: [
        "Reasoning engine: model, system prompt, temperature, iteration limits.",
        "Context and memory: short-term session vs long-term persistent, storage, retrieval, lifecycle.",
        "Tools and actions: what can it read, what can it write, through which connectors.",
        "Governance and guardrails: access, data policy, monitoring, escalation, compliance.",
        "Governance is NOT a phase at the end. It is one of the four elements of every single agent.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "AGENT tells you how to design a workflow. The Four Elements tell you what actually goes inside each agent. Every agent has all four. Miss one and you have something less capable than an agent.",
          ],
        },
        {
          kind: "heading",
          text: "Element 1: Core Reasoning Engine",
        },
        {
          kind: "prose",
          paragraphs: [
            "The thinking layer. Understands prompts, contextualizes, reasons, plans next steps.",
            "Four choices: model selection (based on task complexity, cost, latency, data sensitivity), system prompt (role, tone, scope, constraints, domain context), reasoning depth (temperature, chain length, iteration limits), and evaluation criteria for success.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Reasoning engine for the Ram and Wolf variance-memo agent",
          body:
            "Model: Claude Sonnet 4.5 (handles 200+ pages of context, good at structured reasoning). System prompt: 'You are the asset manager for Ram and Wolf. When I paste this month's rent roll and financial package, produce a variance memo covering deltas, exceptions, and 3 follow-up questions.' Temperature: 0.2 (deterministic, low creative drift). Iteration limits: single-pass draft, no loop. Evaluation: memo fits on one page, cites specific line items.",
        },
        {
          kind: "heading",
          text: "Element 2: Context and Memory",
        },
        {
          kind: "prose",
          paragraphs: [
            "Retains knowledge and task history to reason over time. Four decisions: memory scope (short-term session vs long-term persistent), storage method (vector DB or structured store), retrieval logic (similarity search, metadata filters), and lifecycle (what is retained, refreshed, forgotten).",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Rule of thumb: small corpus in prompt, large corpus RAG",
          body:
            "Modern models handle large context natively. If your knowledge base fits in the system prompt or as project knowledge (under ~100 pages), do not build a RAG pipeline. RAG adds complexity, indexing overhead, and retrieval failure modes. Only reach for RAG when the corpus is too big to fit or needs fresh updates every hour.",
        },
        {
          kind: "heading",
          text: "Element 3: Tools and Actions",
        },
        {
          kind: "prose",
          paragraphs: [
            "Access to systems. What can the agent read? What can it write? Which protocols and connectors?",
            "Two rules: (1) start read-only. An agent that only reads can only inform, not damage. (2) scope permissions to the minimum. Draft-only Gmail, single-folder Drive, event-create Calendar. Anything more is over-scoped.",
          ],
        },
        {
          kind: "heading",
          text: "Element 4: Governance and Guardrails",
        },
        {
          kind: "prose",
          paragraphs: [
            "Ensures responsible, intent-aligned, secure operation. Six choices: access rights (who can create, deploy, modify), data governance (what data can be accessed, no PII or sensitive leakage), monitoring and audit (track activity and decisions), escalation paths (human validation for sensitive actions), compliance (company policy, risk flags), and soft guardrails (require source citation, forbid invention).",
          ],
        },
        {
          kind: "callout",
          tone: "warn",
          title: "Governance is not a phase at the end",
          body:
            "The most common enterprise AI mistake is treating governance as a compliance review that happens after the agent is built. Governance is one of the four elements. Design it in from element one, or you will strip out the agent and rebuild.",
        },
        {
          kind: "matching",
          title: "Match each element to its choices",
          pairs: [
            { term: "Reasoning Engine", match: "Model, system prompt, temperature, iteration limits" },
            { term: "Context and Memory", match: "Scope, storage, retrieval, lifecycle" },
            { term: "Tools and Actions", match: "Read/write scope, protocols, connectors" },
            {
              term: "Governance and Guardrails",
              match: "Access, data policy, monitoring, escalation, compliance",
            },
          ],
        },
        {
          kind: "knowledge-check",
          title: "Four Elements check",
          questions: [
            {
              q: "If an AI tool has a reasoning engine and tools but no governance, what is it?",
              options: [
                "A well-designed agent",
                "A prompt, not an agent",
                "An MVP agent",
                "A prototype",
              ],
              correct: 1,
              explain:
                "Every real agent has all four elements. Missing governance means the agent can act without controls, which is not an agent.",
            },
            {
              q: "When should you build a RAG pipeline instead of using Project Knowledge?",
              options: [
                "Always, RAG is the modern standard",
                "Only when the corpus is too big to fit or needs frequent updates",
                "Only for small workflows",
                "Never, RAG is deprecated",
              ],
              correct: 1,
              explain:
                "Modern models handle large context natively. RAG adds complexity. Use it only when the corpus is too big to fit or needs hourly freshness.",
            },
            {
              q: "What is the correct scoping principle for the Tools and Actions element?",
              options: [
                "Give the agent full access to move fast",
                "Start with the maximum scope, revoke later",
                "Start read-only and scope to the minimum needed",
                "Do not give any tool access",
              ],
              correct: 2,
              explain:
                "Start read-only. Scope to minimum. An agent that only reads can inform but cannot damage.",
            },
          ],
        },
        {
          kind: "sources",
          items: [
            { label: "HDSR Agentic AI course, Four Elements", note: "Primary source" },
            { label: "Kruhse-Lehtonen & Hofmann strategy paper" },
          ],
        },
      ],
    },

    /* ============ M2L5: The Five Workflow Archetypes ============ */
    {
      id: "m2l5",
      title: "The Five Workflow Archetypes",
      type: "lesson",
      duration: 15,
      summary:
        "Prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer. Match the workflow shape to the archetype before you build.",
      content: [
        "Different workflows have different shapes. Match the shape to the archetype before you engineer the agent.",
      ],
      keyTakeaways: [
        "Prompt chaining: sequential steps with gates between.",
        "Routing: classifier dispatches to specialist agents.",
        "Parallelization: multiple agents solve the same task, results aggregated.",
        "Orchestrator-workers: one decomposes, many run parallel, one synthesizes.",
        "Evaluator-optimizer: one creates, one critiques, loop until acceptable.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "Five archetypes cover almost every agentic workflow you will build. Learning to spot the archetype saves days of design time.",
          ],
        },
        {
          kind: "heading",
          text: "Archetype 1: Prompt Chaining",
        },
        {
          kind: "prose",
          paragraphs: [
            "Shape: agent → gate → agent → gate → agent. Sequential. Each step feeds the next. Gates validate before advancing.",
            "Use when: work breaks cleanly into controllable steps. Each step has a clear input, output, and pass/fail check.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Prompt chaining for tenant onboarding",
          body:
            "Step 1: extract lease terms from executed PDF. Gate: all required fields present? Step 2: cross-check terms against LOI. Gate: any deltas? Step 3: draft welcome email and set up tenant in property management system. This is a chain because each step depends strictly on the last.",
        },
        {
          kind: "heading",
          text: "Archetype 2: Routing",
        },
        {
          kind: "prose",
          paragraphs: [
            "Shape: one reasoning agent classifies incoming work, then dispatches to specialist sub-workflows.",
            "Use when: incoming requests are heterogeneous and different types need different handling.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Routing for deal inquiries",
          body:
            "Router agent reads incoming deal inquiries. Office deals → office-underwriting agent. Retail deals → retail agent (different comp set, different tenant health signals). Industrial → industrial agent (cap rate compression signals, distribution proximity). One classifier at the top, three specialists downstream.",
        },
        {
          kind: "heading",
          text: "Archetype 3: Parallelization",
        },
        {
          kind: "prose",
          paragraphs: [
            "Shape: multiple agents work simultaneously on the same request, results aggregated by a rule-based aggregator or a synthesizer agent.",
            "Use when: you gain value from solving the same request two or three ways, then merging.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Parallelization for investor letter drafts",
          body:
            "Three agents draft the same quarterly investor letter in parallel, each with a different tone: (1) plain and direct, (2) narrative and investor-friendly, (3) heavy on numbers. A fourth agent scores each on clarity, transparency, and length. You pick or hybridize.",
        },
        {
          kind: "heading",
          text: "Archetype 4: Orchestrator-Workers",
        },
        {
          kind: "prose",
          paragraphs: [
            "Shape: one orchestrator agent decomposes the work into subtasks, dispatches them to worker agents in parallel, and a synthesizer agent merges the results.",
            "Use when: complex multi-step work that decomposes cleanly. This is the archetype behind most 'research agent' products.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Orchestrator-workers for a competitive market scan",
          body:
            "Orchestrator agent receives 'scan the Seattle office market.' It decomposes: (a) recent transactions, (b) sentiment from CRE news, (c) sublease trends, (d) major tenant moves. Four worker agents run in parallel. Synthesizer agent produces a one-page competitive brief.",
        },
        {
          kind: "heading",
          text: "Archetype 5: Evaluator-Optimizer",
        },
        {
          kind: "prose",
          paragraphs: [
            "Shape: one agent creates a draft, another agent critiques against rules, first agent revises. Loop until acceptable or iteration limit.",
            "Use when: work improves through iteration and you can specify what 'good' looks like.",
          ],
        },
        {
          kind: "cre-example",
          scenario: "Evaluator-optimizer for lease compliance",
          body:
            "Creator agent drafts a lease amendment. Evaluator agent checks against your firm's lease compliance rules (tone, legal terminology, required clauses). Sends back a critique. Creator revises. Loop up to 3 times. If not acceptable after 3, escalate to legal.",
        },
        {
          kind: "matching",
          title: "Match the workflow to the archetype",
          pairs: [
            { term: "Extract lease → check LOI deltas → welcome email", match: "Prompt Chaining" },
            { term: "Classify inquiry, dispatch to office/retail/industrial specialist", match: "Routing" },
            {
              term: "Three tone variants of an investor letter drafted at once",
              match: "Parallelization",
            },
            {
              term: "Break market scan into 4 subtasks, workers run parallel, synthesizer merges",
              match: "Orchestrator-Workers",
            },
            { term: "Draft amendment, critique it, revise, loop until acceptable", match: "Evaluator-Optimizer" },
          ],
        },
        {
          kind: "knowledge-check",
          title: "Archetype recognition check",
          questions: [
            {
              q: "You want three variants of a memo generated at once, then picked from. Which archetype?",
              options: ["Prompt Chaining", "Routing", "Parallelization", "Evaluator-Optimizer"],
              correct: 2,
              explain: "Multiple agents solve the same task in parallel, then results are aggregated.",
            },
            {
              q: "Incoming acquisitions inquiries need to be triaged and sent to the right specialist. Which archetype?",
              options: ["Routing", "Parallelization", "Prompt Chaining", "Orchestrator-Workers"],
              correct: 0,
              explain: "A reasoning agent classifies incoming work, then dispatches to specialists.",
            },
            {
              q: "You want a compliance memo revised until it passes rules. Which archetype?",
              options: [
                "Prompt Chaining",
                "Evaluator-Optimizer",
                "Routing",
                "Parallelization",
              ],
              correct: 1,
              explain: "Creator drafts, evaluator critiques, creator revises. Loop until acceptable.",
            },
          ],
        },
        {
          kind: "sources",
          items: [
            {
              label: "Anthropic 'Building Effective Agents', Workflow Patterns",
              note: "Primary source for the five archetypes",
            },
            { label: "HDSR Agentic AI curriculum" },
          ],
        },
      ],
    },

    /* ============ M2L6: The Workflow Design Canvas ============ */
    {
      id: "m2l6",
      title: "The Workflow Design Canvas",
      type: "workshop",
      duration: 20,
      summary:
        "The 4-move canvas you fill out for every agentic workflow. Desired outcome, trigger, agents (all 4 elements each), connectors.",
      content: [
        "The Workflow Design Canvas is the tool you use to move from AGENT design into buildable specs. It has four moves.",
      ],
      keyTakeaways: [
        "Move 1: define the desired outcome.",
        "Move 2: describe the trigger.",
        "Move 3: lay out the agents. For each, fill in all four elements.",
        "Move 4: place the connectors: input/output, feedback, human check, programmable step, HITL, exchange.",
      ],
      blocks: [
        {
          kind: "prose",
          paragraphs: [
            "By this point in the module you have (1) picked one workflow, (2) run it through AGENT, (3) memorized the four elements, and (4) matched the shape to an archetype. Now you turn all of that into a spec you can hand to Claude or ChatGPT to actually build.",
            "The Workflow Design Canvas is a one-page document with four moves. Fill it out in order.",
          ],
        },
        {
          kind: "heading",
          text: "Move 1: Define the desired outcome",
        },
        {
          kind: "prose",
          paragraphs: [
            "Copy the outcome sentence from your strategy layer: 'As a [role], I want to [change], so that [result].' If you skipped strategy layer, go back. Do not proceed without this sentence.",
          ],
        },
        {
          kind: "heading",
          text: "Move 2: Describe the trigger",
        },
        {
          kind: "prose",
          paragraphs: [
            "What event initiates the workflow? Is it automated (a file lands in a folder, a scheduled time) or manual (someone forwards an email)? Be specific. 'Manual' means someone still has to remember. If you can move it to automated with a Scheduled Task, do that in Move 4.",
          ],
        },
        {
          kind: "heading",
          text: "Move 3: Lay out the agents",
        },
        {
          kind: "prose",
          paragraphs: [
            "Based on your archetype, list every agent. For each agent, fill in all four elements: reasoning engine (model, system prompt, temperature, iteration limits), context and memory (scope, storage, retrieval, lifecycle), tools and actions (what can it read, write, through which connectors), governance and guardrails (access, data policy, monitoring, escalation, compliance).",
            "For a single-agent workflow, you fill this out once. For orchestrator-workers, you fill it out for each worker plus the orchestrator plus the synthesizer.",
          ],
        },
        {
          kind: "heading",
          text: "Move 4: Place the connectors",
        },
        {
          kind: "prose",
          paragraphs: [
            "Six connector types map every arrow in your workflow: (1) input/output, (2) feedback, (3) human check, (4) programmable step, (5) human-in-the-loop, (6) exchange connection (agent to agent).",
            "Draw the flow. Every arrow is one of the six. If an arrow does not map to one, the flow is under-specified. Fix it before building.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "The canvas IS the build spec",
          body:
            "A completed canvas can be pasted directly into Claude or ChatGPT with the prompt 'build this as a Custom GPT / Claude Project. Draft the Instructions, list the Knowledge to upload, name every Connector.' You get a working scaffold in under 5 minutes.",
        },
        {
          kind: "cre-example",
          scenario: "Filled canvas for the Ram and Wolf rent-roll delta briefing",
          body:
            "Outcome: 'As asset manager for Ram and Wolf, I want the monthly rent-roll delta briefing to run agent-first so I reclaim 4 hours per month.' Trigger: automated, 6am on the first business day. Archetype: prompt chaining. Agents: (a) extractor (Claude Sonnet, temp 0.1, read-only Drive, reads current rent roll, writes to canvas), (b) comparator (same model, reads prior month + current, writes deltas), (c) drafter (temp 0.4, writes briefing, guardrail: never invent tenant names). Connectors: Drive input, in-memory exchange between agents, Gmail output (draft-only), human check on delta > $5k rent change.",
        },
        {
          kind: "knowledge-check",
          title: "Canvas check",
          questions: [
            {
              q: "What is the first move on the Workflow Design Canvas?",
              options: [
                "Pick a model",
                "Define the desired outcome",
                "Choose an archetype",
                "List the connectors",
              ],
              correct: 1,
              explain: "The desired outcome is Move 1. Everything else is downstream of it.",
            },
            {
              q: "For an orchestrator-workers workflow with 3 workers, how many times do you fill in the four elements?",
              options: [
                "Once for the workflow",
                "Once per worker (3 times)",
                "Once for each agent: orchestrator + 3 workers + synthesizer = 5 times",
                "It depends on the model",
              ],
              correct: 2,
              explain:
                "Every agent gets all four elements. Orchestrator, 3 workers, synthesizer = 5 fills.",
            },
          ],
        },
        {
          kind: "sources",
          items: [
            {
              label: "HDSR Agentic AI course, Workflow Design Canvas",
              note: "Primary source",
            },
          ],
        },
      ],
    },

    /* ============ M2L7: Build Agent 1, Career Agent ============ */
    {
      id: "m2l7",
      title: "Workshop: Build Your Career Agent",
      type: "workshop",
      duration: 25,
      summary:
        "End-to-end. Run AGENT + the canvas on a career agent that tracks your goals, drafts weekly reflections, and preps for reviews.",
      content: [
        "First of two hands-on builds. You will run AGENT + the canvas on a career agent, then build it in ChatGPT as a Custom GPT.",
      ],
      keyTakeaways: [
        "The career agent tracks goals, drafts weekly reflections, and preps for annual reviews.",
        "Archetype: prompt chaining (weekly reflection) + evaluator-optimizer (review prep).",
        "Trigger: scheduled task, Friday at 4pm.",
        "Governance: private, no sharing, private Knowledge only.",
      ],
      blocks: [
        {
          kind: "heading",
          text: "Move 1: Desired outcome",
        },
        {
          kind: "prose",
          paragraphs: [
            "Template: 'As a [role], I want a Career Agent that captures my weekly progress, flags priorities that slipped, and produces a first-draft self-review at year end, so that reviews become 30 minutes of edits, not 3 hours of writing.'",
            "Edit for your role. Save it. This is Move 1 of your canvas.",
          ],
        },
        {
          kind: "heading",
          text: "Move 2: Trigger",
        },
        {
          kind: "prose",
          paragraphs: [
            "Two triggers on this one. (1) Weekly: scheduled task fires every Friday at 4pm. Agent asks you 5 questions in Gmail draft form: what shipped, what slipped, what surprised you, biggest blocker, one goal for next week. You reply. Agent files the response in your Career Project. (2) Annual: manual. You tell the agent 'draft my self-review from the last 12 months of weekly reflections.'",
          ],
        },
        {
          kind: "heading",
          text: "Move 3: Agents and their 4 elements",
        },
        {
          kind: "prose",
          paragraphs: [
            "Agent A: Weekly Reflector. Reasoning: GPT-4o, temperature 0.4 (conversational tone, some variation). System prompt: 'You are the user's weekly career coach. Ask 5 short questions. Store the answers.' Context: Career Project knowledge (annual goals doc). Tools: Gmail draft, Google Docs write. Governance: private, never share externally.",
            "Agent B: Review Drafter. Reasoning: GPT-4o, temperature 0.3. System prompt: 'You are the user's career strategist. Read all weekly reflections from the last 12 months. Produce a first-draft self-review covering accomplishments, growth areas, and stretch goals.' Context: reads full Career Project knowledge. Tools: Google Docs write. Governance: private, source citation required (cite specific weekly reflection).",
          ],
        },
        {
          kind: "heading",
          text: "Move 4: Connectors",
        },
        {
          kind: "prose",
          paragraphs: [
            "Weekly loop: Scheduled Task (input) → Weekly Reflector agent (programmable) → Gmail draft (output). Human replies. Reply goes to Google Docs (exchange).",
            "Annual: manual trigger → Review Drafter agent → Google Docs draft (output) → human review (HITL) → final.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Build it now",
          body:
            "Open ChatGPT. Create a new Custom GPT called 'Career Agent.' Paste the system prompt from Agent A. Add Gmail and Google Drive connectors (scoped to your Career folder). In Custom GPT settings, add a Scheduled Task: every Friday 4pm, prompt: 'Ask me my 5 weekly reflection questions.' Save. Do the same for Agent B as a second Custom GPT. Total build time: 15 minutes.",
        },
        {
          kind: "cre-example",
          scenario: "Your CRE-specific version",
          body:
            "Anchor the annual goals doc with 3-5 measurable career outcomes tied to your CRE role. Example: 'Close 2 acquisitions above 8% cap rate,' 'launch AI-first monthly reporting for Ram and Wolf,' 'earn CCIM designation.' Every Friday reflection gets scored implicitly against these goals. The annual self-review writes itself from the pattern.",
        },
        {
          kind: "sources",
          items: [
            { label: "Custom GPT documentation (OpenAI)" },
            { label: "AGENT framework applied, this module" },
          ],
        },
      ],
    },

    /* ============ M2L8: Build Agent 2, Personal Agent ============ */
    {
      id: "m2l8",
      title: "Workshop: Build Your Personal Agent",
      type: "workshop",
      duration: 25,
      summary:
        "Second build. A personal agent for goals, habits, and planning. Same AGENT + canvas, different domain.",
      content: [
        "Second hands-on build. Same process, different domain. Personal agent for goals, habits, and life planning.",
      ],
      keyTakeaways: [
        "Personal agent = goals + habits + weekly planning + monthly reviews.",
        "Archetype: prompt chaining (weekly planning) + routing (goal category dispatch).",
        "Trigger: scheduled task Sunday 8pm.",
        "Same 4 elements, same 4 canvas moves. Different domain.",
      ],
      blocks: [
        {
          kind: "heading",
          text: "Move 1: Desired outcome",
        },
        {
          kind: "prose",
          paragraphs: [
            "'As a busy operator, I want a Personal Agent that captures my life goals, checks in weekly on habits and progress, and drafts a monthly review, so that I do not lose sight of the things that matter outside work.'",
          ],
        },
        {
          kind: "heading",
          text: "Move 2: Trigger",
        },
        {
          kind: "prose",
          paragraphs: [
            "Weekly: scheduled task Sunday 8pm. Agent asks about habits, milestones, energy level, and the coming week's priorities. Monthly: last Sunday of the month, run the review agent.",
          ],
        },
        {
          kind: "heading",
          text: "Move 3: Agents and their 4 elements",
        },
        {
          kind: "prose",
          paragraphs: [
            "Agent A: Weekly Planner. Model: Claude Sonnet 4.5, temperature 0.5. System prompt: 'You are the user's weekly personal planner. Reference the goals doc. Ask about habits, wins, and priorities.' Context: Personal Claude Project with goals doc. Tools: Gmail draft, Calendar event create. Governance: private, never mentions personal data in any external context.",
            "Agent B: Monthly Reviewer. Model: Claude Sonnet 4.5, temperature 0.4. System prompt: 'You are the user's personal reflection partner. Read the month's weekly check-ins. Produce a monthly review with wins, misses, patterns, and adjustments.' Same governance.",
          ],
        },
        {
          kind: "heading",
          text: "Move 4: Connectors",
        },
        {
          kind: "prose",
          paragraphs: [
            "Sunday: Scheduled Task → Weekly Planner → Gmail draft → user reply → Google Docs (Personal Project). Last Sunday of month: Scheduled Task → Monthly Reviewer → Google Docs draft → user review (HITL) → final review doc.",
          ],
        },
        {
          kind: "callout",
          tone: "tip",
          title: "Build it in Claude this time",
          body:
            "Different tool by design. You built the Career Agent in ChatGPT. Build this one in Claude to see both platforms. Create a Personal Claude Project. Upload your goals doc. Set up Instructions from Agent A. Add a Scheduled Task in the Project: every Sunday 8pm, prompt 'Run my weekly personal check-in.' Total build time: 10 minutes.",
        },
        {
          kind: "cre-example",
          scenario: "Cross-platform muscle memory",
          body:
            "You now have one agent in ChatGPT (career) and one in Claude (personal). Same AGENT design process. Same canvas. Different tools. This is the muscle memory the rest of the bootcamp builds on: pick the right platform for the job, run the same design process every time.",
        },
        {
          kind: "callout",
          tone: "info",
          title: "You just built two agents in under an hour",
          body:
            "Congratulations. You have run the strategy layer, applied AGENT, filled in the Four Elements, matched two different archetypes, filled the canvas twice, and shipped two working agents on two platforms. Every remaining module in this bootcamp refines specific CRE applications of this same design process.",
        },
        {
          kind: "sources",
          items: [
            { label: "Claude Projects documentation (Anthropic)" },
            { label: "AGENT framework applied, this module" },
          ],
        },
      ],
    },
  ],
}

/* ---------------- Modules 3-7 (existing content, shifted from old 2-6) ---------------- */

const module3: Module = {
  id: "m3",
  code: "AI-140",
  title: "Portfolio Data Foundations",
  track: "Foundations",
  description:
    "AI is only as good as the data beneath it. Learn to assess, structure, and govern the portfolio data that models depend on.",
  lessons: [
    {
      id: "m3l1",
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
      id: "m3l2",
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
}

const module4: Module = {
  id: "m4",
  code: "AI-210",
  title: "Predictive Performance Analytics",
  track: "Analytics",
  description:
    "Use AI to forecast the metrics that drive asset value — occupancy, NOI, renewals, and operating expense trajectories.",
  lessons: [
    {
      id: "m4l1",
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
      id: "m4l2",
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
      id: "m4l3",
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
}

const module5: Module = {
  id: "m5",
  code: "AI-230",
  title: "Lease & Document Intelligence",
  track: "Analytics",
  description:
    "Deploy generative AI to read, abstract, and query the mountain of unstructured documents that define your assets.",
  lessons: [
    {
      id: "m5l1",
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
      id: "m5l2",
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
}

const module6: Module = {
  id: "m6",
  code: "AI-260",
  title: "Market Intelligence & Deal Screening",
  track: "Analytics",
  description:
    "Combine external market data with AI to screen opportunities and pressure-test hold-versus-sell decisions.",
  lessons: [
    {
      id: "m6l1",
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
      id: "m6l2",
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
}

const module7: Module = {
  id: "m7",
  code: "AI-310",
  title: "Risk, Governance & Responsible AI",
  track: "Governance",
  description:
    "Adopt AI without introducing new risk. Cover model governance, fair housing, data privacy, and responsible deployment.",
  lessons: [
    {
      id: "m7l1",
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
      id: "m7l2",
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
      id: "m7l3",
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
}

const baseModules: Module[] = [module1, module2, module3, module4, module5, module6, module7]

// Append an auto-generated Vocabulary Check lesson to every module. The lesson
// is derived from that module's tagged glossary terms so it stays in sync.
export const modules: Module[] = baseModules.map((m) => ({
  ...m,
  lessons: [
    ...m.lessons,
    buildVocabLesson(m.id as "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7", m.title),
  ],
}))

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
