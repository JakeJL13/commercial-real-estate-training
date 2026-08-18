"use client"

import { CopyBlock, DownloadCard, Callout, Checklist, StepList } from "./agent-lab-blocks"

export function AgentLabLessonBody({ lessonId }: { lessonId: string }) {
  if (lessonId === "al1") return <Lesson1 />
  if (lessonId === "al2") return <Lesson2 />
  if (lessonId === "al3") return <Lesson3 />
  if (lessonId === "al4") return <Lesson4 />
  if (lessonId === "al5") return <Lesson5 />
  if (lessonId === "al6") return <Lesson6 />
  if (lessonId === "al7") return <Lesson7 />
  return null
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="text-[15px] leading-7 text-foreground/90">{children}</p>
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-8 text-xl font-semibold text-foreground">{children}</h2>
}

function Space() {
  return <div className="mt-5" />
}

// LESSON 1
function Lesson1() {
  return (
    <div className="space-y-5">
      <P>
        Before you install anything AI-related, we need to make sure the basics are on your Mac. Work through this
        checklist. Anything you cannot check off, follow the install steps below the list.
      </P>
      <Checklist
        items={[
          "VS Code is installed and opens without errors",
          "You know how to open the Terminal (Cmd + Space, type Terminal, press Return)",
          "You have Node.js version 18 or newer",
          "You have signed up for an Anthropic API account at console.anthropic.com",
          "You have generated an API key and saved it somewhere safe",
        ]}
      />

      <H2>Install VS Code</H2>
      <P>
        Visit the VS Code download page and grab the Apple Silicon build. Once the .zip finishes downloading, unzip it
        and drag Visual Studio Code into your Applications folder. Open it once so macOS knows to trust it.
      </P>
      <DownloadCard
        href="https://code.visualstudio.com/download"
        filename="External link"
        label="Download VS Code"
        description="Free from Microsoft. Choose the Apple Silicon build for M-series Macs."
      />

      <H2>Verify Node.js</H2>
      <P>Open Terminal and run:</P>
      <CopyBlock code={"node --version"} />
      <P>
        If you see something like <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">v20.11.0</code>{" "}
        or higher, you are good. If you see &quot;command not found&quot;, install Node.js:
      </P>
      <CopyBlock code={"# Install Homebrew first if you do not have it\n/bin/bash -c \"$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\"\n\n# Then install Node.js\nbrew install node"} />

      <H2>Get an Anthropic API Key</H2>
      <StepList
        steps={[
          {
            title: "Sign up at console.anthropic.com",
            body: (
              <P>
                Use your COMPA email. You will get $5 in free credits which is plenty for this workshop.
              </P>
            ),
          },
          {
            title: "Add a payment method",
            body: (
              <P>
                Required even to use free credits. Anthropic will not charge you until you exceed the free tier. Realistic
                usage for this workshop is about $2 to $4.
              </P>
            ),
          },
          {
            title: "Create an API key",
            body: (
              <P>
                Settings, API Keys, Create Key. Name it &quot;Claude Code Meridian&quot;. Copy the key immediately. It
                starts with sk-ant- and will only be shown once.
              </P>
            ),
          },
          {
            title: "Save the key somewhere safe",
            body: (
              <P>
                Paste it into 1Password, or a note on your Mac (not in Slack, not in email). You will need it in the next
                lesson.
              </P>
            ),
          },
        ]}
      />

      <Callout variant="warn" title="Security">
        Treat this API key like a credit card. Anyone who has it can spend your Anthropic credits. Do not commit it to
        Git, do not share it in Slack, do not paste it into a website form other than the ones in this course.
      </Callout>
    </div>
  )
}

// LESSON 2
function Lesson2() {
  return (
    <div className="space-y-5">
      <P>
        Claude Code is a command-line tool that gives Claude the ability to read files, run commands, and edit code on
        your Mac. You will run it from the Terminal that lives inside VS Code, which lets you see your files and the
        conversation side by side.
      </P>

      <H2>Install Claude Code</H2>
      <P>Open Terminal (either the standalone app or the one built into VS Code) and run:</P>
      <CopyBlock code={"npm install -g @anthropic-ai/claude-code"} />
      <P>
        This installs the <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">claude</code>{" "}
        command globally on your Mac. It takes about 30 seconds.
      </P>
      <P>Verify it worked:</P>
      <CopyBlock code={"claude --version"} />

      <H2>Authenticate</H2>
      <P>The first time you run Claude Code, it will ask you to log in. Run:</P>
      <CopyBlock code={"claude"} />
      <P>
        Follow the prompts. You will be asked to sign in with your Anthropic account. A browser window will open, you log
        in, click authorize, and the browser hands the session back to your Terminal.
      </P>
      <P>
        Alternatively, if you prefer to use the raw API key from Lesson 1, set the environment variable:
      </P>
      <CopyBlock code={"export ANTHROPIC_API_KEY=sk-ant-your-key-here"} />
      <P>
        To make that permanent, add the line to your <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">~/.zshrc</code> file.
      </P>

      <H2>Your First Prompt</H2>
      <P>Create a scratch folder and try a quick test:</P>
      <CopyBlock code={"mkdir ~/claude-test\ncd ~/claude-test\necho \"Meridian Tower is a 54,620 SF office building in Seattle.\" > notes.txt\nclaude"} />
      <P>Once Claude Code launches, type:</P>
      <CopyBlock language="prompt" code={"Read notes.txt and tell me what building it describes."} />
      <P>
        Claude will read the file (it will ask permission the first time), report what it found, and wait for your next
        instruction. That is the entire model of Claude Code. You type. It reads. It responds. It can create and edit
        files when you ask it to.
      </P>

      <Callout variant="success" title="You are ready">
        If Claude answered correctly, the setup works. Type <code className="rounded bg-secondary px-1 py-0.5 font-mono text-[12px]">/exit</code> to
        leave the session, and move on to Lesson 3.
      </Callout>
    </div>
  )
}

// LESSON 3
function Lesson3() {
  return (
    <div className="space-y-5">
      <P>
        The way Claude Code becomes an agent instead of just a chatbot is by giving it a working folder with two things:
        the documents you want it to reason about, and a <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">CLAUDE.md</code>{" "}
        file that tells it who it is and how to think.
      </P>

      <H2>Download the Meridian Tower Files</H2>
      <P>
        These are the sample documents for the rest of the workshop. Download all five to your Mac. In the next step you
        will move them into a working folder together.
      </P>
      <div className="my-5 space-y-2">
        <DownloadCard
          href="/agent-lab/CLAUDE.md"
          filename="CLAUDE.md"
          label="CLAUDE.md"
          description="The agent's system instructions. Tells Claude it is a CRE analyst working on Meridian Tower, and how to behave."
        />
        <DownloadCard
          href="/agent-lab/chart-of-accounts.md"
          filename="chart-of-accounts.md"
          label="Chart of Accounts"
          description="Standard CRE chart of accounts. Reference file the agent uses when categorizing P&L line items."
        />
        <DownloadCard
          href="/agent-lab/meridian-rent-roll-current.csv"
          filename="meridian-rent-roll-current.csv"
          label="Current rent roll"
          description="Meridian Tower rent roll as of July 2026. 11 units, 85.7% occupancy."
        />
        <DownloadCard
          href="/agent-lab/meridian-rent-roll-prior.csv"
          filename="meridian-rent-roll-prior.csv"
          label="Prior rent roll"
          description="Meridian Tower rent roll as of January 2026. For month-over-month variance analysis."
        />
        <DownloadCard
          href="/agent-lab/meridian-t12-pnl.csv"
          filename="meridian-t12-pnl.csv"
          label="Trailing 12-month P&L"
          description="Aug 2025 through Jul 2026, with underwriting comparison and variance columns."
        />
        <DownloadCard
          href="/agent-lab/meridian-offering-memo.md"
          filename="meridian-offering-memo.md"
          label="Offering memorandum"
          description="Meridian Tower OM. Deal terms, tenant summary, financials, value-add narrative."
        />
      </div>

      <H2>Set Up the Working Folder</H2>
      <P>Open Terminal and run:</P>
      <CopyBlock code={"mkdir -p ~/meridian-agent\ncd ~/meridian-agent\nmv ~/Downloads/CLAUDE.md .\nmv ~/Downloads/chart-of-accounts.md .\nmv ~/Downloads/meridian-*.csv .\nmv ~/Downloads/meridian-offering-memo.md .\nls -la"} />
      <P>
        The last command should show all six files sitting in <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">~/meridian-agent</code>.
      </P>

      <H2>Open the Folder in VS Code</H2>
      <CopyBlock code={"code ~/meridian-agent"} />
      <P>
        VS Code opens the folder. In the sidebar you will see your six files. Open <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">CLAUDE.md</code>{" "}
        and read it. This is the personality and rules of your agent. Everything Claude Code does in this folder will
        follow these rules.
      </P>

      <H2>Launch the Agent</H2>
      <P>Open the VS Code Terminal (View menu, Terminal) and run:</P>
      <CopyBlock code={"claude"} />
      <P>
        Claude Code starts, notices the CLAUDE.md file, and loads it as its system prompt. Try a warmup:
      </P>
      <CopyBlock language="prompt" code={"List every file in this folder and tell me in one sentence what each one is."} />
      <P>You should get back a clean summary of the six files. Now you are ready to do real work.</P>

      <Callout variant="info" title="Why CLAUDE.md matters">
        The instructions in CLAUDE.md are the difference between a smart intern and a domain expert. Without it, Claude
        will still analyze the files, but it will use generic financial-analyst logic. With it, Claude knows the
        deliverable formats you expect, the chart of accounts you use, and what &quot;show your math&quot; means to a CRE
        asset manager. Every serious agent starts with a good CLAUDE.md.
      </Callout>
    </div>
  )
}

// LESSON 4
function Lesson4() {
  return (
    <div className="space-y-5">
      <P>
        Time to run a real analysis. Open the terminal in your Meridian folder and start Claude Code if it is not already
        running:
      </P>
      <CopyBlock code={"cd ~/meridian-agent\nclaude"} />

      <H2>The Prompt</H2>
      <P>Type this in and press Return:</P>
      <CopyBlock
        language="prompt"
        code={`Compare meridian-rent-roll-current.csv against meridian-rent-roll-prior.csv and produce a variance analysis. Follow the deliverable format in CLAUDE.md. Be specific about which units moved and quantify every claim.`}
      />

      <H2>What You Should Get Back</H2>
      <P>
        Claude will read both files, then produce four sections following the CLAUDE.md rulebook: occupancy snapshot,
        tenant movement, rent roll variance, and top risks. Expect specifics like:
      </P>
      <ul className="my-4 space-y-2 pl-6 text-[15px] leading-7 text-foreground/90">
        <li className="list-disc">Occupancy moved from 90.5% to 85.7%. Two suites went vacant, none re-leased.</li>
        <li className="list-disc">Suite 501 (Alderwood Partners, 3,900 SF) vacated end of January.</li>
        <li className="list-disc">Suite 202 (Willow Bend, 2,450 SF) vacated end of March.</li>
        <li className="list-disc">Suite 201 Hearth Digital expanded from 4,800 to 6,100 SF.</li>
        <li className="list-disc">
          Kestrel (Suite 301, 5,340 SF) went into holdover at 125% of base rent. Renewal at risk.
        </li>
        <li className="list-disc">Suite 302 leased to North Palisade at $36 PSF, above prior asking.</li>
      </ul>

      <H2>Push the Agent</H2>
      <P>Now try a follow-up in the same session:</P>
      <CopyBlock
        language="prompt"
        code={`Which single tenant risk should I bring to the asset review meeting on Monday? Support your answer with the numbers.`}
      />
      <P>
        The correct answer is almost certainly the Kestrel Advisory holdover. It is 9.8% of NRA, 13.6% of base rent, and
        month-to-month means the tenant could give 30 days notice and disappear. Fjord Analytics (Suite 601) is a
        secondary risk since their lease expires in December and no renewal is signed. Claude should surface both, ranked.
      </P>

      <Callout variant="info" title="What just happened">
        You did not write any code. You wrote a prompt. Claude read two spreadsheets, applied the deliverable format from
        CLAUDE.md, and produced an analyst-quality memo. This is what &quot;agent&quot; means in practice: a chatbot with
        access to your files, running on rules you set, on your machine.
      </Callout>
    </div>
  )
}

// LESSON 5
function Lesson5() {
  return (
    <div className="space-y-5">
      <P>
        Same working folder. Same agent. Different job. Now we ask Claude to reconcile the trailing 12-month P&L against
        the original underwriting.
      </P>

      <H2>The Prompt</H2>
      <CopyBlock
        language="prompt"
        code={`Reconcile meridian-t12-pnl.csv against the Underwriting T12 column. Categorize every material variance using chart-of-accounts.md. Then build an NOI bridge from Underwriting NOI to actual T12 NOI, quantifying each driver. Flag any anomalies I should follow up on before the quarterly report.`}
      />

      <H2>What Good Looks Like</H2>
      <P>Claude should produce something structured like:</P>
      <CopyBlock
        language="text"
        code={`Revenue variance vs. underwriting:
  Base Rental Income: -$17,600 (unfavorable). Driver: Vacancy in suites 202 and 501.
  Vacancy Loss: -$31,400 (unfavorable). Same drivers.
  Parking: +$2,250 (favorable). Above underwriting.

Expense variance vs. underwriting:
  Repairs & Maintenance: +$5,700 over. Elevated across the year. Investigate.
  Marketing: +$5,200 over. Leasing marketing to fill 202 and 501.
  Utilities: +$3,500 over. Weather-driven.

NOI bridge:
  Underwriting T12 NOI:           $1,398,335
  Less: Base Rent shortfall         (17,600)
  Less: Vacancy Loss excess         (31,400)
  Less: OpEx over budget            (14,838)
  Plus: Parking upside                2,250
  Plus: Other misc                    (1,215)
  Actual T12 NOI:                 $1,335,532
  Total NOI variance:               ($62,803) or -4.5%

Anomalies flagged:
  1. R&M running 13.6% over underwriting for 12 straight months. Not one-time.
  2. Marketing 52% over budget. Justified if 202 leases before year end. If not, review broker performance.
  3. TI/LC underspent by $16,500. Suite 202 lease-up will consume this if it happens.`}
      />

      <H2>Optional: Ask for a Chart</H2>
      <P>Claude Code can write and run Python. Try:</P>
      <CopyBlock
        language="prompt"
        code={`Generate a simple monthly NOI chart from the T12 P&L. Save it as noi-chart.png in this folder.`}
      />
      <P>
        Claude will write a small Python script using matplotlib, run it, and save the chart. You just gained a data
        visualization tool without writing a line of code yourself.
      </P>
      <P>
        If Python is not installed, Claude will tell you and offer to install it. Say yes, or install manually:
      </P>
      <CopyBlock code={"brew install python\npip3 install matplotlib pandas"} />
    </div>
  )
}

// LESSON 6
function Lesson6() {
  return (
    <div className="space-y-5">
      <P>
        The offering memo is a different kind of document. Long-form prose, not a spreadsheet. Claude reads it the same
        way you would, and produces a one-page brief you can drop into an investment committee memo.
      </P>

      <H2>The Prompt</H2>
      <CopyBlock
        language="prompt"
        code={`Read meridian-offering-memo.md and produce a deal underwriting summary following the format in CLAUDE.md. Cross-check the numbers in the memo against meridian-t12-pnl.csv and flag any discrepancies. Give me three specific diligence questions I should ask the seller.`}
      />

      <H2>Why This Prompt Works</H2>
      <P>Three things in that prompt make Claude behave like a senior analyst:</P>
      <ul className="my-4 space-y-2 pl-6 text-[15px] leading-7 text-foreground/90">
        <li className="list-disc">
          <span className="font-semibold">Cross-check.</span> You are not asking Claude to summarize the memo. You are
          asking it to verify the memo against your own numbers. It will catch that the OM claims T12 NOI of $1,335,532
          which matches your P&L, but if you seed a discrepancy it will find it.
        </li>
        <li className="list-disc">
          <span className="font-semibold">Follow CLAUDE.md format.</span> Claude produces the one-line thesis, terms
          table, financial summary, value-add narrative, and three risks that CLAUDE.md defined.
        </li>
        <li className="list-disc">
          <span className="font-semibold">Diligence questions.</span> Prompting the agent to be adversarial produces
          better questions than asking it to summarize. It will probably surface things like: why is R&M 13.6% over
          underwriting, what is the actual renewal probability for Kestrel and Fjord, and what does &quot;stabilized&quot;
          assume about lease-up timing.
        </li>
      </ul>

      <H2>Iterate</H2>
      <P>Follow up in the same session:</P>
      <CopyBlock
        language="prompt"
        code={`Assume we underwrite the stabilized NOI at $1,556,000 as the memo suggests. At a $22 million purchase price, what is our going-in cap rate and what is our stabilized cap rate? What year-two IRR does that imply at a 5.75% exit cap and 3% annual rent growth?`}
      />
      <P>
        Claude will do the math, show the numbers, and give you a working underwriting model in natural language. You can
        then tell it to save the model as a spreadsheet if you want a version to share.
      </P>

      <Callout variant="warn" title="Trust but verify">
        Claude is very good at reading and summarizing. It is competent at simple financial math. It can make mistakes on
        multi-step DCF logic. Always sanity-check the numbers on important decisions. The value here is speed of first
        draft, not replacement of judgment.
      </Callout>
    </div>
  )
}

// LESSON 7
function Lesson7() {
  return (
    <div className="space-y-5">
      <P>
        Every skill from the last three lessons lives in the same folder, controlled by the same CLAUDE.md, with the same
        agent. Now we compose them into a single deliverable. This is what asset managers actually need on Monday morning
        when a new deal packet arrives.
      </P>

      <H2>The Capstone Prompt</H2>
      <CopyBlock
        language="prompt"
        code={`Produce a complete Meridian Tower deal review. It should contain:

1. Deal underwriting summary from the offering memo, cross-checked against actuals
2. Rent roll variance analysis from prior to current period
3. NOI reconciliation from underwriting to trailing twelve
4. A synthesis section that combines all three: what is the story of this asset today, what is the buyer actually buying, and what are the three most important diligence items in priority order
5. Save the full output as meridian-deal-review-2026-07.md in this folder

Follow all CLAUDE.md rules. Cite specific line items. Show your math.`}
      />

      <H2>What You Just Built</H2>
      <P>
        Take a moment to appreciate what happened. You gave one command. Claude read four separate documents, applied a
        firm-specific chart of accounts, ran three different analytical workflows, synthesized across them, and wrote a
        multi-page memo to a file on your Mac. Nothing left your laptop except the text of your prompt and the file
        contents. No PDFs uploaded to a website. No SaaS vendor storing your rent roll.
      </P>
      <P>
        Every time a new deal packet arrives, you can drop the new documents into this folder, update CLAUDE.md if the
        deal has different characteristics, and run the same prompt. You have replaced a two-day analyst assignment with
        a ten-minute agent run and a review pass.
      </P>

      <H2>Adapt It To Your Real Portfolio</H2>
      <StepList
        steps={[
          {
            title: "Create a new folder for each asset",
            body: (
              <P>
                One folder per property or per deal under review. Copy the same CLAUDE.md structure into each. Update it
                with the asset name, size, and any deal-specific instructions.
              </P>
            ),
          },
          {
            title: "Drop your firm's real documents in",
            body: (
              <P>
                Rent rolls, T12s, offering memos. PDF is fine. Excel is fine. Claude handles both. If a file is
                confidential, remember: it stays on your machine.
              </P>
            ),
          },
          {
            title: "Keep a prompt library",
            body: (
              <P>
                Save your best prompts in a <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]">prompts.md</code>{" "}
                file. Copy-paste when you need them. The prompts you built in this workshop are a good starting library.
              </P>
            ),
          },
          {
            title: "Update CLAUDE.md as your firm's standards evolve",
            body: (
              <P>
                When your firm changes its variance thresholds, deliverable formats, or reporting conventions, update
                CLAUDE.md and every future agent run picks up the change.
              </P>
            ),
          },
        ]}
      />

      <Callout variant="success" title="Course complete">
        You built a local financial-analyst agent from scratch. Same tools work on any real estate deal. Save your
        CLAUDE.md and prompts. Bring your next real deal into a fresh folder and run the same workflow. That is how you
        move from AI experimenter to AI operator.
      </Callout>
    </div>
  )
}
