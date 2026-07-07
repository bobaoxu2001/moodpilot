"use client";

import { useState } from "react";
import { Card, CardEyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { TONE_OPTIONS } from "@/lib/constants";
import type { ReplyDraft, ToneKey } from "@/lib/types";
import { cn } from "@/lib/cn";

export function ReplyStudio({
  replies,
  tone,
  onToneChange,
}: {
  replies: Record<ToneKey, ReplyDraft>;
  tone: ToneKey;
  onToneChange: (t: ToneKey) => void;
}) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">("idle");
  const draft = replies[tone];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(draft.text);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 1800);
    } catch {
      setCopyStatus("failed");
    }
  };

  return (
    <Card className="reveal reveal-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CardEyebrow>Reply options</CardEyebrow>
        <span className="text-xs text-ink-faint">Switch tone — same intent, different voice</span>
      </div>

      {/* Tone tabs */}
      <div className="flex flex-wrap gap-2">
        {TONE_OPTIONS.map((opt) => {
          const active = opt.key === tone;
          return (
            <button
              key={opt.key}
              onClick={() => onToneChange(opt.key)}
              aria-pressed={active}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                active
                  ? "bg-gradient-to-br from-lavender-500 to-lavender-600 text-white shadow-soft"
                  : "bg-lavender-50 text-lavender-700 hover:bg-lavender-100"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-ink-faint">
        {TONE_OPTIONS.find((o) => o.key === tone)?.blurb}
      </p>

      {/* Draft */}
      <div
        key={tone}
        className="reveal mt-4 rounded-3xl border border-lavender-100 bg-cream-50 p-5"
      >
        <p className="text-pretty text-[15px] leading-relaxed text-ink">
          {draft.text}
        </p>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-ink-soft">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-lavender-400">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
          <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span>
          <span className="font-medium text-ink-soft">Why this works: </span>
          {draft.rationale}
        </span>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <Button variant="primary" size="sm" onClick={copy}>
          {copyStatus === "copied" ? (
            <>
              <CheckIcon /> Copied
            </>
          ) : (
            <>
              <CopyIcon /> Copy draft
            </>
          )}
        </Button>
        <span className="sr-only" role="status" aria-live="polite">
          {copyStatus === "copied" ? "Draft copied." : copyStatus === "failed" ? "Copy failed. Select the draft text manually." : ""}
        </span>
        <span className="text-xs text-ink-faint">
          You always send it yourself — MoodPilot never sends on your behalf.
        </span>
      </div>
      {copyStatus === "failed" && (
        <p className="mt-2 text-xs font-medium text-peach-600">
          Copy was blocked. Select the draft text above and copy it manually.
        </p>
      )}
    </Card>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect x="8" y="8" width="12" height="12" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 16V6a2 2 0 0 1 2-2h9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
