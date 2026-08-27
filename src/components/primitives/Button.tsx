import { motion, useReducedMotion } from 'motion/react';
import type { ReactNode } from 'react';

import { springSnappy } from '../../lib/motion';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-brand text-white shadow-[0_10px_30px_-12px_var(--lh-brand)] hover:bg-brand-strong border border-transparent',
  ghost: 'bg-surface-2 text-ink border border-line hover:border-line-strong hover:bg-surface-3',
  outline: 'bg-transparent text-ink border border-line-strong hover:bg-surface-2',
};

const SIZES: Record<Size, string> = {
  md: 'h-10 px-4 text-sm gap-1.5 rounded-xl',
  lg: 'h-12 px-6 text-[0.95rem] gap-2 rounded-2xl',
};

type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
  'aria-label'?: string;
};

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  external = false,
  ...rest
}: ButtonProps) {
  const reduced = useReducedMotion();
  const classes = `inline-flex items-center justify-center font-medium transition-colors duration-200 whitespace-nowrap ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const hover = reduced ? undefined : { scale: 1.03 };
  const tap = reduced ? undefined : { scale: 0.97 };

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={hover}
        whileTap={tap}
        transition={springSnappy}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        {...rest}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={classes}
      whileHover={hover}
      whileTap={tap}
      transition={springSnappy}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

type PillProps = {
  children: ReactNode;
  className?: string;
  /** 左侧呼吸圆点 */
  live?: boolean;
};

/** 小标签。live 时带一个脉冲圆点，用于「实时」类语义。 */
export function Pill({ children, className = '', live = false }: PillProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-surface-2/70 px-3 py-1.5 text-xs font-medium text-ink-muted backdrop-blur-sm ${className}`}
    >
      {live && (
        <span className="relative flex size-1.5">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand" />
          <span className="relative size-1.5 rounded-full bg-brand" />
        </span>
      )}
      {children}
    </span>
  );
}

type ArrowProps = { className?: string };

export function ArrowRight({ className = 'size-4' }: ArrowProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" />
    </svg>
  );
}
