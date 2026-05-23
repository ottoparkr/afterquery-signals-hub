import type { SignalType, Urgency } from "./mockData";
import { Banknote, Megaphone, FileText, Briefcase, AlertTriangle, Users, Flag } from "lucide-react";

export const SIGNAL_ICON: Record<SignalType, typeof Banknote> = {
  Funding: Banknote,
  Press: Megaphone,
  Research: FileText,
  Hiring: Briefcase,
  Usage: AlertTriangle,
  Relationship: Users,
  Competitor: Flag,
};

export const SIGNAL_EMOJI: Record<SignalType, string> = {
  Funding: "💰",
  Press: "📣",
  Research: "📄",
  Hiring: "💼",
  Usage: "⚠️",
  Relationship: "🤝",
  Competitor: "🏁",
};

export const URGENCY_CLASS: Record<Urgency, string> = {
  High: "bg-[color:var(--urgency-high)]/15 text-[color:var(--urgency-high)] border-[color:var(--urgency-high)]/40",
  Medium: "bg-[color:var(--urgency-medium)]/15 text-[color:var(--urgency-medium)] border-[color:var(--urgency-medium)]/40",
  Low: "bg-[color:var(--urgency-low)]/15 text-[color:var(--urgency-low)] border-[color:var(--urgency-low)]/40",
};

export function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const d = Math.floor(diff / 86_400_000);
  if (d === 0) {
    const h = Math.floor(diff / 3_600_000);
    return h <= 1 ? "just now" : `${h}h ago`;
  }
  if (d === 1) return "yesterday";
  if (d < 7) return `${d}d ago`;
  if (d < 30) return `${Math.floor(d / 7)}w ago`;
  return `${Math.floor(d / 30)}mo ago`;
}

export function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
  return `$${n}`;
}
