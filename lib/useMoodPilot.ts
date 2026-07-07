"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { HistoryEntry, MemoryPreference } from "./types";

const HISTORY_KEY = "moodpilot.history.v1";
const MEMORY_KEY = "moodpilot.memoryPref.v1";
const ONBOARDED_KEY = "moodpilot.onboarded.v1";
const LEARNED_KEY = "moodpilot.learned.v1";

// App-level state shared by Companion, History, and Memory pages.
// Persisted locally so the demo feels real with no backend.
export function useHistory() {
  const { value, set, reset, hydrated } = useLocalStorage<HistoryEntry[]>(
    HISTORY_KEY,
    []
  );

  const add = useCallback(
    (entry: HistoryEntry) => set((prev) => [entry, ...prev]),
    [set]
  );

  const remove = useCallback(
    (id: string) => set((prev) => prev.filter((e) => e.id !== id)),
    [set]
  );

  const clear = useCallback(() => set([]), [set]);

  return { history: value, add, remove, clear, reset, hydrated };
}

export function useMemoryPreference() {
  const { value, set, reset, hydrated } = useLocalStorage<MemoryPreference>(
    MEMORY_KEY,
    "ask"
  );
  return { preference: value, setPreference: set, resetPreference: reset, hydrated };
}

export function useLearnedPreferences() {
  const { value, set, reset, hydrated } = useLocalStorage<string[]>(LEARNED_KEY, []);
  const add = useCallback(
    (preference: string) =>
      set((previous) =>
        previous.includes(preference) ? previous : [...previous, preference]
      ),
    [set]
  );
  const remove = useCallback(
    (preference: string) => set((previous) => previous.filter((item) => item !== preference)),
    [set]
  );
  return { learned: value, add, remove, reset, hydrated };
}

export function useOnboarded() {
  const { value, set, hydrated } = useLocalStorage<boolean>(
    ONBOARDED_KEY,
    false
  );
  return { onboarded: value, setOnboarded: set, hydrated };
}
