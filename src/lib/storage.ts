export const storageKeys = {
  language: "iso27001-lab:language-mode",
  moduleProgress: "iso27001-lab:module-progress",
  quizAttempts: "iso27001-lab:quiz-attempts",
  simulations: "iso27001-lab:simulations",
  practiceAttempts: "iso27001-lab:practice-attempts",
  contentStudioDrafts: "iso27001-lab:content-studio-drafts",
} as const;

const storageChangeEventName = "iso27001-lab:storage-change";

type StorageChangeDetail = {
  key: string;
};

export function readStorageItem(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function readStorageJson<T>(key: string, fallback: T): T {
  const saved = readStorageItem(key);

  if (!saved) {
    return fallback;
  }

  try {
    return JSON.parse(saved) as T;
  } catch {
    return fallback;
  }
}

export function writeStorageValue(key: string, value: string) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, value);
  notifyStorageChange(key);
}

export function writeStorageJson(key: string, value: unknown) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  notifyStorageChange(key);
}

export function subscribeToStorageKey(key: string, callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === key) {
      callback();
    }
  };

  const handleCustom = (event: Event) => {
    const detail = (event as CustomEvent<StorageChangeDetail>).detail;

    if (detail?.key === key) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(storageChangeEventName, handleCustom as EventListener);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(storageChangeEventName, handleCustom as EventListener);
  };
}

function notifyStorageChange(key: string) {
  window.dispatchEvent(
    new CustomEvent<StorageChangeDetail>(storageChangeEventName, {
      detail: { key },
    }),
  );
}
