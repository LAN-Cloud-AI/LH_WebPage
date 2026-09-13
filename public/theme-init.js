/* Shared by the first paint and React: explicit light/dark wins; otherwise follow the OS. */
(() => {
  const key = 'lh-theme';
  const system = window.matchMedia('(prefers-color-scheme: dark)');
  const listeners = new Set();
  const normalize = (value) => value === 'light' || value === 'dark' ? value : 'system';
  let preference = 'system';
  try { preference = normalize(localStorage.getItem(key)); } catch { /* private mode */ }
  let snapshot;

  const apply = () => {
    const theme = preference === 'system' ? (system.matches ? 'dark' : 'light') : preference;
    if (snapshot?.theme === theme && snapshot.preference === preference) return;
    snapshot = { preference, theme };
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.themePreference = preference;
    root.style.colorScheme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute(
      'content', theme === 'dark' ? '#080b11' : '#f3f5f8',
    );
    listeners.forEach((listener) => listener());
  };

  window.__lhTheme = {
    getSnapshot: () => snapshot,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    setPreference(value) {
      preference = normalize(value);
      try {
        if (preference === 'system') localStorage.removeItem(key);
        else localStorage.setItem(key, preference);
      } catch { /* The current tab still respects an explicit choice. */ }
      apply();
    },
  };

  system.addEventListener('change', apply);
  window.addEventListener('storage', (event) => {
    if (event.key !== key && event.key !== null) return;
    preference = normalize(event.newValue);
    apply();
  });
  apply();
})();
