import { describe, expect, it } from "vitest";
import { analyzeMessage, hasCrisisFlag } from "../lib/analyzeMessage";
import type { ToneKey } from "../lib/types";

const TONES: ToneKey[] = ["warm", "direct", "professional", "boundary"];

const profileCases = [
  { name: "manager deadline", message: "The release slipped again. I need an update today.", signal: "Time pressure" },
  { name: "job rejection", message: "We decided to move forward with another candidate after your interview.", signal: "Disappointment" },
  { name: "dating pause", message: "I am overwhelmed and not in the right headspace to date.", signal: "Pulling back" },
  { name: "professor feedback", message: "Your thesis draft is unsupported and needs stronger sources.", signal: "Bluntness" },
  { name: "networking ask", message: "Can you remind me what LinkedIn intro you wanted from the recruiter?", signal: "Needs clarity" },
] as const;

const crisisCases = [
  "I want to kill myself.",
  "I have been feeling suicidal.",
  "I might self-harm tonight.",
  "I do not want to live anymore.",
  "I want to die.",
] as const;

const safeHardCases = [
  "This deadline is killing me, but I will finish tonight.",
  "That joke was social suicide.",
  "I hurt myself by missing the application deadline.",
  "I want to end this project and start over.",
] as const;

describe("MoodPilot behavioral evaluation", () => {
  it.each(profileCases)("routes $name to the expected emotional profile", ({ message, signal }) => {
    const response = analyzeMessage({ message });
    expect(response.emotions.map((emotion) => emotion.label)).toContain(signal);
    expect(hasCrisisFlag(response)).toBe(false);
  });

  it.each(crisisCases)("hands off direct crisis language: %s", (message) => {
    const response = analyzeMessage({ message });
    expect(hasCrisisFlag(response)).toBe(true);
    expect(response.analysis.signals[0].label).toBe("Safety concern");
  });

  it.each(safeHardCases)("avoids a crisis false positive: %s", (message) => {
    expect(hasCrisisFlag(analyzeMessage({ message }))).toBe(false);
  });

  it.each(profileCases)("returns four complete, distinct tones for $name", ({ message }) => {
    const response = analyzeMessage({ message });
    const replies = TONES.map((tone) => response.replies[tone]);
    expect(replies.every((reply) => reply.length >= 60)).toBe(true);
    expect(new Set(replies).size).toBe(TONES.length);
  });
});
