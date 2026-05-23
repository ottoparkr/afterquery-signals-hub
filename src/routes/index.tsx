import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
  const [selectedId, setSelectedId] = useState(accounts[0].id);
  const [outreachSignalId, setOutreachSignalId] = useState<string | "account" | null>(null);

  const selected = useMemo(() => accounts.find((a) => a.id === selectedId)!, [selectedId]);
  const accountSignals = useMemo(() => signals.filter((s) => s.accountId === selectedId), [selectedId]);
  const activeSignal = outreachSignalId && outreachSignalId !== "account"
    ? signals.find((s) => s.id === outreachSignalId)
    : undefined;

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AccountSidebar
        accounts={accounts}
        signals={signals}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId(id);
          setOutreachSignalId(null);
        }}
      />
      <SignalFeed
        account={selected}
        signals={signals}
        activeSignalId={activeSignal?.id}
        onGenerate={(s) => setOutreachSignalId(s.id)}
        onGenerateAccount={() => setOutreachSignalId("account")}
      />
      {outreachSignalId && (
        <OutreachPanel
          account={selected}
          signal={activeSignal}
          accountSignals={accountSignals}
          onClose={() => setOutreachSignalId(null)}
        />
      )}
    </div>
  );
}
