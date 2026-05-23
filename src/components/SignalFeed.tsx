import { useMemo, useState } from "react";
import { Zap, TrendingUp, DollarSign } from "lucide-react";
import type { Account, Signal, SignalType, Classification } from "@/lib/mockData";

import { SIGNAL_EMOJI, URGENCY_CLASS, timeAgo, formatCurrency } from "@/lib/signalMeta";

interface Props {
  account: Account;
  signals: Signal[];
  onGenerate: (signal: Signal) => void;
  onGenerateAccount: () => void;
  activeSignalId?: string;
}

const SIGNAL_TYPES: SignalType[] = ["Funding", "Press", "Research", "Hiring", "Usage", "Relationship", "Competitor"];

type FeedFilter = "All" | "Risk" | "Opportunity" | SignalType;

export function SignalFeed({ account, signals, onGenerate, onGenerateAccount, activeSignalId }: Props) {
  const [filter, setFilter] = useState<FeedFilter>("All");

  const accountSignals = useMemo(
    () =>
      signals
        .filter((s) => s.accountId === account.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [signals, account.id]
  );

  const highCount = accountSignals.filter((s) => s.urgency === "High").length;

  const visible = useMemo(() => {
    if (filter === "All") return accountSignals;
    if (filter === "Risk" || filter === "Opportunity")
      return accountSignals.filter((s) => s.classification === filter);
    return accountSignals.filter((s) => s.type === filter);
  }, [accountSignals, filter]);

  const filters: FeedFilter[] = ["All", "Risk", "Opportunity", ...SIGNAL_TYPES];

  return (
    <section className="flex-1 flex flex-col min-w-0 h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-lg font-semibold tracking-tight">{account.name}</h1>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              account.type === "Existing Client"
                ? "bg-opportunity/15 text-opportunity"
                : "bg-primary/15 text-primary"
            }`}>
              {account.type}
            </span>
            {account.tags.map((t) => (
              <span key={t} className={`text-[10px] px-2 py-0.5 rounded-full ${
                t === "Churn Risk" ? "bg-risk/15 text-risk" : "bg-muted text-muted-foreground"
              }`}>
                {t}
              </span>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-1">{account.description}</p>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="text-foreground">{account.contactName}</span> · {account.contactRole}
          </p>
        </div>

        {/* Stats */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <Stat icon={TrendingUp} label="Signals" value={accountSignals.length.toString()} />
          <Stat icon={Zap} label="High urgency" value={highCount.toString()}
            tone={highCount > 0 ? "high" : undefined} />
          {account.contractValue !== undefined && (
            <Stat icon={DollarSign} label="Contract" value={formatCurrency(account.contractValue)} />
          )}
        </div>
      </div>

      {/* Filter bar */}
      <div className="px-6 py-3 border-b border-border flex gap-1 overflow-x-auto">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`shrink-0 text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:bg-surface"
            }`}
          >
            {f !== "All" && f !== "Risk" && f !== "Opportunity" && (
              <span className="mr-1">{SIGNAL_EMOJI[f as SignalType]}</span>
            )}
            {f}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {visible.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-12">No signals match this filter.</div>
        )}
        {visible.map((sig) => (
          <SignalCard
            key={sig.id}
            signal={sig}
            active={sig.id === activeSignalId}
            onGenerate={() => onGenerate(sig)}
          />
        ))}
      </div>
    </section>
  );
}

function Stat({ icon: Icon, label, value, tone }: { icon: typeof Zap; label: string; value: string; tone?: "high" }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-surface ${
      tone === "high" ? "border-[color:var(--urgency-high)]/40" : ""
    }`}>
      <Icon className={`size-3.5 ${tone === "high" ? "text-[color:var(--urgency-high)]" : "text-muted-foreground"}`} />
      <span className="text-[11px] text-muted-foreground">{label}</span>
      <span className={`text-xs font-semibold ${tone === "high" ? "text-[color:var(--urgency-high)]" : "text-foreground"}`}>
        {value}
      </span>
    </div>
  );
}

function SignalCard({ signal, active, onGenerate }: { signal: Signal; active: boolean; onGenerate: () => void }) {
  const classColor: Record<Classification, string> = {
    Risk: "bg-risk/15 text-risk",
    Opportunity: "bg-opportunity/15 text-opportunity",
  };

  return (
    <article className={`group rounded-lg border bg-surface px-4 py-3 transition-colors ${
      active ? "border-primary/60 bg-surface-hover" : "border-border hover:border-border/80 hover:bg-surface-hover/50"
    }`}>
      <div className="flex items-start gap-3">
        <div className="size-9 rounded-md bg-background border border-border flex items-center justify-center text-lg shrink-0">
          {SIGNAL_EMOJI[signal.type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span className="font-medium text-foreground">{signal.type}</span>
            <span>·</span>
            <span>{signal.source}</span>
            <span>·</span>
            <span>{timeAgo(signal.timestamp)}</span>
          </div>
          <p className="text-sm text-foreground/90 mt-1 leading-relaxed">{signal.description}</p>

          <div className="flex items-center justify-between gap-2 mt-3">
            <div className="flex items-center gap-1.5">
              <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${classColor[signal.classification]}`}>
                {signal.classification}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${URGENCY_CLASS[signal.urgency]}`}>
                {signal.urgency}
              </span>
            </div>
            <button
              onClick={onGenerate}
              className="text-[11px] px-2 py-1 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
            >
              Outreach ↗
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
