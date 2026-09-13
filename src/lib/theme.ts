import { useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';
export type ThemePreference = Theme | 'system';

declare global {
  interface Window {
    __lhTheme: {
      getSnapshot: () => { theme: Theme; preference: ThemePreference };
      subscribe: (listener: () => void) => () => void;
      setPreference: (preference: ThemePreference) => void;
    };
  }
}

/** The blocking theme-init.js script applies the same state before React's first render. */
export function useTheme() {
  const controller = window.__lhTheme;
  const snapshot = useSyncExternalStore(
    controller.subscribe,
    controller.getSnapshot,
  );
  return { ...snapshot, setPreference: controller.setPreference };
}
