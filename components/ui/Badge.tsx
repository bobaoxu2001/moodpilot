import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { Channel } from "@/lib/types";

const tones: Record<string, string> = {
  lavender: "bg-lavender-100 text-lavender-700",
  peach: "bg-peach-100 text-peach-600",
  sage: "bg-sage-100 text-sage-700",
  neutral: "bg-cream-200 text-ink-soft",
};

export function Badge({
  children,
  tone = "lavender",
  className,
}: {
  children: ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

const channelTone: Record<Channel, keyof typeof tones> = {
  Slack: "lavender",
  Email: "peach",
  LinkedIn: "lavender",
  Dating: "peach",
  Feedback: "sage",
};

export function ChannelBadge({ channel }: { channel: Channel }) {
  return <Badge tone={channelTone[channel]}>{channel}</Badge>;
}
