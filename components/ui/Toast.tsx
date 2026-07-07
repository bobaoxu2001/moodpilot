"use client";

export function Toast({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="reveal pointer-events-auto flex items-center gap-2.5 rounded-full border border-white/70 bg-ink px-5 py-3 text-sm font-medium text-white shadow-lift">
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-sage-300">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {message}
      </div>
    </div>
  );
}
