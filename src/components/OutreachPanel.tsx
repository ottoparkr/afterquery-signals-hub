import { useEffect, useRef, useState } from "react";
import { Copy, Check, RotateCw, Mail, Lightbulb, Target, X, ExternalLink } from "lucide-react";
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
  const base: Outreach | null = signal
    ? generateOutreach(account, signal)
    : generateAccountOutreach(account, accountSignals);

  const [subject, setSubject] = useState(base?.emailSubject ?? "");
  const [body, setBody] = useState(base?.emailBody ?? "");
  const [points, setPoints] = useState<string[]>(base?.talkingPoints ?? []);
  const [copied, setCopied] = useState(false);

  // Reset when account/signal changes or regenerate
  const resetKey = `${account.id}:${signal?.id ?? "account"}`;
  const lastKey = useRef(resetKey);
  useEffect(() => {
    if (lastKey.current !== resetKey) {
      lastKey.current = resetKey;
      setSubject(base?.emailSubject ?? "");
      setBody(base?.emailBody ?? "");
      setPoints(base?.talkingPoints ?? []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  const regenerate = () => {
    if (!base) return;
    setSubject(base.emailSubject);
    setBody(base.emailBody);
    setPoints(base.talkingPoints);
  };

  if (!base) {
    return (
      <aside className="w-[380px] shrink-0 border-l border-border bg-surface h-screen flex items-center justify-center p-6">
        <p className="text-sm text-muted-foreground text-center">No signals to draft outreach from.</p>
      </aside>
    );
  }

  const mailto = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <aside className="w-[380px] shrink-0 border-l border-border bg-surface h-screen flex flex-col">
      <div className="px-5 py-4 border-b border-border flex items-center justify-between">
        <div>
          <div className="text-xs text-muted-foreground">Outreach for</div>
          <div className="text-sm font-semibold">{account.name}</div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={regenerate}
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
            title="Regenerate — this will discard your edits."
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
          <p className="text-sm text-foreground/90 leading-relaxed">{base.angle}</p>
        </Section>

        <Section icon={<Mail className="size-3.5 text-primary" />} title="Draft email">
          <div className="space-y-2">
            <div className="text-[11px] text-muted-foreground">Subject</div>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-foreground border-0 border-b border-transparent focus:border-primary/60 focus:outline-none px-0 py-1"
            />
            <div className="text-[11px] text-muted-foreground pt-2">Body</div>
            <AutoTextarea
              value={body}
              onChange={setBody}
              className="w-full bg-transparent text-xs text-foreground/90 leading-relaxed font-sans border border-transparent rounded-md focus:border-primary/60 focus:outline-none px-2 py-2 resize-none"
            />
            <div className="flex flex-col gap-2 pt-2">
              <a
                href={mailto}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2 rounded-md bg-amber-400 text-zinc-900 hover:bg-amber-300 transition-colors"
              >
                Open in Gmail <ExternalLink className="size-3.5" />
              </a>
              <button
                onClick={handleCopy}
                className="w-full inline-flex items-center justify-center gap-1.5 text-sm font-medium px-3 py-2 rounded-md border border-border text-foreground hover:border-primary/60 hover:text-primary transition-colors"
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </div>
          </div>
        </Section>

        <Section icon={<Target className="size-3.5 text-primary" />} title="Talking points">
          <ul className="space-y-1.5">
            {points.map((p, i) => (
              <li key={i} className="text-sm text-foreground/90 leading-relaxed flex gap-2">
                <span className="text-primary mt-0.5">•</span>
                <EditablePoint
                  value={p}
                  onChange={(v) => setPoints((prev) => prev.map((x, idx) => (idx === i ? v : x)))}
                />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="AfterQuery value props">
          <ul className="space-y-1.5">
            {base.valueProps.map((p, i) => (
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

function AutoTextarea({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [value]);
  return (
    <textarea
      ref={ref}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={1}
      className={className}
    />
  );
}

function EditablePoint({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  };

  if (editing) {
    return (
      <textarea
        autoFocus
        value={draft}
        rows={Math.max(1, draft.split("\n").length)}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        className="flex-1 bg-transparent text-sm text-foreground/90 leading-relaxed border border-primary/60 rounded px-2 py-1 focus:outline-none resize-none"
      />
    );
  }
  return (
    <span
      tabIndex={0}
      onClick={() => setEditing(true)}
      onFocus={() => setEditing(true)}
      className="flex-1 cursor-text rounded hover:bg-surface-hover/50 px-1 -mx-1"
    >
      {value}
    </span>
  );
}
