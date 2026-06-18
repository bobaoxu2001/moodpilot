// Tiny className combiner — avoids a dependency for this MVP.
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
