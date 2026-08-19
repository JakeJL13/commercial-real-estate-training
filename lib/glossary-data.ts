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
  moduleId: "m1" | "m2" | "m3" | "m4" | "m5" | "m6" | "m7"
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
    moduleId: "m1",
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
    moduleId: "m1",
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
    moduleId: "m1",
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
    moduleId: "m1",
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
    moduleId: "m1",
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
    moduleId: "m1",
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
    moduleId: "m1",
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
    moduleId: "m1",
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
    moduleId: "m1",
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
    moduleId: "m5",
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
    moduleId: "m5",
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
    moduleId: "m5",
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
    moduleId: "m5",
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
    moduleId: "m5",
    term: "Zero-Shot Prompting",
    category: "Prompting & Interaction",
    short: "Asking the model to do a task with no examples.",
    long: "Fastest but least reliable for anything non-standard. Works well for common tasks the model has seen thousands of times. Fails when your CRE task has an unusual output shape.",
    creExample:
      "\"Draft an email to a tenant late on rent\" works zero-shot. \"Abstract this Ram and Wolf lease into our internal 14-field schema\" needs at least a few examples.",
    related: ["few-shot", "prompt-engineering"],
  },
  {
    id: "actor",
    moduleId: "m5",
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
    moduleId: "m1",
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
    moduleId: "m4",
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
    moduleId: "m4",
    term: "Agent Harness",
    category: "Agents & Automation",
    short: "The runtime scaffolding around an LLM that turns it into an agent.",
    long: "The harness manages the loop, calls tools, handles errors, stores memory, and applies safety rails. Claude Code, Cursor, OpenClaw, Perplexity Computer are all harnesses. The LLM is the brain, the harness is the body.",
    creExample:
      "AJ runs OpenClaw locally as a harness around Llama 3.2. When he asks it to reconcile the Ram and Wolf rent roll, OpenClaw handles the tool calls and file access. The model itself never touches the disk.",
    related: ["agent", "agent-loop", "tool-calling"],
  },
  {
    id: "tool-calling",
    moduleId: "m6",
    term: "Tool Calling / Function Calling",
    category: "Agents & Automation",
    short: "The model's ability to request that specific software functions run.",
    long: "Instead of guessing, the model says, in structured JSON, \"call get_rent_roll(property='Ram and Wolf')\". The harness runs it and hands back the result. This is what turns text-only LLMs into real automation.",
    creExample:
      "AJ's Custom GPT calls a read_pdf tool to open a lease, then an extract_terms tool to parse it, then a write_row tool to update the abstract log.",
    related: ["agent", "agent-harness", "mcp"],
  },
  {
    id: "mcp",
    moduleId: "m6",
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
    moduleId: "m6",
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
    moduleId: "m6",
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
    moduleId: "m2",
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
    moduleId: "m2",
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
    moduleId: "m3",
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
    moduleId: "m3",
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
    moduleId: "m3",
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
    moduleId: "m3",
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
    moduleId: "m1",
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
    moduleId: "m7",
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
    moduleId: "m7",
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
    moduleId: "m7",
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
    moduleId: "m7",
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
    moduleId: "m7",
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
    moduleId: "m7",
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
    moduleId: "m7",
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
    moduleId: "m7",
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
    moduleId: "m7",
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
    moduleId: "m7",
    term: "OpenClaw",
    category: "Local & Tooling",
    short: "An open-source agent harness that runs locally around any LLM.",
    long: "Think Claude Code but self-hostable and model-agnostic. Handles the loop, tool calls, file access, and safety checks. Bootcamp Day 3 uses OpenClaw to demonstrate a fully local agent.",
    creExample:
      "AJ pairs OpenClaw with local Llama 3.2 to build a Ram and Wolf reconciliation agent that never leaves his Mac.",
    related: ["agent-harness", "local-model"],
  },
  {
    id: "api",
    moduleId: "m3",
    term: "API",
    category: "Local & Tooling",
    short: "The programmatic way to call a model or tool.",
    long: "Instead of typing into ChatGPT, code sends a request to an endpoint and gets a response. Every serious AI workflow eventually calls an API. Custom GPT actions, Zapier hooks, and internal scripts all go through APIs.",
    creExample:
      "A monthly script hits the Anthropic API with each new lease PDF and writes the returned abstract into the asset management SharePoint.",
    related: ["tool-calling", "mcp"],
  },
{
    id: "agentic-ai",
    moduleId: "m1",
    term: "Agentic AI",
    category: "Agents & Automation",
    short: "An orchestrated network of agents that communicate and hand off work across a multi-step goal.",
    long: "The layer above single agents. Multiple agents each handle a bounded task, communicate, and hand off to each other across a larger workflow. This is where AI moves from automating a task to automating an end-to-end process.",
    creExample:
      "A supervisor agent that screens a deal, hands off to a lease-abstraction agent, then to an NOI-forecasting agent, and finally produces a committee memo without you touching a keyboard.",
    related: ["agent", "orchestration", "multi-agent"],
  },
  {
    id: "tool-first",
    moduleId: "m1",
    term: "Tool-first mindset",
    category: "Core Concepts",
    short: "Adding AI as a copilot inside an existing human workflow. The human is still the driver.",
    long: "Named by Hofmann and Kruhse-Lehtonen (HDSR). Tool-first deployments give a human better software but keep the human as the workflow driver. The bottleneck is still human speed, so gains are measured in minutes, not hours.",
    creExample:
      "A chat assistant sitting next to your leasing analyst that helps write Excel formulas faster. Nice, but the analyst is still doing every step.",
    related: ["agent-first"],
  },
  {
    id: "agent-first",
    moduleId: "m1",
    term: "Agent-first mindset",
    category: "Core Concepts",
    short: "Redesigning the workflow around the agent as primary actor. Humans supervise exceptions.",
    long: "The counterpart to tool-first. The agent handles the default path. Humans are looped in for exceptions, ambiguity, or high-stakes calls. This is where the 2-10x productivity gains from HDSR come from.",
    creExample:
      "An agent watches your rent roll folder, runs variance analysis automatically, drops a memo in your deal folder, and Slacks you a 3-bullet summary. You review, you do not execute.",
    related: ["tool-first", "agent-os"],
  },
  {
    id: "agent-os",
    moduleId: "m1",
    term: "Agent OS",
    category: "Core Concepts",
    short: "The infrastructure layer that exposes business logic as APIs so agents can act on it.",
    long: "Not a product. An architectural standard from Kruhse-Lehtonen and Hofmann. If your data lives in PDFs and hallway conversations, agents cannot reach it. The Agent OS is whatever makes your business machine-readable.",
    creExample:
      "Your PM system has a REST API for rent rolls. Your lease repository has a query endpoint. Your accounting exports GL data on a schedule. That surface is your Agent OS.",
    related: ["agent-first", "api"],
  },
  {
    id: "pilotitis",
    moduleId: "m1",
    term: "Pilotitis",
    category: "Core Concepts",
    short: "The failure mode of continuously piloting AI without ever deploying to production.",
    long: "Coined by Bayer's leadership. The number-one enterprise AI failure mode per Kruhse-Lehtonen and Hofmann's 40+ engagements. Symptoms: same pilot for 6+ months, no committed production plan, endless slide decks.",
    creExample:
      "You have been 'evaluating' AI variance analysis for 8 months. You have 3 dashboards and 0 production users. That is pilotitis.",
    related: ["agent-framework"],
  },
  {
    id: "j-curve",
    moduleId: "m1",
    term: "Productivity J-Curve",
    category: "Core Concepts",
    short: "Value dips before it climbs. The first months of AI deployment are net-negative on productivity.",
    long: "Documented by Erik Brynjolfsson at MIT across electricity, IT, and now AI. New technology creates a productivity dip while old and new processes run in parallel. Only 5% of pilots produce measurable value in early stages. The other 95% are in the trough.",
    creExample:
      "Month 1 of lease abstraction: analysts spend MORE time double-checking outputs. Month 4: they trust it and reclaim 40% of their week. If you killed it at month 3, you killed it at the trough.",
    related: ["pilotitis"],
  },
  {
    id: "data-opportunity-matrix",
    moduleId: "m1",
    term: "Data opportunity matrix",
    category: "Core Concepts",
    short: "A 2x2 grid of business value vs. implementation effort used to prioritize AI initiatives.",
    long: "Kruhse-Lehtonen and Hofmann's tool for triaging AI opportunities. Four quadrants: high value / low effort (start here), high value / high effort (do second), low value / low effort (opportunistic), low value / high effort (kill).",
    creExample:
      "Lease abstraction is high value, low effort. Portfolio-wide predictive maintenance is high value, high effort. Auto-generating email subject lines is low value, low effort.",
    related: ["agent-framework"],
  },
  {
    id: "agent-strategist",
    moduleId: "m1",
    term: "AI Strategist",
    category: "Core Concepts",
    short: "The translator role between business leadership and data science teams.",
    long: "Also called the analytics translator. The person who understands enough of the business to pick the right problems AND enough of the technology to spec a working solution. Kruhse-Lehtonen and Hofmann call this the most critical hire on any AI team.",
    creExample:
      "The asset manager who can walk into a data science stand-up, describe a variance workflow in enough detail that engineers can build it, and defend the ROI to the investment committee. That person is the AI Strategist.",
    related: ["agent-framework"],
  },
  {
    id: "agent-framework",
    moduleId: "m2",
    term: "AGENT framework",
    category: "Agents & Automation",
    short: "5-phase design process: Audit, Gauge, Engineer, Navigate, Track. Applied to ONE selected workflow.",
    long: "Introduced by HDSI / DAIN Studios. Universal blueprint for designing agentic workflows. Runs as an 8-week sprint: weeks 1-2 audit and gauge, weeks 3-5 engineer, weeks 6-8 navigate and track. AGENT does not start until the strategy layer has picked ONE workflow.",
    creExample:
      "You picked the monthly rent-roll delta briefing as your first workflow (strategy layer). Now run AGENT on it: audit the 5-step workflow, gauge each step, engineer the agent-first version, define navigation, track results in month 1-2.",
    related: ["audit-step", "gauge-step", "engineer-step", "navigate-step", "track-step"],
  },
  {
    id: "audit-step",
    moduleId: "m2",
    term: "Audit (AGENT phase 1)",
    category: "Agents & Automation",
    short: "Understand how work is done today. First phase of AGENT.",
    long: "Document the trigger, map every step (owner, system, input, output), document data flows and roles, define the final output, restate the desired outcome. Deliverable: a process workflow map plus a one-sentence desired outcome.",
    creExample:
      "Watch your team's monthly rent-roll delta briefing end to end. Note who does what, where the data comes from, and every clarifying question. That is the audit deliverable.",
    related: ["agent-framework"],
  },
  {
    id: "gauge-step",
    moduleId: "m2",
    term: "Gauge (AGENT phase 2)",
    category: "Agents & Automation",
    short: "Assess each step against the outcome using 3 axes. Second phase of AGENT.",
    long: "Score every step 1-5 on impact, repeatability, complexity. Then mark each step: enhance, automate, or eliminate. High impact plus high repeatability equals automate first. High complexity does not mean 'do not automate,' it means 'pair automation with controls.'",
    creExample:
      "For the rent-roll delta workflow: 'pull from Yardi' scores 5/5/1 (automate). 'Flag anomalies' scores 5/3/4 (automate with human review). 'Send email' scores 2/5/1 (automate).",
    related: ["agent-framework"],
  },
  {
    id: "engineer-step",
    moduleId: "m2",
    term: "Engineer (AGENT phase 3)",
    category: "Agents & Automation",
    short: "Design the agent-first flow. Redesign, do not retrofit. Third phase of AGENT.",
    long: "Make data accessible, make decisions explicit, make success measurable, build the straight-through path first then the exception lane, instrument for observability from day one. Do not copy the human workflow; design what an agent-native version looks like.",
    creExample:
      "The human variance memo has three meetings baked in. The agent-first version has zero meetings and one review gate. That is redesign, not retrofit.",
    related: ["agent-framework", "instructions", "knowledge"],
  },
  {
    id: "navigate-step",
    moduleId: "m2",
    term: "Navigate (AGENT phase 4)",
    category: "Agents & Automation",
    short: "Define the human-agent collaboration model. Fourth phase of AGENT.",
    long: "Agents explain their actions and surface reasoning. Agents accept human intervention gracefully. Humans move from doing the work to governing it: policy definition, approvals, complex exceptions. Design the interface around exceptions, not around everything.",
    creExample:
      "For the variance-memo agent, humans review only when a rent delta exceeds $5k or a new lease abstract is unclear. Everything else runs straight through.",
    related: ["agent-framework", "human-in-the-loop"],
  },
  {
    id: "track-step",
    moduleId: "m2",
    term: "Track (AGENT phase 5)",
    category: "Agents & Automation",
    short: "Measure value fast with outcome-centric metrics. Fifth phase of AGENT.",
    long: "Leading indicators beat lagging ones. Track acceptance rate of agent proposals (target 70%+ once stabilized), first-pass validation rate, reliability, latency, exception SLA, adoption rate, conflict volume trend. Weekly review in first 8 weeks, monthly after.",
    creExample:
      "Month 3 of the variance agent: acceptance rate 82%, first-pass validation 91%, average exception SLA 4 hours. All green. Continue.",
    related: ["agent-framework"],
  },
  {
    id: "cowork",
    moduleId: "m2",
    term: "Claude Cowork",
    category: "Agents & Automation",
    short: "Real-time multi-person collaboration inside a Claude conversation.",
    long: "Google Docs collaboration for AI chats. Multiple humans type in the same conversation, everyone sees Claude's responses, everyone can add context. Ideal for joint deal reviews, negotiation prep, or memo drafting where two people bring different context.",
    creExample:
      "You and your acquisitions lead open a Cowork session in the Ram and Wolf Project to run a hold-vs-sell IRR review together. 30 minutes, one joint memo, neither of you working alone.",
    related: ["claude-project"],
  },
  {
    id: "scheduled-task",
    moduleId: "m2",
    term: "Scheduled task",
    category: "Agents & Automation",
    short: "An agent that runs a prompt on a recurring schedule and routes the output somewhere you will see it.",
    long: "Available in both Claude and ChatGPT. Set a cron (daily, weekly, monthly, or custom), pick the underlying Project or Custom GPT, and choose where output goes: email, Slack, in-app, or a doc. Always route somewhere visible or the task will fail silently.",
    creExample:
      "Monday 6am: pull the latest rent rolls from Drive, flag any tenants 30+ days delinquent, draft a Gmail to your asset team. Set once, runs every week without you.",
    related: ["agent-framework", "connector"],
  },
  {
    id: "connector",
    moduleId: "m2",
    term: "Connector / Plugin",
    category: "Agents & Automation",
    short: "An integration that gives an AI tool access to a specific external service like Drive, Gmail, or Slack.",
    long: "Claude calls them integrations. ChatGPT calls them Connectors (with Actions as the custom-API layer). Same idea: hands for your AI so it can act on your real tools. Always scope permissions to the minimum needed (read-only, one folder).",
    creExample:
      "Grant your Ram and Wolf Custom GPT read-only Drive access to a single folder, draft-only Gmail access, and event-create Calendar access. Anything more is over-scoped.",
    related: ["actions", "scheduled-task"],
  },
  {
    id: "actions",
    moduleId: "m2",
    term: "Actions (Custom GPT)",
    category: "Agents & Automation",
    short: "Custom API connections you configure inside a Custom GPT to reach services with no native connector.",
    long: "Where Connectors are pre-built for common tools, Actions let you wire a Custom GPT to any HTTPS API. Powerful but requires an OpenAPI-style spec and auth setup. Use Connectors first, Actions when the connector does not exist.",
    creExample:
      "You want your CRE assistant to pull comps from Redfin's API. There is no native Redfin connector, so you configure an Action with the Redfin API schema and an API key.",
    related: ["connector"],
  },
  {
    id: "instructions",
    moduleId: "m2",
    term: "Instructions (Custom GPT / Project)",
    category: "Prompting & Interaction",
    short: "The persistent prompt that runs at the start of every conversation with a Custom GPT or Claude Project.",
    long: "The biggest single lever on output quality. A 6-line template covers 80% of cases: persona, primary task, format rules, tone rules, what never to do, escalation rule. Everything else is decoration.",
    creExample:
      "'You are the asset manager for Ram and Wolf. When I paste a new rent roll, produce a bulleted variance memo covering tenant deltas, rent changes, expiration flags, and 3 follow-up questions. Never invent tenant names. If unclear, ask.' That is a working Instructions block.",
    related: ["custom-gpt", "claude-project", "system-prompt"],
  },
  {
    id: "knowledge",
    moduleId: "m2",
    term: "Knowledge (Custom GPT / Project)",
    category: "Retrieval & Data",
    short: "Reference documents you upload once and the AI can search across in every conversation.",
    long: "Persistent files (PDFs, docs, CSVs, images) attached to a Custom GPT or Claude Project. Custom GPTs allow up to 20 files. Rule: fewer high-value documents beat more low-value ones. Version-control your uploads and never leave stale copies.",
    creExample:
      "Upload the master lease abstract, last 12 months of rent rolls, and the property fact sheet. Do NOT upload every email thread about the property or the agent will drown in noise.",
    related: ["rag", "custom-gpt", "claude-project"],
  },
{
    id: "strategy-layer",
    moduleId: "m2",
    term: "Strategy layer",
    category: "Core Concepts",
    short: "The 4 moves that must happen before you can run AGENT on a workflow.",
    long: "Assess capabilities, formulate agentic AI vision, identify opportunities across the organization, select ONE workflow. Skipping this is the number-one reason enterprise pilots stall. AGENT operates on a single selected workflow, not on 'the company.'",
    creExample:
      "Before building your first CRE agent, spend 30 minutes: what AI is our team using today, what do we want AI to change by end of year, list 15-25 candidate workflows, pick one. That is the strategy layer.",
    related: ["agent-framework", "data-opportunity-matrix"],
  },
  {
    id: "reasoning-engine",
    moduleId: "m2",
    term: "Reasoning engine (Element 1)",
    category: "Agents & Automation",
    short: "The thinking layer of an agent: model, system prompt, temperature, iteration limits.",
    long: "First of the four elements every agent has. Four choices: model selection (based on task complexity, cost, latency, data sensitivity), system prompt (role, tone, scope, constraints, domain context), reasoning depth (temperature, chain length, iteration limits), and evaluation criteria for success.",
    creExample:
      "For a Ram and Wolf variance memo: model Claude Sonnet 4.5, temperature 0.2 (deterministic), single-pass draft, success = 1-page memo with specific line-item citations.",
    related: ["four-elements", "system-prompt", "temperature"],
  },
  {
    id: "context-memory",
    moduleId: "m2",
    term: "Context and memory (Element 2)",
    category: "Agents & Automation",
    short: "How an agent retains knowledge and task history to reason over time.",
    long: "Second of the four elements. Four decisions: memory scope (short-term session vs long-term persistent), storage method (vector DB or structured store), retrieval logic (similarity search, metadata filters), lifecycle (what is retained, refreshed, forgotten). Rule of thumb: small corpus goes directly in the system prompt or Project Knowledge; only build RAG for large corpora or fresh-update needs.",
    creExample:
      "For the Ram and Wolf agent: Claude Project Knowledge holds the master lease and 3 months of rent rolls. That is context. When you close the chat and open a new one tomorrow, the Project retains the files. That is persistent memory.",
    related: ["four-elements", "knowledge", "rag"],
  },
  {
    id: "tools-actions",
    moduleId: "m2",
    term: "Tools and actions (Element 3)",
    category: "Agents & Automation",
    short: "What the agent can read, what it can write, and through which connectors.",
    long: "Third of the four elements. Rules: (1) start read-only, an agent that only reads can only inform, not damage. (2) Scope permissions to the minimum. Draft-only Gmail, single-folder Drive, event-create Calendar. Anything more is over-scoped.",
    creExample:
      "Your Ram and Wolf variance agent gets: read-only Drive on the Ram and Wolf folder, draft-only Gmail, no Calendar. Read what it needs, propose what it drafts, never send anything.",
    related: ["four-elements", "connector", "actions"],
  },
  {
    id: "governance-guardrails",
    moduleId: "m2",
    term: "Governance and guardrails (Element 4)",
    category: "Risk & Governance",
    short: "The controls that keep an agent responsible, intent-aligned, and secure.",
    long: "Fourth of the four elements. Six choices: access rights (who can create, deploy, modify), data governance (what data can be accessed, no PII or sensitive leakage), monitoring and audit, escalation paths, compliance, soft guardrails (require source citation, forbid invention). Governance is NOT a phase at the end. It is one of the four elements of every single agent you build.",
    creExample:
      "Your investor-letter draft agent has soft guardrails: 'Cite the specific rent roll line item for every claim,' 'Never invent tenant names,' 'Escalate to human if rent delta exceeds $10k.' Those are element 4 in action.",
    related: ["four-elements", "guardrails", "governance"],
  },
  {
    id: "four-elements",
    moduleId: "m2",
    term: "The Four Elements",
    category: "Agents & Automation",
    short: "Every real agent has 4 elements: reasoning engine, context/memory, tools/actions, governance/guardrails.",
    long: "Miss one and what you built is a prompt, not an agent. Reasoning engine is the thinking layer. Context and memory is what the agent knows and retains. Tools and actions is what it can read and write. Governance and guardrails is the control system. Design all four in from day one; do not add governance last.",
    creExample:
      "Your Ram and Wolf variance-memo Custom GPT has: reasoning (GPT-4o + system prompt + temp 0.2), context (project Knowledge = master lease + rent rolls), tools (read-only Drive + draft Gmail), governance (private, cite sources, never invent tenant names). All four = agent.",
    related: ["reasoning-engine", "context-memory", "tools-actions", "governance-guardrails"],
  },
  {
    id: "prompt-chaining",
    moduleId: "m2",
    term: "Prompt chaining (Archetype 1)",
    category: "Agents & Automation",
    short: "Sequential agentic workflow: agent to gate to agent, each step feeding the next.",
    long: "First of the 5 workflow archetypes. Use when work breaks cleanly into controllable steps and each step has a clear pass/fail check. Gates between agents validate before advancing.",
    creExample:
      "Tenant onboarding: extract lease terms → gate 'all required fields present?' → cross-check against LOI → gate 'any deltas?' → draft welcome email and set up in property management system. Sequential chain, gates between.",
    related: ["workflow-archetype", "routing", "orchestrator-workers"],
  },
  {
    id: "routing",
    moduleId: "m2",
    term: "Routing (Archetype 2)",
    category: "Agents & Automation",
    short: "One classifier agent dispatches incoming work to specialist sub-workflows.",
    long: "Second of the 5 workflow archetypes. Use when incoming requests are heterogeneous and different types need different handling. A single reasoning agent classifies, then sends the work to the right specialist.",
    creExample:
      "Deal-inquiry router: incoming inquiries are classified as office, retail, or industrial, then dispatched to a specialist underwriting agent for each product type (different comps, different tenant signals, different cap rate logic).",
    related: ["workflow-archetype", "prompt-chaining"],
  },
  {
    id: "parallelization",
    moduleId: "m2",
    term: "Parallelization (Archetype 3)",
    category: "Agents & Automation",
    short: "Multiple agents work on the same task simultaneously, results aggregated.",
    long: "Third of the 5 workflow archetypes. Use when you gain value from solving the same request two or three ways, then merging. Aggregation can be rule-based (highest score wins) or a synthesizer agent that merges.",
    creExample:
      "Three agents draft the same quarterly investor letter in parallel with different tones: plain and direct, narrative, heavy on numbers. A fourth agent scores each on clarity and length. You hybridize the best.",
    related: ["workflow-archetype", "orchestrator-workers"],
  },
  {
    id: "orchestrator-workers",
    moduleId: "m2",
    term: "Orchestrator-workers (Archetype 4)",
    category: "Agents & Automation",
    short: "One orchestrator decomposes work, worker agents run in parallel, a synthesizer merges.",
    long: "Fourth of the 5 workflow archetypes. The most common architecture behind 'research agent' products. Use for complex multi-step work that decomposes cleanly.",
    creExample:
      "Competitive market scan: orchestrator receives 'scan Seattle office market,' decomposes into (a) recent transactions, (b) CRE news sentiment, (c) sublease trends, (d) major tenant moves. Four workers run in parallel. Synthesizer produces a one-page brief.",
    related: ["workflow-archetype", "parallelization"],
  },
  {
    id: "evaluator-optimizer",
    moduleId: "m2",
    term: "Evaluator-optimizer (Archetype 5)",
    category: "Agents & Automation",
    short: "Creator drafts, evaluator critiques against rules, creator revises, loop until acceptable.",
    long: "Fifth of the 5 workflow archetypes. Use when work improves through iteration and you can specify what 'good' looks like. Set an iteration limit so it does not loop forever.",
    creExample:
      "Lease amendment: creator agent drafts, evaluator agent checks against firm's lease compliance rules (tone, legal terms, required clauses), sends critique back. Creator revises. Loop up to 3 times. If still not acceptable, escalate to legal.",
    related: ["workflow-archetype"],
  },
  {
    id: "workflow-archetype",
    moduleId: "m2",
    term: "Workflow archetype",
    category: "Agents & Automation",
    short: "The shape of an agentic workflow. Match the shape to your archetype before you build.",
    long: "Five archetypes cover almost every agentic workflow: prompt chaining, routing, parallelization, orchestrator-workers, evaluator-optimizer. Recognizing the archetype up front saves days of design work.",
    creExample:
      "Before you build anything for Ram and Wolf, ask: is this sequential (chain), triage (route), same-task-multi-tone (parallel), decomposable (orchestrator), or iterative (evaluator)? Naming it changes the design.",
    related: ["prompt-chaining", "routing", "parallelization", "orchestrator-workers", "evaluator-optimizer"],
  },
  {
    id: "workflow-canvas",
    moduleId: "m2",
    term: "Workflow Design Canvas",
    category: "Agents & Automation",
    short: "The 4-move one-page spec you fill out for every agentic workflow before building.",
    long: "Move 1: define the desired outcome. Move 2: describe the trigger (automated or manual). Move 3: lay out the agents; for each, fill in all four elements. Move 4: place the six connector types (input/output, feedback, human check, programmable step, human-in-the-loop, exchange). A completed canvas is a build spec.",
    creExample:
      "Paste your completed canvas into Claude with 'build this as a Custom GPT: draft the Instructions, list the Knowledge to upload, name every Connector.' You get a working scaffold in 5 minutes.",
    related: ["agent-framework", "four-elements", "workflow-archetype"],
  },
  {
    id: "shadow-mode",
    moduleId: "m2",
    term: "Shadow mode",
    category: "Risk & Governance",
    short: "Deploy an agent that only proposes; a human executes. First mode of every agent.",
    long: "One of the three drilling rules from the AGENT curriculum: 'Agents propose, they do not execute.' Ship in shadow mode. Instrument everything. Expand scope to autonomous action only after acceptance rate has stabilized above 70%.",
    creExample:
      "Your variance-memo agent in month 1: it drafts, you always edit before sending. Shadow. Month 4: acceptance rate 85%, you flip to 'auto-send unless flagged.' Autonomous.",
    related: ["human-in-the-loop", "governance-guardrails", "track-step"],
  },
  {
    id: "straight-through",
    moduleId: "m2",
    term: "Straight-through path",
    category: "Agents & Automation",
    short: "The 80% happy path in an agentic workflow. Build it first, before the exception lane.",
    long: "One of the Engineer rules. Design and ship the straight-through path first: what happens when everything is normal. Then instrument the exception lane: what happens when something is unusual. Building both in parallel is a common Engineer mistake that stalls sprints.",
    creExample:
      "Straight-through variance memo: rent roll pulled, deltas computed, memo drafted, sent to your inbox. Exception lane: any delta above $5k or a new tenant halts and pings you for review. Build the first, then the second.",
    related: ["engineer-step", "exception-lane"],
  },
  {
    id: "exception-lane",
    moduleId: "m2",
    term: "Exception lane",
    category: "Agents & Automation",
    short: "The 20% path in an agentic workflow that handles unusual cases. Built AFTER the straight-through path.",
    long: "The design pattern for handling unusual inputs. Every agentic workflow needs both paths. Skipping the exception lane creates agents that fail silently on edge cases. Skipping the straight-through path first creates agents that never ship.",
    creExample:
      "For the variance memo agent, the exception lane catches: new tenant name never seen before, rent change greater than 10% month-over-month, missing prior month data. Each triggers a specific human-review flow.",
    related: ["straight-through", "engineer-step"],
  },
  {
    id: "acceptance-rate",
    moduleId: "m2",
    term: "Acceptance rate",
    category: "Risk & Governance",
    short: "The % of agent proposals humans accept without material edit. The leading Track metric.",
    long: "Target 70% or higher once stabilized. Below 70% after week 4 means go back to Engineer. Above 90% may mean the agent has been over-tuned to the reviewer's preferences and could drift on new content.",
    creExample:
      "Month 3 of your variance-memo agent: you accepted 41 of 48 drafts with only minor edits. That is 85%. Above the 70% target. Continue.",
    related: ["track-step", "shadow-mode"],
  },
  {
    id: "observability",
    moduleId: "m2",
    term: "Observability",
    category: "Risk & Governance",
    short: "Instrument every agent decision so you can debug, tune, and prove value.",
    long: "One of the Engineer rules: instrument everything from day one. Log inputs, decisions, outputs, human overrides. Without observability you cannot compute acceptance rate, cannot spot drift, and cannot defend the agent in an audit. Non-negotiable.",
    creExample:
      "Every variance memo the agent drafts gets logged with a run ID, source rent-roll snapshot, decisions taken, and any human edit applied. When someone asks 'why did the memo flag this tenant?', you can answer.",
    related: ["engineer-step", "governance-guardrails"],
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
