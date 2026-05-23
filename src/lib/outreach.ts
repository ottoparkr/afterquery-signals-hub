import type { Account, Signal, SignalType } from "./mockData";

export interface Outreach {
  angle: string;
  emailSubject: string;
  emailBody: string;
  talkingPoints: string[];
  valueProps: string[];
}

const firstName = (full: string) => full.replace(/^(Dr\.|Col\.)\s+/, "").split(" ")[0];
const lcFirst = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);

const VALUE_PROPS_BY_TYPE: Record<SignalType, string[]> = {
  Funding: [
    "Scale your data pipeline fast — we spin up SME-vetted annotator pods in under 14 days.",
    "Convert capital into model quality: PhD-grade reasoning, code, and math data at frontier-lab volume.",
    "Dedicated training-data PM so your ML team never touches ops.",
  ],
  Press: [
    "Sustain launch momentum with data tuned to the workloads you just announced.",
    "Post-launch eval suites built by domain SMEs — see where v-next breaks before users do.",
  ],
  Research: [
    "We staff PhD-level annotators in the exact domain of your paper.",
    "Custom eval and preference datasets to close the gap your benchmark surfaced.",
    "Reasoning-trace and chain-of-thought data engineered for RLHF/RLVR pipelines.",
  ],
  Hiring: [
    "Skip the 6-month annotator-org build — we deliver an instrumented data pod next week.",
    "Flexible bench: scale SME annotators up and down without headcount risk.",
    "Your Head of Data hire focuses on strategy; we handle the throughput.",
  ],
  Usage: [
    "Root-cause TAT and rejection-rate degradation with a dedicated quality lead.",
    "Reallocate workstream capacity within 48h — we'll re-tier the pod.",
    "Expand into adjacent workstreams with reserved capacity pricing.",
  ],
  Relationship: [
    "Re-anchor the relationship with a tailored model-quality readout.",
    "Onboard new stakeholders with a 30-min AfterQuery capabilities deep-dive.",
  ],
  Competitor: [
    "Benchmark where you stand: head-to-head eval against the competitor's data quality.",
    "Capability parity in 30 days — we've shipped equivalent workstreams for 3 frontier labs.",
    "Differentiated SME pools competitors can't access (PhD biology, quant finance, TS/SCI cleared).",
  ],
};

const ANGLE_TEMPLATES: Record<SignalType, (a: Account, s: Signal) => string> = {
  Funding: (a, s) =>
    `${a.name} just unlocked fresh capital — the window to become their default training-data partner is open for the next 30–60 days before they lock in vendors. The signal ("${s.description}") points to immediate hiring + throughput pressure.`,
  Press: (a, s) =>
    `${a.name}'s public launch creates a forcing function for v-next data and eval coverage. AfterQuery can plug in within the news cycle while internal urgency is highest.`,
  Research: (a) =>
    `${a.name}'s research output exposes exactly the data bottleneck AfterQuery is built to solve. Lead with a domain-matched SME pod proposal.`,
  Hiring: (a) =>
    `${a.name} is publicly building a data org — they will buy or build in the next quarter. We sell them the "buy" option with a working pod inside 14 days.`,
  Usage: (a, s) =>
    a.tags.includes("Churn Risk")
      ? `Usage signal is a churn precursor at ${a.name}. We need an executive-level QBR motion this week with a remediation plan before the renewal conversation hardens.`
      : `${a.name} is hitting contracted capacity — perfect moment to propose an expansion SKU at favorable unit economics before they shop the workstream.`,
  Relationship: (a) =>
    `Relationship health at ${a.name} is degrading. Treat this as a save motion: surface value, re-anchor with new stakeholders, and reset the cadence before silence becomes a non-renewal.`,
  Competitor: (a, s) =>
    `Competitor pressure on ${a.name} is concrete and recent ("${s.description}"). Reach out with a defensible differentiation pitch and an offer to benchmark.`,
};

const SUBJECT_TEMPLATES: Record<SignalType, (a: Account) => string> = {
  Funding: (a) => `Congrats on the raise — quick idea for ${a.name}'s data pipeline`,
  Press: (a) => `Loved the ${a.name} launch — one thought on what comes next`,
  Research: (a) => `Your latest paper + a data idea for ${a.name}`,
  Hiring: (a) => `Saw the data roles at ${a.name} — a faster path?`,
  Usage: (a) => `Quick check-in on the ${a.name} workstream`,
  Relationship: (a) => `Reconnecting — quick update for the ${a.name} team`,
  Competitor: (a) => `A quick benchmark idea for ${a.name}`,
};

const BODY_TEMPLATES: Record<SignalType, (a: Account, s: Signal) => string> = {
  Funding: (a, s) =>
    `Hi ${firstName(a.contactName)},

Saw the news — congrats on the raise. Funding rounds at your stage usually translate into an immediate sprint on training data throughput, and that's exactly where AfterQuery plugs in.

Specifically on the signal we picked up (${s.description.toLowerCase()}), we've spun up SME-vetted annotator pods for 3 frontier labs inside 14 days. Happy to share what that ramp looked like and what it could mean for ${a.name}'s next model release.

Worth a 20-minute chat next week?

Best,
[Your name]
AfterQuery`,
  Press: (a, s) =>
    `Hi ${firstName(a.contactName)},

Big congrats on the launch — really impressive work from the ${a.name} team.

Launches like this usually trigger a wave of v-next data + eval needs. We've helped frontier labs build post-launch eval suites with domain SMEs so they can see where the next version breaks before users do. Given ${s.description.toLowerCase().replace(/\.$/, "")}, this felt like a natural moment to reach out.

Open to a quick 20 min next week?

Best,
[Your name]
AfterQuery`,
  Research: (a, s) =>
    `Hi ${firstName(a.contactName)},

Just read the recent paper out of ${a.name} — strong work, particularly on the eval methodology.

One thing stood out: ${s.description.toLowerCase()} That's the exact wedge AfterQuery is built for — PhD-grade SMEs producing reasoning traces and preference data tuned to your domain. We could put together a small pilot dataset matched to the benchmark in question.

Worth a 20-min walkthrough?

Best,
[Your name]
AfterQuery`,
  Hiring: (a, s) =>
    `Hi ${firstName(a.contactName)},

Noticed ${a.name} is hiring across the data org (${s.description.toLowerCase().replace(/\.$/, "")}). Building that internally is a 6-month exercise; AfterQuery typically stands up an instrumented pod inside two weeks so your incoming Head of Data can focus on strategy instead of ops.

Happy to share how we've done this with similar labs. 20 minutes next week?

Best,
[Your name]
AfterQuery`,
  Usage: (a, s) =>
    `Hi ${firstName(a.contactName)},

Wanted to flag what we're seeing on the ${a.name} workstream: ${s.description.toLowerCase()}

I'd like to walk you through a concrete remediation plan and, separately, a couple of adjacent workstreams where we think we can move the needle. Can we grab 30 minutes this week?

Best,
[Your name]
AfterQuery`,
  Relationship: (a) =>
    `Hi ${firstName(a.contactName)},

Wanted to reconnect — it's been a few weeks since we synced, and I want to make sure we're still aligned on what's most valuable to the ${a.name} team going into the next quarter.

I have a short readout on workstream quality and a couple of expansion ideas. Could we grab 25 minutes this week?

Best,
[Your name]
AfterQuery`,
  Competitor: (a, s) =>
    `Hi ${firstName(a.contactName)},

You probably saw this already — ${s.description.toLowerCase()} Wanted to reach out proactively.

We've run head-to-head data-quality benchmarks for labs in similar situations and have a clear point of view on where AfterQuery's SME pools differentiate (and where we'd recommend you double down). Happy to share the benchmark methodology + initial read.

Worth 20 minutes?

Best,
[Your name]
AfterQuery`,
};

const TALKING_POINTS: Record<SignalType, (a: Account, s: Signal) => string[]> = {
  Funding: (a) => [
    `Reference the raise and tie it to a concrete throughput target for ${a.name}'s next model release.`,
    `Offer a 14-day pod stand-up with named SMEs in their domain.`,
    `Propose reserved-capacity pricing locked at pre-growth rates.`,
    `Share 2 frontier-lab case studies with similar post-raise ramps.`,
    `Ask: who owns the training data buy decision now that headcount is expanding?`,
  ],
  Press: (a) => [
    `Congratulate on the launch; mirror the specific capability they shipped.`,
    `Propose a post-launch eval suite scoped to the new capability.`,
    `Identify 1–2 data gaps that typically show up 30–60 days after a launch like this.`,
    `Offer a 2-week pilot with a domain SME pod.`,
    `Ask about the v-next roadmap and where they expect the data bottleneck.`,
  ],
  Research: (a, s) => [
    `Cite the paper specifically and the bottleneck it surfaces.`,
    `Map AfterQuery SME pools to the exact domain (${a.description.toLowerCase()}).`,
    `Offer a small paid pilot dataset matched to the benchmark in the paper.`,
    `Walk through reasoning-trace and preference-data methodology.`,
    `Ask if they're planning a follow-up — and whether data is on the critical path.`,
  ],
  Hiring: (a) => [
    `Reference the specific roles posted at ${a.name}.`,
    `Frame AfterQuery as the "buy" option vs the 6-month internal build.`,
    `Offer to bridge: deliver throughput now, transition to internal team later.`,
    `Share metrics: time-to-first-batch, SME ramp time, quality benchmarks.`,
    `Ask whether the Head of Data role is filled yet — and who is making vendor decisions in the interim.`,
  ],
  Usage: (a, s) => [
    `Open with transparency: own the signal (${s.description.split(".")[0]}).`,
    `Present a concrete 2-week remediation plan with named quality lead.`,
    `Quantify expected impact on TAT, rejection rate, and throughput.`,
    `Pivot to adjacent workstream expansion before the renewal conversation.`,
    `Confirm renewal timeline and surface any blockers early.`,
  ],
  Relationship: (a) => [
    `Acknowledge the silence without making it awkward.`,
    `Surface 1 concrete win from the last 30 days of work.`,
    `Re-introduce AfterQuery to any new stakeholders.`,
    `Propose a refreshed cadence (monthly QBR + weekly ops).`,
    `Ask what success looks like for ${a.name} in the next quarter.`,
  ],
  Competitor: (a, s) => [
    `Acknowledge the competitor move without disparaging.`,
    `Offer a head-to-head data-quality benchmark with clear methodology.`,
    `Lean on AfterQuery's differentiated SME pools (PhD, cleared, niche domain).`,
    `Share a case study where we won a similar bake-off.`,
    `Ask which capability they feel most exposed on — and offer a 2-week proof.`,
  ],
};

export function generateOutreach(account: Account, signal: Signal): Outreach {
  return {
    angle: ANGLE_TEMPLATES[signal.type](account, signal),
    emailSubject: SUBJECT_TEMPLATES[signal.type](account),
    emailBody: BODY_TEMPLATES[signal.type](account, signal),
    talkingPoints: TALKING_POINTS[signal.type](account, signal),
    valueProps: VALUE_PROPS_BY_TYPE[signal.type],
  };
}

// Account-level outreach picks the highest-urgency, most-recent signal
export function generateAccountOutreach(account: Account, signals: Signal[]): Outreach | null {
  if (signals.length === 0) return null;
  const urgencyRank = { High: 3, Medium: 2, Low: 1 } as const;
  const top = [...signals].sort((a, b) => {
    const ur = urgencyRank[b.urgency] - urgencyRank[a.urgency];
    if (ur !== 0) return ur;
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
  })[0];
  return generateOutreach(account, top);
}
