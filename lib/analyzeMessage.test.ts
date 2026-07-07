import { describe, expect, it } from "vitest";
import { analyzeMessage, hasCrisisFlag } from "./analyzeMessage";

describe("analyzeMessage", () => {
  it("returns the documented structured response", () => {
    const response = analyzeMessage({ message: "The release is late again." });

    expect(response.emotions.length).toBeGreaterThan(0);
    expect(response.replies).toHaveProperty("warm");
    expect(response.safety_flags).toContain("user_must_review_before_sending");
    expect(hasCrisisFlag(response)).toBe(false);
  });

  it.each([
    "I want to kill myself",
    "I have been feeling suicidal",
    "I might self-harm",
    "I don't want to live",
  ])("routes crisis language to human support: %s", (message) => {
    const response = analyzeMessage({ message });

    expect(hasCrisisFlag(response)).toBe(true);
    expect(response.analysis.likelyGoal).toContain("crisis resource");
  });

  it("does not flag ordinary difficult messages", () => {
    const response = analyzeMessage({
      message: "This deadline is killing me, but I will send the draft tonight.",
    });

    expect(hasCrisisFlag(response)).toBe(false);
  });
});
