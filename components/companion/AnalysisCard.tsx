import { Card, CardEyebrow } from "@/components/ui/Card";
import { SignalMeter } from "./SignalMeter";
import type { Analysis } from "@/lib/types";

export function AnalysisCard({ analysis }: { analysis: Analysis }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {/* 1. What's happening emotionally */}
      <Card className="reveal reveal-1">
        <CardEyebrow>What&apos;s happening emotionally</CardEyebrow>
        <p className="text-pretty text-[15px] leading-relaxed text-ink-soft">
          {analysis.whatsHappening}
        </p>
        <div className="mt-5 space-y-3">
          {analysis.signals.map((sig) => (
            <SignalMeter key={sig.label} signal={sig} />
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-faint">
          Estimated read of tone — a guide, not a verdict.
        </p>
      </Card>

      {/* 2. What you probably want to achieve */}
      <Card className="reveal reveal-2">
        <CardEyebrow>What you probably want</CardEyebrow>
        <p className="text-pretty text-[15px] leading-relaxed text-ink-soft">
          {analysis.likelyGoal}
        </p>
        <ul className="mt-5 space-y-2.5">
          {analysis.goalDetails.map((d) => (
            <li key={d} className="flex items-start gap-2.5 text-sm text-ink-soft">
              <span className="mt-1.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-sage-100 text-sage-700">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {d}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
