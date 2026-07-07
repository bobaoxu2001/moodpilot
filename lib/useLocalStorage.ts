"use client";

import { useCallback, useEffect, useState } from "react";

// Small SSR-safe localStorage hook. Reads on mount to avoid hydration
// mismatches, and writes through on every update.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        // Client-only hydration intentionally synchronizes the external storage snapshot.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setValue(JSON.parse(raw) as T);
      }
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
  }, [key]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // storage may be unavailable (private mode) — fail silently
        }
        return resolved;
      });
    },
    [key]
  );

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // storage may be unavailable
    }
    setValue(initialValue);
  }, [initialValue, key]);

  return { value, set, reset, hydrated } as const;
}
