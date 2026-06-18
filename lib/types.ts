// Core domain types for MoodPilot.
// All AI output in this MVP is static/mock — these types model the shape
// a real model response would take so the UI stays production-shaped.

export type ToneKey = "warm" | "direct" | "professional" | "boundary";

export type Channel = "Slack" | "Email" | "LinkedIn" | "Dating" | "Feedback";

export type MemoryPreference = "opt-in" | "ask" | "never";

export interface ToneOption {
  key: ToneKey;
  label: string;
  blurb: string;
}

export interface EmotionalSignal {
  label: string;
  // 0–100 confidence used only for the visual meter
  intensity: number;
}

export interface ReplyDraft {
  tone: ToneKey;
  text: string;
  // A one-line rationale shown under the draft
  rationale: string;
}

export interface SuggestedAction {
  key: "reply" | "save" | "remind" | "follow-up";
  label: string;
  description: string;
}

export interface Analysis {
  // 1. What's happening emotionally
  whatsHappening: string;
  signals: EmotionalSignal[];
  // 2. What the user probably wants to achieve
  likelyGoal: string;
  goalDetails: string[];
}

export interface Scenario {
  id: string;
  title: string;
  channel: Channel;
  sender: string;
  context: string;
  // The incoming message the user is trying to respond to
  message: string;
  analysis: Analysis;
  replies: Record<ToneKey, ReplyDraft>;
  actions: SuggestedAction[];
}

export interface HistoryEntry {
  id: string;
  scenarioId: string;
  scenarioTitle: string;
  channel: Channel;
  tone: ToneKey;
  replyText: string;
  savedAt: string; // ISO timestamp
  remembered: boolean;
}
