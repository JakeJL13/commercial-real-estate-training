export interface GlossaryTerm {
  id: string
  term: string
  category:
    | "Core Concepts"
    | "Models & Architecture"
    | "Prompting & Interaction"
    | "Agents & Automation"
    | "Retrieval & Data"
    | "Risk & Governance"
    | "Local & Tooling"
  short: string
  long: string
  creExample: string
  related?: string[]
}

export const glossaryCategories: GlossaryTerm["category"][] = [
  "Core Concepts",
  "Models & Architecture",
  "Prompting & Interaction",
  "Agents & Automation",
  "Retrieval & Data",
  "Risk & Governance",
  "Local & Tooling",
]

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: "ai",
    term: "Artificial Intelligence (AI)",
    category: "Core Concepts",
    short: "Software that performs tasks that normally need human judgment.",
    long: "Broad umbrella for systems that recognize patterns, make predictions, generate content, or take actions. Modern AI in commercial real estate is almost always a specific flavor: machine learning models, large language models, or agent systems built on top of them.",
    creExample:
      "A rent-roll parser that reads a scanned lease PDF and extracts base rent, escalations, and options is AI. So is a demand model that scores submarkets for the next acquisition.",
    related: ["ml", "genai", "llm"],
  },
  {
    id: "ml",
    term: "Machine Learning (ML)",
    category: "Core Concepts",
    short: "Models that learn patterns from historical data.",
    long: "You feed labeled examples in, the algorithm learns the relationship, and then it predicts on new data. Older but still critical for CRE: forecasting, valuation, tenant churn, and market signals.",
    creExample:
      "A gradient-boosted model trained on 15 years of DWS lease data predicts probability of renewal 12 months out.",
    related: ["ai", "genai"],
  },
  {
    id: "genai",
    term: "Generative AI (GenAI)",
    category: "Core Concepts",
    short: "AI that produces new content: text, images, code, audio.",
    long: "Distinct from predictive ML. Instead of scoring or classifying, it writes memos, drafts emails, summarizes documents, or generates images. Most bootcamp workflows use GenAI, specifically large language models.",
    creExample:
      "You paste a 40-page office lease into Claude and it produces a one-page abstract with rent, term, options, and unusual clauses called out.",
    related: ["llm", "chatbot"],
  },
  {
    id: "llm",
    term: "Large Language Model (LLM)",
    category: "Models & Architecture",
    short: "A neural network trained to predict the next token in text.",
    long: "GPT-4, Claude Sonnet, Llama 3, Gemini, Qwen. The engine behind almost every AI tool a CRE manager will touch. Different models have different strengths, context windows, and price points.",
    creExample:
      "Claude Sonnet 4.5 handles a 200-page OM better than a small local Llama because of context window and reasoning depth.",
    related: ["genai", "context-window", "token"],
  },
  {
    id: "transformer",
    term: "Transformer",
    category: "Models & Architecture",
    short: "The neural network architecture that made modern LLMs possible.",
    long: "Introduced in 2017. Uses attention to weigh which parts of the input matter for each output token. Every LLM you use is a transformer variant.",
    creExample:
      "You do not need to design one. You do need to know that a longer, well-structured prompt gives the transformer more to attend to and produces a sharper answer.",
    related: ["llm", "attention"],
  },
  {
    id: "attention",
    term: "Attention",
    category: "Models & Architecture",
    short: "The mechanism that lets a model focus on the relevant parts of the input.",
    long: "For every word the model generates, it looks back across the whole prompt and decides which prior words matter most. This is why context and structure in your prompt change the output so much.",
    creExample:
      "When you label your lease sections with headings, the model attends to the right block when you ask about renewal options.",
    related: ["transformer", "prompt-engineering"],
  },
  {
    id: "token",
    term: "Token",
    category: "Models & Architecture",
    short: "The unit an LLM reads and writes. Roughly a word or piece of a word.",
    long: "1 token is about 4 characters or 0.75 words in English. Pricing, context windows, and rate limits are all measured in tokens. A 40-page lease is roughly 15,000 to 25,000 tokens.",
    creExample:
      "A one-day AJ variance analysis session with Claude might use 80,000 input tokens and 15,000 output tokens across the day.",
    related: ["context-window", "llm"],
  },
  {
    id: "context-window",
    term: "Context Window",
    category: "Models & Architecture",
    short: "The maximum number of tokens the model can consider in one call.",
    long: "Claude Sonnet 4.5 handles 200K tokens. GPT-4o about 128K. Small local models like Llama 3.2 3B often 8K to 128K depending on build. Fill the window with an OM and there is no room for a good answer.",
    creExample:
      "If you paste three offering memoranda into one prompt, you may blow past the window and the model will silently drop the earliest text.",
    related: ["token", "llm"],
  },
  {
    id: "chatbot",
    term: "Chatbot",
    category: "Prompting & Interaction",
    short: "A conversational interface on top of an LLM.",
    long: "ChatGPT, Claude.ai, Gemini, Copilot. What most people mean when they say they use AI. Great for one-shot Q&A and drafts. Weaker at multi-step work without extra scaffolding.",
    creExample:
      "AJ opens Claude, pastes a variance table, asks for a summary. That is a chatbot workflow. Fine for quick reads, not enough for a repeatable monthly process.",
    related: ["llm", "custom-gpt", "claude-project"],
  },
  {
    id: "prompt",
    term: "Prompt",
    category: "Prompting & Interaction",
    short: "The input you give the model. Text, files, and context combined.",
    long: "Every AI interaction has a prompt. Whether you write it fresh, use a saved template, or a Custom GPT injects it invisibly, the model only sees the prompt. Small changes produce large differences in output.",
    creExample:
      "\"Summarize this lease\" gets a generic paragraph. \"Extract tenant, landlord, base rent, escalations, term, options, and any unusual clauses as a JSON object\" gets a usable structured output.",
    related: ["prompt-engineering", "system-prompt"],
  },
  {
    id: "prompt-engineering",
    term: "Prompt Engineering",
    category: "Prompting & Interaction",
    short: "The practice of writing prompts that produce reliable, useful output.",
    long: "Not magic. Structure, examples, roles, output format, and constraints. The ACTOR framework the bootcamp teaches is a prompt-engineering pattern.",
    creExample:
      "AJ's lease abstractor prompt gives the model a role, a few example abstracts, a strict output schema, and a rule to flag anything it is not sure about.",
    related: ["prompt", "actor"],
  },
  {
    id: "system-prompt",
    term: "System Prompt",
    category: "Prompting & Interaction",
    short: "Hidden instructions that shape every message in a chat.",
    long: "In Custom GPTs and Claude Projects, the system prompt tells the model its role, tone, tools, and rules. Users cannot see it but every message is filtered through it.",
    creExample:
      "AJ's Lease Abstractor Custom GPT has a system prompt that says: you are a real estate asset management analyst, always output valid JSON, flag missing fields as null, never hallucinate escalation percentages.",
    related: ["custom-gpt", "claude-project"],
  },
  {
    id: "few-shot",
    term: "Few-Shot Prompting",
    category: "Prompting & Interaction",
    short: "Giving the model a few worked examples inside the prompt.",
    long: "Show, do not just tell. Two or three example inputs and outputs teach the model the pattern faster than any description. Massive quality lift for structured tasks.",
    creExample:
      "Include two anonymized lease abstracts before asking for a new one and format drift drops to nearly zero.",
    related: ["zero-shot", "prompt-engineering"],
  },
  {
    id: "zero-shot",
    term: "Zero-Shot Prompting",
    category: "Prompting & Interaction",
    short: "Asking the model to do a task with no examples.",
    long: "Fastest but least reliable for anything non-standard. Works well for common tasks the model has seen thousands of times. Fails when your CRE task has an unusual output shape.",
    creExample:
      "\"Draft an email to a tenant late on rent\" works zero-shot. \"Abstract this Meridian Tower lease into our internal 14-field schema\" needs at least a few examples.",
    related: ["few-shot", "prompt-engineering"],
  },
  {
    id: "actor",
    term: "ACTOR Framework",
    category: "Prompting & Interaction",
    short: "Bootcamp prompt structure: Assign role, Context, Task, Output format, Rules.",
    long: "The five-part scaffold AJ uses for every serious workflow. Ensures the model has a role, background, a specific task, a defined output shape, and constraints before it starts generating.",
    creExample:
      "Assign: senior asset manager. Context: Q3 variance report for a 400K sq ft Class A office. Task: identify the top three variance drivers. Output: bulleted memo, under 300 words. Rules: cite line items, do not speculate.",
    related: ["prompt-engineering", "system-prompt"],
  },
  {
    id: "agent",
    term: "AI Agent",
    category: "Agents & Automation",
    short: "An LLM plus tools plus a loop, that can take actions to reach a goal.",
    long: "A chatbot answers. An agent decides, acts, observes results, and decides again. Runs until it hits the goal or a stop condition. Almost always tool-using and multi-step.",
    creExample:
      "A rent-roll reconciliation agent reads the roll, checks the GL, calls a variance tool, updates a spreadsheet, and emails a summary. All on its own, all with the manager approving key steps.",
    related: ["agent-loop", "agent-harness", "tool-calling"],
  },
  {
    id: "agent-loop",
    term: "Agent Loop",
    category: "Agents & Automation",
    short: "The cycle of think, act, observe, repeat that drives an agent.",
    long: "Every agent runs the same core loop: the model proposes an action, a harness executes it, the result is fed back, the model plans the next step. The loop terminates when the goal is met or a limit is hit.",
    creExample:
      "AJ's variance agent loops: read GL row, look up budget, compute delta, decide if it needs commentary, either write commentary or move on, repeat until the P&L is done.",
    related: ["agent", "agent-harness"],
  },
  {
    id: "agent-harness",
    term: "Agent Harness",
    category: "Agents & Automation",
    short: "The runtime scaffolding around an LLM that turns it into an agent.",
    long: "The harness manages the loop, calls tools, handles errors, stores memory, and applies safety rails. Claude Code, Cursor, OpenClaw, Perplexity Computer are all harnesses. The LLM is the brain, the harness is the body.",
    creExample:
      "AJ runs OpenClaw locally as a harness around Llama 3.2. When he asks it to reconcile the Meridian rent roll, OpenClaw handles the tool calls and file access. The model itself never touches the disk.",
    related: ["agent", "agent-loop", "tool-calling"],
  },
  {
    id: "tool-calling",
    term: "Tool Calling / Function Calling",
    category: "Agents & Automation",
    short: "The model's ability to request that specific software functions run.",
    long: "Instead of guessing, the model says, in structured JSON, \"call get_rent_roll(property='Meridian Tower')\". The harness runs it and hands back the result. This is what turns text-only LLMs into real automation.",
    creExample:
      "AJ's Custom GPT calls a read_pdf tool to open a lease, then an extract_terms tool to parse it, then a write_row tool to update the abstract log.",
    related: ["agent", "agent-harness", "mcp"],
  },
  {
    id: "mcp",
    term: "Model Context Protocol (MCP)",
    category: "Agents & Automation",
    short: "An open standard for how LLMs connect to tools and data sources.",
    long: "Created by Anthropic in 2024. Instead of every app building its own custom tool interface, MCP defines one contract that any client and any server can speak. Claude Desktop, Cursor, and OpenClaw all speak MCP.",
    creExample:
      "AJ installs a Google Drive MCP server on his Mac. Now Claude Desktop can list, read, and summarize any file in his Drive without special integration code.",
    related: ["tool-calling", "agent-harness"],
  },
  {
    id: "orchestration",
    term: "Agent Orchestration",
    category: "Agents & Automation",
    short: "Coordinating multiple agents or steps to complete a larger workflow.",
    long: "One agent triages the inbox, another drafts the reply, a third pulls the relevant lease. A conductor agent decides who runs when. This is where real business value shows up and where errors compound if you skip governance.",
    creExample:
      "A monthly close orchestration: rent-roll agent, GL reconciliation agent, variance narrative agent, memo writer, manager review. Each hands off to the next.",
    related: ["multi-agent", "agent"],
  },
  {
    id: "multi-agent",
    term: "Multi-Agent System",
    category: "Agents & Automation",
    short: "Multiple specialized agents working together.",
    long: "Instead of one giant agent that does everything, small agents with narrow scopes cooperate. Easier to debug, safer to govern, and often produces better output than a monolith.",
    creExample:
      "One agent handles lease abstraction, another handles market comps, a third writes the acquisition memo. A supervisor agent reviews and asks the manager to sign off.",
    related: ["orchestration", "agent"],
  },
  {
    id: "custom-gpt",
    term: "Custom GPT",
    category: "Agents & Automation",
    short: "A saved ChatGPT configuration with a system prompt, files, and optional actions.",
    long: "Zero-code way to package an AI workflow. Comes with its own name, avatar, instructions, uploaded reference docs, and optional API actions. Great starting point for AJ's Lease Abstractor.",
    creExample:
      "AJ builds a Lease Abstractor Custom GPT, uploads two example abstracts, sets the system prompt, and shares it with his team. Anyone can now paste a lease and get a consistent abstract.",
    related: ["chatbot", "system-prompt", "claude-project"],
  },
  {
    id: "claude-project",
    term: "Claude Project",
    category: "Agents & Automation",
    short: "Anthropic's equivalent of Custom GPT: system prompt plus persistent files.",
    long: "Same idea as a Custom GPT but on Claude. Higher context window, often stronger writing, better for long documents like OMs and multi-lease reviews.",
    creExample:
      "AJ's Variance Analyst Project holds the DWS chart of accounts, last four quarterly reports, and a variance memo template. Every chat starts with that context loaded.",
    related: ["custom-gpt", "system-prompt"],
  },
  {
    id: "rag",
    term: "Retrieval-Augmented Generation (RAG)",
    category: "Retrieval & Data",
    short: "Fetching relevant documents at query time and adding them to the prompt.",
    long: "The model does not memorize your data. It looks it up on demand from a vector store or search index, then answers using what it found. This is how you build a chatbot that actually knows your lease database.",
    creExample:
      "AJ asks his internal assistant \"What is our current exposure to co-working tenants across all Class A properties?\" A RAG pipeline pulls the relevant rent-roll rows and lease abstracts before the model answers.",
    related: ["embedding", "vector-db"],
  },
  {
    id: "embedding",
    term: "Embedding",
    category: "Retrieval & Data",
    short: "A numeric vector representation of a piece of text.",
    long: "Text goes in, a list of a few hundred to a few thousand numbers comes out. Semantically similar text produces similar vectors. This is how RAG finds relevant documents without keyword matching.",
    creExample:
      "The phrase \"early termination right\" and \"cancellation option\" produce nearly identical embeddings, so RAG surfaces the right lease clauses even when the wording differs.",
    related: ["rag", "vector-db"],
  },
  {
    id: "vector-db",
    term: "Vector Database",
    category: "Retrieval & Data",
    short: "A database that stores and searches embeddings by similarity.",
    long: "Pinecone, Chroma, LanceDB, Qdrant, pgvector. Given a query embedding, it returns the N most similar stored embeddings, fast. The retrieval engine underneath most RAG systems.",
    creExample:
      "Every lease abstract in the DWS library gets embedded and stored. A single natural-language query returns the ten most similar clauses across the whole portfolio.",
    related: ["embedding", "rag"],
  },
  {
    id: "fine-tuning",
    term: "Fine-Tuning",
    category: "Retrieval & Data",
    short: "Training an existing model further on your own data.",
    long: "Distinct from RAG. Fine-tuning bakes patterns into the weights themselves. Useful when you need a very specific tone or format at scale. Rarely the right first move. Most CRE needs are met with prompt engineering and RAG.",
    creExample:
      "You almost never need this in year one. If AJ wanted a model that always writes variance memos in DWS house style with zero prompt setup, then fine-tuning helps.",
    related: ["rag", "prompt-engineering"],
  },
  {
    id: "hallucination",
    term: "Hallucination",
    category: "Risk & Governance",
    short: "When the model produces plausible but factually wrong output.",
    long: "The model does not know it is wrong. It just predicts likely text. If it does not know the exact rent, it may generate a confident number. This is why every AI-produced number in a real workflow needs a source or a verification step.",
    creExample:
      "AJ asks for a comp on a specific address. The model returns a number that looks real. It came from nowhere. Rule: no unverified numbers go into a client-facing memo.",
    related: ["temperature", "rag"],
  },
  {
    id: "temperature",
    term: "Temperature",
    category: "Risk & Governance",
    short: "How random the model's output is. 0 is deterministic, 1 is creative.",
    long: "Low temperature for anything factual: extraction, math, structured output. Higher temperature for brainstorming, marketing copy, and creative drafts. Default is usually 0.7. For CRE, prefer 0 to 0.3.",
    creExample:
      "Lease abstraction: temperature 0. Drafting a broker outreach email: 0.5 to 0.7. Never above 0.7 for financials.",
    related: ["top-p", "hallucination"],
  },
  {
    id: "top-p",
    term: "Top-p (Nucleus Sampling)",
    category: "Risk & Governance",
    short: "Another randomness control. Limits sampling to the top-p probability mass.",
    long: "Related to temperature. Top-p 0.9 means the model considers only the tokens whose combined probability is 0.9. Usually tune temperature or top-p, not both. Default is fine for almost every CRE workflow.",
    creExample:
      "AJ rarely touches this. If Claude output is too repetitive, nudging top-p up helps. Otherwise leave it alone.",
    related: ["temperature"],
  },
  {
    id: "guardrails",
    term: "Guardrails",
    category: "Risk & Governance",
    short: "Rules and checks that prevent the model from taking unsafe or off-scope actions.",
    long: "Can be prompt-based (\"never generate a legal opinion\"), tool-based (an agent cannot delete files), or wrapper-based (a policy engine checks every output). Non-negotiable for any workflow that touches money, tenants, or contracts.",
    creExample:
      "AJ's variance agent has a rule: it can read the GL but never write to it. Human review is required before any adjusting entry is proposed to the CFO.",
    related: ["governance", "human-in-the-loop"],
  },
  {
    id: "human-in-the-loop",
    term: "Human-in-the-Loop (HITL)",
    category: "Risk & Governance",
    short: "A workflow where a person reviews or approves AI output before it goes live.",
    long: "The default posture for CRE workflows in year one. Agents draft, humans decide. Move steps to full automation only after months of clean HITL runs.",
    creExample:
      "The Lease Abstractor produces a draft. AJ scans it, corrects any weak field, and only then does it flow into the abstract log.",
    related: ["guardrails", "governance"],
  },
  {
    id: "governance",
    term: "AI Governance",
    category: "Risk & Governance",
    short: "The policies, ownership, and controls around how AI is used at the firm.",
    long: "Who can use which model. What data can go where. Which outputs need review. Where the audit trail lives. Small firms need a one-page policy. Public REITs need a formal committee.",
    creExample:
      "DWS policy example: no confidential tenant data in public chatbots, use approved enterprise Claude or local Llama for anything sensitive, all client-facing AI output reviewed by a licensed asset manager.",
    related: ["guardrails", "human-in-the-loop"],
  },
  {
    id: "ollama",
    term: "Ollama",
    category: "Local & Tooling",
    short: "A macOS/Linux/Windows app that runs open-source LLMs locally.",
    long: "Download once. `ollama run llama3.2:3b` and you are chatting with a local model. Zero cloud, zero data leaving the Mac. Works with hundreds of models: Llama, Qwen, Mistral, Phi, Gemma.",
    creExample:
      "AJ runs `ollama pull llama3.2:3b` on his M2 16GB and now has a private assistant that never sends a tenant name to a public API.",
    related: ["local-model", "lm-studio"],
  },
  {
    id: "lm-studio",
    term: "LM Studio",
    category: "Local & Tooling",
    short: "A GUI for downloading and running local LLMs on a Mac or PC.",
    long: "Same idea as Ollama but with a proper interface. Model browser, chat window, server mode. Good for people who prefer buttons over commands.",
    creExample:
      "If AJ finds the terminal awkward, LM Studio gives him the same local Llama 3.2 3B with a Claude-style chat window.",
    related: ["ollama", "local-model"],
  },
  {
    id: "local-model",
    term: "Local Model",
    category: "Local & Tooling",
    short: "An LLM that runs entirely on your own machine.",
    long: "No internet call. Slower than Claude or GPT for hard tasks. Perfectly fine for extraction, summarization, and simple analysis on a modern Mac. Zero data leakage risk.",
    creExample:
      "AJ's baseline: Llama 3.2 3B for anything with sensitive tenant PII, upgrade to cloud Claude only when the task genuinely needs the extra reasoning.",
    related: ["ollama", "quantization"],
  },
  {
    id: "quantization",
    term: "Quantization",
    category: "Local & Tooling",
    short: "Shrinking a model's numeric precision to make it fit on smaller hardware.",
    long: "A 7B model at full precision needs 14 GB of RAM. Quantized to 4-bit, the same model runs in about 4 GB with only a small quality drop. This is why AJ's M2 16GB can run Llama 3.2 7B quantized but not raw.",
    creExample:
      "Ollama defaults to 4-bit quantized builds. AJ never sees this happen and does not need to configure anything.",
    related: ["local-model", "ollama"],
  },
  {
    id: "openclaw",
    term: "OpenClaw",
    category: "Local & Tooling",
    short: "An open-source agent harness that runs locally around any LLM.",
    long: "Think Claude Code but self-hostable and model-agnostic. Handles the loop, tool calls, file access, and safety checks. Bootcamp Day 3 uses OpenClaw to demonstrate a fully local agent.",
    creExample:
      "AJ pairs OpenClaw with local Llama 3.2 to build a Meridian Tower reconciliation agent that never leaves his Mac.",
    related: ["agent-harness", "local-model"],
  },
  {
    id: "api",
    term: "API",
    category: "Local & Tooling",
    short: "The programmatic way to call a model or tool.",
    long: "Instead of typing into ChatGPT, code sends a request to an endpoint and gets a response. Every serious AI workflow eventually calls an API. Custom GPT actions, Zapier hooks, and internal scripts all go through APIs.",
    creExample:
      "A monthly script hits the Anthropic API with each new lease PDF and writes the returned abstract into the asset management SharePoint.",
    related: ["tool-calling", "mcp"],
  },
]

export function groupedGlossary(): Record<GlossaryTerm["category"], GlossaryTerm[]> {
  const grouped = {} as Record<GlossaryTerm["category"], GlossaryTerm[]>
  for (const cat of glossaryCategories) grouped[cat] = []
  for (const t of glossaryTerms) grouped[t.category].push(t)
  for (const cat of glossaryCategories) {
    grouped[cat].sort((a, b) => a.term.localeCompare(b.term))
  }
  return grouped
}
