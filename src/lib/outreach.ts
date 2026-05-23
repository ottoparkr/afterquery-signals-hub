import type { Account, Signal, SignalType } from "./mockData";

export interface Outreach {
  angle: string;
  emailSubject: string;
  emailBody: string;
  talkingPoints: string[];
  valueProps: string[];
}

const firstName = (full: string) => full.replace(/^(Dr\.|Col\.)\s+/, "").split(" ")[0];

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

const CALENDAR_LINE = `📅 Book a 25-minute call: https://calendly.com/afterquery/intro`;

const BODY_TEMPLATES: Record<SignalType, (a: Account, s: Signal) => string> = {
  Funding: (a, s) =>
    `Hi ${firstName(a.contactName)},

Saw the news — congrats on the raise. Funding rounds at your stage usually translate into an immediate sprint on training data throughput, and that's exactly where AfterQuery plugs in.

Specifically on the signal we picked up (${s.description}), we've spun up SME-vetted annotator pods for 3 frontier labs inside 14 days. Happy to share what that ramp looked like and what it could mean for ${a.name}'s next model release.

Worth a 20-minute chat next week?

${CALENDAR_LINE}

Best,
[Your name]
AfterQuery`,
  Press: (a, s) =>
    `Hi ${firstName(a.contactName)},

Big congrats on the launch — really impressive work from the ${a.name} team.

Launches like this usually trigger a wave of v-next data + eval needs. We've helped frontier labs build post-launch eval suites with domain SMEs so they can see where the next version breaks before users do. Given ${s.description.replace(/\.$/, "")}, this felt like a natural moment to reach out.

Open to a quick 20 min next week?

${CALENDAR_LINE}

Best,
[Your name]
AfterQuery`,
  Research: (a, s) =>
    `Hi ${firstName(a.contactName)},

Just read the recent paper out of ${a.name} — strong work, particularly on the eval methodology.

One thing stood out: ${s.description} That's the exact wedge AfterQuery is built for — PhD-grade SMEs producing reasoning traces and preference data tuned to your domain. We could put together a small pilot dataset matched to the benchmark in question.

Worth a 20-min walkthrough?

${CALENDAR_LINE}

Best,
[Your name]
AfterQuery`,
  Hiring: (a, s) =>
    `Hi ${firstName(a.contactName)},

Noticed ${a.name} is hiring across the data org (${s.description.replace(/\.$/, "")}). Building that internally is a 6-month exercise; AfterQuery typically stands up an instrumented pod inside two weeks so your incoming Head of Data can focus on strategy instead of ops.

Happy to share how we've done this with similar labs. 20 minutes next week?

${CALENDAR_LINE}

Best,
[Your name]
AfterQuery`,
  Usage: (a, s) =>
    `Hi ${firstName(a.contactName)},

Wanted to flag what we're seeing on the ${a.name} workstream: ${s.description}

I'd like to walk you through a concrete remediation plan and, separately, a couple of adjacent workstreams where we think we can move the needle. Can we grab 30 minutes this week?

${CALENDAR_LINE}

Best,
[Your name]
AfterQuery`,
  Relationship: (a) =>
    `Hi ${firstName(a.contactName)},

Wanted to reconnect — it's been a few weeks since we synced, and I want to make sure we're still aligned on what's most valuable to the ${a.name} team going into the next quarter.

I have a short readout on workstream quality and a couple of expansion ideas. Could we grab 25 minutes this week?

${CALENDAR_LINE}

Best,
[Your name]
AfterQuery`,
  Competitor: (a, s) =>
    `Hi ${firstName(a.contactName)},

You probably saw this already — ${s.description} Wanted to reach out proactively.

We've run head-to-head data-quality benchmarks for labs in similar situations and have a clear point of view on where AfterQuery's SME pools differentiate (and where we'd recommend you double down). Happy to share the benchmark methodology + initial read.

Worth 20 minutes?

${CALENDAR_LINE}

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

function buildCombinedAngle(account: Account, sorted: Signal[]): string {
  const types = new Set(sorted.map((s) => s.type));
  const hasFunding = types.has("Funding");
  const hasUsage = types.has("Usage");
  const hasHiring = types.has("Hiring");
  const hasResearch = types.has("Research");
  const hasPress = types.has("Press");
  const hasCompetitor = types.has("Competitor");
  const hasRelationship = types.has("Relationship");
  const hasRisk = sorted.some((s) => s.classification === "Risk");

  let lead: string;
  if (hasFunding && hasUsage) {
    lead = `${account.name} has fresh capital landing at the same moment their existing workstreams are hitting contracted ceilings — budget capacity and immediate data need are aligned in a way that rarely lines up this cleanly.`;
  } else if (hasFunding && hasHiring) {
    lead = `${account.name} is deploying fresh capital straight into a data-org build — the buy-vs-build decision is live right now, and the window to be the "buy" is measured in weeks, not quarters.`;
  } else if (hasUsage && hasRisk) {
    lead = `Workstream health at ${account.name} is degrading at the same time other signals are stacking up — this is a save motion first and an expansion conversation second, and the order matters.`;
  } else if (hasPress && hasHiring) {
    lead = `${account.name} just shipped publicly and is staffing up to sustain the momentum — they need v-next data and eval coverage faster than they can build the team to produce it.`;
  } else if (hasResearch && hasHiring) {
    lead = `${account.name}'s own research is naming the data bottleneck while they hire against it — we can show up with the exact capability they're trying to build internally.`;
  } else if (hasCompetitor && (hasFunding || hasPress)) {
    lead = `${account.name} is under concrete competitive pressure right as they have the resources to respond — the conversation is about helping them defend a position, not pitching a new one.`;
  } else if (hasRelationship && hasRisk) {
    lead = `Relationship signals at ${account.name} are trending the wrong way alongside operational ones — re-anchoring with the right stakeholders has to happen before any commercial conversation lands.`;
  } else if (hasFunding) {
    lead = `${account.name} just unlocked new capital and the surrounding signals all point to the same thing: they're about to make vendor decisions that will hold for the next 12 months.`;
  } else {
    lead = `Multiple independent signals at ${account.name} are converging on the same underlying story — their data needs are growing faster than their internal capacity to meet them.`;
  }

  let pitch: string;
  if (hasRisk && !hasFunding) {
    pitch = `The pitch is a credible remediation plan paired with a clear path to expansion once trust is rebuilt — not a new SOW.`;
  } else if (hasFunding || hasPress) {
    pitch = `The pitch is straightforward: AfterQuery can scale with them right now, across the workstreams that are already proving out, without the six-month internal ramp.`;
  } else if (hasHiring) {
    pitch = `The pitch is the "buy" option — an instrumented pod in two weeks while their incoming hires focus on strategy instead of ops.`;
  } else {
    pitch = `The pitch is a single coordinated engagement across these threads rather than chasing each one separately.`;
  }

  return `${lead} ${pitch}`;
}

// Combined outreach across multiple selected signals

export function generateMultiOutreach(account: Account, signals: Signal[]): Outreach | null {
  if (signals.length === 0) return null;
  if (signals.length === 1) return generateOutreach(account, signals[0]);

  const sorted = [...signals].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  const types = Array.from(new Set(sorted.map((s) => s.type)));

  const angle = buildCombinedAngle(account, sorted);


  const emailSubject = `A few things on our radar for ${account.name}`;

  const bullets = sorted.map((s) => `• ${s.type}: ${s.description.replace(/\.$/, "")}`).join("\n");
  const emailBody = `Hi ${firstName(account.contactName)},

A handful of signals on the ${account.name} side have stacked up over the last few weeks, and I wanted to put them in front of you together rather than in separate threads:

${bullets}

Individually, any one of these is worth a conversation. Together, they suggest a clear window for AfterQuery to step in with a coordinated plan — SME-vetted annotator pods, tailored eval coverage, and a single point of contact across workstreams.

Worth a 25-minute walkthrough next week?

${CALENDAR_LINE}

Best,
[Your name]
AfterQuery`;

  const talkingPoints = [
    `Open by naming the pattern: ${types.join(", ")} signals all landing in the same window.`,
    `Walk through each signal briefly and connect it to a concrete AfterQuery motion.`,
    `Propose one coordinated plan rather than ${sorted.length} separate workstreams.`,
    `Identify the single decision-maker who can greenlight a combined engagement.`,
    `Close on a 2-week pilot scoped to the highest-urgency signal.`,
  ];

  const valueProps = Array.from(
    new Set(types.flatMap((t) => VALUE_PROPS_BY_TYPE[t].slice(0, 1)))
  );

  return { angle, emailSubject, emailBody, talkingPoints, valueProps };
}
