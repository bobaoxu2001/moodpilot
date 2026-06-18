"use client";

import { useMemo, useState } from "react";
import { SCENARIOS, getScenario } from "@/lib/scenarios";
import type { SuggestedAction, ToneKey, HistoryEntry } from "@/lib/types";
import type { AnalyzeResponse } from "@/lib/analyzeMessage";
import { useHistory, useMemoryPreference } from "@/lib/useMoodPilot";
import { Card, CardEyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChannelBadge } from "@/components/ui/Badge";
import { Toast } from "@/components/ui/Toast";
import { SafetyBanner } from "@/components/ui/SafetyBanner";
import { ScenarioPicker } from "./ScenarioPicker";
import { AnalysisCard } from "./AnalysisCard";
import { ReplyStudio } from "./ReplyStudio";
import { NextActions } from "./NextActions";
import { ApprovalDialog } from "./ApprovalDialog";
import { MemoryControl } from "./MemoryControl";

export function CompanionLoop() {
  const [activeId, setActiveId] = useState(SCENARIOS[0].id);
  const scenario = getScenario(activeId)!;

  const [messageText, setMessageText] = useState(scenario.message);
  const [analyzed, setAnalyzed] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [tone, setTone] = useState<ToneKey>("warm");
  const [pendingAction, setPendingAction] = useState<SuggestedAction | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [rememberThis, setRememberThis] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalyzeResponse | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const { add: addHistory } = useHistory();
  const { preference, setPreference } = useMemoryPreference();

  const canRemember = preference !== "never";

  const flashToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2600);
  };

  const selectScenario = (id: string) => {
    const next = getScenario(id);
    if (!next) return;
    setActiveId(id);
    setMessageText(next.message);
    setAnalyzed(false);
    setAnalysisResult(null);
    setApiError(null);
    setTone("warm");
    setRememberThis(false);
  };

  const analyze = async () => {
    setAnalyzing(true);
    setApiError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          context: scenario.context,
          preferredTone: tone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Analyze request failed with ${response.status}`);
      }

      const payload = (await response.json()) as AnalyzeResponse;
      setAnalysisResult(payload);
      setAnalyzed(true);
    } catch {
      setAnalysisResult(null);
      setApiError("API unavailable — showing the curated scenario read.");
      setAnalyzing(false);
      setAnalyzed(true);
      return;
    }

    setAnalyzing(false);
  };

  const activeAnalysis = analysisResult?.analysis ?? scenario.analysis;
  const activeReplies = analysisResult?.replyDrafts ?? scenario.replies;
  const activeReply = activeReplies[tone];

  const confirmAction = () => {
    const action = pendingAction;
    setPendingAction(null);
    if (!action) return;

    switch (action.key) {
      case "reply": {
        navigator.clipboard?.writeText(activeReply.text).catch(() => {});
        flashToast("Draft copied — you send it yourself.");
        break;
      }
      case "save": {
        const entry: HistoryEntry = {
          id: `${scenario.id}-${Date.now()}`,
          scenarioId: scenario.id,
          scenarioTitle: scenario.title,
          channel: scenario.channel,
          tone,
          replyText: activeReply.text,
          savedAt: new Date().toISOString(),
          remembered: canRemember && rememberThis,
        };
        addHistory(entry);
        flashToast(
          canRemember && rememberThis
            ? "Saved to History — context remembered."
            : "Saved to History — nothing remembered."
        );
        break;
      }
      case "remind": {
        flashToast("Reminder set for tomorrow, 9:00 AM (simulated).");
        break;
      }
      case "follow-up": {
        flashToast("Gentle follow-up draft generated (simulated).");
        break;
      }
    }
  };

  const memoryHint = useMemo(() => {
    if (preference === "never") return "Memory is off — nothing will be stored.";
    if (preference === "opt-in") return "Saved conversations may be remembered.";
    return "MoodPilot will ask before remembering this conversation.";
  }, [preference]);

  return (
    <>
      {/* Scenario selection */}
      <Card className="mb-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <CardEyebrow>Choose a scenario</CardEyebrow>
          <span className="text-xs text-ink-faint">Five real-world situations</span>
        </div>
        <ScenarioPicker activeId={activeId} onSelect={selectScenario} />
      </Card>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,420px)_1fr]">
        {/* Left: incoming message */}
        <div className="space-y-5">
          <Card>
            <div className="mb-3 flex items-center justify-between gap-2">
              <ChannelBadge channel={scenario.channel} />
              <span className="text-xs text-ink-faint">From {scenario.sender}</span>
            </div>
            <p className="mb-3 text-xs leading-relaxed text-ink-soft">
              {scenario.context}
            </p>
            <label className="mb-1.5 block text-xs font-medium text-ink-soft">
              The message you received
            </label>
            <textarea
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
                setAnalyzed(false);
              }}
              rows={7}
              className="soft-scroll w-full resize-none rounded-3xl border border-lavender-100 bg-cream-50 p-4 text-sm leading-relaxed text-ink outline-none transition focus:border-lavender-300 focus:ring-2 focus:ring-lavender-200"
            />
            <p className="mt-2 text-xs text-ink-faint">
              Edit freely — or paste your own message. Only the text here is used.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={analyze} disabled={analyzing || !messageText.trim()}>
                {analyzing ? (
                  <>
                    <span className="h-3.5 w-3.5 animate-soft-pulse rounded-full bg-white/80" />
                    Reading the room…
                  </>
                ) : analyzed ? (
                  "Re-analyze"
                ) : (
                  "Analyze message"
                )}
              </Button>
            </div>
            {apiError && (
              <p className="mt-3 rounded-2xl bg-peach-50 px-3 py-2 text-xs text-peach-600">
                {apiError}
              </p>
            )}
          </Card>

          <SafetyBanner />
        </div>

        {/* Right: results */}
        <div className="space-y-5">
          {!analyzed && !analyzing && (
            <Card className="flex min-h-[320px] flex-col items-center justify-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-3xl bg-lavender-100 text-lavender-500">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M4 14c2.5 0 3-5 6-5s3.5 5 6 5 3.5-3 4-4" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-4 font-serif text-xl font-semibold text-ink">
                Ready when you are
              </h3>
              <p className="mt-1.5 max-w-sm text-sm text-ink-soft">
                Press <span className="font-medium text-lavender-700">Analyze message</span> to
                see what&apos;s happening emotionally, what you likely want, and reply options
                in four tones.
              </p>
            </Card>
          )}

          {analyzing && (
            <div className="space-y-4">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-28 rounded-4xl border border-white/70 bg-gradient-to-r from-white/60 via-lavender-50 to-white/60 bg-[length:200%_100%] animate-shimmer"
                />
              ))}
            </div>
          )}

          {analyzed && !analyzing && (
            <>
              <AnalysisCard analysis={activeAnalysis} />
              {analysisResult && (
                <Card className="border-lavender-100 bg-lavender-50/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <CardEyebrow>API output</CardEyebrow>
                    <span className="text-xs text-ink-faint">Structured JSON from /api/analyze</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {analysisResult.safety_flags.map((flag) => (
                      <span
                        key={flag}
                        className="rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-lavender-700"
                      >
                        {flag.replaceAll("_", " ")}
                      </span>
                    ))}
                  </div>
                </Card>
              )}
              <ReplyStudio replies={activeReplies} tone={tone} onToneChange={setTone} />
              <NextActions actions={scenario.actions} onAction={setPendingAction} />

              {/* Inline memory control */}
              <Card>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <CardEyebrow>Memory preference</CardEyebrow>
                  <span className="text-xs text-ink-faint">{memoryHint}</span>
                </div>
                <MemoryControl preference={preference} onChange={setPreference} />

                {preference === "ask" && (
                  <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-3xl bg-cream-100 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={rememberThis}
                      onChange={(e) => setRememberThis(e.target.checked)}
                      className="h-4 w-4 accent-lavender-500"
                    />
                    <span className="text-sm text-ink-soft">
                      Remember this conversation when I save it
                    </span>
                  </label>
                )}
                {preference === "opt-in" && (
                  <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-3xl bg-cream-100 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={rememberThis}
                      onChange={(e) => setRememberThis(e.target.checked)}
                      className="h-4 w-4 accent-lavender-500"
                    />
                    <span className="text-sm text-ink-soft">
                      Include this conversation in memory (you can turn it off anytime)
                    </span>
                  </label>
                )}
              </Card>
            </>
          )}
        </div>
      </div>

      <ApprovalDialog
        action={pendingAction}
        onConfirm={confirmAction}
        onCancel={() => setPendingAction(null)}
      />
      <Toast message={toast} />
    </>
  );
}
