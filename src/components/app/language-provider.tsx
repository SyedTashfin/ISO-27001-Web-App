"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { DisplayMode } from "@/lib/course-data";
import {
  readStorageItem,
  storageKeys,
  subscribeToStorageKey,
  writeStorageValue,
} from "@/lib/storage";

type LanguageContextValue = {
  mode: DisplayMode;
  setMode: (mode: DisplayMode) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const mode = useSyncExternalStore<DisplayMode>(
    (callback) => subscribeToStorageKey(storageKeys.language, callback),
    readLanguageMode,
    () => "dual",
  );

  function handleSetMode(nextMode: DisplayMode) {
    writeStorageValue(storageKeys.language, nextMode);
  }

  return (
    <LanguageContext.Provider value={{ mode, setMode: handleSetMode }}>
      {children}
    </LanguageContext.Provider>
  );
}

function readLanguageMode(): DisplayMode {
  const savedMode = readStorageItem(storageKeys.language);

  return savedMode === "en" || savedMode === "fr"
    ? savedMode
    : "en";
}

export function useLanguageMode() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguageMode must be used within LanguageProvider.");
  }

  return context;
}
