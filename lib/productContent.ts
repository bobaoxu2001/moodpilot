export const PRODUCT_PILLARS = [
  {
    title: "Understand before advice",
    body:
      "MoodPilot first names emotional context and likely intent, then drafts. The product avoids jumping straight to generic polite prose.",
  },
  {
    title: "User holds the pen",
    body:
      "Every action is user-approved. The companion copies, saves, or prepares a reminder; it never sends a message for the user.",
  },
  {
    title: "Memory is consented",
    body:
      "Personalization is opt-in, visible, and reversible. The demo stores only local browser state.",
  },
  {
    title: "Calm, not clinical",
    body:
      "This is communication support, not therapy, diagnosis, crisis care, or a mental-health record.",
  },
];

export const CORE_LOOP = [
  "Message",
  "Emotional read",
  "User goal",
  "Tone options",
  "Approved action",
  "Optional memory",
];

export const CASE_STUDY_METRICS = [
  { value: "<15s", label: "Time to useful draft" },
  { value: "55%", label: "Reply acceptance target" },
  { value: "3+/wk", label: "Week-one activation" },
  { value: "40%", label: "Week-four retention target" },
  { value: "4.5/5", label: "Trust / sounds-like-me target" },
];

export const COMPETITIVE_NOTES = [
  {
    product: "Generic chatbots",
    gap:
      "Strong at text generation, weak at a repeatable emotional read -> intent -> action loop.",
  },
  {
    product: "Grammarly-style writing assistants",
    gap:
      "Strong at polish, but less focused on social context, boundaries, and relationship intent.",
  },
  {
    product: "Mental wellness apps",
    gap:
      "Closer to emotional support, but MoodPilot deliberately stays in communication assistance.",
  },
];

export const PORTFOLIO_PROJECTS = [
  {
    name: "MoodPilot",
    role: "0 -> 1 product strategy, UX, AI response contract, Next.js prototype",
    fit:
      "Closest match for emotional AI: hard-message companion with tone control, opt-in memory, safety boundaries, and a live structured analysis API.",
    proof:
      "Shows consumer AI taste, human-AI interaction design, trust UX, and product/engineering translation.",
    href: "/case-study",
  },
  {
    name: "Fuck Your Unhappy",
    role: "Consumer stress-relief web app with AI-generated symbolic characters",
    fit:
      "Fast, playful emotional release loop: vent -> generated stress monster -> safe cartoon interaction -> shareable summary.",
    proof:
      "Shows consumer entertainment instincts, emotional-state transformation, mobile-first flow, and safety fallback thinking.",
    href:
      "/Users/xuao/Documents/2025 找工作/AI Projects/FUck_your_unhappy/fuck-your-unhappy",
  },
  {
    name: "CraveMap",
    role: "AI food discovery and restaurant growth app",
    fit:
      "Consumer personalization product with taste passport, mood/budget matching, restaurant Studio, and AI content generation.",
    proof:
      "Shows marketplace thinking, recommendation UX, onboarding, trust/compliance notes, and design-to-engineering execution.",
    href: "/Users/xuao/Documents/2025 找工作/AI Projects/cravemap",
  },
];

export const MEMORY_SETTINGS = [
  {
    title: "Remember my preferred tone",
    body: "Use saved choices to make drafts warmer, more direct, or more concise over time.",
  },
  {
    title: "Remember my boundaries",
    body: "Keep recurring preferences like fewer apologies, no chasing, or protecting focus time.",
  },
  {
    title: "Keep a private reply history",
    body: "Save chosen drafts locally so the user can reuse phrasing later.",
  },
  {
    title: "Proactive suggestions",
    body: "Future concept: offer help when a message appears tense, with explicit user permission.",
  },
];

export const LEARNED_EXAMPLES = [
  "Prefers warm-but-direct tone",
  'Tends to over-apologize; nudge toward fewer "sorry"s',
  "Likes one clear next step in every reply",
  "Boundary: protects focus time before 11am",
];
