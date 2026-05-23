import { useEffect, useMemo, useState } from "react";
import { Zap, TrendingUp, DollarSign, Check, Brain } from "lucide-react";
import type { Account, Signal, SignalType, Classification } from "@/lib/mockData";

import { SIGNAL_EMOJI, URGENCY_CLASS, timeAgo, formatCurrency } from "@/lib/signalMeta";

interface Props {
  account: Account;
  signals: Signal[];
  onGenerate: (signal: Signal) => void;
  onGenerateAccount: () => void;
  onGenerateMulti: (signals: Signal[]) => void;
  onOpenIntel: () => void;
  activeSignalId?: string;
}

const SIGNAL_TYPES: SignalType[] = ["Funding", "Press", "Research", "Hiring", "Usage", "Relationship", "Competitor"];

type FeedFilter = "All" | "Risk" | "Opportunity" | SignalType;
type TimeWindow = "Today" | "7D" | "30D" | "90D" | "All";

const TIME_WINDOWS: TimeWindow[] = ["Today", "7D", "30D", "90D", "All"];

const WINDOW_MS: Record<TimeWindow, number | null> = {
  Today: 1 * 24 * 60 * 60 * 1000,
  "7D": 7 * 24 * 60 * 60 * 1000,
  "30D": 30 * 24 * 60 * 60 * 1000,
  "90D": 90 * 24 * 60 * 60 * 1000,
  All: null,
};

export function SignalFeed({ account, signals, onGenerate, onGenerateMulti, onOpenIntel, activeSignalId }: Props) {
  const [filter, setFilter] = useState<FeedFilter>("All");
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("30D");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  // Reset selection when account changes
  useEffect(() => {
    setSelected(new Set());
  }, [account.id]);

  const accountSignals = useMemo(
    () =>
      signals
        .filter((s) => s.accountId === account.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
    [signals, account.id]
  );

  const highCount = accountSignals.filter((s) => s.urgency === "High").length;

  const windowFiltered = useMemo(() => {
    const ms = WINDOW_MS[timeWindow];
    if (ms === null) return accountSignals;
    const cutoff = Date.now() - ms;
    return accountSignals.filter((s) => new Date(s.timestamp).getTime() >= cutoff);
  }, [accountSignals, timeWindow]);

  const visible = useMemo(() => {
    if (filter === "All") return windowFiltered;
    if (filter === "Risk" || filter === "Opportunity")
      return windowFiltered.filter((s) => s.classification === filter);
    return windowFiltered.filter((s) => s.type === filter);
  }, [windowFiltered, filter]);

  const filters: FeedFilter[] = ["All", "Risk", "Opportunity", ...SIGNAL_TYPES];

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const clearSelection = () => setSelected(new Set());

  const selectedSignals = useMemo(
    () => accountSignals.filter((s) => selected.has(s.id)),
    [accountSignals, selected]
  );

  return (
    <section className="flex-1 flex flex-col min-w-0 h-screen bg-background overflow-x-hidden relative">
      {/* Header */}
      <div className="px-6 py-5 border-b border-border">
        <div className="min-w-0">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-lg font-semibold tracking-tight truncate">{account.name}</h1>
            <button
              onClick={onOpenIntel}
              className="shrink-0 inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-md border border-amber-400/70 bg-[#101a2e] text-amber-300 hover:bg-[#152138] hover:border-amber-400 transition-colors"
            >
              <span className="text-sm leading-none">🧠</span>
              Intel
            </button>
          </div>
          <div className="flex items-center gap-2 flex-wrap mt-2">
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
          <p className="text-sm text-muted-foreground mt-2">{account.description}</p>
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

      {/* Time window segmented control */}
      <div className="px-6 pt-3 flex items-center gap-1 overflow-x-hidden">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-2">Window</span>
        {TIME_WINDOWS.map((w) => (
          <button
            key={w}
            onClick={() => setTimeWindow(w)}
            className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
              timeWindow === w
                ? "bg-amber-400 text-zinc-900 border-amber-400"
                : "bg-transparent text-muted-foreground border-border hover:text-foreground hover:bg-surface"
            }`}
          >
            {w}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="px-6 py-3 border-b border-border flex flex-wrap gap-1 overflow-x-hidden mt-2">
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
      <div className={`flex-1 overflow-y-auto px-6 py-4 space-y-3 ${selected.size >= 2 ? "pb-20" : ""}`}>
        {visible.length === 0 && (
          <div className="text-center text-sm text-muted-foreground py-12">
            {accountSignals.length === 0
              ? "No signals match this filter."
              : windowFiltered.length === 0
              ? "No signals in this time period."
              : "No signals match this filter."}
          </div>
        )}
        {visible.map((sig) => (
          <SignalCard
            key={sig.id}
            signal={sig}
            active={sig.id === activeSignalId}
            selected={selected.has(sig.id)}
            onToggleSelect={() => toggle(sig.id)}
            onGenerate={() => onGenerate(sig)}
          />
        ))}
      </div>

      {/* Multi-selection sticky bar */}
      {selected.size >= 2 && (
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-surface/95 backdrop-blur px-6 py-3 flex items-center justify-between gap-3 animate-fade-in" style={{ animationDuration: "150ms" }}>
          <div className="flex items-center gap-3 text-sm">
            <span className="font-medium">{selected.size} signals selected</span>
            <button
              onClick={clearSelection}
              className="text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              Clear
            </button>
          </div>
          <button
            onClick={() => onGenerateMulti(selectedSignals)}
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3 py-1.5 rounded-md bg-amber-400 text-zinc-900 hover:bg-amber-300 transition-colors"
          >
            Generate combined outreach ↗
          </button>
        </div>
      )}
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

function SignalCard({
  signal,
  active,
  selected,
  onToggleSelect,
  onGenerate,
}: {
  signal: Signal;
  active: boolean;
  selected: boolean;
  onToggleSelect: () => void;
  onGenerate: () => void;
}) {
  const classColor: Record<Classification, string> = {
    Risk: "bg-risk/15 text-risk",
    Opportunity: "bg-opportunity/15 text-opportunity",
  };

  return (
    <article className={`rounded-lg border bg-surface px-4 py-3 transition-colors ${
      active ? "border-primary/60 bg-surface-hover"
        : selected ? "border-amber-400/60 bg-surface-hover"
        : "border-border hover:border-border/80 hover:bg-surface-hover/50"
    }`}>
      <div className="flex items-start gap-3">
        <div className="size-9 rounded-md bg-background border border-border flex items-center justify-center text-lg shrink-0">
          {SIGNAL_EMOJI[signal.type]}
        </div>
        <div className="flex-1 min-w-1">
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
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleSelect();
                }}
                aria-label={selected ? "Deselect signal" : "Select signal"}
                className={`size-4 rounded border flex items-center justify-center transition-colors ${
                  selected
                    ? "bg-amber-400 border-amber-400 text-zinc-900"
                    : "bg-background border-border hover:border-amber-400/60"
                }`}
              >
                {selected && <Check className="size-3" strokeWidth={3} />}
              </button>
              <button
                onClick={onGenerate}
                className="text-[11px] px-2 py-1 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
              >
                Outreach ↗
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
