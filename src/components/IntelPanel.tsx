import { RotateCw, X, Mail, Phone, FileText, FileSignature, HardDrive, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { Account } from "@/lib/mockData";
import { accountIntel, type POC, type Sentiment } from "@/lib/accountIntel";

interface Props {
  account: Account;
  onClose: () => void;
}

const SENTIMENT_CLASS: Record<Sentiment, string> = {
  Warm: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  Neutral: "bg-muted text-muted-foreground border-border",
  Cooling: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

const INTEGRATIONS: { name: string; icon: typeof Mail; emoji: string }[] = [
  { name: "Gmail", icon: Mail, emoji: "📧" },
  { name: "Gong", icon: Phone, emoji: "📞" },
  { name: "Fireflies", icon: FileText, emoji: "📝" },
  { name: "Google Drive", icon: HardDrive, emoji: "📄" },
  { name: "Outlook", icon: Send, emoji: "✉️" },
  { name: "DocuSign", icon: FileSignature, emoji: "✍️" },
];

export function IntelPanel({ account, onClose }: Props) {
  const intel = accountIntel[account.id];
  const [refreshKey, setRefreshKey] = useState(0);

  const handleConnect = () => {
    toast("Integrations coming soon — contact your AfterQuery rep to join the beta.");
  };

  return (
    <aside className="w-[380px] shrink-0 border-l border-border bg-surface h-screen flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Relationship Intel</div>
          <div className="text-sm font-semibold">{account.name}</div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setRefreshKey((k) => k + 1)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
            title="Refresh"
          >
            <RotateCw className="size-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
            title="Close"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>

      <div key={refreshKey} className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-6">
        {!intel ? (
          <p className="text-sm text-muted-foreground text-center py-8">
            No intel available for this account yet.
          </p>
        ) : (
          <>
            <section className="space-y-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                POC Profiles
              </div>
              {intel.pocs.map((poc) => (
                <POCCard key={poc.name} poc={poc} />
              ))}
            </section>

            <section className="space-y-2">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                Dynamics
              </div>
              <p className="text-xs text-foreground/85 leading-relaxed rounded-md border border-border bg-background px-3 py-3">
                {intel.dynamics}
              </p>
            </section>
          </>
        )}

        <section className="space-y-2 pt-2">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Connect data sources
          </div>
          <p className="text-[11px] text-muted-foreground">
            Enrich POC profiles automatically by connecting your tools.
          </p>
          <div className="grid grid-cols-1 gap-1.5 pt-1">
            {INTEGRATIONS.map((i) => (
              <div
                key={i.name}
                className="flex items-center justify-between rounded-md border border-border bg-background px-3 py-2 transition-colors hover:bg-surface-hover"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm">{i.emoji}</span>
                  <span className="text-xs font-medium text-foreground">{i.name}</span>
                </div>
                <button
                  onClick={handleConnect}
                  className="text-[10px] px-2 py-0.5 rounded border border-amber-400/60 text-amber-400 hover:bg-amber-400/10 transition-colors"
                >
                  Connect
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

function POCCard({ poc }: { poc: POC }) {
  return (
    <div className="rounded-md border border-border bg-background px-3 py-3 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-foreground leading-tight">{poc.name}</div>
          <div className="text-[11px] text-muted-foreground mt-0.5">{poc.role}</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">Tenure: {poc.tenure}</div>
        </div>
        <span
          className={`shrink-0 text-[10px] px-1.5 py-0.5 rounded border font-medium ${SENTIMENT_CLASS[poc.sentiment]}`}
        >
          {poc.sentiment}
        </span>
      </div>
      <div className="space-y-1.5 text-[11px] leading-relaxed">
        <Line emoji="🎯" label="Speaks to" text={poc.speaksTo} />
        <Line emoji="🏆" label="Wants" text={poc.wants} />
        <Line emoji="🧭" label="Career pattern" text={poc.careerPattern} />
        <div className="rounded-sm border-l-2 border-amber-400/50 pl-2 py-0.5 text-foreground/85 italic">
          💬 "{poc.keyQuote}"
        </div>
        <Line emoji="⚡" label="AM tip" text={poc.amTip} />
      </div>
    </div>
  );
}

function Line({ emoji, label, text }: { emoji: string; label: string; text: string }) {
  return (
    <div className="text-foreground/80">
      <span className="mr-1">{emoji}</span>
      <span className="font-medium text-foreground">{label}:</span>{" "}
      <span>{text}</span>
    </div>
  );
}
