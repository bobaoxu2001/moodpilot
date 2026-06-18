"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { HistoryEntry, MemoryPreference } from "./types";

const HISTORY_KEY = "moodpilot.history.v1";
const MEMORY_KEY = "moodpilot.memoryPref.v1";
const ONBOARDED_KEY = "moodpilot.onboarded.v1";

// App-level state shared by Companion, History, and Memory pages.
// Persisted locally so the demo feels real with no backend.
export function useHistory() {
  const { value, set, hydrated } = useLocalStorage<HistoryEntry[]>(
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

  return { history: value, add, remove, clear, hydrated };
}

export function useMemoryPreference() {
  const { value, set, hydrated } = useLocalStorage<MemoryPreference>(
    MEMORY_KEY,
    "ask"
  );
  return { preference: value, setPreference: set, hydrated };
}

export function useOnboarded() {
  const { value, set, hydrated } = useLocalStorage<boolean>(
    ONBOARDED_KEY,
    false
  );
  return { onboarded: value, setOnboarded: set, hydrated };
}
