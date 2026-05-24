# AfterQuery Signals Intelligence

A customer signals and relationship intelligence tool for AfterQuery's Customer Engagement 
and Business Development teams. Surfaces account signals, classifies them by risk and 
opportunity, generates personalized outreach, and provides deep POC relationship context 
to help AMs/SPLs act faster and smarter on both existing accounts and new prospects.

## What it does

**Account Sidebar**
- Displays a book of 10 (example) accounts (5 existing clients, 5 prospects)
- Filter by account type, risk level, and opportunity type
- Search by account name
- Click to select, click again to deselect and return to empty state
- No account pre-selected on load — clean empty state by default

**Account Header**
- Six stat tiles per existing client: Signals, High Urgency, MSA (contract ceiling), 
  Spent (YTD), Utilization (% with on/behind/ahead of pace indicator), and Renewal 
  (months remaining with exact renewal date)
- Renewal color coded: green >6 months, amber 3-6 months, red <3 months
- Prospect accounts show signals and urgency only — no contract stats

**Signal Feed**
- Signals ingested from external sources: funding, press, research, hiring, competitor 
  releases, and relationship signals from email threads and call transcripts
- Internal usage signals: TAT degradation, batch rejections, utilization drops, 
  workstream stalls, and contract pace warnings
- Each signal tagged with type, source, timestamp, Risk/Opportunity classification, 
  and urgency (High / Medium / Low)
- Filter by signal type, Risk/Opportunity, and time window (Today / 7D / 30D / 90D / All)
- Helix AI signals reflect the exact account scenario from the strategy doc: $500M raise, 
  Rust SFT batch rejections, RLHF TAT slip, eval workstream stall, Clyde competitor 
  release, and Priya engagement cooling

**Outreach Generator**
- Per-signal outreach: click "Outreach ↗" on any signal card to generate a suggested 
  angle, draft email, and talking points tailored to that signal and contact
- Multi-signal outreach: check 2+ signals and click "Generate combined outreach" to 
  produce a single email weaving all signals into one cohesive narrative
- Editable To, Subject, and Body fields inline
- "Open in Gmail ↗" pre-populates a Gmail draft with recipient, subject, body, and 
  calendar booking link
- "Copy email" button with clipboard confirmation
- Regenerate button resets to template defaults with a warning tooltip

**Relationship Intel**
- "Intel" button in each account header opens the Relationship Intelligence panel
- POC profile cards per contact: what they speak to, what they want, career pattern, 
  key quote, AM engagement tip, and sentiment (Warm / Neutral / Cooling)
- Relationship dynamics section synthesizing how POCs relate to each other and what 
  it means for AfterQuery's engagement strategy
- Connected data sources panel: Gmail, Gong, Fireflies, Google Drive, Outlook, 
  DocuSign — all showing as connected with last-synced timestamps
- Relationship signals in the feed surface email response patterns, call transcript 
  quotes, and meeting note insights from connected integrations

## Stack

- React + Vite
- Tailwind CSS
- All account, signal, POC, and contract data is mocked — no external API calls

## What I'd build next

1. **Claude API for outreach and suggested angles** — replace templated outreach logic 
   with a Claude API call that reads the full account context: all signals, utilization 
   rate, POC profiles, sentiment, and contract pace before generating the angle and email. 
   This fixes the core limitation of the current MVP where the suggested angle pattern-
   matches on signal type rather than account reality
2. **Live signal ingestion** — connect to real sources via APIs: Crunchbase or PitchBook 
   for funding, LinkedIn for hiring and stakeholder changes, arXiv for research papers, 
   internal AfterQuery usage data via webhook
3. **LLM-powered POC profiles** — paste a call transcript or email thread and have the 
   model automatically update the POC profile: sentiment, key quotes, wants, and AM tips
4. **Signal deduplication and scoring** — when the same event appears across multiple 
   sources, merge and surface once with a composite urgency score
5. **CRM integration** — push outreach drafts directly to Salesforce or HubSpot with 
   one click, log signals as activities against the account
6. **Slack digest** — daily summary of high-urgency signals pushed to the AM's Slack 
   channel so nothing gets missed
7. **Mobile view** — collapse to a single-panel signal feed for AMs reviewing accounts 
   on the go

## AI tools used

Claude (claude.ai) was used throughout as a strategic and product thinking partner:
- Diagnosed the Helix AI account and structured the Part 1 strategy doc
- Defined the product concept, feature set, signal taxonomy, and data model before 
  any code was written
- Wrote and refined every Lovable prompt across the full build, including follow-up 
  prompts to correct and improve each iteration
- Drafted all mock signal data, POC profiles, relationship dynamics, and account context

Lovable was used to generate, host, and iterate on the React application from the 
prompts Claude helped structure.

## Design decisions

- Chose Customer Signals because it serves both BD and account management
- Three-panel layout keeps the full workflow in one view without context switching
- Per-signal outreach buttons let AMs act on the specific trigger rather than generating 
  generic account-level copy
- Multi-signal outreach reflects how a good AM actually operates — one well-crafted email 
  referencing multiple signals is more sophisticated than three separate emails
- Relationship Intel panel addresses the hidden risk in every account: institutional 
  knowledge living in one AM's head. Externalizing POC context and dynamics makes the 
  team more resilient to turnover
- Outreach kept templated (no LLM) for MVP to keep it fast and predictable — Claude API 
  upgrade is the first and most impactful next step
