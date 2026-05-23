import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { AccountSidebar } from "@/components/AccountSidebar";
import { SignalFeed } from "@/components/SignalFeed";
import { OutreachPanel } from "@/components/OutreachPanel";
import { IntelPanel } from "@/components/IntelPanel";
import { accounts, signals, type Signal } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfterQuery Signals — Customer Intelligence" },
      { name: "description", content: "Surface, classify, and act on customer signals across AfterQuery accounts." },
    ],
  }),
  component: Index,
});

type OutreachTarget =
  | { kind: "signal"; id: string }
  | { kind: "account" }
  | { kind: "multi"; ids: string[] };

type RightPanel =
  | { kind: "outreach"; target: OutreachTarget }
  | { kind: "intel" }
  | null;

function Index() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [panel, setPanel] = useState<RightPanel>(null);
  const [panelClosing, setPanelClosing] = useState(false);

  const selected = useMemo(() => accounts.find((a) => a.id === selectedId), [selectedId]);
  const accountSignals = useMemo(
    () => (selectedId ? signals.filter((s) => s.accountId === selectedId) : []),
    [selectedId]
  );

  const outreachTarget = panel?.kind === "outreach" ? panel.target : null;
  const activeSignal: Signal | undefined =
    outreachTarget?.kind === "signal" ? signals.find((s) => s.id === outreachTarget.id) : undefined;
  const multiSignals: Signal[] | undefined =
    outreachTarget?.kind === "multi"
      ? outreachTarget.ids
          .map((id) => signals.find((s) => s.id === id))
          .filter((s): s is Signal => !!s)
      : undefined;

  const handleSelect = (id: string) => {
    if (id === selectedId) {
      setSelectedId(undefined);
      setPanel(null);
      setPanelClosing(false);
      return;
    }
    setSelectedId(id);
    setPanel(null);
    setPanelClosing(false);
  };

  const openPanel = (next: Exclude<RightPanel, null>) => {
    if (panel !== null && panel.kind !== next.kind) {
      // close current then open new
      setPanelClosing(true);
      setTimeout(() => {
        setPanelClosing(false);
        setPanel(next);
      }, 300);
    } else {
      setPanel(next);
      setPanelClosing(false);
    }
  };

  const handleOpenOutreach = (target: OutreachTarget) =>
    openPanel({ kind: "outreach", target });
  const handleOpenIntel = () => openPanel({ kind: "intel" });

  const handleClosePanel = () => {
    setPanelClosing(true);
    setTimeout(() => {
      setPanelClosing(false);
      setPanel(null);
    }, 300);
  };

  const showPanel = panel !== null || panelClosing;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AccountSidebar
        accounts={accounts}
        signals={signals}
        selectedId={selectedId}
        onSelect={handleSelect}
      />
      {selected ? (
        <div className="flex-1 min-w-0 animate-fade-in" style={{ animationDuration: "150ms" }}>
          <SignalFeed
            account={selected}
            signals={signals}
            activeSignalId={activeSignal?.id}
            onGenerate={(s) => handleOpenOutreach({ kind: "signal", id: s.id })}
            onGenerateAccount={() => handleOpenOutreach({ kind: "account" })}
            onGenerateMulti={(sigs) =>
              handleOpenOutreach({ kind: "multi", ids: sigs.map((s) => s.id) })
            }
            onOpenIntel={handleOpenIntel}
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center min-w-0">
          <div className="size-12 rounded-xl bg-primary flex items-center justify-center mb-4">
            <Sparkles className="size-6 text-primary-foreground" />
          </div>
          <div className="text-lg font-semibold tracking-tight mb-1">AfterQuery</div>
          <p className="text-sm text-muted-foreground">Select an account to view signals.</p>
        </div>
      )}

      <div
        className={`shrink-0 overflow-hidden transition-all duration-300 ease-out ${
          showPanel ? "max-w-[380px]" : "max-w-[0px]"
        }`}
      >
        <div className="w-[380px] h-screen border-l border-border bg-surface">
          {panel?.kind === "outreach" && selected && (
            <OutreachPanel
              account={selected}
              signal={activeSignal}
              multiSignals={multiSignals}
              accountSignals={accountSignals}
              onClose={handleClosePanel}
            />
          )}
          {panel?.kind === "intel" && selected && (
            <IntelPanel account={selected} onClose={handleClosePanel} />
          )}
        </div>
      </div>
    </div>
  );
}
