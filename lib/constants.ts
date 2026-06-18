import type { ToneOption, SuggestedAction } from "./types";

export const TONE_OPTIONS: ToneOption[] = [
  { key: "warm", label: "Warm", blurb: "Empathetic, relationship-first" },
  { key: "direct", label: "Direct", blurb: "Clear, concise, no hedging" },
  { key: "professional", label: "Professional", blurb: "Composed and neutral" },
  { key: "boundary", label: "Boundary-setting", blurb: "Kind but firm limits" },
];

export const DEFAULT_ACTIONS: SuggestedAction[] = [
  { key: "reply", label: "Reply now", description: "Copy the draft and send it yourself" },
  { key: "save", label: "Save", description: "Keep this draft in your History" },
  { key: "remind", label: "Set reminder", description: "Nudge yourself to respond later" },
  { key: "follow-up", label: "Generate follow-up", description: "Draft a gentle nudge for no reply" },
];

export const SAFETY_COPY =
  "Not therapy. Not diagnosis. Communication support only.";

export const TRUST_COPY = "Only uses the text you choose to share.";

export const PRODUCT_TAGLINE =
  "Understand the message. Choose your words. Stay in control.";
