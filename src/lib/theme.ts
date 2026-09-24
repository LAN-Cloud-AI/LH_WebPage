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

const serverSnapshot = { theme: 'light' as Theme, preference: 'system' as ThemePreference };

/** The blocking theme-init.js script applies the same state before React's first render. */
export function useTheme() {
  const controller = typeof window === 'undefined' ? null : window.__lhTheme;
  const snapshot = useSyncExternalStore(
    controller ? controller.subscribe : () => () => {},
    controller ? controller.getSnapshot : () => serverSnapshot,
    () => serverSnapshot,
  );
  return { ...snapshot, setPreference: controller?.setPreference ?? (() => {}) };
}
