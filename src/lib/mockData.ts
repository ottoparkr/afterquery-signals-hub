export type AccountType = "Existing Client" | "Prospect";
export type AccountTag = "Churn Risk" | "Expansion Opportunity" | "New Opportunity";
export type SignalType = "Funding" | "Press" | "Research" | "Hiring" | "Usage" | "Relationship" | "Competitor";
export type Classification = "Risk" | "Opportunity";
export type Urgency = "High" | "Medium" | "Low";

export interface Signal {
  id: string;
  accountId: string;
  type: SignalType;
  source: string;
  timestamp: string; // ISO
  description: string;
  classification: Classification;
  urgency: Urgency;
}

export interface Account {
  id: string;
  name: string;
  description: string;
  type: AccountType;
  tags: AccountTag[];
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contractValue?: number; // YTD spent (existing clients only)
  contractCeiling?: number; // total MSA value
  contractStart?: string; // ISO date contract started
  renewalMonths?: number; // months until renewal
}

const daysAgo = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(d.getHours() - Math.floor(Math.random() * 12));
  return d.toISOString();
};

const monthsAgo = (n: number) => {
  const d = new Date();
  d.setMonth(d.getMonth() - n);
  return d.toISOString();
};

export const accounts: Account[] = [
  {
    id: "helix",
    name: "Helix AI",
    description: "Code-gen foundation model lab focused on developer tooling",
    type: "Existing Client",
    tags: ["Expansion Opportunity"],
    contactName: "Priya Shah",
    contactRole: "Head of Post-Training",
    contactEmail: "priya.shah@helixai.com",
    contractValue: 480_000,
    contractCeiling: 2_000_000,
    contractStart: monthsAgo(8),
    renewalMonths: 4,
  },

  {
    id: "meridian",
    name: "Meridian Labs",
    description: "Long-horizon agent research lab",
    type: "Existing Client",
    tags: ["Churn Risk"],
    contactName: "Marcus Chen",
    contactRole: "VP Research Operations",
    contactEmail: "marcus.chen@meridianlabs.com",
    contractValue: 1_800_000,
    contractCeiling: 2_200_000,
    contractStart: monthsAgo(10),
    renewalMonths: 2,
  },
  {
    id: "synthos",
    name: "Synthos",
    description: "Multimodal video understanding models",
    type: "Existing Client",
    tags: ["Expansion Opportunity"],
    contactName: "Elena Volkov",
    contactRole: "Director of Model Training",
    contactEmail: "elena.volkov@synthos.com",
    contractValue: 950_000,
    contractCeiling: 1_200_000,
    contractStart: monthsAgo(8),
    renewalMonths: 2,
  },
  {
    id: "arclight",
    name: "Arclight AI",
    description: "Frontier reasoning models for code and math",
    type: "Existing Client",
    tags: ["Churn Risk", "Expansion Opportunity"],
    contactName: "James O'Sullivan",
    contactRole: "Head of Post-Training",
    contactEmail: "james.osullivan@arclightai.com",
    contractValue: 3_100_000,
    contractCeiling: 4_000_000,
    contractStart: monthsAgo(9),
    renewalMonths: 3,
  },
  {
    id: "vanta",
    name: "Vanta Research",
    description: "Open-weight model lab with focus on alignment",
    type: "Existing Client",
    tags: ["Expansion Opportunity"],
    contactName: "Aisha Patel",
    contactRole: "Data Lead",
    contactEmail: "aisha.patel@vantaresearch.com",
    contractValue: 620_000,
    contractCeiling: 800_000,
    contractStart: monthsAgo(7),
    renewalMonths: 5,
  },
  {
    id: "quantum",
    name: "Quantum Minds",
    description: "Stealth-mode AGI lab, Series B",
    type: "Prospect",
    tags: ["New Opportunity"],
    contactName: "Daniel Reyes",
    contactRole: "Co-founder & CTO",
    contactEmail: "daniel.reyes@quantumminds.com",
  },
  {
    id: "orbital",
    name: "Orbital ML",
    description: "Robotics foundation models for warehouse automation",
    type: "Prospect",
    tags: ["New Opportunity"],
    contactName: "Sophia Lindqvist",
    contactRole: "VP Engineering",
    contactEmail: "sophia.lindqvist@orbitalml.com",
  },
  {
    id: "stratos",
    name: "Stratos AI",
    description: "Defense-focused multimodal intelligence platform",
    type: "Prospect",
    tags: ["New Opportunity"],
    contactName: "Col. Robert Hayes (ret.)",
    contactRole: "Chief AI Officer",
    contactEmail: "robert.hayes@stratosai.com",
  },
  {
    id: "deepform",
    name: "Deepform",
    description: "Generative protein design models",
    type: "Prospect",
    tags: ["New Opportunity"],
    contactName: "Dr. Yuki Tanaka",
    contactRole: "Head of ML",
    contactEmail: "yuki.tanaka@deepform.com",
  },
  {
    id: "nexus",
    name: "Nexus Intelligence",
    description: "Enterprise AI agents for financial services",
    type: "Prospect",
    tags: ["New Opportunity"],
    contactName: "Olivia Brennan",
    contactRole: "SVP Product",
    contactEmail: "olivia.brennan@nexusintel.com",
  },
];

let sid = 0;
const s = (data: Omit<Signal, "id">): Signal => ({ id: `s${++sid}`, ...data });

export const signals: Signal[] = [
  // Helix AI — existing, expansion (code-gen)
  s({
    accountId: "helix",
    type: "Funding",
    source: "TechCrunch",
    timestamp: daysAgo(2),
    description:
      "Helix AI closed a $500M Series B led by Founders Fund to scale code-gen model training and developer tooling.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "helix",
    type: "Hiring",
    source: "Job Board",
    timestamp: daysAgo(5),
    description:
      "Posted 9 new roles for senior engineer annotators (code review SMEs) and a Lead for RLHF code-review pipelines.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "helix",
    type: "Research",
    source: "arXiv",
    timestamp: daysAgo(11),
    description:
      "Published paper on code-completion eval where their model trails Claude on multi-file refactor tasks by 11 pts.",
    classification: "Opportunity",
    urgency: "Medium",
  }),
  s({
    accountId: "helix",
    type: "Competitor",
    source: "Twitter / X",
    timestamp: daysAgo(4),
    description:
      "Clyde released a major new version that engineering managers are publicly praising for code review quality. Directly threatens Helix's RLHF-for-code-review workstream value proposition.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "helix",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(5),
    description:
      "RLHF preference data workstream TAT has slipped from 5 days to 9 days over the last 3 weeks. Workstream is at 54% of contracted volume with renewal in 4 months.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "helix",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(6),
    description:
      "Eval set construction workstream is at 30% of contracted volume and has seen zero new batch activity in 6 weeks. New Research Lead Dani Okafor owns this workstream and has never been introduced to AfterQuery.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "helix",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(7),
    description:
      "SFT workstream for Python, TypeScript, and Rust code completion is at 92% of contracted volume and on pace. However Rust batches have been rejected 3 times in the last 30 days due to annotator calibration gaps on language-specific idioms.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "helix",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(1),
    description:
      "At current spend rate of ~$60K/month, Helix will reach approximately $720K by renewal — 36% of the $2M MSA ceiling. Contract is severely behind pace. Significant workstream expansion required to justify renewal at current contract value.",
    classification: "Risk",
    urgency: "High",
  }),

  // Meridian — churn risk
  s({
    accountId: "meridian",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(1),
    description:
      "TAT on agent trajectory eval batches degraded from 3.2 → 6.8 days over last 3 weeks. Batch rejection rate at 14%.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "meridian",
    type: "Relationship",
    source: "LinkedIn",
    timestamp: daysAgo(7),
    description: "Champion Sarah Kim (former Data Lead) departed to OpenAI. New stakeholder unconfirmed.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "meridian",
    type: "Relationship",
    source: "Internal CRM",
    timestamp: daysAgo(14),
    description:
      "Marcus Chen has not responded to last 3 weekly syncs. Slack activity in shared channel dropped to zero.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "meridian",
    type: "Competitor",
    source: "The Information",
    timestamp: daysAgo(9),
    description: "Scale AI announced expanded agent-trajectory offering with Meridian named as design partner.",
    classification: "Risk",
    urgency: "Medium",
  }),
  s({
    accountId: "meridian",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(2),
    description:
      "Meridian is at 82% of contract ceiling with 2 months remaining and delivery issues unresolved. Renewal conversation is imminent and at risk. No expansion headroom — focus is retention.",
    classification: "Risk",
    urgency: "High",
  }),

  // Synthos — expansion
  s({
    accountId: "synthos",
    type: "Press",
    source: "Synthos Blog",
    timestamp: daysAgo(4),
    description: "Announced Synthos V3 with native long-video understanding (up to 2 hours of context).",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "synthos",
    type: "Funding",
    source: "Bloomberg",
    timestamp: daysAgo(18),
    description: "Raised $180M Series B extension at $1.6B valuation, doubling training compute budget.",
    classification: "Opportunity",
    urgency: "Medium",
  }),
  s({
    accountId: "synthos",
    type: "Hiring",
    source: "Job Board",
    timestamp: daysAgo(8),
    description: "Hiring 6 video-annotation specialists and a Head of Multimodal Data Operations.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "synthos",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(6),
    description: "Burn rate on current contract puts them at 100% utilization 7 weeks before renewal.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "synthos",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(3),
    description:
      "Synthos is on pace to hit 100% contract utilization 7 weeks before renewal. Expansion proposal needed now to capture incremental spend before they look elsewhere.",
    classification: "Opportunity",
    urgency: "High",
  }),

  // Arclight — churn risk + expansion
  s({
    accountId: "arclight",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(2),
    description: "Code-reasoning workstream stalled — zero new batches submitted in 11 days after running at 200/week.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "arclight",
    type: "Press",
    source: "Arclight Blog",
    timestamp: daysAgo(6),
    description:
      "Released Arclight-R2, a new reasoning model topping LiveCodeBench. Math reasoning still 12 pts behind GPT-5.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "arclight",
    type: "Hiring",
    source: "LinkedIn",
    timestamp: daysAgo(10),
    description: "Posted Head of Math Reasoning Data role — signals upcoming math-focused training run.",
    classification: "Opportunity",
    urgency: "Medium",
  }),
  s({
    accountId: "arclight",
    type: "Relationship",
    source: "Internal CRM",
    timestamp: daysAgo(13),
    description: "New stakeholder, Priya Anand (Director of Eval), added to account from buyer side.",
    classification: "Opportunity",
    urgency: "Medium",
  }),
  s({
    accountId: "arclight",
    type: "Competitor",
    source: "TechCrunch",
    timestamp: daysAgo(20),
    description: "Surge AI announced new code-reasoning data product with case study from rival lab.",
    classification: "Risk",
    urgency: "Medium",
  }),
  s({
    accountId: "arclight",
    type: "Usage",
    source: "Internal Usage Data",
    timestamp: daysAgo(2),
    description:
      "Arclight has used 78% of ceiling with 3 months remaining but workstream stalled 11 days ago. Without reactivation, renewal conversation will be difficult to anchor above current value.",
    classification: "Risk",
    urgency: "High",
  }),

  // Vanta — expansion
  s({
    accountId: "vanta",
    type: "Research",
    source: "arXiv",
    timestamp: daysAgo(5),
    description: "Published RLHF paper noting bottleneck in human preference data quality for safety-critical prompts.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "vanta",
    type: "Funding",
    source: "Forbes",
    timestamp: daysAgo(22),
    description: "Closed $75M from OSS-friendly investors, earmarked partially for alignment data partnerships.",
    classification: "Opportunity",
    urgency: "Medium",
  }),
  s({
    accountId: "vanta",
    type: "Hiring",
    source: "Job Board",
    timestamp: daysAgo(9),
    description: "Opened 4 roles for red-team data engineers and safety-eval specialists.",
    classification: "Opportunity",
    urgency: "Medium",
  }),

  // Quantum Minds — prospect
  s({
    accountId: "quantum",
    type: "Funding",
    source: "TechCrunch",
    timestamp: daysAgo(3),
    description: "Emerged from stealth with $220M Series B from Sequoia + a16z. Mission: long-horizon planning agents.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "quantum",
    type: "Hiring",
    source: "LinkedIn",
    timestamp: daysAgo(6),
    description: "Posted Head of Training Data and 8 ML engineer roles — building data org from scratch.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "quantum",
    type: "Research",
    source: "arXiv",
    timestamp: daysAgo(15),
    description: "CTO Daniel Reyes published preprint on agent trajectory eval — a known AfterQuery strength.",
    classification: "Opportunity",
    urgency: "Medium",
  }),

  // Orbital ML — prospect
  s({
    accountId: "orbital",
    type: "Funding",
    source: "The Information",
    timestamp: daysAgo(7),
    description: "Raised $90M Series A to build robotics foundation models. Compute partner: CoreWeave.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "orbital",
    type: "Hiring",
    source: "Job Board",
    timestamp: daysAgo(4),
    description: "Posted 5 roles for teleoperation data ops and a Director of Real-World Data.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "orbital",
    type: "Press",
    source: "IEEE Spectrum",
    timestamp: daysAgo(12),
    description: "Demo video of warehouse robot fleet went viral — internal pressure to ship v2 fast.",
    classification: "Opportunity",
    urgency: "Medium",
  }),
  s({
    accountId: "orbital",
    type: "Competitor",
    source: "TechCrunch",
    timestamp: daysAgo(19),
    description: "Physical Intelligence announced partnership with Scale for robotics data labeling.",
    classification: "Risk",
    urgency: "Medium",
  }),

  // Stratos AI — prospect
  s({
    accountId: "stratos",
    type: "Press",
    source: "Defense News",
    timestamp: daysAgo(5),
    description: "Awarded $120M DoD contract for multimodal ISR intelligence platform — must ship in 9 months.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "stratos",
    type: "Hiring",
    source: "ClearanceJobs",
    timestamp: daysAgo(8),
    description: "Hiring TS/SCI-cleared annotators and a Director of Secure Data Operations.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "stratos",
    type: "Funding",
    source: "Bloomberg",
    timestamp: daysAgo(25),
    description: "Closed $150M Series B led by Founders Fund and In-Q-Tel.",
    classification: "Opportunity",
    urgency: "Low",
  }),

  // Deepform — prospect
  s({
    accountId: "deepform",
    type: "Research",
    source: "Nature Biotechnology",
    timestamp: daysAgo(4),
    description: "Published SOTA results on protein binder design — bottleneck cited: wet-lab validation throughput.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "deepform",
    type: "Funding",
    source: "Endpoints News",
    timestamp: daysAgo(10),
    description: "Series A extension of $60M led by ARCH Venture Partners.",
    classification: "Opportunity",
    urgency: "Medium",
  }),
  s({
    accountId: "deepform",
    type: "Hiring",
    source: "LinkedIn",
    timestamp: daysAgo(13),
    description: "Hiring Head of ML Data and 3 computational biologist annotator roles.",
    classification: "Opportunity",
    urgency: "Medium",
  }),

  // Nexus Intelligence — prospect
  s({
    accountId: "nexus",
    type: "Press",
    source: "Reuters",
    timestamp: daysAgo(6),
    description: "Launched enterprise finance-agent product with JPMorgan as design partner.",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "nexus",
    type: "Hiring",
    source: "Job Board",
    timestamp: daysAgo(9),
    description: "Posted Head of Financial Data Annotation and 6 SME annotator roles (CFA/CPA preferred).",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "nexus",
    type: "Competitor",
    source: "WSJ",
    timestamp: daysAgo(16),
    description: "Hebbia raised $130M to attack the same enterprise finance segment.",
    classification: "Risk",
    urgency: "Medium",
  }),
  s({
    accountId: "nexus",
    type: "Funding",
    source: "TechCrunch",
    timestamp: daysAgo(28),
    description: "Closed $50M Series A from Bain Capital Ventures.",
    classification: "Opportunity",
    urgency: "Low",
  }),

  // ===== Relationship signals surfaced from connected integrations =====

  // Helix AI
  s({
    accountId: "helix",
    type: "Relationship",
    source: "Gmail",
    timestamp: daysAgo(3),
    description:
      "Priya's average email response time has increased from 4 hours to 31 hours over the last 3 weeks. Last two check-in meeting invites were declined without a reschedule.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "helix",
    type: "Relationship",
    source: "Gong",
    timestamp: daysAgo(6),
    description:
      'Call transcript — Marcus to Michael: "I don\'t know why we keep getting batches that fail on Rust ownership patterns. This is the third time. At some point this becomes a vendor problem, not a feedback problem."',
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "helix",
    type: "Relationship",
    source: "Fireflies",
    timestamp: daysAgo(12),
    description:
      "Dani has joined the company supporting the Eval workstream. No one from AfterQuery has met with her yet.",
    classification: "Opportunity",
    urgency: "High",
  }),

  // Meridian
  s({
    accountId: "meridian",
    type: "Relationship",
    source: "Gmail",
    timestamp: daysAgo(4),
    description:
      "Marcus's last three replies were one-line acknowledgements with no forward motion. Forwarded our QBR deck internally to an unknown distribution list without comment.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "meridian",
    type: "Relationship",
    source: "Gong",
    timestamp: daysAgo(10),
    description:
      'Call transcript — Marcus on internal sync (recorded via Gong integration on their side): "Honestly, the agent eval pipeline has been more drag than lift. We should be evaluating whether to bring this in-house."',
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "meridian",
    type: "Relationship",
    source: "Fireflies",
    timestamp: daysAgo(8),
    description:
      'Notes from a Meridian eng all-hands: a new Director of Eval Infra, Rachel Tan, introduced herself as "owning all third-party data partnerships going forward." Not yet on our distribution list.',
    classification: "Opportunity",
    urgency: "Medium",
  }),

  // Synthos
  s({
    accountId: "synthos",
    type: "Relationship",
    source: "Gong",
    timestamp: daysAgo(5),
    description:
      'Call transcript — Elena to her team: "AfterQuery is the only vendor who actually understands the long-video annotation problem. We need to lock them in before V3 launch."',
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "synthos",
    type: "Relationship",
    source: "Outlook",
    timestamp: daysAgo(2),
    description:
      'Elena forwarded our last capability deck to Synthos\'s CFO with the note: "Worth budgeting for a 2x expansion in Q1."',
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "synthos",
    type: "Relationship",
    source: "Fireflies",
    timestamp: daysAgo(11),
    description:
      "Meeting notes — new stakeholder, Tomás Reyes (Head of Multimodal Data Ops), asked specifically about AfterQuery's video-rater calibration methodology.",
    classification: "Opportunity",
    urgency: "Medium",
  }),

  // Arclight
  s({
    accountId: "arclight",
    type: "Relationship",
    source: "Gmail",
    timestamp: daysAgo(3),
    description:
      "James has not opened our last two weekly digest emails. Open rate dropped from 100% to 0% over the past month.",
    classification: "Risk",
    urgency: "High",
  }),
  s({
    accountId: "arclight",
    type: "Relationship",
    source: "Gong",
    timestamp: daysAgo(7),
    description:
      "Call transcript — Priya Anand (new Director of Eval) to James: \"I want to talk to AfterQuery directly. From what I've seen, they're ahead of where Surge is on reasoning evals.\"",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "arclight",
    type: "Relationship",
    source: "Fireflies",
    timestamp: daysAgo(14),
    description:
      'Meeting notes from Arclight planning sync: "Math reasoning push starts Q1. Need to identify a data partner with strong SME network in olympiad-level math by end of month."',
    classification: "Opportunity",
    urgency: "Medium",
  }),

  // Vanta
  s({
    accountId: "vanta",
    type: "Relationship",
    source: "Gong",
    timestamp: daysAgo(4),
    description:
      "Call transcript — Aisha to her team: \"The safety-eval pilot with AfterQuery is the cleanest data we've gotten. Let's scope a full red-team partnership.\"",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "vanta",
    type: "Relationship",
    source: "Gmail",
    timestamp: daysAgo(9),
    description:
      'Aisha looped in their Head of Alignment, Devon Lee, on our last thread with the note: "Devon — these are the folks I was telling you about."',
    classification: "Opportunity",
    urgency: "Medium",
  }),

  // Quantum Minds
  s({
    accountId: "quantum",
    type: "Relationship",
    source: "Fireflies",
    timestamp: daysAgo(5),
    description:
      'Meeting notes from a Quantum Minds founders sync: "Daniel mentioned AfterQuery by name as a likely first hire on the data side. Wants intros via Sequoia."',
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "quantum",
    type: "Relationship",
    source: "Gmail",
    timestamp: daysAgo(2),
    description:
      'Daniel replied to our cold intro within 14 minutes, asking for a same-week call. "Trajectory eval is the bottleneck. Let\'s talk."',
    classification: "Opportunity",
    urgency: "High",
  }),

  // Orbital ML
  s({
    accountId: "orbital",
    type: "Relationship",
    source: "Gong",
    timestamp: daysAgo(6),
    description:
      'Call transcript — Sophia to her engineering lead: "The Scale + Physical Intelligence deal worries me. We need a differentiated data partner. Look at AfterQuery and one other."',
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "orbital",
    type: "Relationship",
    source: "Outlook",
    timestamp: daysAgo(3),
    description:
      "Sophia accepted our intro call within 2 hours and added their new Director of Real-World Data to the invite.",
    classification: "Opportunity",
    urgency: "High",
  }),

  // Stratos AI
  s({
    accountId: "stratos",
    type: "Relationship",
    source: "Gmail",
    timestamp: daysAgo(4),
    description:
      'Col. Hayes replied to our outreach: "TS/SCI annotator capacity is the gating factor for our DoD timeline. Send your cleared-staff overview by Friday."',
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "stratos",
    type: "Relationship",
    source: "Fireflies",
    timestamp: daysAgo(10),
    description:
      'Meeting notes from a Stratos program review: "Two vendors shortlisted for the ISR data partnership. AfterQuery is one. Decision in 4 weeks."',
    classification: "Opportunity",
    urgency: "High",
  }),

  // Deepform
  s({
    accountId: "deepform",
    type: "Relationship",
    source: "Gong",
    timestamp: daysAgo(7),
    description:
      'Call transcript — Dr. Tanaka to a collaborator: "For protein binder validation we need annotators with actual wet-lab intuition, not just MTurkers. AfterQuery claims they have that bench."',
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "deepform",
    type: "Relationship",
    source: "Gmail",
    timestamp: daysAgo(3),
    description:
      "Dr. Tanaka asked for a sample annotation pack on three protein design tasks. Wants to evaluate quality before any commercial conversation.",
    classification: "Opportunity",
    urgency: "Medium",
  }),

  // Nexus Intelligence
  s({
    accountId: "nexus",
    type: "Relationship",
    source: "Outlook",
    timestamp: daysAgo(2),
    description:
      'Olivia forwarded our capabilities one-pager to JPMorgan\'s design partner lead with the note: "This is the team I want running our SME annotation workflow."',
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "nexus",
    type: "Relationship",
    source: "Gong",
    timestamp: daysAgo(8),
    description:
      "Call transcript — Olivia to her product team: \"We can't compete with Hebbia on speed unless our financial eval data is sharper. AfterQuery's CFA-credentialed pool is the differentiator.\"",
    classification: "Opportunity",
    urgency: "High",
  }),
  s({
    accountId: "nexus",
    type: "Relationship",
    source: "Fireflies",
    timestamp: daysAgo(13),
    description:
      'Meeting notes — new SVP Engineering, Raj Mehta, joined the Nexus side of the table. Asked who their current annotation vendor was. Olivia answered: "AfterQuery, and we want to expand."',
    classification: "Opportunity",
    urgency: "Medium",
  }),
];
