"use client";

import type { MemoryPreference } from "@/lib/types";
import { cn } from "@/lib/cn";

const OPTIONS: {
  key: MemoryPreference;
  label: string;
  description: string;
}[] = [
  {
    key: "opt-in",
    label: "Remember (opt-in)",
    description:
      "MoodPilot keeps context from saved conversations to personalize future suggestions.",
  },
  {
    key: "ask",
    label: "Ask before remembering",
    description:
      "MoodPilot checks with you each time before storing anything from a conversation.",
  },
  {
    key: "never",
    label: "Do not remember",
    description:
      "Nothing is stored beyond your current session. Every message starts fresh.",
  },
];

export function MemoryControl({
  preference,
  onChange,
  compact = false,
}: {
  preference: MemoryPreference;
  onChange: (p: MemoryPreference) => void;
  compact?: boolean;
}) {
  return (
    <div className={cn("grid gap-2.5", !compact && "sm:grid-cols-3")}>
      {OPTIONS.map((opt) => {
        const active = opt.key === preference;
        return (
          <button
            key={opt.key}
            onClick={() => onChange(opt.key)}
            aria-pressed={active}
            className={cn(
              "flex flex-col gap-1.5 rounded-3xl border p-4 text-left transition-all duration-200",
              active
                ? "border-lavender-300 bg-white shadow-glow"
                : "border-white/70 bg-white/60 hover:border-lavender-200 hover:shadow-soft"
            )}
          >
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "grid h-4 w-4 place-items-center rounded-full border-2 transition-colors",
                  active ? "border-lavender-500 bg-lavender-500" : "border-lavender-200"
                )}
              >
                {active && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
              <span className="text-sm font-medium text-ink">{opt.label}</span>
            </span>
            <span className="text-xs leading-relaxed text-ink-soft">
              {opt.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
