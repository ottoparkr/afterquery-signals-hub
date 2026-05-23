# AfterQuery Signals Intelligence

A customer signals and relationship intelligence tool for AfterQuery's Customer Engagement 
and Business Development teams. Surfaces account signals, classifies them by risk and 
opportunity, generates personalized outreach, and provides deep POC relationship context 
to help AMs act faster and smarter.

## What it does

**Signal Feed**
- Displays a book of 10 (example) accounts (existing clients and prospects) in a three-panel layout
- Ingests signals from external sources: funding, press, research, hiring, competitor 
  releases, and relationship signals from email and call transcripts
- Ingests internal usage signals: TAT degradation, batch rejections, utilization drops, 
  workstream stalls
- Classifies each signal as Risk or Opportunity with urgency scoring (High / Medium / Low)
- Filter by account type, signal type, risk/opportunity, and time window 
  (Today / 7D / 30D / 90D / All)

**Outreach Generator**
- Per-signal outreach: click "Outreach ↗" on any signal to generate a suggested angle, 
  draft email, and talking points tailored to that signal and contact
- Multi-signal outreach: select 2+ signals and generate a single combined email that 
  weaves selected signals into one cohesive narrative
- Editable subject line, recipient, and email body inline
- "Open in Gmail ↗" button pre-populates a Gmail draft with the recipient, subject, 
  and body including a calendar booking link
- "Copy email" button with clipboard confirmation

**Relationship Intel**
- "Intel" button on each account opens a relationship intelligence panel
- POC profile cards per contact showing: what they speak to, what they want, career 
  pattern, key quote, AM engagement tip, and sentiment (Warm / Neutral / Cooling)
- Relationship dynamics section synthesizing how POCs relate to each other and what 
  it means for AfterQuery's engagement strategy
- Connected data sources: Gmail, Gong, Fireflies, Google Drive, Outlook, DocuSign — 
  automatically enriching POC profiles from email threads, call transcripts, meeting 
  notes, and contracts

## Stack

- React + Vite
- Tailwind CSS
- All account, signal, and POC data is mocked — no external API calls

## What I'd build next

1. **Live signal ingestion** — connect to real sources via APIs: Crunchbase or PitchBook 
   for funding, LinkedIn for hiring and stakeholder changes, arXiv for research papers, 
   internal AfterQuery usage data via webhook
2. **LLM-powered outreach** — replace templated outreach logic with a Claude API call 
   that generates truly personalized emails and talking points from the actual signal 
   content and POC profile
3. **LLM-powered POC profiles** — paste a call transcript or email thread and have the 
   model automatically update the POC profile: sentiment, key quotes, wants, and AM tips
4. **Signal deduplication and scoring** — when the same event appears across multiple 
   sources, merge and surface once with a composite urgency score
5. **CRM integration** — push outreach drafts directly to Salesforce or HubSpot with 
   one click, log signals as activities against the account
6. **Slack digest** — daily summary of high-urgency signals pushed to the AM's Slack 
   channel so nothing gets missed
7. **Mobile view** — collapse to a single-panel signal feed for AMs checking signals 
   on the go

## Time spent

~5.5 hours total across strategy doc and artifact
