export type Sentiment = "Warm" | "Neutral" | "Cooling";

export interface POC {
  name: string;
  role: string;
  tenure: string;
  speaksTo: string;
  wants: string;
  careerPattern: string;
  keyQuote: string;
  amTip: string;
  sentiment: Sentiment;
}

export interface AccountIntel {
  pocs: POC[];
  dynamics: string;
}

export const accountIntel: Record<string, AccountIntel> = {
  helix: {
    pocs: [
      {
        name: "Priya Shah",
        role: "Head of Post-Training",
        tenure: "14 months",
        speaksTo: "Model performance outcomes and delivery accountability",
        wants: "A reliable data partner she does not have to babysit",
        careerPattern: "Operator who moved from research — values rigor but thinks in shipping timelines",
        keyQuote: "I don't need updates, I need the work to be right the first time.",
        amTip: "Lead with what changed and why it won't happen again. She responds to accountability, not relationship warmth.",
        sentiment: "Cooling",
      },
      {
        name: "Marcus Liu",
        role: "ML Engineer, SFT",
        tenure: "22 months",
        speaksTo: "Annotator quality and technical precision on language-specific tasks",
        wants: "Batches he can approve without three rounds of back and forth",
        careerPattern: "IC engineer who owns quality end-to-end — treats rejected batches as a personal signal about the vendor",
        keyQuote: "Rust isn't Python. The annotators need to actually know the idioms.",
        amTip: "Get Michael to do a live technical walkthrough with him. Marcus respects depth over process.",
        sentiment: "Cooling",
      },
      {
        name: "Dani Okafor",
        role: "Research Lead, Evals",
        tenure: "6 weeks",
        speaksTo: "Benchmark integrity and eval coverage that reflects real model behavior",
        wants: "To establish her eval roadmap and find partners who can execute on it fast",
        careerPattern: "Safety researcher (NVIDIA) transitioning to applied evals — thinks in failure modes and edge cases",
        keyQuote: "I want evals that actually surface where the model breaks, not evals that make it look good.",
        amTip: "Do not pitch AfterQuery's catalog. Ask about her roadmap first. She will tell you exactly what she needs if you listen.",
        sentiment: "Warm",
      },
    ],
    dynamics:
      "Priya holds budget authority and signed the deal, but Marcus controls day-to-day quality perception. A deteriorating relationship with Marcus directly affects Priya's confidence in AfterQuery even if she does not say so. Dani is currently independent of both — she is building her own view of vendors from scratch. The fastest path to account health is resolving Marcus's quality concerns visibly, then using that resolution as the entry point with Dani before Priya's renewal conversation.",
  },

  meridian: {
    pocs: [
      {
        name: "Marcus Chen",
        role: "VP Research Operations",
        tenure: "3 years",
        speaksTo: "Throughput, predictability, and not having to explain vendor problems upward",
        wants: "To stop being the person fielding complaints about trajectory eval delays",
        careerPattern: "Long-tenure ops leader — political, risk-averse, will quietly replace a vendor before escalating",
        keyQuote: "I shouldn't have to be in the loop on TAT. That's what I'm paying for.",
        amTip: "Do not ask for a meeting to 'check in.' Bring a concrete remediation plan with named owners and dates, then ask for 15 minutes to walk through it.",
        sentiment: "Cooling",
      },
      {
        name: "Rohan Mehta",
        role: "Senior Research Engineer, Agents",
        tenure: "18 months",
        speaksTo: "Trajectory quality, edge-case coverage, agent failure taxonomy",
        wants: "A vendor that understands long-horizon agent eval is not the same as RLHF",
        careerPattern: "Research-adjacent engineer who reviews batches personally — Scale's pitch is landing with him right now",
        keyQuote: "If the trajectories don't capture tool-use failures, the eval is useless to us.",
        amTip: "He is the person Scale is selling to. Get in front of him this week with a worked example on a real failure mode.",
        sentiment: "Cooling",
      },
    ],
    dynamics:
      "Sarah Kim was the relationship anchor and she is gone. Marcus has retreated because he no longer has a trusted internal advocate validating AfterQuery's work, and Rohan is being actively courted by Scale. The account is at acute risk: without a visible quality reset in the next two weeks, Marcus will quietly approve a Scale pilot. Re-anchor on Rohan first with technical depth — he is the one who can keep the account alive long enough to rebuild Marcus's trust.",
  },

  synthos: {
    pocs: [
      {
        name: "Elena Volkov",
        role: "Director of Model Training",
        tenure: "2 years",
        speaksTo: "Training data scale, video annotation throughput, hitting V3 milestones",
        wants: "To lock in expanded capacity before the V3 launch creates a data crunch",
        careerPattern: "Builder who scaled the data org from 2 to 40 — moves fast, decides fast, expects vendors to keep up",
        keyQuote: "V3 ships in Q1 whether the data is ready or not. Tell me what you can deliver, not what you'd like to.",
        amTip: "Bring a concrete capacity proposal with pricing on the first call. She will not engage with discovery questions.",
        sentiment: "Warm",
      },
      {
        name: "Tomás Ribeiro",
        role: "Head of Multimodal Data Ops",
        tenure: "4 months",
        speaksTo: "Annotator specialization for long-form video, QA workflows, cost per labeled hour",
        wants: "To prove out his function with a clean V3 data pipeline win",
        careerPattern: "Came from YouTube Trust & Safety — knows video annotation deeply, building reputation internally",
        keyQuote: "I'm new here. The first pipeline I stand up needs to work.",
        amTip: "Make him look good. Offer to co-design the long-video annotation spec with him; he will champion AfterQuery internally if you do.",
        sentiment: "Warm",
      },
    ],
    dynamics:
      "Elena owns the budget and the urgency; Tomás owns the operational detail. They are aligned and motivated. The risk is not the relationship — it is moving too slowly. If AfterQuery is not the first vendor with a concrete V3 capacity proposal in their inbox this month, a competitor will define the deal shape.",
  },

  arclight: {
    pocs: [
      {
        name: "James O'Sullivan",
        role: "Head of Post-Training",
        tenure: "11 months",
        speaksTo: "Reasoning model performance, benchmark wins, where the next training run goes",
        wants: "A math-reasoning data pipeline ready before the next training run kicks off",
        careerPattern: "Ex-DeepMind researcher — competitive, benchmark-driven, will switch vendors mid-program to win a leaderboard",
        keyQuote: "We're 12 points behind on math. I don't care how we close that gap, I care that we do.",
        amTip: "Pitch math-reasoning capacity now — he is actively scoping. The code-reasoning stall is a separate conversation; do not conflate them.",
        sentiment: "Neutral",
      },
      {
        name: "Priya Anand",
        role: "Director of Eval",
        tenure: "3 weeks",
        speaksTo: "Eval rigor, contamination, benchmark integrity",
        wants: "To stand up an internal eval function that the research team trusts",
        careerPattern: "Eval lead from Anthropic — opinionated about methodology, skeptical of vendors by default",
        keyQuote: "Most vendor evals are theater. Show me your contamination methodology before we talk about scope.",
        amTip: "She is new and forming first impressions. Send her the methodology doc, not the sales deck. Earn credibility before asking for scope.",
        sentiment: "Neutral",
      },
    ],
    dynamics:
      "The code-reasoning stall reads like churn but is actually a pivot — James is reallocating budget to the math run. Priya is a new gatekeeper who will shape how all future eval work gets scoped. The play is to land the math-reasoning expansion with James while building methodology credibility with Priya in parallel, so the eval workstream becomes the next expansion conversation rather than a procurement review.",
  },

  vanta: {
    pocs: [
      {
        name: "Aisha Patel",
        role: "Data Lead",
        tenure: "16 months",
        speaksTo: "Open-source values, alignment data quality, transparent methodology",
        wants: "A data partner whose values align with Vanta's open-weight mission",
        careerPattern: "Academic background (CMU NLP) — cares about methodology being publishable, not just delivered",
        keyQuote: "If we can't describe how the data was collected in a paper, we can't use it.",
        amTip: "Lead with methodology and provenance. Pricing and capacity are secondary — get the approach right first.",
        sentiment: "Warm",
      },
      {
        name: "Eitan Gross",
        role: "Safety Research Lead",
        tenure: "8 months",
        speaksTo: "Red-team coverage, adversarial prompts, safety-eval rigor",
        wants: "Red-team data that surfaces real failure modes, not synthetic ones",
        careerPattern: "Ex-Redwood Research — deeply technical, dismissive of generic safety pitches",
        keyQuote: "I don't want generic red-team prompts. I want adversarial coverage of our actual deployment surface.",
        amTip: "Bring a worked sample of red-team prompts targeted at Vanta's specific model behavior before the first call.",
        sentiment: "Warm",
      },
    ],
    dynamics:
      "Aisha and Eitan are aligned and both technically opinionated. The account will expand if AfterQuery can credibly speak to methodology and safety depth — the recent funding is earmarked exactly for this. The risk is showing up with a generic enterprise pitch; that will close both doors at once.",
  },

  quantum: {
    pocs: [
      {
        name: "Daniel Reyes",
        role: "Co-founder & CTO",
        tenure: "Founder",
        speaksTo: "Long-horizon planning, agent trajectories, the research vision",
        wants: "A data partner who can help him build the data org he does not yet have",
        careerPattern: "Ex-OpenAI researcher turned founder — visionary, but does not yet have ops infrastructure",
        keyQuote: "We just raised. I need to figure out the data side before I hire the wrong person to lead it.",
        amTip: "Position as a strategic partner, not a vendor. Offer to scope what an in-house data function should look like alongside what AfterQuery handles.",
        sentiment: "Warm",
      },
    ],
    dynamics:
      "Quantum has no data org yet — Daniel is the entire buying committee. This is a window of 4-6 weeks before he hires a Head of Training Data who will impose their own vendor preferences. The right move is to embed now, help shape the org design, and lock in a multi-quarter contract before that hire is made.",
  },

  orbital: {
    pocs: [
      {
        name: "Sophia Lindqvist",
        role: "VP Engineering",
        tenure: "10 months",
        speaksTo: "Shipping v2 fast, real-world data pipeline reliability, robot fleet uptime",
        wants: "Teleoperation data at scale without standing up the ops in-house",
        careerPattern: "Robotics-first engineer (ex-Boston Dynamics) — pragmatic, allergic to anything that slows velocity",
        keyQuote: "The viral demo bought us six months. We need to ship v2 inside that window.",
        amTip: "Lead with throughput and timeline. Methodology conversations come later — she wants to know what you can stand up next week.",
        sentiment: "Warm",
      },
    ],
    dynamics:
      "Orbital is in execution mode under time pressure, and Physical Intelligence's Scale partnership is a forcing function. Sophia is the single decision-maker right now. The opening is operational — show up with a 30-day teleoperation pilot plan and a credible path to scale, and the deal closes itself.",
  },

  stratos: {
    pocs: [
      {
        name: "Col. Robert Hayes (ret.)",
        role: "Chief AI Officer",
        tenure: "8 months",
        speaksTo: "Mission requirements, contract timelines, cleared-personnel logistics",
        wants: "A cleared data partner who can deliver inside the 9-month DoD window",
        careerPattern: "Career military turned defense exec — process-driven, expects clearance and compliance discussed upfront",
        keyQuote: "If your annotators aren't cleared, this conversation is short.",
        amTip: "Lead with clearance posture and FedRAMP status. He will not engage on capability before compliance is established.",
        sentiment: "Neutral",
      },
    ],
    dynamics:
      "Stratos is a single-buyer deal anchored on a hard DoD deadline. Clearance and compliance are the gating questions — capability comes second. If AfterQuery can credibly speak to TS/SCI annotator capacity, this is a fast-moving deal. If not, do not waste cycles.",
  },

  deepform: {
    pocs: [
      {
        name: "Dr. Yuki Tanaka",
        role: "Head of ML",
        tenure: "2 years",
        speaksTo: "Computational biology, protein design model accuracy, wet-lab feedback loops",
        wants: "Annotation throughput from people who actually understand protein structure",
        careerPattern: "PhD computational biologist — only respects vendors who can speak the science",
        keyQuote: "Most labelers can't tell a hydrogen bond from a hyperlink. That's the bottleneck.",
        amTip: "Bring a domain-expert annotator on the first call. Generalist sales conversations will end the relationship.",
        sentiment: "Warm",
      },
    ],
    dynamics:
      "Deepform is a domain-credibility deal. Yuki is the only decision-maker and she will judge AfterQuery on the first technical interaction. If the team that shows up can speak protein design fluently, this expands quickly. If not, no amount of pricing will recover the meeting.",
  },

  nexus: {
    pocs: [
      {
        name: "Olivia Brennan",
        role: "SVP Product",
        tenure: "14 months",
        speaksTo: "Enterprise finance workflows, agent accuracy on regulated tasks, design-partner momentum",
        wants: "SME annotators (CFA/CPA) at a pace that keeps up with the JPMorgan rollout",
        careerPattern: "Ex-Palantir PM — relationship-driven, expects vendors to operate like an extension of her team",
        keyQuote: "JPMorgan watches everything. One bad agent response and the design partnership is over.",
        amTip: "Treat this as a co-pilot relationship. She will share roadmap freely with vendors she trusts; lead with how AfterQuery integrates into her weekly cadence.",
        sentiment: "Warm",
      },
    ],
    dynamics:
      "Nexus is racing Hebbia for the same enterprise finance segment, and JPMorgan is the proof point both sides need. Olivia controls the buying decision and is open to a deep partnership — but only with vendors who treat the relationship as strategic, not transactional. Speed and SME quality are the two axes the deal turns on.",
  },
};
