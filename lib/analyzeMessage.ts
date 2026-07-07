import type { Analysis, ReplyDraft, ToneKey } from "./types";

export interface AnalyzeRequest {
  message: string;
  context?: string;
  preferredTone?: ToneKey;
}

export interface EmotionScore {
  label: string;
  intensity: number;
}

export interface AnalyzeResponse {
  emotions: EmotionScore[];
  user_goal: string;
  replies: Record<ToneKey, string>;
  safety_flags: string[];
  analysis: Analysis;
  replyDrafts: Record<ToneKey, ReplyDraft>;
  what_is_mocked: string;
}

const CRISIS_TERMS = [
  "kill myself",
  "killing myself",
  "suicide",
  "suicidal",
  "self harm",
  "harm myself",
  "hurt myself",
  "end it all",
  "do not want to live",
  "don't want to live",
  "want to die",
];

export function analyzeMessage({
  message,
  context,
}: AnalyzeRequest): AnalyzeResponse {
  const text = message.trim();
  const lower = text.toLowerCase().replace(/[‐‑‒–—-]/g, " ").replace(/\s+/g, " ");
  const crisis = CRISIS_TERMS.some((term) => lower.includes(term));
  const profile = chooseProfile(lower);

  const safety_flags = [
    "communication_support_only",
    "not_therapy_or_diagnosis",
    "user_must_review_before_sending",
  ];

  if (crisis) {
    safety_flags.push("crisis_language_detected_handoff_to_human_support");
  }

  const analysis = crisis
    ? crisisAnalysis()
    : {
        whatsHappening: profile.whatsHappening(context),
        signals: profile.signals,
        likelyGoal: profile.userGoal,
        goalDetails: profile.goalDetails,
      };

  const replies = crisis ? crisisReplies() : profile.replies;
  const replyDrafts = toReplyDrafts(replies, crisis);

  return {
    emotions: analysis.signals.map((signal) => ({
      label: signal.label,
      intensity: signal.intensity,
    })),
    user_goal: analysis.likelyGoal,
    replies,
    safety_flags,
    analysis,
    replyDrafts,
    what_is_mocked:
      "This route is a deterministic structured-analysis demo. It exercises the real API contract without sending text to an external model.",
  };
}

export function hasCrisisFlag(response: Pick<AnalyzeResponse, "safety_flags">) {
  return response.safety_flags.includes(
    "crisis_language_detected_handoff_to_human_support"
  );
}

function chooseProfile(lower: string) {
  if (includesAny(lower, ["rejection", "candidate", "interview", "future roles"])) {
    return rejectionProfile;
  }
  if (includesAny(lower, ["date", "dating", "headspace", "disappear", "overwhelmed"])) {
    return datingProfile;
  }
  if (includesAny(lower, ["professor", "draft", "thesis", "unsupported", "sources"])) {
    return feedbackProfile;
  }
  if (includesAny(lower, ["intro", "linkedin", "connect", "recruiter"])) {
    return networkingProfile;
  }
  return workplaceProfile;
}

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

const workplaceProfile = {
  whatsHappening: (context?: string) =>
    `This reads as pressure and accountability, not personal hostility. ${
      context ? "Given the context, " : ""
    }the sender likely wants reliability, a specific next step, and confidence that the situation is under control.`,
  signals: [
    { label: "Time pressure", intensity: 82 },
    { label: "Frustration", intensity: 64 },
    { label: "Wants accountability", intensity: 78 },
  ],
  userGoal:
    "You likely want to take ownership, lower defensiveness, and give one concrete plan or timing commitment.",
  goalDetails: [
    "Acknowledge the concern without spiraling into apology",
    "Offer a specific next step or delivery time",
    "Keep the relationship steady and move the thread toward resolution",
  ],
  replies: {
    warm:
      "Totally hear you. I understand why this is frustrating, and I do not want to add more uncertainty here. I am on it now and will send the next concrete update shortly with the remaining blocker clearly called out.",
    direct:
      "You are right to flag this. I own the delay. I am resolving it now and will send a clear update with timing, blocker, and next step so planning can move forward.",
    professional:
      "Thanks for raising this. I understand the planning impact and take responsibility for not surfacing the risk earlier. I will provide a concise status update and prevention plan today.",
    boundary:
      "I can give the full context and a concrete fix today. I would prefer to move the detailed discussion to a 1:1 or DM so we can resolve it productively rather than continue the thread publicly.",
  },
};

const rejectionProfile = {
  whatsHappening: () =>
    "This is a warm but final rejection. The door is not guaranteed open, but the wording leaves room for a graceful relationship-preserving reply.",
  signals: [
    { label: "Disappointment", intensity: 65 },
    { label: "Low conflict", intensity: 24 },
    { label: "Door slightly open", intensity: 54 },
  ],
  userGoal:
    "You likely want to respond graciously, preserve goodwill, and lightly keep the future door open.",
  goalDetails: [
    "Thank them without sounding bitter",
    "Signal continued interest",
    "Ask for feedback only if it stays low pressure",
  ],
  replies: {
    warm:
      "Thank you for letting me know and for such a thoughtful process. I am disappointed, but I really enjoyed meeting the team and would love to stay in touch for future roles that may be a fit.",
    direct:
      "Appreciate the update and the time the team invested. I remain interested in the company, so please keep me in mind for future roles. If there is one piece of feedback you can share, I would value it.",
    professional:
      "Thank you for the update and for the opportunity to interview. I respect the decision and remain genuinely interested in the team's work. I would welcome being considered for suitable future openings.",
    boundary:
      "Thanks for the clarity. I enjoyed the conversations and am open to future roles, but I will leave it with you rather than follow up repeatedly. If something fitting opens up, I would be glad to hear from you.",
  },
};

const datingProfile = {
  whatsHappening: () =>
    "This sounds considerate but lower-energy. They may be stepping back rather than asking for more effort from you.",
  signals: [
    { label: "Honesty", intensity: 76 },
    { label: "Pulling back", intensity: 70 },
    { label: "Door slightly open", intensity: 38 },
  ],
  userGoal:
    "You likely want to keep self-respect, acknowledge their honesty, and decide whether to leave a light door open.",
  goalDetails: [
    "Do not chase ambiguity",
    "Match their honesty",
    "Choose a clean close or a low-pressure door open",
  ],
  replies: {
    warm:
      "I appreciate you saying that instead of disappearing. I enjoyed chatting too, and I completely understand needing space. If things shift later, I would be open to picking it back up. Take care either way.",
    direct:
      "Thanks for being upfront. I had a good time chatting too. Sounds like the timing is not right, which is totally fair. Wishing you well with everything.",
    professional:
      "I appreciate you taking the time to say this clearly. I enjoyed our conversation as well and understand needing to step back. All the best.",
    boundary:
      "I appreciate the honesty. I had fun, but I am not really up for keeping something on indefinite pause, so I will wish you well rather than leave it open-ended.",
  },
};

const feedbackProfile = {
  whatsHappening: () =>
    "The feedback is blunt and high-stakes, but it is about the work. The sender is asking for evidence of revision, which means there is still a path forward.",
  signals: [
    { label: "Bluntness", intensity: 84 },
    { label: "Concern", intensity: 70 },
    { label: "Still invested", intensity: 58 },
  ],
  userGoal:
    "You likely want to show you take the critique seriously and convert it into a concrete revision plan.",
  goalDetails: [
    "Separate critique of the work from self-worth",
    "Respond with a plan, not reassurance",
    "Ask one focused question if needed",
  ],
  replies: {
    warm:
      "Thank you for the candid feedback. I would rather hear it clearly now than too late. I see the issues with focus and support, and I will send a revised outline with stronger evidence before we meet.",
    direct:
      "Understood. The draft is not where it needs to be. I will tighten the thesis, replace thin sources, and mark unsupported claims for revision. I will send a revised outline by Friday.",
    professional:
      "Thank you for the detailed assessment. I take the concerns seriously and will revise the central argument, strengthen the evidence base, and address unsupported claims before our meeting.",
    boundary:
      "I appreciate the direct critique and am committed to raising the standard. I will deliver a focused revision plan by Friday, and it would help me most if our next feedback round centers on specific sections to fix.",
  },
};

const networkingProfile = {
  whatsHappening: () =>
    "This is a low-energy but genuine opening. The sender is willing to help if the ask is specific and easy to act on.",
  signals: [
    { label: "Busy but willing", intensity: 72 },
    { label: "Needs clarity", intensity: 82 },
    { label: "Low conflict", intensity: 26 },
  ],
  userGoal:
    "You likely want to restate the ask clearly, lower the effort required, and preserve goodwill.",
  goalDetails: [
    "No guilt about the delay",
    "One specific ask",
    "Give an easy out",
  ],
  replies: {
    warm:
      "No worries at all. I was hoping for a quick intro to someone on the product or design team. Even a name or permission to mention you would help, and no pressure if now is not a good time.",
    direct:
      "All good. Short version: I am looking for a warm intro to someone on the product team. If you can point me to the right person or pass along my name, that would be hugely helpful.",
    professional:
      "Thanks for getting back to me. I was hoping you might introduce me to someone on the product team as I explore consumer AI roles. A brief intro or pointer would be greatly appreciated if convenient.",
    boundary:
      "No problem. Quick recap: I would appreciate an intro to the product team if it is easy. If it is not the right fit or timing, totally fine to pass.",
  },
};

function crisisAnalysis(): Analysis {
  return {
    whatsHappening:
      "This message may include crisis or self-harm language. MoodPilot should not draft persuasive replies here; the right next step is human support and immediate safety.",
    signals: [
      { label: "Safety concern", intensity: 95 },
      { label: "Needs human support", intensity: 90 },
      { label: "Communication drafting risk", intensity: 86 },
    ],
    likelyGoal:
      "Pause the drafting flow and encourage the user to contact a trusted person or emergency/local crisis resource.",
    goalDetails: [
      "Do not diagnose or counsel",
      "Do not generate a manipulative or high-stakes reply",
      "Point toward immediate human help",
    ],
  };
}

function crisisReplies(): Record<ToneKey, string> {
  const text =
    "I am really sorry this feels this heavy. I cannot help draft around self-harm or crisis language, but I do want you to reach a real person now: contact someone you trust or local emergency/crisis support immediately.";
  return {
    warm: text,
    direct: text,
    professional: text,
    boundary: text,
  };
}

function toReplyDrafts(
  replies: Record<ToneKey, string>,
  crisis: boolean
): Record<ToneKey, ReplyDraft> {
  return {
    warm: {
      tone: "warm",
      text: replies.warm,
      rationale: crisis
        ? "Switches from drafting to safety handoff."
        : "Leads with emotional acknowledgement while keeping the next step clear.",
    },
    direct: {
      tone: "direct",
      text: replies.direct,
      rationale: crisis
        ? "Avoids overstepping into counseling."
        : "States ownership and action without extra hedging.",
    },
    professional: {
      tone: "professional",
      text: replies.professional,
      rationale: crisis
        ? "Keeps the boundary explicit."
        : "Keeps the reply composed and appropriate for formal contexts.",
    },
    boundary: {
      tone: "boundary",
      text: replies.boundary,
      rationale: crisis
        ? "Prioritizes immediate human support."
        : "Protects the user's needs while still responding constructively.",
    },
  };
}
