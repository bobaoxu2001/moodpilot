import type { EmotionalSignal } from "@/lib/types";

// A soft horizontal meter visualizing the (mock) confidence of each
// emotional signal. Purely illustrative — labeled clearly as an estimate.
export function SignalMeter({ signal }: { signal: EmotionalSignal }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-sm">
        <span className="text-ink-soft">{signal.label}</span>
        <span className="tabular-nums text-xs text-ink-faint">
          {signal.intensity}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-lavender-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-lavender-400 to-peach-300 transition-[width] duration-700 ease-out"
          style={{ width: `${signal.intensity}%` }}
        />
      </div>
    </div>
  );
}
