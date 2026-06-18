import { SCENARIOS } from "@/lib/scenarios";
import { ChannelBadge } from "@/components/ui/Badge";
import { cn } from "@/lib/cn";

export function ScenarioPicker({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
      {SCENARIOS.map((s) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              "group flex flex-col items-start gap-2 rounded-3xl border p-4 text-left transition-all duration-200",
              active
                ? "border-lavender-300 bg-white shadow-glow"
                : "border-white/70 bg-white/60 hover:-translate-y-0.5 hover:border-lavender-200 hover:shadow-soft"
            )}
          >
            <ChannelBadge channel={s.channel} />
            <span
              className={cn(
                "text-sm font-medium leading-snug",
                active ? "text-ink" : "text-ink-soft group-hover:text-ink"
              )}
            >
              {s.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
