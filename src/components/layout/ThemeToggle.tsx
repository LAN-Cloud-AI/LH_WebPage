import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useTheme, type ThemePreference } from '../../lib/theme';
import { currentLocale } from '../../lib/locale';
import { springSnappy } from '../../lib/motion';

export function ThemeToggle({ className = '', expanded = false }: { className?: string; expanded?: boolean }) {
  const { theme, preference, setPreference } = useTheme();
  const reduced = useReducedMotion();
  const isDark = theme === 'dark';
  const labels = {
    'zh-Hans': { title: '显示主题', system: '跟随系统', light: '白天', dark: '黑夜' },
    'zh-Hant': { title: '顯示主題', system: '跟隨系統', light: '白天', dark: '黑夜' },
    en: { title: 'Appearance', system: 'System', light: 'Light', dark: 'Dark' },
  }[currentLocale()];

  if (expanded) {
    return (
      <div className={className}>
        <p className="mb-2 text-xs text-ink-faint">{labels.title}</p>
        <div className="inline-flex max-w-full flex-wrap gap-1 rounded-xl border border-line bg-surface-2 p-1" role="group" aria-label={labels.title}>
          {(['system', 'light', 'dark'] as const).map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={preference === value}
              onClick={() => setPreference(value)}
              className={`inline-flex min-h-11 items-center justify-center gap-1.5 rounded-lg px-3 text-xs transition-colors ${preference === value ? 'bg-bg-elev text-ink shadow-sm' : 'text-ink-muted hover:text-ink'}`}
            >
              {value === 'system' ? <SystemIcon /> : value === 'dark' ? <MoonIcon /> : <SunIcon />}
              {labels[value]}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative grid size-9 place-items-center overflow-hidden rounded-xl border border-line bg-surface-2 text-ink-muted transition-colors hover:border-line-strong hover:text-ink focus-within:outline-2 focus-within:outline-brand ${className}`}
      title={`${labels.title}: ${labels[preference]}`}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={`${preference}-${theme}`}
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -70, scale: 0.6 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 70, scale: 0.6 }}
          transition={springSnappy}
          className="absolute grid place-items-center"
        >
          {preference === 'system' ? <SystemIcon /> : isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
      <select
        aria-label={labels.title}
        value={preference}
        onChange={(event) => setPreference(event.target.value as ThemePreference)}
        className="absolute inset-0 size-full cursor-pointer opacity-0"
      >
        <option value="system">{labels.system}</option>
        <option value="light">{labels.light}</option>
        <option value="dark">{labels.dark}</option>
      </select>
    </div>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-[1.1rem]" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="2" y="3" width="16" height="11" rx="2" />
      <path d="M7 18h6M10 14v4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-[1.05rem]" aria-hidden="true">
      <path
        d="M16.3 12.6A6.8 6.8 0 0 1 7.4 3.7a7 7 0 1 0 8.9 8.9Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      className="size-[1.15rem]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="3.6" />
      <path d="M10 2v1.6M10 16.4V18M2 10h1.6M16.4 10H18M4.6 4.6l1.1 1.1M14.3 14.3l1.1 1.1M15.4 4.6l-1.1 1.1M5.7 14.3l-1.1 1.1" />
    </svg>
  );
}
