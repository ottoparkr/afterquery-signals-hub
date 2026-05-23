import { useState } from "react";
import { Copy, Check, RotateCw, Mail, Lightbulb, Target, X } from "lucide-react";
import type { Account, Signal } from "@/lib/mockData";
import { generateOutreach, generateAccountOutreach, type Outreach } from "@/lib/outreach";
import { SIGNAL_EMOJI } from "@/lib/signalMeta";

interface Props {
  account: Account;
  signal?: Signal;
  accountSignals: Signal[];
  onClose: () => void;
}

export function OutreachPanel({ account, signal, accountSignals, onClose }: Props) {
  const [seed, setSeed] = useState(0);
  const outreach: Outreach | null = signal
    ? generateOutreach(account, signal)
    : generateAccountOutreach(account, accountSignals);

  if (!outreach) {
    return (
      <aside className="w-[380px] shrink-0 border-l border-border bg-surface h-screen flex items-center justify-center p-6">
        <p className="text-sm text-muted-foreground text-center">No signals to draft outreach from.</p>
      </aside>
    );
  }

  return (
    <aside key={seed} className="w-[380px] shrink-0 border-l border-border bg-surface h-screen flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Outreach for</div>
          <div className="text-sm font-semibold">{account.name}</div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
            title="Regenerate"
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

      <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-5">
        {signal && (
          <div className="rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span>{SIGNAL_EMOJI[signal.type]}</span>
              <span className="font-medium text-foreground">{signal.type}</span>
              <span>· {signal.source}</span>
            </div>
            <p className="text-foreground/80">{signal.description}</p>
          </div>
        )}

        <Section icon={<Lightbulb className="size-3.5 text-primary" />} title="Suggested angle">
          <p className="text-sm text-foreground/90 leading-relaxed">{outreach.angle}</p>
        </Section>

        <Section icon={<Mail className="size-3.5 text-primary" />} title="Draft email">
          <div className="rounded-md border border-border bg-background overflow-hidden">
            <div className="px-3 py-2 border-b border-border text-xs">
              <span className="text-muted-foreground">Subject: </span>
              <span className="font-medium">{outreach.emailSubject}</span>
            </div>
            <pre className="px-3 py-3 text-xs whitespace-pre-wrap font-sans text-foreground/90 leading-relaxed">
              {outreach.emailBody}
            </pre>
            <div className="px-3 py-2 border-t border-border flex justify-end">
              <CopyButton text={`Subject: ${outreach.emailSubject}\n\n${outreach.emailBody}`} label="Copy email" />
            </div>
          </div>
        </Section>

        <Section icon={<Target className="size-3.5 text-primary" />} title="Talking points">
          <ul className="space-y-1.5">
            {outreach.talkingPoints.map((p, i) => (
              <li key={i} className="text-sm text-foreground/90 leading-relaxed flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex justify-end">
            <CopyButton text={outreach.talkingPoints.map((p, i) => `${i + 1}. ${p}`).join("\n")} label="Copy points" />
          </div>
        </Section>

        <Section title="AfterQuery value props">
          <ul className="space-y-1.5">
            {outreach.valueProps.map((p, i) => (
              <li key={i} className="text-xs text-muted-foreground leading-relaxed flex gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </aside>
  );
}

function Section({ icon, title, children }: { icon?: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 mb-2">
        {icon}
        <h3 className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="inline-flex items-center gap-1 text-[11px] px-2 py-1 rounded border border-border text-muted-foreground hover:text-primary hover:border-primary/60 transition-colors"
    >
      {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
      {copied ? "Copied" : label}
    </button>
  );
}
