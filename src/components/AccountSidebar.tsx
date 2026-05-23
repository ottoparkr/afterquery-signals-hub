import { useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import type { Account, Signal } from "@/lib/mockData";

type Filter = "All" | "Existing" | "Prospect" | "Churn Risk" | "Expansion" | "New Opportunity";

const FILTERS: Filter[] = ["All", "Existing", "Prospect", "Churn Risk", "Expansion", "New Opportunity"];

interface Props {
  accounts: Account[];
  signals: Signal[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function AccountSidebar({ accounts, signals, selectedId, onSelect }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return accounts.filter((a) => {
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false;
      switch (filter) {
        case "All": return true;
        case "Existing": return a.type === "Existing Client";
        case "Prospect": return a.type === "Prospect";
        case "Churn Risk": return a.tags.includes("Churn Risk");
        case "Expansion": return a.tags.includes("Expansion Opportunity");
        case "New Opportunity": return a.tags.includes("New Opportunity");
      }
    });
  }, [accounts, filter, query]);

  const highCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const s of signals) {
      if (s.urgency === "High") m.set(s.accountId, (m.get(s.accountId) ?? 0) + 1);
    }
    return m;
  }, [signals]);

  return (
    <aside className="w-72 shrink-0 border-r border-border bg-surface flex flex-col h-screen">
      <div className="px-4 py-4 border-b border-border flex items-center gap-2">
        <div className="size-8 rounded-md bg-primary flex items-center justify-center">
          <Sparkles className="size-4 text-primary-foreground" />
        </div>
        <div>
          <div className="text-sm font-semibold tracking-tight">AfterQuery</div>
          <div className="text-[11px] text-muted-foreground -mt-0.5">Signals Intelligence</div>
        </div>
      </div>

      <div className="px-3 pt-3">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search accounts…"
            className="w-full pl-8 pr-3 py-2 text-sm bg-background border border-border rounded-md placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
        </div>
      </div>

      <div className="px-3 pt-3 flex flex-wrap gap-1">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[11px] px-2 py-1 rounded-md border transition-colors ${
              filter === f
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:bg-surface-hover hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto mt-3 pb-4">
        {filtered.length === 0 && (
          <div className="px-4 py-8 text-center text-xs text-muted-foreground">No accounts match.</div>
        )}
        {filtered.map((a) => {
          const high = highCounts.get(a.id) ?? 0;
          const active = a.id === selectedId;
          const primaryTag = a.tags[0];
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a.id)}
              className={`w-full text-left px-4 py-3 border-l-2 transition-colors ${
                active
                  ? "bg-surface-hover border-primary"
                  : "border-transparent hover:bg-surface-hover/60"
              }`}
            >
              <div className="flex items-start gap-2">
                <div className="size-8 rounded-md bg-background border border-border flex items-center justify-center text-xs font-semibold text-primary shrink-0">
                  {a.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <div className="text-sm font-medium truncate">{a.name}</div>
                    {high > 0 && (
                      <span className="text-[10px] px-1.5 rounded bg-[color:var(--urgency-high)]/20 text-[color:var(--urgency-high)] font-semibold">
                        {high}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                      a.type === "Existing Client"
                        ? "bg-opportunity/15 text-opportunity"
                        : "bg-primary/15 text-primary"
                    }`}>
                      {a.type === "Existing Client" ? "Client" : "Prospect"}
                    </span>
                    {primaryTag && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                        primaryTag === "Churn Risk"
                          ? "bg-risk/15 text-risk"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {primaryTag === "Expansion Opportunity" ? "Expansion" :
                         primaryTag === "New Opportunity" ? "New" : primaryTag}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
