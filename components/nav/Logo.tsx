import { cn } from "@/lib/cn";

export function Logo({
  showWordmark = true,
  className,
}: {
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-lavender-400 to-peach-300 shadow-soft">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M4 14c2.5 0 3-5 6-5s3.5 5 6 5 3.5-3 4-4"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="12" cy="12" r="9.2" stroke="white" strokeOpacity="0.6" strokeWidth="1.4" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-serif text-lg font-semibold tracking-tight text-ink">
          MoodPilot
        </span>
      )}
    </span>
  );
}
