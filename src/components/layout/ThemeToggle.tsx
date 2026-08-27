import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { useTheme } from '../../lib/theme';
import { springSnappy } from '../../lib/motion';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const reduced = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative grid size-9 place-items-center overflow-hidden rounded-xl border border-line bg-surface-2 text-ink-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
      aria-label={isDark ? '切换到浅色主题' : '切换到深色主题'}
    >
      <AnimatePresence initial={false} mode="wait">
        <motion.span
          key={theme}
          initial={reduced ? { opacity: 0 } : { opacity: 0, rotate: -70, scale: 0.6 }}
          animate={reduced ? { opacity: 1 } : { opacity: 1, rotate: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, rotate: 70, scale: 0.6 }}
          transition={springSnappy}
          className="absolute grid place-items-center"
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </motion.span>
      </AnimatePresence>
    </button>
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
