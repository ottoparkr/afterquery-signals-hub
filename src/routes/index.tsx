import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { AccountSidebar } from "@/components/AccountSidebar";
import { SignalFeed } from "@/components/SignalFeed";
import { OutreachPanel } from "@/components/OutreachPanel";
import { accounts, signals } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AfterQuery Signals — Customer Intelligence" },
      { name: "description", content: "Surface, classify, and act on customer signals across AfterQuery accounts." },
    ],
  }),
  component: Index,
});

function Index() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const [outreachSignalId, setOutreachSignalId] = useState<string | "account" | null>(null);
  const [panelClosing, setPanelClosing] = useState(false);

  const selected = useMemo(() => accounts.find((a) => a.id === selectedId), [selectedId]);
  const accountSignals = useMemo(
    () => (selectedId ? signals.filter((s) => s.accountId === selectedId) : []),
    [selectedId]
  );
  const activeSignal = outreachSignalId && outreachSignalId !== "account"
    ? signals.find((s) => s.id === outreachSignalId)
    : undefined;

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setOutreachSignalId(null);
    setPanelClosing(false);
  };

  const handleOpenOutreach = (id: string | "account") => {
    setOutreachSignalId(id);
    setPanelClosing(false);
  };

  const handleCloseOutreach = () => {
    setPanelClosing(true);
    setTimeout(() => {
      setPanelClosing(false);
      setOutreachSignalId(null);
    }, 300);
  };

  const showPanel = outreachSignalId !== null || panelClosing;

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
            onGenerate={(s) => handleOpenOutreach(s.id)}
            onGenerateAccount={() => handleOpenOutreach("account")}
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
          {outreachSignalId !== null && selected && (
            <OutreachPanel
              account={selected}
              signal={activeSignal}
              accountSignals={accountSignals}
              onClose={handleCloseOutreach}
            />
          )}
        </div>
      </div>
    </div>
  );
}
