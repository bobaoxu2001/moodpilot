import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { CompanionLoop } from "@/components/companion/CompanionLoop";

export const metadata: Metadata = {
  title: "Companion — MoodPilot",
  description:
    "Paste or pick a difficult message. MoodPilot reads the emotional context and drafts replies in four tones.",
};

export default function CompanionPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Companion"
        title="Read the room. Reply with intent."
        description="Pick a scenario or paste your own message. MoodPilot shows what's happening emotionally, what you probably want, and reply options you can shape — you stay in control of every send."
      />
      <CompanionLoop />
    </div>
  );
}
