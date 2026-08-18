export interface AgentLabLesson {
  id: string
  order: number
  title: string
  subtitle: string
  duration: number
  goal: string
}

export const agentLabModule = {
  code: "AGENT-LAB",
  title: "Build Your Financial Agent",
  subtitle: "Hands-on Workshop",
  description:
    "Turn AJ's laptop into a working financial-analyst agent. Install VS Code and Claude Code, then build a local agent that reads real Meridian Tower documents and produces variance analysis, NOI reconciliation, and deal underwriting summaries. Nothing ever gets uploaded to a website. Files stay on your Mac.",
}

export const agentLabLessons: AgentLabLesson[] = [
  {
    id: "al1",
    order: 1,
    title: "Setup Check",
    subtitle: "What you need before you build",
    duration: 5,
    goal: "Confirm VS Code, Node.js, and a terminal are ready on your Mac.",
  },
  {
    id: "al2",
    order: 2,
    title: "Install Claude Code",
    subtitle: "Get the CLI running inside VS Code",
    duration: 10,
    goal: "Install Claude Code, log in with your Anthropic account, and run your first prompt.",
  },
  {
    id: "al3",
    order: 3,
    title: "The Working Folder",
    subtitle: "Give the agent something to read",
    duration: 8,
    goal: "Download the Meridian Tower sample documents and set up your working folder with the agent's system instructions.",
  },
  {
    id: "al4",
    order: 4,
    title: "Rent Roll Variance Agent",
    subtitle: "Your first real analysis",
    duration: 15,
    goal: "Run a month-over-month variance analysis on the Meridian Tower rent roll.",
  },
  {
    id: "al5",
    order: 5,
    title: "T12 NOI Reconciliation Agent",
    subtitle: "Categorize, calculate, flag anomalies",
    duration: 15,
    goal: "Reconcile the trailing 12-month P&L against underwriting and produce an NOI bridge.",
  },
  {
    id: "al6",
    order: 6,
    title: "Deal Underwriting Agent",
    subtitle: "Read the OM, write the brief",
    duration: 15,
    goal: "Turn the Meridian Tower offering memo into a one-page underwriting summary with cap rate math and diligence questions.",
  },
  {
    id: "al7",
    order: 7,
    title: "Capstone: The Full Deal Packet",
    subtitle: "One agent, three documents, one deliverable",
    duration: 20,
    goal: "Combine all three workflows into a single command that produces a full Meridian Tower deal review.",
  },
]

export function findAgentLabLesson(id: string): AgentLabLesson | undefined {
  return agentLabLessons.find((l) => l.id === id)
}
