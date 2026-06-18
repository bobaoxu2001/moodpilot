import { DEFAULT_ACTIONS } from "./constants";
import type { Scenario } from "./types";

// Static, hand-authored mock outputs. In a production build these would be
// returned by a model; here they let the demo run with zero backend.

export const SCENARIOS: Scenario[] = [
  {
    id: "slack-manager",
    title: "Tense Slack thread with your manager",
    channel: "Slack",
    sender: "Dana (Engineering Manager)",
    context:
      "You shipped a feature a day late. Your manager replied in a public channel.",
    message:
      "Hey — I noticed the release slipped again. This is the second time this quarter. I need to understand what's going on here, because it's starting to affect how the team plans. Can you get back to me today?",
    analysis: {
      whatsHappening:
        "Dana sounds frustrated and a little anxious about predictability, not personally hostile. The phrase “affect how the team plans” signals her real worry is reliability and her own exposure to leadership — not punishing you. The public channel raises the stakes and can read as pressure.",
      signals: [
        { label: "Frustration", intensity: 68 },
        { label: "Anxiety about reliability", intensity: 74 },
        { label: "Wants accountability", intensity: 80 },
      ],
      likelyGoal:
        "You want to take ownership without sounding defensive, restore trust in your reliability, and move the conversation somewhere lower-stakes than a public channel.",
      goalDetails: [
        "Acknowledge the slip without over-apologizing",
        "Offer a concrete cause and a fix, not excuses",
        "Steer to a 1:1 or DM rather than the public thread",
      ],
    },
    replies: {
      warm: {
        tone: "warm",
        text:
          "Totally hear you, Dana — the slip is on me and I get why it's frustrating when planning depends on it. The blocker was a late dependency from the data team, but I should have flagged the risk sooner. Can I grab 15 minutes today to walk you through what happened and how I'll de-risk the next one?",
        rationale:
          "Leads with empathy and ownership, names a cause without blaming, and proposes a private next step.",
      },
      direct: {
        tone: "direct",
        text:
          "You're right, it slipped — second time, and that's on me. Cause: a late dependency I should have surfaced earlier. Fix: I'll post a risk flag at the start of each sprint and pad the estimate. Want to sync at 2pm to confirm the plan?",
        rationale:
          "Concise, accountable, and immediately solution-oriented with a specific commitment.",
      },
      professional: {
        tone: "professional",
        text:
          "Thanks for raising this, Dana. I acknowledge the release slipped and understand the impact on planning. The primary cause was an upstream dependency that arrived late; I take responsibility for not escalating the risk earlier. I'd like to align on a prevention plan — could we connect 1:1 today at a time that works for you?",
        rationale:
          "Composed and neutral; suitable if leadership may read the thread.",
      },
      boundary: {
        tone: "boundary",
        text:
          "Happy to give you the full picture today, Dana — and I'd find it more productive to do that in a DM or 1:1 rather than the channel, so we can get into specifics. Quick version: a late upstream dependency caused the slip, it's on me to have flagged it sooner, and I have a fix. When works for you?",
        rationale:
          "Kindly redirects the conversation out of the public channel while still committing to accountability.",
      },
    },
    actions: DEFAULT_ACTIONS,
  },
  {
    id: "job-rejection",
    title: "Job rejection email",
    channel: "Email",
    sender: "Talent Team, Northwind",
    context:
      "You reached the final round for a role you were excited about.",
    message:
      "Thank you for taking the time to interview with us. After careful consideration, we've decided to move forward with another candidate whose experience more closely matched our current needs. We were impressed by you and hope you'll consider future roles with us. We wish you the very best.",
    analysis: {
      whatsHappening:
        "This is a warm, standard rejection. The “impressed by you / future roles” language is a genuine soft door, not just boilerplate, but it isn't a guarantee. It's normal to feel deflated; the message itself is low-conflict.",
      signals: [
        { label: "Disappointment (yours)", intensity: 62 },
        { label: "Door left open", intensity: 55 },
        { label: "Low conflict", intensity: 20 },
      ],
      likelyGoal:
        "You want to respond gracefully, stay memorable for future openings, and leave the relationship warmer than you found it — without sounding bitter or desperate.",
      goalDetails: [
        "Thank them sincerely and briefly",
        "Signal genuine continued interest",
        "Optionally ask for feedback, lightly",
      ],
    },
    replies: {
      warm: {
        tone: "warm",
        text:
          "Thank you so much for letting me know, and for such a thoughtful process — I really enjoyed meeting the team. I'm disappointed, but I completely understand. I'd genuinely love to stay in touch and be considered for the right role down the line. Wishing you and the new hire a great start!",
        rationale:
          "Gracious and human; keeps the door warm without pushing.",
      },
      direct: {
        tone: "direct",
        text:
          "Appreciate the update and the time the team gave me. I'm still very interested in Northwind — please keep me in mind for future roles. If you're open to sharing one piece of feedback from the final round, I'd value it.",
        rationale:
          "Brief, confident, and makes a clear, low-pressure feedback ask.",
      },
      professional: {
        tone: "professional",
        text:
          "Thank you for the update and for the opportunity to interview with Northwind. I respect the decision and remain genuinely interested in the team's work. I'd welcome being considered for suitable future openings, and I'm grateful for the time everyone invested. Best wishes to you and the incoming team member.",
        rationale:
          "Polished and neutral; safe for a formal relationship you want to preserve.",
      },
      boundary: {
        tone: "boundary",
        text:
          "Thanks for the update — I appreciate the clarity. I enjoyed the conversations and I'm open to future roles, but I'll leave it with you rather than follow up repeatedly. If something fitting opens up, I'd be glad to hear from you.",
        rationale:
          "Protects your energy: warm, but sets expectations so you're not left chasing.",
      },
    },
    actions: DEFAULT_ACTIONS,
  },
  {
    id: "linkedin-followup",
    title: "Awkward LinkedIn follow-up",
    channel: "LinkedIn",
    sender: "Priya (you met once at a conference)",
    context:
      "You messaged Priya two weeks ago about a possible intro and heard nothing.",
    message:
      "Hi! So sorry for the slow reply — things have been completely buried on my end. Remind me what you were hoping to connect about? Happy to help if I can.",
    analysis: {
      whatsHappening:
        "Priya is mildly embarrassed about the delay and is offering a genuine but low-energy opening. “Remind me” means she doesn't recall the specifics — so the burden is on you to make it effortless for her to say yes.",
      signals: [
        { label: "Mild guilt", intensity: 48 },
        { label: "Willing but busy", intensity: 70 },
        { label: "Needs a low-effort ask", intensity: 82 },
      ],
      likelyGoal:
        "You want to re-state your ask in one frictionless line, make it trivially easy for her to act, and keep the tone light so the gap doesn't feel awkward.",
      goalDetails: [
        "No guilt-tripping about the delay",
        "One specific, copy-pasteable ask",
        "Give her an easy out to keep goodwill",
      ],
    },
    replies: {
      warm: {
        tone: "warm",
        text:
          "No worries at all — I know the feeling! I was hoping for a quick intro to someone on the design team at your company, since I'm exploring product design roles. If it's easy, even a name or a “feel free to mention me” is plenty. And no pressure if now's not a good time. 😊",
        rationale:
          "Light and warm; lowers the effort bar and offers a graceful out.",
      },
      direct: {
        tone: "direct",
        text:
          "All good! Short version: I'm looking for a warm intro to anyone on your design team — I'm exploring product design roles. If you can pass along my name or point me to the right person, that'd be hugely helpful. If not, no stress.",
        rationale:
          "Crisp and specific; one clear ask she can action in seconds.",
      },
      professional: {
        tone: "professional",
        text:
          "Thanks, Priya — no need to apologize. I was hoping you might introduce me to someone on your design team, as I'm currently exploring product design opportunities. A brief introduction or a pointer to the right contact would be greatly appreciated. Of course, only if it's convenient for you.",
        rationale:
          "Courteous and clear; appropriate if you don't know each other well.",
      },
      boundary: {
        tone: "boundary",
        text:
          "No problem! Quick recap: I'd love an intro to your design team re: product design roles. If that's doable, great — if it's not the right fit or timing, totally fine to pass. I'll follow up just once more next month and then leave it.",
        rationale:
          "Friendly but sets your own follow-up limit so you're not stuck waiting.",
      },
    },
    actions: DEFAULT_ACTIONS,
  },
  {
    id: "dating-message",
    title: "Dating app message that fell flat",
    channel: "Dating",
    sender: "Sam (matched 3 days ago)",
    context:
      "You've exchanged a few messages. The energy felt good, then went quiet.",
    message:
      "Hey, sorry I dropped off — got a bit overwhelmed with work this week. I had fun chatting though. Not sure I'm in the right headspace to date much right now, but I didn't want to just disappear on you.",
    analysis: {
      whatsHappening:
        "Sam is being honest and considerate — they're softly stepping back, not playing games. “Didn't want to disappear” shows respect. This is mostly a gentle exit, with a small possibility of staying in touch if you both want.",
      signals: [
        { label: "Honesty / respect", intensity: 76 },
        { label: "Pulling back", intensity: 70 },
        { label: "Door slightly open", intensity: 38 },
      ],
      likelyGoal:
        "You want to respond with self-respect — acknowledge their honesty, not over-invest, and decide whether to leave a light door open or close it cleanly.",
      goalDetails: [
        "Match their honesty without over-explaining",
        "Keep your dignity — no chasing",
        "Choose: light door open, or a clean, kind close",
      ],
    },
    replies: {
      warm: {
        tone: "warm",
        text:
          "Hey, I really appreciate you saying that instead of going quiet — that's genuinely kind. I had fun too. Totally get needing space for work and headspace. If things shift and you feel like picking it back up, I'd be open to it. Take care of yourself either way. 🙂",
        rationale:
          "Warm and secure; leaves a light, no-pressure door open.",
      },
      direct: {
        tone: "direct",
        text:
          "Thanks for being upfront — I respect it. I had a good time chatting too. Sounds like the timing isn't right, which is completely fair. Wishing you well with the work stuff!",
        rationale:
          "Clean and self-respecting; gently closes without any chase.",
      },
      professional: {
        tone: "professional",
        text:
          "I appreciate you taking the time to let me know rather than leaving it unsaid — that means a lot. I enjoyed our conversations as well. I understand needing to step back, and I hope work eases up for you soon. All the best.",
        rationale:
          "Measured and gracious; useful if you want a neutral, mature tone.",
      },
      boundary: {
        tone: "boundary",
        text:
          "I appreciate the honesty, truly. I had fun, and I'm not really up for keeping something on indefinite pause — so I'll wish you well rather than leave it open-ended. Take good care, Sam.",
        rationale:
          "Kind but firm; protects your time instead of lingering in limbo.",
      },
    },
    actions: DEFAULT_ACTIONS,
  },
  {
    id: "professor-feedback",
    title: "Harsh feedback from a professor",
    channel: "Feedback",
    sender: "Prof. Ellis",
    context:
      "You submitted a draft thesis chapter and got blunt written comments.",
    message:
      "This draft is well below the standard I expect at this stage. The argument is unfocused, the sources are thin, and several claims are unsupported. I'm concerned about your timeline. We should meet, but I need to see real evidence of revision first.",
    analysis: {
      whatsHappening:
        "Prof. Ellis is blunt and clearly concerned about your progress — but the comments are about the work, not a verdict on you. “We should meet” plus “evidence of revision” means they're still invested and want to see effort, not give up on you.",
      signals: [
        { label: "Bluntness / high standards", intensity: 84 },
        { label: "Concern for your timeline", intensity: 66 },
        { label: "Still invested in you", intensity: 58 },
      ],
      likelyGoal:
        "You want to absorb the critique without spiraling, show you take it seriously, and convert the feedback into a concrete revision plan that earns the meeting.",
      goalDetails: [
        "Separate the critique of the work from your self-worth",
        "Respond with a specific plan, not reassurance",
        "Ask one or two targeted questions to focus your effort",
      ],
    },
    replies: {
      warm: {
        tone: "warm",
        text:
          "Thank you for the candid feedback — I'd rather hear it directly now than later. You're right that the argument lost focus and the evidence is thin. Here's my plan: I'll tighten the central claim to one sentence, add 4–5 stronger primary sources, and flag every unsupported claim for revision. Could I send a revised outline by Friday before we meet?",
        rationale:
          "Receptive and concrete; turns hard feedback into a clear, datable plan.",
      },
      direct: {
        tone: "direct",
        text:
          "Understood — the draft isn't where it needs to be. Plan: (1) sharpen the thesis to a single claim, (2) replace thin sources with stronger primary ones, (3) mark and fix unsupported claims. I'll send a revised outline by Friday, then we meet. Two questions: which claim worried you most, and is the timeline still realistic?",
        rationale:
          "Accountable and structured; the targeted questions show real engagement.",
      },
      professional: {
        tone: "professional",
        text:
          "Thank you for the detailed assessment. I take the concerns seriously and recognize the draft fell short on focus, sourcing, and support for several claims. I will revise the central argument, strengthen the evidentiary base, and address each unsupported claim, then share an updated outline ahead of our meeting. I'd value your guidance on which section to prioritize.",
        rationale:
          "Composed and rigorous; appropriate for a formal academic relationship.",
      },
      boundary: {
        tone: "boundary",
        text:
          "I appreciate the honest critique and I'm committed to raising the standard. I'll deliver a focused revision plan by Friday. I'd also find it helpful if our feedback could center on specific sections to fix — that helps me act on it most effectively. Looking forward to meeting once the revision is underway.",
        rationale:
          "Accepts the critique while respectfully asking for more actionable feedback.",
      },
    },
    actions: DEFAULT_ACTIONS,
  },
];

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id);
}
